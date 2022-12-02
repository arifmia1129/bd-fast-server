exports.runValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            errors: {
                wrap: {
                    label: ""
                }
            }
        })

        if (error) {
            const errorList = error.details.map(err => err.message)
            return res.status(400).json({
                success: false,
                message: "Registration data validation failed",
                error: errorList
            })
        }

        next();
    }
}