import axios from "axios";
import { DevelopmentServer as Inventory } from "../services/Inventory";

const InventoryRequest = (params) => {
  return axios
    .get(Inventory.list, { params })
    .then((res) => {
      if (res.data) return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default InventoryRequest;
