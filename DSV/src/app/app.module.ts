import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { SllComponent } from './sll/sll.component';
import { FormsModule } from '@angular/forms';
import { BinaryHeapComponent } from './binary-heap/binary-heap.component';

@NgModule({
  declarations: [
    AppComponent,
    SllComponent,
    BinaryHeapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
