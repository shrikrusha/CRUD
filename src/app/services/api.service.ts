import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl:string = 'http://localhost:3000/enquiry'
  constructor(private httpclient:HttpClient) { }

  //add data to json server
  postRegistration(registerObj:User){
    return this.httpclient.post<User>(this.baseUrl,registerObj);
  }

   //get data from json server
   getRegistration(){
    return this.httpclient.get<User[]>(this.baseUrl);
  }

  //update data to json server
  updateRegistration(id:number, registerObj:User){
    return this.httpclient.put(this.baseUrl+'/'+id,registerObj);
  }

  //delete data from json server
  deleteRegistration(id:number){
    return this.httpclient.delete<User>(this.baseUrl+'/'+id);
  }

  getRegistrationId(id:number){
    return this.httpclient.get<User>(this.baseUrl+'/'+id);
  }



}
