import { ServiceService } from '../service.service';
import { JsonService } from '../JSONSERVICE/jsonservice.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test9',
  templateUrl: './test9.component.html',
  styleUrls: ['./test9.component.css']
})
export class Test9Component implements OnInit {
  salaryId!: number;
  editSalaryData: any;

  constructor(
    private route: ActivatedRoute,
    private salaryService: JsonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.salaryId = +params['id'];
      this.getSalaryData();
    });
  }

  getSalaryData() {
    this.salaryService.getSalaryById(this.salaryId).subscribe(data => {
      this.editSalaryData = data;
    });
  }

  updateSalary() {
    const updatedSalary = {
      id: this.editSalaryData.id,
      name: this.editSalaryData.name,
      basicSalary: this.editSalaryData.basicSalary,
      allowance: this.editSalaryData.allowance,
      totalSalary: this.editSalaryData.basicSalary + this.editSalaryData.allowance
    };

    this.salaryService.updateSalaryData(updatedSalary).subscribe(() => {
      this.router.navigate(['/test10']);
    });
  }

  cancelEdit() {
    this.router.navigate(['/test10']);
  }
}