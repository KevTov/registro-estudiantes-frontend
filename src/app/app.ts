// src/app/app.ts - Versión actualizada
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstudianteService } from './services/estudiante.service';
import { MateriaService } from './services/materia.service';
import { ProfesorService } from './services/profesor.service';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { Estudiante, Materia, Profesor } from './models';

interface Estadisticas {
  totalEstudiantes: number;
  totalMaterias: number;
  totalProfesores: number;
  totalInscripciones: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, StudentRegistrationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'Universidad Interrapidísimo - Sistema de Registro';
  mostrarFormularioRegistro = false;
  loading = false;
  estudiantes: Estudiante[] = [];
  materias: Materia[] = [];
  profesores: Profesor[] = [];
  
  // Estadísticas calculadas en tiempo real
  estadisticas: Estadisticas = {
    totalEstudiantes: 0,
    totalMaterias: 0,
    totalProfesores: 0,
    totalInscripciones: 0
  };

  // Estado de conexión con la API
  conexionApi = {
    intentando: false,
    conectado: false,
    error: ''
  };

  constructor(
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private profesorService: ProfesorService
  ) {
    console.log('Universidad Interrapidísimo - Sistema iniciado');
  }

  ngOnInit(): void {
    this.inicializarDatos();
  }

  async inicializarDatos(): Promise<void> {
    this.conexionApi.intentando = true;
    this.conexionApi.error = '';

    try {
      // Cargar datos en paralelo
      await Promise.all([
        this.cargarEstudiantes(),
        this.cargarMaterias(),
        this.cargarProfesores()
      ]);

      this.conexionApi.conectado = true;
      this.actualizarEstadisticas();
      console.log('✅ Conexión exitosa con la API');
    } catch (error) {
      this.conexionApi.conectado = false;
      this.conexionApi.error = 'Error al conectar con la API. Verifica que el backend esté ejecutándose.';
      console.error('❌ Error de conexión:', error);
    } finally {
      this.conexionApi.intentando = false;
    }
  }

  async cargarEstudiantes(): Promise<void> {
    try {
      const response = await this.estudianteService.getAllEstudiantes().toPromise();
      if (response?.success && response.data) {
        this.estudiantes = response.data;
        console.log('📚 Estudiantes cargados:', this.estudiantes.length);
      }
    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
      throw error;
    }
  }

  async cargarMaterias(): Promise<void> {
    try {
      const response = await this.materiaService.getAllMaterias().toPromise();
      if (response?.success && response.data) {
        this.materias = response.data;
        console.log('📖 Materias cargadas:', this.materias.length);
      }
    } catch (error) {
      console.error('Error al cargar materias:', error);
      throw error;
    }
  }

  async cargarProfesores(): Promise<void> {
    try {
      const response = await this.profesorService.getAllProfesores().toPromise();
      if (response?.success && response.data) {
        this.profesores = response.data;
        console.log('👨‍🏫 Profesores cargados:', this.profesores.length);
      }
    } catch (error) {
      console.error('Error al cargar profesores:', error);
      throw error;
    }
  }

  actualizarEstadisticas(): void {
    this.estadisticas = {
      totalEstudiantes: this.estudiantes.length,
      totalMaterias: this.materias.length,
      totalProfesores: this.profesores.length,
      totalInscripciones: this.estudiantes.reduce((total, estudiante) => 
        total + estudiante.inscripciones.length, 0)
    };
  }

  async reintentarConexion(): Promise<void> {
    console.log('🔄 Reintentando conexión con la API...');
    await this.inicializarDatos();
  }

  toggleFormularioRegistro(): void {
    this.mostrarFormularioRegistro = !this.mostrarFormularioRegistro;
  }

  // Eventos del formulario de registro
  onCloseRegistrationForm(): void {
    this.mostrarFormularioRegistro = false;
  }

  onStudentRegistered(): void {
    this.inicializarDatos();
    setTimeout(() => {
      this.mostrarFormularioRegistro = false;
    }, 3000);
  }

  // Método para navegar a diferentes secciones
  navegarA(seccion: string): void {
    console.log(`Navegando a: ${seccion}`);
    // TODO: Implementar navegación con Router cuando tengamos las rutas
  }
}