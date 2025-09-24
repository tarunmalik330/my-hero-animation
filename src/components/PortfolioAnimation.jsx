"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PortfolioAnimation = () => {
  const cardsRef = useRef([]);
  const letterRefs = useRef([]);

  const cards_list = [
    {
      image: "/assets/images/webp/image-1.webp",
      title: "More than motion",
      icon: "/assets/images/svg/line-svg.svg",
    },
    {
      image: "/assets/images/webp/image-2.webp",
      title: "More than motion",
    },
    {
      image: "/assets/images/webp/image-3.webp",
      title: "More than motion",
    },
    {
      image: "/assets/images/webp/image-4.png",
      title: "A filed of expression",
      icon: "/assets/images/svg/eye-icon.svg",
    },
    {
      image: "/assets/images/webp/image-5.png",
      title: "Built on GSAP",
    },
    {
      image: "/assets/images/webp/image-6.png",
      title: "Built on GSAP",
      icon: "/assets/images/svg/gsap-icon.svg",
    },
    {
      image: "/assets/images/webp/image-7.png",
      title: "Built on GSAP",
    },
    {
      image: "/assets/images/webp/image-8.png",
      title: "Rooted in real joy",
    },
    {
      image: "/assets/images/webp/image-9.png",
      title: "Rooted in real joy",
      icon: "/assets/images/svg/emoji.svg",
    },
    { image: "/assets/images/webp/image-10.png", title: "Rooted in real joy" },
    { image: "/assets/images/webp/image-11.png", title: "Rooted in real joy" },
  ];

  useEffect(() => {
    // Animate and update center title as cards scroll into view
    const centerTitle = document.getElementById("center-title");
    const centerIcon = document.getElementById("center-icon");
    if (centerTitle && centerIcon) {
      cards_list.forEach((obj, i) => {
        ScrollTrigger.create({
          trigger: `#card-${i}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            animateTitle(obj.title, "down");
            updateIcon(obj.icon);
          },
          onEnterBack: () => {
            animateTitle(obj.title, "up");
            updateIcon(obj.icon);
          },
        });
      });
    }

    function animateTitle(text, direction) {
      if (!centerTitle) return;
      centerTitle.innerHTML = "";
      const chars = text.split("").map((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        centerTitle.appendChild(span);
        return span;
      });
      gsap.fromTo(
        chars,
        { y: direction === "down" ? 150 : -150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power4",
          stagger: {
            each: 0.03,
            from: direction === "up" ? "end" : "start",
          },
        }
      );
    }

    function updateIcon(iconSrc) {
      if (iconSrc && centerIcon) {
        centerIcon.src = iconSrc;
        gsap.fromTo(
          centerIcon,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
      }
    }
  }, []);

  return (
    <div className="bg-[#ebe8db] rounded-xl relative z-[2] p-5 pt-12 pb-40">
      <div className="flex gap-4 max-sm:flex-col">
        <p className="uppercase text-xs font-medium leading-normal w-full max-sm:text-right">
          scroll gently into <br /> that good field
        </p>
        <h2 className="text-2xl lg:text-4xl max-w-[600px] ml-auto font-medium text-right">
          Somewhere between the code and the grass, we found motion worth
          keeping —gentle, curious, and made with care.
        </h2>
      </div>
      <div className="relative mt-40 sm:px-20">
        <div className="sticky left-1/2 top-1/2 -translate-y-1/2 z-50 w-full flex justify-center pointer-events-none">
          <Image
            width={216}
            height={249}
            src="/assets/images/svg/emoji.svg"
            alt="emoji"
            id="center-icon"
            className="absolute top-1/2 -translate-y-1/2 opacity-70 w-max max-sm:max-w-[280px]"
          />
          <p
            id="center-title"
            className="text-2xl sm:text-6xl tracking-tighter text-center whitespace-nowrap overflow-hidden p-5 max-sm:font-medium"
          >
            {/* Title will be set by JS */}
          </p>
        </div>
        <div className="grid gap-10">
          {cards_list.map((obj, index) => (
            <div
              id={`card-${index}`}
              className={`card relative flex ${
                index % 2 ? "justify-end" : "justify-start"
              }`}
              key={index}
            >
              <Image
                src={obj.image}
                alt="cards-image"
                width={400}
                height={400}
                className="object-cover w-full max-w-[400px] h-[350px] rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnimation;
