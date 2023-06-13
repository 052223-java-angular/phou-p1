import { FormControl } from "@angular/forms";

export interface ILoginUser {
  username: FormControl<string|null>,
  password: FormControl<string|null>
}