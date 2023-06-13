import { FormControl } from "@angular/forms";

export interface ILoginUser {
  loginUsername: FormControl<string|null>,
  loginPassword: FormControl<string|null>
}