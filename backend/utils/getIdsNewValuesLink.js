const {performQuery} = require("../db/performQuery")

const getIdsNewValuesLink = async (values) => {
    //Get the current list of values
    const originalArrayQuery = `select url from link`
    const originalArrayResult = await performQuery(originalArrayQuery)

    //Transform the result into an Array
    const originalArray = originalArrayResult.map(t => t.url)
    
    //map to get the ids whe
    const ids = await Promise.all( values.map(async (v) => {
        //Check if the value is in the current list
        let {link,webName} = v
        link = link.trim()
        web_name = webName.trim().toLowerCase()

        const exists = originalArray.indexOf(link) !== -1

        //If exist we get the id
        if(exists) {
            const idQuery = `select id from link where url = ?`
            const params = [link]
            const idResult = await performQuery(idQuery,params)
            const id = idResult[0].id
            return id
        } else {
            //If not we insert the new value 
            const insertQuery = `insert into link (web_name,url)
                values (?,?);`
            const insertQueryParams = [web_name,link]
            const idResult = await performQuery(insertQuery,insertQueryParams)
            const id = idResult.insertId
            return id
        }


    }))  

    return ids
    
}



module.exports = getIdsNewValuesLink