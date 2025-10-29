'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import SplashCursor from './SplashCursor';

export default function ThreeSphere() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [boundingElement, setBoundingElement] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center py-32 pointer-events-none">
        <div
          ref={(el) => {
            imageRef.current = el;
            setBoundingElement(el);
          }}
          className="relative w-[600px] h-[600px] md:w-[700px] md:h-[700px] pointer-events-auto"
        >
          <Image
            src="/images/orberesetclub.png"
            alt="Reset Club Orb"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Splash cursor effect only within the circle */}
      {boundingElement && (
        <SplashCursor
          boundingElement={boundingElement}
          SPLAT_RADIUS={0.05}
          SPLAT_FORCE={3000}
        />
      )}
    </>
  );
}
