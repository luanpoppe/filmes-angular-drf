import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('Layout do NavbarComponent - Antes do Login', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbar: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navbar = fixture.nativeElement as HTMLElement
  });

  it('deve ter o nome da empresa', () => {
    const nomeEmpresa = navbar.querySelector(".navbar-brand h1") as HTMLElement
    expect(nomeEmpresa?.textContent).toBe("Filmes - Solos");
  });

  it("imagem correta deve estar no src da <img>", () => {
    const img = navbar.querySelector(".navbar-brand img") as HTMLImageElement
    expect(img.src).toBe("https://solosbrasil.com/wp-content/uploads/2021/05/logo-do-site.svg")
  })

  it("deve ter 2 submenus", () => {
    const div = navbar.querySelectorAll("#navbarSupportedContent ul li") as HTMLElement[]
    expect(div.length).toBe(2)
  })

  it("deve ter os nomes dos submenus corretos", () => {
    const div = navbar.querySelectorAll("#navbarSupportedContent ul li") as HTMLElement[]
    expect(div[0].textContent).toBe("Home")
    expect(div[1].textContent).toBe("Login")
  })
});

// describe('Layout do NavbarComponent - Após o Login', () => {
//   let component: NavbarComponent;
//   let fixture: ComponentFixture<NavbarComponent>;
//   let navbar: any

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ NavbarComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(NavbarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     navbar = fixture.nativeElement as HTMLElement
//   });
// })