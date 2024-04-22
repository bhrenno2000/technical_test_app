import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { ContentListComponent } from '../_components/content-list/content-list.component';
import { HeaderComponent } from '../_components/header/header.component';
import { ProgramsListComponent } from '../_components/programs-list/programs-list.component';
import { TrainingListComponent } from '../_components/training-list/training-list.component';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

  ],
  declarations: [HomePage,
    HeaderComponent,
    ContentListComponent,
    ProgramsListComponent,
    TrainingListComponent
  ]
})
export class HomePageModule { }
