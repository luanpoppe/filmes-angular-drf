import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../shared/data-service.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  localIsLoggedIn!: any;
  userId!: any;

  constructor(private service: DataService, private router: Router) {}

  ngOnInit(): void {
    // O código abaixo é executado a cada troca de rota. Isso é para eu checar se o usuário está logado ou não
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Aqui é onde eu checo de fato se o usuário está logado e retorno seu id
        this.localIsLoggedIn = this.service.isUserLoggedIn();
        this.userId = this.service.getUserId();
      }
    });
  }

  onLogout() {
    console.log('user sai da conta');
    localStorage.removeItem('userId');
    location.reload();
  }
}
