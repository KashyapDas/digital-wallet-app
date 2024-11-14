const zod = require("zod");


const userSchema = zod.object({
    username : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
    email: zod.string().email(),
    password : zod.string(),
})

module.exports = userSchema;