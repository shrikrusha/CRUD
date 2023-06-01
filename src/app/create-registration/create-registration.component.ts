import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit{
  public registerForm!:FormGroup;
  public userIdToUpdate!:number;
  public isUpdateActive:boolean=false;
  constructor(private fb:FormBuilder,  private api:ApiService, private activatedrout:ActivatedRoute, private router:Router){

  }
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      firstname:this.fb.control('',Validators.compose([Validators.required, Validators.minLength(3)])),
      lastname:this.fb.control('',Validators.compose([Validators.required,Validators.minLength(3)])),
      email:this.fb.control('',Validators.required),
      mobile:this.fb.control('',Validators.required),
      weight:this.fb.control('',Validators.required),
      height:this.fb.control('',Validators.required),
      bmi:this.fb.control(''),
      bmiResult:this.fb.control(''),
      gender:this.fb.control('male'),
      requireTrainer:this.fb.control('Yes'),
      packages:this.fb.control(''),
      important:this.fb.control(''),
      haveGymBefore:this.fb.control(''),
      enquiryDate:this.fb.control('',Validators.required)
    })
    this.registerForm.controls['height'].valueChanges.subscribe(res=>{
      this.calculateBmi(res)
    })

    this.activatedrout.params.subscribe(val=>{
      this.userIdToUpdate=val['id'];
      this.api.getRegistrationId(this.userIdToUpdate).subscribe(resp=>{
        this.isUpdateActive=true;
        this.fillFormToUpdate(resp);
       
      })
    })
  }
  public packages = ["Monthly","Quarterly","Yearly"];
  public gender = ["Male", "Female"];
  public importantList:string[]=[
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive",
    "Shugar Craving Body",
    "Fitness"
  ]

  registration(){
    if(this.registerForm.valid){
      console.log('sucess');
      this.api.postRegistration(this.registerForm.value).subscribe(result=>{
        Swal.fire('Hi', 'Enquiry Confirmed!', 'success');
        this.registerForm.reset();
        this.router.navigate(['/list']);
      })
    }else{
      Swal.fire('Hi', 'Enquiry Failed!', 'error')
    }
  }

  calculateBmi(heightValue:any){
    debugger
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight/(height*height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch(true){
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normalweight");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue("Obses");
    }
  }

  fillFormToUpdate(user:User){
      this.registerForm.patchValue({
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email,
      mobile:user.mobile,
      weight:user.weight,
      height:user.height,
      bmi:user.bmi,
      bmiResult:user.bmiResult,
      gender:user.gender,
      requireTraineruser:user.requireTrainer,
      packages:user.packages,
      important:user.important,
      haveGymBefore:user.haveGymBefore,
      enquiryDate:user.enquiryDate
    })
    // 
    
  }
  update(){
    this.api.updateRegistration(this.userIdToUpdate,this.registerForm.value).subscribe(result=>{
      this.registerForm.reset();
      this.router.navigate(['/list']);
      Swal.fire('Hi', 'Enquiry Updated!', 'success');
    })
    
  }
}
