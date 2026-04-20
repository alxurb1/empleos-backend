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


export const updateProfileValidators = [
 body('nombreCompleto')
    .optional({ checkFalsy: true })
    .not().matches(/[0-9]/)
    .withMessage('El nombre no puede contener números'),

  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('El formato del email no es válido'),

  body('telefono')
    .optional({ checkFalsy: true })
    .matches(/^[0-9+\-\s]+$/)
    .withMessage('El teléfono solo puede contener números, espacios o el signo +'),

  body('linkedin')
    .optional({ checkFalsy: true })
    .matches(/^https:\/\/(www\.)?linkedin\.com\/.*$/)
    .withMessage('Debe ser un enlace válido de LinkedIn (ej: https://www.linkedin.com/in/usuario)'),

  body('ubicacion')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('La ubicación debe ser un texto válido'),

  body('tituloProfesional')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('El título profesional debe ser un texto válido'),

  body('biografia')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('La biografía debe ser un texto válido'),

  body('habilidades')
    .optional({ checkFalsy: true })
    .isArray()
    .withMessage('Las habilidades deben enviarse en formato de lista')
];


export const experienceValidators = [
  body('job_title')
    .trim()
    .notEmpty().withMessage('El título del cargo es obligatorio'),

  body('company_name')
    .trim()
    .notEmpty().withMessage('El nombre de la empresa es obligatorio'),

  body('start_year')
    .notEmpty().withMessage('El año de inicio es obligatorio')
    .isInt({ min: 1950, max: new Date().getFullYear() })
    .withMessage(`El año de inicio debe ser un número válido entre 1950 y ${new Date().getFullYear()}`),

  body('end_year')
    .optional({ nullable: true, checkFalsy: true }) 
    .isInt({ min: 1950, max: new Date().getFullYear() + 5 })
    .withMessage('El año de finalización debe ser un número válido'),

  body('description')
    .trim()
    .notEmpty().withMessage('La descripción es obligatoria'),
];