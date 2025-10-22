import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CodeReviewRequest {
  code: string;
  language: string;
}

export interface CodeReviewResponse {
  issues: CodeIssue[];
  summary: string;
}

export interface CodeIssue {
  line: number;
  severity: string;
  message: string;
  suggestion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitCodeReview(request: CodeReviewRequest): Observable<CodeReviewResponse> {
    return this.http.post<CodeReviewResponse>(`${this.baseUrl}/code-review`, request);
  }

  getReviewHistory(): Observable<CodeReviewResponse[]> {
    return this.http.get<CodeReviewResponse[]>(`${this.baseUrl}/code-review/history`);
  }

  // GET request
  /*getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // GET with params
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // POST request
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  // PUT request
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  // DELETE request
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }*/

  // Add authentication methods if your backend requires it
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });
    return this.http.get(`${this.baseUrl}/user/login`, { headers });
  }
}

