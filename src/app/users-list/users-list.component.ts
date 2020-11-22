import {Component, OnInit} from '@angular/core';
import {UserNew} from './user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: UserNew[] = [];
  search = {
    name: '', surname: '', userId: '', role: '', email: '', enabled: '', sortField: ''
  };
  page = 1;
  numberOfPages = 1;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.countPages().subscribe(data => {
      this.numberOfPages = data;
    }, error => {
      console.log(error);
    });
    this.onSearchSubmit();
  }

  getParams() {
    let params = new HttpParams().append('page', this.page.toString(10));
    Object.entries(this.search).forEach(([key, value]) => {
      if (value != null && value !== '') {
        params = params.append(key, value);
      }
    });
    return params;
  }

  onSelect(user: UserNew) {
    console.log(user);
    // TODO route to edit page
  }

  onSearchSubmit() {
    this.page = 1;
    this.userService.getPage(this.getParams()).subscribe(data => {
      this.users = data.map(user => {
        user.role = user.role.toLocaleLowerCase().replace('role_', '');
        user.enabled = user.enabled ? 'yes' : 'no';
        return user;
      });
    }, error => {
      console.log(error);
    });
  }

  onNextPage() {
    if (this.page !== this.numberOfPages) {
      this.page += 1;
      this.userService.getPage(this.getParams()).subscribe(data => {
        this.users = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onPreviousPage() {
    if (this.page !== 1) {
      this.page -= 1;
      this.userService.getPage(this.getParams()).subscribe(data => {
        this.users = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onFirstPage() {
    this.page = 1;
    this.userService.getPage(this.getParams()).subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    });
  }

  onLastPage() {
    this.page = this.numberOfPages;
    this.userService.getPage(this.getParams()).subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    });
  }


}
