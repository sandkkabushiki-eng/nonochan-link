'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

interface ParticleEffectProps {
  isActive: boolean;
  onComplete: () => void;
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
];

export default function ParticleEffect({ isActive, onComplete }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // パーティクルを生成
    const newParticles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        life: 0,
        maxLife: 60 + Math.random() * 40
      });
    }

    setParticles(newParticles);

    // アニメーションループ
    const animate = () => {
      setParticles(prevParticles => {
        const updatedParticles = prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life + 1,
            vy: particle.vy + 0.1, // 重力効果
            vx: particle.vx * 0.99 // 空気抵抗
          }))
          .filter(particle => particle.life < particle.maxLife);

        if (updatedParticles.length === 0) {
          // setTimeoutで次のフレームで実行
          setTimeout(() => onComplete(), 0);
          return [];
        }

        return updatedParticles;
      });
    };

    const interval = setInterval(animate, 16); // 60FPS

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 1 - (particle.life / particle.maxLife),
            transform: `scale(${1 - (particle.life / particle.maxLife) * 0.5})`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
}
