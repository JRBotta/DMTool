import { Component, OnInit } from '@angular/core';
import { EncounterService } from 'src/app/encounter.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css']
})
export class EncounterComponent implements OnInit {
  combat = [];
  rolled = null;
  loadCombat() {
    this.combat = this.encounterService.index();
  }

  remove(combatant) {
    this.encounterService.remove(combatant);
    if (this.combat.length === 0) {
      this.rolled = null;
    } else if (this.rolled >= this.combat.length) {
      this.rolled = 0;
    }
  }
  next() {
    if (this.rolled === this.combat.length - 1) {
      this.rolled = 0;
    } else {
      this.rolled++;
    }
  }
  prev() {
    if (this.rolled === 0) {
      this.rolled = this.combat.length - 1;
    } else {
      this.rolled--;
    }
  }
  roll() {
    this.rolled = 0;
    for (let i = 0; i < this.combat.length; i++) {
      if (this.combat[i].initiative === null || this.combat[i].initiative === undefined) {
        this.combat[i].roll = Math.ceil(Math.random() * 20) + this.combat[i].dexterity;
      } else {
        this.combat[i].roll = Math.ceil(Math.random() * 20) + this.combat[i].initiative;
      }
    }
    this.combat.sort(function(b, a) {
      return a.roll - b.roll;
    });
    this.combat[0] = Object.assign({}, this.combat[0]);
    this.combat[0].name = this.combat[0].name + ' (Top Of Round)';
  }

  reset() {
    this.encounterService.reset();
    this.loadCombat();
    this.rolled = null;
  }

  constructor(private encounterService: EncounterService) {}
  ngOnInit() {
    this.loadCombat();
  }
}
