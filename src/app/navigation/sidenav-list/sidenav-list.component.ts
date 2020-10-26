import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  @Output() sendLoggedStatusToHeader = new EventEmitter<any>();
  
  @Input() userIsLogged: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  handleLogin() {
    this.userIsLogged = !this.userIsLogged;
    this.sendLoggedStatusToHeader.emit(this.userIsLogged);
  }

}
