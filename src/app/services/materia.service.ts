import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, Materia } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiUrl = `${environment.apiUrl}/materias`;

  constructor(private http: HttpClient) {}

  getAllMaterias(): Observable<ApiResponse<Materia[]>> {
    return this.http.get<ApiResponse<Materia[]>>(this.apiUrl);
  }

  getMateriaById(id: number): Observable<ApiResponse<Materia>> {
    return this.http.get<ApiResponse<Materia>>(`${this.apiUrl}/${id}`);
  }

  getMateriasPorProfesor(profesorId: number): Observable<ApiResponse<Materia[]>> {
    return this.http.get<ApiResponse<Materia[]>>(`${this.apiUrl}/profesor/${profesorId}`);
  }
}