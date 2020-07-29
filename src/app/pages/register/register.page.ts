import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { ControlServiceService } from 'src/app/services/control-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  dataUser = {} as User
  serv: ControlServiceService = this.ctrlService;

  constructor(
    private ctrlService: ControlServiceService
  ) { }

  ngOnInit() {
  }

  registro(){
    this.serv.registro(this.dataUser);
  }

}
