import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import {Observable} from "rxjs";
import { ActivatedRoute , Router} from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { User } from '../model/user';
import { from } from 'rxjs';
import {TestCaseExecution} from "../model/testCaseExecution";
import {Notification} from "../model/notification";
import {MenuComponent} from "../menu/menu.component";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})



export class NotificationsComponent implements OnInit {
  @ViewChild(MenuComponent) menuComponent: MenuComponent;
  myData: any;
  user:User;
  url: string
 // storedNames: string ;
 notifications: Notification[] = [];
 notification: Notification;

 start: number;
   end: number;
   step: number = 5;
   searchedNotifications: any;



  constructor( private route: ActivatedRoute,
  private service: NotificationService, private router: Router,
  private ngZone: NgZone) {
  this.start = 0;
      this.end = this.step;

   }

   navigateToExecution(){
   //this.router.navigate(['/list/actions-execution/{{}}']);
    this.ngZone.run( () => {
      this.menuComponent.decreaseAmount();
    });
   }

  getAuth(){
  this.service.getAuthorization().then(user => {
  this.user = user;
  });
  }


  async ngOnInit(){
  this.getAuth();
  this.connect('');

  this.service.getNotificationPage().subscribe(data => {
  this.notifications = data;
    });
  }



   connect(url: string): void {
          let eventUrl = url;
          this.service.getAuthorization().then(user => {
          this.url = user.id.toString();
          eventUrl = `${environment.url}subscribe/${this.url}` ;
                    const eventSource = this.service.getEventSource(eventUrl);
                       eventSource.addEventListener(`message`, message => {
                                    this.myData = JSON.parse(message.data);
                                   this.notifications.push(this.myData);
                                });
          } );

   }

   previousPage() {
       if(this.start != 0) {
         this.start = this.start - this.step;
         this.end = this.end - this.step;
       }
     }
     nextPage() {
       if(this.end <= this.notifications.length - 1) {
         this.start = this.start + this.step;
         this.end = this.end + this.step;
       }
     }

}
