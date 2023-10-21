import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {ToastModel} from "../../models/toastModel";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async presentToast(infos: ToastModel) {
    const toast = await this.toastController.create({
      duration: 2000,
      message: infos.message,
      color: infos.color
    });
    toast.present().then();
  }
}
