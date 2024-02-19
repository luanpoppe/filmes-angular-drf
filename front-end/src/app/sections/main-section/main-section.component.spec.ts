import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainSectionComponent } from './main-section.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('Layout - Antes do Login', () => {
  let component: MainSectionComponent;
  let fixture: ComponentFixture<MainSectionComponent>;
  let mainSection: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSectionComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mainSection = fixture.nativeElement as HTMLElement
  });

  it('deve ter a quantidade correta de itens h3', () => {
    const listaDeH3 = mainSection.querySelectorAll("main .initial-features h3 ul li") as HTMLElement[]
    expect(listaDeH3.length).toBe(3);
    expect(listaDeH3[0].textContent).toBe("Crie uma lista de filmes para assistir.")
    expect(listaDeH3[1].textContent).toBe("Adicione notas a filmes.")
    expect(listaDeH3[2].textContent).toBe("Leia e poste comentários sobre os filmes.")
  });

  it('deve ter os nomes corretos nos itens h3', () => {
    const listaDeH3 = mainSection.querySelectorAll("main .initial-features h3 ul li") as HTMLElement[]
    expect(listaDeH3[0].textContent).toBe("Crie uma lista de filmes para assistir.")
    expect(listaDeH3[1].textContent).toBe("Adicione notas a filmes.")
    expect(listaDeH3[2].textContent).toBe("Leia e poste comentários sobre os filmes.")
  });

  it('deve ir para rota correta ao clicar em quero me cadastrar', () => {
    const listaDeH3 = mainSection.querySelector("main a.button-signup") as HTMLAnchorElement
    listaDeH3.click()
    listaDeH3.dispatchEvent(new Event("click"))
    fixture.detectChanges()
    const activeRoute = TestBed.inject(ActivatedRoute)
    expect(activeRoute.snapshot.params).toBe("/")
    // expect(listaDeH3.href).toBe("/cadastro")
  });

  it('deve ter o texto correto no botão', () => {
    const listaDeH3 = mainSection.querySelector("main a.button-signup button") as HTMLElement
    expect(listaDeH3.textContent).toBe("Se cadastre agora mesmo!")
  });
});

// describe('Layout - Após o Login', () => {
//   let component: MainSectionComponent;
//   let fixture: ComponentFixture<MainSectionComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ MainSectionComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MainSectionComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
