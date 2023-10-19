import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';
import {TimerModel} from "../../shared/models/timerModel";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  async saveConfig(value: Array<TimerModel>) {
    await Preferences.set({key: 'config', value: JSON.stringify(value)});
  }

  async getConfig(): Promise<Array<TimerModel>> {
    const config = await Preferences.get({key: 'config'});
    return JSON.parse(config.value!);
  }
}
