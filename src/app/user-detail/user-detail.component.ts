import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../models/user.model';

export interface Vegetable {
  name: string;
}
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit{
  public userId!:number;
  public userDetail!:User;
  constructor(private activatedroute:ActivatedRoute, private router:Router, private api:ApiService){}
  ngOnInit(): void {
    this.activatedroute.params.subscribe(val=>{
      this.userId=val['id'];
      this.fetchUserDetail(this.userId);
    })
  }

  fetchUserDetail(userId:number){
    this.api.getRegistrationId(this.userId).subscribe(res=>{
      this.userDetail=res;
      console.log(this.userDetail)
    })
  }
}
