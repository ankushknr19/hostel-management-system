import { Component, OnInit } from '@angular/core';
import { User } from './_interfaces/user';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  user = <User>{};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getAccessToken();
    if (this.isLoggedIn) {
      const currentUser = this.userService
        .getCurrentUser()
        .subscribe((user) => (this.user = user));
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.tokenStorageService.clearTokens();
        this.isLoggedIn = false;
        window.location.replace('http://localhost:4200/home');
      },
    });
  }
}
