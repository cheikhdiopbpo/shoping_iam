import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {Platform} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { error } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
 private database : SQLiteObject;
 private dbReady : BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http : HttpClient, private sqlite : SQLite, private sqlitePorter :SQLitePorter,private platform :Platform) {
    this.platform.ready().then(rdy=>{
        this.sqlite.create({
            name : 'shopping.db',
            location : 'default'
        }).then((db:SQLiteObject)=>{
             this.database = db;
             this.dbReady.next(true);
             this.creaTable();
        }).catch(error=>{
          console.log(error);
          
        });
    });
   }

   getDatabaseState(){
    return this.dbReady.asObservable();
  }

   creaTable(){
     this.http.get("assets/bd/categorie.sql",{responseType : "text"}).subscribe(sql=>{
           this.sqlitePorter.importSqlToDb(this.database,sql).then(res=>{
              console.log(res);
              
           });
     });
   }

   addAllCategorie(allCategorie:any){
    allCategorie.forEach(el => {
      let data = [el.nom,el.img];
      this.database.executeSql("INSERT INTO categorie(nom,img) VALUES(?,?)",data).then(rs=>{
        console.log(rs);
        
      });
    });
   }


   getAllCategoire():Promise<any>{
   
    return this.database.executeSql("SELECT * FROM categorie",[]).then(data=>{
       let allcategorie:any=[];
       if(data.rows.length > 0){
         for (let i = 0; i < data.rows.length ; i++) {
            allcategorie.push(data.rows.item(i))
           
         }
       }
      return allcategorie;
    }).catch(error=>{
          console.log(error);
          
    });
  
  }

}
