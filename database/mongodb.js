import mongoose from "mongoose"

const toMongoDB = async () => {

    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Database connected | cafedb")

    } catch (error) {
        console.log(error)
        throw new Error("Error connecting to database")
    }

}

export { toMongoDB}
