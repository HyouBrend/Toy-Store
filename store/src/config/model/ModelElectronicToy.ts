import { Toy } from "./ModelToy";

export interface ElectronicToy extends Toy {
  battery_type: string;
  voltage: string;
}
