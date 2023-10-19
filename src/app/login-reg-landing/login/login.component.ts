import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ){}

    ngOnInit(): void{
    }

    get email(){
      return this.loginForm.get('email');
    }

    get password(){
      return this.loginForm.get('password');
    }

    submit() {
      const { email, password } = this.loginForm.value;
  
      if (!this.loginForm.valid || !email || !password) {
        return;
      }
  
      this.authService
        .login(email, password)
        .pipe(
          this.toast.observe({
            success: 'Sikeres bejelentkezés',
            loading: 'Bejelentkezés...',
            error: `Hiba a bejelentkezésnél!`,
          })
        )
        .subscribe(() => {
          this.router.navigate(['/user']);
        });
    }
}