'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface ScratchCardProps {
  discount: number;
  onScratched: () => void;
  isScratched: boolean;
}

export default function ScratchCard({ discount, onScratched, isScratched }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const confettiContainerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Create background with brand pattern (like aime.co style)
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#f5e6d3');
    gradient.addColorStop(0.5, '#ead5bb');
    gradient.addColorStop(1, '#f5e6d3');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add repeating "resetclub" text pattern
    ctx.fillStyle = 'rgba(193, 154, 107, 0.4)';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Create diagonal repeating pattern
    const text = 'resetclub';
    const spacing = 25;

    for (let y = -spacing; y < rect.height + spacing; y += spacing) {
      for (let x = -spacing; x < rect.width + spacing; x += spacing * 2) {
        ctx.save();
        ctx.translate(x + (y % (spacing * 2)), y);
        ctx.rotate(-30 * Math.PI / 180);
        ctx.fillText(text, 0, 0);
        ctx.restore();
      }
    }
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(
      (x - rect.left) * scaleX,
      (y - rect.top) * scaleY,
      30,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Check scratch percentage
    checkScratchPercentage(ctx, canvas);
  };

  const checkScratchPercentage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;

    if (percentage > 50 && !isScratched) {
      onScratched();

      // Trigger animation for 15% discount
      if (discount === 15 && !hasAnimated && cardRef.current && confettiContainerRef.current) {
        setHasAnimated(true);

        const container = confettiContainerRef.current;
        const colors = ['#fb923c', '#fdba74', '#fbbf24', '#f59e0b', '#ef4444', '#ec4899'];

        // Function to create confetti burst
        const createConfettiBurst = () => {
          for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.pointerEvents = 'none';
            container.appendChild(confetti);

            // Random direction for explosion effect
            const angle = (Math.PI * 2 * i) / 15 + Math.random() * 0.5;
            const velocity = 40 + Math.random() * 40;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            gsap.to(confetti, {
              x: tx,
              y: ty,
              rotation: Math.random() * 720 - 360,
              opacity: 0,
              scale: 0,
              duration: 1.5 + Math.random() * 0.5,
              ease: 'power2.out',
              onComplete: () => {
                confetti.remove();
              }
            });
          }
        };

        // Create initial burst
        createConfettiBurst();

        // Loop confetti bursts - slower interval
        const confettiInterval = setInterval(createConfettiBurst, 1200);

        // Stop after 8 seconds
        setTimeout(() => {
          clearInterval(confettiInterval);
        }, 8000);

        // Card pulse animation (looping) - slower
        gsap.to(cardRef.current, {
          scale: 1.12,
          duration: 1.2,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isDrawing) {
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  return (
    <div ref={cardRef} className="relative w-full h-full rounded-lg overflow-visible shadow-lg bg-gradient-to-br from-[#ccbaa8] to-yellow-600">
      {/* Confetti container */}
      <div ref={confettiContainerRef} className="absolute inset-0 pointer-events-none overflow-visible z-50"></div>

      {/* Prize area underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-lg">
        {/* Main content */}
        <div className="text-center">

          {/* Discount */}
          <div className="text-3xl md:text-64xl font-black text-white mb-1">
            {discount}%
          </div>

          {/* OFF text */}
          <div className="text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
            Off
          </div>
        </div>
      </div>

      {/* Scratch layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer touch-none"
        style={{ opacity: isScratched ? 0 : 1, transition: 'opacity 0.3s' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}
