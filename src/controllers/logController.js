const logService = require("../services/logService");

function getLogs(req, res) {
  const userId = 1;
  const { page, limit } = req.query;
  logService.getLogs(limit, page, (data) => {
    res.status(200).json({
      statusCode: 200,
      data,
    });
  });
}

module.exports = { getLogs };
