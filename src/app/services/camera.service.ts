import { Injectable } from '@angular/core';
import {Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource} from '@capacitor/core';

const {Camera, Filesystem, Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public photos: Photo[] = [];

  constructor() { }

  public async addPhoto(){
    //return a new photo or one from storage
    const newPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    //add photo to Photos array
    this.photos.unshift({
      filepath: "/photos",
      webviewPath: newPhoto.webPath
    });
  }
}

interface Photo{
  filepath: string;
  webviewPath: string;
  base64?: string;
}