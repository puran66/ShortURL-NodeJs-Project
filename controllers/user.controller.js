const shortid = require('shortid');
const { userServices } = require('../services');
const { userSchema } = require('../models');

const createUrl = async (req, res) => {
  try {
    const orignalUrl = req.body.orignalUrl;

    if (!orignalUrl) {
      throw new Error("Url Must Required..");
    }

    const shortId = shortid();

    const shortUrl = `http://localhost:4000/${shortId}`;

    const body = {
      orignalUrl: orignalUrl,
      shortUrl: shortUrl,
      clicks: 0
    }

    const newShortUrl = await userServices.createUrl(body);
    // console.log(newShortUrl);

    if (newShortUrl) {
      const data = await userServices.getData();
      res.render('index', { urls: data })
    }
  }
  catch (err) {
    res.status(400).json({
      message: "bad request",
      err
    })
  }
}

// const handleredirectUrl = async (req, res) => {
//   try {
//     const shortId = req.params.shortid;

//     console.log(shortId);

//     if (!shortId) {
//       throw new Error("ID must be provided");
//     }

//     const newgen = await userServices.getUrl(shortId);

//     console.log(newgen);

//     if (!newgen || !newgen.redirectUrl) {
//       throw new Error("No redirect URL found for the provided short ID");
//     }

//     res.redirect(newgen.redirectUrl)
//   } catch (err) {
//     console.log(err, "redirect url error");
//     res.status(400).json({
//       message: "Bad request",
//       error: err.message
//     });
//   }
// }

const redirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;

    // console.log(shortId);
    if (!shortId) {
      throw new Error("shortId must required")
    }

    const exisUrl = await userServices.checkExist(shortId)

    console.log(exisUrl.orignalUrl)

    res.redirect(exisUrl.orignalUrl)
  }
  catch (err) {
    console.log(err, "form the redirectUrl");
  }

}

const homePage = async (req, res) => {

  try {
    const data = await userServices.getData();

    console.log(data);
    res.status(200).render('index', { urls: data })
  }
  catch (err) {
    console.log(err, "from the homepage req");
  }
}

module.exports = { createUrl, homePage, redirectUrl }