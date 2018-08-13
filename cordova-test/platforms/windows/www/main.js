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

module.exports = ".container{\r\n    display: -ms-grid;\r\n    display: grid;\r\n        -ms-grid-rows: auto 1fr;\r\n        grid-template-rows: auto 1fr;\r\n    height: 100vh;\r\n        grid-template-areas: \"navbar\" \"content\";\r\n}\r\n\r\napp-navbar{\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: navbar;\r\n    color: white;\r\n    width: 100vw;\r\n}\r\n\r\nmat-sidenav {\r\n    display: flex;\r\n    overflow-x: hidden;\r\n}\r\n\r\napp-home {\r\n    flex: 1;\r\n}\r\n\r\n.vSeparate {\r\n    position: absolute;\r\n    z-index: 1;\r\n    width: 2px;\r\n    height: 100%;\r\n    background-color: black;\r\n    touch-action: none;\r\n}\r\n\r\n.vSeparate:hover {\r\n    cursor: col-resize;\r\n}\r\n\r\n.content{\r\n    -ms-grid-row: 2;\r\n    -ms-grid-column: 1;\r\n    grid-area: content;\r\n    overflow-y: auto;\r\n}\r\n\r\n.page{\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n#resizeWidth {\r\n    touch-action: none;\r\n    position: absolute;\r\n    top: 50%;\r\n    right: 0;\r\n    width: 20px;\r\n    height: 40px;\r\n    order: 2;\r\n    z-index: 2;\r\n}\r\n\r\n#sidenavTabs {\r\n    z-index: 0;\r\n    width: 100%;\r\n}\r\n\r\n#sidenavTabs ::ng-deep .mat-tab-label {\r\n    min-width: 40px !important;\r\n}\r\n\r\n#sidenavTabs ::ng-deep .mat-tab-body-wrapper {\r\n    position: relative;\r\n    height: 100%;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #container class=\"container\">\r\n  <app-navbar #navbar class=\"mat-elevation-z6\" (toggleSidenav_Click)=\"sidenav.opened=!sidenav.opened\"></app-navbar>\r\n  <mat-sidenav-container #sidenavContainer class=\"content\">\r\n      <mat-sidenav #sidenav [mode]=\"sidenavMode\" align=\"start\" [opened]=\"true\"\r\n        [style.width]=\"sidenavWidth+'px'\">\r\n        <!-- <app-home class=\"page\" [style.display]=\"(gv.shownPage===pageType.Home)?'block':'none'\"></app-home> -->\r\n        <mat-tab-group id=\"sidenavTabs\" mat-stretch-tabs [dynamicHeight]=\"true\">\r\n            <mat-tab>\r\n                <ng-template matTabLabel>\r\n                    <mat-icon>library_music</mat-icon>\r\n                </ng-template>\r\n                <app-home class=\"page\"></app-home>\r\n            </mat-tab>            \r\n            <mat-tab>\r\n                <ng-template matTabLabel>\r\n                    <mat-icon>music_video</mat-icon>\r\n                </ng-template>\r\n                <app-story class=\"page\" *ngIf=\"!!meService.story?.urlOrID===true\"></app-story>\r\n                <span *ngIf=\"!!meService.story?.urlOrID===false\">請先選一個媒體</span>\r\n            </mat-tab>            \r\n        </mat-tab-group>\r\n        <div class=\"vSeparate\" [style.left]=\"sidenavWidth-2+'px'\" touch-action=\"none\"\r\n          (pointerdown)=\"onvSepPointerDown($event)\"></div>\r\n        <svg id=\"resizeWidth\" viewBox=\"0 0 10 20\" (pointerdown)=\"onvSepPointerDown($event)\" touch-action=\"none\">\r\n          <polygon points=\"0,10 10,0 10,20\" style=\"fill:cadetblue;opacity: 0.5;\"/>\r\n        </svg>\r\n      </mat-sidenav>\r\n      <!-- <div class=\"page\"> -->\r\n        <!-- <router-outlet></router-outlet> -->\r\n        <mat-sidenav-content class=\"page\" [style.margin-left]=\"(sidenavMode==='over')?0:(sidenavWidth+'px')\"\r\n          [style.width]=\"((sidenavMode==='over'||(sidenav.opened===false))?container.clientWidth:(container.clientWidth-sidenavWidth))+'px'\">\r\n            <app-media-edit class=\"page\" [style.display]=\"(gv.shownPage===pageType.MediaEdit)?'block':'none'\"></app-media-edit>\r\n            <app-test class=\"page\" [style.display]=\"(gv.shownPage===pageType.Test)?'block':'none'\"></app-test>\r\n        </mat-sidenav-content>\r\n      <!-- </div> -->\r\n      </mat-sidenav-container>\r\n</div>\r\n"

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
/* harmony import */ var _services_youtube_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/youtube.service */ "./src/app/services/youtube.service.ts");
/* harmony import */ var _services_gv_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/gv.service */ "./src/app/services/gv.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_device_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/device.service */ "./src/app/services/device.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_media_edit_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/media-edit.service */ "./src/app/services/media-edit.service.ts");
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
    function AppComponent(msgService, gv, ytService, device, meService) {
        this.msgService = msgService;
        this.gv = gv;
        this.ytService = ytService;
        this.device = device;
        this.meService = meService;
        this.resize$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.pageType = _services_gv_service__WEBPACK_IMPORTED_MODULE_3__["PageType"];
        msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Error, message: document.location.toString() });
        msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Warn, message: 'Test 2' });
        msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Info, message: 'Test 321' });
        this.sidenavWidth = (window.innerWidth < 800) ? 300 : window.innerWidth / 4;
        this.decideSidenavMode();
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var self = this;
        this.ytService.embedApiScript();
        var px = NaN;
        // * [2018-07-29 20:11] For resizing the sideNav
        this.resize$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (_) { return self.device.onPointermove$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(self.device.onPointerup$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["merge"])(self.device.onPointermove$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(1000))))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["concat"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null))); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["concatAll"])()).subscribe(function (ev) {
            if (ev === null) {
                px = NaN;
                _this.decideSidenavMode();
            }
            else {
                if (isNaN(px)) {
                    px = ev.screenX;
                }
                else {
                    var dx = ev.screenX - px;
                    px = ev.screenX;
                    self.sidenavWidth += dx;
                }
            }
        });
    };
    AppComponent.prototype.decideSidenavMode = function () {
        var self = this;
        if (self.sidenavWidth * 2 > window.innerWidth) {
            self.sidenavMode = 'over';
        }
        else {
            self.sidenavMode = 'side';
        }
    };
    AppComponent.prototype.onvSepPointerDown = function (ev) {
        this.resize$.next(ev);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"], _services_gv_service__WEBPACK_IMPORTED_MODULE_3__["GvService"],
            _services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"], _services_device_service__WEBPACK_IMPORTED_MODULE_5__["DeviceService"], _services_media_edit_service__WEBPACK_IMPORTED_MODULE_7__["MediaEditService"]])
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
/* harmony import */ var _services_gv_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./services/gv.service */ "./src/app/services/gv.service.ts");
/* harmony import */ var _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./dialog/dialog.component */ "./src/app/dialog/dialog.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_db_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./services/db.service */ "./src/app/services/db.service.ts");
/* harmony import */ var _services_device_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./services/device.service */ "./src/app/services/device.service.ts");
/* harmony import */ var _components_draglist_draglist_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/draglist/draglist.component */ "./src/app/components/draglist/draglist.component.ts");
/* harmony import */ var _components_swap_icon_swap_icon_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/swap-icon/swap-icon.component */ "./src/app/components/swap-icon/swap-icon.component.ts");
/* harmony import */ var _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../node_modules/@angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pages_story_story_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pages/story/story.component */ "./src/app/pages/story/story.component.ts");
/* harmony import */ var _services_fs_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./services/fs.service */ "./src/app/services/fs.service.ts");
/* harmony import */ var _services_clipboard_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./services/clipboard.service */ "./src/app/services/clipboard.service.ts");
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
                _components_player_player_component__WEBPACK_IMPORTED_MODULE_15__["PlayerComponent"],
                _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_19__["DialogComponent"],
                _components_draglist_draglist_component__WEBPACK_IMPORTED_MODULE_23__["DraglistComponent"],
                _components_swap_icon_swap_icon_component__WEBPACK_IMPORTED_MODULE_24__["SwapIconComponent"],
                _pages_story_story_component__WEBPACK_IMPORTED_MODULE_26__["StoryComponent"]
            ],
            entryComponents: [_message_message_component__WEBPACK_IMPORTED_MODULE_3__["MessageComponent"], _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_19__["DialogComponent"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatBottomSheetModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_25__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"]
            ],
            providers: [_services_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"], _services_media_edit_service__WEBPACK_IMPORTED_MODULE_16__["MediaEditService"], _services_youtube_service__WEBPACK_IMPORTED_MODULE_17__["YoutubeService"], _services_gv_service__WEBPACK_IMPORTED_MODULE_18__["GvService"], _services_db_service__WEBPACK_IMPORTED_MODULE_21__["DbService"], _services_device_service__WEBPACK_IMPORTED_MODULE_22__["DeviceService"],
                _services_fs_service__WEBPACK_IMPORTED_MODULE_27__["FsService"], _services_clipboard_service__WEBPACK_IMPORTED_MODULE_28__["ClipboardService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/draglist/draglist.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/draglist/draglist.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n    display: -ms-grid;\r\n    display: grid;\r\n    -ms-grid-columns: 1fr;\r\n        grid-template-columns: 1fr;\r\n}\r\n\r\n.backDel {\r\n    -ms-grid-column: 1;\r\n    grid-column: 1;\r\n    -ms-grid-row: 1;\r\n    grid-row: 1;\r\n    background-color: red;\r\n    border-radius: 4px;\r\n    display: flex;\r\n    align-items: center;\r\n    color: white;\r\n}\r\n\r\n.right {\r\n    margin-left: auto;\r\n}\r\n\r\n.content {\r\n    -ms-grid-column: 1;\r\n    grid-column: 1;\r\n    -ms-grid-row:1;\r\n    grid-row:1;\r\n    background-color: white;\r\n    touch-action: none;\r\n}"

/***/ }),

/***/ "./src/app/components/draglist/draglist.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/draglist/draglist.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <div class=\"backDel\">\r\n        <mat-icon class=\"mat-18 left\">delete</mat-icon>\r\n        <mat-icon class=\"mat-18 right\">delete</mat-icon>\r\n    </div>\r\n    <button mat-button class=\"content\" (pointerdown)=\"onContentPointerdown($event)\" (click)=\"onContentClick($event)\" [style.transform]=\"'translateX('+deltaX+'px)'\" touch-action=\"none\">{{story.name}}</button>\r\n</div>"

/***/ }),

/***/ "./src/app/components/draglist/draglist.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/draglist/draglist.component.ts ***!
  \***********************************************************/
/*! exports provided: DraglistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DraglistComponent", function() { return DraglistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_device_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/device.service */ "./src/app/services/device.service.ts");
/* harmony import */ var _node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DraglistComponent = /** @class */ (function () {
    function DraglistComponent(deviceService) {
        this.deviceService = deviceService;
        this.delete = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.contentClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.maxSpeed = 0.5;
        this._tmpXPointerdown = { time: 0, x: 0 };
        this._tmpXPointermove = { time: 0, x: 0 };
        // * inner events
        this.contentPointerdown$ = new _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.contentPointerup$ = new _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    DraglistComponent.prototype.onContentPointerdown = function (ev) {
        this.contentPointerdown$.next(ev);
    };
    DraglistComponent.prototype.ngOnInit = function () {
        var self = this;
        // Get the startX
        self._subDown = self.contentPointerdown$.subscribe(function (ev) { return self._tmpXPointerdown = { time: ev.timeStamp, x: ev.screenX }; });
        // Get the movingX and final V_x
        self._subSwap = self.contentPointerdown$.pipe(Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_) { return self.deviceService.onPointermove$.pipe(Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(self.deviceService.onPointerup$), 
        // takeUntil(self.deviceService.onPointermove$.pipe(
        //   debounceTime(400),
        //   merge(self.deviceService.onPointerup$)
        // )),
        Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concat"])(Object(_node_modules_rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({ timeStamp: 0, movementX: 0, screenX: -1000 }))); }), Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])(), 
        // map(ev => ev.clientX)
        Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["withLatestFrom"])(self.contentPointerdown$, function (e_move, e_down) {
            if (e_move.timeStamp !== 0) {
                self._tmpXPointermove = { time: e_move.timeStamp, x: e_move.screenX };
            }
            return e_move.screenX - e_down.screenX;
        })).subscribe(function (dx) {
            if (dx < -1000) {
                self.deltaX = 0;
                self._tmpVx = (self._tmpXPointermove.x - self._tmpXPointerdown.x) / (self._tmpXPointermove.time - self._tmpXPointerdown.time);
                // * [2018-07-19 10:38] send out a notification 'delete' when the speedX is higher than 0.5
                if (Math.abs(self._tmpVx) > self.maxSpeed) {
                    self.delete.next();
                }
            }
            else {
                self.deltaX = (dx < -1000) ? 0 : dx;
            }
        });
    };
    DraglistComponent.prototype.ngOnDestroy = function () {
        this._subDown.unsubscribe();
        this._subSwap.unsubscribe();
    };
    DraglistComponent.prototype.onContentClick = function (ev) {
        this.contentClick.next();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], DraglistComponent.prototype, "story", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DraglistComponent.prototype, "delete", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DraglistComponent.prototype, "contentClick", void 0);
    DraglistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-draglist',
            template: __webpack_require__(/*! ./draglist.component.html */ "./src/app/components/draglist/draglist.component.html"),
            styles: [__webpack_require__(/*! ./draglist.component.css */ "./src/app/components/draglist/draglist.component.css")]
        }),
        __metadata("design:paramtypes", [_services_device_service__WEBPACK_IMPORTED_MODULE_2__["DeviceService"]])
    ], DraglistComponent);
    return DraglistComponent;
}());



/***/ }),

/***/ "./src/app/components/me-main-dashboard/me-main-dashboard.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/components/me-main-dashboard/me-main-dashboard.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n    width: 100%;\r\n    position: relative;\r\n    -ms-grid-row-align: center;\r\n        align-self: center;\r\n    height: 40px;\r\n    display:-ms-grid;\r\n    display:grid;\r\n}\r\n\r\n.slideContainer {\r\n    align-items: center;\r\n    /* display: flex; */\r\n    display: -ms-grid;\r\n    display: grid;\r\n        -ms-grid-columns: auto 1fr auto;\r\n        grid-template-columns: auto 1fr auto;\r\n        -ms-grid-rows: 1fr;\r\n        grid-template-rows: 1fr;\r\n        grid-template-areas: \"start center end\";\r\n}\r\n\r\n.slideStart {\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: start\r\n}\r\n\r\n.slidePart {\r\n    display: -ms-grid;\r\n    display: grid;\r\n    position: relative;\r\n    height: 100%;\r\n    align-items: center;\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 2;\r\n    grid-area: center;\r\n    overflow: hidden;\r\n    min-width: 0;\r\n}\r\n\r\n.slideEnd {\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 3;\r\n    grid-area: end\r\n}\r\n\r\n.slideCanvas {\r\n    order: 0;\r\n    z-index: 0;\r\n    -ms-grid-column: 1;\r\n    grid-column: 1;\r\n    -ms-grid-row: 1;\r\n    grid-row: 1;\r\n    -o-object-fit: fill;\r\n       object-fit: fill;\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n    -webkit-transform-origin: left;\r\n            transform-origin: left;\r\n}\r\n"

/***/ }),

/***/ "./src/app/components/me-main-dashboard/me-main-dashboard.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/components/me-main-dashboard/me-main-dashboard.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #container class='container'>\n  <!-- <button mat-icon-button (click)=\"onPlay()\" *ngIf=\"meService.state !== mEState.playing\"> -->\n  <!-- <button mat-icon-button (click)=\"onPlay()\">\n      <mat-icon class=\"mat-18\">play_arrow</mat-icon>\n  </button> -->\n  <!-- <button mat-icon-button (click)=\"onPause()\" *ngIf=\"meService.state===mEState.playing\"> -->\n  <!-- <button mat-icon-button (click)=\"onPause()\">\n      <mat-icon class=\"mat-18\">pause</mat-icon>\n  </button> -->\n  <div class=\"slideContainer\">\n    <span class=\"slideStart\">0.0</span>\n    <div #slidePart class=\"slidePart\" (click)=\"onChangeCurrentTime($event, slidePart)\" >\n      <svg #slideCanvas class=\"slideCanvas\" [attr.viewBox]=\"'0 0 '+meService.duration+' '+'1'\" [attr.preserveAspectRatio]=\"'none'\">\n        <rect *ngFor=\"let frame of meService.story.frames\"\n        [style.fill]=\"'rgba('+frame.colorR+','+frame.colorG+','+frame.colorB+','+((!!frame.colorA)?frame.colorA:0.9)+')'\"\n        [attr.width]= \"(frame.end-frame.start)\"\n        [attr.height]=\"frame.height\"\n        [attr.x]=\"frame.start\"\n        [attr.y]=\"frame.top\"\n        ></rect>\n\n        <!-- horizontal line -->\n        <rect [style.fill]=\"'black'\" [attr.height]=\"(!!container.clientHeight)?2/container.clientHeight:2\" [attr.width]=\"meService.duration\" x=\"0\" y=\"50%\"></rect>\n        <!-- pointer -->\n        <rect [style.fill]=\"'blue'\" [attr.x]=\"((meService.currentTime>0)?meService.currentTime:0)\" y=\"0\" [attr.width]=\"(!!container.clientWidth)?2*meService.duration/container.clientWidth:1\" height=\"100%\"></rect>\n      </svg>\n    </div>\n    <span class=\"slideEnd\">{{meService.duration| number: '1.1-1'}}</span>\n  </div>\n</div>"

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
    function MeMainDashboardComponent(meService, nZone) {
        this.meService = meService;
        this.nZone = nZone;
        this.mEState = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"];
        this.pAction = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"];
        this._action = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].none;
    }
    Object.defineProperty(MeMainDashboardComponent.prototype, "action", {
        get: function () {
            return this._action;
        },
        set: function (v) {
            this.meService.onPlayerAction.next(v);
            this._action = v;
        },
        enumerable: true,
        configurable: true
    });
    MeMainDashboardComponent.prototype.ngOnInit = function () {
    };
    MeMainDashboardComponent.prototype.onPlay = function () {
        var _this = this;
        this.nZone.run(function () {
            _this.action = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play;
        });
    };
    MeMainDashboardComponent.prototype.onPause = function () {
        var _this = this;
        this.nZone.run(function () {
            _this.action = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause;
        });
    };
    MeMainDashboardComponent.prototype.onChangeCurrentTime = function (ev, evOf) {
        // * [2018-07-23 11:35] since the support of ev.layerX for mobile is unknown, I tried to get them
        // const target = ev.target as Element;
        var target = evOf;
        var rect = target.getBoundingClientRect();
        var layerX = ev.clientX - rect.left;
        // * [2018-07-23 11:36] Set the seekTime
        this.meService.seekTime = layerX / rect.width * this.meService.duration;
        this.meService.setiFrame(-1);
    };
    MeMainDashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-me-main-dashboard',
            template: __webpack_require__(/*! ./me-main-dashboard.component.html */ "./src/app/components/me-main-dashboard/me-main-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./me-main-dashboard.component.css */ "./src/app/components/me-main-dashboard/me-main-dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]])
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

module.exports = ".container {\r\n    touch-action: none;\r\n    width: 100%;\r\n    height: 100%;\r\n    display: -ms-grid;\r\n    display: grid;\r\n        -ms-grid-columns: 1fr;\r\n        grid-template-columns: 1fr;\r\n        -ms-grid-rows: 1fr auto;\r\n        grid-template-rows: 1fr auto;\r\n        grid-template-areas: \"main\" \"slider\";\r\n}\r\n\r\n.main {\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: main;\r\n    \r\n    display: -ms-inline-grid;\r\n    \r\n    display: inline-grid;\r\n        -ms-grid-columns: 1fr;\r\n        grid-template-columns: 1fr;\r\n        -ms-grid-rows: 1fr 1fr 1fr;\r\n        grid-template-rows: 1fr 1fr 1fr;\r\n        grid-template-areas: \"main-up\" \r\n    \"main-play\" \r\n    \"main-down\";\r\n    align-items: center;\r\n    justify-items: center;\r\n}\r\n\r\n.main-up {\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: main-up;\r\n    display: flex;\r\n}\r\n\r\n.main-play {\r\n    -ms-grid-row: 2;\r\n    -ms-grid-column: 1;\r\n    grid-area: main-play;\r\n}\r\n\r\n.main-down {\r\n    -ms-grid-row: 3;\r\n    -ms-grid-column: 1;\r\n    grid-area: main-down;\r\n    width:100%;\r\n    align-self: baseline;\r\n}\r\n\r\n.smallSlider {\r\n    display: flex;\r\n    align-items: center;\r\n    border-radius: 20px;\r\n    background-color: white;\r\n    margin: 4px;\r\n}\r\n\r\n.slider {\r\n    -ms-grid-row: 2;\r\n    -ms-grid-column: 1;\r\n    grid-area: slider;\r\n\r\n    display: -ms-grid;\r\n\r\n    display: grid;\r\n    -ms-grid-columns: auto 1fr auto;\r\n        grid-template-columns: auto 1fr auto;\r\n\r\n    background-color: white;\r\n    border-radius: 20px;\r\n    align-items: center;\r\n}\r\n\r\nmat-slider {\r\n    -ms-grid-row: 1;\r\n    grid-row: 1;\r\n    -ms-grid-column: 2;\r\n    grid-column: 2;\r\n}\r\n\r\n.slider-start {\r\n    -ms-grid-row: 1;\r\n    grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-column: 1;\r\n    margin: 4px;\r\n}\r\n\r\n.slider-end {\r\n    -ms-grid-row: 1;\r\n    grid-row: 1;\r\n    -ms-grid-column: 3;\r\n    grid-column: 3;\r\n    margin: 4px;\r\n}\r\n\r\n.upCenter, .upLeft, .upRight{\r\n    width: 30%;\r\n    top: -100%;\r\n    position: relative;\r\n    -ms-grid-row: 1;\r\n    grid-row: 1;\r\n}\r\n\r\n.upLeft {\r\n    -ms-grid-column: 1;\r\n    -ms-grid-column-span: 2;\r\n    grid-column: 1/3;\r\n}\r\n\r\n.upCenter {\r\n    -ms-grid-column: 2;\r\n    grid-column: 2;\r\n    -ms-grid-column-align: center;\r\n        justify-self: center;\r\n    text-shadow: 3px 0px 5px black,\r\n    -3px 0px 5px black,\r\n    0px 3px 5px black,\r\n    0px -3px 5px black;\r\n    text-align: center;\r\n    color: white;\r\n}\r\n\r\n.upRight {\r\n    -ms-grid-column: 2;\r\n    -ms-grid-column-span: 2;\r\n    grid-column: 2/4;\r\n    -ms-grid-column-align: right;\r\n        justify-self: right;\r\n}\r\n\r\n.largeBtn {\r\n    width: 120px;\r\n    height: 120px;\r\n}\r\n\r\n#btnStart {\r\n    border-radius: 50% 0 0 50%;\r\n    margin: 0 8px;\r\n}\r\n\r\n#btnEnd {\r\n    border-radius: 0 50% 50% 0;\r\n    margin: 0 8px;\r\n}\r\n\r\n#subtitle {\r\n    text-shadow: 3px 0px 5px black,\r\n    -3px 0px 5px black,\r\n    0px 3px 5px black,\r\n    0px -3px 5px black;\r\n    text-align: center;\r\n    color: white;\r\n    width: 100%;\r\n}\r\n"

/***/ }),

/***/ "./src/app/components/me-mani-plate/me-mani-plate.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/me-mani-plate/me-mani-plate.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" [@changeFrame]=\"meService.story.iFrame\" \r\n    (pointerenter)=\"HideShow='show'\" (pointerleave)=\"HideShow='hide'\" touch-action=\"none\">\r\n    <div class=\"main\">\r\n        <div class=\"main-up\" [@hideShow]=\"HideShow\">\r\n            <div #ratio class=\"smallSlider\">\r\n                <mat-icon>directions_walk</mat-icon>\r\n                <mat-slider min=\"0\" [max]=\"meService.availablePlaybackRates.length-1\" step=\"1\"\r\n                 [displayWith]=\"tickDisplayWith(meService)\" thumbLabel \r\n                 [value]=\"meService.availablePlaybackRates.indexOf(meService.playbackRate)\"\r\n                 (input)=\"meService.playbackRate=meService.availablePlaybackRates[$event.value]\" ></mat-slider>\r\n                <mat-icon>flight</mat-icon>\r\n            </div>\r\n            <div #volume class=\"smallSlider\">\r\n                    <mat-icon>volume_mute</mat-icon>\r\n                    <mat-slider min=\"0\" max=\"1\" step=\"0.2\" thumbLabel [(ngModel)]=\"meService.volume\"></mat-slider>\r\n                    <mat-icon>volume_up</mat-icon>\r\n            </div>    \r\n        </div>\r\n        <div class=\"main-play\" [@hideShow]=\"HideShow\">\r\n            <button id=\"btnStart\" mat-icon-button mat-raised-button \r\n            (click)=\"meService.seekTime=meService.story.frames[meService.story.iFrame].start\"\r\n            (pointerdown)=\"startChanged$.next($event)\" >\r\n                <mat-icon class=\"mat-18\">skip_previous</mat-icon>\r\n            </button>\r\n            <button mat-icon-button mat-raised-button class=\"largeBtn\" (click)=\"onPlayPause()\">\r\n                <svg viewBox=\"0 0 10 10\" *ngIf=\"previousState!==MEState.playing\">\r\n                    <polygon points=\"8,5 3,2 3,8\" style=\"fill:darkblue\"/>\r\n                </svg>\r\n                <svg viewBox=\"0 0 10 10\" *ngIf=\"previousState===MEState.playing\">\r\n                        <rect x=\"2\" y=\"2\" width=\"2\" height=\"6\" style=\"fill:red\"/>\r\n                        <rect x=\"6\" y=\"2\" width=\"2\" height=\"6\" style=\"fill:red\"/>\r\n                    </svg>\r\n            </button>\r\n            <button id=\"btnEnd\" mat-icon-button mat-raised-button \r\n            (click)=\"meService.seekTime=meService.story.frames[meService.story.iFrame].end\"\r\n            (pointerdown)=\"endChanged$.next($event)\" >\r\n                <mat-icon class=\"mat-18\">skip_next</mat-icon>\r\n            </button>\r\n        </div>\r\n        <div class=\"main-down\">\r\n            <textarea id=\"subtitle\" matInput \r\n             [(ngModel)]=\"meService.story.frames[meService.story.iFrame].subtitle\"\r\n             [style.background-color]=\"(HideShow==='hide')?'#00000000':'#FFFFFFFF'\"\r\n             [style.border-color]=\"(HideShow==='hide')?'#00000000':'#B0B0B0FF'\">\r\n            </textarea>\r\n        </div>\r\n    </div>\r\n    <div class=\"slider\">\r\n        <input #inStart type=\"number\" [@flyInOut]=\"IOStartShown\" class=\"upLeft\" [(ngModel)]=\"meService.story.frames[meService.story.iFrame].start\" (blur)=\"IOStartShown='out'\">\r\n        <div class=\"upCenter\">{{meService.currentTime}}</div>\r\n        <input #inEnd type=\"number\" [@flyInOut]=\"IOEndShown\" class=\"upRight\" [(ngModel)]=\"meService.story.frames[meService.story.iFrame].end\"  (blur)=\"IOEndShown='out'\">\r\n        <span class=\"slider-start\" (click)=\"onOpenInputStart(inStart)\" >{{meService.story.frames[meService.story.iFrame].start | number: '1.1-1'}}</span>\r\n        <!-- <mat-form-field><input class=\"slider-start\" matInput [(ngModel)]=\"meService.story.frames[meService.story.iFrame].start\"></mat-form-field> -->\r\n            <mat-slider #frameSlider [min]=\"meService.story.frames[meService.story.iFrame].start\"\r\n                [max]=\"meService.story.frames[meService.story.iFrame].end\"\r\n                [value]=\"meService.currentTime\"\r\n                (change)=\"meService.seekTime=frameSlider.value\"\r\n            ></mat-slider>\r\n        <span class=\"slider-end\" (click)=\"onOpenInputEnd(inEnd)\" >{{meService.story.frames[meService.story.iFrame].end | number: '1.1-1'}}</span>\r\n    </div>\r\n</div>"

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
/* harmony import */ var _node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_device_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/device.service */ "./src/app/services/device.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
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
    function MeManiPlateComponent(meService, device) {
        this.meService = meService;
        this.device = device;
        this.previousState = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].initialized;
        this.MEState = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"];
        this.IOStartShown = 'out';
        this.IOEndShown = 'out';
        this.HideShow = 'show';
        this._msDelta = 400;
        this.startChanged$ = new _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.endChanged$ = new _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.tickDisplayWith = function (meService) {
            return function (i) {
                return meService.availablePlaybackRates[i];
            };
        };
    }
    MeManiPlateComponent.prototype.ngOnInit = function () {
        this.previousState = this.meService.state;
    };
    MeManiPlateComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var self = this;
        Promise.resolve(null).then(function (_) { return _this.HideShow = 'hide'; });
        // * [2018-08-09 14:44] For start and value
        self.startChanged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (ev) {
            return Object(_node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(self._msDelta).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["withLatestFrom"])(self.device.onPointermove$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
                var _ = _a[0], vm = _a[1];
                return vm;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(self.device.onPointerup$));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatAll"])())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["withLatestFrom"])(self.device.onPointerdown$, function (vm, vd) {
            var frame = self.meService.story.frames[self.meService.story.iFrame];
            if (vm.screenX > vd.screenX) {
                var start = Math.ceil(frame.start + 0.001);
                if (start < frame.end) {
                    frame.start = start;
                    self.meService.seekTime = frame.start;
                }
            }
            else if (vm.screenX < vd.screenX) {
                var start = Math.floor(frame.start - 0.001);
                if (start < frame.end && start >= 0) {
                    frame.start = start;
                    self.meService.seekTime = frame.start;
                }
            }
        })).subscribe();
        self.endChanged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (ev) {
            return Object(_node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(self._msDelta).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["withLatestFrom"])(self.device.onPointermove$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
                var _ = _a[0], vm = _a[1];
                return vm;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(self.device.onPointerup$));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatAll"])())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["withLatestFrom"])(self.device.onPointerdown$, function (vm, vd) {
            var frame = self.meService.story.frames[self.meService.story.iFrame];
            if (vm.screenX > vd.screenX) {
                var end = Math.ceil(frame.end + 0.001);
                if (end > frame.start && end < self.meService.duration) {
                    frame.end = end;
                }
            }
            else if (vm.screenX < vd.screenX) {
                var end = Math.floor(frame.end - 0.001);
                if (end > frame.start) {
                    frame.end = end;
                }
            }
        })).subscribe();
    };
    MeManiPlateComponent.prototype.onPlayPause = function () {
        if (this.previousState !== src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing) {
            this.meService.onPlayerAction.next(src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play);
            this.previousState = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing;
        }
        else if (this.previousState === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing) {
            this.meService.onPlayerAction.next(src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause);
            this.previousState = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].paused;
        }
    };
    MeManiPlateComponent.prototype.onOpenInputStart = function (inStart) {
        inStart.focus();
        this.IOStartShown = 'in';
    };
    MeManiPlateComponent.prototype.onOpenInputEnd = function (inEnd) {
        inEnd.focus();
        this.IOEndShown = 'in';
    };
    MeManiPlateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-me-mani-plate',
            template: __webpack_require__(/*! ./me-mani-plate.component.html */ "./src/app/components/me-mani-plate/me-mani-plate.component.html"),
            styles: [__webpack_require__(/*! ./me-mani-plate.component.css */ "./src/app/components/me-mani-plate/me-mani-plate.component.css")],
            animations: [
                Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('changeFrame', [
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => *', [
                        Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(-100%)' }),
                        Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('0.2s 0.1s ease-in', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(0)' }))
                    ])
                ]),
                Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('flyInOut', [
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('in', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(0)', opacity: 1 })),
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('out', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(100%)', opacity: 0 })),
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('out => in', [
                        Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(100%)', opacity: 0 }),
                        Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('0.2s 0.1s ease-in', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(0)', opacity: 1 }))
                    ]),
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('in => out', [
                        Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('0.2s 0.1s ease-out', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(100%)', opacity: 0 }))
                    ])
                ]),
                Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('hideShow', [
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('show', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1 })),
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('hide', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0 })),
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('hide => show', [Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('0.2s 0.1s ease-in', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1 }))]),
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('show => hide', [Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('4s 2s ease-out', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0 }))]),
                ])
            ]
        }),
        __metadata("design:paramtypes", [src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"], _services_device_service__WEBPACK_IMPORTED_MODULE_4__["DeviceService"]])
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

module.exports = ".container {\r\n    display: flex;\r\n}\r\n\r\n.large {\r\n    font-size: large;\r\n}\r\n\r\n.listContainer {\r\n    flex-grow: 1;\r\n    max-height: 120px;\r\n    overflow-y: auto;\r\n    display: inline;\r\n}\r\n"

/***/ }),

/***/ "./src/app/components/me-section-dashboard/me-section-dashboard.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/components/me-section-dashboard/me-section-dashboard.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <button id=\"allBtn\" mat-icon-button mat-raised-button (click)=\"onWhichFrame(-1)\">\n    <mat-icon class=\"mat-18\">all_inclusive</mat-icon>\n  </button>\n  <button id=\"plusBtn\" mat-icon-button mat-raised-button (click)=\"onAddFrame()\">\n    <span class=\"large\">+</span>\n  </button>\n\n  <div class=\"listContainer\">\n    <app-swap-icon\n    *ngFor=\"let aFrame of meService.story.frames; let i = index;\" \n    [index]=\"i\"\n    [bR]=\"aFrame.colorR\"\n    [bG]=\"aFrame.colorG\"\n    [bB]=\"aFrame.colorB\"\n    (contentClick)=\"onWhichFrame(i)\"\n    (delete)=\"onRemoveFrame(i)\">\n    </app-swap-icon>\n  </div>\n</div>"

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
/* harmony import */ var _services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/media-edit.service */ "./src/app/services/media-edit.service.ts");
/* harmony import */ var _vm_a_frame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../vm/a-frame */ "./src/app/vm/a-frame.ts");
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
    function MeSectionDashboardComponent(meService) {
        this.meService = meService;
    }
    MeSectionDashboardComponent.prototype.ngOnInit = function () {
    };
    MeSectionDashboardComponent.prototype.onAddFrame = function () {
        var frame = new _vm_a_frame__WEBPACK_IMPORTED_MODULE_2__["AFrame"]();
        frame.start = this.meService.currentTime;
        frame.end = frame.start + 10;
        frame.height = 0.6;
        frame.top = Math.random() * 0.4;
        this.meService.story.frames.push(frame);
    };
    MeSectionDashboardComponent.prototype.onRemoveFrame = function (i) {
        var frames = this.meService.story.frames;
        frames.splice(i, 1);
        this.meService.setiFrame(-1);
    };
    MeSectionDashboardComponent.prototype.onWhichFrame = function (i) {
        this.meService.setiFrame(i);
        if (i >= 0) {
            this.meService.seekTime = this.meService.story.frames[i].start;
        }
        console.log(i + "/ **************************** TODO **************************/");
    };
    MeSectionDashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-me-section-dashboard',
            template: __webpack_require__(/*! ./me-section-dashboard.component.html */ "./src/app/components/me-section-dashboard/me-section-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./me-section-dashboard.component.css */ "./src/app/components/me-section-dashboard/me-section-dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"]])
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

module.exports = "<div class=\"container\">\r\n    <video #video [style.display]=\"(dataService.story.meType===pType.url||dataService.story.meType===pType.file)?'block':'none'\" (click)=\"onVideoPlayOrPause($event)\" controls poster=\"data:image/gif;base64,AAAA\" [style.background-image]=\"'url(\\'assets/MusicNotes.svg\\')'\"\r\n        [src]=\"videoSrc|safe\"></video>\r\n    <iframe #youtube id=\"youtube\" [frameBorder]=\"0\" [style.display]=\"(dataService.story.meType===pType.youtubeID)?'block':'none'\"></iframe>\r\n</div>"

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
/* harmony import */ var _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../vm/player-type.enum */ "./src/app/vm/player-type.enum.ts");
/* harmony import */ var _services_device_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/device.service */ "./src/app/services/device.service.ts");
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
    function PlayerComponent(dataService, YTservice, msgService, ngZone, device) {
        this.dataService = dataService;
        this.YTservice = YTservice;
        this.msgService = msgService;
        this.ngZone = ngZone;
        this.device = device;
        this.pType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__["PlayerType"];
        this.unSubscribed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.isInited = false;
        this._msInterval = 200;
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
        var self = this;
        this.videoEle = this.ngVideo.nativeElement;
        this.youtubeEle = this.ngYoutube.nativeElement;
        this.eventTriggers();
        this.eventListeners();
        // * [2018-06-18 20:57] because this component might be initialized after the MEState.readyForPlayer, I need to deal with this situation
        if ((this.dataService.state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].readyForPlayer) && (this.isInited === false)) {
            this.initMe();
            this.isInited = true;
        }
        if (this.device.isCordova && cordova.platformId === 'ios') {
            self.videoEle.setAttribute("playsinline", "true");
        }
    };
    PlayerComponent.prototype.ngOnDestroy = function () {
        this.unSubscribed.next(true);
        this.unSubscribed.complete();
    };
    PlayerComponent.prototype.getCurrentTime = function () {
        var self = this;
        var meType = self.dataService.story.meType;
        if (meType === self.pType.youtubeID) {
            if (self.YTservice.isApiReady && !!self.YTservice.ytPlayer.getCurrentTime) {
                return self.YTservice.ytPlayer.getCurrentTime();
            }
            else {
                return -1;
            }
        }
        else {
            return self.videoEle.currentTime;
        }
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
        // * [2018-07-21 19:44] For CurrentTime
        self.dataService.onCurrentTimeChanged = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(self._msInterval)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_) { return self.getCurrentTime(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());
        self.dataService.onCurrentTimeChanged
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (t) {
            self.dataService.currentTime = t;
            // console.log(t);
        });
        var isDuringStart = false; // For iOS because its seek time might be earlier than the time you are seeking to
        var isDuringEnd = false;
        // * [2018-07-24 13:48] For repeating each frame
        self.dataService.onCurrentTimeChanged
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (t) {
            try {
                var start_1 = 0;
                var end = self.dataService.duration - 0.1;
                var iFrame = self.dataService.story.iFrame;
                if (iFrame >= 0) {
                    var frame = self.dataService.story.frames[iFrame];
                    if (!!frame) {
                        start_1 = frame.start;
                        end = frame.end;
                    }
                }
                if (t < start_1) {
                    if (isDuringStart === false) {
                        isDuringStart = true;
                        self.dataService.seekTime = start_1;
                    }
                }
                else if (t > (end - (self._msInterval / 1000))) {
                    if (isDuringEnd === false) {
                        isDuringEnd = true;
                        setTimeout(function () {
                            isDuringEnd = false;
                            self.dataService.seekTime = start_1;
                            if (self.dataService.isRepeat === false) {
                                self.dataService.onPlayerAction.next(src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause);
                            }
                        }, (end - t) * 1000);
                    }
                }
                else {
                    if (isDuringStart === true) {
                        isDuringStart = false;
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        });
        // * [2018-07-22 22:16] Update Duration & availablePlaybackRates
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(self.videoEle, 'durationchange')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (_) {
            self.dataService.duration = self.videoEle.duration;
            self.dataService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
        });
        self.YTservice.onReady
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (_) {
            self.dataService.duration = self.YTservice.ytPlayer.getDuration();
            self.dataService.availablePlaybackRates = self.YTservice.ytPlayer.getAvailablePlaybackRates();
        });
        // * For playerAction
        this.dataService.onPlayerAction
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (t) {
            var meType = self.dataService.story.meType;
            if (meType === self.pType.url || meType === self.pType.file) {
                switch (t) {
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play:
                        self.videoEle.play();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause:
                        self.videoEle.pause();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].seek:
                        self.videoEle.currentTime = self.dataService.seekTime;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getDuration:
                        self.dataService.duration = self.videoEle.duration;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getVolume:
                        self.dataService._volume = self.videoEle.volume;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].setVolume:
                        self.videoEle.volume = self.dataService.volume;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getPlaybackRate:
                        self.dataService._playbackRate = self.videoEle.playbackRate;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].setPlaybackRate:
                        self.videoEle.playbackRate = self.dataService.playbackRate;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getAllowedPlaybackRate:
                        self.dataService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
                        break;
                    default:
                        break;
                }
            }
            else if (meType === self.pType.youtubeID) {
                var ytPlayer = self.YTservice.ytPlayer;
                if (!!ytPlayer === false) {
                    return;
                }
                switch (t) {
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play:
                        ytPlayer.playVideo();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause:
                        ytPlayer.pauseVideo();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].seek:
                        if (!!ytPlayer.seekTo) {
                            ytPlayer.seekTo(self.dataService.seekTime, true);
                        }
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getDuration:
                        if (!!ytPlayer && !!ytPlayer.getDuration) {
                            self.dataService.duration = ytPlayer.getDuration();
                        }
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getVolume:
                        self.dataService._volume = ytPlayer.getVolume() / 100;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].setVolume:
                        ytPlayer.setVolume(self.dataService.volume * 100);
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getPlaybackRate:
                        self.dataService._playbackRate = ytPlayer.getPlaybackRate();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].setPlaybackRate:
                        ytPlayer.setPlaybackRate(self.dataService.playbackRate);
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getAllowedPlaybackRate:
                        self.dataService.availablePlaybackRates = ytPlayer.getAvailablePlaybackRates();
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
            self.ngZone.run(function () {
                switch (ev.data) {
                    case YT.PlayerState.PLAYING:
                        self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing;
                        break;
                    case YT.PlayerState.PAUSED:
                        self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].paused;
                        break;
                    case YT.PlayerState.ENDED:
                        self.dataService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].stopped;
                        break;
                    default:
                        break;
                }
            });
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
        var meType = this.dataService.story.meType;
        var urlOrId = this.dataService.story.urlOrID;
        if (meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__["PlayerType"].url) {
            if (src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].isYoutubeURL(urlOrId)) {
                this.dataService.story.meType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__["PlayerType"].youtubeID;
                this.ytVId = src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].getYTId(urlOrId);
            }
            else {
                this.videoSrc = urlOrId;
            }
        }
        else if (meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__["PlayerType"].youtubeID) {
            if (src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].isYoutubeURL(urlOrId)) {
                this.ytVId = src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].getYTId(urlOrId);
            }
            else {
                this.ytVId = urlOrId;
            }
        }
        else if (meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__["PlayerType"].file) {
            this.videoSrc = urlOrId;
        }
    };
    PlayerComponent.prototype.onVideoPlayOrPause = function (ev) {
        ev.preventDefault();
        var state = this.dataService.state;
        if (state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].paused || state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].readyForPlayer || state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].canPlay) {
            this.dataService.onPlayerAction.next(src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play);
        }
        else {
            this.dataService.onPlayerAction.next(src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause);
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
            src_app_services_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _services_device_service__WEBPACK_IMPORTED_MODULE_7__["DeviceService"]])
    ], PlayerComponent);
    return PlayerComponent;
}());



/***/ }),

/***/ "./src/app/components/swap-icon/swap-icon.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/swap-icon/swap-icon.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.container {\r\n    display: -ms-inline-grid;\r\n    display: inline-grid;\r\n        -ms-grid-columns: 1fr;\r\n        grid-template-columns: 1fr;\r\n        -ms-grid-rows: 1fr;\r\n        grid-template-rows: 1fr;\r\n        grid-template-areas: 'center';\r\n}\r\n\r\nbutton {\r\n    touch-action: none;\r\n}\r\n\r\n.eachButton, .delBK {\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: center;\r\n    /* grid-column: 1;\r\n    grid-row: 1; */\r\n}\r\n\r\n.delBK {\r\n    background-color: red;\r\n    color: white;\r\n}"

/***/ }),

/***/ "./src/app/components/swap-icon/swap-icon.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/swap-icon/swap-icon.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"container\">\r\n  <button mat-icon-button class=\"delBK\">\r\n    <mat-icon class=\"mat-18\">delete</mat-icon>\r\n  </button>\r\n  <button mat-icon-button mat-raised-button\r\n  class=\"eachButton\"\r\n  touch-action=\"none\"\r\n  [style.transform]=\"'translateY('+deltaY+'px)'\"\r\n  [style.background-color]=\"'rgba('+bR+','+bG+','+bB+','+bA+')'\"\r\n  (pointerdown)=\"onContentPointerdown($event)\"\r\n  (click)=\"onBtnClick($event)\">\r\n  <span>{{index}}</span>\r\n</button>\r\n</span>\r\n"

/***/ }),

/***/ "./src/app/components/swap-icon/swap-icon.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/swap-icon/swap-icon.component.ts ***!
  \*************************************************************/
/*! exports provided: SwapIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwapIconComponent", function() { return SwapIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_device_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/device.service */ "./src/app/services/device.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SwapIconComponent = /** @class */ (function () {
    function SwapIconComponent(deviceService) {
        this.deviceService = deviceService;
        this.bA = 1;
        this.delete = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.contentClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.maxSpeed = 0.9;
        this._tmpYPointerdown = { time: 0, y: 0 };
        this._tmpYPointermove = { time: 0, y: 0 };
        // * inner events
        this.contentPointerdown$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.contentPointerup$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    SwapIconComponent.prototype.onContentPointerdown = function (ev) {
        this.contentPointerdown$.next(ev);
    };
    SwapIconComponent.prototype.ngOnInit = function () {
        var self = this;
        // Get the startX
        self._subDown = self.contentPointerdown$.subscribe(function (ev) { return self._tmpYPointerdown = { time: ev.timeStamp, y: ev.screenY }; });
        // Get the movingX and final V_x
        self._subSwap = self.contentPointerdown$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_) { return self.deviceService.onPointermove$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(self.deviceService.onPointerup$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concat"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({ timeStamp: 0, movementY: 0, screenY: -1000 }))); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])(), 
        // map(ev => ev.clientX)
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["withLatestFrom"])(self.contentPointerdown$, function (e_move, e_down) {
            if (e_move.timeStamp !== 0) {
                self._tmpYPointermove = { time: e_move.timeStamp, y: e_move.screenY };
            }
            return e_move.screenY - e_down.screenY;
        })).subscribe(function (dy) {
            if (dy < -1000) {
                self.deltaY = 0;
                self._tmpVy = (self._tmpYPointermove.y - self._tmpYPointerdown.y) / (self._tmpYPointermove.time - self._tmpYPointerdown.time);
                // * [2018-07-19 10:38] send out a notification 'delete' when the speedX is higher than 0.5
                if (Math.abs(self._tmpVy) > self.maxSpeed) {
                    self.delete.next();
                }
            }
            else {
                self.deltaY = (dy < -1000) ? 0 : dy;
            }
        });
    };
    SwapIconComponent.prototype.ngOnDestroy = function () {
        this._subDown.unsubscribe();
        this._subSwap.unsubscribe();
    };
    SwapIconComponent.prototype.onBtnClick = function (ev) {
        var self = this;
        this.contentClick.next(self.index);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], SwapIconComponent.prototype, "index", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], SwapIconComponent.prototype, "bR", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], SwapIconComponent.prototype, "bG", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], SwapIconComponent.prototype, "bB", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SwapIconComponent.prototype, "bA", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], SwapIconComponent.prototype, "delete", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], SwapIconComponent.prototype, "contentClick", void 0);
    SwapIconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-swap-icon',
            template: __webpack_require__(/*! ./swap-icon.component.html */ "./src/app/components/swap-icon/swap-icon.component.html"),
            styles: [__webpack_require__(/*! ./swap-icon.component.css */ "./src/app/components/swap-icon/swap-icon.component.css")]
        }),
        __metadata("design:paramtypes", [_services_device_service__WEBPACK_IMPORTED_MODULE_2__["DeviceService"]])
    ], SwapIconComponent);
    return SwapIconComponent;
}());



/***/ }),

/***/ "./src/app/dialog/dialog.component.css":
/*!*********************************************!*\
  !*** ./src/app/dialog/dialog.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\r\n    width: 100%;\r\n}\r\n\r\n.buttons {\r\n    display: flex;\r\n    justify-content: center;\r\n}"

/***/ }),

/***/ "./src/app/dialog/dialog.component.html":
/*!**********************************************!*\
  !*** ./src/app/dialog/dialog.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  dialog works!\n</p>\n<div *ngIf=\"data.dType===dialogType.inputUrl\">\n  <mat-form-field class=\"full-width\" >\n    <input matInput placeholder=\"請輸入想要的網址\" [(ngModel)]=\"data.url\" >\n  </mat-form-field>\n  <div class=\"buttons\">\n    <button mat-raised-button (click)=\"onLoadURL()\" >載入</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/dialog/dialog.component.ts":
/*!********************************************!*\
  !*** ./src/app/dialog/dialog.component.ts ***!
  \********************************************/
/*! exports provided: DialogComponent, DialogType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogComponent", function() { return DialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogType", function() { return DialogType; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var DialogComponent = /** @class */ (function () {
    function DialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dialogType = DialogType;
    }
    DialogComponent.prototype.ngOnInit = function () {
    };
    DialogComponent.prototype.onLoadURL = function () {
        this.dialogRef.close(this.data.url);
    };
    DialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog',
            template: __webpack_require__(/*! ./dialog.component.html */ "./src/app/dialog/dialog.component.html"),
            styles: [__webpack_require__(/*! ./dialog.component.css */ "./src/app/dialog/dialog.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], DialogComponent);
    return DialogComponent;
}());

var DialogType;
(function (DialogType) {
    DialogType[DialogType["inputUrl"] = 0] = "inputUrl";
})(DialogType || (DialogType = {}));


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

module.exports = "nav{\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 8px 16px;\r\n    background: #673ab7;\r\n}\r\n\r\n.flex-spacer{\r\n    flex-grow: 1;\r\n    text-align: center;\r\n    overflow-x: auto;\r\n}"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"docs-navbar-header\">\n  <button mat-icon-button (click)=\"toggleSidenav_Click.next($event)\">\n      <mat-icon class=\"mat-18\">menu</mat-icon>\n  </button>\n  <button mat-icon-button (click)=\"onSaveStory()\" *ngIf=\"meService.sideClickType===sideClickType_.new\">\n    <mat-icon class=\"mat-18\">save</mat-icon>\n  </button>\n  <button mat-icon-button (click)=\"onUpdateStory()\" *ngIf=\"meService.sideClickType===sideClickType_.select\">\n    <mat-icon class=\"mat-18\">update</mat-icon>\n  </button>\n<div class=\"flex-spacer\">\n  <div>{{meService.story.title}}</div>\n</div>\n  <button mat-icon-button [matBadge]=\"nUnReadMsg\" (click)=\"showMsgsAtBottom()\" *ngIf=\"nUnReadMsg!=0\">\n    <mat-icon class=\"mat-18\">event_note</mat-icon>\n  </button>\n</nav>"

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
/* harmony import */ var _services_db_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/db.service */ "./src/app/services/db.service.ts");
/* harmony import */ var _services_media_edit_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/media-edit.service */ "./src/app/services/media-edit.service.ts");
/* harmony import */ var _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../vm/player-type.enum */ "./src/app/vm/player-type.enum.ts");
/* harmony import */ var _services_fs_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/fs.service */ "./src/app/services/fs.service.ts");
/* harmony import */ var _node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../node_modules/rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
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









var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(bottomSheet, ngZone, db, fsService, meService, msgService) {
        this.bottomSheet = bottomSheet;
        this.ngZone = ngZone;
        this.db = db;
        this.fsService = fsService;
        this.meService = meService;
        this.msgService = msgService;
        this.toggleSidenav_Click = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.nUnReadMsg = 0;
        this.sideClickType_ = _services_media_edit_service__WEBPACK_IMPORTED_MODULE_5__["SideClickType"];
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
    NavbarComponent.prototype.onSaveStory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var story, self, isSaved, _a, insert;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        story = this.meService.story;
                        self = this;
                        if (!(story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__["PlayerType"].file)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fsService.getFile$(story.fileName, true).pipe(Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (fEntry) {
                                return self.fsService.writeFile$(fEntry, self.meService.blob);
                            }), Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["concatAll"])()).toPromise()];
                    case 1:
                        isSaved = _b.sent();
                        if (!(isSaved === true)) return [3 /*break*/, 3];
                        _a = story;
                        return [4 /*yield*/, this.fsService.getFile$(story.fileName).toPromise()];
                    case 2:
                        _a.urlOrID = (_b.sent()).toURL();
                        _b.label = 3;
                    case 3:
                        self.msgService.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageTypes"].Info, message: "The file " + story.fileName + " is stored: " + isSaved });
                        _b.label = 4;
                    case 4:
                        delete story['id'];
                        return [4 /*yield*/, this.db.upsertAsync(_services_db_service__WEBPACK_IMPORTED_MODULE_4__["DbService"].storyTableName, story)];
                    case 5:
                        insert = _b.sent();
                        // * [2018-07-25 19:04] Change its state to 'Update'
                        story['id'] = insert[0].affectedRows[0].id;
                        this.meService.sideClickType = _services_media_edit_service__WEBPACK_IMPORTED_MODULE_5__["SideClickType"].select;
                        return [2 /*return*/];
                }
            });
        });
    };
    NavbarComponent.prototype.onUpdateStory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var story;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        story = this.meService.story;
                        return [4 /*yield*/, this.db.upsertAsync(_services_db_service__WEBPACK_IMPORTED_MODULE_4__["DbService"].storyTableName, story)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "toggleSidenav_Click", void 0);
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBottomSheet"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _services_db_service__WEBPACK_IMPORTED_MODULE_4__["DbService"], _services_fs_service__WEBPACK_IMPORTED_MODULE_7__["FsService"], _services_media_edit_service__WEBPACK_IMPORTED_MODULE_5__["MediaEditService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"]])
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

module.exports = "input[type='file'] {\r\n    display: none;\r\n}\r\n\r\n.full-width {\r\n    width: 100%;\r\n    display: block;\r\n}\r\n\r\n.question {\r\n    background-color: red;\r\n    color: yellow;\r\n    font-weight: bolder;\r\n    min-width: 0px;\r\n    box-shadow: 4px;\r\n}\r\n\r\napp-draglist {\r\n    width:100%;\r\n}"

/***/ }),

/***/ "./src/app/pages/home/home.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <button mat-raised-button (click)=\"gv.shownPage = pageType.Test\">Test</button>\r\n</div>\r\n<div>\r\n    <h3>\r\n        讀入新的媒體：\r\n    </h3>\r\n    <mat-list dense>\r\n        <mat-list-item>\r\n            <button mat-raised-button (click)=\"onLoadFromURL();\">\r\n                網址\r\n            </button>\r\n            <button mat-icon-button class=\"question\">\r\n                ?\r\n            </button>\r\n        </mat-list-item>\r\n        <mat-list-item>\r\n            <button mat-raised-button (click)=\"selaudio.click()\" >\r\n                <input #selaudio\r\n                type=\"file\" accept=\"audio/*\" (change)=\"onFileSelect(selaudio.files)\">\r\n                聲音檔\r\n            </button>\r\n            <button mat-raised-button (click)=\"selvideo.click()\" >\r\n                <input #selvideo\r\n                type=\"file\" accept=\"video/*\" (change)=\"onFileSelect(selvideo.files)\">\r\n                影片檔\r\n            </button>\r\n        </mat-list-item>\r\n    </mat-list>\r\n</div>\r\n<div>\r\n    <h3>讀入已備份的媒體：</h3>\r\n\r\n    <mat-list dense>\r\n        <!-- <mat-list-item *ngFor=\"let story of stories$| async\"> -->\r\n        <app-draglist *ngFor=\"let story of stories\" \r\n            [story]=\"story\"\r\n            (delete)=\"onStoryDelete(story)\"\r\n            (contentClick)=\"onStoryOpen(story)\" ></app-draglist>\r\n        <!-- </mat-list-item> -->\r\n    </mat-list>\r\n</div>\r\n"

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
/* harmony import */ var _services_gv_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/gv.service */ "./src/app/services/gv.service.ts");
/* harmony import */ var _services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/media-edit.service */ "./src/app/services/media-edit.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dialog/dialog.component */ "./src/app/dialog/dialog.component.ts");
/* harmony import */ var _services_db_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/db.service */ "./src/app/services/db.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_fs_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/fs.service */ "./src/app/services/fs.service.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../vm/player-type.enum */ "./src/app/vm/player-type.enum.ts");
/* harmony import */ var _services_clipboard_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/clipboard.service */ "./src/app/services/clipboard.service.ts");
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












var HomeComponent = /** @class */ (function () {
    function HomeComponent(gv, dialog, meService, db, ngZone, fs, msg, clipboard) {
        this.gv = gv;
        this.dialog = dialog;
        this.meService = meService;
        this.db = db;
        this.ngZone = ngZone;
        this.fs = fs;
        this.msg = msg;
        this.clipboard = clipboard;
        this.Url = 'https://dzxuyknqkmi1e.cloudfront.net/odb/2018/06/odb-06-12-18.mp3';
        this.testYoutubeUrl = 'https://youtu.be/f1SZ5GaAp3g';
        this.storySearch$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this.pageType = _services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var self = this;
        // from(this.db.searchAsync()).subscribe(this.stories$);
        self.db.onDataChanged.subscribe(function (data) { return self.storySearch$.next(null); });
        self.stories$ = self.storySearch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (val) {
            if (val === null) {
                return self.db.searchAsync(_services_db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"].storyTableName, null, null, { viewTime: 'desc' });
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["concatAll"])());
        self.stories$.subscribe(function (s) {
            self.ngZone.run(function () {
                self.stories = s;
            });
        });
        // * [2018-08-01 10:27] Check whether FsPlugin is available now
        self.fs.FSReady$.subscribe(function (v) { return self.msg.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].Info, message: "FSReady = " + v }); });
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        this.storySearch$.next(null); // initialize the search
    };
    HomeComponent.prototype.onFileSelect = function (files) {
        if (files !== null && files.length > 0) {
            var file = files[0];
            this.meService.initMe(file);
            this.gv.shownPage = _services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"].MediaEdit;
        }
        // * [2018-07-19 21:28] Tell navbar that you want to create a story
        this.meService.sideClickType = _services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__["SideClickType"].new;
    };
    HomeComponent.prototype.onLoadFromURL = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var self, text, error_1, dialogRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, self.clipboard.getText$$()];
                    case 2:
                        text = _a.sent();
                        if (!!text) {
                            self.Url = text;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        self.msg.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].Error, message: error_1 });
                        return [3 /*break*/, 4];
                    case 4:
                        self.ngZone.run(function (_) {
                            dialogRef = _this.dialog.open(_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["DialogComponent"], {
                                width: '50%',
                                data: { dType: _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["DialogType"].inputUrl, url: self.Url }
                            });
                        });
                        dialogRef.afterClosed().subscribe(function (result) {
                            if (!!result === false) {
                                return;
                            }
                            self.Url = result;
                            self.meService.initMe(self.Url);
                            self.gv.shownPage = _services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"].MediaEdit;
                            // * [2018-07-19 21:28] Tell navbar that you want to create a story
                            self.meService.sideClickType = _services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__["SideClickType"].new;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.onStoryDelete = function (story) {
        return __awaiter(this, void 0, void 0, function () {
            var self, isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!(story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_10__["PlayerType"].file)) return [3 /*break*/, 2];
                        return [4 /*yield*/, self.fs.getFile$(story.fileName).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (fEntry) { return self.fs.rmFile$(fEntry); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["concatAll"])()).toPromise()];
                    case 1:
                        isDeleted = _a.sent();
                        self.msg.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].Info, message: "The file " + story.fileName + " is deleted: " + isDeleted });
                        _a.label = 2;
                    case 2:
                        // this.db.deleteAsync(DbService.storyTableName, ['id', '=', story.id]);
                        this.db.deleteAsync(_services_db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"].storyTableName, ['makeTime', '=', story.makeTime]);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.onStoryOpen = function (story) {
        var duplicatedStory = Object.assign(story);
        this.meService.initMe(duplicatedStory);
        this.gv.shownPage = _services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"].MediaEdit;
        // * [2018-07-19 21:28] Tell navbar that you select a story
        this.meService.sideClickType = _services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__["SideClickType"].select;
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/pages/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/pages/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_services_gv_service__WEBPACK_IMPORTED_MODULE_1__["GvService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__["MediaEditService"], _services_db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _services_fs_service__WEBPACK_IMPORTED_MODULE_8__["FsService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_9__["MessageService"], _services_clipboard_service__WEBPACK_IMPORTED_MODULE_11__["ClipboardService"]])
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

module.exports = ".container {\r\n    display: -ms-grid;\r\n    display: grid;\r\n        -ms-grid-rows: auto 1fr auto auto;\r\n        grid-template-rows: auto 1fr auto auto;\r\n        grid-template-areas: \"header\" \"main\" \"cSection\" \"cMain\";\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\n\r\nheader {\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: header;\r\n}\r\n\r\n.main {\r\n    -ms-grid-row: 2;\r\n    -ms-grid-column: 1;\r\n    grid-area: main;\r\n    overflow: hidden;\r\n}\r\n\r\napp-player {\r\n    z-index: 0;\r\n}\r\n\r\napp-me-mani-plate {\r\n    z-index: 1;\r\n}\r\n\r\n.dashboardSection {\r\n    -ms-grid-row: 3;\r\n    -ms-grid-column: 1;\r\n    grid-area: cSection;\r\n}\r\n\r\n.dashboardMain {\r\n    -ms-grid-row: 4;\r\n    -ms-grid-column: 1;\r\n    grid-area: cMain;\r\n}"

/***/ }),

/***/ "./src/app/pages/media-edit/media-edit.component.html":
/*!************************************************************!*\
  !*** ./src/app/pages/media-edit/media-edit.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <!-- <header>{{this.dataService.story.name}}</header> -->\r\n  <!-- <main> -->\r\n    <!-- <video #videoElement class=\"main\"></video> -->\r\n    <app-player class=\"main\"></app-player>\r\n    <app-me-mani-plate class=\"main\"\r\n      [style.background-color]=\"(meService.story.iFrame<0)?'rgba(0,0,0,0)':'rgba('+meService.story.frames[meService.story.iFrame].colorR+','+meService.story.frames[meService.story.iFrame].colorG+','+meService.story.frames[meService.story.iFrame].colorB+','+'0.2'+')'\"\r\n      *ngIf=\"meService.story.iFrame>=0\"\r\n      [@flyInOut]=\"'in'\"\r\n    ></app-me-mani-plate>\r\n  <!-- </main> -->\r\n  <aside></aside>\r\n  <footer class=\"dashboardSection\">\r\n    <app-me-section-dashboard></app-me-section-dashboard>\r\n  </footer>\r\n  <footer class=\"dashboardMain\">\r\n    <app-me-main-dashboard></app-me-main-dashboard>\r\n  </footer>\r\n</div>\r\n"

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
/* harmony import */ var _services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/media-edit.service */ "./src/app/services/media-edit.service.ts");
/* harmony import */ var _node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
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
    function MediaEditComponent(/*private route: ActivatedRoute, */ meService) {
        this.meService = meService;
    }
    MediaEditComponent.prototype.ngOnInit = function () {
        // const self = this;
        // this.route.paramMap.subscribe( (paraM) => {
        //   const para = decodeURIComponent(paraM.get('inUrl'));
        //   let inData: Blob|string;
        //   if (para !== '0') {
        //     inData = para;
        //   } else {
        //     inData = this.meService.blob;
        //   }
        //   self.meService.initMe(inData);
        // });
    };
    MediaEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-media-edit',
            template: __webpack_require__(/*! ./media-edit.component.html */ "./src/app/pages/media-edit/media-edit.component.html"),
            styles: [__webpack_require__(/*! ./media-edit.component.css */ "./src/app/pages/media-edit/media-edit.component.css")],
            animations: [
                Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('flyInOut', [
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('in', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(0)' })),
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                        Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(-100%)' }),
                        Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('0.2s ease-in')
                    ]),
                    Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                        Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('0.2s 0.1s ease-out', Object(_node_modules_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateY(-100%)' }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"]])
    ], MediaEditComponent);
    return MediaEditComponent;
}());



/***/ }),

/***/ "./src/app/pages/story/story.component.css":
/*!*************************************************!*\
  !*** ./src/app/pages/story/story.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n    display: -ms-grid;\r\n    display: grid;\r\n    height: 100%;\r\n        -ms-grid-rows: auto 1fr;\r\n        grid-template-rows: auto 1fr;\r\n        grid-template-areas: 'main' 'des';\r\n}\r\n\r\n.nameETC {\r\n    -ms-grid-row: 1;\r\n    -ms-grid-column: 1;\r\n    grid-area: main;\r\n}\r\n\r\nmat-form-field {\r\n    width: 90%;\r\n}\r\n\r\n.description {\r\n    -ms-grid-row: 2;\r\n    -ms-grid-column: 1;\r\n    grid-area: des;\r\n    height: 100%;\r\n}\r\n\r\n.description ::ng-deep [class^=mat-form-field-wrapper], .description ::ng-deep [class^=mat-form-field-flex], .description ::ng-deep [class^=mat-form-field-infix], textarea {\r\n    height: 100%;\r\n}"

/***/ }),

/***/ "./src/app/pages/story/story.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/story/story.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"nameETC\">\n    <mat-form-field>\n      <input matInput placeholder=\"媒體名稱\" [(ngModel)]=\"meService.story.name\">\n    </mat-form-field>\n    \n    <mat-form-field>\n      <input matInput placeholder=\"媒體標題\" [(ngModel)]=\"meService.story.title\">\n    </mat-form-field>\n    \n    <mat-form-field>\n      <input matInput placeholder=\"關鍵字\" [(ngModel)]=\"meService.story.keywords\">\n    </mat-form-field>\n    \n    <mat-form-field>\n      <input matInput placeholder=\"媒體來源\" [(ngModel)]=\"(meService.story.meType===meService.PlayerType.file)?meService.story.fileName:meService.story.urlOrID\">\n    </mat-form-field>      \n  </div>\n  \n  <mat-form-field class=\"description\">\n    <textarea matInput placeholder=\"描述\" [(ngModel)]=\"meService.story.description\">\n    </textarea>\n  </mat-form-field>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/story/story.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/story/story.component.ts ***!
  \************************************************/
/*! exports provided: StoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoryComponent", function() { return StoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/media-edit.service */ "./src/app/services/media-edit.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StoryComponent = /** @class */ (function () {
    function StoryComponent(meService) {
        this.meService = meService;
    }
    StoryComponent.prototype.ngOnInit = function () {
    };
    StoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-story',
            template: __webpack_require__(/*! ./story.component.html */ "./src/app/pages/story/story.component.html"),
            styles: [__webpack_require__(/*! ./story.component.css */ "./src/app/pages/story/story.component.css")]
        }),
        __metadata("design:paramtypes", [_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"]])
    ], StoryComponent);
    return StoryComponent;
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

module.exports = "<input #selFile type=\"file\" multiple (change)=\"onSelFileChange(selFile.files,$event.target === audioFile)\">\r\n<!-- list of files -->\r\n<mat-list dense *ngIf=\"!!entries\">\r\n    <app-draglist *ngFor=\"let entry of entries\"\r\n    [story]=\"entry\"\r\n    (delete)=\"onRmFile(entry)\"\r\n    (contentClick)=\"onClickAFile(entry)\" >\r\n    </app-draglist>\r\n</mat-list>\r\n<video #audioFromFile autoplay controls [src]=\"audioSrc|safe\">\r\n</video>\r\n<hr>\r\n<div>\r\n    <div>Is cordova support? {{(isCordovaSupport)?\"Yes\":\"No\"}}</div>\r\n    <div>Is cordova.file support? {{(isFilePluginSupport)?\"Yes\":\"No\"}}</div>\r\n</div>\r\n<div>\r\n    <button mat-raised-button (click)=\"onGetDocFolder()\">\r\n        <mat-icon>folder</mat-icon>\r\n    </button>\r\n    {{newFolderName}}\r\n</div>\r\n<br/>\r\n<div>\r\n    <button (click)=\"onSelectFromNSQL()\">select nanoSQL</button>\r\n</div>\r\n<br/>\r\n<div>\r\n    <button (click)=\"ondeleteFromNSQL()\">delete nanoSQL</button>\r\n</div>\r\n<br/>\r\n<div>\r\n    <button (click)=\"onUpsertFromNSQL()\">upsert nanoSQL</button>\r\n</div>"

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
/* harmony import */ var _services_db_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/db.service */ "./src/app/services/db.service.ts");
/* harmony import */ var _services_fs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/fs.service */ "./src/app/services/fs.service.ts");
/* harmony import */ var _node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../node_modules/rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
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
    function TestComponent(msgService, sanitizer, DBService, fsService) {
        this.msgService = msgService;
        this.sanitizer = sanitizer;
        this.DBService = DBService;
        this.fsService = fsService;
    }
    TestComponent.prototype.ngOnInit = function () {
        var self = this;
        this.isCordovaSupport = !!window.cordova;
        this.isFilePluginSupport = this.isCordovaSupport && !!cordova.file;
        this.fsService.ls$('').subscribe(function (entries) { return self.entries = entries; });
    };
    TestComponent.prototype.onSelFileChange = function (files, obj) {
        return __awaiter(this, void 0, void 0, function () {
            var file, self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = files[0];
                        self = this;
                        if (!!file === false) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.fsService.getFile$(file.name, true).pipe(Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (fEntry) {
                                return self.fsService.writeFile$(fEntry, file);
                            }), Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatAll"])()).toPromise()];
                    case 1:
                        _a.sent();
                        this.fsService.ls$('').subscribe(function (entries) { return self.entries = entries; });
                        return [2 /*return*/];
                }
            });
        });
    };
    TestComponent.prototype.onRmFile = function (file) {
        var self = this;
        this.fsService.rmFile$(file).subscribe();
        this.fsService.ls$('').subscribe(function (entries) { return self.entries = entries; });
    };
    TestComponent.prototype.onClickAFile = function (file) {
        this.audioSrc = this.fsService.toURL(file);
    };
    TestComponent.prototype.onSelFileChange_for_windows_videoLibrary = function (files, obj) {
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
    TestComponent.prototype.onSelectFromNSQL = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.DBService.searchAsync()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestComponent.prototype.ondeleteFromNSQL = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.DBService.deleteAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestComponent.prototype.onUpsertFromNSQL = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.DBService.upsertAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
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
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"],
            _services_db_service__WEBPACK_IMPORTED_MODULE_3__["DbService"], _services_fs_service__WEBPACK_IMPORTED_MODULE_4__["FsService"]])
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

/***/ "./src/app/services/clipboard.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/clipboard.service.ts ***!
  \***********************************************/
/*! exports provided: ClipboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardService", function() { return ClipboardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _device_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./device.service */ "./src/app/services/device.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClipboardService = /** @class */ (function () {
    // getText$$: Promise<string>;
    function ClipboardService(device) {
        this.device = device;
    }
    ClipboardService.prototype.getText$$ = function () {
        return new Promise(function (res, rej) {
            if (!!cordova.plugins) {
                cordova.plugins.clipboard.paste(function (t) { return res(t); }, function (e) { return rej(e); });
            }
            else {
                rej('cordova.plugins is undefined');
            }
        });
    };
    ClipboardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_device_service__WEBPACK_IMPORTED_MODULE_1__["DeviceService"]])
    ], ClipboardService);
    return ClipboardService;
}());



/***/ }),

/***/ "./src/app/services/db.service.ts":
/*!****************************************!*\
  !*** ./src/app/services/db.service.ts ***!
  \****************************************/
/*! exports provided: DbService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DbService", function() { return DbService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nano_sql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-sql */ "./node_modules/nano-sql/lib/index.js");
/* harmony import */ var nano_sql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_sql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _device_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./device.service */ "./src/app/services/device.service.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/toPromise */ "./node_modules/rxjs-compat/_esm5/add/operator/toPromise.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _story_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./story.service */ "./src/app/services/story.service.ts");
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








var DbService = /** @class */ (function () {
    function DbService(cService, msgService) {
        var _this = this;
        this.cService = cService;
        this.msgService = msgService;
        this._isInitialized = false;
        this._onDataChanged = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.nStories = 0;
        var self = this;
        var subscriber = function (observer) {
            var action = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!cService.isCordova) return [3 /*break*/, 2];
                            return [4 /*yield*/, cService.onDeviceReady.toPromise()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, self.iniNanoSQL.bind(self)(observer)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            action();
            return function () { };
        };
        // this.onDBReady = StickyObservable.createWithInit<boolean>(subscriber); //original one
        this.onDBReady = (new rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"](subscriber)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])());
        this.onDBReady.subscribe(); // initialize it!!!
    }
    DbService_1 = DbService;
    Object.defineProperty(DbService.prototype, "isInitialized", {
        get: function () {
            return this._isInitialized;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DbService.prototype, "onDataChanged", {
        get: function () {
            return this._onDataChanged;
        },
        enumerable: true,
        configurable: true
    });
    DbService.prototype.getSampleItem = function () {
        var result = new _story_service__WEBPACK_IMPORTED_MODULE_7__["Story"]();
        result.urlOrID = 'https://youtu.be/rpvsEBdP4c8';
        return result;
    };
    DbService.prototype.iniNanoSQL = function (ob) {
        return __awaiter(this, void 0, void 0, function () {
            var mode, buf, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mode = (!!window['nSQLite'] && window.cordova.platformId !== 'browser') ? window['nSQLite'].getMode() : 'PERM';
                        buf = Object(nano_sql__WEBPACK_IMPORTED_MODULE_1__["nSQL"])(DbService_1.storyTableName)
                            .model(DbService_1.storyModel)
                            .config({
                            mode: mode,
                            cache: true,
                            id: 'test'
                        });
                        return [4 /*yield*/, buf.connect()];
                    case 1:
                        _a.sent();
                        this._isInitialized = true;
                        ob.next(true);
                        this.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Info, message: buf.toString() });
                        return [4 /*yield*/, Object(nano_sql__WEBPACK_IMPORTED_MODULE_1__["nSQL"])(DbService_1.storyTableName).query('select', ['COUNT(*) AS count']).exec()];
                    case 2:
                        rows = _a.sent();
                        if (!(!!rows[0].count && rows[0].count > 0)) return [3 /*break*/, 3];
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.upsertAsync()];
                    case 4:
                        rows = _a.sent();
                        _a.label = 5;
                    case 5:
                        this.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Info, message: JSON.stringify(rows) });
                        return [2 /*return*/];
                }
            });
        });
    };
    DbService.prototype.searchAsync = function (tName, selOptions, where, orderBy, offset, limit) {
        if (tName === void 0) { tName = DbService_1.storyTableName; }
        return __awaiter(this, void 0, void 0, function () {
            var select, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onDBReady.toPromise()];
                    case 1:
                        _a.sent(); // make sure it is finished
                        if (!!selOptions) {
                            select = Object(nano_sql__WEBPACK_IMPORTED_MODULE_1__["nSQL"])(tName).query('select', selOptions);
                        }
                        else {
                            select = Object(nano_sql__WEBPACK_IMPORTED_MODULE_1__["nSQL"])(tName).query('select');
                        }
                        if (!!where) {
                            select = select.where(where);
                        }
                        if (!!orderBy) {
                            select = select.orderBy(orderBy);
                        }
                        if (!!offset) {
                            select = select.offset(offset);
                        }
                        if (!!limit) {
                            select = select.limit(limit);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, select.exec()];
                    case 3:
                        result = _a.sent();
                        this.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Info, message: JSON.stringify(result) });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        result = {};
                        this.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Error, message: error_1 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    DbService.prototype.deleteAsync = function (tName, where) {
        if (tName === void 0) { tName = DbService_1.storyTableName; }
        if (where === void 0) { where = ['viewTime', '>', 0]; }
        return __awaiter(this, void 0, void 0, function () {
            var q, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onDBReady.toPromise()];
                    case 1:
                        _a.sent();
                        q = Object(nano_sql__WEBPACK_IMPORTED_MODULE_1__["nSQL"])(tName).query('delete');
                        if (!!where) {
                            q = q.where(where);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, q.exec()];
                    case 3:
                        result = _a.sent();
                        this._onDataChanged.next(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        result = {};
                        this.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Error, message: error_2 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    DbService.prototype.upsertAsync = function (tName, item, where) {
        if (tName === void 0) { tName = DbService_1.storyTableName; }
        return __awaiter(this, void 0, void 0, function () {
            var q, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onDBReady.toPromise()];
                    case 1:
                        _a.sent();
                        if (!!item === false) {
                            item = this.getSampleItem();
                        }
                        q = Object(nano_sql__WEBPACK_IMPORTED_MODULE_1__["nSQL"])(tName).query('upsert', item);
                        if (!!where) {
                            q = q.where(where);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, q.exec()];
                    case 3:
                        result = _a.sent();
                        this._onDataChanged.next(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        result = {};
                        this.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Error, message: error_3 });
                        return [3 /*break*/, 5];
                    case 5:
                        this.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Info, message: JSON.stringify(result) });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DbService.storyTableName = 'stories';
    DbService.storyModel = [
        { key: 'id', type: 'uuid', props: ['pk'] },
        { key: 'name', type: 'string' },
        { key: 'title', type: 'string', props: ['trie'] },
        { key: 'description', type: 'string', props: ['trie'] },
        { key: 'keywords', type: 'string', props: ['trie'] },
        { key: 'fileName', type: 'string' },
        { key: 'fileToken', type: 'string' },
        { key: 'makeTime', type: 'int' },
        { key: 'modifyTime', type: 'int' },
        { key: 'viewTime', type: 'int' },
        { key: 'urlOrID', type: 'string', default: '' },
        { key: 'meType', type: 'int', default: 0 },
        { key: 'frames', type: 'map[]', default: [] }
    ];
    DbService = DbService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_device_service__WEBPACK_IMPORTED_MODULE_2__["DeviceService"], _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], DbService);
    return DbService;
    var DbService_1;
}());



/***/ }),

/***/ "./src/app/services/device.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/device.service.ts ***!
  \********************************************/
/*! exports provided: DeviceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceService", function() { return DeviceService; });
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


var DeviceService = /** @class */ (function () {
    function DeviceService() {
        var _this = this;
        // * [2018-06-??] For cordova
        this.isCordova = !!window.cordova;
        var self = this;
        if (this.isCordova) {
            this.channel = cordova.require('cordova/channel');
            this.onDeviceReady = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](function (ob) {
                _this.channel.onDeviceReady.subscribe(function () {
                    ob.next(); // For subscribe
                    ob.complete(); // For toPromise and auto-unsubscribe
                });
            });
        }
        // * [2018-07-17 19:50] For pointing device's events
        this.onPointerdown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'pointerdown');
        this.onPointermove$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'pointermove');
        // this.onPointermove$ = new Observable(ob => document.addEventListener('pointermove', e => {
        //   const ev = e as PointerEvent;
        //   ob.next(ev);
        //   console.log(ev.screenX);
        // }));
        this.onPointerup$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'pointerup');
        this.onPointerout$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'pointerout');
        this.onMouseup$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mouseup');
        this.onMousemove$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mousemove');
        // this.onMousemove$ = new Observable(ob => document.addEventListener('mousemove', e => {
        //   const ev = e as MouseEvent;
        //   ob.next(ev);
        //   console.log(ev.screenX);
        // }));
        this.onMousedown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mousedown');
    }
    DeviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], DeviceService);
    return DeviceService;
}());



/***/ }),

/***/ "./src/app/services/fs.service.ts":
/*!****************************************!*\
  !*** ./src/app/services/fs.service.ts ***!
  \****************************************/
/*! exports provided: FsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FsService", function() { return FsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _device_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./device.service */ "./src/app/services/device.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FsService = /** @class */ (function () {
    function FsService(device) {
        this.device = device;
        if (device.isCordova === true) {
            this.FSReady$ = device.onDeviceReady.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_) {
                if (!!window['isFilePluginReadyRaised'] === false) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(true);
                }
                if (!!window['isFilePluginReadyRaised']() === true) {
                    window['initPersistentFileSystem']();
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(true);
                }
                else {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, 'filePluginIsReady').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (ev) { return true; }));
                }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])());
        }
        else {
            this.FSReady$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(false).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])());
        }
        this.fs$ = this.getFs$();
    }
    FsService.prototype.getFs$ = function () {
        var obs;
        obs = this.FSReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (isReady) {
            if (isReady) {
                return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subs) {
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                        subs.next(fs);
                        subs.complete();
                    }, subs.error);
                });
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])());
        return obs.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])());
    };
    FsService.prototype.getDir$ = function (path, create, exclusive) {
        if (create === void 0) { create = false; }
        if (exclusive === void 0) { exclusive = false; }
        var self = this;
        return self.fs$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (fs) {
            if (!!fs === false) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
            }
            else {
                return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subs) {
                    if (!!path === false) {
                        subs.next(fs.root);
                        subs.complete();
                    }
                    else {
                        fs.root.getDirectory(path, { create: create, exclusive: exclusive }, function (dir) {
                            subs.next(dir);
                            subs.complete();
                        }, subs.error);
                    }
                });
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])());
    };
    FsService.prototype.ls$ = function (dir) {
        var self = this;
        if (typeof dir === 'string') {
            return self.getDir$(dir).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (dEntry) {
                return self.ls$(dEntry);
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])());
        }
        else {
            if (!!dir === false) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
            }
            return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subs) {
                dir.createReader().readEntries(function (entries) {
                    subs.next(entries);
                    subs.complete();
                }, subs.error);
            });
        }
    };
    FsService.prototype.getFile$ = function (name, create, exclusive) {
        if (create === void 0) { create = false; }
        if (exclusive === void 0) { exclusive = false; }
        var self = this;
        if (self.device.isCordova === false) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
        }
        var obs = self.fs$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (fs) { return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subs) {
            fs.root.getFile(name, { create: create, exclusive: exclusive }, function (file) {
                subs.next(file);
                subs.complete();
            }, subs.error);
        }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])());
        return obs;
    };
    FsService.prototype.writeFile$ = function (fEntry, data, isAppend) {
        if (isAppend === void 0) { isAppend = false; }
        var self = this;
        if (self.device.isCordova === false) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
        }
        var obs = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subs) {
            fEntry.createWriter(function (fWriter) {
                fWriter.onwriteend = function (e) {
                    subs.next(true);
                    console.log(e);
                    subs.complete();
                };
                fWriter.onerror = subs.error;
                if (isAppend) {
                    try {
                        fWriter.seek(fWriter.length);
                    }
                    catch (e) {
                        subs.error(e);
                    }
                }
                fWriter.write(data);
            }, subs.error);
        });
        return obs;
    };
    FsService.prototype.rmFile$ = function (file) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subs) {
            file.remove(function () {
                subs.next(true);
                subs.complete();
            }, subs.error);
        });
    };
    FsService.prototype.toURL = function (file) {
        return file.toURL();
    };
    FsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_device_service__WEBPACK_IMPORTED_MODULE_1__["DeviceService"]])
    ], FsService);
    return FsService;
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
        this.sharedFolderName = 'SegmentedMediaLayer';
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
/*! exports provided: MediaEditService, playerAction, MEState, SideClickType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaEditService", function() { return MediaEditService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerAction", function() { return playerAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEState", function() { return MEState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideClickType", function() { return SideClickType; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _story_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./story.service */ "./src/app/services/story.service.ts");
/* harmony import */ var _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vm/player-type.enum */ "./src/app/vm/player-type.enum.ts");
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
        this.PlayerType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"];
        this._duration = 100;
        this._volume = 1; // **************** TODO *******************
        // ********************** TODO *************************
        this._playbackRate = 1;
        this.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
        this.story = new _story_service__WEBPACK_IMPORTED_MODULE_2__["Story"]();
        this.currentTime = 0;
        this.isRepeat = true;
        this._seekTime = 0;
        this.sideClickType = SideClickType.none;
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
    Object.defineProperty(MediaEditService.prototype, "duration", {
        get: function () {
            return (!!this._duration) ? this._duration : 100;
        },
        set: function (v) {
            this._duration = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaEditService.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (v) {
            this._volume = v;
            this.setVolumeIntoFrame();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaEditService.prototype, "playbackRate", {
        get: function () {
            return this._playbackRate;
        },
        set: function (v) {
            this._playbackRate = v;
            this.setPlaybackRateIntoFrame();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaEditService.prototype, "seekTime", {
        get: function () {
            return this._seekTime;
        },
        set: function (v) {
            this._seekTime = v;
            this.onPlayerAction.next(playerAction.seek);
        },
        enumerable: true,
        configurable: true
    });
    MediaEditService.prototype.initMe = function (data, pType) {
        if (pType === void 0) { pType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].auto; }
        // * [2018-07-19 17:58] pause previous action
        this.onPlayerAction.next(playerAction.pause);
        // * [2018-07-19 17:59] Start to initialize it.
        this.state = MEState.parsing;
        // * [2018-06-20 11:00] Check the type of service is
        if (pType !== _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].auto) {
            this.story.meType = pType;
        }
        else {
            if ((typeof data) === 'string') {
                this.story = new _story_service__WEBPACK_IMPORTED_MODULE_2__["Story"]();
                this.story.meType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].url;
            }
            else if (!!data['viewTime']) {
                this.story = data;
            }
            else if (!!data) {
                this.story = new _story_service__WEBPACK_IMPORTED_MODULE_2__["Story"]();
                this.story.meType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].file;
            }
            else {
                this.state = MEState.parseFailed;
                return;
            }
        }
        if (!!data['viewTime']) {
            // * [2018-07-19 13:41] If input is a story
        }
        else if ((this.story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].url) || (this.story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].youtubeID)) {
            this.story.urlOrID = data;
            this.story.title = this.story.urlOrID;
        }
        else if (this.story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].file) {
            this.blob = data;
            this.story.urlOrID = window.URL.createObjectURL(this.blob);
            if (!!data) {
                this.story.title = this.story.fileName = data.name;
            }
        }
        // * [2018-07-23 10:16] Update the duration & playbackRates
        if (this.story.meType !== _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].youtubeID) {
            this.onPlayerAction.next(playerAction.getDuration);
            this.onPlayerAction.next(playerAction.getAllowedPlaybackRate);
        }
        this.state = MEState.readyForPlayer;
    };
    MediaEditService.prototype.setiFrame = function (i) {
        var self = this;
        if (!!self.story) {
            // **************************** TODO ********************************************
            self.story.iFrame = i;
            self.setVolumeFromFrame();
            self.setPlaybackRateFromFrame();
        }
        else {
            console.log("Problem in setiFrame(" + i + ")");
        }
    };
    MediaEditService.prototype.setVolumeFromFrame = function () {
        var self = this;
        if (!!self.story) {
            var i = self.story.iFrame;
            // **************************** TODO ********************************************
            if (i >= 0) {
                var frame = self.story.frames[i];
                self._volume = frame.volume;
            }
            else {
                self._volume = 1;
            }
            self.onPlayerAction.next(playerAction.setVolume);
        }
        else {
            console.log("Problem in setVolume");
        }
    };
    MediaEditService.prototype.setPlaybackRateFromFrame = function () {
        var self = this;
        if (!!self.story) {
            var i = self.story.iFrame;
            // **************************** TODO ********************************************
            if (i >= 0) {
                var frame = self.story.frames[i];
                self._playbackRate = frame.rate;
            }
            else {
                self._playbackRate = 1;
            }
            self.onPlayerAction.next(playerAction.setPlaybackRate);
        }
        else {
            console.log("Problem in setPlaybackRate");
        }
    };
    /**
     * Provide self._volume at first.
     */
    MediaEditService.prototype.setVolumeIntoFrame = function () {
        var self = this;
        if (!!self.story) {
            var i = self.story.iFrame;
            // **************************** TODO ********************************************
            if (i >= 0) {
                var frame = self.story.frames[i];
                frame.volume = self._volume;
            }
            else {
                // self._volume = 1;
            }
            self.onPlayerAction.next(playerAction.setVolume);
        }
        else {
            console.log("Problem in setVolume");
        }
    };
    /**
   * Provide self._playbackRate at first.
   */
    MediaEditService.prototype.setPlaybackRateIntoFrame = function () {
        var self = this;
        if (!!self.story) {
            var i = self.story.iFrame;
            // **************************** TODO ********************************************
            if (i >= 0) {
                var frame = self.story.frames[i];
                frame.rate = self._playbackRate;
            }
            else {
                // self._playbackRate = 1;
            }
            self.onPlayerAction.next(playerAction.setPlaybackRate);
        }
        else {
            console.log("Problem in setPlaybackRate");
        }
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
    playerAction[playerAction["getDuration"] = 4] = "getDuration";
    playerAction[playerAction["getVolume"] = 5] = "getVolume";
    playerAction[playerAction["setVolume"] = 6] = "setVolume";
    playerAction[playerAction["getPlaybackRate"] = 7] = "getPlaybackRate";
    playerAction[playerAction["setPlaybackRate"] = 8] = "setPlaybackRate";
    playerAction[playerAction["getAllowedPlaybackRate"] = 9] = "getAllowedPlaybackRate";
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
var SideClickType;
(function (SideClickType) {
    SideClickType[SideClickType["none"] = 0] = "none";
    SideClickType[SideClickType["new"] = 1] = "new";
    SideClickType[SideClickType["select"] = 2] = "select";
})(SideClickType || (SideClickType = {}));


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
        var origin = this._messages.slice(0);
        var result = this._messages.reverse();
        this._messages = origin;
        return result;
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

/***/ "./src/app/services/story.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/story.service.ts ***!
  \*******************************************/
/*! exports provided: StoryService, Story */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoryService", function() { return StoryService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Story", function() { return Story; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vm/player-type.enum */ "./src/app/vm/player-type.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StoryService = /** @class */ (function () {
    function StoryService() {
    }
    StoryService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], StoryService);
    return StoryService;
}());

var Story = /** @class */ (function () {
    function Story() {
        this.name = '請給個名字';
        this.title = '歡迎使用本App來幫助學習';
        this.description = '';
        this.keywords = '';
        this.urlOrID = ''; // 'https://youtu.be/rpvsEBdP4c8';
        this.meType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_1__["PlayerType"].url;
        this.fileName = '';
        this.fileToken = '';
        this.iFrame = -1;
        var time = Date.now();
        this.makeTime = this.modifyTime = this.viewTime = time;
        this.frames = [];
        return this;
    }
    return Story;
}());



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
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message.service */ "./src/app/services/message.service.ts");
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
            _this.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].Info, message: 'Youtube Api is initialized' });
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
        uiEle.src = "http://www.youtube.com/embed/" + VId + "?enablejsapi=1&html5=1&playsinline=1";
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
                    'onError': function (ev) { self.onError.next(ev); },
                    'onApiChange': function (ev) {
                        // ************************* TODO for caption******************************
                        // console.log('ytPlayer.getOptions?' + JSON.stringify(self.ytPlayer['getOptions']()));
                    }
                }
            });
        }
    };
    YoutubeService.regYT = /^(http(s)?:\/\/)?(((www\.youtube\.com|youtube\.com)\/.*[\?\&]v=([^\&]+))|(youtu\.be\/([^\&]+)))/i;
    YoutubeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], YoutubeService);
    return YoutubeService;
}());



/***/ }),

/***/ "./src/app/vm/a-frame.ts":
/*!*******************************!*\
  !*** ./src/app/vm/a-frame.ts ***!
  \*******************************/
/*! exports provided: AFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AFrame", function() { return AFrame; });
var AFrame = /** @class */ (function () {
    function AFrame() {
        this.pseudopath = '/';
        this.colorA = 0.9;
        this.top = 0.5; // 0 ~ ${1-height}
        this.height = 0.3;
        this.start = 0;
        this.end = 0;
        this.rate = 1;
        this.volume = 1;
        this.subtitle = '';
        this.colorR = Math.round(Math.random() * 200 + 20);
        this.colorG = Math.round(Math.random() * 200 + 20);
        this.colorB = Math.round(Math.random() * 200 + 20);
        this.genTime = Date.now();
        return this;
    }
    return AFrame;
}());



/***/ }),

/***/ "./src/app/vm/player-type.enum.ts":
/*!****************************************!*\
  !*** ./src/app/vm/player-type.enum.ts ***!
  \****************************************/
/*! exports provided: PlayerType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerType", function() { return PlayerType; });
var PlayerType;
(function (PlayerType) {
    PlayerType[PlayerType["none"] = 0] = "none";
    PlayerType[PlayerType["auto"] = 1] = "auto";
    PlayerType[PlayerType["file"] = 2] = "file";
    PlayerType[PlayerType["url"] = 3] = "url";
    PlayerType[PlayerType["youtubeID"] = 4] = "youtubeID";
})(PlayerType || (PlayerType = {}));


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