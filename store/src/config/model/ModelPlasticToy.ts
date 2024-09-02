import { Toy } from "./ModelToy";

export interface PlasticToy extends Toy {
  plastic_type: string;
  is_bpa_free: boolean;
}
