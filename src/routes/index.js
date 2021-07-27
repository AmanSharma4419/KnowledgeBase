const { Router } = require("express");
const router = new Router();
const { auth } = require("../middlewares/auth.middleware");
const requestValidator = require("../middlewares/requestValidator.middleware");
const userController = require("../controllers/user.controller")
const userValidator = require("../validators/user.validator");

// For registering the user in knowledgeBase
router.post("/register", requestValidator(userValidator.signUp), userController.signUp);
// For verifying the otp of the user in knowledgeBase
router.post("/verifyOtp", requestValidator(userValidator.verifyOtp), userController.verifyOtp);
// For logging in the user in knowledgeBase
router.post("/login", requestValidator(userValidator.signIn), userController.signIn);
// For listing the category list in knowledgeBase
router.get("/categoryList", userController.listCategory);
// For creating the knowledgebase entery in the db
router.post("/createKnowledgeBase", auth, requestValidator(userValidator.createKnowledgeBase), userController.createKnowledgeBase);
// For listing the data stored as draft in the knowledgebase
router.post("/getAllDraftList", auth, requestValidator(userValidator.getAllDraftList), userController.getAllDraftList);
// For listing the topics from knowledgebase according to category
router.post("/getAllTopicListByCategory", auth, requestValidator(userValidator.getAllTopicListByCategory), userController.getAllTopicListByCategory);
// For listing the all published knowledgebase from db according to topic
router.post("/getAllViewListByTopic", auth, requestValidator(userValidator.getAllViewListByTopic), userController.getAllViewListByTopic);
// For listing the single knowledgebase entery from db according to _id
router.get("/getKnowledgeBaseById/:id", auth, userController.getKnowledgeBaseById);
// For updating the existing knowledgebase according to _id
router.post("/updateKnowledgeBase/:id", auth, requestValidator(userValidator.updateKnowledgeBase), userController.updateKnowledgeBase);

module.exports = router;
