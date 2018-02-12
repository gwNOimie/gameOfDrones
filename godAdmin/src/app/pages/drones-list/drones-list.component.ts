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
  newDrone = {
    name: '',
    description: '',
    level: null,
    cost: null,
    speed: null,
    health: null,
    actionPoints: null,
    pictureId: '',
    weaponLeft: {
      type: '',
      name: '',
      description: '',
      level: null,
      pictureId: '',
      attacks: [
        {
          name: '',
          description: '',
          damages: null,
          ammo: null,
          cooldown: null,
          accuracy: null,
          pictureId: '',
          bonus: {
            type: '',
            damages: null,
            nbTurns: null,
            actionPointsReduction: null,
            nbTiles: null
          }
        },
        {
          name: '',
          description: '',
          damages: null,
          ammo: null,
          cooldown: null,
          accuracy: null,
          pictureId: '',
          bonus: {
            type: '',
            damages: null,
            nbTurns: null,
            actionPointsReduction: null,
            nbTiles: null
          }
        }
      ]
    },
    weaponRight: {
      type: '',
      name: '',
      description: '',
      level: null,
      pictureId: '',
      attacks: [
        {
          name: '',
          description: '',
          damages: null,
          ammo: null,
          cooldown: null,
          accuracy: null,
          pictureId: '',
          bonus: {
            type: '',
            damages: null,
            nbTurns: null,
            actionPointsReduction: null,
            nbTiles: null
          }
        },
        {
          name: '',
          description: '',
          damages: null,
          ammo: null,
          cooldown: null,
          accuracy: null,
          pictureId: '',
          bonus: {
            type: '',
            damages: null,
            nbTurns: null,
            actionPointsReduction: null,
            nbTiles: null
          }
        }
      ]
    }
  };

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
      return this.db.getList('drones');
    }).then((otherData) => {
      console.log('drones.getlist : ', otherData);
      this.dronesList = otherData;
    }).catch((error) => {
      console.log('Error in add Drone : ', error);
    });
  }

  deleteDrone(id) {
    this.db.delete('drones', id).then((data) => {
      return this.db.getList('drones');
    }).then((otherData) => {
      console.log('drones.getlist : ', otherData);
      this.dronesList = otherData;
    }).catch((error) => {
      console.log('Error in delete Drone : ', error);
    });
  }

  openModalUpdate(drone) {
    const modalRef = this.modalService.open(DroneUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.drone = drone ? { ...drone } : this.newDrone;
    modalRef.result.then(() => {
      return this.db.getList('drones');
    }).then((data) => {
      console.log('drones.getlist : ', data);
      this.dronesList = data;
    }).catch((error) => {
      console.log('openModalUpdate', error);
    });
  }
}
