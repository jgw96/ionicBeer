import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class BeerService {

  constructor(private http: Http) { }

  getBeerList(): Observable<any> {
    return this.http.get('https://crossorigin.me/http://api.brewerydb.com/v2/beers?ibu=10,100&key=c0b90d19385d7dabee991e89c24ea711')
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchBeers(searchTerm: string): Observable<any> {
    return this.http.get(`https://crossorigin.me/http://api.brewerydb.com/v2/search?q=${searchTerm}&type=beer&key=c0b90d19385d7dabee991e89c24ea711`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getLocalBeer(position): Observable<any> {
    return this.http.get(`https://crossorigin.me/http://api.brewerydb.com/v2/search/geo/point?lat=${position.coords.latitude}&lng=${position.coords.longitude}&radius=15&key=c0b90d19385d7dabee991e89c24ea711`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
