import { PatientService } from './../patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from '../patient';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}
  id: number;
  patientDetails: Patient;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      // this.recipeDetailInput = this.recipeService.getRecipe(this.id - 1);

      this.patientService.getPatient(this.id).then((data) => {
        this.patientDetails = data[0];
      });
    });
  }
}
