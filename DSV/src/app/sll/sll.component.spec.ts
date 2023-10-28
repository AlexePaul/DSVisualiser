import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SllComponent } from './sll.component';

describe('SllComponent', () => {
  let component: SllComponent;
  let fixture: ComponentFixture<SllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SllComponent]
    });
    fixture = TestBed.createComponent(SllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
