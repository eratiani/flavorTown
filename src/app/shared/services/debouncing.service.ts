import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DebouncingService {
  private debounceSubject: Subject<string[]> = new Subject<string[]>();

  debounce(debounceTimeMs: number): Observable<string[]> {
    return this.debounceSubject.pipe(
      debounceTime(debounceTimeMs),
      distinctUntilChanged()
    );
  }

  updateValue(value: string[]): void {
    this.debounceSubject.next(value);
  }
}
