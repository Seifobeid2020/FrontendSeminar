import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Patient } from './patient';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  // patientsChanged = new Subject<Patient[]>();
  // patients: Patient[];
  constructor(private http: HttpClient) {}

  // setRecipes(recipes: Recipe[]) {
  //   this.recipes = recipes;
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // getRecipes() {
  //   return this.recipes.slice();
  // }

  // getRecipe(index: number) {
  //   return this.recipes[index];
  // }

  getPatients() {
    return this.http
      .get<any>('assets/patients.json')
      .toPromise()
      .then((res) => <Patient[]>res.data)
      .then((data) => {
        return data;
      });
  }
  getTypesOfXRayUser() {
    return this.http
      .get<any>('assets/patients.json')
      .toPromise()
      .then((res) => <string[]>res.typeOfXRayUser)
      .then((typeOfXRayUser) => {
        return typeOfXRayUser;
      });
  }
  getPatientsTest() {
    return this.http.get<any>('assets/patients.json').pipe(
      map((patients) => {
        // console.log('test: ', patients);
      })
    );
  }
  getPatient(id: number) {
    // console.log(this.getPatientsTest());
    let temp: Patient;
    return this.getPatients().then((data) => {
      return data.filter((patient) => patient.id == id);
    });
  }
}
