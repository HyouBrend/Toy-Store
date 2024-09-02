import { Toy } from "../ModelToy";

export interface ModelDetailElectronicToy extends Toy {
  type: "Electronic Toy";
  battery_type: string;
  voltage: string;
}
