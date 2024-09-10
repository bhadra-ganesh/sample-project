const Joi = require('joi');

// Registration Schema
const userSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .lowercase()
        .required(),
    
    password: Joi.string()
        .min(6)
        .required(),
    
    status: Joi.string()
        .valid('active', 'inactive')
        .default('active')
});

const userValidator = (data) => {
    return userSchema.validate(data);
}

// Login Schema
const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    
    password: Joi.string()
        .min(6)
        .required()
});

const deleteSchema=Joi.object({
    username: Joi.string()
    .min(3)
    .max(30)
    .required()
})
const deleteValidator = (data)=>{
    return deleteSchema.validate(data);
}
const loginValidator = (data) => {
    return loginSchema.validate(data);
}                                                                                              

module.exports = { userValidator, loginValidator ,deleteValidator};
