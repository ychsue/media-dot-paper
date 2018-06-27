(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container{\r\n    display: -ms-grid;\r\n    display: grid;\r\n        -ms-grid-rows: auto 1fr;\r\n        grid-template-rows: auto 1fr;\r\n    height: 100vh;\r\n        grid-template-areas: \"navbar\" \"content\";\r\n}\r\n\r\napp-navbar{\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: navbar;\r\n    color: white;\r\n}\r\n\r\n.content{\r\n    -ms-grid-row: 2;\r\n    -ms-grid-column: 1;\r\n    grid-area: content;\r\n    overflow-y: auto;\r\n}\r\n\r\n.page{\r\n    width: 100%;\r\n    height: 100%;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <app-navbar class=\"mat-elevation-z6\"></app-navbar>\n  <div class=\"content\">\n    <!-- <router-outlet></router-outlet> -->\n    <app-home class=\"page\" [style.display]=\"(gv.shownPage===pageType.Home)?'block':'none'\"></app-home>\n    <app-media-edit class=\"page\" [style.display]=\"(gv.shownPage===pageType.MediaEdit)?'block':'none'\"></app-media-edit>\n    <app-test class=\"page\" [style.display]=\"(gv.shownPage===pageType.Test)?'block':'none'\"></app-test>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/youtube.service */ "./src/app/services/youtube.service.ts");
/* harmony import */ var src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/gv.service */ "./src/app/services/gv.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(msgService, gv, ytService) {
        this.msgService = msgService;
        this.gv = gv;
        this.ytService = ytService;
        // title = window['cordova'].platformId;
        this.title = 'Angular';
        this.pageType = src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_3__["PageType"];
        msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Error, message: document.location.toString() });
        msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Warn, message: 'Test 2' });
        msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Info, message: 'Test 321' });
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.ytService.embedApiScript();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"], src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_3__["GvService"], src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message/message.component */ "./src/app/message/message.component.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/home/home.component */ "./src/app/pages/home/home.component.ts");
/* harmony import */ var _pages_test_test_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/test/test.component */ "./src/app/pages/test/test.component.ts");
/* harmony import */ var _pipes_safe_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pipes/safe.pipe */ "./src/app/pipes/safe.pipe.ts");
/* harmony import */ var _pages_media_edit_media_edit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/media-edit/media-edit.component */ "./src/app/pages/media-edit/media-edit.component.ts");
/* harmony import */ var _components_me_main_dashboard_me_main_dashboard_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/me-main-dashboard/me-main-dashboard.component */ "./src/app/components/me-main-dashboard/me-main-dashboard.component.ts");
/* harmony import */ var _components_me_section_dashboard_me_section_dashboard_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/me-section-dashboard/me-section-dashboard.component */ "./src/app/components/me-section-dashboard/me-section-dashboard.component.ts");
/* harmony import */ var _components_me_mani_plate_me_mani_plate_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/me-mani-plate/me-mani-plate.component */ "./src/app/components/me-mani-plate/me-mani-plate.component.ts");
/* harmony import */ var _components_player_player_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/player/player.component */ "./src/app/components/player/player.component.ts");
/* harmony import */ var _services_media_edit_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/media-edit.service */ "./src/app/services/media-edit.service.ts");
/* harmony import */ var _services_youtube_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services/youtube.service */ "./src/app/services/youtube.service.ts");
/* harmony import */ var src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/services/gv.service */ "./src/app/services/gv.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _message_message_component__WEBPACK_IMPORTED_MODULE_3__["MessageComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"],
                _pages_home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"],
                _pages_test_test_component__WEBPACK_IMPORTED_MODULE_9__["TestComponent"],
                _pipes_safe_pipe__WEBPACK_IMPORTED_MODULE_10__["SafePipe"],
                _pages_media_edit_media_edit_component__WEBPACK_IMPORTED_MODULE_11__["MediaEditComponent"],
                _components_me_main_dashboard_me_main_dashboard_component__WEBPACK_IMPORTED_MODULE_12__["MeMainDashboardComponent"],
                _components_me_section_dashboard_me_section_dashboard_component__WEBPACK_IMPORTED_MODULE_13__["MeSectionDashboardComponent"],
                _components_me_mani_plate_me_mani_plate_component__WEBPACK_IMPORTED_MODULE_14__["MeManiPlateComponent"],
                _components_player_player_component__WEBPACK_IMPORTED_MODULE_15__["PlayerComponent"]
            ],
            entryComponents: [_message_message_component__WEBPACK_IMPORTED_MODULE_3__["MessageComponent"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatBottomSheetModule"]
            ],
            providers: [_services_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"], _services_media_edit_service__WEBPACK_IMPORTED_MODULE_16__["MediaEditService"], _services_youtube_service__WEBPACK_IMPORTED_MODULE_17__["YoutubeService"], src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_18__["GvService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/me-main-dashboard/me-main-dashboard.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/components/me-main-dashboard/me-main-dashboard.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/me-main-dashboard/me-main-dashboard.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/components/me-main-dashboard/me-main-dashboard.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='container'>\n  <button mat-icon-button (click)=\"onPlay()\" *ngIf=\"dataService.state !== mEState.playing\">\n      <mat-icon class=\"mat-18\">play_arrow</mat-icon>\n  </button>\n  <button mat-icon-button (click)=\"onPause()\" *ngIf=\"dataService.state===mEState.playing\">\n    <mat-icon class=\"mat-18\">pause</mat-icon>\n  </button>\n</div>"

/***/ }),

/***/ "./src/app/components/me-main-dashboard/me-main-dashboard.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/components/me-main-dashboard/me-main-dashboard.component.ts ***!
  \*****************************************************************************/
/*! exports provided: MeMainDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeMainDashboardComponent", function() { return MeMainDashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/media-edit.service */ "./src/app/services/media-edit.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MeMainDashboardComponent = /** @class */ (function () {
    function MeMainDashboardComponent(dataService) {
        this.dataService = dataService;
        this.mEState = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"];
        this.pAction = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"];
        this._action = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].none;
    }
    Object.defineProperty(MeMainDashboardComponent.prototype, "action", {
        get: function () {
            return this._action;
        },
        set: function (v) {
            this.dataService.onPlayerAction.next(v);
            this._action = v;
        },
        enumerable: true,
        configurable: true
    });
    MeMainDashboardComponent.prototype.ngOnInit = function () {
    };
    MeMainDashboardComponent.prototype.onPlay = function () {
        this.action = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play;
    };
    MeMainDashboardComponent.prototype.onPause = function () {
        this.action = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause;
    };
    MeMainDashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-me-main-dashboard',
            template: __webpack_require__(/*! ./me-main-dashboard.component.html */ "./src/app/components/me-main-dashboard/me-main-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./me-main-dashboard.component.css */ "./src/app/components/me-main-dashboard/me-main-dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"]])
    ], MeMainDashboardComponent);
    return MeMainDashboardComponent;
}());



/***/ }),

/***/ "./src/app/components/me-mani-plate/me-mani-plate.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/components/me-mani-plate/me-mani-plate.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/me-mani-plate/me-mani-plate.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/me-mani-plate/me-mani-plate.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>For me-mani-plate</p>"

/***/ }),

/***/ "./src/app/components/me-mani-plate/me-mani-plate.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/me-mani-plate/me-mani-plate.component.ts ***!
  \*********************************************************************/
/*! exports provided: MeManiPlateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeManiPlateComponent", function() { return MeManiPlateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/media-edit.service */ "./src/app/services/media-edit.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MeManiPlateComponent = /** @class */ (function () {
    function MeManiPlateComponent(dataService) {
        this.dataService = dataService;
    }
    MeManiPlateComponent.prototype.ngOnInit = function () {
    };
    MeManiPlateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-me-mani-plate',
            template: __webpack_require__(/*! ./me-mani-plate.component.html */ "./src/app/components/me-mani-plate/me-mani-plate.component.html"),
            styles: [__webpack_require__(/*! ./me-mani-plate.component.css */ "./src/app/components/me-mani-plate/me-mani-plate.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"]])
    ], MeManiPlateComponent);
    return MeManiPlateComponent;
}());



/***/ }),

/***/ "./src/app/components/me-section-dashboard/me-section-dashboard.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/components/me-section-dashboard/me-section-dashboard.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/me-section-dashboard/me-section-dashboard.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/components/me-section-dashboard/me-section-dashboard.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  me-section-dashboard works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/me-section-dashboard/me-section-dashboard.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/components/me-section-dashboard/me-section-dashboard.component.ts ***!
  \***********************************************************************************/
/*! exports provided: MeSectionDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeSectionDashboardComponent", function() { return MeSectionDashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MeSectionDashboardComponent = /** @class */ (function () {
    function MeSectionDashboardComponent() {
    }
    MeSectionDashboardComponent.prototype.ngOnInit = function () {
    };
    MeSectionDashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-me-section-dashboard',
            template: __webpack_require__(/*! ./me-section-dashboard.component.html */ "./src/app/components/me-section-dashboard/me-section-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./me-section-dashboard.component.css */ "./src/app/components/me-section-dashboard/me-section-dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MeSectionDashboardComponent);
    return MeSectionDashboardComponent;
}());



/***/ }),

/***/ "./src/app/components/player/player.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/player/player.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "video{\r\n    height: 100%;\r\n    width: auto;\r\n    max-width: 100%;\r\n    background: transparent no-repeat;\r\n    /* For windows, it should be '/www/...' and for android is '/android_asset/www/...' */\r\n    /* Now I declare it in html file */\r\n    background-size: contain;\r\n    background-position: center;\r\n}\r\n\r\n.container, #youtube {\r\n    width: 100%;\r\n    height: 100%\r\n}"

/***/ }),

/***/ "./src/app/components/player/player.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/player/player.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <video #video [style.display]=\"(dataService.pType===pType.url||dataService.pType===pType.file)?'block':'none'\"\n  poster=\"data:image/gif;base64,AAAA\" [style.background-image]=\"'url(\\'assets/MusicNotes.svg\\')'\"\n  [src]=\"videoSrc|safe\"></video>\n  <iframe #youtube id=\"youtube\" [style.display]=\"(dataService.pType===pType.youtubeID)?'block':'none'\"></iframe>\n</div>"

/***/ }),

/***/ "./src/app/components/player/player.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/player/player.component.ts ***!
  \*******************************************************/
/*! exports provided: PlayerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerComponent", function() { return PlayerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/media-edit.service */ "./src/app/services/media-edit.service.ts");
/* harmony import */ var src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/youtube.service */ "./src/app/services/youtube.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_services_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PlayerComponent = /** @class */ (function () {
    function PlayerComponent(dataService, YTservice, msgService, ngZone) {
        this.dataService = dataService;
        this.YTservice = YTservice;
        this.msgService = msgService;
        this.ngZone = ngZone;
        this.pType = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerType"];
        this.unSubscribed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.isInited = false;
    }
    Object.defineProperty(PlayerComponent.prototype, "ytVId", {
        get: function () {
            return this._ytVId;
        },
        set: function (v) {
            this.YTservice.loadURLforPlayer(this.youtubeEle, v);
            this._ytVId = v;
        },
        enumerable: true,
        configurable: true
    });
    PlayerComponent.prototype.ngOnInit = function () {
        this.videoEle = this.ngVideo.nativeElement;
        this.youtubeEle = this.ngYoutube.nativeElement;
        this.eventTriggers();
        this.eventListeners();
        // * [2018-06-18 20:57] because this component might be initialized after the MEState.readyForPlayer, I need to deal with this situation
        if ((this.dataService.state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].readyForPlayer) && (this.isInited === false)) {
            this.initMe();
            this.isInited = true;
        }
    };
    PlayerComponent.prototype.ngOnDestroy = function () {
        this.unSubscribed.next(true);
        this.unSubscribed.complete();
    };
    PlayerComponent.prototype.eventListeners = function () {
        var self = this;
        // * For readyForPlayer
        this.dataService.onStateChanged
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (t) {
            if (t === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].readyForPlayer) {
                if (self.isInited === false) {
                    self.isInited = true;
                }
                self.initMe();
            }
        });
        // * For playerAction
        this.dataService.onPlayerAction
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (t) {
            if (self.dataService.pType === self.pType.url || self.dataService.pType === self.pType.file) {
                switch (t) {
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play:
                        self.videoEle.play();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause:
                        self.videoEle.pause();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].seek:
                        self.videoEle.currentTime = self.dataService.currentTime;
                        break;
                    default:
                        break;
                }
            }
            else if (self.dataService.pType === self.pType.youtubeID) {
                switch (t) {
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play:
                        self.YTservice.ytPlayer.playVideo();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause:
                        self.YTservice.ytPlayer.pauseVideo();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].seek:
                        self.YTservice.ytPlayer.seekTo(self.dataService.currentTime, true);
                        break;
                    default:
                        break;
                }
            }
        });
        // * [2018-06-26 15:53] For Youtube stateChange
        self.YTservice.onStateChange
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unSubscribed))
            .subscribe(function (ev) {
            switch (ev.data) {
                case YT.PlayerState.PLAYING:
                    self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing;
                    break;
                case YT.PlayerState.PAUSED:
                    self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].paused;
                    break;
                default:
                    break;
            }
        });
        // * [2018-06-26 16:50] For Youtube Ready
        self.YTservice.onReady
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unSubscribed))
            .subscribe(function (ev) {
            self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].canPlay;
        });
    };
    PlayerComponent.prototype.eventTriggers = function () {
        var self = this;
        // * [2018-06-18 11:11] for MEState.canPlay
        this.videoEle.oncanplay = function (ev) {
            self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].canPlay;
        };
        // * [2018-06-18 11:11] for MEState.error
        this.videoEle.onerror = function (ev) {
            self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].error;
        };
        // * [2018-06-18 11:11] for MEState.waiting
        this.videoEle.onwaiting = function (ev) {
            self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].waiting;
        };
        // * [2018-06-18 11:11] for MEState.playing
        this.videoEle.onplay = function (ev) {
            self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing;
        };
        this.videoEle.onplaying = function (ev) {
            self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing;
        };
        // * [2018-06-18 11:11] for MEState.paused
        this.videoEle.onpause = function (ev) {
            self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].paused;
        };
        // * [2018-06-18 11:11] for MEState.stopped
        this.videoEle.onended = function (ev) {
            self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].stopped;
        };
        // ************************* TODO *****************************
    };
    PlayerComponent.prototype.initMe = function () {
        // ******* TODO *******
        if (this.dataService.pType === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerType"].url) {
            if (src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].isYoutubeURL(this.dataService.urlOrId)) {
                this.dataService.pType = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerType"].youtubeID;
                this.ytVId = src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].getYTId(this.dataService.urlOrId);
            }
            else {
                this.videoSrc = this.dataService.urlOrId;
            }
        }
        else if (this.dataService.pType === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerType"].youtubeID) {
            if (src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].isYoutubeURL(this.dataService.urlOrId)) {
                this.ytVId = src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].getYTId(this.dataService.urlOrId);
            }
            else {
                this.ytVId = this.dataService.urlOrId;
            }
        }
        else if (this.dataService.pType === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerType"].file) {
            this.videoSrc = this.dataService.urlOrId;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('video'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], PlayerComponent.prototype, "ngVideo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('youtube'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], PlayerComponent.prototype, "ngYoutube", void 0);
    PlayerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-player',
            template: __webpack_require__(/*! ./player.component.html */ "./src/app/components/player/player.component.html"),
            styles: [__webpack_require__(/*! ./player.component.css */ "./src/app/components/player/player.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"], src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"],
            src_app_services_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]])
    ], PlayerComponent);
    return PlayerComponent;
}());



/***/ }),

/***/ "./src/app/message/message.component.css":
/*!***********************************************!*\
  !*** ./src/app/message/message.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.Error{\r\n    background-color: red;\r\n    color: white;\r\n    text-shadow: 1px 1px 1px black;\r\n}\r\n\r\n.Warn{\r\n    background-color: yellow;\r\n    color: blue;\r\n    text-shadow: 1px 1px 1px green;\r\n}\r\n\r\n.Info{\r\n    background-color: lightblue;\r\n    color: green;\r\n    text-shadow: 1px 1px 1px black;\r\n}"

/***/ }),

/***/ "./src/app/message/message.component.html":
/*!************************************************!*\
  !*** ./src/app/message/message.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n    <ol>\n        <li *ngFor=\"let msg of messages\">\n          <span [textContent]=\"msg.message\" [class.Info]=\"msg.type==msgType.Info\" [class.Warn]=\"msg.type==msgType.Warn\" [class.Error]=\"msg.type==msgType.Error\"></span>\n        </li>\n    </ol>\n</div>\n"

/***/ }),

/***/ "./src/app/message/message.component.ts":
/*!**********************************************!*\
  !*** ./src/app/message/message.component.ts ***!
  \**********************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessageComponent = /** @class */ (function () {
    function MessageComponent(bottomSheetRef, msgService) {
        this.bottomSheetRef = bottomSheetRef;
        this.msgService = msgService;
        this.msgType = _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"];
    }
    MessageComponent.prototype.showMsgs = function (num) {
        if (num === void 0) { num = 20; }
        this.messages = this.msgService.readMessages();
    };
    MessageComponent.prototype.ngOnInit = function () {
    };
    MessageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-message',
            template: __webpack_require__(/*! ./message.component.html */ "./src/app/message/message.component.html"),
            styles: [__webpack_require__(/*! ./message.component.css */ "./src/app/message/message.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBottomSheetRef"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"]])
    ], MessageComponent);
    return MessageComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/*!*********************************************!*\
  !*** ./src/app/navbar/navbar.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav{\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    align-items: center;\r\n    padding: 8px 16px;\r\n    background: #673ab7;\r\n}\r\n\r\n.flex-spacer{\r\n    flex-grow: 1;\r\n}"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"docs-navbar-header\">\n  <span>abc</span>\n  <div class=\"flex-spacer\"></div>\n  <button mat-icon-button [matBadge]=\"nUnReadMsg\" (click)=\"showMsgsAtBottom()\" *ngIf=\"nUnReadMsg!=0\">\n    <mat-icon class=\"mat-18\">event_note</mat-icon>\n  </button>\n</nav>"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../message/message.component */ "./src/app/message/message.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(bottomSheet, ngZone, msgService) {
        this.bottomSheet = bottomSheet;
        this.ngZone = ngZone;
        this.msgService = msgService;
        this.nUnReadMsg = 0;
        var self = this;
        this.nUnReadMsg = msgService.getNUnRead();
        msgService.remindMsgIn.subscribe(function (n) {
            var isInZone = _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"].isInAngularZone();
            var action = function () { self.nUnReadMsg = n; };
            if (isInZone === false) {
                ngZone.run(action);
            }
            else {
                action();
            }
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.showMsgsAtBottom = function () {
        var ref = this.bottomSheet.open(_message_message_component__WEBPACK_IMPORTED_MODULE_3__["MessageComponent"]);
        ref.instance.showMsgs();
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBottomSheet"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/pages/home/home.component.css":
/*!***********************************************!*\
  !*** ./src/app/pages/home/home.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/home/home.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <button mat-raised-button (click)=\"gv.shownPage = pageType.Test\">Test</button>\r\n</div>\r\n<div>\r\n    <button mat-raised-button (click)=\"onNormalAudio()\">media-edit from texts</button>\r\n</div>\r\n<div>\r\n    <mat-form-field>\r\n        <input matInput #iURL [value]=\"testYoutubeUrl\">\r\n    </mat-form-field>\r\n    <button mat-icon-button (click)=\"onInputURL(iURL.value)\">\r\n            <mat-icon class=\"mat-18\">play_arrow</mat-icon>\r\n        </button>\r\n</div>\r\n<div>\r\n    <input #selFile type=\"file\" accept=\"video/*, audio/*\" (change)=\"onFileSelect(selFile.files)\">\r\n    <!-- <a [routerLink]=\"'/media-edit/0'\">media-edit from blob</a> -->\r\n</div>"

/***/ }),

/***/ "./src/app/pages/home/home.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/gv.service */ "./src/app/services/gv.service.ts");
/* harmony import */ var src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/media-edit.service */ "./src/app/services/media-edit.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = /** @class */ (function () {
    function HomeComponent(gv, meService) {
        this.gv = gv;
        this.meService = meService;
        this.testUrl = 'https://dzxuyknqkmi1e.cloudfront.net/odb/2018/06/odb-06-12-18.mp3';
        this.testYoutubeUrl = 'https://youtu.be/f1SZ5GaAp3g';
        this.pageType = src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"];
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.onNormalAudio = function () {
        this.meService.initMe(this.testUrl);
        this.gv.shownPage = src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"].MediaEdit;
    };
    HomeComponent.prototype.onInputURL = function (inURL) {
        this.meService.initMe(inURL);
        this.gv.shownPage = src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"].MediaEdit;
    };
    HomeComponent.prototype.onFileSelect = function (files) {
        if (files !== null && files.length > 0) {
            var file = files[0];
            this.meService.initMe(file);
            this.gv.shownPage = src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"].MediaEdit;
        }
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/pages/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/pages/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_gv_service__WEBPACK_IMPORTED_MODULE_1__["GvService"], src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__["MediaEditService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/pages/media-edit/media-edit.component.css":
/*!***********************************************************!*\
  !*** ./src/app/pages/media-edit/media-edit.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n    display: -ms-grid;\r\n    display: grid;\r\n        -ms-grid-rows: auto 1fr auto auto;\r\n        grid-template-rows: auto 1fr auto auto;\r\n        grid-template-areas: \"header\" \"main\" \"cSection\" \"cMain\";\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\n\r\nheader {\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: header;\r\n}\r\n\r\n.main {\r\n    -ms-grid-row: 2;\r\n    -ms-grid-column: 1;\r\n    grid-area: main;\r\n    overflow: hidden;\r\n    width:100%;\r\n}\r\n\r\n.dashboardSection {\r\n    -ms-grid-row: 3;\r\n    -ms-grid-column: 1;\r\n    grid-area: cSection;\r\n}\r\n\r\n.dashboardMain {\r\n    -ms-grid-row: 4;\r\n    -ms-grid-column: 1;\r\n    grid-area: cMain;\r\n}"

/***/ }),

/***/ "./src/app/pages/media-edit/media-edit.component.html":
/*!************************************************************!*\
  !*** ./src/app/pages/media-edit/media-edit.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <header>{{this.dataService.title}}</header>\r\n  <!-- <main> -->\r\n    <!-- <video #videoElement class=\"main\"></video> -->\r\n    <app-player class=\"main\"></app-player>\r\n    <app-me-mani-plate class=\"main\"></app-me-mani-plate>\r\n  <!-- </main> -->\r\n  <aside></aside>\r\n  <footer class=\"dashboardSection\">\r\n    <app-me-section-dashboard></app-me-section-dashboard>\r\n  </footer>\r\n  <footer class=\"dashboardMain\">\r\n    <app-me-main-dashboard></app-me-main-dashboard>\r\n  </footer>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/media-edit/media-edit.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/media-edit/media-edit.component.ts ***!
  \**********************************************************/
/*! exports provided: MediaEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaEditComponent", function() { return MediaEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/media-edit.service */ "./src/app/services/media-edit.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MediaEditComponent = /** @class */ (function () {
    function MediaEditComponent(/*private route: ActivatedRoute, */ dataService) {
        this.dataService = dataService;
    }
    MediaEditComponent.prototype.ngOnInit = function () {
        // const self = this;
        // this.route.paramMap.subscribe( (paraM) => {
        //   const para = decodeURIComponent(paraM.get('inUrl'));
        //   let inData: Blob|string;
        //   if (para !== '0') {
        //     inData = para;
        //   } else {
        //     inData = this.dataService.blob;
        //   }
        //   self.dataService.initMe(inData);
        // });
    };
    MediaEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-media-edit',
            template: __webpack_require__(/*! ./media-edit.component.html */ "./src/app/pages/media-edit/media-edit.component.html"),
            styles: [__webpack_require__(/*! ./media-edit.component.css */ "./src/app/pages/media-edit/media-edit.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"]])
    ], MediaEditComponent);
    return MediaEditComponent;
}());



/***/ }),

/***/ "./src/app/pages/test/test.component.css":
/*!***********************************************!*\
  !*** ./src/app/pages/test/test.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/test/test.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/test/test.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<input #selFile type=\"file\" multiple (change)=\"onSelFileChange(selFile.files,$event.target === audioFile)\">\r\n<video #audioFromFile autoplay controls [src]=\"audioSrc|safe\">\r\n</video>\r\n<hr>\r\n<div>\r\n    <div>Is cordova support? {{(isCordovaSupport)?\"Yes\":\"No\"}}</div>\r\n    <div>Is cordova.file support? {{(isFilePluginSupport)?\"Yes\":\"No\"}}</div>\r\n</div>\r\n<div>\r\n    <button mat-raised-button (click)=\"onGetDocFolder()\">\r\n        <mat-icon>folder</mat-icon>\r\n    </button>\r\n    {{newFolderName}}\r\n</div>"

/***/ }),

/***/ "./src/app/pages/test/test.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/test/test.component.ts ***!
  \**********************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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



var TestComponent = /** @class */ (function () {
    function TestComponent(msgService, sanitizer) {
        this.msgService = msgService;
        this.sanitizer = sanitizer;
    }
    TestComponent.prototype.ngOnInit = function () {
        this.isCordovaSupport = !!window.cordova;
        this.isFilePluginSupport = this.isCordovaSupport && !!cordova.file;
    };
    TestComponent.prototype.onSelFileChange = function (files, obj) {
        return __awaiter(this, void 0, void 0, function () {
            var fName, newFile, outputFile, outStream, inStream, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("obj= " + obj);
                        this.audioFile = files[0];
                        fName = this.audioFile.name;
                        if (!(!!window.cordova && (cordova.platformId === 'windows'))) return [3 /*break*/, 9];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, Windows.Storage.KnownFolders.videosLibrary.createFileAsync(this.audioFile.name)];
                    case 2:
                        outputFile = _a.sent();
                        return [4 /*yield*/, outputFile.openAsync(Windows.Storage.FileAccessMode.readWrite)];
                    case 3:
                        outStream = _a.sent();
                        inStream = this.audioFile.msDetachStream();
                        return [4 /*yield*/, Windows.Storage.Streams.RandomAccessStream.copyAsync(inStream, outStream)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, outStream.flushAsync()];
                    case 5:
                        _a.sent();
                        inStream.close();
                        outStream.close();
                        return [4 /*yield*/, Windows.Storage.KnownFolders.videosLibrary.getFileAsync(fName)];
                    case 6:
                        newFile = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        this.msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Error, message: error_1 });
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        newFile = this.audioFile;
                        _a.label = 10;
                    case 10:
                        // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl('https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3');
                        // this.audioSrc = 'https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3';
                        // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.audioFile));
                        this.audioSrc = window.URL.createObjectURL(newFile);
                        this.msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Info, message: "audioSrc: " + JSON.stringify(this.audioSrc) });
                        return [2 /*return*/];
                }
            });
        });
    };
    TestComponent.prototype.onGetDocFolder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var docFolder, newFolder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!window['Windows']) return [3 /*break*/, 2];
                        docFolder = Windows.Storage.KnownFolders.videosLibrary;
                        return [4 /*yield*/, docFolder.createFolderAsync('Test')];
                    case 1:
                        newFolder = _a.sent();
                        if (newFolder != null) {
                            this.newFolderName = newFolder.path;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    TestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-test',
            template: __webpack_require__(/*! ./test.component.html */ "./src/app/pages/test/test.component.html"),
            styles: [__webpack_require__(/*! ./test.component.css */ "./src/app/pages/test/test.component.css")]
        }),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], TestComponent);
    return TestComponent;
}());



/***/ }),

/***/ "./src/app/pipes/safe.pipe.ts":
/*!************************************!*\
  !*** ./src/app/pipes/safe.pipe.ts ***!
  \************************************/
/*! exports provided: SafePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafePipe", function() { return SafePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url, args) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    SafePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'safe',
            pure: true
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], SafePipe);
    return SafePipe;
}());



/***/ }),

/***/ "./src/app/services/gv.service.ts":
/*!****************************************!*\
  !*** ./src/app/services/gv.service.ts ***!
  \****************************************/
/*! exports provided: GvService, PageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GvService", function() { return GvService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageType", function() { return PageType; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GvService = /** @class */ (function () {
    function GvService() {
        this.shownPage = PageType.Home;
    }
    GvService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], GvService);
    return GvService;
}());

var PageType;
(function (PageType) {
    PageType[PageType["Home"] = 0] = "Home";
    PageType[PageType["MediaEdit"] = 1] = "MediaEdit";
    PageType[PageType["Test"] = 2] = "Test";
})(PageType || (PageType = {}));


/***/ }),

/***/ "./src/app/services/media-edit.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/media-edit.service.ts ***!
  \************************************************/
/*! exports provided: MediaEditService, playerAction, MEState, playerType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaEditService", function() { return MediaEditService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerAction", function() { return playerAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEState", function() { return MEState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerType", function() { return playerType; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MediaEditService = /** @class */ (function () {
    function MediaEditService() {
        this.title = '';
        this.urlOrId = '';
        this.currentTime = 0;
        this._onStateChanged = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.onPlayerAction = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.state = MEState.initialized;
    }
    Object.defineProperty(MediaEditService.prototype, "onStateChanged", {
        get: function () {
            return this._onStateChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaEditService.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (v) {
            if (this._state !== v && !!this._onStateChanged) {
                this._onStateChanged.next(v);
            }
            this._state = v;
        },
        enumerable: true,
        configurable: true
    });
    MediaEditService.prototype.initMe = function (data, pType) {
        if (pType === void 0) { pType = playerType.auto; }
        this.state = MEState.parsing;
        // * [2018-06-20 11:00] Check the type of service is
        if (pType !== playerType.auto) {
            this.pType = pType;
        }
        else {
            if ((typeof data) === 'string') {
                this.pType = playerType.url;
            }
            else if (!!data) {
                this.pType = playerType.file;
            }
            else {
                this.state = MEState.parseFailed;
                return;
            }
        }
        if ((this.pType === playerType.url) || (this.pType === playerType.youtubeID)) {
            this.urlOrId = data;
            this.title = this.urlOrId;
        }
        else if (this.pType === playerType.file) {
            this.blob = data;
            this.urlOrId = window.URL.createObjectURL(this.blob);
            if (!!data) {
                this.title = data.name;
            }
        }
        this.state = MEState.readyForPlayer;
    };
    MediaEditService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], MediaEditService);
    return MediaEditService;
}());

var playerAction;
(function (playerAction) {
    playerAction[playerAction["none"] = 0] = "none";
    playerAction[playerAction["play"] = 1] = "play";
    playerAction[playerAction["pause"] = 2] = "pause";
    playerAction[playerAction["seek"] = 3] = "seek";
})(playerAction || (playerAction = {}));
var MEState;
(function (MEState) {
    MEState[MEState["initialized"] = 0] = "initialized";
    MEState[MEState["parsing"] = 1] = "parsing";
    MEState[MEState["parseFailed"] = 2] = "parseFailed";
    MEState[MEState["readyForPlayer"] = 3] = "readyForPlayer";
    MEState[MEState["canPlay"] = 4] = "canPlay";
    MEState[MEState["error"] = 5] = "error";
    MEState[MEState["waiting"] = 6] = "waiting";
    MEState[MEState["playing"] = 7] = "playing";
    MEState[MEState["paused"] = 8] = "paused";
    MEState[MEState["stopped"] = 9] = "stopped";
    MEState[MEState["disposed"] = 10] = "disposed";
})(MEState || (MEState = {}));
var playerType;
(function (playerType) {
    playerType[playerType["none"] = 0] = "none";
    playerType[playerType["auto"] = 1] = "auto";
    playerType[playerType["file"] = 2] = "file";
    playerType[playerType["url"] = 3] = "url";
    playerType[playerType["youtubeID"] = 4] = "youtubeID";
})(playerType || (playerType = {}));


/***/ }),

/***/ "./src/app/services/message.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/message.service.ts ***!
  \*********************************************/
/*! exports provided: MessageService, OneMessage, MessageTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneMessage", function() { return OneMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageTypes", function() { return MessageTypes; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageService = /** @class */ (function () {
    function MessageService() {
        this.remindMsgIn = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this._messages = [];
        this._nRead = 0;
    }
    MessageService.prototype.pushMessage = function (msg) {
        this._messages.push(msg);
        this.remindMsgIn.next(this.getNUnRead());
    };
    MessageService.prototype.readMessages = function () {
        this._nRead = this._messages.length;
        this.remindMsgIn.next(0);
        return this._messages.reverse();
    };
    MessageService.prototype.getNUnRead = function () {
        return this._messages.length - this._nRead;
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], MessageService);
    return MessageService;
}());

var OneMessage = /** @class */ (function () {
    function OneMessage() {
    }
    return OneMessage;
}());

var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["Info"] = 0] = "Info";
    MessageTypes[MessageTypes["Warn"] = 1] = "Warn";
    MessageTypes[MessageTypes["Error"] = 2] = "Error";
})(MessageTypes || (MessageTypes = {}));


/***/ }),

/***/ "./src/app/services/youtube.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/youtube.service.ts ***!
  \*********************************************/
/*! exports provided: YoutubeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YoutubeService", function() { return YoutubeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import 'rxjs/add/operator/first';

var YoutubeService = /** @class */ (function () {
    function YoutubeService(msgService) {
        this.msgService = msgService;
        this.isScriptEmbedded = false;
        this._isApiReady = false;
        this.onApiReday = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.onReady = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.onStateChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.onError = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    Object.defineProperty(YoutubeService.prototype, "isApiReady", {
        get: function () {
            return this._isApiReady;
        },
        set: function (v) {
            if (v === true) {
                this.onApiReday.next(v);
            }
            this._isApiReady = v;
        },
        enumerable: true,
        configurable: true
    });
    YoutubeService.isYoutubeURL = function (url) {
        return this.regYT.test(url);
    };
    YoutubeService.getYTId = function (url) {
        var result = this.regYT.exec(url);
        return (result[6] || result[8]);
    };
    YoutubeService.prototype.embedApiScript = function () {
        var _this = this;
        // * [2018-06-19 11:36] For Youtube, gotten from
        // https://stackoverflow.com/questions/36467532/use-youtube-iframe-api-with-angular2-and-typescript
        if (this.isScriptEmbedded === true) {
            return;
        }
        else {
            this.isScriptEmbedded = true;
        }
        var doc = window.document;
        window.onYouTubeIframeAPIReady = function () {
            _this.isApiReady = true;
            _this.msgService.pushMessage({ type: src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Info, message: 'Youtube Api is initialized' });
        };
        var apiScript = doc.createElement('script');
        apiScript.type = 'text/javascript';
        apiScript.src = 'https://www.youtube.com/iframe_api';
        doc.body.appendChild(apiScript);
    };
    YoutubeService.prototype.loadURLforPlayer = function (uiEle, VId) {
        var _this = this;
        if (!!window['YT'] === false) {
            this.onApiReday.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).subscribe(function () { return _this.loadURLforPlayer(uiEle, VId); });
            return;
        }
        var self = this;
        uiEle.src = "http://www.youtube.com/embed/" + VId + "?enablejsapi=1";
        if (!!this.ytPlayer && (this.ytPlayer.getIframe() === uiEle)) {
            this.ytPlayer.loadVideoById(VId);
        }
        else {
            if (!!this.ytPlayer) {
                this.ytPlayer.destroy(); // ******************** TODO *****************************
            }
            this.ytPlayer = new YT.Player(uiEle, {
                events: {
                    'onReady': function (ev) { self.onReady.next(ev); },
                    'onStateChange': function (ev) { self.onStateChange.next(ev); },
                    'onError': function (ev) { self.onError.next(ev); }
                }
            });
        }
    };
    YoutubeService.regYT = /^(http(s)?:\/\/)?(((www\.youtube\.com|youtube\.com)\/.*[\?\&]v=([\d\w]+)[\&]?)|(youtu\.be\/([\d\w]+)))/i;
    YoutubeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], YoutubeService);
    return YoutubeService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\ychsue\source\repos\Test\cordova-ng-test\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map