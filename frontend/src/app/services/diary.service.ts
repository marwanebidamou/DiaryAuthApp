import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedDiariesResponseDTO } from '../models/diary.dtos';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  http = inject(HttpClient);
  constructor() { }

  getDiaries(page: number, limit: number, query: string): Observable<PaginatedDiariesResponseDTO> {
    return this.http.get<PaginatedDiariesResponseDTO>(`${environment.apiUrl}/diary`, {
      params: {
        page: page || 1,
        limit: limit || 10,
        query: query
      }
    });
  }
}
