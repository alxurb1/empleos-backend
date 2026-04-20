import { body, validationResult } from 'express-validator';

export const runValidations = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      await validation.run(req); 
    }
    
    const errors = validationResult(req); 
    
    if (errors.isEmpty()) {
      return next();
    }
    
    return res.status(400).json({
      status: 'error', 
      errors: errors.array() 
    });
  };
};

export const updateCompanyValidators = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre de la empresa es obligatorio'),

  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('El formato del email no es válido'),

  body('telefono')
    .optional({ checkFalsy: true })
    .matches(/^[0-9+\-\s]+$/)
    .withMessage('El teléfono solo puede contener números, espacios o el signo +'),

  body('website')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Debe ser una URL válida (ej: https://www.ejemplo.com)'),

  body('linkedin_url')
    .optional({ checkFalsy: true })
    .matches(/^https:\/\/(www\.)?linkedin\.com\/.*$/)
    .withMessage('Debe ser un enlace válido de LinkedIn'),

  body(['sector', 'size', 'location', 'description', 'mission', 'vision'])
    .optional({ checkFalsy: true })
    .isString()
    .trim()
];