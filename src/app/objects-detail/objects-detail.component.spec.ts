import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsDetailComponent } from './objects-detail.component';

describe('ObjectsDetailComponent', () => {
  let component: ObjectsDetailComponent;
  let fixture: ComponentFixture<ObjectsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
