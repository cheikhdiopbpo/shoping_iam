import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {Platform} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //declaration d'un objet de type sqlite object
  private database : SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private http : HttpClient,
    private sqlite : SQLite,
    private sqlitePorter : SQLitePorter,
    private platform : Platform
  ) { 
      this.platform.ready().then(()=>{
         this.sqlite.create({
            name:'shopping.db',
            location:'default'
         }).then((db:SQLiteObject)=>{
             this.database = db ;
             this.dbReady.next(true);
             this.createTable();
         });
      });
  }

  getDatabaseState(){
    return this.dbReady.asObservable();
  }

  //create table if note exists
  createTable(){
    this.http.get('assets/bd/users.sql',{responseType:"text"}).subscribe(sql=>{
           this.sqlitePorter.importSqlToDb(this.database,sql).then(res=>{
             console.log(res);
             
           }).catch(error=>{
              console.log(error);
              
           });
           
    });
  }
  
  addOneUser(user:any){
     let data = [user.nom,user.email,user.pwd];
     this.database.executeSql("INSERT INTO users(nom,email,pwd) VALUES(?,?,?)",data).then(res=>{
       console.log(res);
       
     }).catch(error=>{
       console.log(error);
       
     });
  }
  //delete user 
  deleteOneUser(id:number){
    this.database.executeSql("DELETE FROM users where id = ?",[id]).then(rs=>{
      console.log(rs);
      
    });
  }
  //get all users
  getAllUser():Promise<any>{
   
    return this.database.executeSql("SELECT * FROM users",[]).then(data=>{
       let alluser:any=[];
       if(data.rows.length > 0){
         for (let i = 0; i < data.rows.length ; i++) {
            alluser.push(data.rows.item(i))
           
         }
       }
      return alluser;
    });
  
  }

  //insert all users
  addAlluser(allUsers:any){
      allUsers.forEach(el => {
        let data = [el.nom,el.email,el.pwd];
        this.database.executeSql('INSERT INTO users(nom,email,pwd) VALUES(?,?,?)',data).then(res=>{
          console.log(res);
          
        }).catch(error=>{
          console.log(error);
          
        });
      });
        
      
  }

}

