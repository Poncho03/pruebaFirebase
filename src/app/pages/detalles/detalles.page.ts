import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interface/post';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ControlServiceService } from 'src/app/services/control-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  detail = {} as Post;
  id: any;
  user: any;
  serv = this.ctrlService;

  status: boolean = true;
  icon: string = 'star-outline';

  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private ctrlService: ControlServiceService,
    private afAuth: AngularFireAuth
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getPostById(this.id);
    this.getInfoUser();
  }

  async getPostById(id: string){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    this.firestore.doc("post/"+id).valueChanges().subscribe( data => {
      this.detail.title = data["title"];
      this.detail.content = data["content"];
      this.detail.creator = data["creator"];
    });

    (await loader).dismiss();
  }

  addFav(){ 
    if (this.status) {
      this.status = false;
      this.icon = 'star';
      console.log('Agregado a fav');
      this.crearPost(this.detail);
    }
    else {
      this.status = true;
      this.icon = 'star-outline';
      console.log('Eliminado de fav');
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////
  //Agregar Post a Favoritos
  async crearPost(p: Post){
    try{
      await this.firestore.collection(this.user).doc(this.id).set(p);
    }
    catch(e){
      this.serv.showToast(e);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////
  //Verificar si existe en la coleccion


  ////////////////////////////////////////////////////////////////////////////////////

  getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      if(data){
        this.user = data.uid;
      }
    })
  }

}
