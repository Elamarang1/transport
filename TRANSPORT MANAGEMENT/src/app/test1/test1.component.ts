import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Test1Component',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css'],
  providers: [DatePipe],
})
export class Test1Component implements OnInit {

  Email: any;
  balref: any;
  rowData: any[] = [];
  displayedColumns: string[] = ['field_name', 'bus_type', 'seats', 'departure-time', 'arrival-time', 'kilometers', 'fare', 'Actions'];
  reloadFlag = localStorage.getItem('reloadFlag');
  formattedDate = this.datePipe.transform(new Date(), 'dd/MMM/yyyy');
ngonInit(): void{

}
  public employeeFormGroup = this.fb.group({
    field_name: new FormControl("", [Validators.required,
      Validators.pattern("[a-zA-Z].*")]),
    employee_name: [],
    'bus_type': ["Sleeper"],
    'seats': new FormControl("", Validators.required),
    kilometers: new FormControl(null, Validators.required),
    'fare': [new FormControl<number | null>({ value: null, disabled: true })],
    'departure-time': [],
    'arrival-time': [],
    '_id': [],
    '_rev': [],
  });

  registersubmited(){
    console.log(this.employeeFormGroup.get("field_name"));
    console.log(this.employeeFormGroup.get("seats"));
    console.log(this.employeeFormGroup.get("kilometers"));

  }

  get BusName():FormControl{
    return this.employeeFormGroup.get("field_name")as FormControl;
  }

  get Seats():FormControl{
    return this.employeeFormGroup.get("seats")as FormControl;
  }
  
  get Kilometers():FormControl{
    return this.employeeFormGroup.get("kilometers")as FormControl;
  }

  constructor(private fb: FormBuilder, public service: ServiceService, private datePipe: DatePipe, private router: Router) { }

  






  calculateFare(): number {
    const kilometers = this.employeeFormGroup.get('kilometers')?.value;
    const fare = kilometers ? (kilometers as number) * 0.1 : null;
    this.employeeFormGroup.patchValue({ fare: fare ?? null });
    return fare || 0;
  }

  saveAction() {
    if (this.employeeFormGroup.valid) {
      let employeeObject: any = this.employeeFormGroup.value;
      console.log(employeeObject);

      employeeObject['object_name'] = 'elamaran_name'

      if (employeeObject['_id'] == null) {
        delete employeeObject['_id']
      }
      if (employeeObject['_rev'] == null) {
        delete employeeObject['_rev']
      }

      let bulkDocsArray = [];
      bulkDocsArray.push(employeeObject);
      this.service.updateDocument(bulkDocsArray);
    } else {
      alert("Some of the fields are not valid")
    }
    this.onEdit('item');
  }

  fetchAction() {
    this.service.searchDocument('object_name:elamaran_name')
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
      Swal.fire('Unauthorized User', '', 'warning');
      this.router.navigateByUrl('/');
    }
    this.fetchAction();
    this.Email = localStorage.getItem('email'); //Get user Mail id from Login page using user service
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
    localStorage.setItem('reloadFlag', '');
  }
}
