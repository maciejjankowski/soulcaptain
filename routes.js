module.exports = function _defineRoutes(deps) {
  if (typeof deps.app === "undefined") {
    throw new Error("requires app dependency");
  } else {
    var app = deps.app;
  }

 
  
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/deck.html", (req, res) => {
    res.render("deck.html");
  });

  app.get("/login.html", (req, res) => {
    res.render("/login.html");
  });

  app.get("/signup.html", (req, res) => {
    res.render("/signup.html");
  });

  app.get("/admin.html", (req, res) => {
    res.render("/admin.html");
  });
  
  app.get("/deckcard.html", (req, res) => {
    res.render("deckcard.html");
  });

  app.get("/habits.html", (req, res) => {
    res.render("habits.html");
  });

  return app;
};
