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
        function getBrand(name) {
            return __awaiter(this, void 0, void 0, function () {
                var slug;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            return [4 /*yield*/, prisma.brand.upsert({
                                    where: { slug: slug },
                                    update: {},
                                    create: { name: name, slug: slug }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        var cat, helmets, _i, helmets_1, h, b, slug;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.category.findUnique({ where: { slug: 'kask' } })];
                case 1:
                    cat = _a.sent();
                    if (!cat)
                        return [2 /*return*/];
                    helmets = [
                        { name: 'Neotec 3', brand: 'Shoei', price: 28500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0891/2605/shoei_neotec_3_helmet_matte_black_750x750.jpg' },
                        { name: 'C5', brand: 'Schuberth', price: 31000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0885/8447/schuberth_c5_helmet_matte_black_750x750.jpg' },
                        { name: 'GT-Air 3', brand: 'Shoei', price: 26000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0890/5832/shoei_gt_air_3_helmet_matte_black_750x750.jpg' },
                        { name: 'Pista GP RR', brand: 'AGV', price: 58000, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0430/4348/agv_pista_gp_rr_carbon_helmet_750x750.jpg' },
                        { name: 'K6 S', brand: 'AGV', price: 18500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0885/6561/agv_k6_s_helmet_matte_black_750x750.jpg' },
                        { name: 'RPHA 11 Pro', brand: 'HJC', price: 17500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0172/5698/hjc_rpha11_pro_solid_helmet_semi_flat_black_750x750.jpg' },
                        { name: 'NXR 2', brand: 'Shoei', price: 21500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0358/7625/shoei_rf1400_helmet_matte_black_750x750.jpg' },
                        { name: 'Spartan GT', brand: 'Shark', price: 15500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0887/7542/shark_spartan_rs_helmet_matte_black_750x750.jpg' },
                        { name: 'Exo-1400 Evo', brand: 'Scorpion', price: 14500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0887/1887/scorpion_exo_1400_evo_air_helmet_matte_black_750x750.jpg' },
                        { name: 'FF327 Challenger', brand: 'LS2', price: 8500, img: 'https://wsrv.nl/?url=https://www.revzilla.com/product_images/0401/1000/ls2_challenger_helmet_matte_black_750x750.jpg' }
                    ];
                    _i = 0, helmets_1 = helmets;
                    _a.label = 2;
                case 2:
                    if (!(_i < helmets_1.length)) return [3 /*break*/, 6];
                    h = helmets_1[_i];
                    return [4 /*yield*/, getBrand(h.brand)];
                case 3:
                    b = _a.sent();
                    slug = "".concat(b.slug, "-").concat(h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    return [4 /*yield*/, prisma.product.upsert({
                            where: { slug: slug },
                            update: {},
                            create: {
                                slug: slug,
                                name: h.name,
                                brandId: b.id,
                                categoryId: cat.id,
                                description: "".concat(b.name, " ").concat(h.name, " m\u00FCkemmel \u00F6zelliklere sahip bir motosiklet kask\u0131d\u0131r."),
                                basePriceMin: h.price,
                                imageUrl: h.img,
                            }
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
}
run();
