import { Profile } from '@/types/profile';

export const profile: Profile = {
  displayName: '♡ nat ♡',
  handle: 'natalieexking',
  avatarUrl: '/avatar.jpg',
  bio: '✨ art',
  bannerUrl: '',
  backgroundUrl: '/bg.jpg',
  theme: { name: 'dark', accentHex: '#6366f1' },
  socials: {
    x: 'natalieexking',
    instagram: 'natalieexking',
    tiktok: 'natalieexking',
    facebook: 'natalieexking',
    snapchat: 'natalieexking',
    telegram: 'natalieexking',
    onlyfans: 'natalieexking'
  },
  stats: {
    totalFollowers: '4.8M',
    posts: '20'
  },
  links: [
    { 
      id: 'l1', 
      title: 'OnlyFans', 
      url: 'https://onlyfans.com/natalieexking', 
      description: 'Exclusive content', 
      style: { 
        iconImageUrl: '/icons/onlyfans.jpg', 
        backgroundHex: '#FF0080' 
      } 
    },
    { 
      id: 'l2', 
      title: 'Instagram', 
      url: 'https://www.instagram.com/natalieexking/', 
      description: 'Latest posts', 
      style: { 
        iconImageUrl: '/icons/instagram.jpg', 
        backgroundHex: '#E4405F' 
      } 
    },
    { 
      id: 'l3', 
      title: 'X (Twitter)', 
      url: 'https://x.com/natalieexking', 
      description: 'Daily updates', 
      style: { 
        iconImageUrl: '/icons/x.jpg', 
        backgroundHex: '#000000' 
      } 
    },
    { 
      id: 'l4', 
      title: 'Facebook', 
      url: 'https://facebook.com/natalieexking', 
      description: 'Connect with me', 
      style: { 
        iconImageUrl: '/icons/facebook.jpg', 
        backgroundHex: '#1877F2' 
      } 
    },
    { 
      id: 'l5', 
      title: 'TikTok', 
      url: 'https://tiktok.com/@natalieexking', 
      description: 'Fun videos', 
      style: { 
        iconImageUrl: '/icons/tiktok.jpg', 
        backgroundHex: '#000000' 
      } 
    },
    { 
      id: 'l6', 
      title: 'Snapchat', 
      url: 'https://snapchat.com/add/natalieexking', 
      description: 'Behind the scenes', 
      style: { 
        iconImageUrl: '/icons/snapchat.jpg', 
        backgroundHex: '#FFFC00' 
      } 
    }
  ]
};
