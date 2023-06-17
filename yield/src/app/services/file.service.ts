import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { IColumnPair } from '../models/IColumnPair';
import { IColumn } from '../models/IColumn';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private fileData: string[] = [];
  private fileData2D: string[][] = [];
  private headerFields!: string[];
  private tradeColumnOptions: string[] = ['asset_pair', 'asset_pair_value', 'bought_date', 'bought_qty', 'bought_value', 'bought_fee', 'sold_date', 'sold_qty', 'sold_value', 'sold_fee'];

  constructor(
    private papa: Papa
  ) {}

  // 1. parse the file using papa
  parseCsvFile(file: File) : void {

    this.papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        // save the data results
        this.headerFields = result.data[0];

        for (let i = 0; i < result.data.length; i++) {

          // bug - trailing space from document is being added, 
          // pop for a temp fix 
          let data = result.data[i];
          data.pop();

          if (data !== "") {
            this.fileData.push(result.data[i]);
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getFile2D() : string[][] {
    return this.fileData2D;
  }

  getFileData() : string[] {
    return this.fileData;
  }

  getHeaderFields() : string[] {
    return this.headerFields;
  }

  getTradeColumnOptions() {
    return this.tradeColumnOptions;
  }

  // 2. save the header field of the file
  saveFileHeaderFields(fields: IColumnPair[]) : void {
    this.headerFields = [];
    for (let col of fields) {
      this.headerFields.push(col.columnName);
    }
  }

  // replace row on of the file with new header row
  // identify the valid column #'s
  // cleanup 

  consoleLogFileData() {
    console.log(this.fileData);
  }

  consoleLogHeaderFields() {
    console.log(this.headerFields);
  }

}
