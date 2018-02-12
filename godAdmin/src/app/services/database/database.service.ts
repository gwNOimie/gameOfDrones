import { Injectable } from '@angular/core';
import { DbConfig } from './db.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getList(entity: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${DbConfig.baseUrl}/${entity}`).toPromise().then((data) => {
        const dataArray = [];
        // tslint:disable-next-line:forin
        for (const key in data) {
          dataArray.push(data[key]);
        }
        resolve(dataArray);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getOne(entity: string, id) {
    return this.http.get(`${DbConfig.baseUrl}/${entity}/${id}`).toPromise();
  }

  add(entity: string, object) {
    return this.http.post(`${DbConfig.baseUrl}/${entity}`, object).toPromise();
  }

  delete(entity: string, id) {
    return this.http.delete(`${DbConfig.baseUrl}/${entity}/${id}`).toPromise();
  }

  update(entity: string, object) {
    let url = `${DbConfig.baseUrl}/${entity}`;
    if (object._id) {
      url += `/${object._id}`;
    }
    return this.http.post(url, object).toPromise();
  }
}
