import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GearModel } from '../../models/gear.model';

import { DatabaseService } from './../../services/database/database.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GearUpdateComponent } from '../../modals/gear-update/gear-update.component';

@Component({
  selector: 'app-gears-list',
  templateUrl: './gears-list.component.html',
  styleUrls: ['./gears-list.component.scss']
})
export class GearsListComponent implements OnInit {
  newGear = new GearModel();
  gearsList: any;
  type = 'gear';

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private modalService: NgbModal
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

  addGear() {
    this.db.add('gears', this.newGear).then((data) => {
      console.log('Gear : ', data);
      return this.db.getList('gears');
    }).then((otherData) => {
      console.log('gears.getlist : ', otherData);
      this.gearsList = otherData;
    }).catch((error) => {
      console.log('Error in add Gear : ', error);
    });
  }

  deleteGear(id) {
    this.db.delete('gears', id).then((data) => {
      return this.db.getList('gears');
    }).then((otherData) => {
      console.log('gears.getlist : ', otherData);
      this.gearsList = otherData;
    }).catch((error) => {
      console.log('Error in delete Gear : ', error);
    });
  }

  openModalUpdate(gear) {
    const modalRef = this.modalService.open(GearUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.gear = gear ? { ...gear } : this.newGear;
    modalRef.result.then(() => {
      return this.db.getList('gears');
    }).then((data) => {
      console.log('gears.getlist : ', data);
      this.gearsList = data;
    }).catch((error) => {
      console.log('openModalUpdate', error);
    });
  }

}
