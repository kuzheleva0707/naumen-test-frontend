import { Component } from '@angular/core';
import {UserListComponent} from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  imports: [UserListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
