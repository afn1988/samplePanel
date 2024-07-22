import { Component, inject, signal, effect } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import { User } from '../../models/user.model';
import { DUMMY_USERS } from '../../dummy-users';
import { UserStateComponent } from './user-state/user-state.component';
import { UserInfoService } from '../../services/app.userInfo';

@Component({
  selector: 'app-selection-panel',
  standalone: true,
  imports: [DropdownModule, FormsModule, UserStateComponent],
  templateUrl: './selection-panel.component.html',
  styleUrl: './selection-panel.component.css',
})
export class SelectionPanelComponent {
  users = signal<User[]>(DUMMY_USERS);
  selectedUser = signal<User | null>(null);
  userInfoService: UserInfoService = inject(UserInfoService);

  constructor() {
    effect(
      () => {
        this.userInfoService.setUser(this.selectedUser()!);
        console.log('User changed:', this.selectedUser());
      },
      { allowSignalWrites: true }
    );
  }

  getImagePath() {
    if (!this.selectedUser()) {
      return null;
    }
    return `assets/users/` + this.selectedUser()!.avatar;
  }
}
