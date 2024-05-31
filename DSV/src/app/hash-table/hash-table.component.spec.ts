import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashTableComponent } from './hash-table.component';

describe('HashTableComponent', () => {
  let component: HashTableComponent;
  let fixture: ComponentFixture<HashTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HashTableComponent]
    });
    fixture = TestBed.createComponent(HashTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
