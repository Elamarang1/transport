import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test9Component } from './test9.component';

describe('Test9Component', () => {
  let component: Test9Component;
  let fixture: ComponentFixture<Test9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
