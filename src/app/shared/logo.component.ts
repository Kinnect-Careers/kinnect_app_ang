import { Component } from '@angular/core';

interface ColorFiller {
  K: string;
  i: string;
  iDot: string;
  n: string;
  N: string;
  nTip: string;
  e: string;
  ct: string;
  C: string;
  a: string;
  r1: string;
  e1: string;
  e2: string;
  r2: string;
  s: string;
}


@Component({
  selector: 'logo',
  templateUrl: '../../assets/logo.svg'
})
export class LogoComponent {

  fillColor: ColorFiller = { 
    K: 'rgb(100, 250, 100)',
    i: 'rgb(70, 215, 70)',
    iDot: 'rgb(0, 215, 210)',
    n: 'rgb(90, 10, 150)',
    N: 'rgb(100, 255, 210)',
    nTip: 'rgb(100, 255, 210)',
    e: 'rgb(120, 120, 120)',
    ct: 'rgb(200, 90, 80)',
    C: 'rgb(190, 90, 90)',
    a: 'rgb(80, 180, 80)',
    r1: 'rgb(200, 50, 10)',
    e1: 'rgb(60, 160, 60)',
    e2: 'rgb(50, 150, 50)',
    r2: 'rgb(50, 200, 200)',
    s: 'rgb(50, 200, 40)'
  }
}
