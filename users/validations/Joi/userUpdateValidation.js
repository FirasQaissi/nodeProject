const Joi = require("joi");

const userUpdateValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object().keys({
      first: Joi.string().min(2).max(256),
      middle: Joi.string().min(2).max(256).allow(""),
      last: Joi.string().min(2).max(256),
    }),
    isBusiness: Joi.boolean(),
    phone: Joi.string().regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).message(
      'user "phone" must be a valid phone number'
    ),
    email: Joi.string()
      .pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
      .message('user "email" must be a valid email'),
    password: Joi.string()
      .regex(/((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*-]).{7,20})/)
      .message(
        'user "password" must be 7–20 chars and contain uppercase, lowercase, number, and special char !@#$%^&*-'
      ),
    image: Joi.object().keys({
      url: Joi.string()
        .regex(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
        .message("user image must be a valid url")
        .allow(""),
      alt: Joi.string().min(2).max(256).allow(""),
    }),
    address: Joi.object().keys({
      state: Joi.string().allow(""),
      country: Joi.string(),
      city: Joi.string(),
      street: Joi.string(),
      houseNumber: Joi.number(),
      zip: Joi.number(),
    }),
    // שים לב: אין כאן isAdmin או _id !!!
  });

  return schema.validate(user);
};

module.exports = userUpdateValidation;
