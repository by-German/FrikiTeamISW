import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {EventsTypeService} from "../../../services/event/events-type.service";

@Component({
  selector: 'app-optional-information',
  templateUrl: './optional-information.component.html',
  styleUrls: ['./optional-information.component.css']
})
export class OptionalInformationComponent implements OnInit {
  form = new FormGroup({
    website: new FormControl(''),
    tag: new FormControl('')
  })

  eventId : number = -1;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private tagService: EventsTypeService) {
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params.id
  }


  onSubmit() {
    if (this.form.value.tag.length != 0) {
      this.tagService.createTag(this.form.value.tag)
        .subscribe((value: any) => {
          this.tagService.assignTagToEvent(this.eventId, value.id)
            .subscribe((res : any) => {
              console.log(res)
          })
        })
    }
  }

}
