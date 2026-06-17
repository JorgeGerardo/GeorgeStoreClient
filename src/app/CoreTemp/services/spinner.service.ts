import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerState$ = new BehaviorSubject<boolean>(false);

  Show(){
    this.spinnerState$.next(true);
  }

  Hide(){
    this.spinnerState$.next(false);
  }
}
