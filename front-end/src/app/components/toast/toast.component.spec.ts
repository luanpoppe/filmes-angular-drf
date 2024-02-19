import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdToastInline } from './toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

describe('ToastComponent', () => {
  let component: NgbdToastInline;
  let fixture: ComponentFixture<NgbdToastInline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbdToastInline, NgbdToastInline ],
      imports: [NgbToastModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgbdToastInline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
