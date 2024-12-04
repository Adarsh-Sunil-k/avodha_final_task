import dontenv from 'dotenv'

dontenv.config()

export default{
    port : process.env.PORT || 3000,
    db : process.env.DB_URL
   
}