import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit, AfterViewInit{

  public dataSource!:MatTableDataSource<User>;
  public users!:User[];
  displayedColumns:string[]= ['SrNo','firstname','lastname','email','mobile','bmiResult','gender','packages','enquiryDate','action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api:ApiService, private router:Router, private activatedroute:ActivatedRoute){}

  ngOnInit(): void {
    this.getUsers();
  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getUsers(){
  
    this.api.getRegistration().subscribe(res=>{
      this.users=res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    })
  }
  getSrNo(index: number): number {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    return pageIndex * pageSize + index + 1;
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

