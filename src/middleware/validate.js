export const validate = function (schema) {
  return (req, res, next) => {
    const input = {
      body: req.body,
      query: req.query,
      params: req.params
    };
    const { error, value } = schema.validate(input, {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    });
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((detail) => detail.message)
      });
    }
    req.body = value.body;
    req.validatedQuery = value.query;
    req.validatedParams = value.params;
    next();
  };
}
