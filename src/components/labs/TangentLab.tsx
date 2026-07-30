import React, { useState, useEffect, useRef } from 'react';
import { LineChart } from 'lucide-react';

export const TangentLab: React.FC = () => {
  const [funcKey, setFuncKey] = useState<'x2' | 'x3' | 'sin' | 'exp'>('x2');
  const [xVal, setXVal] = useState(1.0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const funcs = {
    x2: { label: 'f(x) = x² (Parábola de Ritmo)', f: (x: number) => x * x, df: (x: number) => 2 * x },
    x3: { label: 'f(x) = x³ - 3x (Onda Dynamite)', f: (x: number) => x * x * x - 3 * x, df: (x: number) => 3 * x * x - 3 },
    sin: { label: 'f(x) = sin(x) (Onda Butter)', f: (x: number) => Math.sin(x), df: (x: number) => Math.cos(x) },
    exp: { label: 'f(x) = e^(0.5x) (Crecimiento ARMY)', f: (x: number) => Math.exp(0.5 * x), df: (x: number) => 0.5 * Math.exp(0.5 * x) },
  };

  const selectedFunc = funcs[funcKey];
  const yVal = selectedFunc.f(xVal);
  const slope = selectedFunc.df(xVal);
  const bIntercept = yVal - slope * xVal;

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

    // Background
    ctx.fillStyle = '#0f0a1c';
    ctx.fillRect(0, 0, width, height);

    const scaleX = width / 8;
    const scaleY = height / 8;
    const originX = width / 2;
    const originY = height / 2;

    // Grid
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
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

    // Curve
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px <= width; px += 2) {
      const x = (px - originX) / scaleX;
      const y = selectedFunc.f(x);
      const py = originY - y * scaleY;
      if (first) { ctx.moveTo(px, py); first = false; }
      else { ctx.lineTo(px, py); }
    }
    ctx.stroke();

    // Tangent Line
    ctx.strokeStyle = '#f472b6';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    const xLeft = -4; const yLeft = slope * xLeft + bIntercept;
    const xRight = 4; const yRight = slope * xRight + bIntercept;
    ctx.moveTo(originX + xLeft * scaleX, originY - yLeft * scaleY);
    ctx.lineTo(originX + xRight * scaleX, originY - yRight * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Point
    const pointPx = originX + xVal * scaleX;
    const pointPy = originY - yVal * scaleY;

    ctx.fillStyle = '#f472b6';
    ctx.shadowColor = '#f472b6';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(pointPx, pointPy, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [funcKey, xVal, selectedFunc, slope, bIntercept, yVal]);

  return (
    <div className="space-y-6">
      <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
          <LineChart className="w-6 h-6 text-[#a855f7]" />
          <span>Laboratorio BTS: La Recta Tangente 💜</span>
        </h2>
        <p className="text-sm text-[#c084fc]">
          Desliza el valor de x para ver cómo la pendiente m = f'(x) se adapta instantáneamente a la curva.
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
              {Object.entries(funcs).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-[#e9d5ff]">
              <span>Punto x₀:</span>
              <span className="text-[#f472b6] font-mono">{xVal.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={xVal}
              onChange={(e) => setXVal(parseFloat(e.target.value))}
              className="w-full accent-[#a855f7]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#0f0a1c] border border-[#a855f7]/20 space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-[#c084fc]">f(x₀):</span>
              <span className="text-white font-bold">{yVal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#f472b6]">Pendiente f'(x₀):</span>
              <span className="text-[#f472b6] font-bold">{slope.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#a855f7]/20 text-xs text-[#e9d5ff]">
              Ecuación: y = {slope.toFixed(2)}x {bIntercept >= 0 ? `+ ${bIntercept.toFixed(2)}` : `- ${Math.abs(bIntercept).toFixed(2)}`}
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
