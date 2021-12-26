import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-drawings',
  templateUrl: './drawings.page.html',
  styleUrls: ['./drawings.page.scss'],
})
export class DrawingsPage implements OnInit {

  constructor(public storage: Storage) { }

  ngOnInit() {
  }

}
