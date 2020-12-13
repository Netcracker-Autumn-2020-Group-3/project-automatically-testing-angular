import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserDto } from '../users/users-list/user-dto';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = 'http://localhost:8080/';
  user:User;

  constructor(private http: HttpClient, private zone: NgZone) { }

  getAuthorization():Promise<User> {
  const url = 'http://localhost:8080/notification';
  return this.http.get<User>(url).toPromise();
  }

  getEventSource(url: string): EventSource {
      return new EventSource(url);
    }

    getServerSentEvent(url: string) {/*
    let dataList = [];
    let myData = 1;
      this.getAuthorization().subscribe(user => this.user = user);
      const eventUrl = url + this.user.id;
      const eventSource = this.getEventSource(eventUrl);
         eventSource.addEventListener(`message`, message => {
                      myData = JSON.parse(message.data);

                     dataList.push(myData);
                  });
                  return dataList;
*/
      /*
      return Observable.create(observer => {
        const eventSource = getEventSource(eventUrl);

        eventSource.onmessage = event => {
          this.zone.run(()=>{
            observer.next(event);
          });
        };
        eventSource.onerror = error => {
          this.zone.run(()=> {
            observer.error(error);
           });
        };
      });*/

    }


}
