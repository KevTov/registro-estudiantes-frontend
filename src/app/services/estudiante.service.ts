import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  ApiResponse, 
  Estudiante, 
  EstudianteCreate, 
  EstudianteUpdate, 
  Materia,
  CompanerosPorMateria
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = `${environment.apiUrl}/estudiantes`;

  constructor(private http: HttpClient) {}

  getAllEstudiantes(): Observable<ApiResponse<Estudiante[]>> {
    return this.http.get<ApiResponse<Estudiante[]>>(this.apiUrl);
  }

  getEstudianteById(id: number): Observable<ApiResponse<Estudiante>> {
    return this.http.get<ApiResponse<Estudiante>>(`${this.apiUrl}/${id}`);
  }

  createEstudiante(estudiante: EstudianteCreate): Observable<ApiResponse<Estudiante>> {
    return this.http.post<ApiResponse<Estudiante>>(this.apiUrl, estudiante);
  }

  updateEstudiante(id: number, estudiante: EstudianteUpdate): Observable<ApiResponse<Estudiante>> {
    return this.http.put<ApiResponse<Estudiante>>(`${this.apiUrl}/${id}`, estudiante);
  }

  deleteEstudiante(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  getMateriasDisponibles(id: number): Observable<ApiResponse<Materia[]>> {
    return this.http.get<ApiResponse<Materia[]>>(`${this.apiUrl}/${id}/materias-disponibles`);
  }

  getCompanerosDeClase(id: number): Observable<ApiResponse<CompanerosPorMateria>> {
    return this.http.get<ApiResponse<CompanerosPorMateria>>(`${this.apiUrl}/${id}/companeros`);
  }
}