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

  @Output() hasUploadFileChange = new EventEmitter<boolean>();


  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(): void {

  }

  onFileSelect(event: any) : void {
    event.preventDefault();
    const file: File = event.target?.files[0];

    if (file) {
      const ext = file.type;

      if (!ext.includes("csv")) {
        this.setError();
        return;
      }

      this.fileService.parseCsvFile(file);
      this.hasUploadFileChange.emit(true);
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

