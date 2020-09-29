import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CommandeService } from 'src/app/services/commande.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-produit-categorie',
  templateUrl: './produit-categorie.page.html',
  styleUrls: ['./produit-categorie.page.scss'],
})
export class ProduitCategoriePage implements OnInit {
   allProduits : any = [];
   allProduits2 :any =[];
   user:any ={};
  constructor(
       private activeRoute : ActivatedRoute,
       private alertCtr : AlertController,
       private commandeService : CommandeService,
       private toast:ToastController
  ) {
      console.log(environment.user);
     
      this.user = environment.user;
      this.activeRoute.queryParams.subscribe(res=>{
     
          this.allProduits = JSON.parse(res.produits);
          this.allProduits2 = JSON.parse(res.produits);

      });
      

   }

  ngOnInit() {
  }

  chercheProduit(e){
  
    let val : any = e.target.value;
    if(val && val.trim() != "")
    {
       this.allProduits = this.allProduits.filter(item=>{
               return (String(item.nom).toLocaleLowerCase().indexOf(String(val).toLocaleLowerCase()) !== -1 );
       });
       console.log(this.allProduits);
       
    }else{
       this.allProduits =this.allProduits2;
    }

  }
async   showProduit(item){
      console.log(item);
      const alert = await this.alertCtr.create({
         cssClass :"card_alert",
         header :"Produit détaille",
         message: `<br><p><b>${item.nom}</b></p><p>Prix:${item.prix}</p> <img src="../../../assets/img/${item.img}" class="card-alert" >`,
         inputs: [
          {
            name: 'quantite',
            placeholder: 'Veuillez saisir une quantité',
            type: 'text'
          },
        ],
        buttons: [
          {
            text: "Annuler",
            role: 'cancel',
            handler: data => {
            
              alert.present();
            }
          },
          {
            text: 'Valider',
            handler: data => {
                if(data.quantite != ""){
                   console.log("panier ", this.user);
                  let today = new Date();
                  let mycommande : any = {id_user: this.user.id ,id_produit:item.id,qt:data.quantite,date_commande:String(today)};
                 
                   this.commandeService.getDatabaseState().subscribe(rdy=>{
                       if(rdy){
                        this.commandeService.addcommande(mycommande);
                        this.showMessage("produit ajouté");
                 
                       }else{
                        this.showMessage("probleme de connexion");
                       }
                   });
                
                }
            }
          }]
      });
      alert.present();
  }

  async showMessage(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      position: "top",
    });
    toast.present();
  }

}
