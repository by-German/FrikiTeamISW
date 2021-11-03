import { Injectable } from '@angular/core';
import { BASE_PATH } from "../common/http.common";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventCommentsService {

  constructor(private http: HttpClient) { }

  createComment(eventId: number, userId: number, item: any) {
    return this.http.post(`${BASE_PATH}/events/${eventId}/comments`, item)
  }

  getCommentsByEventId(eventId: number) {
    return this.http.get(`${BASE_PATH}/events/${eventId}/comments`)
  }

}
