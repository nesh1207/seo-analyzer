'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface DottedBackgroundProps {
  dotColor?: string;
  backgroundColor?: string;
  enableVignette?: boolean;
  vignetteColor?: string;
  enableInnerGlow?: boolean;
  innerGlowColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  className?: string;
  children?: React.ReactNode;
}

export const DottedBackground: React.FC<DottedBackgroundProps> = ({
  dotColor = '#6ee7b7',
  backgroundColor = '#0f172a',
  enableVignette = true,
  vignetteColor = 'rgba(0,0,0,0.9)',
  enableInnerGlow = true,
  innerGlowColor = 'rgba(0,0,0,0.8)',
  dotSize = 2,
  dotSpacing = 10,
  className = '',
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosRef.current = { x, y };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Base Background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Draw Interactive Mouse Radial Glow Spotlight
      const mX = mousePosRef.current.x;
      const mY = mousePosRef.current.y;

      if (mX >= 0 && mY >= 0) {
        const glowRadius = 180;
        const radialGlow = ctx.createRadialGradient(mX, mY, 0, mX, mY, glowRadius);
        radialGlow.addColorStop(0, 'rgba(220, 38, 38, 0.18)');
        radialGlow.addColorStop(0.5, 'rgba(185, 28, 28, 0.06)');
        radialGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mX, mY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Dotted Pattern with Interactive Mouse Reaction
      offset += 0.04;
      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;

      const spotlightRadius = 140;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          // Distance from mouse position
          const dx = x - mX;
          const dy = y - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Dynamic wave factor
          const wave = Math.sin(offset + (x + y) * 0.01) * 0.25 + 0.75;
          let currentSize = dotSize * wave;
          let currentDotColor = dotColor;

          // Interactive Cursor Movement Effect:
          // Dots near mouse grow larger and glow brighter emerald green
          if (dist < spotlightRadius) {
            const factor = 1 - dist / spotlightRadius;
            currentSize = dotSize + factor * 2.5;
            currentDotColor = factor > 0.5 ? '#ef4444' : '#dc2626';
          }

          ctx.fillStyle = currentDotColor;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, currentSize), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, backgroundColor, dotSize, dotSpacing]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Interactive Cursor Spotlight Glow Effect */}
      <div
        className="pointer-events-none fixed z-30 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-2xl transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: mousePos.x >= 0 ? 1 : 0,
        }}
      />

      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Inner Glow Overlay */}
      {enableInnerGlow && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle at center, transparent 30%, ${innerGlowColor} 100%)`,
          }}
        />
      )}

      {/* Vignette Edge Border Overlay */}
      {enableVignette && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            boxShadow: `inset 0 0 120px 60px ${vignetteColor}`,
          }}
        />
      )}

      {/* Foreground Content */}
      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  );
};
