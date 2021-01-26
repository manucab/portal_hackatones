// Variables && instances
require('dotenv').config();
const { getLinksDB } = require('../../db/select/getLinks');
const { insertNewLinkDB } = require('../../db/insert/insertNewLink');
const { insertNewHackathonLinkDB } = require('../../db/insert/insertNewHackathonLink');


const auxInsertLink = async(links, id_hackathon) => {

    let links_exist = [];
    let links_notExist = [];
    let params = [];
    let hostname = [];
    let webName = [];
    let id_links = [];

    console.log('links :>> ', links);

    hostname = links.map(item => item.link);
    webName = links.map(item => item.webName);


    console.log('hostname :>> ', hostname);
    console.log('url :>> ', webName);

    // Fucntion for prepara string query mysql, amoung of values as ? or a pair (?,?)
    const getParams = (len, format) => Array(len).fill(`${format}`).join();

    // 0. Prepare the params of string query
    // 1. Prepare the query
    params = getParams(hostname.length, '?');
    // 1. Check the links exist, search by hostname. Get links that exist into db
    links_exist = await getLinksDB(hostname, params);
    console.log('links_exist :>> ', links_exist);

    // Pull apart -> links_exist_url and links_exist_webName
    let links_exist_url = links_exist.map(item => item.url);

    // 3. Check id exist new links in db len of exist < len of notExist
    if (links_exist.length < links.length) {
        // 4. YES exist new links
        // 4.1 delete links of exist in db and put in array_links not exist
        links_notExist = links.filter(item => !links_exist_url.includes(item.link));

        console.log('links_notExist :>> ', links_notExist);
        // 4.2 prepare params for string query
        params = getParams(links_notExist.length, '(?)');
        // 4.3 Inser into table links new links and get id new insert links
        console.log('params :>> ', params);


        let valuesLink = links_notExist.map(item => Object.values(item));

        const { affectedRows, insertId } = await insertNewLinkDB(valuesLink, params);

        console.log(...valuesLink);

        for (let j = 0; j < affectedRows; j++) {
            let id_new = insertId + j;
            id_links.push(id_new);
        }

        // 4.4 and to final array the totals id
    }

    // 5. NO exist new links
    // 5.1 add to final array the totals id of exist
    links_exist.forEach(item => id_links.push(item.id));
    // 6. Sort final array
    id_links = id_links.sort((a, b) => a - b);

    console.log('id_links :>> ', id_links);
    // 7. Prepare params of string query
    params = getParams(id_links.length, '(?,?)');

    valuesLink = [];
    // 7.1 Prepare values to into in table pair (id_hackathon, id_link)
    id_links.forEach(item => valuesLink.push(id_hackathon, item));

    console.log('valuesLink :>> ', valuesLink);

    // 8. Insert into table hackathon_link
    // insert id_hackathon, id
    await insertNewHackathonLinkDB(valuesLink, params);

}


module.exports = {
    auxInsertLink
}