'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adStyle?: React.CSSProperties;
  className?: string;
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  adStyle = { display: 'block' },
  className = ''
}: AdSenseProps) {
  useEffect(() => {
    try {
      // AdSense広告の初期化
      if (typeof window !== 'undefined' && (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle) {
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (error) {
      console.log('AdSense初期化エラー:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-9157219543395530"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// 広告ユニットの種類 - ののちゃんリンク用
export const AdUnits = {
  // ヘッダー広告（バナー）- 728x90
  HEADER_BANNER: '3858974361', // ののちゃんリンク-ヘッダー
  
  // サイドバー広告（縦長）- 160x600
  SIDEBAR_VERTICAL: '3858974361', // 同じスロットを使用（レスポンシブ対応）
  
  // フッター広告（横長）- 728x90
  FOOTER_HORIZONTAL: '3858974361', // 同じスロットを使用（レスポンシブ対応）
  
  // インライン広告（記事内）- 300x250
  INLINE_RECTANGLE: '3858974361', // 同じスロットを使用（レスポンシブ対応）
  
  // モバイル広告（レスポンシブ）- 320x50
  MOBILE_RESPONSIVE: '3858974361' // 同じスロットを使用（レスポンシブ対応）
} as const;
