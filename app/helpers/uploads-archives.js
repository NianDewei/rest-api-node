import path from 'path'
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const forDefault = ['jpg', 'jpeg', 'png']


const uploadArchive = (files, {allowedExtensions = forDefault,folder=''}) => {

    return new Promise((resolve, reject) => {

        const { archive } = files
        const extensionArchive = archive.name.split('.')
        const extension = extensionArchive[extensionArchive.length - 1]

        // validate extension
        if (!allowedExtensions.includes(extension)) {
            // res.status(400).json({
            //     error: {
            //         title: "File extension not allowed",
            //         extension: extension,
            //         detail: 'This are the allowed extensions: ' + allowedExtensions
            //     },
            //     jsonapi: {
            //         version: "1.0.0"
            //     }
            // })
            return reject("File extension not allowed: "+extension)
           
        }

        const archiveNameForStorage = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../../uploads/',folder, archiveNameForStorage)

        archive.mv(uploadPath, err => {
            if (err) {
                // return res.status(500).json({
                //     error: {
                //         title: "Error moving file",
                //         detail: err
                //     },
                //     jsonapi: {
                //         version: "1.0.0"
                //     }
                // });
                return reject(err)
            }

            // res.status(201).json({
            //     data: {
            //         type: 'upload',
            //         id: archiveNameForStorage,
            //         attributes: {
            //             path: uploadPath,
            //             name: archiveNameForStorage
            //         }
            //     }
            // })
            resolve(archiveNameForStorage)
        })

    })
}

export { uploadArchive }