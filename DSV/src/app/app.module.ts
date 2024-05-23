import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { SllComponent } from './simple-linked-list/sll.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BinaryHeapComponent } from './binary-heap/binary-heap.component';
import { HomeComponent } from './home/home.component';
import { BstComponent } from './binary-search-tree/bst.component';
import { HashTableComponent } from './hash-table/hash-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SllComponent,
    BinaryHeapComponent,
    HomeComponent,
    BstComponent,
    HashTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
