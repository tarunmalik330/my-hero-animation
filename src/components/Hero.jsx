"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RANDOM_EMOJIS } from "@/utils/helper";

const Hero = () => {
  const lettersRef = useRef([]);
  const secondTextRefs = useRef([]);
  const flowerContainer = useRef(null);
  const [showSecondText, setShowSecondText] = useState(false);
  const [dragImage, setDragImage] = useState(null);
  const [dragInfo, setDragInfo] = useState({
    dragging: false,
    start: null,
    current: null,
  });
  const scatterEmojis = (x, y, emojis = RANDOM_EMOJIS()) => {
    const { innerWidth: w, innerHeight: h } = window;
    for (let i = 0; i < 15; i++) {
      const img = document.createElement("img");
      img.src = emojis[Math.floor(Math.random() * emojis.length)];
      img.className = "absolute pointer-events-none select-none";
      const size = Math.random() * 40 + 40;
      img.style.width = `${size}px`;
      img.style.height = `${size}px`;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      flowerContainer.current.appendChild(img);
      gsap.to(img, {
        x: (Math.random() - 0.5) * w,
        y: Math.random() * h + 200,
        opacity: 0,
        rotate: Math.random() * 360,
        duration: 2 + Math.random() * 1.5,
        ease: "power2.out",
        onComplete: () => img.remove(),
      });
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      const headingElement = document.querySelector("h1");
      if (headingElement) {
        const rect = headingElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + window.scrollY + rect.height / 2;
        scatterEmojis(centerX, centerY);
      }
      gsap
        .timeline()
        .to({}, { duration: 1 })
        .to(lettersRef.current, {
          y: 500,
          rotate: () => Math.random() * 360 - 180,
          duration: 1.5,
          ease: "power2.in",
          stagger: 0.1,
        })
        .call(() => {
          setShowSecondText(true);
          setTimeout(() => {
            const order = [
              0, 7, 1, 6, 2, 5, 3, 4, 9, 16, 10, 13, 11, 15, 12, 14, 17,
            ];
            gsap.fromTo(
              order.map((i) => secondTextRefs.current[i]),
              { y: -100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
              }
            );
          }, 50);
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMouseDown = (e) => {
      const pos = { x: e.clientX, y: e.clientY };
      const randomImg =
        RANDOM_EMOJIS()[Math.floor(Math.random() * RANDOM_EMOJIS().length)];
      setDragImage(randomImg);
      setDragInfo({ dragging: true, start: pos, current: pos });
    };
    const onMouseMove = (e) => {
      if (dragInfo.dragging) {
        setDragInfo((info) => ({
          ...info,
          current: { x: e.clientX, y: e.clientY },
        }));
      }
    };
    const onMouseUp = (e) => {
      const { dragging, start, current } = dragInfo;
      if (dragging && start && current) {
        const dist = Math.hypot(current.x - start.x, current.y - start.y);
        scatterEmojis(
          dist > 10 ? start.x : e.clientX,
          dist > 10 ? start.y : e.clientY
        );
      } else {
        scatterEmojis(e.clientX, e.clientY);
      }
      setDragInfo({ dragging: false, start: null, current: null });
      setDragImage(null);
    };
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragInfo]);
  const renderText = (text, refs) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        ref={(el) => (refs.current[i] = el)}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white font-bold text-center">
      <div className="relative z-10 px-3">
        {showSecondText ? (
          <h2 className="text-xl sm:text-4xl md:text-6xl xl:text-8xl flex flex-wrap justify-center gap-2">
            {renderText("Frontend Developer", secondTextRefs)}
          </h2>
        ) : (
          <h1 className="flex text-6xl md:text-9xl flex-wrap gap-2">
            {renderText("Tarun", lettersRef)}
          </h1>
        )}
      </div>
      <div
        ref={flowerContainer}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      >
        {dragInfo.dragging && dragInfo.start && (
          <>
            {dragImage && dragInfo.current && (
              <img
                src={dragImage}
                alt="Drag Start"
                className="absolute z-20 pointer-events-none select-none transition-transform duration-100 ease-out"
                style={{
                  width: "120px",
                  height: "120px",
                  left: `${dragInfo.start.x}px`,
                  top: `${dragInfo.start.y}px`,
                  transform: `translate(-50%, -50%) scale(${
                    1 +
                    Math.min(
                      Math.hypot(
                        dragInfo.current.x - dragInfo.start.x,
                        dragInfo.current.y - dragInfo.start.y
                      ) / 200,
                      1.2
                    )
                  })`,
                }}
              />
            )}
            {dragInfo.current && (
              <div
                className="absolute border-t-2 border-dashed border-white origin-left"
                style={{
                  left: `${dragInfo.start.x}px`,
                  top: `${dragInfo.start.y}px`,
                  width: `${Math.hypot(
                    dragInfo.current.x - dragInfo.start.x,
                    dragInfo.current.y - dragInfo.start.y
                  )}px`,
                  transform: `rotate(${Math.atan2(
                    dragInfo.current.y - dragInfo.start.y,
                    dragInfo.current.x - dragInfo.start.x
                  )}rad)`,
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
