import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetService } from 'src/app/components/crypto/service/asset-service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { IAsset } from 'src/app/components/crypto/model/IAsset';
import { IAssetBrief } from 'src/app/components/crypto/model/IAssetBrief';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css'],
  providers: [AssetService]
})
export class MarketsComponent implements OnInit {

  constructor(private assetService: AssetService) { }

  ngOnInit(): void { 
    this.topAssets$ = this.assetService.fetchTopAssets();
    this.assets$ = this.assetService.fetchAssets();
  }

  topAssets$!: Observable<IAsset[]>;
  assets$!: Observable<IAssetBrief[]>

  onDrop(event: CdkDragDrop<IAsset[]>) : void {
    this.topAssets$.subscribe((assets) => {
      moveItemInArray(assets, event.previousIndex, event.currentIndex);
    })

  }
  

}
