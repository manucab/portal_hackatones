const performQuery = require("../performQuery")

const filterPosts = async (filter) => {
  const wordsInFilter = filter.trim().split(" ").length;

  if (wordsInFilter === 1) {
    const query = `select * from post where hidden = 'false'
      and title like ? 
      or content like ?`;
    const params = [`%${filter}%`, `%${filter}%`];

    console.log(query);

    const result = await performQuery(query, params);
    return result;
  } else if (wordsInFilter > 1) {
    const query = `SELECT  * , MATCH (title,content) AGAINST (?) AS puntuacion
    FROM post WHERE  MATCH (title, content) AGAINST (?)
    ORDER  BY puntuacion DESC LIMIT 50;`;
    const params = [filter, filter];

    const result = await performQuery(query, params);
    return result;
  }
};



module.exports = filterPosts