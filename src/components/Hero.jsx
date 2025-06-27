"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Hero = () => {
  const lettersRef = useRef([]);
  const flowerContainer = useRef(null);

  const [showSecondText, setShowSecondText] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);

  const getRandomEmojis = () => {
    const emojiSets = [
      ["🌸", "💐", "🌺", "🌷"],
      ["🌻", "🌼", "🌹", "💮"],
      ["🪻", "🪷", "🌼", "🌸"],
      ["🌞", "🌝", "✨", "🌟"],
    ];
    return emojiSets[Math.floor(Math.random() * emojiSets.length)];
  };

  const scatterEmojis = (x, y, emojis = getRandomEmojis()) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < 40; i++) {
      const emoji = document.createElement("span");
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.className = "absolute pointer-events-none select-none";
      emoji.style.fontSize = `${Math.random() * 60 + 40}px`;
      emoji.style.left = `${x}px`;
      emoji.style.top = `${y}px`;
      flowerContainer.current.appendChild(emoji);

      const randomX = (Math.random() - 0.5) * screenWidth;
      const randomY = Math.random() * screenHeight;

      gsap.to(emoji, {
        x: randomX,
        y: randomY + 200,
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
        const rect = rElement.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + window.scrollY + rect.height / 2;
        scatterEmojis(x, y);
      }

      gsap
        .timeline()
        .fromTo(
          lettersRef.current,
          { y: 100, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out",
          }
        )
        .to({}, { duration: 1 }) // pause
        .to(lettersRef.current, {
          y: 500,
          rotate: () => Math.random() * 360 - 180,
          duration: 1.5,
          ease: "power2.in",
          stagger: 0.1,
        })
        .call(() => setShowSecondText(true));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e) => {
      setDragging(true);
      const position = { x: e.clientX, y: e.clientY };
      setStartPos(position);
      setCurrentPos(position);
      scatterEmojis(position.x, position.y);
    };

    const handleMouseMove = (e) => {
      if (dragging) {
        setCurrentPos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      if (dragging && startPos && currentPos) {
        const distance = Math.hypot(
          currentPos.x - startPos.x,
          currentPos.y - startPos.y
        );
        if (distance > 10) {
          scatterEmojis(startPos.x, startPos.y);
        }
      }
      setDragging(false);
      setStartPos(null);
      setCurrentPos(null);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, startPos, currentPos]);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white font-bold text-center">
      <div className="relative z-10">
        {!showSecondText ? (
          <h1 className="flex text-6xl md:text-9xl flex-wrap gap-2">
            {"Tarun".split("").map((letter, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block"
              >
                {letter}
              </span>
            ))}
          </h1>
        ) : (
          <h2 className="text-4xl md:text-6xl">
            I am a Frontend Developer and you ...
          </h2>
        )}
      </div>
      <div
        ref={flowerContainer}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      >
        {dragging && startPos && (
          <>
            <span
              className="absolute z-20 text-[80px] md:text-[180px] pointer-events-none select-none"
              style={{
                left: `${startPos.x}px`,
                top: `${startPos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              🌸
            </span>
            {currentPos && (
              <div
                className="absolute border-t-2 border-dashed border-white origin-left"
                style={{
                  left: `${startPos.x}px`,
                  top: `${startPos.y}px`,
                  width: `${Math.hypot(
                    currentPos.x - startPos.x,
                    currentPos.y - startPos.y
                  )}px`,
                  transform: `rotate(${Math.atan2(
                    currentPos.y - startPos.y,
                    currentPos.x - startPos.x
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
