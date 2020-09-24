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
  //user : any = {};
  email :string;
  password :string;
  constructor(private userService : UserService,private toast : ToastController,private route : Router) {
    this.userService.getDatabaseState().subscribe(rdy=>{
      if(rdy){
         this.userService.getAllUser().then(res=>{
           this.allUser = res;
          console.log(res);
           
         });
      }
  });
  this.email = "";
  this.password = "";
    }

  ngOnInit() {
  }
ionViewDidEnter(){

}

  signin(){
      console.log("my object " ,this.email , this.password);
      // let email:any = this.email.trim();
      // let pwd :any = this.password.trim();
    let checkUser = this.allUser.find(x=> x.email == this.email  && x.pwd == this.password);
    console.log(checkUser);
    
    if(checkUser == undefined){
      this.showMessage("Login ou mot de passe incorrecte")
    }else{

      const mesdonnee : NavigationExtras = {
        queryParams : {
          user : JSON.stringify(checkUser),
          
        }
      }
      console.log(mesdonnee);
      
      this.route.navigate(["/home"], mesdonnee);
      //this.route.navigateByUrl("home");
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

  goToSignUp(){
    this.route.navigateByUrl("signup");
  }
}
