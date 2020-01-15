import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTabPage } from './setupTab.page';
import { HttpClientModule } from '@angular/common/http';
import { AdminGlobals } from '../admin/admin-globals';

describe('SetupTabPage', () => {
  let component: SetupTabPage;
  let fixture: ComponentFixture<SetupTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[AdminGlobals],
      declarations: [SetupTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
