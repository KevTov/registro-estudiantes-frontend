import { MateriaSimple } from './materia.model';

export interface Profesor {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  especialidad: string;
  materias: MateriaSimple[];
  nombreCompleto: string;
}

export interface ProfesorSimple {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  nombreCompleto: string;
}