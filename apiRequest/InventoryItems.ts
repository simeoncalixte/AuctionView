import axios from "axios";
import { DevelopmentServer as Inventory } from "../services/Inventory";

const InventoryRequest = (params) => {
  const defaultParams = {
    limit: 20,
    page: 0,
  };
  console.log({ params });
  return axios
    .get(Inventory.list, { params: { ...defaultParams, ...params } })
    .then((res) => {
      console.log({ res });
      if (res.data) return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default InventoryRequest;
