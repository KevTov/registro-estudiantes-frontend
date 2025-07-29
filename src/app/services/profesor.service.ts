import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, Profesor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = `${environment.apiUrl}/profesores`;

  constructor(private http: HttpClient) {}

  getAllProfesores(): Observable<ApiResponse<Profesor[]>> {
    return this.http.get<ApiResponse<Profesor[]>>(this.apiUrl);
  }

  getProfesorById(id: number): Observable<ApiResponse<Profesor>> {
    return this.http.get<ApiResponse<Profesor>>(`${this.apiUrl}/${id}`);
  }
}