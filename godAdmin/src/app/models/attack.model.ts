import { BonusModel } from './bonus.model';

export class AttackModel {
  name: string = undefined;
  description: string = undefined;
  damages: number = undefined;
  ammo: number = undefined;
  cooldown: number = undefined;
  accuracy: number = undefined;
  pictureId: string = undefined;
  bonus: BonusModel = undefined;
}
