import { Component, computed, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../services/app.userInfo';
import { Note, Interaction, Event, User } from '../../models/user.model';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css',
})
export class RightSidebarComponent {
  sideBarExpanded = signal<boolean>(true);

  userInfoService: UserInfoService = inject(UserInfoService);

  presentUser = computed<User | null>(() => {
    let state = this.userInfoService.getCurrentUser();
    return state();
  });

  presentInteractions = computed<(Event | Note)[]>(() => {
    let state = this.userInfoService.getPresentInteractions();
    return state();
  });

  //icons
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  toggleSideBar() {
    this.sideBarExpanded.set(!this.sideBarExpanded());
  }

  getImagePath() {
    if (!this.presentUser()) {
      return null;
    }
    return `assets/users/` + this.presentUser()!.avatar;
  }
}
