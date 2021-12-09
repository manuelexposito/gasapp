import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  userName !: string | null;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {

    this.getUserName()

  }

  getUserName(){

  this.userName = this.authService.getUserName()

  if(!this.authService.getUserName())
    this.userName = null


  }


}
