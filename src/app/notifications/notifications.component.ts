import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { User } from '../model/user';
import { from } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  myData: any;
  dataList: any = [];
  user:User;
  url: string
 // storedNames: string ;



  constructor( private route: ActivatedRoute, private service: NotificationService) {

   this.getAuth();
   this.connect(this.getUrl());
   }

  getAuth(){
  this.service.getAuthorization().then(user => {
  this.user = user;
  });
  }
  getUrl(): string{
    return `http://localhost:8080/subscribe/`;
  }


  async ngOnInit(){
 // this.service.getServerSentEvent(`http://localhost:8080/subscribe/`);
 this.user = await this.service.getAuthorization().then(user => this.user = user);
  this.getAuth();


  }

  connect(url: string): void {
         let eventUrl = url;
         this.service.getAuthorization().then(user => {
         this.url = user.id.toString();
         eventUrl = `http://localhost:8080/subscribe/${this.url}` ;
                   const eventSource = this.service.getEventSource(eventUrl);
                      eventSource.addEventListener(`message`, message => {
                                   this.myData = message.data;
                                  this.dataList.push(this.myData);
                                  console.log(this.dataList);
                                   // localStorage.setItem("dataList", JSON.stringify(this.dataList));
                                   //this.storedNames = JSON.parse(localStorage.getItem("dataList")|| '{}')




                               });
         } );



  }

}
