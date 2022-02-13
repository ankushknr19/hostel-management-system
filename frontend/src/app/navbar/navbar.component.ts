import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() isLoggedIn?: Boolean;
  @Input() currentUser?: User;
  @Output() logoutEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  logout() {
    this.logoutEvent.emit();
  }
}
