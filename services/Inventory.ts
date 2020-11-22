export const MockInventory = {
  list: "",
  attributes: "",
};

const developmentDomain = "http://127.0.0.1:8000";
export const DevelopmentServer = {
  list: `${developmentDomain}/Inventory`,
  attributes: `${developmentDomain}/Inventory/attributes`,
  item: `${developmentDomain}/Inventory/item`,
};

export default DevelopmentServer;
