import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Model } from "../models/event";

import {Organizer} from "../models/organizer";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {
  //Endpoint
  basePath1 = 'http://localhost:3000/api/organizers';
  basePath2 = 'http://localhost:3000/api/customers';
  basePath = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getAllEvents(): any {
    return this.http.get<Model.Event[]>(this.basePath);
  }

  // move to organizer and customer to organizer and customer service

  addOrganizer(item: any): Observable<Organizer> {
    return this.http.post<Organizer>(this.basePath1, JSON.stringify(item), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Get Organizer by Id
  getOrganizerById(id: number): Observable<Organizer> {
    return this.http.get<Organizer>(`${this.basePath1}/${id}`, this.httpOptions )
      .pipe(retry(1), catchError(this.handleError));
  }

  addCustomer(item: any): Observable<Customer> {
    return this.http.post<Customer>(this.basePath2, JSON.stringify(item), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.basePath2}/${id}`, this.httpOptions )
      .pipe(retry(1), catchError(this.handleError));
  }
}
