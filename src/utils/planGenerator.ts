import { AdventurePlan, PlanPreferences, PlanStep, UnexpectedTwist } from '../types';

export const UNEXPECTED_TWISTS: Omit<UnexpectedTwist, 'id' | 'isDone'>[] = [
  {
    title: 'La Crónica de Paso',
    challenge: 'Inventá una historia ficticia de 30 segundos sobre el primer objeto o estatua curiosa que veás.'
  },
  {
    title: 'Portada de Disco',
    challenge: 'Tomá una foto artística con tu celular de algo cotidiano que parezca la portada de un álbum indie.'
  },
  {
    title: 'Misión Caza-Colores',
    challenge: 'Encontrá tres cosas distintas de color amarillo o turquesa que normalmente pasarían desapercibidas.'
  },
  {
    title: 'Plática sin Pantallas',
    challenge: 'Guardá el teléfono en el bolsillo por 20 minutos seguidos y enfocate solo en lo que tenés enfrente.'
  },
  {
    title: 'La Rima Imprevista',
    challenge: 'Hacé una rima graciosa de dos versos sobre el lugar o el momento y decísela a quien te acompaña (o anotala).'
  },
  {
    title: 'El Bautizo Botánico',
    challenge: 'Encontrá la planta o árbol más llamativo del camino y dale un nombre legendario con título nobiliario.'
  },
  {
    title: 'El Mapa de Recuerdos',
    challenge: 'Recordá una anécdota que viviste en este mismo barrio o ciudad y contala con lujo de detalles.'
  },
  {
    title: 'Pregunta Profunda',
    challenge: 'Hacé o respondé esta pregunta: "¿Qué habilidad inservible te gustaría dominar a la perfección?".'
  },
  {
    title: 'Elogio Sorpresa',
    challenge: 'Decile un cumplido genuino y específico a quien te acompaña, o agradecé con una gran sonrisa al que te atienda.'
  },
  {
    title: 'Detector de Detalles',
    challenge: 'Identificá un letrero pintado a mano, un mural o un detalle arquitectónico viejo y descifrá qué dice.'
  }
];

export function getRandomTwist(): UnexpectedTwist {
  const item = UNEXPECTED_TWISTS[Math.floor(Math.random() * UNEXPECTED_TWISTS.length)];
  return {
    id: `twist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: item.title,
    challenge: item.challenge,
    isDone: false
  };
}

const STEP_REPLACEMENTS: Record<string, Omit<PlanStep, 'id' | 'isDone'>[]> = {
  afuera: [
    {
      title: 'Exploración de calles secundarias',
      description: 'Doblá por una calle que nunca antes transitás y descubrí fachadas y vegetación del vecindario.',
      durationMinutes: 20,
      estimatedCost: 0,
      category: 'Caminata'
    },
    {
      title: 'Parada para hidratación o fresco local',
      description: 'Buscá una venta o pulpería y pedite un fresco típico bien helado (cacao, chicha o pitahaya).',
      durationMinutes: 15,
      estimatedCost: 25,
      category: 'Antojo'
    },
    {
      title: 'Pausa contemplativa en banca pública',
      description: 'Elegí un banco con buena sombra, sentate 10 minutos y observá el ritmo de la gente sin prisa.',
      durationMinutes: 15,
      estimatedCost: 0,
      category: 'Relax'
    },
    {
      title: 'Safari fotográfico exprés',
      description: 'Buscá texturas, sombras y contrastes urbanos para capturar 3 fotos dignas de postal.',
      durationMinutes: 20,
      estimatedCost: 0,
      category: 'Creatividad'
    }
  ],
  casa: [
    {
      title: 'Duelo de trivia o historias',
      description: 'Ronda de preguntas curiosas o anécdotas vergonzosas de la infancia con música de fondo.',
      durationMinutes: 25,
      estimatedCost: 0,
      category: 'Social'
    },
    {
      title: 'Taller de bocadillos creativos',
      description: 'Abrí la despensa e improvisá unos bocadillos diferentes con lo que ya tenés a mano.',
      durationMinutes: 20,
      estimatedCost: 0,
      category: 'Cocina'
    },
    {
      title: 'Sesión de dibujo a ciegas',
      description: 'Tomá papel y lápiz, intentá dibujar el rostro del otro (o tu mascota) sin ver el papel durante un minuto.',
      durationMinutes: 15,
      estimatedCost: 0,
      category: 'Juego'
    },
    {
      title: 'Cine-club con luces apagadas',
      description: 'Elegí un cortometraje o documental corto y analizá la fotografía y el desenlace.',
      durationMinutes: 30,
      estimatedCost: 0,
      category: 'Cultura'
    }
  ]
};

export function replacePlanStep(plan: AdventurePlan, stepId: string): AdventurePlan {
  const isOutdoor = plan.steps.some(s => s.description.toLowerCase().includes('calle') || s.description.toLowerCase().includes('parque'));
  const pool = isOutdoor ? STEP_REPLACEMENTS.afuera : STEP_REPLACEMENTS.casa;
  
  const currentStep = plan.steps.find(s => s.id === stepId);
  if (!currentStep) return plan;

  // Pick replacement that doesn't share the same title
  const candidates = pool.filter(c => c.title !== currentStep.title);
  const picked = candidates[Math.floor(Math.random() * candidates.length)] || pool[0];

  // Adjust cost if budget is zero
  const cost = plan.estimatedCost === 0 ? 0 : Math.min(picked.estimatedCost, plan.estimatedCost);

  const updatedSteps = plan.steps.map(step => {
    if (step.id === stepId) {
      return {
        ...step,
        title: picked.title,
        description: picked.description,
        durationMinutes: picked.durationMinutes,
        estimatedCost: cost,
        isDone: false
      };
    }
    return step;
  });

  // Recalculate total estimated cost safely
  const newTotal = updatedSteps.reduce((sum, s) => sum + s.estimatedCost, 0);

  return {
    ...plan,
    steps: updatedSteps,
    estimatedCost: newTotal
  };
}

interface PlanBlueprint {
  title: string;
  tagline: string;
  description: string;
  energy: 'Bajo' | 'Medio' | 'Alto' | 'Tranqui' | 'Tuani intenso';
  fitReason: string;
  steps: {
    title: string;
    description: string;
    durationPct: number; // percentage of duration
    costRatio: number;   // ratio of budget
  }[];
  packingList: string[];
  rainAlternative: {
    title: string;
    description: string;
    adjustedSteps: string[];
  };
  budgetItemNames: string[];
}

function getDurationMinutes(duration: PlanPreferences['duration']): number {
  switch (duration) {
    case '30min':
      return 30;
    case '1h':
      return 60;
    case '3h':
      return 180;
    case 'full_day':
      return 420;
    default:
      return 60;
  }
}

export function formatDuration(duration: PlanPreferences['duration']): string {
  switch (duration) {
    case '30min':
      return '30 minutos exprés';
    case '1h':
      return '1 hora';
    case '3h':
      return '3 horas intensas';
    case 'full_day':
      return 'Todo el día';
  }
}

export function generateLocalPlans(prefs: PlanPreferences): AdventurePlan[] {
  const city = prefs.city.trim() || 'tu zona';
  const totalMinutes = getDurationMinutes(prefs.duration);
  const isFree = prefs.budget <= 0;
  const curr = prefs.currency;

  const blueprints: PlanBlueprint[] = [];

  // Determine blueprints based on preferences
  if (prefs.preference === 'casa') {
    blueprints.push(
      {
        title: 'Misión Salón Creativo & Desconecte',
        tagline: 'Transformá tu espacio en una guarida de buenas vibras',
        description: `Un plan relajado para disfrutar en casa en ${city}, combinando música, reto de cocina improvisada y plática amena.`,
        energy: 'Tranqui',
        fitReason: `Perfecto para estar en casa con mood ${prefs.mood} sin gastar de más.`,
        steps: [
          {
            title: 'Ambientación & Música de Fondo',
            description: 'Acomodá cojines, bajá las luces y poné una lista instrumental o acústica para cambiar la energía de la casa.',
            durationPct: 0.2,
            costRatio: 0
          },
          {
            title: 'Taller de Bocadillos o Bebidas Artesanales',
            description: 'Prepará una bebida especial (té frío, infusión de frutas o café espumoso) y un picadillo con lo que haya.',
            durationPct: 0.35,
            costRatio: isFree ? 0 : 0.5
          },
          {
            title: 'Sesión de Retos o Juego de Preguntas',
            description: 'Hagan una ronda de anécdotas, adivinanzas rápidas o elijan un tema profundo para debatir con risas.',
            durationPct: 0.3,
            costRatio: 0
          },
          {
            title: 'Momento Relax & Balance del Día',
            description: 'Disfruten de unos minutos de desconexión total saboreando el ambiente cálido creado.',
            durationPct: 0.15,
            costRatio: 0
          }
        ],
        packingList: ['Cojines cómodos', 'Música descargada o playlist lista', 'Ingredientes básicos de cocina'],
        rainAlternative: {
          title: 'Guarida bajo aguacero',
          description: '¡Ideal si llueve afuera! Abrí las ventanas para escuchar el agua mientras disfrutan de algo caliente.',
          adjustedSteps: ['Preparar chocolate o café caliente', 'Armar un fuerte de mantas', 'Sesión de anécdotas bajo la lluvia']
        },
        budgetItemNames: isFree ? ['Ingredientes de despensa (C$ 0)'] : ['Bocadillos e ingredientes caseros']
      },
      {
        title: 'Cine-Club Secreto con Crítica Tuani',
        tagline: 'Una función exclusiva con reglas de festival',
        description: `Elegí un cortometraje, documental o clásico olvidado y convertí tu sala en un cine temático en ${city}.`,
        energy: 'Bajo',
        fitReason: `Combina comodidad hogareña con estímulo visual y conversación.`,
        steps: [
          {
            title: 'Curaduría y Selección del Film',
            description: 'Revisen catálogos gratuitos o plataformas y elijan una película que nadie haya visto antes.',
            durationPct: 0.25,
            costRatio: 0
          },
          {
            title: 'Ronda de Palomitas o Snack Especial',
            description: 'Cocinen unas palomitas con especias (toque de limón, pimienta o queso) para botanear.',
            durationPct: 0.25,
            costRatio: isFree ? 0 : 0.4
          },
          {
            title: 'Proyección sin Distracciones',
            description: 'Modo avión en los celulares y disfrute completo de la historia en pantalla.',
            durationPct: 0.35,
            costRatio: 0
          },
          {
            title: 'Mesa Redonda: El Veredicto Tuani',
            description: 'Califique cada quien con puntos sobre 10 y compartan qué escena fue la más memorable.',
            durationPct: 0.15,
            costRatio: 0
          }
        ],
        packingList: ['Manta favorita', 'Snacks caseros', 'Dispositivo para reproducir'],
        rainAlternative: {
          title: 'Sesión acústica de lluvia',
          description: 'Si el sonido de la lluvia es fuerte, disfruten una tanda de videos musicales o cortos visuales.',
          adjustedSteps: ['Ajustar volumen', 'Tomar té o infusión humeante', 'Comentar las mejores secuencias']
        },
        budgetItemNames: isFree ? ['Cine gratuito en casa (C$ 0)'] : ['Maíz para palomitas y bebidas']
      },
      {
        title: 'Misión Artista por un Día',
        tagline: 'Manos a la obra sin presiones ni pretensiones',
        description: `Un reto creativo donde dibujan, escriben o reinventan un objeto de la casa en ${city}.`,
        energy: 'Medio',
        fitReason: `Ideal para sacar el lado creativo sin salir de las cuatro paredes.`,
        steps: [
          {
            title: 'Reclutamiento de Materiales',
            description: 'Juntá hojas, marcadores, recortes de revistas o lápices de colores que tengás guardados.',
            durationPct: 0.2,
            costRatio: 0
          },
          {
            title: 'Reto de Creación Rápida',
            description: 'Tienen 20 minutos para crear un cartel publicitario absurdo, un cómic de 3 viñetas o un poema cómico.',
            durationPct: 0.4,
            costRatio: 0
          },
          {
            title: 'Galería de Arte y Exposición',
            description: 'Peguen las obras con cinta en una pared y hagan un recorrido de galería comentando cada pieza.',
            durationPct: 0.25,
            costRatio: 0
          },
          {
            title: 'Bebida de Clausura',
            description: 'Brinden con un vaso de fresco o agua con hielo por la imaginación compartida.',
            durationPct: 0.15,
            costRatio: isFree ? 0 : 0.3
          }
        ],
        packingList: ['Hojas de papel o libreta', 'Lápices o plumones', 'Cinta adhesiva'],
        rainAlternative: {
          title: 'Inspiración pluvial',
          description: 'Escriban o dibujen inspirándose en el reflejo de la lluvia en los vidrios.',
          adjustedSteps: ['Mirar la ventana 3 minutos', 'Dibujar el paisaje con lluvia', 'Firmar con seudónimo']
        },
        budgetItemNames: isFree ? ['Materiales reutilizados (C$ 0)'] : ['Refrescos o café de clausura']
      }
    );
  } else {
    // Outdoor / Anywhere plans
    blueprints.push(
      {
        title: `Ruta Mirador & Vientos Frescos`,
        tagline: 'Puntos altos, aire limpio y panorámicas para recordar',
        description: `Una escapada hacia un parque arbolado, colina o punto panorámico en ${city} para oxigenar la mente.`,
        energy: prefs.duration === '30min' ? 'Medio' : 'Alto',
        fitReason: `Te saca del encierro con vibra aventurera y sin necesidad de grandes gastos.`,
        steps: [
          {
            title: 'Alistada de Mochila & Salida',
            description: 'Llená un termo de agua bien fría, calzate zapatos cómodos y salgan a paso ligero.',
            durationPct: 0.2,
            costRatio: 0
          },
          {
            title: 'Caminata de Ascenso o Exploración',
            description: `Recorran el tramo hacia el punto más despejado o con mejor vista de ${city}.`,
            durationPct: 0.35,
            costRatio: 0
          },
          {
            title: 'Pausa Panorámica & Antojo Liviano',
            description: 'Disfruten de la brisa, tomen un respiro y compartan un fresco o fruta de temporada.',
            durationPct: 0.3,
            costRatio: isFree ? 0 : 0.6
          },
          {
            title: 'Retorno con Buenas Fotos',
            description: 'Regresen por una ruta con árboles frondosos capturando los mejores ángulos de la tarde.',
            durationPct: 0.15,
            costRatio: isFree ? 0 : 0.2
          }
        ],
        packingList: ['Termo de agua', 'Zapatos para caminar', 'Gorra o lentes para el sol', 'Cámara o celular con batería'],
        rainAlternative: {
          title: 'Refugio con Vista Cubierta',
          description: `Si cae chaparrón en ${city}, busquen un kiosco con techo amplio o galería techada con vista.`,
          adjustedSteps: ['Resguardarse en kiosco o portal', 'Disfrutar la vista pluvial', 'Caminata bajo aleros']
        },
        budgetItemNames: isFree ? ['Exploración libre de costo (C$ 0)'] : ['Fresco natural o merienda', 'Transporte local estimado']
      },
      {
        title: `Safari Urbano & Esquinas con Historia`,
        tagline: 'Caminar como turista curioso en tu propia ciudad',
        description: `Descubrí detalles arquitectónicos, murales y el ritmo cotidiano de las plazas y calles de ${city}.`,
        energy: 'Medio',
        fitReason: `Ideal para el ánimo ${prefs.mood}, activa la curiosidad sin complicaciones.`,
        steps: [
          {
            title: 'Punto de Encuentro en Plaza o Parque',
            description: `Llegada al parque central o plaza arbolada de ${city} para fijar la brújula.`,
            durationPct: 0.15,
            costRatio: 0
          },
          {
            title: 'Caza de Murales y Fachadas Antiguas',
            description: 'Caminen por las calles aledañas buscando puertas antiguas, letreros con historia y colores vivos.',
            durationPct: 0.4,
            costRatio: 0
          },
          {
            title: 'Parada de Tertulia en Puesto o Cafecito',
            description: 'Hagan una pausa en una venta o café tradicional para platicar sobre lo descubierto.',
            durationPct: 0.3,
            costRatio: isFree ? 0 : 0.7
          },
          {
            title: 'Cierre con la Foto del Día',
            description: 'Tomen una foto grupal o de detalle que resuma la vibra tuani del paseo.',
            durationPct: 0.15,
            costRatio: 0
          }
        ],
        packingList: ['Calzado cómodo', 'Celular para fotos', 'Un poco de efectivo o cambio'],
        rainAlternative: {
          title: 'Ruta de Portales y Pasillos',
          description: 'Caminen por los corredores techados y aceras coloniales aprovechando los aleros de las casas.',
          adjustedSteps: ['Caminar bajo aleros y marquesinas', 'Refugio en café con vitrina', 'Mirar la lluvia caer en la plaza']
        },
        budgetItemNames: isFree ? ['Recorrido a pie gratuito (C$ 0)'] : ['Bocadillo o café tradicional', 'Gastos menores']
      },
      {
        title: `Picnic Espontáneo & Tarde Desconectada`,
        tagline: 'Comidita sencilla en el césped y cero prisas',
        description: `Buscá una buena sombra de jícaro, malinche o ceiba en ${city} y armá un picnic relajado.`,
        energy: 'Tranqui',
        fitReason: `Saca de la rutina a ${prefs.peopleCount > 1 ? 'todos' : 'vos'} con un plan fresco al aire libre.`,
        steps: [
          {
            title: 'Preparación de la Merienda',
            description: 'Alisten algo rápido: frutas picadas, galletas, sándwiches o unas tajaditas empacadas.',
            durationPct: 0.25,
            costRatio: isFree ? 0 : 0.6
          },
          {
            title: 'Búsqueda de la Sombra Perfecta',
            description: `Recorran un área verde o parque tranquilo en ${city} hasta encontrar el lugar más fresco.`,
            durationPct: 0.2,
            costRatio: 0
          },
          {
            title: 'Picnic, Juegos y Conversación',
            description: 'Extiendan un mantel o toalla, compartan la comida y charlen sin mirar el reloj.',
            durationPct: 0.4,
            costRatio: 0
          },
          {
            title: 'Limpieza Responsable & Despedida',
            description: 'Dejen el lugar aún más limpio de lo que lo encontraron y respiren hondo antes de volver.',
            durationPct: 0.15,
            costRatio: 0
          }
        ],
        packingList: ['Mantita o tela para sentarse', 'Agua y bocadillos', 'Bolsa para recoger basura'],
        rainAlternative: {
          title: 'Picnic en Corredor o Kiosco Techado',
          description: 'Trasladen el mantel a un kiosco con techo o a la galería de una casa para botanear sin mojarse.',
          adjustedSteps: ['Mudar mantel al área techada', 'Compartir los bocadillos', 'Juegos de cartas o palabras']
        },
        budgetItemNames: isFree ? ['Comida preparada en casa (C$ 0)'] : ['Frutas, tajadas o bocadillos', 'Bebidas frescas']
      }
    );
  }

  // Build the 3 concrete adventure plans
  return blueprints.slice(0, 3).map((bp, index) => {
    // Calculate total cost strictly <= budget
    let targetBudget = 0;
    if (!isFree) {
      // Differentiate the three options by budget level:
      // Option 0: moderate (e.g. 60-70% of budget)
      // Option 1: budget-saver (e.g. 25-40% of budget)
      // Option 2: full-experience (e.g. 85-95% of budget)
      const budgetFactors = [0.65, 0.35, 0.9];
      const factor = budgetFactors[index % budgetFactors.length];
      targetBudget = Math.max(1, Math.round(prefs.budget * factor));
      // Never exceed max budget
      if (targetBudget > prefs.budget) targetBudget = prefs.budget;
    }

    // Build steps with proportional minutes and distributed cost
    const steps: PlanStep[] = bp.steps.map((s, stepIdx) => {
      const stepMinutes = Math.max(5, Math.round(totalMinutes * s.durationPct));
      let stepCost = 0;
      if (!isFree && s.costRatio > 0) {
        stepCost = Math.round(targetBudget * s.costRatio);
      }
      return {
        id: `step-${index}-${stepIdx}-${Date.now()}`,
        title: s.title,
        description: s.description,
        durationMinutes: stepMinutes,
        estimatedCost: stepCost,
        isDone: false
      };
    });

    // Ensure step costs sum up to targetBudget safely
    const currentSum = steps.reduce((sum, s) => sum + s.estimatedCost, 0);
    if (!isFree && currentSum !== targetBudget && steps.length > 0) {
      const diff = targetBudget - currentSum;
      // adjust on the largest non-zero step
      const costlyStep = steps.find(s => s.estimatedCost > 0) || steps[1] || steps[0];
      costlyStep.estimatedCost = Math.max(0, costlyStep.estimatedCost + diff);
    }

    const calculatedTotalCost = isFree ? 0 : steps.reduce((sum, s) => sum + s.estimatedCost, 0);

    // Build budget items
    const budgetBreakdown = isFree
      ? [{ concept: 'Actividad 100% gratuita', amount: 0 }]
      : bp.budgetItemNames.map((name, i) => {
          const count = bp.budgetItemNames.length;
          const share = Math.round(calculatedTotalCost / count);
          const finalShare = i === count - 1 ? calculatedTotalCost - share * (count - 1) : share;
          return {
            concept: name,
            amount: Math.max(0, finalShare)
          };
        });

    return {
      id: `plan-${Date.now()}-${index}`,
      name: bp.title,
      tagline: bp.tagline,
      description: bp.description,
      estimatedCost: calculatedTotalCost,
      currency: curr,
      durationLabel: formatDuration(prefs.duration),
      durationMinutes: totalMinutes,
      energyLevel: bp.energy,
      fitReason: bp.fitReason,
      steps,
      budgetBreakdown,
      packingList: bp.packingList,
      rainAlternative: bp.rainAlternative,
      activeTwist: getRandomTwist(),
      createdAt: new Date().toISOString(),
      city,
      company: prefs.company,
      mood: prefs.mood
    };
  });
}
