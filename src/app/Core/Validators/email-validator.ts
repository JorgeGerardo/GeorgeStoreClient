import { Validators } from "@angular/forms";


export const EmailValidator = Validators.pattern(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
);