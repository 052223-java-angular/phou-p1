import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from '../service/fileService';
import { Observable } from 'rxjs';
import { TradeService } from '../service/trade.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  constructor(private fileService: FileService, private tradeService: TradeService) { }

  @Output() fileChange: EventEmitter<boolean> = new EventEmitter();

  onFileSelect(event: any) : void {
    const file : File = event.target.files[0];

    // read file; transform 
    if (file) {
      this.fileService.parseCsvFile(file).subscribe((records) => {
        this.tradeService.raiseHeaderRowChange(records[0]);
        this.tradeService.raiseTradeRecordRowChange(records[1]);
        this.tradeService.raiseTradeRecordsChange(records.slice(1));
        this.tradeService.raiseHeaderFieldColCountChange(records[0].length)
        this.fileChange.emit(true);
      });
    }
  }

}
