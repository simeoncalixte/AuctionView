import axios from "axios";
import { DevelopmentServer as Inventory } from "../services/Inventory";

interface IModelData {
  vendor_id: string;
  models?: string[];
}

const modelRequest = (data: IModelData[]) => {
  if (data) {
    return axios
      .get(Inventory.attributes, {
        params: {
          Models: data,
        },
      })
      .then((res) => {
        if (res.data) return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default modelRequest;
