const performQuery = require("../performQuery")

const deletePost = async (idPost) => {
  const query = `delete from post
    where id = ?`;
  const params = [idPost];

  result = await performQuery(query, params);

  return "The post has been deleted";
};

module.exports = deletePost