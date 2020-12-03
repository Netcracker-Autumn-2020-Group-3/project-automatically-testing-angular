import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Compound} from '../model/compound.model';
import {CompoundAction} from '../model/compoundAction';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  private url = 'https://automatically-testing-java.herokuapp.com/';
  private checkCompoundNameUrl = this.url + 'compounds/create/check/';
  private createCompoundUrl = this.url + 'compounds/create';
  private createCompoundActionsUrl = this.url + 'compounds/create/actions';

  constructor(private http: HttpClient) { }

  checkIfCompoundNameExist(name: string){
    return this.http.get<boolean>(this.checkCompoundNameUrl + String(name));
  }

  createCompound(compound: Compound){
    return this.http.post<number>(this.createCompoundUrl, compound);
  }

  createCompoundActions(compoundActionPriority: CompoundAction[]) {

    return this.http.put<string>(this.createCompoundActionsUrl, compoundActionPriority);
  }
}
