import {Component} from '@angular/core';
import {TimerModel} from "../shared/models/timerModel";
import {TimeModel} from "../shared/models/timeModel";
import {StorageService} from "../core/storage/storage.service";
import {ToastService} from "../shared/class/toast/toast.service";

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
      options: Array.from({length: 10}, (_, index) => {
        return {
          text: (index + 1).toString(),
          value: index + 1
        }
      })
    }
  ]

  constructor(
    private storageService: StorageService,
    private toastService: ToastService
  ) {
  }

  ionViewWillEnter() {
    this.storageService.getConfig().then((config) => {
      if (config) {
        this.tabTimer = config;
        this.tabTime = [];
        config.forEach((timer) => {
          this.tabTime.push({
            currentTime: timer.maxTime,
            event: null
          });
        });
      } else {
        this.storageService.saveConfig(this.tabTimer).then();
      }
    });
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

  editTimer(ev: any, timer: TimerModel) {
    if (ev.detail.role === 'confirm') {
      if (ev.detail.data.values[0] !== '') {
        timer.name = ev.detail.data.values[0];
      }
      if (ev.detail.data.values[1] !== '') {
        timer.maxTime = ev.detail.data.values[1];
        this.tabTime[timer.id - 1].currentTime = timer.maxTime;
      }
      this.toastService.presentToast({message: 'Compteur modifié', color: 'success'}).then();
    }
  }

  deleteTimer(timer: TimerModel) {
    this.tabTimer.splice(timer.id - 1, 1);
    this.tabTime.splice(timer.id - 1, 1);
    this.tabTimer.forEach((timer, index) => {
      timer.id = index + 1;
    });
    this.tabTime.forEach((time, index) => {
      clearInterval(time.event);
      time.currentTime = this.tabTimer[index].maxTime;
    });
    this.toastService.presentToast({message: 'Compteur supprimé', color: 'success'}).then();
  }

  launchTimer(timer: TimerModel) {
    this.tabTime[timer.id - 1].event = setInterval(() => {
      if (this.tabTime[timer.id - 1].currentTime <= 0) {
        clearInterval(this.tabTime[timer.id - 1].event);
      } else {
        this.tabTime[timer.id - 1].currentTime--;
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  pauseAllTimer() {
    this.tabTime.forEach((time) => {
      clearInterval(time.event);
    });
  }

  resetAllTimer() {
    this.tabTime.forEach((time, index) => {
      clearInterval(time.event);
      time.currentTime = this.tabTimer[index].maxTime;
    });
  }

  saveConfig() {
    this.storageService.saveConfig(this.tabTimer)
      .then(() => {
        this.toastService.presentToast({message: 'Configuration sauvegardée', color: 'success'}).then();
      })
      .catch(() => {
        this.toastService.presentToast({message: 'Erreur lors de la sauvegarde', color: 'danger'}).then();
      });
  }
}
