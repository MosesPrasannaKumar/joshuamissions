export type Page = 'home' | 'about' | 'ministries' | 'events' | 'sermons' | 'gallery' | 'donate' | 'contact';

export interface NavItem {
  label: string;
  page: Page;
}

export interface Ministry {
  title: string;
  description: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  location: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  type: 'video' | 'audio' | 'text';
  thumbnail: string;
}
