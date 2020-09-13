import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            ReactiveFormsModule,
            FormsModule 
          ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

 
 
  it('should test form validity', () => {
    const form = component.frmLogin;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.email.value;
    const pass = form.controls.password.value;
    nameInput.setValue('acpleno93@gmail.com');
    nameInput.setValue('123');

    expect(form.valid).toBeTruthy();
  })

  
});
