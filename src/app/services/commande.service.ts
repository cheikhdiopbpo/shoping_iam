

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {Platform} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { element, error } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private database : SQLiteObject;
  private dbReady : BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
         private http : HttpClient,
         private sqlite :SQLite,
         private sqlitePorter : SQLitePorter,
         private platform : Platform
  ) {
        this.platform.ready().then(rs=>{
            this.sqlite.create({
                   name : 'shopping.db',
                   location : 'default'
                 })
                .then((db:SQLiteObject)=>{
                    this.database = db;
                    this.dbReady.next(true);
                    this.createTable();
                }).catch(error=>{
                      console.log(error);
                      
                });
        });
   }


   
   getDatabaseState(){
    return this.dbReady.asObservable();
  }
  //creation de la table commande
   createTable(){
      this.http.get('assets/bd/commande.sql',{responseType :"text"}).subscribe(maimouna=>{
         // execution de la requet sql  avec le service sqlporter
         this.sqlitePorter.importSqlToDb(this.database,maimouna).then(lena=>{
            console.log(lena);
            
         }).catch(error=>{
            console.log(error);
            
         });

      });
   }

 //creation commandes
 addcommande(element:any){

 
       let data :any = [element.id_user,element.id_produit,element.qt,element.date_commande];
       this.database.executeSql("INSERT INTO commande(id_user,id_produit,qt,date_commande) VALUES(?,?,?,?)",data).then(response=>{
         console.log(response);
         
       });

 }

 getAllcommandes():Promise<any>{
   return this.database.executeSql("SELECT * FROM commande",[]).then(rs=>{
      let allProduct : any = [];
      if(rs.rows.length > 0){
        for (let i = 0; i < rs.rows.length; i++) {
            allProduct.push(rs.rows.item(i))
        }
      }
      return allProduct;
   })
 }

 

}
