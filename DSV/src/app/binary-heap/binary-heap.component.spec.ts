import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryHeapComponent } from './binary-heap.component';

describe('BinaryHeapComponent', () => {
  let component: BinaryHeapComponent;
  let fixture: ComponentFixture<BinaryHeapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryHeapComponent]
    });
    fixture = TestBed.createComponent(BinaryHeapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
