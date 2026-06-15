const logs = require("../data/logs");

const activity_Log = (req, res, next) => {
    logs.push({
        method: req.method,
        path: req.originalUrl,
        timestamp: new Date().toISOString()
    });

    next();
};

module.exports = {
    activity_Log
};