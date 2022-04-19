import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Project } from '../types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor(private api: ApiService) {}
 // projects$ = this.api.projects$;

  projects: Project[] = [];

  ngOnInit(): void {
    this.api.getProject().subscribe((result) => (this.projects = result));
  }
}
