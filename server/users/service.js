const sql = require('../dbclient');
const ramda = require('ramda');

const findByEmail = async (email) => {
    const RESULT = await sql`
        select *
        from users
        where email = ${ email }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        const USER = ramda.path(['0'], RESULT);
        return USER;
    } else if (COUNT == 0) {
        console.log(`UserService user with email ${email} not found.`);
        return undefined;
    }
}

const findAll = async () => {
    return await sql`
        select *
        from users`;
}

const create = async (user) => {
    const EMAIL = ramda.path(['email'], user);
    const PASSWORD = ramda.path(['password'], user);
    const ROLE = ramda.pathOr('user', ['role'], user);
    const STATUS = ramda.pathOr('active', ['status'], user);

    const [new_user] = await sql`
        insert into users (
            email, password, "registeredAt", role, status
        ) values (
            ${EMAIL}, ${PASSWORD}, now(), ${ROLE}, ${STATUS}
        )

        returning *`
    
    return new_user;
}

module.exports = {
    create,
    findAll,
    findByEmail
}