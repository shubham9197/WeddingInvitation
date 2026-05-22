"use client";

import { useRef, useEffect, useState, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BRUSH_MOBILE = 28;
const BRUSH_DESKTOP = 24;
const THRESHOLD = 40;

const HEART_D =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

/** Same SVG text size for day, month, and year */
const DATE_FONT_SIZE = 6.5;

function countOpaque(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const { data } = ctx.getImageData(0, 0, w, h);
  let n = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 80) n++;
  }
  return n;
}

function paintRedLayer(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.scale(w / 24, h / 24);
  const p = new Path2D(HEART_D);
  ctx.clip(p);

  /* Pure red 3D shine — smooth gradient only, no circle spot */
  const base = ctx.createLinearGradient(8, 2, 16, 22);
  base.addColorStop(0, "#ef5350");
  base.addColorStop(0.45, "#d32f2f");
  base.addColorStop(1, "#9a1a1a");
  ctx.fillStyle = base;
  ctx.fillRect(-1, -1, 26, 26);

  const shine = ctx.createLinearGradient(10, 0, 14, 24);
  shine.addColorStop(0, "rgba(255,255,255,0.18)");
  shine.addColorStop(0.35, "rgba(255,255,255,0.06)");
  shine.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = shine;
  ctx.fillRect(-1, -1, 26, 26);

  ctx.restore();
}

function scratchPercent(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  initialOpaque: number
) {
  if (!initialOpaque) return 0;
  const remaining = countOpaque(ctx, w, h);
  return ((initialOpaque - remaining) / initialOpaque) * 100;
}

type Props = {
  value: string;
  onRevealed: () => void;
  /** Wider hearts for the floral frame card */
  large?: boolean;
};

export function ScratchHeart({ value, onRevealed, large }: Props) {
  const uid = useId().replace(/:/g, "");
  const clipId = `heart-clip-${uid}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const doneRef = useRef(false);
  const opaqueRef = useRef(0);
  const sizeRef = useRef({ w: 120, h: 110, dpr: 1 });
  const [done, setDone] = useState(false);

  const finishReveal = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
    onRevealed();
  }, [onRevealed]);

  const tryReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || doneRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = sizeRef.current;
    if (scratchPercent(ctx, w, h, opaqueRef.current) >= THRESHOLD) finishReveal();
  }, [finishReveal]);

  const setupCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || doneRef.current) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    sizeRef.current = { w, h, dpr };
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    paintRedLayer(ctx, w, h);
    opaqueRef.current = countOpaque(ctx, w, h);
  }, []);

  useEffect(() => {
    setupCanvas();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(setupCanvas);
    ro.observe(container);
    return () => ro.disconnect();
  }, [setupCanvas]);

  const erase = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || doneRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const { dpr } = sizeRef.current;
      const x = ((clientX - rect.left) / rect.width) * rect.width * dpr;
      const y = ((clientY - rect.top) / rect.height) * rect.height * dpr;
      const brush =
        window.innerWidth < 480 ? BRUSH_MOBILE * dpr : BRUSH_DESKTOP * dpr;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const lw = rect.width * dpr;
      const lh = rect.height * dpr;

      ctx.save();
      ctx.scale(lw / 24, lh / 24);
      ctx.clip(new Path2D(HEART_D));
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x / (lw / 24), y / (lh / 24), brush / (lw / 24), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      tryReveal();
    },
    [tryReveal]
  );

  return (
    <motion.div
      ref={containerRef}
      className={
        large
          ? "relative aspect-[120/110] w-[min(30vw,132px)] min-w-[84px] max-w-[132px] touch-none select-none overflow-hidden sm:min-w-[96px]"
          : "relative aspect-[120/110] w-[min(26vw,118px)] min-w-[72px] max-w-[120px] touch-none select-none overflow-hidden sm:min-w-[82px]"
      }
      style={{ transformOrigin: "center center" }}
      animate={
        done
          ? { scale: 1 }
          : {
              scale: [1, 1.1, 1, 1.06, 1],
            }
      }
      transition={
        done
          ? { duration: 0.3 }
          : {
              duration: 1.25,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.14, 0.28, 0.42, 0.55],
              repeatDelay: 0.35,
            }
      }
    >
      {/* Soft pulse glow — syncs with heartbeat */}
      {!done && (
        <motion.div
          className="pointer-events-none absolute inset-[8%] rounded-full bg-[#e53935]/25 blur-2xl"
          aria-hidden
          animate={{
            opacity: [0.35, 0.7, 0.35, 0.55, 0.35],
            scale: [1, 1.2, 1, 1.1, 1],
          }}
          transition={{
            duration: 1.25,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.14, 0.28, 0.42, 0.55],
            repeatDelay: 0.35,
          }}
        />
      )}

      {/* Shiny golden heart */}
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <path d={HEART_D} />
          </clipPath>
          <filter id={`gold-glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#6d5318" floodOpacity="0.45" />
          </filter>
          <linearGradient id={`gold-base-${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#fff1a8" />
            <stop offset="25%" stopColor="#f0d060" />
            <stop offset="55%" stopColor="#d4af37" />
            <stop offset="85%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          <linearGradient id={`gold-shine-${uid}`} x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id={`gold-depth-${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <g filter={`url(#gold-glow-${uid})`}>
          <path fill={`url(#gold-base-${uid})`} d={HEART_D} />
          <path fill={`url(#gold-shine-${uid})`} d={HEART_D} />
          <path fill={`url(#gold-depth-${uid})`} d={HEART_D} />
        </g>
        {/* Black date — under red scratch layer; visible when you scratch */}
        <text
          x="12"
          y="13"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#000000"
          fontSize={DATE_FONT_SIZE}
          fontWeight="700"
          fontFamily="var(--font-cormorant), Georgia, serif"
          clipPath={`url(#${clipId})`}
          style={{ pointerEvents: "none" }}
        >
          {value}
        </text>
      </svg>

      {/* Red 3D scratch cover */}
      <AnimatePresence>
        {!done && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-10 h-full w-full cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
            onPointerDown={(e) => {
              scratching.current = true;
              (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
              erase(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (scratching.current) erase(e.clientX, e.clientY);
            }}
            onPointerUp={() => {
              scratching.current = false;
            }}
            onPointerCancel={() => {
              scratching.current = false;
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
