import { Component, OnInit, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { ApiService, CodeReviewRequest, CodeReviewResponse } from './services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← IMPORT FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet],
  imports: [CommonModule, FormsModule], // ← ADD TO IMPORTS
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  
  title = 'Code Review App'; //protected readonly title = signal('my-angular-prototype-app');
  code: string = '';
  language: string = 'java';
  reviewResult: CodeReviewResponse | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //this.loadUsers();
  }

  /*loadUsers() {
    this.dataService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error('Error loading users:', error)
    });
  }*/

  onSubmit(): void {
    if (!this.code.trim()) {
      this.error = 'Please enter some code to review';
      return;
    }

    this.loading = true;
    this.error = '';
    this.reviewResult = null;

    const request: CodeReviewRequest = {
      code: this.code,
      language: this.language
    };

    this.apiService.submitCodeReview(request).subscribe({
      next: (response) => {
        this.reviewResult = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to submit code for review: ' + err.message;
        this.loading = false;
      }
    });
  }

  onLanguageChange(language: string): void {
    this.language = language;
  }
}

