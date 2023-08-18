import { Component, Input, OnInit } from '@angular/core';
import { IAsset } from '../model/IAsset';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css']
})
export class AssetCardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input() topAsset!: IAsset;


}
