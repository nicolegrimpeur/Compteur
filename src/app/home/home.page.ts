import { Component } from '@angular/core';
import {TeamModel} from "../shared/models/team.model";
import {TimerModel} from "../shared/models/timer.model";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public tabTeams: Array<TeamModel> = [
    {
      id: 1,
      name: 'Compteur 1',
      maxTime: 10
    }
  ];
  public tabTimer: Array<TimerModel> = [
    {
      currentTime: 10,
      event: null
    }
  ];

  constructor() {}

  editTeam(team: TeamModel) {
    console.log('Edition de l\'équipe : ' + team.name);
  }

  launchTimer(team: TeamModel) {
    console.log('Lancement du timer pour l\'équipe : ' + team.name);

    this.tabTimer[team.id - 1].event = setInterval(() => {
      if (this.tabTimer[team.id - 1].currentTime <= 0) {
        clearInterval(this.tabTimer[team.id - 1].event);
      } else {
        this.tabTimer[team.id - 1].currentTime--;
      }
    }, 1000);
  }
}
