import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class TransversalService {

  trainers = [{email:'acpleno93@gmail.com',pass:'123'}]
  constructor() { }

  messageOK(mensaje) {
    Swal.fire({
      icon: 'success',
      title: 'Aviso!',
      text: mensaje
    })
  }

  messageError(mensaje) {
    Swal.fire({
      icon: 'error',
      title: 'Aviso!',
      text: mensaje,
    })
  }


  registerTrainer(trainer) {
    if (trainer) {
      this.trainers.push(trainer);
      console.log(this.trainers)
    }
  }

  getTrainers() {
    return this.trainers;
  }



}
