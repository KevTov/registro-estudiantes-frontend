import { EstudianteSimple } from './estudiante.model';

export interface CompanerosPorMateria {
  [nombreMateria: string]: EstudianteSimple[];
}