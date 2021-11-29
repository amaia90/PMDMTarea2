import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NoticiaComponent,
    NoticiasComponent,
    ExploreContainerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoticiasComponent,
    ExploreContainerComponent
  ]
})
export class ComponentsModule { }
