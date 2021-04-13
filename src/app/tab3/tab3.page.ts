import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FotoService } from '../foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  urlImageStorage : string[] = [];
  constructor(public fotoService:FotoService, public afs: AngularFirestore, private afStorage : AngularFireStorage)  {
    this.isiDataColl = afs.collection('MyNote');
    this.isiData = this.isiDataColl.valueChanges();
  }

  async ngOnInit(){
    await this.fotoService.loadFoto();
  }
  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
    this.tampilkanData(); 
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
  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi: string;
  Tanggal : Date;
  Nilai : string;
}
interface data{
  judul : string,
  isi : string,
  tanggal : Date,
  nilai : string
}
export interface fileFoto{
  name : string; //filepath
  path : string; //webviewPath
}
