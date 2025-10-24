'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);

    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      if (cursorDotRef.current) {
        gsap.set(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    // Hover detection for clickable elements
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const addHoverListeners = () => {
      const clickableElements = document.querySelectorAll(
        'a, button, [role="button"], input[type="submit"], input[type="button"], .clickable'
      );

      clickableElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return clickableElements;
    };

    window.addEventListener('mousemove', handleMouseMove);
    let clickableElements = addHoverListeners();

    const observer = new MutationObserver(() => {
      clickableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      clickableElements = addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.body.style.cursor = 'auto';
      style.remove();
      window.removeEventListener('mousemove', handleMouseMove);
      clickableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  // Animate on hover - smaller size and color change
  useEffect(() => {
    if (cursorDotRef.current) {
      gsap.to(cursorDotRef.current, {
        scale: isHovering ? 0.7 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovering]);

  return (
    <div
      ref={cursorDotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-colors duration-300"
      style={{
        width: '10px',
        height: '10px',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isHovering
            ? 'bg-gradient-to-br from-purple-400 to-pink-400'
            : 'bg-white'
        }`}
      >
        <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
      </div>
    </div>
  );
}
