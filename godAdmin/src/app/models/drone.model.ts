import { GearModel } from './gear.model';

export class DroneModel {
  name: string = undefined;
  description: string = undefined;
  level: number = undefined;
  cost: number = undefined;
  speed: number = undefined;
  health: number = undefined;
  actionPoints: number = undefined;
  pictureId: string = undefined;
  weaponLeft: GearModel = undefined;
  weaponRight: GearModel = undefined;
}
