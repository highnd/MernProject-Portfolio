const technology = require("../utils/technology");

const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      requierd: true,
    },
    about: {
      type: String,
      trim: true,
      required: true,
    },

    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developers",
    },
    releaseDate: {
      type: Date,
      requierd: true,
    },

    status: {
      type: String,
      requierd: true,
      enum: ["public", "private"],
    },

    technology: {
      type: [String],
      requierd: true,
      // enum: technology,
    },

    tags: {
      type: [String],
      requierd: true,
    },
    language: {
      type: [String],
      requierd: true,
    },
    isMultiTheme: {
      type: Boolean,
      requierd: true,
    },

    team: [
      {
        developers: { type: mongoose.Schema.Types.ObjectId, ref: "Developers" },
        roleAs: String,
        leader: Boolean,
      },
    ],
    poster: {
      type: Object,
      url: { type: String, requierd: true },
      public_id: { type: String, requierd: true },
      responsive: [URL],
      requierd: true,
    },

    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Articles", articleSchema);
