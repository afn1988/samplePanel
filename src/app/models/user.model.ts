export interface User {
  id: string;
  avatar: string;
  name: string;
}

export interface State {
  userId: string;
  userPos: number;
  value: number;
}

export type Status = 'Open' | 'In_Progress' | 'Done';
export type IType = 'Note' | 'Event';

export interface Project {
  name: string;
  initials: string;
  userId: string;
  userPos: number;
  createdAt: number;
  status: string;
}

export interface Interaction {
  id: string;
  projectId: string;
  text: string;
  createdAt: number;
  type: string;
}

export interface Event extends Interaction {
  message: string;
}

export interface Note extends Interaction {}
