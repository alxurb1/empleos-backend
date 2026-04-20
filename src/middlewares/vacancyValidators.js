import { body, validationResult } from 'express-validator';

export const runValidations = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      await validation.run(req);
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    
    return res.status(400).json({
      status: 'error',
      errors: errors.array()
    });
  };
};

export const createVacancyValidators = [
  body('title')
    .trim()
    .notEmpty().withMessage('El título del puesto es obligatorio')
    .isLength({ min: 5 }).withMessage('El título debe ser más descriptivo'),

  body(['location', 'contract_type', 'experience_level'])
    .notEmpty().withMessage('Este campo es obligatorio'),

  body('salary_min')
    .notEmpty().withMessage('El salario mínimo es obligatorio')
    .isFloat({ min: 0 }).withMessage('El salario debe ser un número positivo'),

  body('salary_max')
    .notEmpty().withMessage('El salario máximo es obligatorio')
    .isFloat({ min: 0 }).withMessage('El salario debe ser un número positivo')
    .custom((value, { req }) => {
      if (parseFloat(value) < parseFloat(req.body.salary_min)) {
        throw new Error('El salario máximo no puede ser menor al salario mínimo');
      }
      return true;
    }),

  body(['description', 'requirements', 'benefits'])
    .trim()
    .notEmpty().withMessage('Este campo no puede estar vacío')
    .isLength({ min: 20 }).withMessage('Por favor, proporciona una descripción más detallada'),
];