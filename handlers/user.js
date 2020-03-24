/* eslint-disable dot-notation */
const axios = require("axios");
const convert = require("xml-js");

const { defaultAPIURL } = require("../config");

/**
 * Router that will check ticket from SSO ITB
 * if the ticket is match, then user is authentication.
 * @param {ticket} req.query User object that's being stored in the request object.
 */
exports.checkSSORedirect = () => {
  return async (req, res, next) => {
    const { ticket } = req.query;
    const redirectURL = `https://${req.headers.host}${req.path}`;

    if (ticket != null) {
      try {
        const response = await axios.get(`${defaultAPIURL}/?ticket=${ticket}`);

        console.log(response);

        return res.redirect(redirectURL);
      } catch (err) {
        console.error(err);

        return res.redirect(redirectURL);
      }
    }

    console.log("A");

    return next();
  };
};
