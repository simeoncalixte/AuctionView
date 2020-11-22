export const MockInventory = {
  list: "",
  attributes: "",
};

const developmentDomain = "http://127.0.0.1:8000/";
export const DevelopmentServer = {
  login: `${developmentDomain}/login`,
  register: `${developmentDomain}/register`,
  update: `${developmentDomain}/update`,
};

export default DevelopmentServer;
