import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { HomeComponent } from './student/home/home.component';
import { AboutComponent } from './student/about/about.component';
import { ContactComponent } from './student/contact/contact.component';
import { CourseComponent } from './student/course/course.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { userGuard } from './guard/user.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/student/home',
        pathMatch:'full'
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'student', component: StudentLayoutComponent, children:[
            {
                path:'home', component:HomeComponent
            },
            {
                path:'about', component:AboutComponent, canActivate:[userGuard]
            },
            {
                path:'contact', component:ContactComponent
            },
            {
                path:'course', component:CourseComponent
            }
        ]
    }
];
