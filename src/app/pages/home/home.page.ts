import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private activateRoute : ActivatedRoute) {
      this.activateRoute.queryParams.subscribe(data=>{
            console.log("HOME PAGE" , JSON.parse(data.user));
            
      });
   }

  ngOnInit() {

  }


}
