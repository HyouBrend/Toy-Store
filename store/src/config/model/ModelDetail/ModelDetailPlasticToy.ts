import { Toy } from "../ModelToy";

export interface ModelDetailPlasticToy extends Toy {
  type: "Plastic Toy";
  plastic_type: string;
  is_bpa_free: boolean;
}
