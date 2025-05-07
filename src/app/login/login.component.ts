import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user/user.service';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title: 'login' = 'login'
  users: DocumentData[] = [];
  constructor(private router: Router, private userService: UserService) { }
  userObj: any = {
    email: '',
    password: ''
  }

  // submit() {
  //   alert(this.userObj.email);
  //   alert(this.userObj.password);
  // }

  // generateToken(userId: string): string {
  //   const timestamp = new Date().getTime();
  //   const rawToken = `${userId}:${timestamp}`;
  //   return btoa(rawToken); // Base64 encode
  // }
  
  // async login() {
  //   const data = {
  //     email: this.userObj.email,
  //     password: this.userObj.password
  //   }
  //   try {
  //     const userExist = await this.userService.getUser('users', data.email!);
  //     if (!userExist) {
  //       alert("Please Register First.");
  //       this.router.navigateByUrl('/register')
  //     } else {
  //       alert("User Found : "+userExist.id);
  //       const token = this.generateToken(userExist.id as string);
  //       if (userExist.password == this.userObj.password) {
  //         const loginData = {
  //           userId: userExist.id,
  //           token: token,
  //           loginAt: Date.now(),
  //           status: true,
  //           createdAt: Date.now()
  //         }
  //         await this.userService.addUser('login',loginData);
  //         // await this.userService.loginUser('login', loginData);
  //         this.userService.setData(loginData);
  //         this.router.navigateByUrl('/student/home')
  //       }else{
  //         alert('Invalid Email or Password.')
  //       }
  //     }
  //   } catch (error) {
  //     alert("Error while login" + error);
  //   }
  // }

  async login(){}
}
