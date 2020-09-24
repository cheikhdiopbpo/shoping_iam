import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user : any = {};
  constructor(private route : Router,
              private toastControl : ToastController,
              private userService : UserService) {

      this.user.nom = "";
      this.user.email = "";
      this.user.pwd = "";
   }

  ngOnInit() {
  }


   
  signup(){
    console.log("result" , this.user);
    if(this.user.nom == "" || this.user.email == "" || this.user.pwd == ""  )
    {
        this.showMessage("svp les champs sont obligatoire");
    }else{
         this.userService.getDatabaseState().subscribe(rdy=>{
             console.log(rdy);
             if(rdy){
               this.userService.addOneUser(this.user);
               const mesdonnee : NavigationExtras = {
                 queryParams : {
                   user : JSON.stringify(this.user)
                 }
               }
               this.route.navigate(['/home'],mesdonnee);
             }
             
         });
    }
    
  }

  async showMessage(message : string){
    const toast = await this.toastControl.create({
     message : message,
     duration: 2000,
     position : "top",
     color:"danger"
    });
    toast.present();
  }

  retour(){
   //  this.userService.deleteOneUser(6);
     this.route.navigateByUrl("login");
  }
}
