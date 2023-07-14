import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test7Component } from './test7.component';

describe('Test7Component', () => {
  let component: Test7Component;
  let fixture: ComponentFixture<Test7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
