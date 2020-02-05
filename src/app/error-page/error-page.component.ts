import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  urlImg = `https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/922c3073257159.5c03f068c5d71.png`

  constructor() { }

  ngOnInit() {
  }
}
