const successUserCreatedOrAuth = (data, res) => {
	/**
	 * data is an object
	 */
	const {
		code = 201,
		status = "success",
		message = "User created successfully",
		attributes,
		token,
	} = data

	const response = {
		data: {
			status,
			message,
			type: "users",
			uid: attributes._id,
			attributes,
			token
		},
		jsonapi: {
			version: "1.0.0"
		}
	}

	return res.status(code).json(response)
}

const successCreated = (data, res) => {
	const { attributes, nameModel } = data

	const response = {
		data: {
			status: "success",
			message: `${nameModel} created successfully`,
			type: nameModel,
			id: attributes._id,
			attributes
		},
		jsonapi: {
			version: "1.0.0"
		}
	}

	return res.status(201).json(response)
}

const successShowOneResource = (data, res) => {
	/**
	 * data is an object
	 * @attributes is an objec
	 * @model is a string | name of model
	 */
	const { attributes, model } = data
	const isCollectionEmpaty = Boolean(attributes)

	if (!isCollectionEmpaty) {
		const response = {
			links: {
				self: `${process.env.HOST_NAME}/api/v1/${model}`
			},
			data: [],
			jsonapi: {
				version: "1.0.0"
			}
		}
		return res.status(200).json(response)
	}


	const { _id, uid, ...resource } = attributes.toJSON()

	if (model != "users") {
		return res.status(200).json({
			data: {
				type: model,
				id: _id,
				attributes: resource,
				links: {
					self: `${process.env.HOST_NAME}/api/v1/${model}/${_id}`
				}
			},
			jsonapi: {
				version: "1.0.0"
			}
		})
	}

	const response = {
		count: attributes.length,
		data: {
			type: model,
			uid: uid,
			attributes: resource,
			links: {
				self: `${process.env.HOST_NAME}/api/v1/${model}/${attributes._id}`
			}
		},
		jsonapi: {
			version: "1.0.0"
		}
	}

	res.status(200).json(response)
}

const successShowAllResource = (data, res) => {
	/**
	 * data is an object
	 * @attributes is an objec
	 * @model is a string | name of model
	 */
	const { attributes, model } = data
	const isCollectionEmpaty = attributes.length === 0

	if (isCollectionEmpaty) {
		const response = {
			count: 0,
			links: {
				self: `${process.env.HOST_NAME}/api/v1/${model}`
			},
			data: [],
			jsonapi: {
				version: "1.0.0"
			}
		}
		return res.status(200).json(response)
	}

	const collections = attributes.map(resource => {
		const { _id, uid, ...collection } = resource.toJSON()

		if (model != "users") {
			return {
				type: model,
				id: _id,
				attributes: collection,
				links: {
					self: `${process.env.HOST_NAME}/api/v1/${model}/${resource._id}`
				}

			}
		}

		return {
			type: model,
			uid: uid,
			attributes: collection,
			links: {
				self: `${process.env.HOST_NAME}/api/v1/${model}/${resource._id}`
			}
		}

	})


	const response = {
		count: attributes.length,
		data: collections,
		jsonapi: {
			version: "1.0.0"
		}
	}

	res.status(200).json(response)

}

export {
	successUserCreatedOrAuth,
	successCreated,
	successShowOneResource,
	successShowAllResource
}
