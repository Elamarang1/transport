
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { Data, Router } from '@angular/router';
import { Service2Service } from '../service2.service';

@Component({
  selector: 'app-test7',
  templateUrl: './test7.component.html',
  styleUrls: ['./test7.component.css'],
  providers: [DatePipe],

})
export class Test7Component implements OnInit {

  Email: any;
  balref: any;
  rowData: any[] = [];
  displayedColumns: string[] = ['field_name', 'employee_name', 'gender', 'staff', 'contact', 'email', 'address', 'designation', 'Actions'];
  reloadFlag = localStorage.getItem('reloadFlag');
  formattedDate = this.datePipe.transform(new Date(), 'dd/MMM/yyyy');

  public employeeFormGroup = this.fb.group({
    field_name: [],
    employee_name: [],
    'name': [],
    'age': [],
    'gender': [],
    'staff': [],
    'contact': [],
    'email': [],
    'address': [],
    'designation': [],
    '_id': [],
    '_rev': [],

  });



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
  printPage() {
    const printContentElement = document.getElementById('printContent');
    if (printContentElement) {
      const printContent = printContentElement.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContents;

    }
  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    localStorage.setItem('reloadFlag', "")
  }


}