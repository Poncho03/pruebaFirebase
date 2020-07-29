import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { ControlServiceService } from 'src/app/services/control-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dataUser = {} as User;
  serv: ControlServiceService = this.ctrlService;

  constructor(
    private ctrlService: ControlServiceService
  ) { }

  ngOnInit() {
  }

  entrar(){
    this.serv.login(this.dataUser);
  }


}
