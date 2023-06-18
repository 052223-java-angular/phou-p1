import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FileService } from '../services/file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() hasUploadFile: boolean = false;
  @Input() hasFileTypeError: boolean = false;
  // @Input() componentId: string = '';
  // hasFileChange: boolean = false;

  file: File | null = null;

  @Output() hasUploadFileChange = new EventEmitter<boolean>();
  // @Output() fileChange = new EventEmitter<boolean>();

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(): void { }

  onFileSelect(event: any) : void {
    event.preventDefault();
    this.file = event.target?.files[0];

    if (this.file) {

      // // this.showTable = false;
      // this.hasFileChange = false;
      // this.componentId = 'data-select-table-' + Date.now();
      // setTimeout(() => {
      //   this.hasFileChange = true;
      // }, 0);

      const ext = this.file.type;

      if (!ext.includes("csv")) {
        this.setError();
        return;
      }

      this.fileService.parseCsvFile(this.file);
      this.hasUploadFileChange.emit(true);
      event.traget.value = '';
      this.file = null;
    }

  }

  setError() {
    this.hasFileTypeError = !this.hasFileTypeError;
    setTimeout(() => {
      this.hasFileTypeError = !this.hasFileTypeError;
    }, 3000);
  }

}




function output(): (target: FileUploadComponent, propertyKey: "uploadFileChange") => void {
  throw new Error('Function not implemented.');
}

