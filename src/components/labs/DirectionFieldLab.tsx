import React, { useState, useEffect, useRef } from 'react';
import { Compass, Trash2 } from 'lucide-react';

export const DirectionFieldLab: React.FC = () => {
  const [edoKey, setEdoKey] = useState<'x_minus_y' | 'k_y' | 'neg_x_div_y' | 'logistic'>('x_minus_y');
  const [userCurves, setUserCurves] = useState<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const edos = {
    x_minus_y: { label: "dy/dx = x - y (Enfriamiento)", func: (x: number, y: number) => x - y },
    k_y: { label: "dy/dx = 0.5y (Crecimiento Exponencial)", func: (x: number, y: number) => 0.5 * y },
    neg_x_div_y: { label: "dy/dx = -x / y (Círculos Concentrícos)", func: (x: number, y: number) => Math.abs(y) < 0.01 ? 10 : -x / y },
    logistic: { label: "dy/dx = 0.5y(1 - y/3) (Crecimiento Logístico)", func: (x: number, y: number) => 0.5 * y * (1 - y / 3) },
  };

  const selectedEdo = edos[edoKey];

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

    const minX = -4, maxX = 4;
    const minY = -4, maxY = 4;

    const toPxX = (x: number) => ((x - minX) / (maxX - minX)) * width;
    const toPxY = (y: number) => height - ((y - minY) / (maxY - minY)) * height;

    // Axes
    ctx.strokeStyle = 'rgba(216, 180, 254, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, toPxY(0)); ctx.lineTo(width, toPxY(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(toPxX(0), 0); ctx.lineTo(toPxX(0), height); ctx.stroke();

    // Slope Field Arrows
    const stepGrid = 0.4;
    const segLength = 10;
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.45)';
    ctx.lineWidth = 1.2;

    for (let x = minX + 0.2; x <= maxX; x += stepGrid) {
      for (let y = minY + 0.2; y <= maxY; y += stepGrid) {
        const m = selectedEdo.func(x, y);
        const angle = Math.atan(m);
        const cx = toPxX(x); const cy = toPxY(y);
        const dx = (segLength / 2) * Math.cos(angle);
        const dy = (segLength / 2) * Math.sin(angle);
        ctx.beginPath(); ctx.moveTo(cx - dx, cy + dy); ctx.lineTo(cx + dx, cy - dy); ctx.stroke();
      }
    }

    // User Solution Curves
    userCurves.forEach((initial) => {
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      let currX = initial.x; let currY = initial.y;
      const dt = 0.02;
      ctx.moveTo(toPxX(currX), toPxY(currY));

      for (let i = 0; i < 300; i++) {
        const slope = selectedEdo.func(currX, currY);
        currX += dt; currY += slope * dt;
        if (currX > maxX || currY > maxY || currY < minY) break;
        ctx.lineTo(toPxX(currX), toPxY(currY));
      }

      currX = initial.x; currY = initial.y;
      ctx.moveTo(toPxX(currX), toPxY(currY));

      for (let i = 0; i < 300; i++) {
        const slope = selectedEdo.func(currX, currY);
        currX -= dt; currY -= slope * dt;
        if (currX < minX || currY > maxY || currY < minY) break;
        ctx.lineTo(toPxX(currX), toPxY(currY));
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(toPxX(initial.x), toPxY(initial.y), 5, 0, Math.PI * 2); ctx.fill();
    });
  }, [edoKey, userCurves, selectedEdo]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const minX = -4, maxX = 4; const minY = -4, maxY = 4;
    const valX = minX + (clickX / rect.width) * (maxX - minX);
    const valY = minY + ((rect.height - clickY) / rect.height) * (maxY - minY);

    setUserCurves((prev) => [...prev, { x: valX, y: valY }]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#38bdf8]" />
          <span>Laboratorio BTS: Campos de Direcciones 💜</span>
        </h2>
        <p className="text-sm text-[#c084fc]">
          Haz click en cualquier punto del gráfico para soltar una gota de solución y ver la trayectoria del campo de EDOs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#e9d5ff]">Selecciona la Ecuación Diferencial:</label>
            <select
              value={edoKey}
              onChange={(e) => {
                setEdoKey(e.target.value as any);
                setUserCurves([]);
              }}
              className="w-full p-3 rounded-xl bg-[#0f0a1c] border border-[#a855f7]/30 text-white focus:outline-none focus:border-[#a855f7]"
            >
              {Object.entries(edos).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f0a1c] border border-[#a855f7]/20 space-y-2 text-sm text-[#e9d5ff]">
            <div className="font-bold text-[#38bdf8]">💡 Instrucción:</div>
            <p className="text-xs leading-relaxed text-[#c084fc]">
              Las flechitas muestran la pendiente dy/dx en cada punto. Al hacer click, verás cómo la curva solución sigue la corriente.
            </p>
          </div>

          <button
            onClick={() => setUserCurves([])}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl font-bold bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/30 hover:bg-[#ef4444]/30 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpiar Curvas Solución</span>
          </button>
        </div>

        <div className="lg:col-span-2 bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-4 h-[420px] relative overflow-hidden cursor-crosshair">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full rounded-2xl block"
          />
        </div>
      </div>
    </div>
  );
};
