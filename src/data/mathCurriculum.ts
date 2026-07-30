import { Lesson } from '../types';

export const mathCurriculum: Record<'diferencial' | 'integral' | 'edos', Lesson[]> = {
  diferencial: [
    {
      id: 'diff-1',
      title: '1. El Límite: ¿Hacia dónde nos dirigimos? (RM 🐨)',
      badge: 'RM & Teoremas',
      intro: 'Imagina que caminas hacia la primera fila en un concierto de BTS. Cada paso te acerca más al escenario. Aunque no estés pisando el escenario en sí, ¡todos ven hacia dónde ibas! Eso es un límite.',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> A un límite NUNCA le importa lo que pasa cuando llegas al punto exacto, solo le importa hacia dónde ibas caminando. Si la función tiene un "bache" o "hueco" en $x = 3$, el límite salta el hueco y te dice la altura exacta a la que ibas apuntando.',
      concept: '¿Cómo se lee la fórmula? "El límite de $f(x)$ cuando $x$ se acerca a $a$ es el valor $L$ al que llegamos".',
      formula: '\\lim_{x \\to a} f(x) = L',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** Queremos saber a dónde va $f(x) = \\frac{x^2 - 9}{x - 3}$ cuando $x$ se acerca a $3$.\n1) **Paso 1:** Si pones $x=3$ directo en la calculadora te da $\\frac{0}{0}$ (¡Error!).\n2) **Paso 2:** ¡Sin miedo! Factoriza arriba: $x^2 - 9 = (x - 3)(x + 3)$.\n3) **Paso 3:** Borramos el problema $(x - 3)$ arriba y abajo. Nos queda solo $(x + 3)$.\n4) **Paso 4:** Ahora sí ponemos $x = 3$: $3 + 3 = 6$. ¡El resultado es 6!',
      takeaway: '💡 RM dice: "Si te da 0/0, no te asustes: simplifica el problema y verás la respuesta clara."'
    },
    {
      id: 'diff-2',
      title: '2. La Derivada: El Velocímetro de tu Vida (J-Hope 🐿️)',
      badge: 'Hobi & Velocidad',
      intro: 'Si viajas en auto e hiciste 1 hora para recorrer 40 km, tu velocidad promedio fue 40 km/h. Pero en el semáforo ibas a 0 km/h y en la avenida a 70 km/h. ¡La derivada es el velocímetro que marca tu velocidad exacta en ese SEGUNDO!',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> En una gráfica de montaña rusa, la derivada es qué tan empinada está la bajada o subida en un punto exacto 📈. Si la curva sube rápido, la derivada es positiva y alta. Si está planita en la cima, la derivada vale CERO 🛑.',
      concept: 'La derivada $f\'(x)$ nos da la velocidad de cambio instantánea o la inclinación (pendiente).',
      formula: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} \\quad \\text{o la regla rápida: } \\frac{d}{dx}[x^n] = n x^{n-1}',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** La posición de un auto es $f(x) = x^2$.\n1) **Regla Mágica:** Para derivar $x^2$, bajas el 2 multiplicando y te queda $2x$.\n2) En el segundo $x = 4$, tu velocidad exacta es $2 \\times 4 = 8$.\n3) En el segundo $x = 10$, tu velocidad exacta es $2 \\times 10 = 20$. ¡Así de simple!',
      takeaway: '📈 Hobi te recuerda: "La derivada es tu velocidad actual. Si es positiva, ¡vas subiendo!"'
    },
    {
      id: 'diff-3',
      title: '3. Regla de la Cadena: Abrir un Regalo Envuelto (Jimin 🐥)',
      badge: 'Jimin & Estilo',
      intro: 'Imagina que recibes una caja de regalo grande, dentro hay una caja mediana y dentro está el regalo. Para llegar al regalo, abres primero la caja grande y luego la mediana. ¡Eso es la Regla de la Cadena!',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Cuando tienes una función guardada dentro de otra (como $(3x + 1)^5$), derivas la capa de AFUERA dejando intacto lo de adentro, y luego multiplicas por la derivada de lo de ADENTRO.',
      concept: 'Derivada de funciones compuestas: Capa exterior por capa interior.',
      formula: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** Derivar $y = (5x^2 + 1)^3$.\n1) **Capa de Afuera:** La potencia 3 pasa enfrente y baja a 2: $3(5x^2 + 1)^2$.\n2) **Capa de Adentro:** Derivamos lo que está adentro $(5x^2 + 1)$, que nos da $10x$.\n3) **Multiplicamos ambas:** $3(5x^2 + 1)^2 \\times 10x = 30x (5x^2 + 1)^2$. ¡Listo!',
      takeaway: '⚡ Jimin dice: "Deriva de afuera hacia adentro y multiplica los resultados."'
    },
    {
      id: 'diff-4',
      title: '4. Optimización: Encontrar la Cima Perfecta (Jungkook 🐰)',
      badge: 'JK & Máximos',
      intro: '¿Cómo sabe un DJ en qué segundo soltar el momento más alto de la canción para tener la MÁXIMA energía? Buscando el punto exacto donde la subida se detiene antes de bajar.',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Justo en el punto más alto de una colina (o el más bajo de un valle), la superficie no sube ni baja, está totalmente plana. ¡Por eso en los máximos y mínimos la derivada vale CERO ($f\'(x) = 0$)!',
      concept: 'Igualar la derivada a cero te da los puntos más altos (máximos) o más bajos (mínimos).',
      formula: 'f\'(x) = 0 \\implies \\text{Punto pico o valle}',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** Hallar el pico de la curva $f(x) = -x^2 + 6x$.\n1) **Derivamos:** La derivada de $-x^2 + 6x$ es $-2x + 6$.\n2) **Igualamos a cero:** $-2x + 6 = 0 \\implies 2x = 6 \\implies x = 3$.\n3) **Resultado:** El punto más alto ocurre exactamente en $x = 3$. ¡Encontraste la cima!',
      takeaway: '🌟 Jungkook te dice: "Deriva, iguala a cero y hallarás el punto de máxima energía."'
    }
  ],

  integral: [
    {
      id: 'int-1',
      title: '1. Sumas de Riemann: El Rompecabezas del Área (Jin 🐹)',
      badge: 'Jin & Rompecabezas',
      intro: 'Si quieres saber cuánta agua cabe en una piscina con forma curva y redonda, y solo tienes bloques rectangulares, ¿qué haces? Llenas la piscina con miles de bloquecitos rectangulares muy delgados.',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Integrar es simplemente **sumar infinitas barritas delgadas una al lado de la otra**. Entre más delgadas sean las barritas ($n$), más perfecto es el cálculo del área bajo la curva.',
      concept: 'La integral es la suma de todas esas barritas bajo la curva.',
      formula: '\\int_{a}^{b} f(x) \\, dx = \\text{Área total sumada desde } a \\text{ hasta } b',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** Área bajo la curva $f(x) = x^2$ entre $0$ y $2$.\n1) La fórmula de la integral para $x^2$ es subimos el exponente a 3 y dividimos: $\\frac{x^3}{3}$.\n2) Evaluamos en $2$: $\\frac{2^3}{3} = \\frac{8}{3} = 2.66$.\n3) Evaluamos en $0$: $\\frac{0^3}{3} = 0$.\n4) Restamos: $2.66 - 0 = 2.66$. ¡Esa es el área exacta!',
      takeaway: '🧩 Jin dice: "Integrar es juntar piezas delgadas para saber el total acumulado."'
    },
    {
      id: 'int-2',
      title: '2. Teorema Fundamental: El Viaje en el Tiempo (V 🐻)',
      badge: 'Taehyung & Tiempo',
      intro: 'La derivada te dice a qué velocidad cae la lluvia en este minuto. La integral te dice cuántos litros de agua se juntaron en la cubeta al final del día. ¡Son las dos caras de la misma moneda!',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Integrar es deshacer la derivada. Si quieres saber el total de lo acumulado entre el inicio ($a$) y el final ($b$), solo buscas la función original y restas el resultado del FINAL menos el del INICIO: $F(b) - F(a)$.',
      concept: 'Teorema Fundamental del Cálculo: Conecta las derivadas con las áreas acumuladas.',
      formula: '\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** Resolver $\\int_1^3 2x \\, dx$.\n1) ¿Qué función al derivarla da $2x$? La respuesta es $x^2$.\n2) Evaluamos en el final ($b = 3$): $3^2 = 9$.\n3) Evaluamos en el inicio ($a = 1$): $1^2 = 1$.\n4) Restamos final menos inicio: $9 - 1 = 8$. ¡El área acumulada es 8!',
      takeaway: '🌉 Tae te dice: "Resta el valor del final menos el del inicio y tendrás el resultado total."'
    },
    {
      id: 'int-3',
      title: '3. Integración por Sustitución: El Apodo Mágico (Suga 🐱)',
      badge: 'Suga & Atajos',
      intro: 'Cuando tienes una fórmula fea y enredada, ¿por qué complicarte? Le pones un "apodo" corto como $u$ a la parte difícil para resolverla al instante.',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Busca una parte dentro de la operación a la que puedas llamar $u$, de tal manera que su derivada también esté ahí al lado ($du$). Al cambiar la letra por $u$, la integral se vuelve súper fácil de resolver.',
      concept: 'Cambio de variable: Usamos $u$ para simplificar la expresión.',
      formula: '\\int f(g(x)) \\cdot g\'(x) \\, dx = \\int f(u) \\, du',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** Resolver $\\int 2x (x^2 + 5)^4 dx$.\n1) Llamamos $u = x^2 + 5$. Su derivada es $du = 2x dx$ (¡que ya está ahí!).\n2) La integral ahora es simplemente $\\int u^4 du$.\n3) Su respuesta es $\\frac{u^5}{5} + C$.\n4) Regresamos el nombre original de $u$: $\\frac{(x^2 + 5)^5}{5} + C$. ¡Listo!',
      takeaway: '🔑 Suga te recuerda: "Crea el apodo $u$, resuelve fácil y luego regresa a la variable original."'
    },
    {
      id: 'int-4',
      title: '4. Integración por Partes: La Regla de la Vaca (J-Hope 🐿️)',
      badge: 'Hobi & Vaca 🐮',
      intro: '¿Qué pasa cuando tienes dos funciones multiplicándose que no se pueden simplificar fácilmente (como $x \\cdot \\cos(x)$)? Usamos la rima más famosa de las matemáticas.',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Apréndete esta rima de memoria y nunca se te olvidará la fórmula:\n*"Un Día Vi Una Vaca Sin Cola Vestida De Uniforme"*\n$$\\int u \\, dv = u \\cdot v - \\int v \\, du$$',
      concept: 'Fórmula para integrar productos de dos funciones distintas.',
      formula: '\\int u \\, dv = u \\cdot v - \\int v \\, du',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** Resolver $\\int x e^x dx$.\n1) Elegimos $u = x$ (su derivada es $du = dx$).\n2) Elegimos $dv = e^x dx$ (su integral es $v = e^x$).\n3) Aplicamos la rima: $u \\cdot v - \\int v du = x e^x - \\int e^x dx$.\n4) Como la integral de $e^x$ es la misma $e^x$, la respuesta es: $x e^x - e^x + C$.',
      takeaway: '🐮 Hobi te canta: "Un Día Vi Una Vaca Sin Cola Vestida De Uniforme."'
    }
  ],

  edos: [
    {
      id: 'edo-1',
      title: '1. ¿Qué es una Ecuación Diferencial? (RM 🐨)',
      badge: 'RM & Universos',
      intro: 'En la escuela te pedían encontrar un número como respuesta (ej. $x = 5$). En Ecuaciones Diferenciales (EDOs), la respuesta no es un número... ¡Es una FÓRMULA o REGLA COMPLETA!',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Una EDO relaciona a una función con su velocidad de cambio. Sirve para predecir cosas del mundo real: como qué tan rápido se enfría una taza de café, cómo se propaga un virus o cómo crece la cantidad de fans de BTS.',
      concept: 'Una EDO es una ecuación donde la incógnita es una función y sus derivadas.',
      formula: '\\frac{dy}{dx} = \\text{Regla de cambio}',
      example: '🔍 **Ejemplo Súper Fácil:** $\\frac{dy}{dx} = y$.\nNos pregunta: "¿Qué regla o función al derivarla se queda exactamente igual a ella misma?"\n¡La respuesta es la función exponencial $y = C e^x$!',
      takeaway: '🔍 RM dice: "No busques un número, buscas la regla de cómo cambia el sistema."'
    },
    {
      id: 'edo-2',
      title: '2. Variables Separables: Cada Oveja con su Pareja (Suga 🐱)',
      badge: 'Suga & Separación',
      intro: 'Es el método más sencillo para resolver EDOs: separar todas las $y$ de un lado y todas las $x$ del otro lado.',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Imagina separar dulces morados y rosas en dos recipientes distintos. Una vez que las $y$ están a la izquierda y las $x$ a la derecha, le pones el símbolo de integrar $\\int$ a cada lado ¡y listo!',
      concept: 'Acomodar las variables de cada lado para integrar por separado.',
      formula: '\\int g(y) \\, dy = \\int f(x) \\, dx',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** Resolver $\\frac{dy}{dx} = 2x y$.\n1) **Separar:** Pasamos la $y$ dividiendo a la izquierda y $dx$ multiplicando a la derecha: $\\frac{1}{y} dy = 2x dx$.\n2) **Integrar ambos lados:** $\\int \\frac{1}{y} dy = \\int 2x dx$.\n3) **Resultados:** $\\ln(y) = x^2 + C$.\n4) **Despejar $y$:** $y = e^{x^2 + C}$. ¡Separaste y solucionaste!',
      takeaway: '✂️ Suga dice: "Junta las $y$ con las $y$, las $x$ con las $x$ e integra cada lado."'
    },
    {
      id: 'edo-3',
      title: '3. Factor Integrante: El Ingrediente Secreto (Jin 🐹)',
      badge: 'Jin & Factor Mágico',
      intro: '¿Qué pasa si las $x$ y las $y$ están atrapadas juntas en una suma y no las puedes separar fácilmente? Usamos un ingrediente secreto.',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Multiplicamos toda la ecuación por una fórmula mágica llamada Factor Integrante $\\mu(x) = e^{\\int P(x)dx}$. Esto hace que la parte difícil se convierta al instante en una derivada súper fácil de resolver.',
      concept: 'El Factor Integrante desatora las ecuaciones lineales difíciles.',
      formula: '\\mu(x) = e^{\\int P(x) \\, dx}',
      example: '🔍 **Ejemplo Súper Fácil Paso a Paso:** En $y\' + 1y = e^{2x}$, el término al lado de la $y$ es $1$.\n1) El factor mágico es $e^{\\int 1 dx} = e^x$.\n2) Multiplicamos todo por $e^x$: el problema se simplifica y nos permite despejar $y$ rápidamente.',
      takeaway: '🧙‍♂️ Jin dice: "El factor integrante abre la puerta a las ecuaciones que parecían atascadas."'
    },
    {
      id: 'edo-4',
      title: '4. Campos de Direcciones: El Mapa de Flechitas (V & JK 🐻🐰)',
      badge: 'V & JK Arte',
      intro: '¿Puedes saber hacia dónde viajará un barco flotando en el mar sin hacer cálculos complejos? Sí, observando la dirección hacia la que empujan las olas.',
      chidoExplanation: '🔥 <strong>Explicación Súper Fácil:</strong> Un Campo de Direcciones dibuja miles de pequeñísimas flechas en la pantalla. Si colocas un punto en cualquier lugar, la curva solución se dibuja solita siguiendo el camino que le marcan las flechitas 🌊.',
      concept: 'Dibuja el camino visual de las soluciones sin necesidad de resolver integrales feas.',
      formula: 'y\' = \\text{Inclinación de la flechita en cada punto } (x, y)',
      example: '🔍 **Ejemplo Real:** El enfriamiento del café. Las flechitas del campo muestran visualmente cómo la temperatura del café baja rápido al principio y luego se estabiliza suavemente a temperatura ambiente.',
      takeaway: '🌊 Tae y JK dicen: "Mira las flechas del mapa y verás el destino de la función."'
    }
  ]
};
