const performQuery = require("../performQuery")

const deleteComment = async (idComment) => {
  const queryIds = 'select id from comment'

  const query = `delete from comment
    where id = ?`;
  const params = [idComment];

  const ids = await performQuery(queryIds)
  const cleanIds = ids.map(id => id.id)
  const checkId = cleanIds.find( id => id === parseInt(idComment))


  if(!checkId) {
    return 'No comment with that id'
  }

  result = await performQuery(query, params);

  return "The comment has been deleted";
};

module.exports = deleteComment