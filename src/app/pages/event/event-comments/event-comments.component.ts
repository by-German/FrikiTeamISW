import {Component, Input, OnInit} from '@angular/core';
import {EventCommentsService} from "../../../services/event/event-comments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-event-comments',
  templateUrl: './event-comments.component.html',
  styleUrls: ['./event-comments.component.css']
})
export class EventCommentsComponent implements OnInit {
  showComments: boolean = false
  eventId: any
  modeEdit: Boolean = false
  user : any
  comments: any[] = []
  rev_comments: any[] = []
  form : FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  })
  constructor(private router: Router,
              private route: ActivatedRoute,
              private eventCommentsService: EventCommentsService,
              private authService: AuthService,
              private storage: TokenStorageService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.eventId = this.route.parent.snapshot.paramMap.get('id')
    this.modeEdit = this.route.snapshot.queryParams["mode_edit"]
    this.user = this.storage.getAuthUser()
    this.getComments(this.eventId)
  }

  getComments(eventId: number) {
    this.eventCommentsService.getCommentsByEventId(eventId).subscribe(
      (result: any) => {
        this.comments = result.content
        this.rev_comments = this.comments
        this.rev_comments.reverse()
      }
    )
  }

  onSubmit() {
    var id = this.user.id
    this.eventCommentsService.createComment(this.eventId, id, this.form.value).subscribe(
      (result: any) => {
        console.log(result)
        this.getComments(this.eventId)
      }
    )
  }
}
