import { ProfesorSimple } from './profesor.model';
import { EstudianteSimple } from './estudiante.model';

export interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
  creditos: number;
  profesorId: number;
  profesor: ProfesorSimple;
  estudiantes: EstudianteSimple[];
}

export interface MateriaSimple {
  id: number;
  nombre: string;
  descripcion: string;
  creditos: number;
}