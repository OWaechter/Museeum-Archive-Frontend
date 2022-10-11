import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSearchComponent } from './object-search.component';

describe('ObjectSearchComponent', () => {
  let component: ObjectSearchComponent;
  let fixture: ComponentFixture<ObjectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
