import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  name = '';


  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.name = this.tokenService.getUsername();
  }

  logout() {
    this.tokenService.signOut();
    window.location.href = 'auth/login';
  }

}
