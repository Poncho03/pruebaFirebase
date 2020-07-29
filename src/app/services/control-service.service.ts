import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController, ActionSheetController } from '@ionic/angular';
import { User } from '../interface/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../interface/post';

@Injectable({
  providedIn: 'root'
})
export class ControlServiceService {

  dataUser = {} as User;
  dataPost = {} as Post;

  constructor(
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private actionSheetCtrl: ActionSheetController
  ) { }

  /////////////////////////////////////////////////////////////
  // Login Page

  async login( us: User ){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    try{
      await this.afAuth.signInWithEmailAndPassword(us.email, us.pass).then(data => {
        console.log(data);
        this.showToast('Bienvenido ' + data.user.displayName)
        this.navCtrl.navigateRoot('home');
      })
    }
    catch(e){
      this.showToast(e)
    }
    (await loader).dismiss();
  }

  /////////////////////////////////////////////////////////////
  // Register Page

  async registro(us: User){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    try{
      await this.afAuth.createUserWithEmailAndPassword(us.email, us.pass).then(data => {
        this.data(us);
        this.showToast('Usuario registrado');
      });
    } catch(e){
      console.log(e);
    }
    (await loader).dismiss();
  }

  async data(us: User){
    this.login(us);
    us.photo = 'assets/userNull.jpg';
    (await this.afAuth.currentUser).updateProfile({
      displayName: us.username,
      photoURL: us.photo,
    }).then( e => {
      console.log('Nombre añadido');
    }).catch(e =>{
      console.log(e);
    });
  }

  /////////////////////////////////////////////////////////////
  // Home Page - Cerrar Sesion
  
  async singOut(){
    let loader = this.loadingCtrl.create({
      message: 'Cerrando sesión'
    });
    (await loader).present();
    this.afAuth.signOut().then( exit => {
      console.log('Se ha cerrado la sesión');
      this.navCtrl.navigateRoot('login');
    }).catch( exit => {
      console.log(exit);
    });
    (await loader).dismiss();
  }

  /////////////////////////////////////////////////////////////
  // Crear Post

  async crearPost(p: Post){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    try{  
      await this.firestore.collection("post").add(p);
    } catch(e){
      this.showToast(e);
    }
    (await loader).dismiss();
    this.navCtrl.navigateRoot("home");
  }

  /////////////////////////////////////////////////////////////
  // Mensajes

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then( toasData => toasData.present());
  }

  /////////////////////////////////////////////////////////////
  // Update user photo

  async Opciones() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Elige una opción',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera',
          handler: () => {
            //this.tomarFoto();
          }
        },
        {
          text: 'Seleccionar foto',
          icon: 'image',
          handler: () => {
            //this.galeria();
          }
        },
        {
          text: 'Eliminar foto',
          icon: 'trash',
          handler: () => {
            //this.eliminarFoto();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

}
