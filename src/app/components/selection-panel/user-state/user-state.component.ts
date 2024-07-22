import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { State, User } from '../../../models/user.model';
import { DUMMY_STATES } from '../../../dummy-states';
import { UserInfoService } from '../../../services/app.userInfo';

@Component({
  selector: 'app-user-state',
  standalone: true,
  imports: [],
  templateUrl: './user-state.component.html',
  styleUrl: './user-state.component.css',
})
export class UserStateComponent {
  user = input.required<User>();
  selectedState = signal<State | null>(null);
  userInfoService: UserInfoService = inject(UserInfoService);
  presentStates = computed<State[]>(() => {
    return DUMMY_STATES.filter((state) => state.userId === this.user().id);
  });

  constructor() {
    effect(
      () => {
        // This effect will run whenever the user input changes
        const currentUser = this.user();
        this.resetSelectedState();
        console.log('User changed, selectedState reset');
      },
      { allowSignalWrites: true }
    );
    effect(
      () => {
        // This effect will run whenever the user input changes
        const currentState = this.selectedState();
        this.userInfoService.setSelectedState(currentState!);
        console.log('UpdatedSelectedState');
      },
      { allowSignalWrites: true }
    );
  }

  selectState(state: State) {
    this.selectedState.set(state);
  }

  private resetSelectedState() {
    this.selectedState.set(null);
  }
}
