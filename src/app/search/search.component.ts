import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  debounceTime,
  filter,
  tap,
  switchMap,
  startWith,
  distinctUntilChanged,
} from 'rxjs';
import { ApiFakeService } from '../api-fake.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search = new FormControl('');
  form = new FormGroup({ search: this.search });
  loading$ = this.api.loading$;
  error$ = this.api.error$;
  projects$ = this.getProjects();

  getProjects() {
    return this.search.valueChanges.pipe(
      startWith(this.search.value),
      filter(Boolean),
      debounceTime(600),
      distinctUntilChanged(),
      tap((search) => console.log(search)),
      switchMap((search) => this.api.getProjects(search))
    );
  }

  constructor(private api: ApiFakeService) {}

  refresh() {
    this.api.reset();
    this.projects$ = this.getProjects();
  }
}
