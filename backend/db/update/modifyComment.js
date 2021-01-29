const {performQuery} = require("../performQuery");

const modifyComment = async (idComment,newContent) => {
  const queryOriginalContent = `select content from comment where id = ?`;
  const paramsOriginalContent = [idComment];
  const originalContent = await performQuery(queryOriginalContent, paramsOriginalContent);

  const content = newContent || originalContent[0].content;

  if(originalContent.length === 0) {
    return 'No comment with that id'
  }

  const query = `
    update comment
    set content = ?
    where id = ?`;

  const params = [content,idComment];

  await performQuery(query, params);

  return "The comment has been succesfully modified";
};

module.exports = modifyComment