import {Component, OnInit} from '@angular/core';
import {User, UserStatus} from '../models/user.model';
import {UserService} from '../services/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-user-list',
  imports: [
    FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.components.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  statusFilter: UserStatus = UserStatus.all;
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.filteredUsers = this.users;
  }

  onSearchChange(): void {
    this.filterUsers();
  }

  onSearchClear(): void {
      this.searchTerm = '';
      this.filterUsers();
  }

  onStatusChange(): void {
    this.filterUsers();
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }


  private filterUsers(): void {
    this.filteredUsers = this.users?.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === UserStatus.all ||
        (this.statusFilter === UserStatus.active && user.isActive) ||
        (this.statusFilter === UserStatus.inactive && !user.isActive);

      return matchesSearch && matchesStatus;
    });

    this.checkIsSelectedUserInFilteredList();
  }

  private checkIsSelectedUserInFilteredList(){
    if(this.filteredUsers.length === 0 || !this.filteredUsers.find(user => user.id === this.selectedUser?.id)){
      this.selectedUser = null;
    }
  }
}
