const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please enter title"],
    },
    slug: { type: String },
    videoID: { type: String },
    pravachanaID: { type: mongoose.Schema.Types.ObjectId, ref: "Pravachana" },
    ChannelID: {
      type: String,
      required: [true, "please enter ytChannelID"],
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
      required: [true, "please submit thumbnail"],
    },
  },
  { timestamps: true }
);

const video = mongoose.model("video", videoSchema);
module.exports = video;
