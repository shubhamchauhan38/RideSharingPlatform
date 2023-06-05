import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7083/api'; // change this to your API URL

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/companies`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createApplication(applicationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/applications/new`, applicationData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPendingApplications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/applications`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { id: applicationId, status: status };
    return this.http.put<any>(`${this.apiUrl}/applications/approvereject`, body, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getApplicationById(applicationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/applications/${applicationId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}