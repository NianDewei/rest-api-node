import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'
/*----------------------------------------------------------------- */
import { uploadArchive } from "../helpers/uploads-archives.js"
import { successShowOneResource } from "../http/response/MessageSuccessfull.js"

// Models
import Product from "../models/Product.js"
import User from "../models/User.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const store = async (req, res) => {

    try {
        const nameArchive = await uploadArchive(req.files)
        res.status(201).json({
            data: {
                type: 'upload|Others',
                id: nameArchive,
                attributes: {
                    path: nameArchive,
                }
            },
            jsonapi: {
                version: "1.0.0"
            }
        })

    } catch (message) {
        res.status(400).json({
            error: {
                title: "Error moving file",
                detail: message
            },
            jsonapi: {
                version: "1.0.0"
            }

        })
    }


}

const update = async (req, res) => {
    const { collections, id } = req.params
    let model;

    switch (collections) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                res.status(404).json({
                    error: {
                        title: "Error updating user",
                        detail: 'User not found, verify if the id is correct.',
                        methods: 'PUT',
                        value: id,
                        location: '/uploads/users/:id',
                    },
                    jsonapi: {
                        version: "1.0.0"
                    }
                })
                return
            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                res.status(404).json({
                    error: {
                        title: "Error updating product",
                        detail: 'Product not found, verify if the id is correct.',
                        method: 'PUT',
                        value: id,
                        location: '/uploads/products/:id',
                    },
                    jsonapi: {
                        version: "1.0.0"
                    }
                })
                return
            }
            break

        default:
            res.status(500).json({
                error: {
                    title: "Sorry, we have a problem",
                    detail: 'This collections yet not implemented'
                }
            })
    }

    // clear image previous
    if (model.image || model.avatar) {
        const pathArchive = path.join(__dirname, '../../uploads/', collections, model.image || model.avatar)
        if (fs.existsSync(pathArchive)) {
            fs.unlinkSync(pathArchive)
        }
    }

    const nameArchive = await uploadArchive(req.files, { folder: collections })

    if (collections != "users") {
        model.image = nameArchive
        await model.save()

        const data = { attributes: model, model: collections }
        return successShowOneResource(data, res)
    }

    model.avatar = nameArchive
    await model.save()

    const data = { attributes: model, model: collections }
    successShowOneResource(data, res)
}

const show = async (req, res) => {
    const { collections, id } = req.params
    let model;
    switch (collections) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                res.status(404).json({
                    error: {
                        title: "Error updating user",
                        detail: 'User not found, verify if the id is correct.',
                        methods: 'PUT',
                        value: id,
                        location: '/uploads/image/users/:id',
                    },
                    jsonapi: {
                        version: "1.0.0"
                    }
                })
                return
            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                res.status(404).json({
                    error: {
                        title: "Error updating product",
                        detail: 'Product not found, verify if the id is correct.',
                        method: 'PUT',
                        value: id,
                        location: '/uploads/image/products/:id',
                    },
                    jsonapi: {
                        version: "1.0.0"
                    }
                })
                return
            }
            break

        default:
            res.status(500).json({
                error: {
                    title: "Sorry, we have a problem",
                    detail: 'This collections yet not implemented'
                }
            })
    }

    // clear image previous
    if (model.image || model.avatar) {
        const pathArchive = path.join(__dirname, '../../uploads/', collections, model.image || model.avatar)
        if (fs.existsSync(pathArchive)) {
            //TODO: send file to browser
            return res.status(200).sendFile(pathArchive)
        }
    }

    // TODO: send default image
    const defaultArchive = path.join(__dirname, '../../assets/', 'no-image.jpg')

    res.status(404).sendFile(defaultArchive)
}

export { store, update, show }