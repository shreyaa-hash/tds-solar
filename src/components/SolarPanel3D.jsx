import { useEffect, useRef } from 'react';

export default function SolarPanel3D() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Panel Dimensions
    const W = 125; // Half-width
    const H = 195; // Half-height
    const D = 5;   // Frame thickness
    
    const perspective = 550;
    let yaw = -0.45;    // Auto-rotation angle Y
    let pitch = 0.52;   // Tilt angle X (facing slightly upwards/optimal angle)
    let roll = -0.12;   // Tilt angle Z

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Coordinate rotation helpers
    const rotateX = (x, y, z, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x, y: y * cos - z * sin, z: y * sin + z * cos };
    };

    const rotateY = (x, y, z, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: x * cos - z * sin, y, z: x * sin + z * cos };
    };

    const rotateZ = (x, y, z, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: x * cos - y * sin, y: x * sin + y * cos, z };
    };

    // Project 3D point to 2D
    const project = (x, y, z, cx, cy) => {
      let pt = rotateY(x, y, z, yaw);
      pt = rotateX(pt.x, pt.y, pt.z, pitch);
      pt = rotateZ(pt.x, pt.y, pt.z, roll);

      const scale = perspective / (perspective + pt.z);
      return {
        x: pt.x * scale + cx,
        y: pt.y * scale + cy,
        z: pt.z,
        raw: pt
      };
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      mouseRef.current.targetX = (e.clientX - cx) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - cy) / (rect.height / 2);
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      const cx = canvas.width / (2 * window.devicePixelRatio);
      const cy = canvas.height / (2 * window.devicePixelRatio);
      
      ctx.clearRect(0, 0, cx * 2, cy * 2);

      // Damp mouse interaction
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Base rotations with mouse influence
      yaw = -0.45 + mouseRef.current.x * 0.2;
      pitch = 0.52 + mouseRef.current.y * 0.15;

      // Define 3D vertices of panel frame (cuboid)
      const f0 = project(-W, -H, D, cx, cy);
      const f1 = project(W, -H, D, cx, cy);
      const f2 = project(W, H, D, cx, cy);
      const f3 = project(-W, H, D, cx, cy);

      const b0 = project(-W, -H, -D, cx, cy);
      const b1 = project(W, -H, -D, cx, cy);
      const b2 = project(W, H, -D, cx, cy);
      const b3 = project(-W, H, -D, cx, cy);

      // 1. Draw frame shadow
      ctx.beginPath();
      ctx.moveTo(b0.x, b0.y + 40);
      ctx.lineTo(b1.x, b1.y + 40);
      ctx.lineTo(b2.x, b2.y + 40);
      ctx.lineTo(b3.x, b3.y + 40);
      ctx.closePath();
      ctx.fillStyle = 'rgba(2, 6, 23, 0.45)';
      ctx.filter = 'blur(16px)';
      ctx.fill();
      ctx.filter = 'none';

      const drawFace = (p0, p1, p2, p3, fillStyle) => {
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      };

      // 2. Draw metallic frame sides
      drawFace(f3, f2, b2, b3, 'linear-gradient(90deg, #1c253b, #384561, #1c253b)');
      drawFace(f1, b1, b2, f2, '#2d3850');
      drawFace(f0, b0, b3, f3, '#1a2236');
      drawFace(f0, f1, b1, b0, '#384561');

      // 3. Draw main solar panel active cells (Front silicon plate)
      ctx.beginPath();
      ctx.moveTo(f0.x, f0.y);
      ctx.lineTo(f1.x, f1.y);
      ctx.lineTo(f2.x, f2.y);
      ctx.lineTo(f3.x, f3.y);
      ctx.closePath();
      
      const siliconGrad = ctx.createLinearGradient(f0.x, f0.y, f2.x, f2.y);
      siliconGrad.addColorStop(0, '#0a1428'); // Corporate dark slate blue
      siliconGrad.addColorStop(0.5, '#0e1d3a');
      siliconGrad.addColorStop(1, '#070f1e');
      ctx.fillStyle = siliconGrad;
      ctx.fill();

      // 4. Draw solar cells grid (4x6 grid of rectangular cells)
      const cols = 4;
      const rows = 6;
      const cellGap = 3.5;
      const cellW = (W * 2 - (cols + 1) * cellGap) / cols;
      const cellH = (H * 2 - (rows + 1) * cellGap) / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cellLeft = -W + cellGap + c * (cellW + cellGap);
          const cellRight = cellLeft + cellW;
          const cellTop = -H + cellGap + r * (cellH + cellGap);
          const cellBottom = cellTop + cellH;

          const c0 = project(cellLeft, cellTop, D, cx, cy);
          const c1 = project(cellRight, cellTop, D, cx, cy);
          const c2 = project(cellRight, cellBottom, D, cx, cy);
          const c3 = project(cellLeft, cellBottom, D, cx, cy);

          ctx.beginPath();
          ctx.moveTo(c0.x, c0.y);
          ctx.lineTo(c1.x, c1.y);
          ctx.lineTo(c2.x, c2.y);
          ctx.lineTo(c3.x, c3.y);
          ctx.closePath();

          ctx.fillStyle = 'rgba(10, 26, 56, 0.9)';
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // 5. Draw cell-boundary grids (silver-white conductors overlay)
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.2)';
      ctx.lineWidth = 1;
      
      // Vertical grids
      for (let c = 1; c < cols; c++) {
        const xOffset = -W + c * (W * 2 / cols);
        const start = project(xOffset, -H, D, cx, cy);
        const end = project(xOffset, H, D, cx, cy);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      // Horizontal grids
      for (let r = 1; r < rows; r++) {
        const yOffset = -H + r * (H * 2 / rows);
        const start = project(-W, yOffset, D, cx, cy);
        const end = project(W, yOffset, D, cx, cy);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      // 6. Sunlight Glare/Reflection Sweep (Clean, realistic sunlight glare reflection)
      ctx.beginPath();
      ctx.moveTo(f0.x, f0.y);
      ctx.lineTo(f1.x, f1.y);
      ctx.lineTo(f2.x, f2.y);
      ctx.lineTo(f3.x, f3.y);
      ctx.closePath();

      const glarePos = 0.5 + Math.sin(Date.now() / 3500) * 0.15 + mouseRef.current.x * 0.15;
      const glareGrad = ctx.createLinearGradient(
        f0.x + (f2.x - f0.x) * (glarePos - 0.25), f0.y + (f2.y - f0.y) * (glarePos - 0.25),
        f0.x + (f2.x - f0.x) * (glarePos + 0.25), f0.y + (f2.y - f0.y) * (glarePos + 0.25)
      );
      glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      glareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      glareGrad.addColorStop(0.75, 'rgba(0, 174, 239, 0.04)'); // Soft tech blue
      glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = glareGrad;
      ctx.fill();

      // Outer bezel highlight
      ctx.beginPath();
      ctx.moveTo(f0.x, f0.y);
      ctx.lineTo(f1.x, f1.y);
      ctx.lineTo(f2.x, f2.y);
      ctx.lineTo(f3.x, f3.y);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      {/* Tech blue backing aura */}
      <div className="absolute w-72 h-72 rounded-full bg-[radial-gradient(circle,_rgba(0,174,239,0.06)_0%,_transparent_70%)] animate-pulse-glow" />
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[500px] max-h-[500px]"
      />
    </div>
  );
}
