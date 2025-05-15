"use client";

import { useRef } from 'react';

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
            <img src={"/perfume.png"} alt="large Img" className="large-Img" ref={largeImageRef}></img>
            <img src={"/physiotherapy2.jpg"} alt="small Img1" className="small-Img" 
            onClick={(e) => imgSwap(e.target)}></img>
            <img src={"/physiotherapy3.jpg"} alt="small Img2" className="small-Img" 
            onClick={(e) => imgSwap(e.target)}></img>
            <img src={"/chiropractic4.jpg"} alt="small Img3" className="small-Img" 
            onClick={(e) => imgSwap(e.target)}></img>
            <img src={"/chiropractic5.jpg"} alt="small Img4" className="small-Img" 
            onClick={(e) => imgSwap(e.target)}></img>
        </div>
    );
}