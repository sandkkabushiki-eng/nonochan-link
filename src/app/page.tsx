'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Moon, Sun, Share2, QrCode } from 'lucide-react';
import { profile } from '@/data/profile';
import { LinkItem } from '@/types/profile';
import AdSense, { AdUnits } from '@/components/AdSense';

export default function HomePage() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // ダークモード設定のみ読み込み（軽量化）
  useEffect(() => {
    try {
      const savedDarkMode = localStorage.getItem('dark');
      if (savedDarkMode) {
        setIsDarkMode(savedDarkMode === '1');
      }
    } catch {
      console.log('ローカルストレージの読み込みに失敗しました');
    }
  }, []);

  // ダークモードの切り替え（最適化版）
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('dark', newDarkMode ? '1' : '0');
  };

  const handleLinkClick = (link: LinkItem) => {
    // 外部リンクを開く（統計なし）
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.displayName}のリンク集`,
          text: `${profile.displayName}のSNSリンク集です`,
          url: window.location.href,
        });
      } catch {
        console.log('共有がキャンセルされました');
      }
    } else {
      // フォールバック: URLをクリップボードにコピー
      navigator.clipboard.writeText(window.location.href);
      alert('URLをクリップボードにコピーしました！');
    }
  };

  return (
    <div 
      className={`min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500 ${
        isDarkMode ? 'dark' : ''
      }`}
      style={{ 
        backgroundImage: profile.backgroundUrl ? `url(${profile.backgroundUrl})` : 
          isDarkMode ? 'linear-gradient(135deg, #1e1b4b 0%, #581c87 100%)' : 
          'linear-gradient(135deg, #a8b5ff 0%, #c084fc 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* オーバーレイ */}
      <div className={`min-h-screen backdrop-blur-sm transition-all duration-500 ${
        isDarkMode ? 'bg-black/40' : 'bg-white/5'
      }`}>
        <div className="container mx-auto px-4 py-8 max-w-md">
          
          {/* ヘッダー広告 */}
          <div className="mb-4">
            <AdSense 
              adSlot={AdUnits.HEADER_BANNER}
              adFormat="horizontal"
              className="w-full"
              adStyle={{ 
                display: 'block',
                width: '100%',
                height: '90px',
                maxWidth: '728px',
                margin: '0 auto'
              }}
            />
          </div>
          
          {/* コントロールボタン */}
          <div className="flex justify-end items-center mb-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
                title="共有"
              >
                <Share2 className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setShowQR(!showQR)}
                className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
                title="QRコード"
              >
                <QrCode className="h-4 w-4" />
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
                title={isDarkMode ? "ライトモード" : "ダークモード"}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {/* プロフィールセクション */}
          <div className="text-center mb-8">
            {/* アバター */}
            <div className="relative mb-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* オンラインインジケーター */}
              <div className="absolute bottom-1 right-1/2 transform translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* 名前とハンドル */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 drop-shadow-lg">
              {profile.displayName}
            </h1>
            <p className="text-gray-800 dark:text-gray-200 text-sm mb-4 drop-shadow-lg">
              @{profile.handle}
            </p>

            {/* 自己紹介 */}
            {profile.bio && (
              <div className="text-gray-900 dark:text-white text-sm leading-relaxed mb-6 drop-shadow-lg font-sans">
                {profile.bio.split('\n').map((line, index) => (
                  <p key={index} className="mb-1">
                    {line}
                  </p>
                ))}
              </div>
            )}

          </div>

          {/* リンク一覧 */}
          <div className="space-y-3">
            {profile.links.map((link) => (
              <div
                key={link.id}
                className="relative group"
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  onClick={() => handleLinkClick(link)}
                  className={`w-full transition-all duration-300 rounded-2xl p-4 text-left shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: link.style?.backgroundHex ? 
                      (isDarkMode ? `${link.style.backgroundHex}20` : link.style.backgroundHex) : 
                      undefined
                  }}
                >
                  <div className="flex items-center space-x-3">
                    {/* アイコン */}
                    <div className="flex-shrink-0">
                      {link.style?.iconImageUrl ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src={link.style.iconImageUrl} 
                            alt={link.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : link.style?.iconEmoji ? (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          {link.style.iconEmoji}
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <ExternalLink className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* コンテンツ */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm truncate ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className={`text-xs mt-1 line-clamp-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {link.description}
                        </p>
                      )}
                    </div>

                    {/* 外部リンクアイコン */}
                    <div className="flex-shrink-0">
                      <ExternalLink className={`h-4 w-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-400'
                      }`} />
                    </div>
                  </div>
                </button>

                {/* ホバーエフェクト */}
                {hoveredLink === link.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>

          {/* インライン広告（リンクの下に配置） */}
          <div className="my-6">
            <AdSense 
              adSlot={AdUnits.INLINE_RECTANGLE}
              adFormat="rectangle"
              className="w-full"
              adStyle={{ 
                display: 'block',
                width: '100%',
                height: '250px',
                maxWidth: '300px',
                margin: '0 auto'
              }}
            />
          </div>

          {/* QRコード表示 */}
          {showQR && (
            <div className="mt-6 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl text-center">
              <h3 className={`text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                QRコード
              </h3>
              <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg">
                {/* 簡易的なQRコード風の表示 */}
                <div className="w-full h-full bg-black grid grid-cols-8 gap-0.5">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-full h-full ${
                        Math.random() > 0.5 ? 'bg-white' : 'bg-black'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className={`text-xs mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                このQRコードをスキャンしてアクセス
              </p>
            </div>
          )}

          {/* お知らせ欄 */}
          <div className="mt-6 p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 dark:from-pink-500/10 dark:to-purple-500/10 backdrop-blur-sm rounded-2xl border border-pink-200/30 dark:border-pink-500/20">
            <h3 className={`text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              📢 お知らせ
            </h3>
            <p className={`text-xs leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              いつもありがとうございます！新しいコンテンツを随時更新中です✨
            </p>
          </div>

          {/* フッター広告 */}
          <div className="mt-6 mb-4">
            <AdSense 
              adSlot={AdUnits.FOOTER_HORIZONTAL}
              adFormat="horizontal"
              className="w-full"
              adStyle={{ 
                display: 'block',
                width: '100%',
                height: '90px',
                maxWidth: '728px',
                margin: '0 auto'
              }}
            />
          </div>

          {/* フッター */}
          <div className="text-center mt-4">
            <p className={`text-xs drop-shadow ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>
              ののちゃんリンク
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}