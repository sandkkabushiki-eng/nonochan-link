'use client';

import { useState, useEffect } from 'react';

// Google AdSense初期化
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const profile = {
  displayName: 'のの',
  handle: 'nonochan',
};

export default function HomePage() {
  const [showTags, setShowTags] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(30);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'cleared'>('idle');
  const [couponCode, setCouponCode] = useState('');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);

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

  // クーポンコード（固定）
  const COUPON_CODE = 'QL6NKQDL';

  const emojis = ['💖', '💕', '💗', '💓', '💝', '💘', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤'];

  // ハート生成
  const generateHeart = () => {
    const newHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10%〜90%
      y: Math.random() * 60 + 20, // 20%〜80%
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    };
    setHearts(prev => [...prev, newHeart]);
    
    // 3秒後に自動削除
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 3000);
  };

  // ゲーム開始
  const startGame = () => {
    setShowGame(true);
    setGameStatus('playing');
    setGameScore(0);
    setGameTime(30);
    setHearts([]);
  };

  // タイマーとゲーム終了処理
  useEffect(() => {
    if (gameStatus === 'playing' && showGame) {
      const timer = setInterval(() => {
        setGameTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameTimer(null);
            // スコアチェックは別のuseEffectで行う
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setGameTimer(timer);
      
      return () => clearInterval(timer);
    }
  }, [gameStatus, showGame]);

  // ゲーム終了時の処理
  useEffect(() => {
    if (gameTime === 0 && gameStatus === 'playing') {
      // スコアが30以上でクリア
      if (gameScore >= 30) {
        setCouponCode(COUPON_CODE);
        setGameStatus('cleared');
      } else {
        setGameStatus('idle');
        setShowGame(false);
      }
    }
  }, [gameTime, gameStatus, gameScore]);

  // ハートクリック
  const handleHeartClick = (heartId: number) => {
    if (gameStatus !== 'playing') return;
    
    setHearts(prev => prev.filter(h => h.id !== heartId));
    setGameScore(prev => {
      const newScore = prev + 1;
      // 30個集めたら自動的にクリア
      if (newScore >= 30) {
        setTimeout(() => {
          setCouponCode(COUPON_CODE);
          setGameStatus('cleared');
        }, 300);
      }
      return newScore;
    });
    
    // ハプティックフィードバック
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  // ゲームを閉じる
  const closeGame = () => {
    if (gameTimer) {
      clearInterval(gameTimer);
    }
    setShowGame(false);
    setGameStatus('idle');
    setGameScore(0);
    setGameTime(30);
    setCouponCode('');
    setHearts([]);
  };

  // ハート生成のuseEffect
  useEffect(() => {
    if (gameStatus === 'playing' && showGame) {
      const heartInterval = setInterval(() => {
        generateHeart();
      }, 800);
      
      return () => clearInterval(heartInterval);
    }
  }, [gameStatus, showGame]);


  return (
    <div className="min-h-screen bg-white text-gray-900 flex justify-center">
      {/* PCでもスマホサイズで表示するためのコンテナ */}
      <div 
        className="w-full max-w-sm mx-auto min-h-screen bg-white mobile-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

      {/* A層：プロフィールバナー（背景＋情報） */}
      <div 
        className="relative bg-white transition-all duration-500 ease-out overflow-hidden"
        style={{
          height: showTags ? '150px' : 'auto',
          minHeight: '350px'
        }}
      >
        {/* 背景画像レイヤー */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          role="img"
          aria-label="背景画像"
        ></div>
        
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/2 via-transparent to-black/5"></div>
        
        {/* 画像オーバーレイ */}
        <div className="absolute inset-0 bg-black/2"></div>

        {/* 右上ユーザーアイコン */}
        <div className="absolute top-3 right-3 z-10">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>

        {/* プロフィール情報（下部に配置） */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3 mb-2 animate-fadeInUp">
          {/* プロフィール名とハートアイコン */}
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg animate-soft-breathe">
              ♡ {profile.displayName} ♡
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-base text-white drop-shadow-md">@{profile.handle}</span>
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* SNSアイコン */}
          <div className="flex justify-center space-x-3 mb-2">
            {/* Instagram */}
            <a href="https://www.instagram.com/nonohaihanai/?next=%2F" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 animate-gentle-float" style={{ animationDelay: '0s' }}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>
            {/* X (Twitter) */}
            <a href="https://x.com/qpr_xx" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 animate-gentle-float" style={{ animationDelay: '0.1s' }}>
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                <span className="text-xs font-bold text-white">X</span>
              </div>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com/channel/UCwU4q404b1Sjy1JVIPvOoVQ?si=D6xIDG4upFASvzYS" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 animate-gentle-float" style={{ animationDelay: '0.2s' }}>
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
            {/* MyFans */}
            <a href="https://myfans.jp/7d675e" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 animate-gentle-float" style={{ animationDelay: '0.3s' }}>
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img 
                  src="/icons/myfans.jpg" 
                  alt="MyFans" 
                  className="w-full h-full object-cover"
                  width={36}
                  height={36}
                  loading="lazy"
                  onError={(e) => {
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
          <a href="https://myfans.jp/7d675e" target="_blank" rel="noopener noreferrer" className="block animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div 
              className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl"
              style={{ 
                animation: 'pulse 2s ease-in-out infinite, gentleSway 3s ease-in-out infinite, softGlow 2s ease-in-out infinite',
                boxShadow: '0 10px 30px rgba(255, 20, 147, 0.4), 0 0 20px rgba(255, 20, 147, 0.3)'
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: 'url(/icons/hatena.jpg)',
                  backgroundPosition: 'left bottom'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="absolute top-3 right-3">
                <div 
                  className="w-8 h-8 rounded-full overflow-hidden shadow-lg"
                  style={{ 
                    animation: 'pulse 1.5s ease-in-out infinite',
                    boxShadow: '0 0 15px rgba(255, 20, 147, 0.6)'
                  }}
                >
                  <img 
                    src="/icons/myfans.jpg" 
                    alt="MyFans" 
                    className="w-full h-full object-cover"
                    width={32}
                    height={32}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </a>

          {/* 2x2グリッド */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* 左上 - YouTube */}
            <a href="https://youtube.com/channel/UCwU4q404b1Sjy1JVIPvOoVQ?si=D6xIDG4upFASvzYS" target="_blank" rel="noopener noreferrer" className="block animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl">
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
                  <span className="text-white text-sm font-bold drop-shadow-lg">ののぶらり</span>
                </div>
              </div>
            </a>

            {/* 右上 - Instagram */}
            <a href="https://www.instagram.com/nonohaihanai/?next=%2F" target="_blank" rel="noopener noreferrer" className="block animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl">
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

            {/* 左下 - X (Twitter) */}
            <a href="https://x.com/qpr_xx" target="_blank" rel="noopener noreferrer" className="block animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl">
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

            {/* 右下 - TikTok */}
            <a href="https://www.tiktok.com/@sozaoiii" target="_blank" rel="noopener noreferrer" className="block animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl">
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
                  <span className="text-white text-sm font-bold drop-shadow-lg">ティックトックに</span>
                </div>
              </div>
            </a>
          </div>

          {/* クーポンゲットボタン */}
          <div className="flex justify-center mb-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={startGame}
              className="w-full max-w-xs h-16 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 active:scale-95 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600"
              style={{ boxShadow: '0 10px 25px rgba(255, 20, 147, 0.4)' }}
              aria-label="クーポンゲット"
            >
              <div className="relative h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-white/10"></div>
                <div className="relative flex items-center justify-center">
                  <span className="text-white text-lg font-bold drop-shadow-lg">クーポンゲット</span>
                </div>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* ゲームモーダル */}
      {showGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-200/90 via-purple-200/90 to-pink-200/90 backdrop-blur-sm animate-fadeInScale">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 mx-4 max-w-sm w-full shadow-2xl border-4 border-pink-200">
            {gameStatus === 'cleared' ? (
              // クーポンコード表示
              <div className="text-center">
                <div className="text-7xl mb-4 animate-bounce">🎉✨</div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  おめでとうございます！
                </h2>
                <p className="text-lg text-pink-600 mb-4">🎁 クーポンゲット 🎁</p>
                <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 rounded-2xl p-6 mb-4 border-2 border-pink-300 shadow-inner">
                  <p className="text-sm text-pink-600 mb-2 font-semibold">✨ クーポンコード ✨</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent tracking-wider font-mono">
                    {couponCode}
                  </p>
                </div>
                <button
                  onClick={closeGame}
                  className="w-full bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 text-white font-bold py-4 rounded-xl hover:scale-105 transition-transform shadow-lg text-lg"
                >
                  💕 閉じる 💕
                </button>
              </div>
            ) : (
              // ゲーム画面
              <div className="relative" style={{ minHeight: '400px' }}>
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white/80 rounded-xl px-4 py-2 shadow-md">
                    <p className="text-sm text-pink-600 font-bold">⏰ 残り時間: {gameTime}秒</p>
                    <p className="text-sm text-purple-600 font-bold">💎 スコア: {gameScore} / 30</p>
                  </div>
                  <button
                    onClick={closeGame}
                    className="text-pink-400 hover:text-pink-600 text-3xl hover:scale-110 transition-transform"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="text-center mb-4 bg-white/80 rounded-xl py-3 shadow-md">
                  <p className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    💖 ハートをタップして集めてね！ 💖
                  </p>
                  <p className="text-sm text-pink-600 mt-1">30個集めるとクーポンゲット！</p>
                </div>

                {/* ゲームエリア */}
                <div className="relative bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-4 mb-4 shadow-inner" style={{ minHeight: '300px', position: 'relative', overflow: 'hidden' }}>
                  {hearts.map((heart) => (
                    <button
                      key={heart.id}
                      onClick={() => handleHeartClick(heart.id)}
                      className="absolute text-5xl hover:scale-150 transition-transform duration-200 cursor-pointer"
                      style={{
                        left: `${heart.x}%`,
                        top: `${heart.y}%`,
                        transform: 'translate(-50%, -50%)',
                        animation: 'gentleFloat 2s ease-in-out infinite, pulse 1.5s ease-in-out infinite',
                        filter: 'drop-shadow(0 4px 8px rgba(255, 20, 147, 0.3))'
                      }}
                    >
                      {heart.emoji}
                    </button>
                  ))}
                  
                  {hearts.length === 0 && gameStatus === 'playing' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-pink-400 text-lg animate-pulse">💕 ハートが出現します... 💕</p>
                    </div>
                  )}
                </div>

                {/* 進捗表示 */}
                {gameStatus === 'playing' && (
                  <div className="text-center bg-white/80 rounded-xl py-3 shadow-md">
                    <p className="text-sm text-pink-600 font-bold mb-2">
                      💫 {gameScore} / 30 個 💫
                    </p>
                    <div className="w-full bg-pink-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((gameScore / 30) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      </div>
    </div>
  );
}