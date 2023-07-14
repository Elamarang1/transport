import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component implements OnInit {

  constructor(private router: Router) { }

  email: any = "";
  password: any = "";

  submitForm(form: any): void {
    if (this.email === "" && this.password === "") {
      Swal.fire('Please fill all the fields', '', 'warning')
    } else if (this.email === "elamaran6543@gmail.com" && this.password === "elamaran") {
      localStorage.setItem('email', this.email);
      const myInteger = 0;
      localStorage.setItem('counter', myInteger.toString());
      this.router.navigateByUrl('/Homepage');
      Swal.fire('Login Successfully', '', 'success')
    } else {
      Swal.fire('Invalid User', '', 'warning')
    }
  }
  notyet() {
    Swal.fire('This service not available now : (', '', 'error')
  }
  ngOnInit(): void {
    if (localStorage.getItem('email') !== null) {
      this.router.navigateByUrl('/Homepage');
    }
  }
}



