const controllers = require("./controllersImport");
const exp = require("express");
const router = exp.Router();
const auth = require("../middlewares/authorization");

router.post('/upload', auth, controllers.uploadPhoto);

router.get("/download/:photo", auth, controllers.downloadPhoto);

router.get("/delete/:photo", auth, controllers.deletePhoto);

router.get("/health", controllers.healthCheck);

router.get("/", controllers.usersDatabase);

router.post("/addUser", controllers.addUser);

router.post("/deleteUser", controllers.deleteUser);

router.get("/photo/:photo", auth, controllers.sendPhoto)

router.get("/thumbnail/:thumb", auth, controllers.sendThumb)

router.get("/progressive/:thumb", auth, controllers.sendProgressiveThumb)

router.get("/photos", auth, controllers.sendPhotos)

router.post("/login", controllers.login)

router.post("/auth", controllers.auth)


module.exports = router;