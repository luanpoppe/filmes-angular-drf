import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInvalidComponent } from './input-invalid.component';

describe('InputInvalidComponent', () => {
  let component: InputInvalidComponent;
  let fixture: ComponentFixture<InputInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInvalidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
