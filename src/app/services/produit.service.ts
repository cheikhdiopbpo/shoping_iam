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
export class ProduitService {
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
  //creation de la table produit
   createTable(){
      this.http.get('assets/bd/produit.sql',{responseType :"text"}).subscribe(maimouna=>{
         // execution de la requet sql  avec le service sqlporter
         this.sqlitePorter.importSqlToDb(this.database,maimouna).then(lena=>{
            console.log(lena);
            
         }).catch(error=>{
            console.log(error);
            
         });

      });
   }

 //creation produits
 addAllProduit(allProduit:any){
   allProduit.forEach(element => {
       let data :any = [element.nom,element.libelle,element.prix,element.qt,element.img,element.categorie_id];
       this.database.executeSql("INSERT INTO produit(nom,libelle,prix,qt,img,categorie_id) VALUES(?,?,?,?,?,?)",data).then(response=>{
         console.log(response);
         
       });
   });

 }

 getAllProduits():Promise<any>{
   return this.database.executeSql("SELECT * FROM produit",[]).then(rs=>{
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
