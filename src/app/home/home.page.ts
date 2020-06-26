import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  buttonText = 'Upload Photo';

  onClickUploadPhoto(){
    this.buttonText = 'You pressed it! Good job!';
  }

}
