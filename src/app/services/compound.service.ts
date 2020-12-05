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
  private getCompoundByIdUrl = this.url + 'compounds/get/';
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
    console.log('csdcscdsersdc');
    return this.http.get<Compound>(this.getCompoundByIdUrl + String(compoundId));
  }
  getCompoundActions(compoundId: number){
    return this.http.get<Compound>(this.getCompoundActionsByIdUrl + String(compoundId));

  }

}
