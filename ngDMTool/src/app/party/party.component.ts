import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { PlayerService } from '../player.service';
import { EncounterService } from '../encounter.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  players: Player[] = [];
  closeResult: string;
  newPlayer = new Player();
  editPlayer = null;
  selectedPlayer = null;
  creating = false;

  createPlayer() {
    this.playerService.create(1, this.newPlayer).subscribe(
      data => {
        this.players.push(data);
        this.creating = false;
        this.newPlayer = new Player();
      },
      err => console.log(err)
    );
  }

  updatePlayer() {
    this.playerService.update(1, this.editPlayer.id, this.editPlayer).subscribe(
      data => {
        this.loadPlayer(),
          (this.selectedPlayer = this.editPlayer),
          (this.editPlayer = null);
      },
      err => console.log(err)
    );
  }
  setEditPlayer() {
    this.editPlayer = Object.assign({}, this.selectedPlayer);
  }

  destroyPlayer(id: number) {
    this.playerService
      .destroy(id)
      .subscribe(data => this.loadPlayer(), err => console.log(err));
  }
  loadPlayer() {
    if (this.authService.checkLogin()) {
    this.playerService.index(1).subscribe(
      data => {
        this.players = data;
      },
      err => console.log(err)
    );
  }
}

  addCombatant(player: Player) {
    this.encounterService.add(player);
  }
  addAll() {
    for (let i = 0; i < this.players.length; i++) {
      this.encounterService.add(this.players[i]);
    }
  }

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
    this.editPlayer = null;
    this.newPlayer = null;
    this.selectedPlayer = null;
    this.newPlayer = new Player();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  constructor(
    private playerService: PlayerService,
    private encounterService: EncounterService,
    private modalService: NgbModal,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loadPlayer();
  }
}
