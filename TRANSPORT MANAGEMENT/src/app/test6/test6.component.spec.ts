import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test6Component } from './test6.component';

describe('Test6Component', () => {
  let component: Test6Component;
  let fixture: ComponentFixture<Test6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
