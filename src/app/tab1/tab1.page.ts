import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FotoService } from '../foto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public fotoService:FotoService, public afs: AngularFirestore) {
    this.isiDataColl = afs.collection('MyNote');
    this.isiData = this.isiDataColl.valueChanges();
  }

  async ngOnInit(){
    await this.fotoService.loadFoto();
  }
  TambahFoto(){
    this.fotoService.tambahFoto();
  }
  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi: string;
  Tanggal : Date;
  Nilai : string;
  simpan(){
    this.isiDataColl.doc(this.Judul). set({
      judul : this.Judul,
      isi : this.Isi,
      tanggal : this.Tanggal,
      nilai : this.Nilai
      })
    }
}
interface data{
  judul : string,
  isi : string,
  tanggal : Date,
  nilai : string
}
