import { Ministry, Event, Sermon, Page } from './types';

export const MINISTRIES: Ministry[] = [
  { title: 'Prayer Ministry', description: 'Dedicated intercession and spiritual warfare for our community.', icon: 'Heart' },
  { title: 'Youth Ministry', description: 'Empowering the next generation to lead with faith and purpose.', icon: 'Users' },
  { title: 'Women Fellowship', description: 'A supportive community for women to grow in grace and wisdom.', icon: 'Sparkles' },
  { title: 'Children Ministry', description: 'Nurturing young hearts with biblical foundations and love.', icon: 'BookOpen' },
  { title: 'Community Outreach', description: 'Extending the hands of Christ through social service and aid.', icon: 'HandHeart' },
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Monthly Fasting Prayer',
    date: 'March 15, 2026',
    description: 'A dedicated time of seeking God through prayer and fasting.',
    image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=800',
    location: 'Joshua Missions Church Hall'
  },
  {
    id: '2',
    title: 'Youth Revival Night',
    date: 'March 22, 2026',
    description: 'An evening of powerful worship and life-changing message for the youth.',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800',
    location: 'Main Sanctuary'
  }
];

export const LATEST_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'The Power of Persistent Prayer',
    speaker: 'Pastor John Doe',
    date: 'March 8, 2026',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Walking in Divine Purpose',
    speaker: 'Pastor Jane Smith',
    date: 'March 1, 2026',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800'
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
