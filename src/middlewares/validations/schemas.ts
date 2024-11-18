import Joi from 'joi';

export const validateUser = (body: object) => {
  const schemaUser = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const { error, value } = schemaUser.validate(body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.name = 'BadRequest';
    throw err;
  }

  return value;
};

export const validatePost = (body: object) => {
  const schemaPost = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    userId: Joi.number().integer().allow(null),
  });

  const { error, value } = schemaPost.validate(body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.name = 'BadRequest';
    throw err;
  }

  return value;
};
