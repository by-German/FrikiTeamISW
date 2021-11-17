import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {EventsTypeService} from "../../../services/event/events-type.service";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-optional-information',
  templateUrl: './optional-information.component.html',
  styleUrls: ['./optional-information.component.css']
})
export class OptionalInformationComponent implements OnInit {
  form = new FormGroup({
    website: new FormControl(''),
  })

  tagControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<any[]> | undefined;


  eventId : number = -1;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private tagService: EventsTypeService) {
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params.id

    this.tagService.getAllTags()
      .subscribe((res: any) => this.options = res.content);

    this.filteredOptions = this.tagControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }


  onSubmit() {
    // if (this.tagControl.)
    console.log(this.tagControl.value)
    if (typeof this.tagControl.value === 'string') {
      this.tagService.createTag(this.tagControl.value)
        .subscribe((value: any) => {
          this.tagService.assignTagToEvent(this.eventId, value.id)
            .subscribe((res : any) => {
              this.router.navigate(['events'])
          })
        })
    } else {
      this.tagService.assignTagToEvent(this.eventId, this.tagControl.value.id)
        .subscribe((res : any) => {
          this.router.navigate(['events'])
        })
    }
  }

  displayFn(item: any): string {
    return item && item.name ? item.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
