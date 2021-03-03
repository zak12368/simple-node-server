var express = require('express')
const dbUserAccount = require('../services/dbUserAccountService')
const dbDrawing = require('../services/dbDrawingService')

let router = express.Router();

router.get('/users', dbUserAccount.getUsers)
router.get('/users/:username', dbUserAccount.getUserByUsername)
router.post('/users', dbUserAccount.createUser)
router.put('/users/:id', dbUserAccount.updateUser)
router.delete('/users/:username', dbUserAccount.deleteUser)
router.post('/connectedUsers', dbUserAccount.addConnectedUsers)
router.get('/connectedUsers', dbUserAccount.getConnectedUsers)
router.delete('/connectedUsers/:username', dbUserAccount.removeConnectedUser)
router.get('/connectedUsers/:username', dbUserAccount.getConnectedUser)

router.get('/drawings', dbDrawing.getDrawings)
router.post('/drawings', dbDrawing.insertDrawing)

module.exports = router;