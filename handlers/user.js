/* eslint-disable dot-notation */
const axios = require("axios");
const convert = require("xml-js");

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
        const response = await axios.get(
          `https://login.itb.ac.id/cas/serviceValidate?ticket=${ticket}&service=${redirectURL}`
        );

        console.log(response);

        const result = await JSON.parse(
          convert.xml2json(response.data, { compact: true, spaces: 4 })
        );
        const serviceResponse = result["cas:serviceResponse"];

        if (serviceResponse["cas:authenticationFailure"]) {
          return res.redirect(
            `https://login.itb.ac.id/cas/login?service=${redirectURL}`
          );
        }

        // console.log("success");

        return res.redirect(redirectURL);
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          apiVersion: res.locals.apiVersion,
          error: {
            code: 500,
            message: "Error occured during sign in process"
          }
        });
      }
    }

    console.log("A");

    return next();
  };
};
