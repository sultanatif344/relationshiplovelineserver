const expressJwt = require("express-jwt");
const userService = require("./userservice");

module.exports = jwt;

function jwt() {
  const secret = "secret";
  return expressJwt
    .expressjwt({ secret, algorithms: ["HS256"], isRevoked })
    .unless({
      path: [
        // public routes that don't require authentication
        "/user/authenticate",
        "/user/register",
      ],
    });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
