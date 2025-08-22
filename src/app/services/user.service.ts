import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: "9fe186cb-0e7c-4b0c-8c56-b95c82ebff01", name: 'Иван Иванов', email: 'ivan@example.com', isActive: true },
    { id: "501a05a0-be75-4b54-99f4-b94ef55c555a", name: 'Петр Петров', email: 'petr@example.com', isActive: false },
    { id: "8ae0a9db-fd64-4a57-a154-37d50aaa2079", name: 'Мария Сидорова', email: 'maria@example.com', isActive: true },
    { id: "2cc103b0-c74c-410b-a3ec-f27d30d55d2a", name: 'Анна Козлова', email: 'anna@example.com', isActive: false },
    { id: "46a9533d-0d7d-4b75-8328-fef0e73a4c5b", name: 'Сергей Смирнов', email: 'sergey@example.com', isActive: true },
    { id: "886fa819-d74d-453f-ad0c-7b88ede3532b", name: 'Ольга Новикова', email: 'olga@example.com', isActive: true }
  ];

  getUsers(): User[] {
    return this.users;
  }
}
