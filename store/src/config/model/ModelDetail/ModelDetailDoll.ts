import { Toy } from "../ModelToy";

export interface ModelDetailDoll extends Toy {
  type: "Doll";
  material: string;
  size: string;
}
