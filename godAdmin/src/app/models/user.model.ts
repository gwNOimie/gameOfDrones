import { UserDrone } from './userDrone.model';

export class UserModel {
  name: string = undefined;
  password: string = undefined;
  email: string = undefined;
  signUpDate: Date = undefined;
  gold: number = undefined;
  totalGold: number = undefined;
  boughtGears: string[] = [];
  drones: UserDrone[] = [];
}
