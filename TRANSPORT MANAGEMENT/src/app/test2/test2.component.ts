import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Data, Router } from '@angular/router';
import { Service2Service } from '../service2.service';
import { Component, OnInit, ViewChild } from '@angular/core';
















@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
  providers: [DatePipe],
})
export class Test2Component implements OnInit {

  Email: any;
  balref: any;
  rowData: any[] = [];
  displayedColumns: string[] = ['field_name', 'employee_name', 'gender', 'staff', 'contact', 'email', 'address', 'designation', 'Actions'];
  reloadFlag = localStorage.getItem('reloadFlag');
  formattedDate = this.datePipe.transform(new Date(), 'dd/MMM/yyyy');
  ngonInit(): void {

  }
  public employeeFormGroup = this.fb.group({
    field_name: new FormControl(null, Validators.required),
    employee_name: new FormControl(null, Validators.required),
    'gender': ["Male"],
    'staff': ["Dirver"],
    'contact': new FormControl(null, Validators.required),
    'email': new FormControl(null, Validators.required),
    'address': new FormControl(null, Validators.required),
    'designation': new FormControl(null, Validators.required),
    '_id': [],
    '_rev': [],
  });

  registersubmited() {
    console.log(this.employeeFormGroup.get("field_name"));
    console.log(this.employeeFormGroup.get("employee_name"));
    console.log(this.employeeFormGroup.get("contact"));
    console.log(this.employeeFormGroup.get("email"));
    console.log(this.employeeFormGroup.get("address"));
    console.log(this.employeeFormGroup.get("designation"));


  }

  get field_name(): FormControl {
    return this.employeeFormGroup.get("field_name") as FormControl;
  }

  get employee_name(): FormControl {
    return this.employeeFormGroup.get("employee_name") as FormControl;
  }

  get contact(): FormControl {
    return this.employeeFormGroup.get("contact") as FormControl;
  }

  get email(): FormControl {
    return this.employeeFormGroup.get("email") as FormControl;
  }

  get address(): FormControl {
    return this.employeeFormGroup.get("address") as FormControl;
  }
  get designation(): FormControl {
    return this.employeeFormGroup.get("designation") as FormControl;
  }



  constructor(private fb: FormBuilder, public service: Service2Service, private datePipe: DatePipe, private router: Router) { }

  saveAction() {

    if (this.employeeFormGroup.valid) {
      let employeeObject: any = this.employeeFormGroup.value;
      console.log(employeeObject);



      employeeObject['object_name'] = 'jana_name'



      if (employeeObject['_id'] == null) {
        delete employeeObject['_id']
      }
      if (employeeObject['_rev'] == null) {
        delete employeeObject['_rev']
      }


      let bulkDocsArray = [];
      bulkDocsArray.push(employeeObject);
      this.service.updateDocument(bulkDocsArray);
    }

    else {
      alert("Some of fields not valid")
    }
    this.onEdit('item');

  }
  fetchAction() {
    this.service.searchDocument('object_name:jana_name')
  }

  editAction(employeeObject: any) {
    this.employeeFormGroup.reset()
    this.employeeFormGroup.patchValue(employeeObject)
  }

  deleteAction(employeeObject: any) {
    this.service.deleteDocument(employeeObject['_id'], employeeObject['_rev'])
  }

  resetAction() {
    this.employeeFormGroup.reset()
    this.employeeFormGroup.markAsUntouched()
  }

  onreset() {
    this.employeeFormGroup.reset();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.service.dataSource.paginator) {
      this.service.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    if (!this.reloadFlag) {
      localStorage.setItem('reloadFlag', 'true');
      location.reload();
    }

    if (localStorage.getItem('email') == null) {
      Swal.fire('UnAutharized User', '', 'warning')
      this.router.navigateByUrl('/');
    }
    this.fetchAction()
    this.Email = localStorage.getItem('email');      //Get user Mail id from Login page using user service

  }
  printx() {
    localStorage.setItem('reloadFlag', "")
  }

  onEdit(item: any) {
    this.service.employees.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;


  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    localStorage.setItem('reloadFlag', "")
  }




}


