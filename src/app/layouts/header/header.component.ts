import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombreUsr: string

  private suscripcion = new Subscription();
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private srv: AuthService) {}

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.nombreUsr = usr.nombre+ ' ' + usr.apellido
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout(){
    this.srv.logout()
  }
}
