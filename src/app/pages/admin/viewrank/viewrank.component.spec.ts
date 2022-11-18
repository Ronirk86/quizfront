import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrankComponent } from './viewrank.component';

describe('ViewrankComponent', () => {
  let component: ViewrankComponent;
  let fixture: ComponentFixture<ViewrankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewrankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewrankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
