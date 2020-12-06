import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Compound} from '../model/compound.model';
import {CompoundAction} from '../model/compoundAction';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  //private url = 'https://automatically-testing-java.herokuapp.com/';
  private url = 'http://localhost:8080/';
  private checkCompoundNameUrl = this.url + 'compounds/create/check/';
  private createCompoundUrl = this.url + 'compounds/create';
  private createCompoundActionsUrl = this.url + 'compounds/create/actions';
  private compoundUrlEditGet = this.url + 'compounds/edit/';
  private getCompoundActionsByIdUrl = this.url + 'compounds/get/actions/';



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

  getCompound(compoundId: number){
    return this.http.get<Compound>(this.compoundUrlEditGet + String(compoundId));
  }
  /*getCompoundActions(compoundId: number){
    return this.http.get<Compound>(this.getCompoundActionsByIdUrl + String(compoundId));

  }*/

  updateCompound(compound: Compound) {
    return this.http.put<string>(this.compoundUrlEditGet + String(compound.id), compound);
  }
}
