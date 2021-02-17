const Pool = require('pg').Pool
const pool = new Pool({
  user: "admin_exotik@exotik-db",
  host: 'exotik-db.postgres.database.azure.com',
  database: 'exotik_db',
  password: 'T79?2m>(CkdMqC5N',
  port: process.env.PORT || 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM account ORDER BY account_username ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// seems like i cant change the function name ???
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
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
}