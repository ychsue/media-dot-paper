'use strict';

var cordova$1 = require('cordova');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function execAsync(action, args) {
    return new Promise(function (resolve, reject) {
        cordova$1.exec(resolve, reject, "AdMob" /* Service */, action, args);
    });
}
function fireDocumentEvent(eventName, data) {
    if (data === void 0) { data = null; }
    var event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}
function waitEvent(successEvent, failEvent) {
    if (failEvent === void 0) { failEvent = ''; }
    return new Promise(function (resolve, reject) {
        document.addEventListener(successEvent, function (event) {
            resolve(event);
        }, false);
        if (failEvent) {
            document.addEventListener(failEvent, function (failedEvent) {
                reject(failedEvent);
            }, false);
        }
    });
}
var AdBase = /** @class */ (function () {
    function AdBase(state) {
        this.state = state;
    }
    Object.defineProperty(AdBase.prototype, "testAdUnitID", {
        get: function () {
            switch (this.state.platform) {
                case "android" /* android */:
                    return this.testIdForAndroid;
                case "ios" /* ios */:
                    return this.testIdForIOS;
                default:
                    return 'test';
            }
        },
        enumerable: true,
        configurable: true
    });
    AdBase.prototype.resolveAdUnitID = function (adUnitID) {
        if (adUnitID === 'test' || this.state.devMode) {
            return this.testAdUnitID;
        }
        if (!adUnitID) {
            throw new Error('adUnitID is missing');
        }
        if (typeof adUnitID === 'string') {
            return adUnitID;
        }
        return adUnitID[this.state.platform];
    };
    return AdBase;
}());

var Banner = /** @class */ (function (_super) {
    __extends(Banner, _super);
    function Banner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.testIdForAndroid = "ca-app-pub-3940256099942544/6300978111" /* banner_android */;
        _this.testIdForIOS = "ca-app-pub-3940256099942544/2934735716" /* banner_ios */;
        return _this;
    }
    Banner.prototype.show = function (opts) {
        if (opts === void 0) { opts = {}; }
        return execAsync("banner_show" /* banner_show */, [
            __assign({}, opts, { adUnitID: this.resolveAdUnitID(opts.id) }),
        ]);
    };
    Banner.prototype.hide = function () {
        return execAsync("banner_hide" /* banner_hide */);
    };
    return Banner;
}(AdBase));

var Interstitial = /** @class */ (function (_super) {
    __extends(Interstitial, _super);
    function Interstitial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.testIdForAndroid = "ca-app-pub-3940256099942544/1033173712" /* interstitial_android */;
        _this.testIdForIOS = "ca-app-pub-3940256099942544/4411468910" /* interstitial_ios */;
        return _this;
    }
    Interstitial.prototype.load = function (opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execAsync("interstitial_load" /* interstitial_load */, [
                            __assign({}, opts, { adUnitID: this.resolveAdUnitID(opts.id) }),
                        ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, waitEvent("admob.interstitial.load" /* interstitial_load */, "admob.interstitial.load_fail" /* interstitial_load_fail */)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Interstitial.prototype.show = function () {
        return execAsync("interstitial_show" /* interstitial_show */);
    };
    return Interstitial;
}(AdBase));

var RewardVideo = /** @class */ (function (_super) {
    __extends(RewardVideo, _super);
    function RewardVideo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.testIdForAndroid = "ca-app-pub-3940256099942544/5224354917" /* reward_video_android */;
        _this.testIdForIOS = "ca-app-pub-3940256099942544/1712485313" /* reward_video_ios */;
        return _this;
    }
    RewardVideo.prototype.isReady = function () {
        return execAsync("reward_video_is_ready" /* reward_video_is_ready */);
    };
    RewardVideo.prototype.load = function (opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execAsync("reward_video_load" /* reward_video_load */, [
                            __assign({}, opts, { adUnitID: this.resolveAdUnitID(opts.id) }),
                        ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, waitEvent("admob.reward_video.load" /* reward_video_load */, "admob.reward_video.load_fail" /* reward_video_load_fail */)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RewardVideo.prototype.show = function () {
        return execAsync("reward_video_show" /* reward_video_show */);
    };
    return RewardVideo;
}(AdBase));

var AdMobState = /** @class */ (function () {
    function AdMobState() {
        this.devMode = false;
        this.platform = typeof cordova !== 'undefined' ? cordova.platformId : '';
    }
    return AdMobState;
}());

var AdMob = /** @class */ (function () {
    function AdMob() {
        var _this = this;
        var state = new AdMobState();
        this.state = state;
        this.banner = new Banner(state);
        this.interstitial = new Interstitial(state);
        this.rewardVideo = new RewardVideo(state);
        document.addEventListener('deviceready', function () {
            _this.ready();
        }, false);
    }
    AdMob.prototype.setAppMuted = function (value) {
        return execAsync("set_app_muted" /* set_app_muted */, [value]);
    };
    AdMob.prototype.setAppVolume = function (value) {
        return execAsync("set_app_volume" /* set_app_volume */, [value]);
    };
    AdMob.prototype.setDevMode = function (value) {
        this.state.devMode = value;
    };
    AdMob.prototype.ready = function () {
        var _this = this;
        cordova$1.exec(function (event) {
            _this.state.applicationId = event.data.applicationId;
            fireDocumentEvent(event.type, event.data);
        }, function (err) {
            alert(err);
        }, "AdMob" /* Service */, "ready" /* ready */);
    };
    return AdMob;
}());
var admob = new AdMob();

module.exports = admob;
//# sourceMappingURL=admob.js.map
