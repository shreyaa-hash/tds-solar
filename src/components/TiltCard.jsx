import { useState, useRef } from 'react';

export default function TiltCard({ children, className = '', maxTilt = 12 }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const pctX = (mouseX / width) - 0.5;
    const pctY = (mouseY / height) - 0.5;

    // Calculate rotation angles
    const rotX = -pctY * maxTilt;
    const rotY = pctX * maxTilt;

    setRotate({ x: rotX, y: rotY });
    setGlowPos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-3xl border border-white/5 bg-zinc-950/40 p-6 shadow-2xl transition-all hover:border-secondary/20 overflow-hidden ${className}`}
    >
      {/* Dynamic Specular Light Glow Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${glowPos.x}px ${glowPos.y}px, rgba(0, 174, 239, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Children elements rendered with preserve-3d layers */}
      <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
