import { Component, OnInit } from '@angular/core';
import { ControlServiceService } from 'src/app/services/control-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  id: any;
  dataPost: any;
  numData: number = 0;
  serv: ControlServiceService = this.ctrlService;

  constructor(
    private ctrlService: ControlServiceService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getInfoUser();
    this.getPost();
  }

  async getPost(){
    let loader = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    loader.present();

    try{
      this.firestore.collection(this.id).snapshotChanges().subscribe( data => {
        if(data.length > 0){
          this.numData = data.length;
          this.dataPost = data.map( e => {
            return {
              id: e.payload.doc.id,
              title: e.payload.doc.data()["title"],
              content: e.payload.doc.data()["content"],
              creator: e.payload.doc.data()["creator"]
            };
          });
        }
        else{
          this.numData = data.length;
        }

        loader.dismiss();
      });
    } catch(e){
      this.serv.showToast(e);
    }
  }

  async borrar(id: string){
    let loader = this.loadingCtrl.create({
      message: 'Eliminando...'
    });
    (await loader).present();

    await this.firestore.doc(this.id+"/"+id).delete();
    
    (await loader).dismiss();
  }

  getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      if(data){
        this.id = data.uid;
      }
    });
  }

}
