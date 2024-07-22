import { Injectable, computed, inject, signal } from '@angular/core';
import { Note, Project, State, User, Event } from '../models/user.model';
import { DUMMY_STATES } from '../dummy-states';
import { DUMMY_PROJECTS } from '../dummy-projects';
import { DUMMY_INTERACTIONS } from '../dummy-interactions';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private user = signal<User | null>(null);
  private selectedState = signal<State | null>(null);
  private presentStates = computed<State[]>(() => {
    if (!this.user()) {
      return [];
    } else {
      return DUMMY_STATES.filter((state) => state.userId === this.user()!.id);
    }
  });
  private presentProjects = computed<Project[]>(() => {
    if (!this.selectedState()) {
      return [];
    } else {
      return DUMMY_PROJECTS.filter(
        (project) =>
          project.userId === this.selectedState()!.userId &&
          project.userPos === this.selectedState()!.userPos
      );
    }
  });
  private selectedProject = signal<Project | null>(null);
  private presentInteractions = computed<(Note | Event)[]>(() => {
    if (!this.selectedProject()) {
      return [];
    } else {
      return DUMMY_INTERACTIONS.filter(
        (interaction) => interaction.projectId === this.selectedProject()!.name
      );
    }
  });

  setUser(newUser: User) {
    this.user.update((user) => newUser);
    this.selectedState.update((state) => null);
    this.selectedProject.update((project) => null);
  }

  getCurrentUser() {
    return this.user.asReadonly();
  }

  setSelectedState(newState: State) {
    this.selectedState.update((state) => newState);
  }

  getSelectedState() {
    return this.selectedState.asReadonly();
  }

  getPresentStates() {
    return this.presentStates;
  }

  setSelectedProject(newProject: Project) {
    this.selectedProject.update((state) => newProject);
  }

  getPresentProjects() {
    return this.presentProjects;
  }

  getSelectedProject() {
    return this.selectedProject.asReadonly();
  }

  getPresentInteractions() {
    return this.presentInteractions;
  }
}
