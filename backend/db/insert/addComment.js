const {performQuery} = require("../performQuery")

const addComment = async (idHackathon,idUser,content) => {

    const query = `insert into comment(id_hackathon,id_competitor,content)
        values(?,?,?) `
    const params = [idHackathon,idUser,content]

    await performQuery(query,params)
    return 'The comment has been posted'

}

module.exports = addComment