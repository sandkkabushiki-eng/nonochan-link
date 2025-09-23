import { Profile } from '@/types/profile';

export const profile: Profile = {
  displayName: 'のの',
  handle: 'nonochan',
  avatarUrl: '/avatar.jpg',
  bio: 'NGなしの何でも屋\nみんなの日常の幸せの一部になりたい',
  bannerUrl: '',
  backgroundUrl: '/bg.jpg',
  theme: { name: 'light', accentHex: '#6366f1' },
  socials: {
    x: 'qpr_xx',
    instagram: 'nonohaihanai',
    tiktok: 'nononotnono1',
    website: ''
  },
  links: [
    { id: 'l1', title: 'Instagram', url: 'https://www.instagram.com/nonohaihanai/', description: 'ここがメイン', style: { iconEmoji: '📸', iconImageUrl: '/icons/instagram.jpg', backgroundHex: '#FFFFFF' } },
    { id: 'l2', title: 'X', url: 'https://x.com/qpr_xx', description: '日ごろのつぶやき暴走してます。笑', style: { iconEmoji: '🐦', iconImageUrl: '/icons/x.jpg', backgroundHex: '#FFFFFF' } },
    { id: 'l3', title: 'TikTok', url: 'https://www.tiktok.com/@nononotnono1', description: '1番健全かも笑', style: { iconEmoji: '🎵', iconImageUrl: '/icons/tiktok.jpg', backgroundHex: '#FFFFFF' } }
  ]
};
