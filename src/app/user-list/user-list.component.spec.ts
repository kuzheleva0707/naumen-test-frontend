import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {UserService} from '../services/user.service';
import {User, UserStatus} from '../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    { id: "9fe186cb-0e7c-4b0c-8c56-b95c82ebff01", name: 'Иван Иванов', email: 'ivan@example.com', isActive: true },
    { id: "501a05a0-be75-4b54-99f4-b94ef55c555a", name: 'Петр Петров', email: 'petr@example.com', isActive: false },
    { id: "8ae0a9db-fd64-4a57-a154-37d50aaa2079", name: 'Мария Сидорова', email: 'maria@example.com', isActive: true }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.getUsers.and.returnValue(mockUsers);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with users from service', () => {
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(3);
    expect(component.filteredUsers.length).toBe(3);
  });

  describe('onSearchChange()', () => {
    it('should filter users based on search term', () => {
      // Устанавливаем поисковый запрос
      component.searchTerm = 'Иван';
      component.onSearchChange();

      expect(component.filteredUsers.length).toBe(1);
      expect(component.filteredUsers[0].name).toBe('Иван Иванов');
    });

    it('should return all users when search term is empty', () => {
      component.searchTerm = '';
      component.onSearchChange();

      expect(component.filteredUsers.length).toBe(3);
    });

    it('should handle case insensitive search', () => {
      component.searchTerm = 'иван';
      component.onSearchChange();

      expect(component.filteredUsers.length).toBe(1);
      expect(component.filteredUsers[0].name).toBe('Иван Иванов');
    });
  });

  it('should clear search term and reset filtered users', () => {
    // Сначала устанавливаем поиск
    component.searchTerm = 'Иван';
    component.onSearchChange();
    expect(component.filteredUsers.length).toBe(1);

    // Очищаем поиск
    component.onSearchClear();

    expect(component.searchTerm).toBe('');
    expect(component.filteredUsers.length).toBe(3);
  });

  describe('onStatusChange()', () => {
    it('should filter active users when status is "active"', () => {
      component.statusFilter = UserStatus.active;
      component.onStatusChange();

      const activeUsers = component.filteredUsers.filter(user => user.isActive);
      expect(activeUsers.length).toBe(2);
      expect(component.filteredUsers.length).toBe(2);
    });

    it('should filter inactive users when status is "inactive"', () => {
      component.statusFilter = UserStatus.inactive;
      component.onStatusChange();

      const inactiveUsers = component.filteredUsers.filter(user => !user.isActive);
      expect(inactiveUsers.length).toBe(1);
      expect(component.filteredUsers.length).toBe(1);
    });

    it('should show all users when status is "all"', () => {
      component.statusFilter = UserStatus.all;
      component.onStatusChange();

      expect(component.filteredUsers.length).toBe(3);
    });

    it('should combine with search term when both are set', () => {
      component.searchTerm = 'Иван';
      component.statusFilter = UserStatus.active;
      component.onStatusChange();

      expect(component.filteredUsers.length).toBe(1);
      expect(component.filteredUsers[0].name).toBe('Иван Иванов');
      expect(component.filteredUsers[0].isActive).toBeTrue();
    });
  });

  it('should set selected user', () => {
    const testUser = mockUsers[0];
    component.selectUser(testUser);

    expect(component.selectedUser).toEqual(testUser);
  });
});
