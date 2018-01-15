import { DroneUpdateComponent } from './../../modals/drone-update/drone-update.component';
import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-drones-list',
  templateUrl: './drones-list.component.html',
  styleUrls: ['./drones-list.component.scss'],
})
export class DronesListComponent implements OnInit {
  dronesList: any;
  newDrone = {};

  constructor(private db: DatabaseService, private modalService: NgbModal) { }

  ngOnInit() {
    this.dronesList = [];
    this.db.getList('drones').then((data) => {
      this.dronesList = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  addDrone() {
    this.db.add('drones', this.newDrone).then((data) => {
      console.log('Drone : ', data);
      this.db.getList('drones').then((otherData) => {
        console.log('drones.getlist : ', otherData);
        this.dronesList = otherData;
      });
      this.newDrone = {};
    }).catch((error) => {
      console.log('Error in add Drone : ', error);
    });
  }

  deleteDrone(id) {
    this.db.delete('drones', id).then((data) => {
      this.db.getList('drones').then((otherData) => {
        console.log('drones.getlist : ', otherData);
        this.dronesList = otherData;
      });
    }).catch((error) => {
      console.log('Error in delete Drone : ', error);
    });
  }

  openModalUpdate(drone) {
    const modalRef = this.modalService.open(DroneUpdateComponent);
    modalRef.componentInstance.drone = { ...drone };
    modalRef.result.then(() => {
      this.db.getList('drones').then((data) => {
        console.log('drones.getlist : ', data);
        this.dronesList = data;
      });
    }).catch(() => { });
  }
}
