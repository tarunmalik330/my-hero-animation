"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
const CardsAnimation = () => {
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const bgRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(overlayRef.current, {
      opacity: 0,
      x: "100%",
      duration: 2.5,
      ease: "expo.inOut",
    })
      .to(textRef.current, {
        y: "0%",
        duration: 1.2,
        ease: "expo.inOut",
      })
      .to(bgRef.current, {
        backgroundColor: "rgba(0,0,0,0)", // fade black to transparent
        duration: 1.5,
      });
  }, []);
  return (
    <div className="h-screen bg-cover bg-no-repeat bg-fixed w-full flex items-center sticky top-0 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls
      >
        <source src="/assets/video/play-video.mp4" type="video/mp4" />
      </video>
      <div ref={bgRef} className="bg-black w-full h-full relative">
        <span
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full bg-black/80 z-10"
        ></span>
        <div
          ref={textRef}
          className="translate-y-[100%] px-5 relative top-[10%]"
        >
          <Image
            src="../assets/images/svg/heading.svg"
            alt="heading"
            width={300}
            height={310}
          />
        </div>
      </div>
    </div>
  );
};
export default CardsAnimation;
