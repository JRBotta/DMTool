import { AuthenticationService } from './../authentication.service';
import { element } from 'protractor';
import { MonsterService } from './../monster.service';
import { NameFilterPipe } from './../name-filter.pipe';
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../models/item';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SpellService } from '../spell.service';
import { Monster } from '../models/monster';
import { Spell } from '../models/spell';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  users: User[];
  selectedUser = null;
  newUser = new User();
  editUser = null;
  createNew = false;
  itemsVisible = false;
  monstersVisible = false;
  spellsVisible = false;
  closeResult: string;
  searchText = new FormControl('');
  options = [];
  items: Item[];
  monsters: Monster[];
  spells: Spell[];
  filteredOptions: Observable<string[]>;
  selectedOption = null;

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    this.selectedOption = null;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  isObject(obj) {
    return typeof obj === 'object';
  }
  generateArray(obj) {
    Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
    return Object.keys(obj).map(key => {
      if (key) {
        console.log(key);
        return { key: key, value: obj[key] };
      }
    });
  }

  setOption(option) {
    const foundItem = this.items.find(function(e) {
      return e.name === option;
    });
    if (foundItem) {
      return foundItem;
    }
    const foundMonster = this.monsters.find(function(elem) {
      return elem.name === option;
    });
    if (foundMonster) {
      return foundMonster;
    }

    const foundSpell = this.spells.find(function(el) {
      return el.name === option;
    });
    return foundSpell;
  }

  showSelectedOption() {
    console.log(this.selectedOption);
  }

  loadAll() {
    if (this.authService.checkLogin()) {
    this.itemService.index().subscribe(
      items => {
        this.items = items;
        this.options.push(this.nameFilter.transform(this.items));
        this.monsterService.index().subscribe(
          monsters => {
            this.monsters = monsters;
            this.options.push(this.nameFilter.transform(this.monsters));
            this.spellService.index().subscribe(
              spells => {
                this.spells = spells;
                this.options.push(this.nameFilter.transform(this.spells));
                this.populateSearch();
              },
              err => console.log(err)
            );
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }
}

  populateSearch() {
    this.filteredOptions = this.searchText.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  viewItems() {
    this.itemsVisible = true;
    this.monstersVisible = false;
    this.spellsVisible = false;
  }
  viewMonsters() {
    this.itemsVisible = false;
    this.monstersVisible = true;
    this.spellsVisible = false;
  }
  viewSpells() {
    this.itemsVisible = false;
    this.monstersVisible = false;
    this.spellsVisible = true;
  }

  constructor(
    private userService: UserService,
    private nameFilter: NameFilterPipe,
    private monsterService: MonsterService,
    private itemService: ItemService,
    private spellService: SpellService,
    private modalService: NgbModal,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // this.loadItem();
    // this.loadMonster();
    // this.loadSpell();
    this.loadAll();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const newOptions = this.options[0]
      .concat(this.options[1])
      .concat(this.options[2]);

    return newOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
