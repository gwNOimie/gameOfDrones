import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-drone-update',
  templateUrl: './drone-update.component.html',
  styleUrls: ['./drone-update.component.scss']
})
export class DroneUpdateComponent implements OnInit {
  @Input()
  drone;

  bonusTypes = [
    { value: 'electricity', key: 'Electricity' },
    { value: 'fire', key: 'Fire' },
    { value: 'explosion', key: 'Explosion' }
  ];

  constructor(private db: DatabaseService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  update() {
    this.db.update('drones', this.drone).then((data) => {
      this.activeModal.close();
    }).catch((error) => {
      console.log('Error in update Drone : ', error);
    });
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
