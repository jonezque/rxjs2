import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  constructor(private api: ApiService, private router: ActivatedRoute) {}
  project$ = this.router.paramMap.pipe(
    map((x) => x.get('id')),
    switchMap((id) => this.api.getById(id))
  );
}
