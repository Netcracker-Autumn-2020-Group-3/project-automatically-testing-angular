import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Compound} from '../model/compound.model';
import {CompoundAction} from '../model/compoundAction';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  private checkCompoundNameUrl = 'http://localhost:8080/compound/create/check/';
  private createCompoundUrl = 'http://localhost:8080/compound/create';
  private createCompoundActionsUrl = 'http://localhost:8080/compound/create/actions';

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
