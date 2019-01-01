import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakentryComponent } from './speakentry.component';

describe('SpeakentryComponent', () => {
  let component: SpeakentryComponent;
  let fixture: ComponentFixture<SpeakentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
