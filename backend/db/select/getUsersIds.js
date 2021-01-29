const {performQuery} = require("../performQuery");


const getUsersId = async () => {
  const query = "select id from competitor";

  const idsObjectArray = await performQuery(query);
  const result = idsObjectArray.map((id) => id.id);
  return result;
};

module.export = getUsersId