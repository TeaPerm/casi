import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmLabelModule } from '@spartan-ng/ui-label-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LogoComponent,
    HeaderComponent,
    HlmButtonModule,
    HlmInputModule,
    HlmLabelModule,
    HlmFormFieldModule,
    RouterLink,
  ],
  exports: [
    LogoComponent,
    HeaderComponent,
    HlmButtonModule,
    HlmInputModule,
    HlmLabelModule,
    HlmFormFieldModule,
    RouterLink,
  ]
})
export class SharedModule { }
