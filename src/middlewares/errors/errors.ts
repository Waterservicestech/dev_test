import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'Unauthorized':
      res.status(401).json({ message });
      break;
    case 'BadRequest':
      res.status(400).json({ message });
      break;
    case 'NotFound':
      res.status(404).json({ message });
      break;
    case 'hasReadingError':
      res.status(409).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};

export default errorMiddleware;
