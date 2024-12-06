import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { BlackjackComponent } from './blackjack/blackjack.component';


export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blackjack', component: BlackjackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
