const status = require('http-status')
const Pool = require('pg').Pool
const pool = new Pool({
//  pour utiliser ma BD locale

  // user: 'postgres',
  // host: 'localhost',
  // database: 'projet 3',
  // password: 'postgrespw',

  //BD host par Heroku
  //Max 20 connections, 10 000 rows
  host: 'ec2-3-221-49-44.compute-1.amazonaws.com',
  database: "dfqdc5eh5tnqp",
  user: 'ucwvuojbdwhurn',
  password: 'a3783d051846cad2b94e755727ed73c9921696f6ece0d22c9960e19b9889664f',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

const getUsers = (request, response) => {
  pool
  .query('SELECT * FROM account ORDER BY account_username ASC')
  .then((results) => {
    if (results.rowCount == 0) {
      console.log('There are no users registered')
      response.status(status.OK).json(results.rows)
    }
    else {
      response.status(status.OK).json(results.rows)
    }
  })
  .catch((error) => {
    response.status(status.NOT_FOUND).send('Error getting users')
  })
}

const getUserByUsername = (request, response) => {
  const username = request.params.username

  pool
  .query('SELECT * FROM account WHERE account_username = $1', [username])
  .then((results) => {
    if(results.rowCount == 0) {
      console.log('There is no user')
      response.status(status.OK).json(results.rows)
    }
    else {
      response.status(status.OK).json(results.rows)
    }
  })
  .catch((error) => {
    response.status(status.NOT_FOUND).send('Error getting user')
  })
}

const createUser = (request, response) => {
  const { account_username, account_firstName, account_lastName, account_password } = request.body

  pool
  .query('INSERT INTO Account (Account_username, Account_firstName, Account_lastName, Account_password) VALUES ($1, $2, $3, $4)',
   [account_username, account_firstName, account_lastName, account_password])
  .then((results) => {
    response.status(status.ACCEPTED).json(results.rows)
  })
  .catch((error) => {
    response.status(status.NOT_MODIFIED).send('Error inserting user')
  })
}

const addConnectedUsers = (request, response) => {
  const account_username = request.body.account_username

  pool
  .query('INSERT INTO Connected_Accounts (Account_username) VALUES ($1)', [account_username]) 
  .then((results) => {
    response.status(status.ACCEPTED).json(results.rows)
  })
  .catch((error) => {
    response.status(status.NOT_MODIFIED).send('Error inserting user')
  })
}

const removeConnectedUser = (request, response) => {
  const username = request.params.username

  pool
  .query('DELETE FROM Connected_Accounts WHERE Account_username = $1', [username])
  .then((results) => {
    response.status(status.OK).json(results.rows)
  })
  .catch((error) => {
    response.status(status.NOT_MODIFIED).send('Error deleting user')
  })
}

const getConnectedUsers = (request, response) => {
  pool
  .query('SELECT * FROM Connected_Accounts ORDER BY account_username ASC')
  .then((results) => {
    if (results.rowCount == 0) {
      console.log('There are no connected user')
      response.status(status.OK).json(results.rows)
    }
    else {
      response.status(status.OK).json(results.rows)
    }
  })
  .catch((error) => {
    response.status(status.NOT_FOUND).send('Error getting users')
  })
}

const getConnectedUser = (request, response) => {
  const username = request.params.username

  pool
  .query('SELECT * FROM Connected_Accounts WHERE account_username = $1', [username])
  .then((results) => {
    if (results.rowCount == 0) {
      console.log('user is not connected at the moment')
      response.status(status.OK).json(results.rows)
    }
    else {
      response.status(status.OK).json(results.rows)
    }
  })
  .catch((error) => {
    response.status(status.NOT_FOUND).send('Error getting user')
  })
}

// not used for now ↓↓↓

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool
  .query('UPDATE users SET name = $1, email = $2 WHERE id = $3',[name, email, id])
  .then((results)=> {
    response.status(status.OK).send(`User modified with ID: ${id}`)
  })
  .catch((error)=> {
    response.status(status.NOT_FOUND).send('Error modifying user')
  })
}

const deleteUser = (request, response) => {
  const username = request.params.username

  pool
  .query('DELETE FROM account WHERE account_username = $1', [username])
  .then((results) => {
    response.status(status.OK).send(`User deleted with ID: ${username}`)
  })
  .catch((error)=> {
    response.status(status.NOT_FOUND).send('Error deleting user')
  })
}

module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  addConnectedUsers,
  removeConnectedUser,
  getConnectedUsers,
  getConnectedUser
}