// src/app/components/student-registration/student-registration.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { MateriaService } from '../../services/materia.service';
import { Materia, EstudianteCreate } from '../../models';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modern-card slide-in-right">
      <div class="card-header-modern">
        <h2 class="card-title-modern">
          <i class="fas fa-user-plus"></i>
          Registro de Estudiante
        </h2>
      </div>
      <div class="card-body-modern">
        
        <!-- Formulario de datos personales -->
        <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
          
          <!-- Datos personales -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="mb-3">
                <i class="fas fa-user me-2"></i>
                Datos Personales
              </h5>
            </div>
            
            <div class="col-md-6 mb-3">
              <label class="form-label-modern">Nombre *</label>
              <input 
                type="text" 
                formControlName="nombre"
                class="form-control-modern"
                [class.is-invalid]="isFieldInvalid('nombre')"
                [class.is-valid]="isFieldValid('nombre')"
                placeholder="Ingresa tu nombre">
              <div *ngIf="isFieldInvalid('nombre')" class="invalid-feedback">
                <small *ngIf="registrationForm.get('nombre')?.errors?.['required']">
                  El nombre es requerido
                </small>
                <small *ngIf="registrationForm.get('nombre')?.errors?.['minlength']">
                  El nombre debe tener al menos 2 caracteres
                </small>
              </div>
            </div>
            
            <div class="col-md-6 mb-3">
              <label class="form-label-modern">Apellido *</label>
              <input 
                type="text" 
                formControlName="apellido"
                class="form-control-modern"
                [class.is-invalid]="isFieldInvalid('apellido')"
                [class.is-valid]="isFieldValid('apellido')"
                placeholder="Ingresa tu apellido">
              <div *ngIf="isFieldInvalid('apellido')" class="invalid-feedback">
                <small *ngIf="registrationForm.get('apellido')?.errors?.['required']">
                  El apellido es requerido
                </small>
                <small *ngIf="registrationForm.get('apellido')?.errors?.['minlength']">
                  El apellido debe tener al menos 2 caracteres
                </small>
              </div>
            </div>
            
            <div class="col-md-6 mb-3">
              <label class="form-label-modern">Email *</label>
              <input 
                type="email" 
                formControlName="email"
                class="form-control-modern"
                [class.is-invalid]="isFieldInvalid('email')"
                [class.is-valid]="isFieldValid('email')"
                placeholder="ejemplo@email.com">
              <div *ngIf="isFieldInvalid('email')" class="invalid-feedback">
                <small *ngIf="registrationForm.get('email')?.errors?.['required']">
                  El email es requerido
                </small>
                <small *ngIf="registrationForm.get('email')?.errors?.['email']">
                  Ingresa un email válido
                </small>
              </div>
            </div>
            
            <div class="col-md-6 mb-3">
              <label class="form-label-modern">Teléfono *</label>
              <input 
                type="tel" 
                formControlName="telefono"
                class="form-control-modern"
                [class.is-invalid]="isFieldInvalid('telefono')"
                [class.is-valid]="isFieldValid('telefono')"
                placeholder="300-123-4567">
              <div *ngIf="isFieldInvalid('telefono')" class="invalid-feedback">
                <small *ngIf="registrationForm.get('telefono')?.errors?.['required']">
                  El teléfono es requerido
                </small>
                <small *ngIf="registrationForm.get('telefono')?.errors?.['pattern']">
                  Formato de teléfono inválido
                </small>
              </div>
            </div>
          </div>

          <!-- Selección de materias -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="mb-3">
                <i class="fas fa-book me-2"></i>
                Selección de Materias
                <span class="badge badge-primary-modern ms-2">
                  {{ selectedSubjects.length }}/3
                </span>
              </h5>
              
              <div class="alert-info-modern mb-3">
                <i class="fas fa-info-circle me-2"></i>
                Selecciona hasta 3 materias de diferentes profesores. Cada materia vale 3 créditos.
              </div>
            </div>
            
            <!-- Loading de materias -->
            <div *ngIf="loadingMaterias" class="col-12 text-center py-4">
              <div class="loading-spinner me-2"></div>
              Cargando materias disponibles...
            </div>
            
            <!-- Grid de materias -->
            <div *ngIf="!loadingMaterias" class="col-12">
              <div class="subject-selector">
                <div 
                  *ngFor="let materia of materiasDisponibles" 
                  class="subject-card"
                  [class.selected]="isSubjectSelected(materia.id)"
                  [class.disabled]="isSubjectDisabled(materia)"
                  (click)="toggleSubject(materia)">
                  
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="mb-0 fw-semibold">{{ materia.nombre }}</h6>
                    <div class="d-flex align-items-center gap-2">
                      <span class="badge badge-success-modern">
                        {{ materia.creditos }} créditos
                      </span>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          [checked]="isSubjectSelected(materia.id)"
                          [disabled]="isSubjectDisabled(materia)"
                          readonly>
                      </div>
                    </div>
                  </div>
                  
                  <p class="text-muted small mb-2">{{ materia.descripcion }}</p>
                  
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                      <i class="fas fa-chalkboard-teacher me-1"></i>
                      {{ materia.profesor.nombreCompleto }}
                    </small>
                    <small class="text-muted">
                      {{ materia.profesor.especialidad }}
                    </small>
                  </div>
                  
                  <!-- Mensaje de restricción -->
                  <div *ngIf="getSubjectRestrictionMessage(materia)" 
                       class="mt-2 small text-warning">
                    <i class="fas fa-exclamation-triangle me-1"></i>
                    {{ getSubjectRestrictionMessage(materia) }}
                  </div>
                </div>
              </div>
              
              <!-- Error de selección de materias -->
              <div *ngIf="subjectSelectionError" class="alert-danger-modern mt-3">
                <i class="fas fa-exclamation-circle me-2"></i>
                {{ subjectSelectionError }}
              </div>
            </div>
          </div>

          <!-- Resumen de inscripción -->
          <div *ngIf="selectedSubjects.length > 0" class="row mb-4">
            <div class="col-12">
              <h5 class="mb-3">
                <i class="fas fa-clipboard-list me-2"></i>
                Resumen de Inscripción
              </h5>
              
              <div class="modern-card" style="background: rgba(59, 130, 246, 0.05);">
                <div class="card-body-modern py-3">
                  <div class="row align-items-center">
                    <div class="col-md-8">
                      <h6 class="mb-2">Materias seleccionadas:</h6>
                      <div class="d-flex flex-wrap gap-2">
                        <span 
                          *ngFor="let materia of getSelectedSubjectsDetails()" 
                          class="badge badge-primary-modern">
                          {{ materia.nombre }} ({{ materia.profesor.nombreCompleto }})
                        </span>
                      </div>
                    </div>
                    <div class="col-md-4 text-end">
                      <div class="text-muted small">Total de créditos</div>
                      <div class="h4 mb-0 text-primary">
                        {{ selectedSubjects.length * 3 }} créditos
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="row">
            <div class="col-12">
              <div class="d-flex gap-3 justify-content-end">
                <button 
                  type="button" 
                  class="btn-secondary-modern"
                  (click)="onCancel()">
                  <i class="fas fa-times me-2"></i>
                  Cancelar
                </button>
                
                <button 
                  type="submit" 
                  class="btn-primary-modern"
                  [disabled]="isFormInvalid() || isSubmitting">
                  <div *ngIf="isSubmitting" class="loading-spinner me-2"></div>
                  <i *ngIf="!isSubmitting" class="fas fa-user-plus me-2"></i>
                  {{ isSubmitting ? 'Registrando...' : 'Registrar Estudiante' }}
                </button>
              </div>
            </div>
          </div>
        </form>

        <!-- Mensaje de éxito -->
        <div *ngIf="showSuccessMessage" class="alert-success-modern mt-4">
          <i class="fas fa-check-circle me-2"></i>
          ¡Estudiante registrado exitosamente! 
          <strong>{{ successMessage }}</strong>
        </div>

        <!-- Mensaje de error -->
        <div *ngIf="showErrorMessage" class="alert-danger-modern mt-4">
          <i class="fas fa-exclamation-circle me-2"></i>
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .subject-card {
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .subject-card:hover:not(.disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-medium);
    }
    
    .subject-card.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .form-check-input:checked {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }
    
    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      font-size: 0.875em;
      color: var(--danger-color);
    }
  `]
})
export class StudentRegistrationComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Output() onStudentRegistered = new EventEmitter<void>();

  registrationForm!: FormGroup;
  materiasDisponibles: Materia[] = [];
  selectedSubjects: number[] = [];
  loadingMaterias = false;
  isSubmitting = false;
  
  // Mensajes
  subjectSelectionError = '';
  showSuccessMessage = false;
  showErrorMessage = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadMaterias();
  }

  private initializeForm(): void {
    this.registrationForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{3}-?\d{3}-?\d{4}$/)]]
    });
  }

  private async loadMaterias(): Promise<void> {
    this.loadingMaterias = true;
    try {
      const response = await this.materiaService.getAllMaterias().toPromise();
      if (response?.success && response.data) {
        this.materiasDisponibles = response.data;
      }
    } catch (error) {
      this.showError('Error al cargar las materias disponibles');
    } finally {
      this.loadingMaterias = false;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  isSubjectSelected(materiaId: number): boolean {
    return this.selectedSubjects.includes(materiaId);
  }

  isSubjectDisabled(materia: Materia): boolean {
    // Deshabilitar si ya se seleccionaron 3 materias y esta no está seleccionada
    if (this.selectedSubjects.length >= 3 && !this.isSubjectSelected(materia.id)) {
      return true;
    }
    
    // Deshabilitar si ya hay una materia del mismo profesor seleccionada
    const selectedMaterias = this.materiasDisponibles.filter(m => 
      this.selectedSubjects.includes(m.id)
    );
    
    return selectedMaterias.some(m => 
      m.profesor.id === materia.profesor.id && m.id !== materia.id
    );
  }

  getSubjectRestrictionMessage(materia: Materia): string {
    if (this.selectedSubjects.length >= 3 && !this.isSubjectSelected(materia.id)) {
      return 'Máximo 3 materias permitidas';
    }
    
    const selectedMaterias = this.materiasDisponibles.filter(m => 
      this.selectedSubjects.includes(m.id)
    );
    
    if (selectedMaterias.some(m => m.profesor.id === materia.profesor.id && m.id !== materia.id)) {
      return `Ya tienes una materia con ${materia.profesor.nombreCompleto}`;
    }
    
    return '';
  }

  toggleSubject(materia: Materia): void {
    if (this.isSubjectDisabled(materia)) {
      return;
    }

    const index = this.selectedSubjects.indexOf(materia.id);
    if (index > -1) {
      // Deseleccionar
      this.selectedSubjects.splice(index, 1);
    } else {
      // Seleccionar
      if (this.selectedSubjects.length < 3) {
        this.selectedSubjects.push(materia.id);
      }
    }
    
    this.clearMessages();
  }

  getSelectedSubjectsDetails(): Materia[] {
    return this.materiasDisponibles.filter(m => 
      this.selectedSubjects.includes(m.id)
    );
  }

  isFormInvalid(): boolean {
    return this.registrationForm.invalid || this.selectedSubjects.length === 0;
  }

  async onSubmit(): Promise<void> {
    if (this.isFormInvalid()) {
      this.markFormGroupTouched();
      if (this.selectedSubjects.length === 0) {
        this.subjectSelectionError = 'Debes seleccionar al menos una materia';
      }
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    try {
      const formData = this.registrationForm.value;
      const estudianteData: EstudianteCreate = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        materiasSeleccionadas: this.selectedSubjects
      };

      const response = await this.estudianteService.createEstudiante(estudianteData).toPromise();
      
      if (response?.success) {
        this.showSuccess(`${formData.nombre} ${formData.apellido} ha sido registrado exitosamente`);
        this.resetForm();
        
        // Emitir evento para actualizar la lista
        setTimeout(() => {
          this.onStudentRegistered.emit();
        }, 2000);
      } else {
        this.showError(response?.message || 'Error al registrar el estudiante');
      }
    } catch (error: any) {
      let errorMsg = 'Error al registrar el estudiante';
      if (error?.error?.message) {
        errorMsg = error.error.message;
      }
      this.showError(errorMsg);
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    this.onClose.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registrationForm.controls).forEach(key => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();
    });
  }

  private resetForm(): void {
    this.registrationForm.reset();
    this.selectedSubjects = [];
    this.subjectSelectionError = '';
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
    this.showErrorMessage = false;
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.showErrorMessage = true;
    this.showSuccessMessage = false;
  }

  private clearMessages(): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.subjectSelectionError = '';
  }
}