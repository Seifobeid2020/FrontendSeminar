import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileUploadService } from 'src/shared/file-upload.service';
import { FileUpload } from 'src/shared/FileUpload';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css'],
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload!: FileUpload;
  id: number;

  constructor(
    private uploadService: FileUploadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      // this.recipeDetailInput = this.recipeService.getRecipe(this.id - 1);
      console.log(this.fileUpload, ' this is from uploadDetails');
      // this.patientService.getPatient(this.id).then((data) => {
      //   this.patientDetails = data[0];
      // });
    });
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
