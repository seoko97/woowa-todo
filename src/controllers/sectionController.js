const sectionService = require("../services/sectionService");

function createSection(req, res) {
  const userId = 1;
  const { title } = req.body;
  sectionService.createSection(userId, title, () => {
    res.status(201).json({
      statusCode: 200,
    });
  });
}

function getSections(req, res) {
  const userId = 1;
  sectionService.getSections(userId, (data) => {
    res.status(200).json({
      statusCode: 200,
      data,
    });
  });
}

function getSection(req, res) {
  const sectionId = req.params.id;
  sectionService.getSection(sectionId, (data) => {
    res.status(200).json({
      statusCode: 200,
      data,
    });
  });
}

function updateSection(req, res) {
  const sectionId = req.params.id;
  const { title } = req.body;
  sectionService.updateSection(sectionId, title, () => {
    res.status(200).json({
      statusCode: 200,
    });
  });
}

function deleteSection(req, res) {
  const sectionId = req.params.id;
  sectionService.deleteSection(sectionId, () => {
    res.status(200).json({
      statusCode: 200,
    });
  });
}

module.exports = {
  createSection,
  getSections,
  getSection,
  updateSection,
  deleteSection,
};
