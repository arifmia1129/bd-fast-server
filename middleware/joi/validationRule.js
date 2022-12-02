const Joi = require('joi');

exports.registrationValidationRule = Joi.object({
    divisionId: Joi.string()
        .required()
        .trim(),
    districtId: Joi.string()
        .required()
        .trim(),
    upazilaId: Joi.string()
        .required()
        .trim(),
    instituteId: Joi.string()
        .required()
        .trim(),
    dob: Joi.date()
        .greater('1-1-1935')
        .less("now"),
    nid: Joi.string()
        .required()
        .trim()
        .min(10)
        .max(17),
    mobile: Joi.string()
        .required()
        .trim()
        .length(11),
    pin: Joi.string()
        .required()
        .trim()
        .length(8),
    confirmPin: Joi.ref('pin'),
    deviceModel: Joi.string()
        .required()
        .trim(),
    buildNumber: Joi.string()
        .required()
        .trim(),
    userType: Joi.string()
        .required()
        .trim()
        .valid("digitalCenter", "citizen", "upAssistant", "upSecretary", "villagePolice", "shopkeeper", "publicRepresentative")

})

exports.loginValidationRule = Joi.object({
    mobile: Joi.string()
        .required()
        .trim()
        .length(11),
    pin: Joi.string()
        .required()
        .trim()
        .length(8)
})