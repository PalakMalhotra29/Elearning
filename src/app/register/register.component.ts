import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title: 'Register' = 'Register'

  userObj: User = {}

  constructor(private userService: UserService) { }

  saveData() {
    this.userService.register(this.userObj!)
  }

}