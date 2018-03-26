import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserUpdateComponent } from './../../modals/user-update/user-update.component';

import { UserModel } from './../../models/user.model';

import { DatabaseService } from './../../services/database/database.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  usersList: any;
  newUser = new UserModel();

  constructor(
    private db: DatabaseService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.usersList = [];
    this.db.getList('users').then((data) => {
      this.usersList = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  addUser() {
    this.db.add('users', this.newUser).then((data) => {
      console.log('User : ', data);
      return this.db.getList('users');
    }).then((otherData) => {
      console.log('users.getlist : ', otherData);
      this.usersList = otherData;
    }).catch((error) => {
      console.log('Error in add User : ', error);
    });
  }

  deleteUser(id) {
    this.db.delete('users', id).then((data) => {
      return this.db.getList('users');
    }).then((otherData) => {
      console.log('users.getlist : ', otherData);
      this.usersList = otherData;
    }).catch((error) => {
      console.log('Error in delete User : ', error);
    });
  }

  openModalUpdate(user) {
    const modalRef = this.modalService.open(UserUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.user = user ? { ...user } : this.newUser;
    modalRef.result.then(() => {
      return this.db.getList('users');
    }).then((data) => {
      console.log('users.getlist : ', data);
      this.usersList = data;
    }).catch((error) => {
      console.log('openModalUpdate', error);
    });
  }
}
