import { Validators } from "@angular/forms";


export const EmailValidator = Validators.pattern(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);