import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { CategorieService } from "src/app/services/categorie.service";
import { CommandeService } from 'src/app/services/commande.service';
import { ProduitService } from "src/app/services/produit.service";
import {environment}  from '../../../environments/environment';
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  allCategorie: any = [];
  allProduit: any = [];
  user: any = {};
  recenteProduit : any = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private categoriService: CategorieService,
    private route : Router,
    private toast: ToastController,
    private produitService: ProduitService,
    private commandeService : CommandeService
  ) {
    this.activateRoute.queryParams.subscribe((data) => {
      console.log("HOME PAGE", JSON.parse(data.user));
      this.user = JSON.parse(data.user);
      environment.user = this.user;
    });

    this.commandeService.getDatabaseState().subscribe(rdy=>{
      if(rdy){
         this.commandeService.getAllcommandes().then(res=>{
           this.produitService.getAllProduits().then(res2=>{ 
           console.log(res);
           let recapcommande : any = [];
           res.forEach(el1 => {
                res2.forEach(el2 => {
                     if(el1.id_produit == el2.id)
                     {
                       el1.libbelle = el2.libelle;
                       el1.prix = el2.prix;
                       el1.total = el1.qt * el2.prix
                       recapcommande.push(el1);
                     }
                });
           });
           console.log("mon recap", recapcommande);
           
          });
         });
      }
  });

    this.categoriService.getDatabaseState().subscribe((rdy) => {
      if (rdy) {
       
        //  this.categoriService.addAllCategorie(allCat);
        this.categoriService.getAllCategoire().then((res) => {
          this.allCategorie = res;
          console.log("categorie", this.allCategorie);
          this.produitService.getAllProduits().then(rs=>{
            this.allProduit = rs;
            this.recenteProduit.push(this.allProduit[this.allProduit.length - 1]);
            this.recenteProduit.push(this.allProduit[this.allProduit.length - 2]);
            this.recenteProduit.push(this.allProduit[this.allProduit.length - 3]);
            this.recenteProduit.push(this.allProduit[this.allProduit.length - 4]);
            console.log(this.recenteProduit);
            
            
         });


        });

       
      }
    });
  }

  ngOnInit() {}

  showCategorie(item) {
    let message: string = "Ctégorie :" + item.nom;
    let produitByCategori : any = [];
    this.allProduit.forEach(el => {
       if(el.categorie_id == item.id){
         produitByCategori.push(el);
       }
    });
    console.log(" result" ,produitByCategori);
    const mesdonne : NavigationExtras = {
      queryParams : {
        produits : JSON.stringify(produitByCategori)
      }
    }
    this.route.navigate(["/produit-categorie"],mesdonne);
   // this.showMessage(message);
  }

  async showMessage(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      position: "top",
    });
    toast.present();
  }

  // let allpoduct = [
          
  //   {nom : "Moringa",libelle : "Moringa rouge",prix: 500, qt : 10 ,img : "moringa.jpg" ,categorie_id : 1 },
  //   {nom : "Rouge à lévre",libelle : "Rouge à lévre",prix: 400, qt : 10 ,img : "rouge.jpg" ,categorie_id : 1 },
  //   {nom : "Palette à paupière",libelle : "Palette à paupière",prix: 1500, qt : 10 ,img : "far.jpg" ,categorie_id : 1},
  //   {nom : "Auriga",libelle : "Auriga",prix: 450, qt : 10 ,img : "auriga.jpg" ,categorie_id : 1},
   

  //   {nom : "Riz",libelle : "Riz",prix: 17000, qt : 10 ,img : "riz.jpg" ,categorie_id : 2},
  //   {nom : "Huile",libelle : "Huile",prix: 22000, qt : 10 ,img : "huil.jpg" ,categorie_id : 2},
  //   {nom : "Lait en poudre",libelle : "Lait en poudre",prix: 1500, qt : 10 ,img : "lait.jpg" ,categorie_id : 2},
  //   {nom : "Oignon",libelle : "Oignon",prix: 13000, qt : 10 ,img : "oignon.jpg" ,categorie_id : 2},
   
  //   {nom : "Laptop",libelle : "Laptop",prix: 250000, qt : 10 ,img : "laptop.jpg" ,categorie_id : 3},
  //   {nom : "Switch cisco",libelle : "Switch cisco",prix: 75000, qt : 10 ,img : "switch.jpg" ,categorie_id : 3},
  //   {nom : "Cable Rj45",libelle : "Cable Rj45",prix: 1500, qt : 10 ,img : "rj45.jpg" ,categorie_id : 3},
  //   {nom : "Casque",libelle : "Casque",prix: 10000, qt : 10 ,img : "casque.jpg" ,categorie_id : 3},
   
   
  //  ];
  //  this.produitService.addAllProduit(allpoduct);
}
