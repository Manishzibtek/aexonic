const express = require('express');
const router = express.Router()




router.use('/api/user', require('./router/user.router'))





module.exports = router;