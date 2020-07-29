import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/interface/user';
import { ControlServiceService } from 'src/app/services/control-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  dataPost = {} as Post;
  serv: ControlServiceService = this.ctrlService;

  constructor(
    private afAuth: AngularFireAuth,
    private ctrlService: ControlServiceService
  ) { }

  ngOnInit() {
    this.getInfoUser();
  }

  addPost(){
    this.serv.crearPost(this.dataPost);
  }

  getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      this.dataPost.creator = data.displayName;
    })
  }


}
