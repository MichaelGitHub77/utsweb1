import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../foto.service';

export interface fileFoto{
  name : string; //filepath
  path : string; //webviewPath
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  urlImageStorage : string[] = [];
  constructor(
   private afStorage : AngularFireStorage,
   public fotoService : FotoService
 ) { }

 async ngOnInit() {
   await this.fotoService.loadFoto();
 }
 async ionViewDidEnter(){
  await this.fotoService.loadFoto();
  this.tampilkanData(); 
 }
 hapusFoto(){
   var refImage = this.afStorage.storage.ref('imgStorage');
   refImage.listAll().then((res)=>{
     res.items.forEach((itemRef)=>{
       itemRef.delete().then(()=>{
         //menampilkan data
         this.tampilkanData();
       });
     });
   }).catch((error)=>{
     console.log(error);
   });
 }
 tampilkanData(){
   this.urlImageStorage=[];
   var refImage = this.afStorage.storage.ref('imgStorage');
   refImage.listAll().then((res)=>{
     res.items.forEach((itemRef)=>{
       itemRef.getDownloadURL().then(url=>{
         this.urlImageStorage.unshift(url)
       })
     });
   }).catch((error)=>{
     console.log(error);
   });
 }
 uploadFoto(){
   for(var index in this.fotoService.dataFoto){
     const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`

     this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() =>{
       this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=>{
         this.urlImageStorage.unshift(url)
       });
     });

   }
 }

}
