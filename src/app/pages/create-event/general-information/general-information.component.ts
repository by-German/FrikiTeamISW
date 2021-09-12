import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CloudinaryApiService} from "../../../services/cloudinary-api.service";
import {OrganizerEventApiService} from "../../../services/Event/organizer-event-api.service";
import {PlacesApiService} from "../../../services/Event/places-api.service";
import {subscribeToResult} from "rxjs/internal-compatibility";

interface Name {
  id: number;
  name: string;
}


@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    information: new FormControl('', [Validators.required, Validators.maxLength(130)]),
    countryId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    reference: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  })

  file : any;

  countries: any[] = []
  cities: any[] = []
  districts: any[] = []

  selectedValue: string | undefined;
  foods: Name[] = [
    {id: 1, name: 'Peru'},
    {id: 2, name: 'Lima'},
    {id: 3, name: 'Chorrillos'},
    {id: 5, name: 'Arequipa'}
  ];


  pathImg : string | undefined

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private cloudinary: CloudinaryApiService,
    private organizerEventService: OrganizerEventApiService,
    private placeService: PlacesApiService ) {
  }
  ngOnInit(): void {
    this.getCountries()
  }

  onSubmit(): void {
    if (this.form.invalid) return

    // first execute onChange "validate"

    // creation of link of event logo
    let ref = this.cloudinary.reference(this.file.name)
    this.cloudinary.post(this.file).then(result => {
      ref.getDownloadURL().subscribe((url: any) => {
        console.log(url)
        this.form.value.logo = url

        // creation place
        let place: any  = {
          name: this.form.value.place,
          reference: this.form.value.reference
        }
        this.placeService.postPlaces(this.form.value.districtId, place)
          .subscribe((result: any) => {
            this.form.value.placeId = result.id

            // creation event by an organizer
            this.organizerEventService.createNewEvent(this.form.value, 1)
              .subscribe(result => console.log(result))

            // TODO: navigate to detailed information with id of this event
          })

      })
    })

  }

  onChange() {
    // @ts-ignore
    let img = document.getElementById('input-img');
    // @ts-ignore
    this.file  = img.files[0]
    this.pathImg = URL.createObjectURL(this.file);
  }

  getCountries() {
    this.placeService.getCountries().subscribe((result: any) => {
      this.countries = result.content
    })
  }

  getCities(e: any) {
    this.placeService.getCities(e).subscribe((result: any) => {
      // the form between have the value of id
      this.cities = result
    })
  }

  getDistricts(e: any) {
    this.placeService.getDistricts(e).subscribe((result: any) => {
      // the form between have the value of id
      this.districts = result
    })
  }

  postPlace() {
    let place: any  = {
      name: this.form.value.place,
      reference: this.form.value.reference
    }

    this.placeService.postPlaces(this.form.value.districtId, place)
      .subscribe(result => console.log(result))
  }

}