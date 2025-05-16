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
        <div className="detail-pic">
            <Image  src={"/Facial.jpg"} alt="large Img" className="large-Img" ref={largeImageRef} width={500}
  height={300}/>
            <Image  src={"/facial2.jpg"} alt="small Img1" className="small-Img" 
            onClick={(e) => imgSwap(e.target)} width={500}
  height={300}/>
            <Image  src={"/facial3.jpg"} alt="small Img2" className="small-Img" 
            onClick={(e) => imgSwap(e.target)} width={500}
  height={300}/>
            <Image  src={"/facial4.jpg"} alt="small Img3" className="small-Img" 
            onClick={(e) => imgSwap(e.target)} width={500}
  height={300}/>
            <Image  src={"/facial5.jpg"} alt="small Img4" className="small-Img" 
            onClick={(e) => imgSwap(e.target)} width={500}
  height={300}/>
        </div>
    );
}