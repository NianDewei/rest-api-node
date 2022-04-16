const successUserCreatedOrAuth = (data, res) => {
	/**
	 * data is an object
	 */
	const {
		attributes,
		token,
		message = "User created successfully",
		status = 201
	} = data

	const response = {
		status,
		type: "success",
		message,
		data: {
			attributes,
			token
		},
		jsonapi: {
			version: "1.0.0"
		}
	}

	return res.status(status).json(response)
}

const successCreated = (data, res) => {
	const { attributes, nameModel } = data

	const response = {
		status: 201,
		type: "success",
		message: `${nameModel} created successfully`,
		data: {
			attributes
		},
		jsonapi: {
			version: "1.0.0"
		}
	}

	return res.status(201).json(response)
}

export { successUserCreatedOrAuth, successCreated }
