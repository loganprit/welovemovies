const service = require("./theaters.service");

// Function to list all theaters
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list,
};
