"use client";

import { useRef } from 'react';
import Image from 'next/image';

export default function Gallery(){
    const largeImageRef = useRef(null);

    const imgSwap = (clicked) =>{
        const large = largeImageRef.current;
        if (!large) return;

        const tempSrc = large.src;
        const tempAlt = large.alt;

        large.src = clicked.src;
        large.alt = clicked.alt;

        clicked.src = tempSrc;
        clicked.alt = tempAlt;

        large.style.transform = 'scale(1.05)';
        setTimeout(() => {
            large.style.transform = 'scale(1)';
        }, 300);  
    };

    return(
        <div>
            <Image src="/perfume.png" alt="large Img" className="large-Img" ref={largeImageRef}width={500}
  height={300}/>
           
        </div>
    );
}