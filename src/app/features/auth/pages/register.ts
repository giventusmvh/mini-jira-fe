import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../facades/auth.facade';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private readonly fb = inject(FormBuilder)
  protected readonly facade = inject(AuthFacade)

  protected readonly registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit(): void{
    if(this.registerForm.valid){
      const{name,email,password} = this.registerForm.value;
      this.facade.register({
        name: name!,
        email: email!,
        password: password!
      })
    }
  }

}
