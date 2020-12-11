// Comment
// Importing dependencies
import Joi from 'joi';

// Comment
// Product validation with joi dependency
const productvalidation = {
    addProduct: async (req, res, next) => {
        let schema = Joi.object({
            name : Joi.string().min(6).max(50).required(),
            price : Joi.number().precision(2).required()
        });
        let { error } = schema.validate(req.body);
        errorFunction(error, res, next);
    }
};

// Comment
// function that handling errors
function errorFunction(error, res, next) {
    if(error){
        return res.status(400).json({
            status : 400,
            message : error.details[0].message
        });
    }
    next();
}

// Comment
// Exporting modules
export default productvalidation;