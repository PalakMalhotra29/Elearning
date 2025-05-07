import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  title: 'Get In Touch' = 'Get In Touch'

  contactForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    subject: new FormControl('',[Validators.required]),
    message: new FormControl('',[Validators.required]),
  })

  constructor(private router:Router , private userService: UserService){}

  onSubmit(){
    alert(this.contactForm.value.name);
    alert(this.contactForm.value.email);
    alert(this.contactForm.value.subject);
    alert(this.contactForm.value.message);

    if(
      this.contactForm.value.name == 'student' && this.contactForm.value.email == 'student@gmail.com'
    ){
      this.router.navigateByUrl('/student/home')
    }else{
      this.router.navigateByUrl('/register');
    }
  }
}
