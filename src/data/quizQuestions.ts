import { QuizQuestion } from '../types';

export const quizQuestions: Record<'diferencial' | 'integral' | 'edos', QuizQuestion[]> = {
  diferencial: [
    {
      question: 'RM te pregunta: ¿Qué nos indica el límite de una función cuando nos acercamos a x = a?',
      formula: '\\lim_{x \\to a} f(x) = L',
      options: [
        'El área del escenario',
        'Hacia qué valor o altura van encaminados nuestros pasos',
        'La cantidad de integrantes de BTS',
        'El valor máximo siempre'
      ],
      correct: 1,
      hint: 'RM te recuerda: Al límite solo le importa hacia dónde van tus pasos al acercarte.'
    },
    {
      question: 'J-Hope te desafía: Si f(x) = 5x^3 - 4x^2 + 7, ¿cuál es su derivada instantánea f\'(x)?',
      formula: 'f(x) = 5x^3 - 4x^2 + 7',
      options: [
        'f\'(x) = 15x^2 - 8x',
        'f\'(x) = 5x^2 - 4x',
        'f\'(x) = 15x^3 - 8x^2',
        'f\'(x) = 15x^2 - 8x + 7'
      ],
      correct: 0,
      hint: 'Multiplica el exponente por el número de enfrente y réstale 1 al exponente (5*3 = 15, 4*2 = 8).'
    },
    {
      question: 'Jimin pregunta: Aplicando la Regla de la Cadena, ¿cuál es la derivada de y = (3x^2 + 2)^4?',
      formula: 'y = (3x^2 + 2)^4',
      options: [
        'y\' = 4(3x^2 + 2)^3',
        'y\' = 24x (3x^2 + 2)^3',
        'y\' = 12x (3x^2 + 2)^4',
        'y\' = 6x (3x^2 + 2)^3'
      ],
      correct: 1,
      hint: 'Deriva lo exterior 4(3x^2+2)^3 y multiplica por lo interior (6x) -> 4*6x = 24x.'
    },
    {
      question: 'Jungkook pregunta: ¿Qué ocurre en la cima más alta (máximo) de una montaña curva?',
      formula: 'f\'(x_0) = 0',
      options: [
        'La derivada vale CERO porque la pendiente está totalmente plana',
        'La función se destruye',
        'La derivada es siempre negativa',
        'La gráfica desaparece'
      ],
      correct: 0,
      hint: 'En el punto más alto, la curva ya no sube ni baja, está plana (derivada = 0).'
    },
    {
      question: 'RM te reta: ¿Cuál es el límite de (x^2 - 9)/(x - 3) cuando x tiende a 3?',
      formula: '\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}',
      options: [
        '0',
        '3',
        '6',
        'Error / Indeterminado'
      ],
      correct: 2,
      hint: 'Factoriza (x-3)(x+3), cancela (x-3) y pon x=3 -> 3+3=6.'
    }
  ],

  integral: [
    {
      question: 'Jin pregunta: ¿Qué representa la integral definida \\int_a^b f(x) dx?',
      formula: '\\int_{a}^{b} f(x) \\, dx',
      options: [
        'La inclinación de una recta',
        'El área total exacta encerrada debajo de la curva',
        'El perímetro de un rectángulo',
        'El volumen del micrófono'
      ],
      correct: 1,
      hint: 'Jin te recuerda: Suma las áreas de todas las barritas delgadas.'
    },
    {
      question: 'V pregunta: ¿Cuál es la antiderivada (integral) de f(x) = 3x^2 + 2x?',
      formula: '\\int (3x^2 + 2x) \\, dx',
      options: [
        'x^3 + x^2 + C',
        '6x + 2 + C',
        '3x^3 + 2x^2 + C',
        'x^3 + 2x^2 + C'
      ],
      correct: 0,
      hint: 'Suma 1 al exponente y divide: 3*(x^3/3) + 2*(x^2/2) = x^3 + x^2 + C.'
    },
    {
      question: 'Suga pregunta: Para \\int 2x e^{x^2} dx, ¿cuál sustitución u funciona?',
      formula: '\\int 2x e^{x^2} \\, dx',
      options: [
        'u = e^x',
        'u = x^2',
        'u = 2x',
        'u = e^{x^2}'
      ],
      correct: 1,
      hint: 'Si u = x^2, su derivada es du = 2x dx (que está ahí al lado).'
    },
    {
      question: 'J-Hope canta: ¿Cuál es la fórmula de integración por partes?',
      formula: '\\int u \\, dv = ?',
      options: [
        'u \\cdot v - \\int v \\, du',
        'u \\cdot v + \\int v \\, du',
        'u / v - \\int du',
        'u^2 \\cdot v'
      ],
      correct: 0,
      hint: 'Un Día Vi Una Vaca Sin Cola Vestida De Uniforme: u*v - \\int v*du.'
    },
    {
      question: 'Jungkook pregunta: ¿Cuánto vale la integral \\int_0^1 x^3 dx?',
      formula: '\\int_{0}^{1} x^3 \\, dx',
      options: [
        '1/3',
        '1/4',
        '1',
        '1/2'
      ],
      correct: 1,
      hint: 'Integral: x^4 / 4 evaluada de 0 a 1 -> (1^4/4) - 0 = 1/4.'
    }
  ],

  edos: [
    {
      question: 'Suga pregunta: ¿De qué orden es la EDO y\'\' + 4y\' + 3y = sin(x)?',
      formula: '\\frac{d^2y}{dx^2} + 4\\frac{dy}{dx} + 3y = \\sin(x)',
      options: [
        'Primer orden',
        'Segundo orden',
        'Tercer orden',
        'Orden cero'
      ],
      correct: 1,
      hint: 'La derivada más alta es d²y/dx² (2do orden).'
    },
    {
      question: 'RM pregunta: ¿Cuál es la solución de la EDO dy/dx = 3x^2?',
      formula: '\\frac{dy}{dx} = 3x^2',
      options: [
        'y = x^3 + C',
        'y = 6x + C',
        'y = e^{3x^2}',
        'y = x^2 + 3C'
      ],
      correct: 0,
      hint: 'Separa dy = 3x^2 dx e integra ambos lados: y = x^3 + C.'
    },
    {
      question: 'Jin pregunta: En y\' + P(x)y = Q(x), ¿cuál es el Factor Integrante \\mu(x)?',
      formula: '\\mu(x) = ?',
      options: [
        '\\mu(x) = \\int P(x) dx',
        '\\mu(x) = e^{\\int P(x) dx}',
        '\\mu(x) = e^{Q(x)}',
        '\\mu(x) = P(x) \\cdot Q(x)'
      ],
      correct: 1,
      hint: 'Es la función exponencial e elevada a la integral de P(x).'
    },
    {
      question: 'V pregunta: ¿Qué muestra un campo de direcciones en el gráfico?',
      formula: 'y\' = f(x,y)',
      options: [
        'La velocidad de las bocinas',
        'Pequeñas flechitas que indican hacia dónde se mueve la función en cada punto',
        'Los números primos',
        'Una lista de tareas'
      ],
      correct: 1,
      hint: 'Flechitas de dirección que marcan la trayectoria de la corriente.'
    },
    {
      question: 'Jungkook pregunta: ¿Qué modela la EDO dT/dt = -k(T - T_amb)?',
      formula: '\\frac{dT}{dt} = -k(T - T_{amb})',
      options: [
        'Crecimiento de seguidores',
        'Ley de Enfriamiento de Newton (temperatura del café o comida)',
        'Caída Libre',
        'Pasos de baile'
      ],
      correct: 1,
      hint: 'Modela cómo un objeto ajusta su temperatura al ambiente.'
    }
  ]
};
