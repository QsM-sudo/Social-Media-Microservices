const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack)

    res.status(500).json({
        message: "Internal server Error !",
        sucesss: false,
    });
};

module.exports = errorHandler;