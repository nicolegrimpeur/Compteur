import { Component } from '@angular/core';
import {TimerModel} from "../shared/models/timerModel";
import {TimeModel} from "../shared/models/timeModel";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public tabTimer: Array<TimerModel> = [
    {
      id: 1,
      name: 'Compteur 1',
      maxTime: 10
    }
  ];
  public tabTime: Array<TimeModel> = [
    {
      currentTime: 10,
      event: null
    }
  ];
  public pickerColumns = [
    {
      name: 'nbTimer',
      options: Array.from({ length: 10 }, (_, index) => {
        return {
          text: (index + 1).toString(),
          value: index + 1
        }
      })
    }
  ]

  constructor() {
  }

  changeNbTimer(ev: any) {
    const nbTimer = ev.detail.data.nbTimer.value;
    if (nbTimer > this.tabTimer.length) {
      for (let i = this.tabTimer.length + 1; i <= nbTimer; i++) {
        this.tabTimer.push({
          id: i,
          name: 'Compteur ' + i,
          maxTime: 10
        });
        this.tabTime.push({
          currentTime: 10,
          event: null
        });
      }
    } else {
      for (let i = this.tabTimer.length; i > nbTimer; i--) {
        this.tabTimer.pop();
        this.tabTime.pop();
      }
    }
  }

  editTimer(ev: any, team: TimerModel) {
    console.log(ev.detail.data.values[1]);
    if (ev.detail.role === 'confirm') {
      if (ev.detail.data.values[0] !== '') {
        team.name = ev.detail.data.values[0];
      }
      if (ev.detail.data.values[1] !== '') {
        team.maxTime = ev.detail.data.values[1];
        this.tabTime[team.id - 1].currentTime = team.maxTime;
      }
    }
  }

  launchTimer(team: TimerModel) {
    this.tabTime[team.id - 1].event = setInterval(() => {
      if (this.tabTime[team.id - 1].currentTime <= 0) {
        clearInterval(this.tabTime[team.id - 1].event);
      } else {
        this.tabTime[team.id - 1].currentTime--;
      }
    }, 1000);
  }
}
