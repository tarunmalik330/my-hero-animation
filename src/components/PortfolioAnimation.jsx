// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
// const PortfolioAnimation = () => {
//   const textRef = useRef(null);
//   const videoRef = useRef(null);
//   const sectionRef = useRef(null);
//   const nextRef = useRef(null);
//   //   const overlayRaf = useRef(null);
//   useEffect(() => {
//     // const nextSection = sectionRef.current.nextElementSibling;
//     ScrollTrigger.create({
//       trigger: sectionRef.current,
//       start: "top top",
//       // end: "+=2000",
//       // end: () => `bottom+=${nextSection.offsetHeight}`,
//       // endTrigger: nextRef.current, // next section
//       // end: "bottom bottom",
//       end: () => `+=${nextRef.current.offsetHeight}`,
//       pin: true,
//       scrub: true,
//       markers: true,
//       pinSpacing: false,
//     });
//     gsap.set(textRef.current, { opacity: 0 });
//     gsap.set(videoRef.current, { opacity: 0 });
//     const tl = gsap.timeline();
//     tl.to(textRef.current, {
//       opacity: 1,
//       duration: 1,
//       delay: 3,
//     })
//       .fromTo(
//         textRef.current,
//         {
//           backgroundSize: "0% 100%",
//         },
//         {
//           backgroundSize: "100% 100%",
//           duration: 2,
//           ease: "linear",
//         }
//       )
//       .to(textRef.current, {
//         y: -400,
//         top: 0,
//         duration: 1.5,
//         ease: "power2.inOut",
//         onComplete: () => {
//           gsap.to(videoRef.current, {
//             opacity: 1,
//             duration: 1,
//             ease: "power2.inOut",
//             onComplete: () => {
//               if (videoRef.current) {
//                 videoRef.current.play();
//               }
//             },
//           });
//         },
//       });
//   }, []);
//   return (
//     <>
//       <div
//         ref={sectionRef}
//         className="min-h-screen bg-black items-end flex px-10 pt-20 relative"
//       >
//         <h1
//           ref={textRef}
//           className="text-8xl font-medium leading-[120%] bg-gradient-to-r from-[#FFDA3D] to-[#FFDA3D] bg-[length:0%_100%] bg-left-bottom bg-no-repeat text-transparent bg-clip-text relative z-10"
//         >
//           The <br /> Gsap <br /> Field
//         </h1>
//         <video
//           ref={videoRef}
//           className="absolute top-0 left-0 w-full h-full object-cover opacity-0"
//           muted
//           playsInline
//         >
//           <source src="/assets/video/hero-video.mp4" type="video/mp4" />
//         </video>
//       </div>
//       <div ref={nextRef} className="bg-gray-300 min-h-screen">
//         <h1>djfdjfi jfuihfi fijfdi</h1>
//       </div>
//       <div className="bg-red-600 min-h-screen"></div>
//     </>
//   );
// };

// export default PortfolioAnimation;
// // "use client";
// // import React, { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // gsap.registerPlugin(ScrollTrigger);

// // const PortfolioAnimation = () => {
// //   const textRef = useRef(null);
// //   const videoRef = useRef(null);
// //   const sectionRef = useRef(null);
// //   const nextRef = useRef(null);

// //   useEffect(() => {
// //     ScrollTrigger.create({
// //       trigger: sectionRef.current,
// //       start: "top top",
// //       end: () => `+=${nextRef.current.offsetHeight}`, // jitna next section hai utna pin
// //       pin: true,
// //       pinSpacing: false, // 👈 niche wala section overlap karega
// //       markers: true,
// //     });
// //   }, []);

// //   return (
// //     <>
// //       {/* Hero section (pinned) */}
// //       <div
// //         ref={sectionRef}
// //         className="min-h-screen bg-black flex items-center justify-center relative z-0"
// //       >
// //         <h1
// //           ref={textRef}
// //           className="text-8xl font-bold text-yellow-400 relative z-10"
// //         >
// //           The Gsap Field
// //         </h1>
// //         <video
// //           ref={videoRef}
// //           className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
// //           muted
// //           autoPlay
// //           loop
// //           playsInline
// //         >
// //           <source src="/assets/video/hero-video.mp4" type="video/mp4" />
// //         </video>
// //       </div>

// //       {/* Ye wala section hero ke upar se scroll karega */}
// //       <div
// //         ref={nextRef}
// //         className="bg-gray-300 min-h-screen flex items-center justify-center text-5xl relative z-10"
// //       >
// //         Next Section Overlapping
// //       </div>

// //       <div className="bg-red-600 min-h-screen flex items-center justify-center text-5xl">
// //         Another Section
// //       </div>
// //     </>
// //   );
// // };

// // export default PortfolioAnimation;
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
      icon: "/assets/images/svg/eye-icon.svg",
    },
    {
      image: "/assets/images/webp/image-2.webp",
      title: "More than motion",
    },
    {
      image: "/assets/images/webp/image-3.webp",
      title: "More than motion",
      icon: "/assets/images/svg/gsap-icon.svg",
    },
    {
      image: "/assets/images/webp/image-4.png",
      title: "A filed of expression",
    },
    {
      image: "/assets/images/webp/image-5.png",
      title: "Built on GSAP",
    },
    {
      image: "/assets/images/webp/image-6.png",
      title: "Built on GSAP",
    },
    {
      image: "/assets/images/webp/image-7.png",
      title: "Built on GSAP",
      icon: "/assets/images/svg/emoji.svg",
    },
    {
      image: "/assets/images/webp/image-8.png",
      title: "Rooted in real joy",
    },
    { image: "/assets/images/webp/image-9.png", title: "Rooted in real joy" },
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
    <div className="bg-[#ebe8db] rounded-xl relative z-[2] p-5 py-40">
      <h2 className="text-4xl max-w-[600px] ml-auto font-medium">
        Somewhere between the code and the grass, we found motion worth keeping
        —gentle, curious, and made with care.
      </h2>
      <div className="relative mt-40 px-20">
        <div className="sticky left-1/2 top-1/2 -translate-y-1/2 z-50 w-full flex justify-center pointer-events-none">
          <Image
            width={216}
            height={249}
            src="/assets/images/svg/emoji.svg"
            alt="emoji"
            id="center-icon"
            className="absolute top-1/2 -translate-y-1/2 opacity-70 w-auto"
          />
          <p
            id="center-title"
            className="text-6xl tracking-tighter text-center whitespace-nowrap overflow-hidden p-5"
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
