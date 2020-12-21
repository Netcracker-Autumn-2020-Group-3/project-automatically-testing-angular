import {Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
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
              private route: ActivatedRoute,
              private ngZone: NgZone) {
    setInterval(() => this.getAmount(), 1000);
  }

  ngOnInit(): void {
    this.name = this.tokenService.getUsername();
    this.getAuth();
    this.connect('');
    this.getAmount();

  }

  getAmount(){
  this.service.getAmountOfNotifications().subscribe(amount => {
      this.amountOfNotification = amount;
      }
      );
  }



  getAuth(){
  this.service.getAuthorization().then(user => {
  this.user = user;
  });
  }

  decreaseAmount() {
  this.ngZone.run( () => {
        this.amountOfNotification -= 1;
      });

  }

  connect(url: string): void {
         let eventUrl = url;
         this.service.getAuthorization().then(user => {
         this.url = user.id.toString();
         eventUrl = `${environment.url}subscribe/${this.url}` ;
         const eventSource = this.service.getEventSource(eventUrl);
         eventSource.addEventListener(`message`, message => {
                                  // this.amountOfNotification += 1;
                                  this.ngZone.run( () => {
                                           this.amountOfNotification += 1;
                                        });
                               });
         } );

  }

  logout() {
    this.tokenService.signOut();
    window.location.href = 'auth/login';
  }



}
