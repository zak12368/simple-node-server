// require
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
// local modules
const indexRouter = require('./routes/index');
const listsRouter = require('./routes/lists');
const restRouter = require('./routes/rest');