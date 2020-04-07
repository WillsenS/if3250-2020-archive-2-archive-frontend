/* eslint-disable no-console */
/* eslint-disable dot-notation */
const axios = require("axios");

const { defaultAPIURL } = require("../config");

const validateStatus = () => true;
axios.defaults.withCredentials = true;
const withCredentials = true;

/**
 * Router that will check ticket from SSO ITB
 * if the ticket is match, then user is authentication.
 * @param {ticket} req.query User object that's being stored in the request object.
 */
exports.checkSSORedirect = () => {
  return async (req, res, next) => {
    const { ticket } = req.query;
    const redirectURL = `https://${req.headers.host}${req.path}`;
    // const redirectURL = `https://demoapp.my.id`;

    if (ticket != null) {
      try {
        const url = `${defaultAPIURL}/?ticket=${ticket}`;

        const { data: response } = await axios({
          url,
          method: "get",
          validateStatus,
          withCredentials
        });

        console.log(response);

        res.cookie("token", response.token, { httpOnly: true });

        return res.redirect(redirectURL);
      } catch (err) {
        console.error(err);

        return res.redirect(redirectURL);
      }
    }

    return next();
  };
};
