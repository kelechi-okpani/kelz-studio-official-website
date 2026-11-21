"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Put your files in /public/videos/. The poster is shown first, and whenever the video is not played.
const VIDEO = { mp4: "/hero-worship.mp4", webm: "/videos/hero-worship.webm", poster: "/videos/hero-worship-poster.jpg" };
const PLAY_ON_MOBILE = false; // saves mobile data: phones show the poster instead

export function HeroVideo() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(box);
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);

  // Decide on the client: respect reduced motion, data saver and (optionally) small screens.
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const small = window.matchMedia("(max-width: 767px)").matches;
    setAllowed(!reduce && !nav.connection?.saveData && (PLAY_ON_MOBILE || !small));
  }, [reduce]);

  // Pause when the hero is scrolled out of view.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, allowed]);

  return (
    <div ref={box} aria-hidden className="absolute inset-0 overflow-hidden bg-[#050b18]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${VIDEO.poster})` }} />
      {allowed && (
        <video
          ref={video}
          autoPlay muted loop playsInline disablePictureInPicture preload="metadata"
          poster={VIDEO.poster} tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <source src={VIDEO.webm} type="video/webm" />
          <source src={VIDEO.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}