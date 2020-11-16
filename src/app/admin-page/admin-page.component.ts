import { Component, OnInit } from '@angular/core';
import {AdminService} from '../adminservice.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  message = '';

  constructor(private adminServ: AdminService) { }

  ngOnInit(): void {
    this.adminServ.adminPage().subscribe((result: any) =>
    {
      this.message = result.content;
    });
  }

}
