import React from 'react';

interface PolarDiagramViewerProps {
  beamAngle?: string;
  className?: string;
  cdMax?: number;
}

export const PolarDiagramViewer: React.FC<PolarDiagramViewerProps> = ({
  beamAngle = '24°',
  className = '',
  cdMax = 2800,
}) => {
  const angleNum = parseInt(beamAngle) || 24;
  const isDiffuse = beamAngle.toLowerCase().includes('diffuse') || angleNum > 80;

  const cx = 150;
  const cy = 150;
  const rMax = 110;

  const generateCurve = (spreadFactor: number, intensity: number) => {
    const points: string[] = [];
    for (let deg = -90; deg <= 90; deg += 3) {
      const rad = (deg * Math.PI) / 180;
      const cosVal = Math.max(0, Math.cos((deg / (spreadFactor * 0.9)) * (Math.PI / 2)));
      const dist = (Math.pow(cosVal, isDiffuse ? 1.2 : 4.5) * intensity * rMax);

      const x = cx + dist * Math.sin(rad);
      const y = cy + dist * Math.cos(rad);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  const curveC0 = generateCurve(angleNum / 20, 0.95);
  const curveC90 = generateCurve(angleNum / 18, 0.88);

  return (
    <div className={`relative flex flex-col items-center justify-center p-5 bg-[#0a0a0d] rounded-2xl border border-white/5 ${className}`}>
      <div className="w-full flex items-center justify-between text-[11px] text-zinc-400 mb-2 font-mono">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          <span className="text-zinc-200">C0 - C180 ({beamAngle})</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
          <span>C90 - C270</span>
        </span>
        <span className="text-zinc-300 font-semibold">{cdMax} cd/klm</span>
      </div>

      <svg viewBox="0 0 300 280" className="w-full max-w-[250px] h-auto">
        <defs>
          <radialGradient id="polarGlowMono" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric rings */}
        <circle cx={cx} cy={cy} r={rMax * 0.33} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={rMax * 0.66} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={rMax} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Radial axes */}
        <line x1={cx} y1={cy - rMax} x2={cx} y2={cy + rMax} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1={cx - rMax} y1={cy} x2={cx + rMax} y2={cy} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        <line x1={cx - rMax * 0.866} y1={cy - rMax * 0.5} x2={cx + rMax * 0.866} y2={cy + rMax * 0.5} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1={cx - rMax * 0.866} y1={cy + rMax * 0.5} x2={cx + rMax * 0.866} y2={cy - rMax * 0.5} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 2" />

        {/* Labels */}
        <text x={cx} y={cy + rMax + 14} fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">0°</text>
        <text x={cx + rMax + 14} y={cy + 3} fill="#71717a" fontSize="9" textAnchor="start" fontFamily="monospace">90°</text>
        <text x={cx - rMax - 14} y={cy + 3} fill="#71717a" fontSize="9" textAnchor="end" fontFamily="monospace">90°</text>

        {/* Luminous Curves */}
        <path d={curveC90} fill="none" stroke="#71717a" strokeWidth="1.2" strokeDasharray="4 2" />
        <path d={curveC0} fill="url(#polarGlowMono)" stroke="#ffffff" strokeWidth="1.75" />

        {/* Center emitter */}
        <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
        <circle cx={cx} cy={cy} r="7" fill="none" stroke="rgba(255,255,255,0.3)" />
      </svg>

      <div className="w-full mt-2 pt-3 border-t border-white/5 flex justify-between text-[11px] text-zinc-400 font-mono">
        <span>Optical Efficiency: <strong className="text-zinc-200">89.4%</strong></span>
        <span>Cut-off Angle: <strong className="text-zinc-200">45°</strong></span>
      </div>
    </div>
  );
};
