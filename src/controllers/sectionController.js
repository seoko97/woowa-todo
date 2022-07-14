const sectionService = require("../services/sectionService");

function getSection(req, res) {
  const sectionId = req.params.id;
  sectionService.getSection(sectionId).then((data) => {
    res.status(200).json({
      statusCode: 200,
      data,
    });
  });
}

module.exports = { getSection };
