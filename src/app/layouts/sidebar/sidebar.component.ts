import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  idrol: number

  private suscripcion = new Subscription();

  constructor(
    private srv: AuthService
    ) { }

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.idrol = usr.idrol
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}
