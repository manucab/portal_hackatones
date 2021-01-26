const performQuery = require("../performQuery");

const modifyPost = async (idPost, title, content, publication_date, hidden) => {
  const queryOriginalInfo = `select * from post where id = ?`;
  const paramsOriginalInfo = [idPost];
  originalInfo = await performQuery(queryOriginalInfo, paramsOriginalInfo);

  const newTitle = title || originalInfo[0].title;
  const newContent = content || originalInfo[0].content;
  const newPublicationDate =
    publication_date || originalInfo[0].publication_date;
  const newHidden = hidden || originalInfo[0].hidden;

  const query = `
    update post
    set title = ?,
    content = ?,
    publication_date = ?,
    hidden = ?
    where id = ?`;

  const params = [newTitle, newContent, newPublicationDate, newHidden, idPost];

  result = await performQuery(query, params);

  return "The post has been succesfully modified";
};

module.exports = modifyPost