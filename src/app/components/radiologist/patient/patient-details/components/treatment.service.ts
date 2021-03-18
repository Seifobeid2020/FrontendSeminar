import { Treatment } from './treatment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  constructor(private http: HttpClient) {}
  getTreatments() {
    return this.http
      .get<any>('assets/treatments.json')
      .toPromise()
      .then((res) => <Treatment[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
