import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gear-list',
  templateUrl: './gear-list.component.html',
  styleUrls: ['./gear-list.component.scss']
})
export class GearListComponent implements OnInit {
  gearsList: any;
  type = 'gear';

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.route.params.toPromise().then(params => {
      if (params['type']) {
        this.type = params['type'];
      }
    });
    this.gearsList = [];
    this.db.getList('gears').then(data => {
      this.gearsList = data;
    }).catch((error) => {
      console.log(error);
    });
  }

}
