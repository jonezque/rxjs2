import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Project } from '../types';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  constructor(private api: ApiService) {}
  projects$ = this.api.projects$;
  projects: Project[] = [];

  ngOnInit(): void {
    this.api.getProject().subscribe((result) => (this.projects = result));
  }
}
