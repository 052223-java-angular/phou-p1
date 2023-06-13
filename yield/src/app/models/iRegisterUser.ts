import { FormControl } from "@angular/forms";

export interface IRegisterUser {
  username: FormControl<string|null>,
  password: FormControl<string|null>,
  confirmPassword: FormControl<string|null>
}