import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit{

  public dataSource!:MatTableDataSource<User>;
  public users!:User[];
  displayedColumns:string[]= ['id','firstname','lastname','email','mobile','bmiResult','gender','packages','enquiryDate','action'];

  constructor(private api:ApiService, private router:Router, private activatedroute:ActivatedRoute){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
  
    this.api.getRegistration().subscribe(res=>{
      this.users=res;
      debugger
      this.dataSource = new MatTableDataSource(this.users);
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  edit(id:number){
    this.router.navigate(['update',id])
  }
  delete(id:number){
    this.api.deleteRegistration(id).subscribe(resp=>{
     this.getUsers();
    })
  }
}

