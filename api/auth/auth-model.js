const db = require('../../data/dbConfig')

function findBy(filter) {
    return db('users').where(filter)
}

async function add(user) {
    await db('users')
        .insert(user)
    return(user)
}

module.exports = {
    findBy,
    add,
}