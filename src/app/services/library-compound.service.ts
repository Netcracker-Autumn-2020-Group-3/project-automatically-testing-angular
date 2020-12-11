import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Compound} from '../model/compound.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryCompoundService {

  constructor(private http: HttpClient) {
  }

  // private url = 'https://automatically-testing-java.herokuapp.com/compounds';
  // private url = 'http://localhost:9003/compounds';
  private url = 'http://localhost:8081/compounds';

  getCompounds(): Observable<Compound[]> {
    const param = new HttpParams()
      .append('pageSize', '8')
      .append('page', '1')
      .append('sortField', 'id');
    return this.http.get<Compound[]>(this.url, {params: param});
  }

}
