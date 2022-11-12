const Developers = require("../models/developers");
const { isValidObjectId } = require("mongoose");
const { sendError, infoDev } = require("../utils/helper");
const cloudinary = require("../cloud");

exports.createDev = async (req, res) => {
  const { name, email, about, gender, skills } = req.body;
  const { file } = req;

  const newDeveloper = new Developers({ name, email, about, gender, skills });

  /// upload image to cloadinary webiste
  if (file) {
    await cloudinary.uploader
      .upload(file.path, {
        gravity: "face",
        height: 500,
        width: 500,
        crop: "thumb",
      })
      .then((result) => {
        console.log(result);
        newDeveloper.avatar = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  }

  await newDeveloper.save();

  res.status(201).json(infoDev(newDeveloper));
};

exports.updateDev = async (req, res) => {
  const { name, email, about, gender, skills } = req.body;
  const { file } = req;
  const { devID } = req.params;

  if (!isValidObjectId(devID))
    return sendError(res, "Invalid request..id invalid");

  const oldDev = Developers.findById(devID);

  if (!oldDev) return sendError(res, "invalid request developer not found ");

  const public_id = oldDev.avatar?.public_id;

  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);

    if (result !== "ok")
      return sendError(res, "could not remove image from cloud");
  }

  /// upload image to cloadinary webiste
  if (file) {
    await cloudinary.uploader
      .upload(file.path, {
        gravity: "face",
        height: 500,
        width: 500,
        crop: "thumb",
      })
      .then((result) => {
        console.log(result);
        newDeveloper.avatar = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  }

  oldDev.name = name;
  oldDev.email = email;
  oldDev.about = about;
  oldDev.gender = gender;
  oldDev.skills = skills;

  await oldDev.save();

  res.status(201).json(infoDev(oldDev));
};

exports.removeDev = async (req, res) => {
  const { devID } = req.params;

  if (!isValidObjectId(devID))
    return sendError(res, "Invalid request..id invalid");

  const oldDev = await Developers.findById(devID);

  if (!oldDev)
    return sendError(res, "invalid request developer not found ", 404);

  const public_id = oldDev.avatar?.public_id;

  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);

    if (result !== "ok")
      return sendError(res, "could not remove image from cloud");
  }

  await Developers.findByIdAndDelete(devID);

  res.json({ message: "developer successfully removed" });
};

exports.searchDev = async (req, res) => {
  const { query } = req;

  const name = query.name?.toLowerCase();
  const skills = query.skills?.toLowerCase();

  if (!name) {
    const result = await Developers.find({ skills: skills });
    const developers = result.map((dev) => infoDev(dev));
    res.json(developers);
    ///
  } else if (!skills) {
    const result = await Developers.find({
      $text: { $search: `"${name}"` },
    });

    const developers = result.map((dev) => infoDev(dev));
    res.json(developers);
  }

  const result = await Developers.find({ name: name, skills: skills });

  //   const result = await Developers.find({
  //     $text: { $search: `"${skills}"` },
  //   });

  const developers = result.map((dev) => infoDev(dev));
  res.json(developers);
};

exports.latestDev = async (req, res) => {
  const result = await Developers.find().sort({ createdAt: "-1" }).limit(3);

  const developers = result.map((dev) => infoDev(dev));
  res.json(developers);
};

exports.singleDev = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return sendError(res, "Invalid request..id invalid");

  const singleDev = await Developers.findById(id);

  if (!singleDev)
    return sendError(res, "invalid request developer not found ", 404);

  res.json(infoDev(singleDev));
};
