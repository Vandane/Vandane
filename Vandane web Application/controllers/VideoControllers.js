const axios = require("axios").default;
const dotenv = require("dotenv").config();
const video = require("../models/YTvideos");
const convertToSlug = require("../utils/slug");

module.exports.addVideo = async (req, res) => {
  try {
    let key = process.env.YT_API_KEY;
    let ChannelID = req.body.ChannelID;
    let pravachanaID = req.body.PravachanaID;
    let url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${ChannelID}&part=snippet,id&order=date&maxResults=100`;
    const resp = await axios.get(url);
    let data = [];
    resp.data.items.forEach((element) => {
      let item = {
        title: element.snippet.title,
        slug: convertToSlug(element.snippet.title),
        videoID: element.id.videoId,
        pravachanaID,
        ChannelID,
        description: element.snippet.description,
        thumbnail: element.snippet.thumbnails.default.url,
      };
      console.log(item);
      data.push(item);
    });
    await video.insertMany(data);
    res.json({msg:"Added successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).json({msg:"Something is wrong!!!"});
  }
};
