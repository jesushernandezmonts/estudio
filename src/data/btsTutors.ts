export interface BTSTutor {
  id: string;
  name: string;
  stageName: string;
  role: string;
  emoji: string;
  color: string;
  gradient: string;
  badge: string;
  catchphrase: string;
  greeting: string;
  description: string;
}

export const btsTutors: BTSTutor[] = [
  {
    id: 'rm',
    name: 'Kim Namjoon',
    stageName: 'RM',
    role: 'Líder & Maestro del Cambio',
    emoji: '🐨',
    color: '#a855f7',
    gradient: 'from-purple-600 to-indigo-600',
    badge: 'IQ 148 Lead',
    catchphrase: '¡Dominaremos cada derivada paso a paso, ARMY!',
    greeting: '¡Hola! Soy RM. Las derivadas representan el cambio instantáneo. ¡Analicemos el mundo juntos!',
    description: 'Especialista en entender los conceptos profundos y límites del cálculo diferencial.',
  },
  {
    id: 'jin',
    name: 'Kim Seokjin',
    stageName: 'Jin',
    role: 'Worldwide Handsome Integrals',
    emoji: '🐹',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    badge: 'Worldwide Math King',
    catchphrase: '¡Tu esfuerzo en las integrales es tan radiante como mi rostro!',
    greeting: '¡Worldwide Handsome Jin a tu servicio! El cálculo integral es juntar piezas para crear belleza.',
    description: 'Experto en acumulación de áreas, integrales definidas y simetría matemática.',
  },
  {
    id: 'suga',
    name: 'Min Yoongi',
    stageName: 'Suga',
    role: 'Genio de Ritmos y EDOs',
    emoji: '🐱',
    color: '#0284c7',
    gradient: 'from-sky-500 to-blue-600',
    badge: 'EDO Beatmaker',
    catchphrase: 'No te estreses con las ecuaciones, encuentra el patrón y la lógica.',
    greeting: 'Que tal, soy Suga. Las ecuaciones diferenciales son como componer música: todo tiene su ritmo.',
    description: 'Especialista en ecuaciones diferenciales y modelos que predicen el futuro.',
  },
  {
    id: 'jhope',
    name: 'Jung Hoseok',
    stageName: 'J-Hope',
    role: 'Esperanza de la Recta Tangente',
    emoji: '🐿️',
    color: '#f97316',
    gradient: 'from-amber-500 to-orange-500',
    badge: 'Sunshine Vector',
    catchphrase: "I'm your hope, you're my hope! ¡Ánimo con la tangente!",
    greeting: '¡Hola! ¡Soy tu esperanza J-Hope! ¡Vamos a darle la mejor energía a la pendiente de la curva!',
    description: 'Lleno de energía para hacer que la recta tangente y la velocidad sean divertidas.',
  },
  {
    id: 'jimin',
    name: 'Park Jimin',
    stageName: 'Jimin',
    role: 'Maestro de Curvas Suaves',
    emoji: '🐥',
    color: '#d946ef',
    gradient: 'from-violet-500 to-fuchsia-500',
    badge: 'Graceful Calculus',
    catchphrase: '¡Paso a paso vamos a suavizar cualquier problema difícil!',
    greeting: '¡Hola ARMY! Soy Jimin. Al igual que en la danza, las sumas de Riemann requieren precisión y gracia.',
    description: 'Especialista en áreas bajo la curva y continuidad de funciones.',
  },
  {
    id: 'v',
    name: 'Kim Taehyung',
    stageName: 'V',
    role: 'Artista de Campos y Vectores',
    emoji: '🐻',
    color: '#14b8a6',
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'Visual Math Artist',
    catchphrase: 'El cálculo es arte puro. Mira cómo fluyen las líneas de dirección.',
    greeting: 'Soy V. Para mí, el cálculo es una obra de arte visual. ¡Exploremos los campos de direcciones!',
    description: 'Visión artística para entender campos vectoriales, gráficos y dirección.',
  },
  {
    id: 'jungkook',
    name: 'Jeon Jungkook',
    stageName: 'Jungkook',
    role: 'Golden Maknae de Quizzes',
    emoji: '🐰',
    color: '#eab308',
    gradient: 'from-yellow-400 to-amber-600',
    badge: 'Golden XP Master',
    catchphrase: '¡Demuestra tu poder ARMY y consigue todos los puntos de XP!',
    greeting: '¡Hey ARMY! Soy Jungkook. ¡Demostremos de qué estamos hechos superando todos los Quizzes!',
    description: 'El Golden Maknae apasionado por los desafíos, quizzes de velocidad y subir de nivel.',
  },
];
