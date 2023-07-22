import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient } from 'src/data/model/patient-schema.model';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  constructor(private electronService: ElectronService) {}

  getPatients(): Observable<Patient[]> {
    return of(this.electronService.ipcRenderer.sendSync('get-patients'));
  }

  getPatientById(id: number): Observable<Patient> {
    return of(this.electronService.ipcRenderer.sendSync('get-patient', id));
  }

  addPatient(patient: Patient): Observable<Patient[]> {
    return of(this.electronService.ipcRenderer.sendSync('add-patient', patient));
  }

  deletePatient(id: number): Observable<boolean> {
    return of(this.electronService.ipcRenderer.sendSync('delete-patient', id));
  }
}
