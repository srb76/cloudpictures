import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  buttonText = 'Tap here to upload a photo!';

  onClickUploadPhoto(){
    this.buttonText = 'You pressed it! Good job!';
  }

}
