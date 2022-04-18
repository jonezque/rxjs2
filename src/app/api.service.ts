import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { Project } from './types';

const URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProject$() {
    return this.http
      .get<Project[]>(URL + 'projects')
      .pipe(shareReplay(1, 10000));
  }

  getById(id: string | null) {
    return this.http.get<Project>(URL + 'projects/' + id);
  }

  projects$ = this.http
    .get<Project[]>(URL + 'projects')
    .pipe(shareReplay(1, 10000));
}
