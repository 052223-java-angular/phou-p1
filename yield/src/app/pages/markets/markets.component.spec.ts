import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsComponent } from './markets.component';
import { AssetService } from 'src/app/components/crypto/service/asset-service';
import { AssetTableComponent } from 'src/app/components/crypto/asset-table/asset-table.component';
import { AssetCardComponent } from 'src/app/components/crypto/asset-card/asset-card.component';

describe('MarketsComponent', () => {
  let component: MarketsComponent;
  let fixture: ComponentFixture<MarketsComponent>;

  beforeEach(async () => {
    // create testbed configuration
    await TestBed.configureTestingModule({
      declarations: [ 
        MarketsComponent, 
        AssetTableComponent, 
        AssetCardComponent ],
      providers: [AssetService]
    })
    .compileComponents();

    // create component fixtures
    fixture = TestBed.createComponent(MarketsComponent);
    component = fixture.componentInstance;

    // target component intialization
    fixture.detectChanges();

    // Use async and await to handle asynchronous operations
    await fixture.whenStable(); // Wait for all pending promises to complete

  });


  // assert the component was created
  it('should initialize market component', () => {
    expect(component).toBeTruthy();
    
  });

  // assert top asset observable is initialized
  it('should populate observables', () => {
    component.topAssets$.subscribe(topAssets => {
      expect(topAssets).toBeDefined();
      expect(topAssets.length).toBeGreaterThan(0);
    })
  }) 

  // assert asset observable is initialized
  it('should populate assets', () => {
    component.assets$.subscribe(assets => {
      expect(assets).toBeDefined();
      expect(assets.length).toBeGreaterThan(0);
    })
  })


});
