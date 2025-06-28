"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Hero = () => {
  const lettersRef = useRef([]);
  const secondTextRefs = useRef([]);
  const flowerContainer = useRef(null);

  const [showSecondText, setShowSecondText] = useState(false);
  const [dragInfo, setDragInfo] = useState({
    dragging: false,
    start: null,
    current: null,
  });

  const getRandomEmojis = () => ["🌸", "🌸", "🌸", "💐", "🌺", "🌸"];

  const scatterEmojis = (x, y, emojis = getRandomEmojis()) => {
    const { innerWidth: w, innerHeight: h } = window;
    for (let i = 0; i < 40; i++) {
      const emoji = document.createElement("span");
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.className = "absolute pointer-events-none select-none";
      emoji.style.fontSize = `${Math.random() * 60 + 60}px`;
      emoji.style.left = `${x}px`;
      emoji.style.top = `${y}px`;
      flowerContainer.current.appendChild(emoji);

      gsap.to(emoji, {
        x: (Math.random() - 0.5) * w,
        y: Math.random() * h + 200,
        opacity: 0,
        rotate: Math.random() * 360,
        duration: 2 + Math.random() * 1.5,
        ease: "power2.out",
        onComplete: () => emoji.remove(),
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const rElement = lettersRef.current[2];
      if (rElement) {
        const { left, top, width, height } = rElement.getBoundingClientRect();
        scatterEmojis(left + width / 2, top + window.scrollY + height / 2);
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
      setDragInfo({ dragging: true, start: pos, current: pos });
      // Removed scatterEmojis() here to prevent scattering on drag start
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
        if (dist > 10) {
          scatterEmojis(start.x, start.y);
        } else {
          scatterEmojis(e.clientX, e.clientY);
        }
      } else {
        scatterEmojis(e.clientX, e.clientY);
      }
      setDragInfo({ dragging: false, start: null, current: null });
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
      <div className="relative z-10">
        {showSecondText ? (
          <h2 className="text-4xl md:text-6xl flex flex-wrap justify-center gap-2">
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
            <span
              className="absolute z-20 text-[80px] md:text-[180px] pointer-events-none select-none"
              style={{
                left: `${dragInfo.start.x}px`,
                top: `${dragInfo.start.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              🌸
            </span>
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
