import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SllComponent } from './simple-linked-list/sll.component';
import { BinaryHeapComponent } from './binary-heap/binary-heap.component';
import { HomeComponent } from './home/home.component';
import { BstComponent } from './binary-search-tree/bst.component';
import { HashTableComponent } from './hash-table/hash-table.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'simplelinkedlist', component: SllComponent},
  {path: 'binaryheap', component: BinaryHeapComponent},
  {path: 'binarysearchtree', component: BstComponent},
  {path: 'hashtable', component:HashTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
