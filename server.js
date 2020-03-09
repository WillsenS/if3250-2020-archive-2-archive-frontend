const compression = require("compression");
const next = require("next");
const app = require("express")();
const { parse } = require("url");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const nextApp = next({ dev: true });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Blocked pages.
    app.get(["/_error", "/_document", "/_app"], (req, res) => {
      return res.redirect("/not-found");
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
          ...req.filteredSession
        }
      };
      return handle(req, res, parsedURLObject);
    });

    app.listen(port, "0.0.0.0", err => {
      if (err) throw err;
      console.log(`Server is now listening on port, ${port}`);
    });
  })
  .catch(e => {
    console.log(e);
  });
