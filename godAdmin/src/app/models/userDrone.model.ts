import { EquipedGear } from './equipedGear.model';

export class UserDrone {
  drone: string = undefined;
  isCurrent: boolean = undefined;
  equippedGears: EquipedGear[] = [];
}
