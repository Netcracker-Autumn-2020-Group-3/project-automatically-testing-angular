import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Compound} from '../model/compound.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditCompoundService {

  private editCompoundUrl = '';

  constructor(private http: HttpClient) { }

  getCompoundById(){
    this.http.get<Compound>(this.editCompoundUrl);
  }
}
