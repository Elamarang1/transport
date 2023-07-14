import { Component, OnInit } from '@angular/core';
import { JsonService } from '../JSONSERVICE/jsonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test10',
  templateUrl: './test10.component.html',
  styleUrls: ['./test10.component.css']
})
export class Test10Component implements OnInit {
  name!: string;
  basicSalary!: number;
  allowance!: number;
  salaryData!: any[];



  searchTerm!: string;
  filteredSalaryData!: any[];

  displayedColumns: string[] = ['name', 'basicSalary', 'allowance', 'totalSalary', 'actions'];
  isEditFormOpen: boolean = false;
  editSalaryData: any;

  constructor(private salaryService: JsonService, public router: Router) { }

  calculateSalary() {
    const totalSalary = this.basicSalary + this.allowance;
    const newSalary = {
      name: this.name,
      basicSalary: this.basicSalary,
      allowance: this.allowance,
      totalSalary: totalSalary
    };

    this.salaryService.addSalaryData(newSalary).subscribe(() => {
      this.getSalaryData();
    });
  }

  getSalaryData() {
    this.salaryService.getSalaryData().subscribe(data => {
      this.salaryData = data;
    });
  }

  deleteSalary(salary: any) {
    const salaryId = salary.id;
    this.salaryService.deleteSalaryData(salaryId).subscribe(() => {
      this.getSalaryData();
    });
  }

  printSalary(salary: any) {
    // Perform print action
    this.printBill(salary);
  }

  private printBill(salary: any) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Salary Bill</title>
            <style>
              /* Add your custom styling for the bill here */
            </style>
          </head>
          <body>
            <h1>Salary Bill</h1>
            <p>Name: ${salary.name}</p>
            <p>Basic Salary: ${salary.basicSalary}</p>
            <p>Allowance: ${salary.allowance}</p>
            <p>Total Salary: ${salary.totalSalary}</p>
          </body>
        </html>
      `);
      printWindow.document.close()
      printWindow.print();

    }
  }

  editSalary(salaryId: number) {
    this.router.navigate(['/test9', salaryId]);
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
      this.getSalaryData();
      this.isEditFormOpen = false;
    });
  }

  cancelEdit() {
    this.isEditFormOpen = false;
  }



  applySearch() {
    if (this.searchTerm) {
      this.filteredSalaryData = this.salaryData.filter(salary =>
        salary.name.toString().includes(this.searchTerm) ||
        salary.basicSalary.toString().includes(this.searchTerm) ||
        salary.allowance.toString().includes(this.searchTerm) ||
        salary.totalSalary.toString().includes(this.searchTerm)
      );
    } else {
      this.filteredSalaryData = this.salaryData;
    }

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





  ngOnInit() {
    this.getSalaryData();
  }


  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    localStorage.setItem('reloadFlag', "")
  }

}



