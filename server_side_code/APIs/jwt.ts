import jwt from "jsonwebtoken";
import passport from "passport";
import passportJWT from "passport-jwt";

// # Setting up the authentication and authorization.
let ExtractJwt = passportJWT.ExtractJwt,
  JwtStrategy = passportJWT.Strategy;

export let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: `${process.env.JWT_KEY}`,
};

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log("payload received", jwt_payload);
  if (jwt_payload) {
    next(null, {
      _id: jwt_payload._id,
      userName: jwt_payload,
    });
  } else next(null, false);
});

passport.use(strategy);

export default passport;
