import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SllComponent } from './sll/sll.component';
import { BinaryHeapComponent } from './binary-heap/binary-heap.component';

const routes: Routes = [
  {path: 'simplelinkedlist', component: SllComponent},
  {path: 'binaryheap', component: BinaryHeapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
