import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { DiaryService } from '../../services/diary.service';
import { PaginatedDiariesResponseDTO } from '../../models/diary.dtos';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-diaries',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardActions, MatCardSubtitle, MatCardContent, MatButton, MatProgressSpinnerModule],
  templateUrl: './diaries.component.html',
  styleUrl: './diaries.component.css'
})
export class DiariesComponent {
  service = inject(DiaryService);
  list = signal<PaginatedDiariesResponseDTO | undefined>(undefined);
  isLoading = signal(true);

  ngOnInit(): void {
    this.fetchDiaries(1, 10, '');
  }

  fetchDiaries(page: number, limit: number, q: string) {
    this.isLoading.set(true);
    this.service.getDiaries(page, limit, q).subscribe({
      next: (response) => {
        this.list.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to fetch diaries:', err);
        this.isLoading.set(false);
      },
    });
  }

}
