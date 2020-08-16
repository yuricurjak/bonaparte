import jwt from 'jsonwebtoken';

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({
      description: "No token provided",
      error: false,
    });
  }

  const parts = authHeader.split(" ");

  if (!(parts.length === 2)) {
    return response.status(401).send({
      description: "Token error",
      error: false,
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/.test(scheme)) {
    return response.status(401).send({
      description: "Token malformatted",
      error: true,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).send({
        description: "Invalid token",
        error: false,
      });
    }

    request.user_id = decoded.id;
    request.user_username = decoded.username;
    return next();
  });
};
