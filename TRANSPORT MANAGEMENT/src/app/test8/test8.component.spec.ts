import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test8Component } from './test8.component';

describe('Test8Component', () => {
  let component: Test8Component;
  let fixture: ComponentFixture<Test8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
