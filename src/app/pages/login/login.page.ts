import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  allUser : any = [];
  user : any = {};
  constructor(private userService : UserService,private toast : ToastController,private route : Router) {
      this.userService.getDatabaseState().subscribe(rdy=>{
          if(rdy){
             this.userService.getAllUser().then(res=>{
               this.allUser = res;
              console.log(res);
               
             });
          }
      });
      this.user.email = "";
      this.user.password = "";
   }

  ngOnInit() {
  }


  signin(){
 //   console.log("my object " ,this.allUser);
    let checkUser = this.allUser.find(x=>x.email == this.user.email && x.pwd == this.user.password);
    console.log(checkUser);
    
    if(checkUser == undefined){
      this.showMessage("Login ou mot de passe incorrecte")
    }else{

      const mesdeonne : NavigationExtras = {
        queryParams : {
          user : JSON.stringify(checkUser)
        }
      }
      this.route.navigate(["/home"], mesdeonne);
    }
    
  }
  

  async showMessage(message:string){
    const toast = await this.toast.create({
        message : message,
        duration : 2000,
        color : "danger",
        position: "top" 
    });
    toast.present();
  }
}
