import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userIsLogged: boolean = false;
  @Output() sendLoggedStatusToSidenav = new EventEmitter<any>();
    
  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  handleLogin() {
    this.userIsLogged = !this.userIsLogged;
    this.sendLoggedStatusToSidenav.emit(this.userIsLogged);

  }

}
