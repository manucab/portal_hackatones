const performQuery = require("../db/performQuery")

const getIdsNewValuesTech = async (values) => {
    //Get the current list of values
    const originalArrayQuery = `select tech_name from tech`
    const originalArrayResult = await performQuery(originalArrayQuery)

    //Conver the result into an Array
    const originalArray = originalArrayResult.map(t => t.tech_name)
    
    //map to get the ids whe
    const ids = await Promise.all( values.map(async (v) => {
        //Check if the value is in the current list
        v = v.trim().toLowerCase()
        const exists = originalArray.indexOf(v) !== -1

        //If exist we get the id
        if(exists) {
            const idQuery = `select id from tech where tech_name = ?`
            const params = [v]
            const idResult = await performQuery(idQuery,params)
            const id = idResult[0].id
            return id
        } else {
            //If not we insert the new value
            const insertQuery = `insert into tech (tech_name)
                values (?);`
            const insertQueryParams = [v]
            const idResult = await performQuery(insertQuery,insertQueryParams)
            const id = idResult.insertId
            return id
        }


    }))  

    return ids
    
}



module.exports = getIdsNewValuesTech