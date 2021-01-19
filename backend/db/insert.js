const performQuery = require("./performQuery")

const addPost = async (title,content,publicationDate) => {

    const query = `insert into post(title,content,publication_date)
        values(?,?,?) `
    const params = [title,content,publicationDate]

    await performQuery(query,params)
    return 'Se ha añadido un nuevo post'

}

module.exports = {
    addPost
}