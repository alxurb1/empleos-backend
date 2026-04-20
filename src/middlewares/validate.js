export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    let issues;
    if (err.name === "ZodError" || err.errors || err.issues) {
      issues = err.issues || err.errors || JSON.parse(err.message);
      return res.status(400).json({
        error: "Validation Error",
        details: issues,
      });
    }
    return res.status(400).json({
      error: "Validation Error",
      details: [err.message],
    });
  }
};
