// Variables && instances
const { updateStateUser } = require('../../db/adminRoot/db_update');
const { performQuery } = require('../../db/performQuery');

let query = '';
let params = [];

const activeUser = async(req, res) => {

    // 1. Get code params
    const { id } = req.params;

    try {

        // Init transaction mysql
        query = 'start transaction';
        const resInitTransaction = await performQuery(query, params);
        console.log('Start transaction');

        // 2.1 change state to true and reset code
        await updateStateUser(parseInt(id));

        console.log('Update state is successfully');

        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        console.log('Commit');

        res.send('Update state is successfully');

    } catch (e) {

        // Rollback mysql
        query = 'rollback';
        await performQuery(query, params);
        console.log('Rollback, error in activeUser( function)');

        res.status(401).send();
        return;
    }

}

module.exports = {
    activeUser
};