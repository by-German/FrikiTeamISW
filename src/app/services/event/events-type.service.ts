import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_PATH} from "../common/http.common";

@Injectable({
  providedIn: 'root'
})
export class EventsTypeService {

  constructor(private http: HttpClient) { }

  createTag(name: string) {
    return this.http.post(`${BASE_PATH}/type-events`, { name: name })
  }

  assignTagToEvent(eventId: number, tagId: number) {
    return this.http.put(`${BASE_PATH}/type-events/${tagId}/events/${eventId}`, {});
  }

  getTagById(id: number) {
    return this.http.get(`${BASE_PATH}/event-types/${id}`)
  }

  getAllTags() {
    return this.http.get(`${BASE_PATH}/event-types`)
  }

}
