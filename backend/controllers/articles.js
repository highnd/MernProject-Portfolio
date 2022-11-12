const Articles = require("../models/articles");
const { isValidObjectId } = require("mongoose");
const { sendError, infoDev } = require("../utils/helper");
const cloudinary = require("../cloud");

exports.createArticle = async (req, res) => {
  const { file, body } = req;
  const {
    title,
    realeseDate,
    about,
    leader,
    status,
    technology,
    tags,
    language,
    isMultiTheme,
    team,
  } = body;

  const newArticle = new Articles({
    title,
    about,
    status,
    technology,
    language,
    tags,
    team,
  });

  if (!leader) return sendError(res, "Pls definde a leader for this article");
  if (!language)
    return sendError(res, "no language has been set for this article");
  if (!isMultiTheme)
    return sendError(res, "no multitheme has been set for this article");

  // uploading poster
  if (file) {
    await cloudinary.uploader
      .upload(file.path, {
        transformation: {
          width: 1280,
          height: 720,
        },
        responsive_breakpoints: {
          create_derived: true,
          max_width: 640,
          max_images: 3,
        },
      })
      .then((result) => {
        console.log(result);
        const finalPoster = {
          url: result.secure_url,
          public_id: result.public_id,
          responsive: [],
        };

        const breakPoints = result.responsive_breakpoints[0];
        if (breakPoints.length) {
          for (let img in breakPoints) {
            const { secure_url } = img;
            finalPoster.responsive.push(secure_url);
          }
        }
        newArticle.poster = finalPoster;
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
        throw Error("not happening");
      });
  }

  // console.log(typeof JSON.parse(body.team));

  await newArticle.save();

  console.log(newArticle);
  res.status(201).json({
    id: newArticle._id,
    title,
  });
};

exports.updateArticleInfoOnly = async (req, res) => {
  const { artID } = req.params;

  if (!isValidObjectId(artID)) return sendError(res, "invalid article id");

  const oldArticle = await Articles.findById(artID);
  if (!oldArticle) return sendError(res, "article not found", 404);

  const {
    title,
    about,
    leader,
    status,
    technology,
    tags,
    language,
    isMultiTheme,
    team,
  } = req.body;

  if (!leader) return sendError(res, "Pls definde a leader for this article");
  if (!language)
    return sendError(res, "no language has been set for this article");
  if (!isMultiTheme)
    return sendError(res, "no multitheme has been set for this article");

  if (title) oldArticle.title = title;
  if (about) oldArticle.about = about;
  if (status) oldArticle.status = status;
  if (technology) oldArticle.technology = technology;
  if (tags) oldArticle.tags = tags;
  if (language) oldArticle.language = language;
  if (isMultiTheme) oldArticle.isMultiTheme = isMultiTheme;
  if (team) oldArticle.team = team;

  await oldArticle.save();

  res.status(201).json({ message: "article updated!", oldArticle });
};

exports.removeArticle = async (req, res) => {
  const { artID } = req.params;

  if (!isValidObjectId(artID))
    return sendError(res, "Invalid ID cannot delete");

  const oldArticle = await Articles.findById(artID);
  if (!oldArticle) return sendError(res, "there is no post with this id", 404);

  //removing poster
  const posterID = oldArticle.poster?.public_id;
  if (posterID) {
    const { result } = cloudinary.uploader.destroy(posterID);
    if (result !== "ok")
      return sendError(res, " coud not remove poster from cloud");
  }

  await Articles.findByIdAndDelete(artID);

  res.json({ message: "Article removed" });
};
//

//

// example data of an article

// const articleInfo = {
//   title: "title of the software",
//   about: "something about the software",
//   leader: "1234567",
//   releaseDate: "07-01-2022",
//   status: "private",
//   technology: ["Html5", "Css", "JavaScript"],
//   tags: ["website", "E-Commerce"],
//   language: ["English", "Persian"],
//   team: [{ id: "1234567", roleAs: "developer/designer", leader: false }],
//   poster: File,
// };
