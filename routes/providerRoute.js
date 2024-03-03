import express from "express"
import {
	createServiceProvider,
	deleteServiceProvider,
	getAllServiceProviders,
	getOneServiceProvider,
	updateServiceProvider,
	SearchServiceProvider_byservice,
	addReviewToServiceProvider,
	getServiceProviderByServiceName,
	getReviewsByServiceProviderAndUser,
	signIn,
	searchByEmail,
	updatePassword,
	getServiceProviders,
} from "../controller/providerContoller.js"
const route = express.Router()

route.post("/create", createServiceProvider)
route.post("/updatepassword", updatePassword)
route.get("/search/:email", searchByEmail)
route.post("/getproviders", getServiceProviders)
route.get("/getone/:id", getOneServiceProvider)

route.put("/update/:id", updateServiceProvider)
route.post("/signin", signIn)
route.get("/getall", getAllServiceProviders)
route.delete("/delete/:id", deleteServiceProvider)
route.post("/search", SearchServiceProvider_byservice)
route.get("/getallquery/:serviceName", getServiceProviderByServiceName)
route.post("/:id/reviews", addReviewToServiceProvider)
route.get(
	"/:serviceProviderId/reviews/:userId",
	getReviewsByServiceProviderAndUser
)

export default route
