import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  hasFileTypeError: boolean = false;
  file: File | null = null;

  @Input() didUploadFile: boolean = false;
  @Output() didUploadFileChange = new EventEmitter<boolean>();

  constructor(
    private fileService: FileService,
  ) { }

  // for handling file uploads
  onFileUpload(event: any) : void {
    event.preventDefault();
    this.file = event.target?.files[0];

    if (this.file && this.isValidFileType()) {

      this.fileService.parseCsvFile(this.file);
      this.didUploadFileChange.emit(true);
      this.resetInput(event);
      return;
    }

    // invalid file, reset and throw error
    this.resetInput(event);
    this.showInputError();

  }

  // for resetting input and class file variable
  private resetInput(event: any) {
    event.target.value = '';
    this.file = null;
  }

  // for checking whether file has correct ext
  private isValidFileType() : boolean | undefined {
      return this.file?.type.includes("csv");
  }

  // for showing error
  private showInputError() {
    this.hasFileTypeError = !this.hasFileTypeError;
    setTimeout(() => {
      this.hasFileTypeError = !this.hasFileTypeError;
    }, 3000);
  }

}




function output(): (target: FileUploadComponent, propertyKey: "uploadFileChange") => void {
  throw new Error('Function not implemented.');
}

