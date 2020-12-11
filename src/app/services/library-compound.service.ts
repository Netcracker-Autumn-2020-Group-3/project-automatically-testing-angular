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
  private url = 'http://localhost:8080/compounds';

  getCompounds(page: number, pageSize: number, search: string, sort: string): Observable<Compound[]> {
    const param = new HttpParams()
      .append('pageSize', '' + pageSize)
      .append('page', '' + page)
      .append('sortField', sort);
    return this.http.get<Compound[]>(this.url, {params: param});
  }

  getQuantityCompounds(): Observable<number> {
    return this.http.get<number>(`${this.url}/quantity`);
  }

}
