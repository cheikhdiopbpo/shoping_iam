import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitCategoriePageRoutingModule } from './produit-categorie-routing.module';

import { ProduitCategoriePage } from './produit-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitCategoriePageRoutingModule
  ],
  declarations: [ProduitCategoriePage]
})
export class ProduitCategoriePageModule {}
