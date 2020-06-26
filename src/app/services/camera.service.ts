import { Injectable } from '@angular/core';
import {Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource} from '@capacitor/core';
import { summaryFileName } from '@angular/compiler/src/aot/util';

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

    //save photo
    const savedImage = await this.savePhoto(newPhoto);
    this.photos.unshift(savedImage);

    //add photo to Photos array
    /*
    this.photos.unshift({
      filepath: "/photos",
      webviewPath: newPhoto.webPath
    });
    */
  }

  private async savePhoto(cameraPhoto: CameraPhoto){
    //convert image to base64
    const base64Data = await this.readAsBase64(cameraPhoto);

    //write file to directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto){
    //from: https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

interface Photo{
  filepath: string;
  webviewPath: string;
  base64?: string;
}