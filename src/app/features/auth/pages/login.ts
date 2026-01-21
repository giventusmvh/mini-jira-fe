import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../facades/auth.facade';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {

  private readonly fb = inject(FormBuilder);
  protected readonly facade = inject(AuthFacade);

  //reactive form dengan validasi
  protected readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void{
    if(this.loginForm.valid){
      const{email, password} = this.loginForm.value;
      this.facade.login({
        email: email!,
        password: password!
      })
    }
  }

}
