import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  mergeMap,
  Observable,
  of,
  retry,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { Project } from './types';

const data = [
  {
    id: '737789bd-1219-4655-bfa6-4b7ae90f81df',
    name: 'Zentility',
  },
  {
    id: 'c942feec-925b-439a-aa8c-e05515a28969',
    name: 'Insectus',
  },
  {
    id: '2e931e68-bffa-4a27-8d8c-e6f07bf64ccb',
    name: 'Atgen',
  },
  {
    id: 'db3d9c8b-d1dd-4d87-91e4-95a6add5d0ce',
    name: 'Anivet',
  },
  {
    id: 'c2913d61-6a88-4484-9358-9fffee7b5cf8',
    name: 'Rugstars',
  },
  {
    id: '50c7b564-0e4b-4682-88a1-bf082b028101',
    name: 'Zentix',
  },
  {
    id: '5a9a71f0-40c5-4dcf-8274-0aa8b4cd29f8',
    name: 'Pathways',
  },
];

const CACHE_TIME = 1000 * 60 * 5;

@Injectable({
  providedIn: 'root',
})
export class ApiFakeService {
  loading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject('');
  private map: Map<string, Observable<Project[]>> = new Map();
  constructor() {}

  private fetchData(search: string) {
    return of(data.filter((x) => x.name.includes(search))).pipe(
      tap(() => console.log('requesting...')),
      delay(3000),
      mergeMap((val) => {
        //throw error for demonstration
        if (Math.random() > 0.9) {
          return throwError(() => new Error('some error!'));
        }
        return of(val);
      }),
      tap((data) => console.log('returns', data))
    );
  }

  getProjects(search: string) {
    const obs$ =
      this.map.get(search) ??
      this.fetchData(search).pipe(
        retry(3),
        catchError((e) => {
          console.log('get error', e.message);
          this.error$.next(e.message);
          this.loading$.next(false);
          return [];
        }),
        shareReplay(1, CACHE_TIME)
      );

    this.map.set(search, obs$);
    this.loading$.next(true);
    this.error$.next('');
    return obs$.pipe(
      tap(() => {
        this.error$.next('');
        this.loading$.next(false);
      })
    );
  }

  reset() {
    this.map.clear();
  }
}
