import { Component, Input, OnInit } from '@angular/core';
import { IAssetBrief } from '../model/IAssetBrief';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.css']
})
export class AssetTableComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  // @Input() assets$!: Observable<IAssetBrief[]>;
  @Input() assets!: IAssetBrief[] | null;
  colSpan: number = 6;

}
