import { Component } from '@angular/core';
import { StudentHeaderComponent } from '../student_layout/student-header/student-header.component';
import { StudentFooterComponent } from '../student_layout/student-footer/student-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  imports: [StudentHeaderComponent, StudentFooterComponent, RouterOutlet],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class StudentLayoutComponent {

}
