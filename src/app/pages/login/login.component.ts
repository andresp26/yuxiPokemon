import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransversalService } from 'src/app/services/transversal/transversal.service';
import { Router } from '@angular/router';
import { timeStamp } from 'console';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nuevo = false;
  frmLogin: FormGroup;
  frmRegister: FormGroup;
  trainers = [];
  constructor(private fb: FormBuilder,
    private transService: TransversalService,
    private router: Router) {
    this.frmLogin = new FormGroup({});
    this.frmRegister = new FormGroup({})
  }

  ngOnInit(): void {
    this.loadForms();
    this.getTrainers();
  }

  loadForms() {
    this.frmLogin = this.fb.group({
      email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    })
    this.frmRegister = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: [null, Validators.required],
      confirmPassword: [null,Validators.required, ]
    }, {validator: this.checkPasswords })
  }


  getEmail() {
    return this.frmRegister.get('email').hasError('required') ? 'Este campo es requerido' : 
    this.frmRegister.get('email').hasError('pattern') ? 'No es un email vlaido': ''
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }   
  }

  register(value) {
    this.nuevo = value;
  }

  registerTrainer() {
    if (this.frmRegister.valid) {
      let  trainer = {email:this.frmRegister.controls.email.value,
              pass:this.frmRegister.controls.password.value}
      this.transService.registerTrainer(trainer);
      this.transService.messageOK('Registrado');
      this.frmRegister.reset();
      this.nuevo = false;
      
    } else {
      this.transService.messageError('Por favor complete los campos, las contraseñas deben ser iguales!');
    }
  }


  login() {
    console.log(this.trainers)
    if (this.frmLogin.valid) {
        let trainer = this.trainers.find( x => x.email == this.frmLogin.controls.email.value &&
          x.pass == this.frmLogin.controls.password.value)
          if (trainer) {
             this.router.navigate(['/home'])
          } else {
            this.transService.messageError('El entrenador no existe');
          }
    } else {
      this.transService.messageError('Por favor complete los campos!');
     }
  }


  getTrainers() {
    this.trainers = this.transService.getTrainers();
  }


   

}
