import { Ministry, Event, Sermon, Page } from './types';

export const MINISTRIES: Ministry[] = [
  { title: 'Prayer Ministry', description: 'Dedicated to intercession, spiritual warfare, and building a deep connection with God through prayer.', icon: 'Heart' },
  { title: 'Youth Ministry', description: 'Empowering the next generation to lead with faith, purpose, and biblical wisdom.', icon: 'Users' },
  { title: 'Compassion & Outreach', description: 'Serving our community through medical camps, feeding the poor, and supporting orphanages with the love of Christ.', icon: 'HandHeart' },
  { title: 'Children Ministry', description: 'Nurturing young hearts with biblical foundations, love, and creative learning in a safe environment.', icon: 'BookOpen' },
];

export const UPCOMING_EVENTS: Event[] = [];

export const LATEST_SERMONS: Sermon[] = [
  {
    id: 'vABiCy61iY8',
    title: 'The Power of Prayer',
    speaker: 'Rev. S. Joshua Vasan',
    date: 'March 8, 2026',
    type: 'video',
    thumbnail: 'https://i.ytimg.com/vi/vABiCy61iY8/maxresdefault.jpg'
  },
  {
    id: 'LeKskNVb9XU',
    title: 'Walking in Faith',
    speaker: 'Rev. S. Joshua Vasan',
    date: 'March 1, 2026',
    type: 'video',
    thumbnail: 'https://i.ytimg.com/vi/LeKskNVb9XU/maxresdefault.jpg'
  }
];

export const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'about', label: 'About' },
  { page: 'ministries', label: 'Ministries' },
  { page: 'events', label: 'Events' },
  { page: 'sermons', label: 'Sermons' },
  { page: 'gallery', label: 'Gallery' },
  { page: 'donate', label: 'Donate' },
  { page: 'contact', label: 'Contact' },
];
