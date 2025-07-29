import { Inscripcion } from './inscripcion.model';

export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaRegistro: Date;
  inscripciones: Inscripcion[];
  nombreCompleto: string;
}

export interface EstudianteSimple {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  nombreCompleto: string;
}

export interface EstudianteCreate {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  materiasSeleccionadas: number[];
}

export interface EstudianteUpdate {
  nombre: string;
  apellido: string;
  telefono: string;
}