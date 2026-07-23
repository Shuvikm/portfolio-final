import { useEffect, useRef } from 'react';

// Use a lower particle count for better performance
const PARTICLE_COUNT = 40;
const SPIDER_COUNT = 1;

function many(n, f) {
  return [...Array(n)].map((_, i) => f(i));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function noise(x, y, t = 101) {
  const { sin } = Math;
  let w0 = sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * sin(0.4 * y + -1.3 * t + 1.0));
  let w1 = sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * sin(0.5 * x + -1.2 * t + 0.5));
  return w0 + w1;
}

export default function SpiderCursor() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Only enable if the device has a coarse pointer / isn't reduced motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { sin, cos, PI, hypot, min, max, random } = Math;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    function rnd(x = 1, dx = 0) {
      return random() * x + dx;
    }

    function drawCircle(x, y, r) {
      ctx.beginPath();
      ctx.ellipse(x, y, r, r, 0, 0, PI * 2);
      ctx.fill();
    }

    function drawLine(x0, y0, x1, y1) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      // Reduced iterations from 100 to 15 for massive performance gain
      many(15, (i) => {
        i = (i + 1) / 15;
        let x = lerp(x0, x1, i);
        let y = lerp(y0, y1, i);
        let k = noise(x / 5 + x0, y / 5 + y0) * 2;
        ctx.lineTo(x + k, y + k);
      });
      ctx.stroke();
    }

    function spawn() {
      const pts = many(PARTICLE_COUNT, () => {
        return {
          x: rnd(w),
          y: rnd(h),
          len: 0,
          r: 0
        };
      });

      const pts2 = many(9, (i) => {
        return {
          x: cos((i / 9) * PI * 2),
          y: sin((i / 9) * PI * 2)
        };
      });

      let seed = rnd(100);
      let tx = rnd(w);
      let ty = rnd(h);
      let x = rnd(w);
      let y = rnd(h);
      let kx = rnd(0.5, 0.5);
      let ky = rnd(0.5, 0.5);
      let walkRadius = { x: rnd(50, 50), y: rnd(50, 50) };
      let r = w / rnd(100, 150);

      function paintPt(pt) {
        pts2.forEach((pt2) => {
          if (!pt.len) return;
          drawLine(
            lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
            lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
            x + pt2.x * r,
            y + pt2.y * r
          );
        });
        drawCircle(pt.x, pt.y, pt.r);
      }

      return {
        follow(newX, newY) {
          tx = newX;
          ty = newY;
        },
        tick(t) {
          const selfMoveX = cos(t * kx + seed) * walkRadius.x;
          const selfMoveY = sin(t * ky + seed) * walkRadius.y;
          let fx = tx + selfMoveX;
          let fy = ty + selfMoveY;

          x += min(w / 100, (fx - x) / 10);
          y += min(w / 100, (fy - y) / 10);

          let i = 0;
          pts.forEach((pt) => {
            const dx = pt.x - x;
            const dy = pt.y - y;
            const len = hypot(dx, dy);
            let ptR = min(2, w / len / 5);
            const increasing = len < w / 10 && (i++) < 8;
            let dir = increasing ? 0.1 : -0.1;
            if (increasing) ptR *= 1.5;
            
            pt.r = ptR;
            pt.len = max(0, min(pt.len + dir, 1));
            paintPt(pt);
          });
        }
      };
    }

    const spiders = many(SPIDER_COUNT, spawn);
    let animationFrameId;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      spiders.forEach(spider => {
        spider.follow(e.clientX, e.clientY);
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    
    // Hide native cursor to let the spider be the primary pointer indicator
    document.body.classList.add('has-custom-cursor');

    function anim(time) {
      if (w !== window.innerWidth) w = canvas.width = window.innerWidth;
      if (h !== window.innerHeight) h = canvas.height = window.innerHeight;
      
      // Clear canvas instead of drawing black background
      ctx.clearRect(0, 0, w, h);
      
      // Fetch accent color dynamically or fallback to neon lime
      const accentColor = getComputedStyle(document.body).getPropertyValue('--color-accent').trim() || '#ccff00';
      ctx.fillStyle = ctx.strokeStyle = accentColor;
      
      // Draw precise aiming dot exactly at mouse coordinates so the user can click accurately
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 4, 0, PI * 2);
      ctx.fill();
      
      let t = time / 1000;
      spiders.forEach(spider => spider.tick(t));
      
      animationFrameId = requestAnimationFrame(anim);
    }
    
    animationFrameId = requestAnimationFrame(anim);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 'var(--z-cursor)',
        mixBlendMode: 'difference' // Blends nicely with the dark background
      }}
      aria-hidden="true"
    />
  );
}
