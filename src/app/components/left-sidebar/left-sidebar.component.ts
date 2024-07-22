import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { DropdownModule } from 'primeng/dropdown';
import {
  ORDER_BY_OPTIONS,
  orderByOptionsProvider,
} from '../../models/activity.model';
import { Project, User } from '../../models/user.model';
import { UserInfoService } from '../../services/app.userInfo';
import { InitialsPictureComponent } from '../shared/initials-picture.component';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [
    InitialsPictureComponent,
    FormsModule,
    CommonModule,
    DropdownModule,
    FontAwesomeModule,
    InputTextModule,
    InputGroupModule,
  ],
  providers: [orderByOptionsProvider],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent {
  sideBarExpanded = signal<boolean>(true);
  search = signal<string>('');
  orderByOptions = inject(ORDER_BY_OPTIONS);
  selectedOrderBy = signal(this.orderByOptions[0].value);

  userInfoService: UserInfoService = inject(UserInfoService);
  presentProjects = computed<Project[]>(() => {
    let state = this.userInfoService.getPresentProjects();
    return state();
  });
  selectedProject = computed<Project | null>(() => {
    let state = this.userInfoService.getSelectedProject();
    return state();
  });

  filteredProjects = computed(() => {
    const searchTerm = this.search().toLowerCase();
    return this.presentProjects().filter((project) =>
      project.name.toLowerCase().includes(searchTerm)
    );
  });

  constructor() {
    effect(
      () => {
        console.log('Selected project changed:', this.selectedOrderBy());
        switch (this.selectedOrderBy()) {
          case 'Asc':
            this.filteredProjects().sort(function (a: Project, b: Project) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            break;
          case 'Desc':
            this.filteredProjects().sort(function (a: Project, b: Project) {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });
            break;
          default:
            this.filteredProjects().sort(function (a: Project, b: Project) {
              if (a.createdAt < b.createdAt) {
                return 1;
              }
              if (a.createdAt > b.createdAt) {
                return -1;
              }
              return 0;
            });
        }
      },
      { allowSignalWrites: true }
    );
  }

  //icons
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  toggleSideBar() {
    this.sideBarExpanded.set(!this.sideBarExpanded());
  }

  selectProject(project: Project) {
    this.userInfoService.setSelectedProject(project);
  }
}
