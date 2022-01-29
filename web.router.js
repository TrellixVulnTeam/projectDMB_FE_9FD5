'use strict';
const express = require('express');					// Load express
const router = express.Router();						// Load router

const path = require('path');
const appDir = path.dirname(require.main.filename);

router.get('*', function (req, res) {
    res.sendFile(`${appDir}/dist/index.html`);
});

module.exports = router;
