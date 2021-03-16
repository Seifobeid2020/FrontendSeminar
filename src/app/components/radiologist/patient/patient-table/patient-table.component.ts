import { Component, OnInit } from '@angular/core';

import { Patient } from '../patient';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PatientService } from '../patient.service';

interface TypeXRay {
  name: string;
}

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./patient-table.component.css'],
})
export class PatientTableComponent implements OnInit {
  patientDialog: boolean;

  patients: Patient[];

  patient: Patient;

  selectedPatients: Patient[];

  selectedTypeXRay: any = { name: 'Panorama' };

  stateGenderOptions: any[];

  typesOfXRay: string[];

  submitted: boolean;

  selectedgenderValue: string = 'Male';

  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    //Gender Options
    this.stateGenderOptions = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ];
  }

  ngOnInit() {
    console.log(this.stateGenderOptions);
    this.patientService.getPatients().then((data) => {
      this.patients = data;
    });
    this.patientService.getTypesOfXRayUser().then((data) => {
      this.typesOfXRay = data;
    });
  }

  openNew() {
    this.patient = {};
    this.submitted = false;
    this.patientDialog = true;
  }

  deleteSelectedPatients() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Patients?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patients = this.patients.filter(
          (val) => !this.selectedPatients.includes(val)
        );
        this.selectedPatients = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Patients Deleted',
          life: 1500,
        });
      },
    });
  }

  editPatient(patient: Patient) {
    this.patient = { ...patient };
    this.patientDialog = true;
  }

  deletePatient(patient: Patient) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + patient.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patients = this.patients.filter((val) => val.id !== patient.id);
        this.patient = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Patient Deleted',
          life: 1500,
        });
      },
    });
  }

  hideDialog() {
    this.patientDialog = false;
    this.submitted = false;
  }

  savePatient() {
    this.submitted = true;
    console.log(this.selectedTypeXRay, ' this is se;ested');
    console.log(this.patient.typeOfXRay);
    if (this.patient.firstName && this.patient.firstName.trim()) {
      //if edite
      if (this.patient.id) {
        this.patient.typeOfXRay = this.selectedTypeXRay;
        this.patient.gender = this.selectedgenderValue;
        // this.patients.this.patient.id = this.patient;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Patient Updated',
          life: 1500,
        });
      }
      //if add
      else {
        this.patient.date = new Date();
        // this.patient.id = this.createId();
        this.patient.image = 'patient-placeholder.svg';
        this.patient.gender = this.selectedgenderValue;
        this.patient.typeOfXRay = this.selectedTypeXRay;
        this.patients.push(this.patient);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Patient Created',
          life: 1500,
        });
      }

      this.patients = [...this.patients];
      this.patientDialog = false;
      this.patient = {};
    }
  }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.patients.length; i++) {
  //     if (this.patients[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.patients);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  detailsPatient(patient: Patient) {
    console.log(patient);
  }
}
