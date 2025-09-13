"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Header from "@/components/Header"; 
import Hero from "@/components/Hero";
import About from "@/components/About";
import ScrollProgress from "@/components/ScrollProgress";
import Work from "@/components/work";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import BlogSection from "@/components/BlogSection";
import GetInTouchSection from "@/components/GetInTouchSection";
import Footer from "@/components/Footer";
import Galaxy from "./Galaxy";

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introRef.current) return;

    const letters = introRef.current.querySelectorAll(".letter");

    const tl = gsap.timeline({
      onComplete: () => setShowMain(true),
    });

    // Step 1: Reveal letters
    tl.fromTo(
      letters,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.08,
      }
    );

    // Step 2: Boom effect
    tl.to(letters, {
      scale: 1.5,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.5,
    });

    // Flash overlay
    tl.fromTo(
      flashRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      },
      "-=0.4"
    );
  }, []);

  const name = "Ravindra Singh";

  return (
    <>
      {!showMain ? (
        <main className="h-screen w-screen flex items-center justify-center bg-black text-white overflow-hidden relative">
          <div className="relative">
            {/* Animated name */}
            <h1
              ref={introRef}
              className="flex space-x-1 text-5xl sm:text-7xl font-extrabold font-display"
            >
              {name.split("").map((char, i) => (
                <span key={i} className="letter inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            {/* Flash overlay */}
            <div
              ref={flashRef}
              className="fixed inset-0 bg-white pointer-events-none z-50"
              style={{ opacity: 0 }}
            />
          </div>
        </main>
      ) : (
        <div className="relative min-h-screen scroll-smooth">
          <div className="fixed inset-0 -z-10">
            <Galaxy
               mouseRepulsion={true}
                mouseInteraction={true}
                density={1.5}
                glowIntensity={0.5}
                saturation={0.8}
                hueShift={240}
                transparent={false}
            />
          </div>

          {/* Foreground content */}
          <ScrollProgress />   
          <Header />
          <Hero />
          <section id="about">
            <About />
          </section>
          <section id="work">
            <Work />
          </section>
          <section id="services">
            <Services />
          </section>
          <Skills />
          <section id="blog">
            <BlogSection />
          </section>
          <section id="get-in-touch">
            <GetInTouchSection />
          </section>
          <Footer />
        </div>
      )}
    </>
  );
}
