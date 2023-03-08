import Joi from "joi";

const createEventSchema = Joi.object({
  image: Joi.options({ allowUnknown: true }),
  title: Joi.string().required().messages({
    "string.empty": "Event Name is required"
  }),
  latitude: Joi.number().required().messages({
    "number.base": "Latitude is required"
  }),
  longitude: Joi.number().required().messages({
    "number.base": "Longitude is required"
  }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required"
  }),
  date: Joi.string().required().messages({
    "string.empty": "Date is required"
  }),
  time: Joi.string().required().messages({
    "string.empty": "Time is required"
  }),
  paticipant: Joi.number().required().messages({
    "number.base": "Participant limit is required and must be number"
  }),
  age: Joi.number().required().messages({
    "number.base": "Age is required and must be number"
  }),
  category: Joi.string().required().messages({
    "string.empty": "Category is required"
  }),
  tags: Joi.options({ allowUnknown: true }),
  detail: Joi.string().required().messages({
    "string.empty": "If without any detail, please - in the blank space"
  })
});

const validateCreateEvent = (input) => {
  const { error } = createEventSchema.validate(input, { abortEarly: false });
  console.log({ error });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateCreateEvent;
