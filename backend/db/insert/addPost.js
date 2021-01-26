const performQuery = require("../performQuery")

const addPost = async (title,content,publicationDate) => {

    const query = `insert into post(title,content,publication_date,hidden)
        values(?,?,?,'false') `
    const params = [title,content,publicationDate]

    await performQuery(query,params)
    return 'The new post has been added'

}

module.exports = addPost