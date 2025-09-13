// // "use client"
// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const sectionsData = ["Introduction", "About Me", "Projects", "Contact"];

// export default function NotebookAnimation() {
//   const containerRef = useRef(null);
//   const innerRef = useRef(null);
//   const sectionsRef = useRef([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const container = containerRef.current;
//       const inner = innerRef.current;
//       const sections = sectionsRef.current.filter(Boolean);
//       if (!container || sections.length === 0) return;

//       // total horizontal distance to move = inner.scrollWidth - viewport width
//       const totalWidth = inner.scrollWidth - window.innerWidth;

//       // Horizontal tween that drives the scroll (pin + scrub)
//       const horizTween = gsap.to(inner, {
//         x: -totalWidth,
//         ease: "none",
//         scrollTrigger: {
//           trigger: container,
//           start: "top top",
//           end: () => "+=" + totalWidth,
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });

//       // Page flip animation for each section tied to the horizontal tween
//       sections.forEach((section) => {
//         gsap.fromTo(
//           section,
//           { rotationY: -90, transformOrigin: "left center", opacity: 0 },
//           {
//             rotationY: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: "power4.out",
//             scrollTrigger: {
//               trigger: section,
//               containerAnimation: horizTween,
//               start: "left center",
//               end: "right center",
//               toggleActions: "play reverse play reverse",
//             },
//           }
//         );
//       });
//     }, containerRef);

//     return () => {
//       ctx.revert();
//       // extra safety cleanup
//       ScrollTrigger.getAll().forEach((st) => st.kill());
//       gsap.killTweensOf("*");
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="w-full h-screen overflow-hidden bg-gray-100"
//     >
//       {/* inner wrapper width must be sections.length * 100vw */}
//       <div
//         ref={innerRef}
//         className="flex h-full"
//         style={{ width: `${sectionsData.length * 100}vw` }}
//       >
//         {sectionsData.map((text, i) => (
//           <section
//             key={i}
//             ref={(el) => (sectionsRef.current[i] = el)}
//             className="w-screen flex-shrink-0 h-full flex items-center justify-center bg-white text-4xl font-bold"
//           >
//             {text}
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// }
