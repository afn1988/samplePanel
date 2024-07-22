// profile-picture.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { InitialsPictureService } from '../../helpers/initals.helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="classes"
      class="rounded-full flex items-center justify-center text-xl font-bold"
    >
      <span [ngClass]="textColor">{{ initials }}</span>
    </div>
  `,
  styles: [],
})
export class InitialsPictureComponent implements OnInit {
  @Input() initials: string = '';

  classes: string = '';
  textColor: string = '';

  constructor(private initialsPictureService: InitialsPictureService) {}

  ngOnInit() {
    const bgColor = this.initialsPictureService.getColorFromInitials(
      this.initials
    );
    this.textColor = this.initialsPictureService.getDarkerColor(bgColor);

    this.classes = `w-8 h-8 text-xs ${bgColor}`;
  }
}
