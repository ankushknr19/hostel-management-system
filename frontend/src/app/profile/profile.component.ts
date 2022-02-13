import { Component, OnInit } from '@angular/core';
import { User } from '../_interfaces/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = <User>{};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((user) => (this.user = user));
  }
}
