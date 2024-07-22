import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InitialsPictureService {
  private colors: string[] = [
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-indigo-400',
    'bg-teal-400',
  ];

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  getColorFromInitials(initials: string): string {
    // Ensure we have exactly two letters
    initials = initials.toUpperCase().slice(0, 2).padEnd(2, 'A');

    // Convert letters to numbers (A=0, B=1, etc.)
    const firstChar = initials.charCodeAt(0) - 65;
    const secondChar = initials.charCodeAt(1) - 65;

    // Use the characters to generate an index
    const colorIndex = (firstChar * 26 + secondChar) % this.colors.length;

    return this.colors[colorIndex];
  }

  getDarkerColor(color: string): string {
    return color.replace('-400', '-600');
  }
}
