export type LinkStyle = {
  colorHex?: string;
  backgroundHex?: string;
  iconEmoji?: string;
  iconImageUrl?: string; // 角丸画像アイコン
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
  style?: LinkStyle;
};

export type SocialHandles = Partial<{
  x: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  github: string;
  website: string;
  facebook: string;
  snapchat: string;
  telegram: string;
  onlyfans: string;
}>;

export type ProfileStats = {
  totalFollowers: string;
  posts: string;
};

export type Profile = {
  displayName: string;
  handle: string;
  avatarUrl?: string;
  bio?: string;
  bannerUrl?: string;
  backgroundUrl?: string; // 背景全面画像
  links: LinkItem[];
  socials?: SocialHandles;
  stats?: ProfileStats;
  theme?: {
    name: 'light' | 'dark' | 'pastel';
    accentHex?: string;
  };
};
