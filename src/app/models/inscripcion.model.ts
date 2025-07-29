import { MateriaSimple } from './materia.model';
import { ProfesorSimple } from './profesor.model';

export interface Inscripcion {
  id: number;
  estudianteId: number;
  materiaId: number;
  materia: MateriaSimple;
  profesor: ProfesorSimple;
  fechaInscripcion: Date;
  activa: boolean;
}