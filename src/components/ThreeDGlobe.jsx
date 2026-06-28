import { useEffect, useRef } from 'react';

export default function ThreeDGlobe() {
  const canvasRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Globals for Globe
    const dots = [];
    const dotCount = 180;
    const radius = 100;
    const perspective = 300;
    
    let currentRotX = 0;
    let currentRotY = 0;
    let targetRotX = 0.002;
    let targetRotY = 0.005;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Coordinate structure
    class Dot {
      constructor() {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        this.x = radius * Math.sin(phi) * Math.cos(theta);
        this.y = radius * Math.sin(phi) * Math.sin(theta);
        this.z = radius * Math.cos(phi);
      }

      // 3D rotations
      rotateX(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const y1 = this.y * cos - this.z * sin;
        const z1 = this.y * sin + this.z * cos;
        this.y = y1;
        this.z = z1;
      }

      rotateY(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x1 = this.x * cos - this.z * sin;
        const z1 = this.x * sin + this.z * cos;
        this.x = x1;
        this.z = z1;
      }

      draw(width, height) {
        // Perspective projections
        const scale = perspective / (perspective + this.z);
        const projX = this.x * scale + width / 2;
        const projY = this.y * scale + height / 2;
        const size = Math.max(0.5, (scale * 2.2));

        // Depth opacity (dots in front are brighter, dots in back are fainter)
        const alpha = Math.max(0.08, Math.min(1, (this.z + radius) / (2 * radius) * 0.8 + 0.1));

        ctx.beginPath();
        ctx.arc(projX, projY, size, 0, Math.PI * 2);
        // Solar-tech styling (Gradient Tech-Blue highlights)
        ctx.fillStyle = `rgba(0, 174, 239, ${alpha})`;
        ctx.fill();
      }
    }

    // Initialize dots on sphere
    for (let i = 0; i < dotCount; i++) {
      dots.push(new Dot());
    }

    // Drag to spin interaction
    const handleMouseDown = (e) => {
      dragRef.current.isDragging = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.rotX = targetRotX;
      dragRef.current.rotY = targetRotY;
    };

    const handleMouseMove = (e) => {
      if (!dragRef.current.isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      
      targetRotY = dragRef.current.rotY + dx * 0.005;
      targetRotX = dragRef.current.rotX - dy * 0.005;
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation request loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, width, height);

      // Auto-spin inertia
      if (!dragRef.current.isDragging) {
        targetRotY += 0.0015;
        targetRotX *= 0.95; // Return to flat equator spin
      }

      currentRotX += (targetRotX - currentRotX) * 0.1;
      currentRotY += (targetRotY - currentRotY) * 0.1;

      // Draw faint background grid circle
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 174, 239, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotate and draw dots
      dots.forEach((dot) => {
        dot.rotateX(currentRotX);
        dot.rotateY(currentRotY);
      });

      // Sort by depth (z) to render properly
      const sortedDots = [...dots].sort((a, b) => b.z - a.z);
      sortedDots.forEach((dot) => {
        dot.draw(width, height);
      });

      // Clear current increment rotations
      currentRotX = 0;
      currentRotY = 0;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-w-[280px] max-h-[280px] cursor-grab active:cursor-grabbing mx-auto"
    />
  );
}
