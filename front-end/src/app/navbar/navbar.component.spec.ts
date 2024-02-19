import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ter o nome da empresa', () => {
    const navbar = fixture.nativeElement as HTMLElement
    const nomeEmpresa = navbar.querySelector(".navbar-brand h1")
    expect(nomeEmpresa?.textContent).toBe("Filmes - Solos");
  });
});
