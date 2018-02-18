import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesDetailComponent } from './statuses-detail.component';

describe('StatusesDetailComponent', () => {
  let component: StatusesDetailComponent;
  let fixture: ComponentFixture<StatusesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
