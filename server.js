/* eslint-disable no-console */
const compression = require("compression");
const next = require("next");
const app = require("express")();
const { parse } = require("url");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;
const nextApp = next({ dev: true });
const handle = nextApp.getRequestHandler();
const { checkSSORedirect } = require("./handlers/user");
const { defaultURL } = require("./config");
const { getAuthArchive } = require("./resources/auth");

nextApp
  .prepare()
  .then(() => {
    app.use(cookieParser(process.env.COOKIE_SECRET || "cookie_secret"));

    app.use(compression());
    app.use(checkSSORedirect());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/login", (req, res) => {
      res.redirect(`https://login.itb.ac.id/cas/login?service=${defaultURL}`);
    });

    // Blocked pages.
    app.get(["/_error", "/_document", "/_app"], (req, res) => {
      return res.redirect("/not-found");
    });

    app.get("/arsip/detail/:archiveId", async (req, res) => {
      const query = {
        ...req.params,
        ...req.query,
      };

      const token = req && req.cookies ? req.cookies.token : null;
      const { archiveId } = req.params;

      const response = await getAuthArchive(archiveId, token);

      if (response.error) {
        switch (response.error.code) {
          case 401:
            return nextApp.render(req, res, "/arsip/pinjam", query);
          default:
            break;
        }
      } else {
        return nextApp.render(req, res, "/arsip/detail", query);
      }
    });

    app.use((req, res, next) => {
      if (req.url.startsWith("/_private")) {
        return res.redirect("/not-found");
      }
      return next();
    });

    // Start the default Next handler.
    app.get("*", (req, res) => {
      const parsedURL = parse(req.url, true);
      const parsedURLObject = {
        ...parsedURL,
        query: {
          ...parsedURL.query,
          ...req.filteredSession,
        },
      };
      return handle(req, res, parsedURLObject);
    });

    app.listen(port, "0.0.0.0", (err) => {
      if (err) throw err;
      console.log(`Server is now listening on port, ${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
