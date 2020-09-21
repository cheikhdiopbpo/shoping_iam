import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  Alluser : any = [];
  constructor(private userService : UserService) {
    this.userService.getDatabaseState().subscribe(rdy=>{
      console.log(rdy);
      if(rdy){
        
        this.userService.getAllUser().then(res=>{
          console.log(res);
          
        });
      }
      
      
    });
   }

  ngOnInit() {
 this.userService.getAllUser().then(res=>{
          console.log(res);
          
        });
  }

  addUser(){
    console.log("eeeee");
    
    this.Alluser = {nom:"Hassanatou Ba ",email:"hassanatou@gmail.com",pwd:"passer"},
     
    this.userService.addOneUser(this.Alluser);
  }

}
