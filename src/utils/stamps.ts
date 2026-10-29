import { Stamp } from '../types';

export const STAMP_CATALOG: Omit<Stamp, 'earnedAt' | 'planId' | 'planTitle' | 'note' | 'city'>[] = [
  {
    id: 'volcan',
    name: 'Sello Volcánico',
    symbol: '🌋',
    color: '#B94D35', // Terracotta
    category: 'Naturaleza',
    description: 'Conquistaste miradores y senderos con vista a los colosos de fuego.'
  },
  {
    id: 'lago',
    name: 'Sello Brisa del Lago',
    symbol: '⛵',
    color: '#168AAD', // Lake Blue
    category: 'Lagos',
    description: 'Respiraste el aire fresco del gran lago y dejaste que el tiempo fluyera.'
  },
  {
    id: 'colonial',
    name: 'Sello Portal Colonial',
    symbol: '🏛️',
    color: '#0755A1', // Deep Blue
    category: 'Historia',
    description: 'Recorriste esquinas de tejas, aceras altas y fachadas llenas de memoria.'
  },
  {
    id: 'cafe',
    name: 'Sello Cafetal de Altura',
    symbol: '☕',
    color: '#873A2A', // Warm coffee clay
    category: 'Cultura',
    description: 'Un café bien filtrado y una plática sincera sin mirar el reloj.'
  },
  {
    id: 'sacuanjoche',
    name: 'Sello Sacuanjoche',
    symbol: '🌸',
    color: '#F4C95D', // Sun Yellow
    category: 'Flora',
    description: 'Observaste la naturaleza viva y los colores tropicales de la tierra.'
  },
  {
    id: 'ceramica',
    name: 'Sello Barro & Espíritu',
    symbol: '🏺',
    color: '#963E2B', // Terracotta ceramic
    category: 'Artesanía',
    description: 'Creaste, dibujaste o apreciaste el ingenio artesanal del pueblo.'
  },
  {
    id: 'cero_bolas',
    name: 'Sello Cero Bolas',
    symbol: '✨',
    color: '#246747', // Forest green
    category: 'Ingenio',
    description: '¡Aventura total con costo C$ 0! Demostraste que la chispa no cuesta nada.'
  },
  {
    id: 'guarida',
    name: 'Sello Hamaca & Sombra',
    symbol: '🏡',
    color: '#B94D35', // Warm terracotta
    category: 'En Casa',
    description: 'Transformaste tu hogar en un oasis de calma, buena música y descanso.'
  },
  {
    id: 'pandilla',
    name: 'Sello La Gallada',
    symbol: '🤝',
    color: '#0755A1', // Deep Blue
    category: 'Compañía',
    description: 'Misión compartida entre risas, historias y complicidad.'
  },
  {
    id: 'giro_maestro',
    name: 'Sello Giro Inesperado',
    symbol: '🎲',
    color: '#B94D35', // Terracotta
    category: 'Espontáneo',
    description: 'Aceptaste el reto espontáneo y viviste el momento sin filtros.'
  }
];

export function getRecommendedStampId(
  mood: string,
  preference: string,
  budget: number,
  hasTwistDone: boolean
): string {
  if (hasTwistDone) return 'giro_maestro';
  if (budget === 0) return 'cero_bolas';
  if (preference === 'casa') return 'guarida';
  if (mood === 'aventurero') return 'volcan';
  if (mood === 'tranquilo') return 'lago';
  if (mood === 'creativo') return 'ceramica';
  if (mood === 'romantico') return 'cafe';
  if (mood === 'rutina') return 'sacuanjoche';
  return 'colonial';
}
