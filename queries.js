const Pool = require('pg').Pool
const pool = new Pool({
//  pour utiliser ma BD locale

  // user: 'postgres',
  // host: 'localhost',
  // database: 'projet 3',
  // password: 'postgrespw',

  host: 'ec2-3-221-49-44.compute-1.amazonaws.com',
  database: "dfqdc5eh5tnqp",
  user: 'ucwvuojbdwhurn',
  password: 'a3783d051846cad2b94e755727ed73c9921696f6ece0d22c9960e19b9889664f',

  port: 5432
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM account ORDER BY account_username ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByUsername = (request, response) => {
  const username = request.params.username

  pool.query('SELECT * FROM account WHERE account_username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { account_username, account_firstName, account_lastName, account_password } = request.body

  pool.query('INSERT INTO Account (Account_username, Account_firstName, Account_lastName, Account_password) VALUES ($1, $2, $3, $4)',
   [account_username, account_firstName, account_lastName, account_password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(results.rows)
  })
}

const addConnectedUsers = (request, response) => {
  const account_username = request.body.account_username

  pool.query('INSERT INTO Connected_Accounts (Account_username) VALUES ($1)', [account_username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(results.rows)
  })
}

const removeConnectedUser = (request, response) => {
  const username = request.params.username

  pool.query('DELETE FROM Connected_Accounts WHERE Account_username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteBySocket = (request, response) => {
  const socketId = request.params.socketId

  pool.query('DELETE FROM Connected_Accounts WHERE websocket_id = $1', [socketId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${socketId}`)
  })
}

const getConnectedUsers = (request, response) => {
  pool.query('SELECT * FROM Connected_Accounts ORDER BY account_username ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getConnectedUser = (request, response) => {
  const username = request.params.username

  pool.query('SELECT * FROM Connected_Accounts WHERE account_username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// not used for now ↓↓↓

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const username = request.params.username

  pool.query('DELETE FROM account WHERE account_username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${username}`)
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
  deleteBySocket,
  getConnectedUsers,
  getConnectedUser
}