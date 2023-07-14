import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService  {
  private apiUrl = 'http://localhost:3000/salaryData';

  constructor(private http: HttpClient) { }

  getSalaryData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSalaryById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addSalaryData(salary: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, salary);
  }

  deleteSalaryData(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  updateSalaryData(salary: any): Observable<any> {
    const url = `${this.apiUrl}/${salary.id}`;
    return this.http.put<any>(url, salary);
  }
}