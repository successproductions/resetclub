'use client';

import { useEffect, useRef } from 'react';
import MembershipHero from '@/components/sections/MembershipHero';
import CustomCursor from '@/components/ui/CustomCursor';
import Image from 'next/image';
import gsap from 'gsap';

export default function MembershipPage() {
 const imagee = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to('.test',{
      opacity: 1,
      x : 34,
      y : 1,
      duration: 1.5 ,
      ease : 'bounce.',
      onComplete: ()=>{
        gsap.to('.test',{
          y: -20,
         yoyo: true,
         repeat: -1,
         duration: 2,
         height: '500px',
         scale: 1.5
        })
      }
      
    })
  

  }, []); // Empty dependency array = run once on mount

  return (
    <>
      <CustomCursor />
      <main className="membership-page">
        <MembershipHero />
        {/* Additional membership sections will go here */}
        <div className='h-[100vh] flex' >
          <div className="flex w-full h-[100vh] justify-center items-center">
            <div ref={imagee} >
              <Image 
                src="/images/card1.png"
                alt='imagee'
                className='h-24 w-16 test opacity-0 '
                width={200}
                height={100}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
