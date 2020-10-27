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
    K: '#1F363D',
    i: '#305865',
    iDot: '#1F363D',
    n: '#40798C',
    N: '#70A9A1',
    nTip: '#8AB6A2',
    e: '#8AB6A2',
    ct: '#89B6A2',
    C: '#1F363D',
    a: '#305865',
    r1: '#70A9A1',
    e1: '#71AAA1',
    e2: '#8AB6A2',
    r2: '#89B6A2',
    s: '#89B6A2'
  }
}
