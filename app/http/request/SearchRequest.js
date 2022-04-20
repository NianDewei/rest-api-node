import { check } from "express-validator"
// my modules || Helpers
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { validateCollections } from "../middleware/SearchParams.js"
validateCollections
// body validations Category    
const SearchRequest = [
    validateCollections,
    MessageErrorRequest
]

export { SearchRequest }