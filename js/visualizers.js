// BTS Visualizer Engine for Boraland Math 💜
const Visualizers = {
    // 1. TANGENT LINE VISUALIZER
    initTangentLab() {
        const canvas = document.getElementById('tangentCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const funcSelect = document.getElementById('funcSelect');
        const xSlider = document.getElementById('xSlider');
        const xValDisplay = document.getElementById('xValDisplay');
        const fxVal = document.getElementById('fxVal');
        const fprimeVal = document.getElementById('fprimeVal');
        const tangentEqDisplay = document.getElementById('tangentEqDisplay');

        const funcs = {
            x2: { f: x => x * x, df: x => 2 * x },
            x3: { f: x => x * x * x - 3 * x, df: x => 3 * x * x - 3 },
            sin: { f: x => Math.sin(x), df: x => Math.cos(x) },
            exp: { f: x => Math.exp(0.5 * x), df: x => 0.5 * Math.exp(0.5 * x) }
        };

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio || 600;
            canvas.height = rect.height * window.devicePixelRatio || 480;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            const width = rect.width;
            const height = rect.height;

            ctx.fillStyle = '#0f0a1c';
            ctx.fillRect(0, 0, width, height);

            const scaleX = width / 8;
            const scaleY = height / 8;
            const originX = width / 2;
            const originY = height / 2;

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

            ctx.strokeStyle = 'rgba(216, 180, 254, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(width, originY); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, height); ctx.stroke();

            const selected = funcs[funcSelect.value];
            const x0 = parseFloat(xSlider.value);
            const y0 = selected.f(x0);
            const m = selected.df(x0);

            xValDisplay.innerText = x0.toFixed(1);
            fxVal.innerText = y0.toFixed(2);
            fprimeVal.innerText = m.toFixed(2);

            const b = y0 - m * x0;
            const signB = b >= 0 ? `+ ${b.toFixed(2)}` : `- ${Math.abs(b).toFixed(2)}`;
            tangentEqDisplay.innerText = `y = ${m.toFixed(2)}x ${signB}`;

            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            let first = true;
            for (let px = 0; px <= width; px += 2) {
                const xVal = (px - originX) / scaleX;
                const yVal = selected.f(xVal);
                const py = originY - yVal * scaleY;
                if (first) { ctx.moveTo(px, py); first = false; }
                else { ctx.lineTo(px, py); }
            }
            ctx.stroke();

            ctx.strokeStyle = '#f472b6';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 6]);
            ctx.beginPath();
            const xLeft = -4; const yLeft = m * xLeft + b;
            const xRight = 4; const yRight = m * xRight + b;
            ctx.moveTo(originX + xLeft * scaleX, originY - yLeft * scaleY);
            ctx.lineTo(originX + xRight * scaleX, originY - yRight * scaleY);
            ctx.stroke();
            ctx.setLineDash([]);

            const pointPx = originX + x0 * scaleX;
            const pointPy = originY - y0 * scaleY;

            ctx.fillStyle = '#f472b6';
            ctx.shadowColor = '#f472b6';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(pointPx, pointPy, 7.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        };

        xSlider.addEventListener('input', draw);
        funcSelect.addEventListener('change', draw);
        window.addEventListener('resize', draw);
        draw();
    },

    // 2. RIEMANN SUM VISUALIZER
    initRiemannLab() {
        const canvas = document.getElementById('riemannCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const riemannFunc = document.getElementById('riemannFunc');
        const nRectSlider = document.getElementById('nRectSlider');
        const nRectDisplay = document.getElementById('nRectDisplay');
        const riemannSumVal = document.getElementById('riemannSumVal');
        const exactAreaVal = document.getElementById('exactAreaVal');
        const errorVal = document.getElementById('errorVal');

        const configs = {
            x2: { f: x => x * x, a: 0, b: 2, exact: 8 / 3 },
            sin: { f: x => Math.sin(x) + 1.2, a: 0, b: Math.PI, exact: 2 + 1.2 * Math.PI },
            poly: { f: x => 4 - x * x, a: 0, b: 2, exact: 16 / 3 }
        };

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio || 600;
            canvas.height = rect.height * window.devicePixelRatio || 480;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            const width = rect.width;
            const height = rect.height;

            ctx.fillStyle = '#0f0a1c';
            ctx.fillRect(0, 0, width, height);

            const cfg = configs[riemannFunc.value];
            const n = parseInt(nRectSlider.value);
            nRectDisplay.innerText = n;

            const margin = 50;
            const graphWidth = width - 2 * margin;
            const graphHeight = height - 2 * margin;

            const minX = cfg.a - 0.5; const maxX = cfg.b + 0.5;
            const minY = -0.5; const maxY = 6;

            const toPxX = x => margin + ((x - minX) / (maxX - minX)) * graphWidth;
            const toPxY = y => (height - margin) - ((y - minY) / (maxY - minY)) * graphHeight;

            ctx.strokeStyle = 'rgba(216, 180, 254, 0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(margin, toPxY(0)); ctx.lineTo(width - margin, toPxY(0)); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(toPxX(0), margin); ctx.lineTo(toPxX(0), height - margin); ctx.stroke();

            const dx = (cfg.b - cfg.a) / n;
            let sum = 0;

            ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
            ctx.strokeStyle = 'rgba(244, 114, 182, 0.85)';
            ctx.lineWidth = 1.5;

            for (let i = 0; i < n; i++) {
                const xLeft = cfg.a + i * dx;
                const hVal = cfg.f(xLeft);
                sum += hVal * dx;

                const rx = toPxX(xLeft);
                const rw = toPxX(xLeft + dx) - rx;
                const ry = toPxY(hVal);
                const rh = toPxY(0) - ry;

                ctx.fillRect(rx, ry, rw, rh);
                ctx.strokeRect(rx, ry, rw, rh);
            }

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

            riemannSumVal.innerText = sum.toFixed(3);
            exactAreaVal.innerText = cfg.exact.toFixed(3);
            errorVal.innerText = Math.abs(cfg.exact - sum).toFixed(3);
        };

        nRectSlider.addEventListener('input', draw);
        riemannFunc.addEventListener('change', draw);
        window.addEventListener('resize', draw);
        draw();
    },

    // 3. DIRECTION FIELDS LAB
    initEdoLab() {
        const canvas = document.getElementById('edoCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const edoSelect = document.getElementById('edoSelect');
        const clearBtn = document.getElementById('clearSolutionsBtn');

        const edos = {
            x_minus_y: (x, y) => x - y,
            k_y: (x, y) => 0.5 * y,
            neg_x_div_y: (x, y) => Math.abs(y) < 0.01 ? 10 : -x / y,
            logistic: (x, y) => 0.5 * y * (1 - y / 3)
        };

        let userCurves = [];

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio || 600;
            canvas.height = rect.height * window.devicePixelRatio || 480;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            const width = rect.width;
            const height = rect.height;

            ctx.fillStyle = '#0f0a1c';
            ctx.fillRect(0, 0, width, height);

            const minX = -4, maxX = 4;
            const minY = -4, maxY = 4;

            const toPxX = x => ((x - minX) / (maxX - minX)) * width;
            const toPxY = y => height - ((y - minY) / (maxY - minY)) * height;

            ctx.strokeStyle = 'rgba(216, 180, 254, 0.2)';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(0, toPxY(0)); ctx.lineTo(width, toPxY(0)); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(toPxX(0), 0); ctx.lineTo(toPxX(0), height); ctx.stroke();

            const func = edos[edoSelect.value];
            const stepGrid = 0.4;
            const segLength = 10;
            ctx.strokeStyle = 'rgba(192, 132, 252, 0.45)';
            ctx.lineWidth = 1.2;

            for (let x = minX + 0.2; x <= maxX; x += stepGrid) {
                for (let y = minY + 0.2; y <= maxY; y += stepGrid) {
                    const m = func(x, y);
                    const angle = Math.atan(m);
                    const cx = toPxX(x); const cy = toPxY(y);
                    const dx = (segLength / 2) * Math.cos(angle);
                    const dy = (segLength / 2) * Math.sin(angle);
                    ctx.beginPath(); ctx.moveTo(cx - dx, cy + dy); ctx.lineTo(cx + dx, cy - dy); ctx.stroke();
                }
            }

            userCurves.forEach(initial => {
                ctx.strokeStyle = '#f472b6';
                ctx.lineWidth = 3.5;
                ctx.shadowColor = '#f472b6';
                ctx.shadowBlur = 10;
                ctx.beginPath();

                let currX = initial.x; let currY = initial.y;
                const dt = 0.02;
                ctx.moveTo(toPxX(currX), toPxY(currY));

                for (let i = 0; i < 300; i++) {
                    const slope = func(currX, currY);
                    currX += dt; currY += slope * dt;
                    if (currX > maxX || currY > maxY || currY < minY) break;
                    ctx.lineTo(toPxX(currX), toPxY(currY));
                }

                currX = initial.x; currY = initial.y;
                ctx.moveTo(toPxX(currX), toPxY(currY));

                for (let i = 0; i < 300; i++) {
                    const slope = func(currX, currY);
                    currX -= dt; currY -= slope * dt;
                    if (currX < minX || currY > maxY || currY < minY) break;
                    ctx.lineTo(toPxX(currX), toPxY(currY));
                }
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(toPxX(initial.x), toPxY(initial.y), 5, 0, Math.PI * 2); ctx.fill();
            });
        };

        canvas.addEventListener('click', e => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const minX = -4, maxX = 4; const minY = -4, maxY = 4;
            const valX = minX + (clickX / rect.width) * (maxX - minX);
            const valY = minY + ((rect.height - clickY) / rect.height) * (maxY - minY);

            userCurves.push({ x: valX, y: valY });
            draw();
        });

        clearBtn.addEventListener('click', () => { userCurves = []; draw(); });
        edoSelect.addEventListener('change', () => { userCurves = []; draw(); });
        window.addEventListener('resize', draw);
        draw();
    },

    // 4. FREE CUSTOM FUNCTION LAB 🧮
    initFreeLab() {
        const canvas = document.getElementById('freeCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const input = document.getElementById('customFuncInput');
        const slider = document.getElementById('freeXSlider');
        const xDisplay = document.getElementById('freeXValDisplay');
        const fxVal = document.getElementById('freeFxVal');
        const fprimeVal = document.getElementById('freeFprimeVal');

        const parseFunc = (str) => {
            return x => {
                try {
                    let expr = str.replace(/sin/g, 'Math.sin')
                                 .replace(/cos/g, 'Math.cos')
                                 .replace(/exp/g, 'Math.exp')
                                 .replace(/x\^(\d+)/g, 'Math.pow(x, $1)')
                                 .replace(/(\d)x/g, '$1*x');
                    return eval(expr);
                } catch (e) {
                    return x * x; // fallback
                }
            };
        };

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio || 600;
            canvas.height = rect.height * window.devicePixelRatio || 480;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            const width = rect.width;
            const height = rect.height;

            ctx.fillStyle = '#0f0a1c';
            ctx.fillRect(0, 0, width, height);

            const scaleX = width / 8; const scaleY = height / 8;
            const originX = width / 2; const originY = height / 2;

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

            ctx.strokeStyle = 'rgba(216, 180, 254, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(width, originY); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, height); ctx.stroke();

            const f = parseFunc(input.value);
            const x0 = parseFloat(slider.value);
            xDisplay.innerText = x0.toFixed(1);

            const y0 = f(x0);
            const h = 0.001;
            const m = (f(x0 + h) - f(x0 - h)) / (2 * h);

            fxVal.innerText = isNaN(y0) ? 'Err' : y0.toFixed(2);
            fprimeVal.innerText = isNaN(m) ? 'Err' : m.toFixed(2);

            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            let first = true;
            for (let px = 0; px <= width; px += 2) {
                const xVal = (px - originX) / scaleX;
                const yVal = f(xVal);
                const py = originY - yVal * scaleY;
                if (!isNaN(py) && isFinite(py)) {
                    if (first) { ctx.moveTo(px, py); first = false; }
                    else { ctx.lineTo(px, py); }
                }
            }
            ctx.stroke();

            // Tangent Line
            if (!isNaN(y0) && !isNaN(m)) {
                const b = y0 - m * x0;
                ctx.strokeStyle = '#f472b6';
                ctx.lineWidth = 2.5;
                ctx.setLineDash([6, 6]);
                ctx.beginPath();
                ctx.moveTo(originX + (-4) * scaleX, originY - (m * (-4) + b) * scaleY);
                ctx.lineTo(originX + 4 * scaleX, originY - (m * 4 + b) * scaleY);
                ctx.stroke();
                ctx.setLineDash([]);

                const pointPx = originX + x0 * scaleX;
                const pointPy = originY - y0 * scaleY;
                ctx.fillStyle = '#f472b6';
                ctx.shadowColor = '#f472b6';
                ctx.shadowBlur = 12;
                ctx.beginPath(); ctx.arc(pointPx, pointPy, 7, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0;
            }
        };

        input.addEventListener('input', draw);
        slider.addEventListener('input', draw);
        window.addEventListener('resize', draw);
        draw();
    }
};
