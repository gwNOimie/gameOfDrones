import { PhaserService } from './../../services/phaser/phaser.service';
import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser-ce';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private phaser: PhaserService) { }

  ngOnInit() {
    const subscription = this.phaser.fullyLoaded.subscribe((value) => {
      if (value) {
        //this.phaser.game.add.sprite(0, 0, 'cat');


        
        subscription.unsubscribe();
      }
    });
  }

}
