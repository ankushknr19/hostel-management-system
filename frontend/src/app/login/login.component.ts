import { Component, OnInit } from '@angular/core';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { LoginForm } from '../_interfaces/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // form: any = {
  //   email: null,
  //   password: null,
  // };

  form = <LoginForm>{};

  isLoginFailed = false;
  isLoggedIn = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.tokenService.saveAccessToken(data.accessToken);
        this.tokenService.saveRefreshToken(data.refreshToken);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.loginRedirect();
      },
      error: (err) => {
        this.errorMessage = err.error.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  loginRedirect() {
    window.location.replace('http://localhost:4200/profile');
  }

  //icons
  faUser = faUser;
  faKey = faKey;
}
