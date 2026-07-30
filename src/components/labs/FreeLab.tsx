import React, { useState, useEffect, useRef } from 'react';
import { Calculator, ShieldCheck } from 'lucide-react';
import { parse, compile } from 'mathjs';

export const FreeLab: React.FC = () => {
  const [expression, setExpression] = useState('x^2 - 2');
  const [xVal, setXVal] = useState(1.0);
  const [evalError, setEvalError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const scaleX = width / 8; const scaleY = height / 8;
    const originX = width / 2; const originY = height / 2;

    // Grid
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
    ctx.lineWidth = 1;
    for (let x = -4; x <= 4; x += 1) {
      const px = originX + x * scaleX;
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, height); ctx.stroke();
    }
    for (let y = -4; y <= 4; y += 1) {
      const py = originY - y * scaleY;
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(width, py); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(216, 180, 254, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(width, originY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, height); ctx.stroke();

    try {
      const compiled = compile(expression);
      setEvalError(false);

      const f = (x: number) => {
        try {
          const res = compiled.evaluate({ x });
          return typeof res === 'number' ? res : NaN;
        } catch {
          return NaN;
        }
      };

      // Curve
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      let first = true;
      for (let px = 0; px <= width; px += 2) {
        const x = (px - originX) / scaleX;
        const y = f(x);
        const py = originY - y * scaleY;
        if (!isNaN(py) && isFinite(py)) {
          if (first) { ctx.moveTo(px, py); first = false; }
          else { ctx.lineTo(px, py); }
        }
      }
      ctx.stroke();

      // Derivative & Tangent at xVal
      const y0 = f(xVal);
      const h = 0.001;
      const slope = (f(xVal + h) - f(xVal - h)) / (2 * h);

      if (!isNaN(y0) && !isNaN(slope) && isFinite(y0) && isFinite(slope)) {
        const b = y0 - slope * xVal;
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(originX + (-4) * scaleX, originY - (slope * (-4) + b) * scaleY);
        ctx.lineTo(originX + 4 * scaleX, originY - (slope * 4 + b) * scaleY);
        ctx.stroke();
        ctx.setLineDash([]);

        const pointPx = originX + xVal * scaleX;
        const pointPy = originY - y0 * scaleY;
        ctx.fillStyle = '#f472b6';
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(pointPx, pointPy, 7, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
    } catch {
      setEvalError(true);
    }
  }, [expression, xVal]);

  return (
    <div className="space-y-6">
      <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#fbbf24]" />
            <span>Laboratorio Libre de Funciones 🧮</span>
          </h2>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Evaluador Math.js Seguro (Sin eval)
          </span>
        </div>
        <p className="text-sm text-[#c084fc]">
          Escribe cualquier función f(x) para graficarla y derivarla en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#e9d5ff]">Escribe tu Función f(x):</label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Ej. x^3 - 3*x, sin(x), exp(x)"
              className="w-full p-3 rounded-xl bg-[#0f0a1c] border border-[#a855f7]/30 text-white font-mono focus:outline-none focus:border-[#a855f7]"
            />
            {evalError && (
              <span className="text-xs text-[#ef4444]">Expresión matemática no válida. Ejemplos: x^2, sin(x), cos(x).</span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-[#e9d5ff]">
              <span>Punto x₀:</span>
              <span className="text-[#fbbf24] font-mono">{xVal.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={xVal}
              onChange={(e) => setXVal(parseFloat(e.target.value))}
              className="w-full accent-[#fbbf24]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#0f0a1c] border border-[#a855f7]/20 space-y-2 text-xs text-[#c084fc]">
            <div className="font-bold text-[#fbbf24]">💡 Ejemplos recomendados:</div>
            <ul className="list-disc list-inside space-y-1">
              <li><code>x^2 - 4</code></li>
              <li><code>sin(2*x)</code></li>
              <li><code>exp(0.5*x)</code></li>
              <li><code>x^3 - 2*x</code></li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-4 h-[420px] relative overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full rounded-2xl block" />
        </div>
      </div>
    </div>
  );
};
