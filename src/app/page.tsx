'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, ChevronDown, Star, Wifi, Battery, Signal } from 'lucide-react';

// Google AdSense初期化
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface LinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  style?: {
    iconImageUrl?: string;
  };
}

interface Profile {
  displayName: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  links: LinkItem[];
  socials?: Record<string, string>;
  stats?: {
    totalFollowers: string;
    posts: string;
  };
}

const profile: Profile = {
  displayName: 'のの',
  handle: 'nonochan',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  bio: 'Creator',
  links: [
    {
      id: '1',
      title: 'OnlyFans',
      description: 'Exclusive content and behind-the-scenes',
      url: '#',
      style: {
        iconImageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=48&h=48&fit=crop'
      }
    },
    {
      id: '2',
      title: 'Instagram',
      description: 'Daily updates and photos',
      url: '#',
      style: {
        iconImageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=48&h=48&fit=crop'
      }
    },
    {
      id: '3',
      title: 'TikTok',
      description: 'Short videos and trends',
      url: '#'
    },
    {
      id: '4',
      title: 'Twitter',
      description: 'Thoughts and updates',
      url: '#'
    }
  ],
  socials: {
    x: '@nonochan',
    instagram: '@nonochan',
    tiktok: '@nonochan',
    facebook: '@nonochan',
    snapchat: '@nonochan',
    telegram: '@nonochan',
    onlyfans: '@nonochan'
  },
  stats: {
    totalFollowers: '500k',
    posts: '⭐️idle'
  }
};

export default function HomePage() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showTags, setShowTags] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);


  // Google AdSense初期化
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && !showTags) {
      setShowTags(true);
    } else if (isDownSwipe && showTags) {
      setShowTags(false);
    }
  };

  const handleLinkClick = (link: LinkItem) => {
    if (link.url === '#') {
      return;
    }
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const handleHeartClick = () => {
    setShowHeartAnimation(true);
    setTimeout(() => {
      setShowHeartAnimation(false);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* A層：プロフィールバナー（背景＋情報） */}
      <div 
        className="relative bg-gradient-to-br from-purple-600 to-pink-600 transition-all duration-500 ease-out overflow-hidden"
        style={{
          height: showTags ? '200px' : 'auto',
          minHeight: '500px'
        }}
      >
        {/* 背景画像レイヤー */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/bg.jpg)'
          }}
        ></div>
        
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/2 via-transparent to-black/5"></div>
        
        {/* 画像オーバーレイ */}
        <div className="absolute inset-0 bg-black/2"></div>

        {/* 右上ユーザーアイコン */}
        <div className="absolute top-4 right-4 z-10">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>

        {/* プロフィール情報（下部に配置） */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 mb-4">
          {/* プロフィール名とハートアイコン */}
          <div className="text-center mb-3">
            <h1 className="text-4xl font-bold text-white mb-1 drop-shadow-lg">
              ♡ {profile.displayName} ♡
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg text-white drop-shadow-md">@{profile.handle}</span>
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* SNSアイコン */}
          <div className="flex justify-center space-x-4 mb-3">
            {/* Instagram */}
            <a href="https://www.instagram.com/nonohaihanai/?next=%2F" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>
            {/* X (Twitter) */}
            <a href="https://x.com/qpr_xx" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-sm font-bold text-white">X</span>
              </div>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com/channel/UCwU4q404b1Sjy1JVIPvOoVQ?si=D6xIDG4upFASvzYS" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
            {/* MyFans */}
            <a href="https://myfans.jp/7d675e" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img 
                  src="/icons/myfans.jpg" 
                  alt="MyFans" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('MyFans image failed to load');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* B層：リンク一覧（A層の下） */}
      <div className="relative" style={{
        marginTop: '0px',
        zIndex: 5
      }}>
          <div className="bg-pink-100 rounded-t-3xl p-4 pb-8" style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 -10px 30px rgba(0,0,0,0.2)',
            marginTop: '-20px',
            borderTop: '1px solid rgba(255,255,255,0.8)'
          }}>


          {/* メインコンテンツブロック */}
          <a href="https://myfans.jp/7d675e" target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-lg hover:scale-105 transition-transform duration-200">
              <div 
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: 'url(/icons/hatena.jpg)',
                  backgroundPosition: 'left bottom'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 rounded-full overflow-hidden shadow-lg">
                  <img 
                    src="/icons/myfans.jpg" 
                    alt="MyFans" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </a>

          {/* 2x2グリッド */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* 左上 - X (Twitter) */}
            <a href="https://x.com/qpr_xx" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/icons/x.jpg)'
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">X</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-white text-sm font-bold drop-shadow-lg">呟きまくってます笑</span>
                </div>
              </div>
            </a>

            {/* 右上 - Instagram */}
            <a href="https://www.instagram.com/nonohaihanai/?next=%2F" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/icons/instagram.jpg)'
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-white text-sm font-bold drop-shadow-lg">お知らせはここ</span>
                </div>
              </div>
            </a>

            {/* 左下 - YouTube */}
            <a href="https://youtube.com/channel/UCwU4q404b1Sjy1JVIPvOoVQ?si=D6xIDG4upFASvzYS" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/icons/youtube.jpg)'
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-white text-sm font-bold drop-shadow-lg">これからやるよー</span>
                </div>
              </div>
            </a>

            {/* 右下 - TikTok */}
            <a href="https://www.tiktok.com/@sozaoiii" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
                <div 
                  className="absolute inset-0 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/icons/tiktok.jpg)',
                    backgroundPosition: 'center 60%'
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-white text-sm font-bold drop-shadow-lg">2回目の垢BAN</span>
                </div>
              </div>
            </a>
          </div>

          {/* エールを送るわ - タブ2つ分の横幅 */}
          <div className="flex justify-center mb-4">
            <button onClick={handleHeartClick} className="w-1/2 max-w-xs">
              <div className="relative h-16 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-pink-400 to-red-500">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-2xl">♥</span>
                    <span className="text-white text-lg font-bold drop-shadow-lg">エールを送る</span>
                  </div>
                </div>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* ハートアニメーション */}
      {showHeartAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-500 text-3xl opacity-0"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                animation: `heartFloat ${2 + Math.random() * 2}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              ♥
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes heartFloat {
          0% {
            opacity: 0;
            transform: translateY(0px) scale(0.5) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: translateY(-20px) scale(1) rotate(5deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-150px) scale(1.2) rotate(15deg);
          }
        }
      `}</style>

    </div>
  );
}