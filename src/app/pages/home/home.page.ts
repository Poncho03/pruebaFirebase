import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { ControlServiceService } from 'src/app/services/control-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data = {} as User;
  dataPost: any;
  numData: number = 0;
  serv: ControlServiceService = this.ctrlService;

  constructor(
    private ctrlService: ControlServiceService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getInfoUser();
  }

  ionViewWillEnter(){
    this.getPost();
  }

  getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      if (data) {
        this.data.uid = data.uid;
        this.data.username = data.displayName;
        this.data.email = data.email;
        this.data.photo = data.photoURL;
      }
      else {
        console.log('Usuario ha cerrado sesión');
      }
    })
  }

  exit(){
    this.serv.singOut();
  }

  async getPost(){
    let loader = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    loader.present();

    try{
      this.firestore.collection("post").snapshotChanges().subscribe( data => {
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

  UPhoto(){
    console.log('Evento cambiar foto');
    this.serv.Opciones();
  }
  

}
