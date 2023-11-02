import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SllComponent } from './sll/sll.component';
import { BinaryHeapComponent } from './binary-heap/binary-heap.component';
import { HomeComponent } from './home/home.component';
import { BstComponent } from './bst/bst.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'simplelinkedlist', component: SllComponent},
  {path: 'binaryheap', component: BinaryHeapComponent},
  {path: 'binarysearchtree', component: BstComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
