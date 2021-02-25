var express = require('express');
const db = require('../services/databaseService');

let router = express.Router();

router.get('/users', db.getUsers)
router.get('/users/:username', db.getUserByUsername)
router.post('/users', db.createUser)
router.put('/users/:id', db.updateUser)
router.delete('/users/:username', db.deleteUser)

router.post('/connectedUsers', db.addConnectedUsers)
router.get('/connectedUsers', db.getConnectedUsers)
router.delete('/connectedUsers/:username', db.removeConnectedUser)
router.get('/connectedUsers/:username', db.getConnectedUser)
router.delete('/connectedSockets/:socketId', db.deleteBySocket)

module.exports = router;