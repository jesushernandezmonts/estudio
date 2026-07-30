import React, { useState, useEffect, useRef } from 'react';
import { BarChart2 } from 'lucide-react';

export const RiemannLab: React.FC = () => {
  const [funcKey, setFuncKey] = useState<'x2' | 'sin' | 'poly'>('x2');
  const [nRects, setNRects] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const configs = {
    x2: { label: 'f(x) = x² en [0, 2]', f: (x: number) => x * x, a: 0, b: 2, exact: 8 / 3 },
    sin: { label: 'f(x) = sin(x) + 1.2 en [0, π]', f: (x: number) => Math.sin(x) + 1.2, a: 0, b: Math.PI, exact: 2 + 1.2 * Math.PI },
    poly: { label: 'f(x) = 4 - x² en [0, 2]', f: (x: number) => 4 - x * x, a: 0, b: 2, exact: 16 / 3 },
  };

  const cfg = configs[funcKey];
  const dx = (cfg.b - cfg.a) / nRects;
  let sum = 0;
  for (let i = 0; i < nRects; i++) {
    sum += cfg.f(cfg.a + i * dx) * dx;
  }
  const error = Math.abs(cfg.exact - sum);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.fillStyle = '#0f0a1c';
    ctx.fillRect(0, 0, width, height);

    const margin = 50;
    const graphWidth = width - 2 * margin;
    const graphHeight = height - 2 * margin;

    const minX = cfg.a - 0.5; const maxX = cfg.b + 0.5;
    const minY = -0.5; const maxY = 6;

    const toPxX = (x: number) => margin + ((x - minX) / (maxX - minX)) * graphWidth;
    const toPxY = (y: number) => (height - margin) - ((y - minY) / (maxY - minY)) * graphHeight;

    // Grid / Axes
    ctx.strokeStyle = 'rgba(216, 180, 254, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(margin, toPxY(0)); ctx.lineTo(width - margin, toPxY(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(toPxX(0), margin); ctx.lineTo(toPxX(0), height - margin); ctx.stroke();

    // Rectangles
    ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.85)';
    ctx.lineWidth = 1.5;

    for (let i = 0; i < nRects; i++) {
      const xLeft = cfg.a + i * dx;
      const hVal = cfg.f(xLeft);

      const rx = toPxX(xLeft);
      const rw = toPxX(xLeft + dx) - rx;
      const ry = toPxY(hVal);
      const rh = toPxY(0) - ry;

      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeRect(rx, ry, rw, rh);
    }

    // Curve
    ctx.strokeStyle = '#e9d5ff';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    let first = true;
    for (let x = cfg.a - 0.2; x <= cfg.b + 0.2; x += 0.02) {
      const px = toPxX(x); const py = toPxY(cfg.f(x));
      if (first) { ctx.moveTo(px, py); first = false; }
      else { ctx.lineTo(px, py); }
    }
    ctx.stroke();
  }, [funcKey, nRects, cfg, dx]);

  return (
    <div className="space-y-6">
      <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-[#f472b6]" />
          <span>Laboratorio BTS: Sumas de Riemann 💜</span>
        </h2>
        <p className="text-sm text-[#c084fc]">
          Aumenta el número de rectángulos n para ver cómo el área estimada se acerca al valor exacto de la integral.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#e9d5ff]">Selecciona la Función f(x):</label>
            <select
              value={funcKey}
              onChange={(e) => setFuncKey(e.target.value as any)}
              className="w-full p-3 rounded-xl bg-[#0f0a1c] border border-[#a855f7]/30 text-white focus:outline-none focus:border-[#a855f7]"
            >
              {Object.entries(configs).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-[#e9d5ff]">
              <span>Rectángulos (n):</span>
              <span className="text-[#f472b6] font-mono">{nRects}</span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={nRects}
              onChange={(e) => setNRects(parseInt(e.target.value))}
              className="w-full accent-[#f472b6]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#0f0a1c] border border-[#a855f7]/20 space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-[#c084fc]">Suma de Riemann:</span>
              <span className="text-white font-bold">{sum.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#f472b6]">Área Exacta ∫:</span>
              <span className="text-[#f472b6] font-bold">{cfg.exact.toFixed(3)}</span>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-[#a855f7]/20">
              <span className="text-[#e9d5ff]">Margen de Error:</span>
              <span className="text-[#fbbf24] font-bold">{error.toFixed(3)}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-4 h-[420px] relative overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full rounded-2xl block" />
        </div>
      </div>
    </div>
  );
};
