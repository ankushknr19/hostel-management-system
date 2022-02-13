import { Component, OnInit } from '@angular/core';
import { faUser, faKey, faPhone } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  faUser = faUser;
  faKey = faKey;
  faPhone = faPhone;
}
