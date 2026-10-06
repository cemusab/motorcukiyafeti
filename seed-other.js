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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var getCat, getBrand, cMont, cBot, cEldiven, bRevit, bDainese, prods, _i, prods_1, p, slug, url;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getCat = function (slug) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, prisma.category.upsert({ where: { slug: slug }, update: {}, create: { name: slug.toUpperCase(), slug: slug } })];
                    }); }); };
                    getBrand = function (name) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, prisma.brand.upsert({ where: { slug: name.toLowerCase() }, update: {}, create: { name: name, slug: name.toLowerCase() } })];
                    }); }); };
                    return [4 /*yield*/, getCat('mont')];
                case 1:
                    cMont = _a.sent();
                    return [4 /*yield*/, getCat('bot-ayakkabi')];
                case 2:
                    cBot = _a.sent();
                    return [4 /*yield*/, getCat('eldiven')];
                case 3:
                    cEldiven = _a.sent();
                    return [4 /*yield*/, getBrand('Revit')];
                case 4:
                    bRevit = _a.sent();
                    return [4 /*yield*/, getBrand('Dainese')];
                case 5:
                    bDainese = _a.sent();
                    prods = [
                        { cat: cMont, brand: bRevit, name: 'Sand 4 H2O', price: 15000 },
                        { cat: cMont, brand: bDainese, name: 'Racing 4', price: 18000 },
                        { cat: cBot, brand: bRevit, name: 'Pioneer', price: 9000 },
                        { cat: cEldiven, brand: bDainese, name: 'Carbon 4', price: 5000 },
                    ];
                    _i = 0, prods_1 = prods;
                    _a.label = 6;
                case 6:
                    if (!(_i < prods_1.length)) return [3 /*break*/, 9];
                    p = prods_1[_i];
                    slug = "".concat(p.brand.slug, "-").concat(p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    url = "https://placehold.co/600x600/dc2626/ffffff?text=".concat(encodeURIComponent(p.brand.name + ' ' + p.name));
                    return [4 /*yield*/, prisma.product.upsert({
                            where: { slug: slug },
                            update: {},
                            create: { slug: slug, name: p.name, brandId: p.brand.id, categoryId: p.cat.id, description: 'Test', basePriceMin: p.price, imageUrl: url }
                        })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/];
            }
        });
    });
}
run();
