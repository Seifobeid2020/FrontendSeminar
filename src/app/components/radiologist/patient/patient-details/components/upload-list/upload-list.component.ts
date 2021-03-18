import { TreatmentService } from './../treatment.service';
import { FileUpload } from './../../../../../../../shared/FileUpload';
import { Treatment } from './../treatment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FileUploadService } from 'src/shared/file-upload.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css'],
})
export class UploadListComponent implements OnInit {
  fileUploads?: FileUpload[];
  treatments: Treatment[];

  constructor(
    private treatmentService: TreatmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   this.uploadService
    //     .getFiles(6, params['id'])
    //     .snapshotChanges()
    //     .pipe(
    //       map((changes) => {
    //         //store the key
    //         return changes.map((c) => ({
    //           key: c.payload.key,
    //           ...c.payload.val(),
    //         }));
    //       })
    //     )
    //     .subscribe((fileUploads) => {
    //       this.treatments.push([...this.treatments,new Treatment(1,32,fileUploads[0].url)])
    //       console.log(fileUploads, ' this is files');
    //       this.fileUploads = fileUploads;
    //     });
    // });
    this.treatmentService.getTreatments().then((data) => {
      this.treatments = data;
    });
  }
}
