"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var resize_1 = __importDefault(require("../resizeDir/resize"));
// define the endpoint
var router = express_1.default.Router();
router.get('/:imageName', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, width, height, dir, imagePath, resizedImagePath, useResize;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                //define image name parameter and check if the user provide it correctly
                if (!req.params.imageName) {
                    res.status(400).send("You Haven't Provided Valid Image Name");
                }
                console.log(req.params.imageName);
                console.log(typeof (req.params.imageName));
                _a = req.query, width = _a.width, height = _a.height;
                console.log(width, height);
                console.log(typeof (width));
                if ((typeof width === "string" && isNaN(parseInt(width, 10))) || (typeof height === "string" && isNaN(parseInt(height, 10)))) {
                    console.log("Invalid width & height");
                    return [2 /*return*/, res.status(400).send('Invalid width & height')];
                }
                dir = '../images/thumbnails';
                imagePath = path_1.default.join(process.cwd(), "images/source/".concat(req.params.imageName, ".jpg"));
                resizedImagePath = path_1.default.join(process.cwd(), "images/thumbnails/".concat(req.params.imageName, "_w").concat(width, "_h").concat(height, ".jpg"));
                // !fs.existsSync(dir) && fs.mkdirSync(dir);
                // Check if provided image exist in source directory
                if (!fs_1.default.existsSync(imagePath)) {
                    return [2 /*return*/, res.status(400).send('Image does not exist')];
                    console.log("image dose not exist");
                }
                // Check if image was resized with same width and height before
                if (fs_1.default.existsSync(resizedImagePath)) {
                    console.log("return resized image");
                    return [2 /*return*/, res.sendFile(resizedImagePath)];
                }
                //check if url has width and height
                if (!width || !height) {
                    console.log("return source image path");
                    return [2 /*return*/, res.sendFile(imagePath)];
                }
                return [4 /*yield*/, (0, resize_1.default)(req.params.imageName, +width, +height)];
            case 1:
                useResize = _b.sent();
                if (useResize) {
                    console.log("successful!");
                    return [2 /*return*/, res.status(200).sendFile(resizedImagePath)];
                }
                else {
                    console.log("can not resize");
                    return [2 /*return*/, res.status(404).send("Could not resize Image")];
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
