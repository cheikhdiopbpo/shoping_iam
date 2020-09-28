import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduitCategoriePage } from './produit-categorie.page';

describe('ProduitCategoriePage', () => {
  let component: ProduitCategoriePage;
  let fixture: ComponentFixture<ProduitCategoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitCategoriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitCategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
