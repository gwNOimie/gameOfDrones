import { AttackModel } from './attack.model';

export class GearModel {
  name: string = undefined;
  type: string = undefined;
  description: string = undefined;
  level: number = undefined;
  pictureId: string = undefined;
  attacks: AttackModel[] = [];
}
