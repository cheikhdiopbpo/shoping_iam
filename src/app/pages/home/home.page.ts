import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategorieService } from 'src/app/services/categorie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  allCategorie : any = [];
  user : any = {};
  constructor(private activateRoute : ActivatedRoute,private categoriService : CategorieService,private toast : ToastController) {
      this.activateRoute.queryParams.subscribe(data=>{
            console.log("HOME PAGE" , JSON.parse(data.user));
           this.user =  JSON.parse(data.user);
            
      });

       this.categoriService.getDatabaseState().subscribe(rdy=>{
         if(rdy){
              //  let allCat = [
              //   {nom : "Cosmétique",img : "flower" },
              //   {nom : "Alimentaire",img : "basket" },
              //   {nom : "Informatique",img : "desktop" }
              //  ];
              //  this.categoriService.addAllCategorie(allCat);
              this.categoriService.getAllCategoire().then(res=>{
                this.allCategorie = res;
                console.log("categorie", this.allCategorie);
                
              });
         }
       });
   }

  ngOnInit() {

  }

  showCategorie(item){
    let message : string = "Ctégorie :"+item.nom;
    this.showMessage(message);
  }

  async showMessage(message:string){
    const toast = await this.toast.create({
        message : message,
        duration : 2000,
        position: "top" 
    });
    toast.present();
  }
}
