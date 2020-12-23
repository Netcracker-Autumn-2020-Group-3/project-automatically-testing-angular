import {Component, ElementRef, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { User } from '../model/user';
import {Notification} from '../model/notification';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  name = '';
  user: User;
  myData: any;
  dataList: any = [];
  url: string;
  amountOfNotification: number;
  isAdmin = this.tokenService.getAuthorities().find(role => role === 'ROLE_ADMIN') !== undefined;

  constructor(private tokenService: TokenStorageService,
              private service: NotificationService,
              private route: ActivatedRoute) {
    setInterval(() => this.getAmount(), 5000);
  }

  ngOnInit(): void {
    this.name = this.tokenService.getUsername();
    this.getAmount();

  }

  getAmount(){
  this.service.getAmountOfNotifications().subscribe(amount => {
      this.amountOfNotification = amount;
      }
      );
  }

  logout() {
    this.tokenService.signOut();
    window.location.href = 'auth/login';
  }



}
