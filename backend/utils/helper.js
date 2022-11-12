const crypto = require("crypto");
const cloudinary = require("../cloud");

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.generateRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) return reject(err);
      const buffString = buff.toString("hex");

      resolve(buffString);
    });
  });
};

exports.handleNotFound = (req, res) => {
  this.sendError(res, "Not Found", 404);
};

exports.infoDev = (dev) => {
  const { name, email, about, gender, skills, _id, avatar } = dev;

  return {
    id: _id,
    name,
    email,
    about,
    gender,
    skills,
    avatar: avatar?.url,
  };
};

exports.parseData = (req, res, next) => {
  const { tags, technology, language, team } = req.body;

  if (tags) req.body.tags = JSON.parse(tags);

  if (technology) req.body.technology = JSON.parse(technology);
  if (language) req.body.language = JSON.parse(language);
  if (team) req.body.team = JSON.parse(team);

  next();
};
