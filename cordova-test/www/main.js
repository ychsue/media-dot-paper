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

module.exports = ".container{\n    display: -ms-grid;\n    display: grid;\n        -ms-grid-rows: auto 1fr;\n        grid-template-rows: auto 1fr;\n    height: 100vh;\n        grid-template-areas: \"navbar\" \"content\";\n}\n\napp-navbar{\n    -ms-grid-row: 1;\n    -ms-grid-column: 1;\n    grid-area: navbar;\n    color: white;\n    width: 100vw;\n}\n\nmat-sidenav {\n    display: flex;\n    overflow-x: hidden;\n}\n\napp-home {\n    flex: 1;\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-rows: auto 1fr;\n        grid-template-rows: auto 1fr;\n}\n\n.vSeparate {\n    position: absolute;\n    z-index: 1;\n    width: 2px;\n    height: 100%;\n    background-color: black;\n    touch-action: none;\n}\n\n.vSeparate:hover {\n    cursor: col-resize;\n}\n\n.content{\n    -ms-grid-row: 2;\n    -ms-grid-column: 1;\n    grid-area: content;\n    overflow-y: auto;\n}\n\n.page{\n    width: 100%;\n    height: 100%;\n}\n\n#resizeWidth {\n    touch-action: none;\n    position: absolute;\n    top: 50%;\n    right: 0;\n    width: 20px;\n    height: 40px;\n    order: 2;\n    z-index: 2;\n}\n\n#sidenavTabs {\n    z-index: 0;\n    width: 100%;\n}\n\n#sidenavTabs ::ng-deep .mat-tab-label {\n    min-width: 40px !important;\n}\n\n#sidenavTabs ::ng-deep .mat-tab-body-wrapper {\n    position: relative;\n    height: 100%;\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #container class=\"container\">\n  <app-navbar #navbar class=\"mat-elevation-z6\" (toggleSidenav_Click)=\"sidenav.opened=!sidenav.opened\"></app-navbar>\n  <mat-sidenav-container #sidenavContainer class=\"content\">\n      <mat-sidenav #sidenav [mode]=\"sidenavMode\" align=\"start\" [opened]=\"true\"\n        [style.width]=\"sidenavWidth+'px'\">\n        <!-- <app-home class=\"page\" [style.display]=\"(gv.shownPage===pageType.Home)?'block':'none'\"></app-home> -->\n        <mat-tab-group id=\"sidenavTabs\" mat-stretch-tabs [dynamicHeight]=\"true\">\n            <mat-tab>\n                <ng-template matTabLabel>\n                    <mat-icon>library_music</mat-icon>\n                </ng-template>\n                <app-home class=\"page\"></app-home>\n            </mat-tab>            \n            <mat-tab>\n                <ng-template matTabLabel>\n                    <mat-icon>music_video</mat-icon>\n                </ng-template>\n                <app-story class=\"page\" *ngIf=\"!!meService.story?.urlOrID===true\"></app-story>\n                <span *ngIf=\"!!meService.story?.urlOrID===false\">{{(!!pts)?pts.chooseAMediaAtFirst:'請先選一個媒體'}}</span>\n            </mat-tab>            \n        </mat-tab-group>\n        <div class=\"vSeparate\" [style.left]=\"sidenavWidth-2+'px'\" touch-action=\"none\"\n          (pointerdown)=\"onvSepPointerDown($event)\"></div>\n        <svg id=\"resizeWidth\" viewBox=\"0 0 10 20\" (pointerdown)=\"onvSepPointerDown($event)\" touch-action=\"none\">\n          <polygon points=\"0,10 10,0 10,20\" style=\"fill:cadetblue;opacity: 0.5;\"/>\n        </svg>\n      </mat-sidenav>\n      <!-- <div class=\"page\"> -->\n        <!-- <router-outlet></router-outlet> -->\n        <mat-sidenav-content class=\"page\" [style.margin-left]=\"(sidenavMode==='over')?0:(sidenavWidth+'px')\"\n          [style.width]=\"((sidenavMode==='over'||(sidenav.opened===false))?container.clientWidth:(container.clientWidth-sidenavWidth))+'px'\">\n            <app-media-edit class=\"page\" [style.display]=\"(gv.shownPage===pageType.MediaEdit)?'block':'none'\"></app-media-edit>\n            <app-test class=\"page\" [style.display]=\"(gv.shownPage===pageType.Test)?'block':'none'\"></app-test>\n        </mat-sidenav-content>\n      <!-- </div> -->\n      </mat-sidenav-container>\n</div>\n"

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
/* harmony import */ var _services_page_texts_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/page-texts.service */ "./src/app/services/page-texts.service.ts");
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
    function AppComponent(msgService, gv, ptsService, ytService, device, meService) {
        this.msgService = msgService;
        this.gv = gv;
        this.ptsService = ptsService;
        this.ytService = ytService;
        this.device = device;
        this.meService = meService;
        this.resize$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.pageType = _services_gv_service__WEBPACK_IMPORTED_MODULE_3__["PageType"];
        var self = this;
        self.ptsService.PTSReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["concat"])(self.ptsService.ptsLoaded$)).subscribe(function (isDone) {
            if (isDone) {
                self.pts = self.ptsService.pts.appComp;
            }
        });
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
            _services_page_texts_service__WEBPACK_IMPORTED_MODULE_8__["PageTextsService"],
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
/* harmony import */ var _services_page_texts_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./services/page-texts.service */ "./src/app/services/page-texts.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_ad_service__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./services/ad.service */ "./src/app/services/ad.service.ts");
/* harmony import */ var _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./services/speech-synthesis.service */ "./src/app/services/speech-synthesis.service.ts");
/* harmony import */ var _components_set_speech_synthesis_set_speech_synthesis_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/set-speech-synthesis/set-speech-synthesis.component */ "./src/app/components/set-speech-synthesis/set-speech-synthesis.component.ts");
/* harmony import */ var _services_cross_comp_service__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./services/cross-comp.service */ "./src/app/services/cross-comp.service.ts");
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
                _pipes_safe_pipe__WEBPACK_IMPORTED_MODULE_10__["SafeHtmlPipe"],
                _pages_media_edit_media_edit_component__WEBPACK_IMPORTED_MODULE_11__["MediaEditComponent"],
                _components_me_main_dashboard_me_main_dashboard_component__WEBPACK_IMPORTED_MODULE_12__["MeMainDashboardComponent"],
                _components_me_section_dashboard_me_section_dashboard_component__WEBPACK_IMPORTED_MODULE_13__["MeSectionDashboardComponent"],
                _components_me_mani_plate_me_mani_plate_component__WEBPACK_IMPORTED_MODULE_14__["MeManiPlateComponent"],
                _components_player_player_component__WEBPACK_IMPORTED_MODULE_15__["PlayerComponent"],
                _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_19__["DialogComponent"],
                _components_draglist_draglist_component__WEBPACK_IMPORTED_MODULE_23__["DraglistComponent"],
                _components_swap_icon_swap_icon_component__WEBPACK_IMPORTED_MODULE_24__["SwapIconComponent"],
                _pages_story_story_component__WEBPACK_IMPORTED_MODULE_26__["StoryComponent"],
                _components_set_speech_synthesis_set_speech_synthesis_component__WEBPACK_IMPORTED_MODULE_33__["SetSpeechSynthesisComponent"]
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
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTooltipModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_30__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSlideToggleModule"]
            ],
            providers: [_services_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"], _services_media_edit_service__WEBPACK_IMPORTED_MODULE_16__["MediaEditService"], _services_youtube_service__WEBPACK_IMPORTED_MODULE_17__["YoutubeService"], _services_gv_service__WEBPACK_IMPORTED_MODULE_18__["GvService"], _services_db_service__WEBPACK_IMPORTED_MODULE_21__["DbService"], _services_device_service__WEBPACK_IMPORTED_MODULE_22__["DeviceService"],
                _services_fs_service__WEBPACK_IMPORTED_MODULE_27__["FsService"], _services_clipboard_service__WEBPACK_IMPORTED_MODULE_28__["ClipboardService"], _services_page_texts_service__WEBPACK_IMPORTED_MODULE_29__["PageTextsService"], _services_ad_service__WEBPACK_IMPORTED_MODULE_31__["AdService"], _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_32__["SpeechSynthesisService"], _services_cross_comp_service__WEBPACK_IMPORTED_MODULE_34__["CrossCompService"]
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

module.exports = ".container {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 1fr;\n        grid-template-columns: 1fr;\n}\n\n.backDel {\n    -ms-grid-column: 1;\n    grid-column: 1;\n    -ms-grid-row: 1;\n    grid-row: 1;\n    background-color: red;\n    border-radius: 4px;\n    display: flex;\n    align-items: center;\n    color: white;\n}\n\n.right {\n    margin-left: auto;\n}\n\n.content {\n    -ms-grid-column: 1;\n    grid-column: 1;\n    -ms-grid-row:1;\n    grid-row:1;\n    background-color: white;\n    touch-action: none;\n}"

/***/ }),

/***/ "./src/app/components/draglist/draglist.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/draglist/draglist.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"backDel\">\n        <mat-icon class=\"mat-18 left\">delete</mat-icon>\n        <mat-icon class=\"mat-18 right\">delete</mat-icon>\n    </div>\n    <button mat-button class=\"content\" (pointerdown)=\"onContentPointerdown($event)\" (click)=\"onContentClick($event)\" [style.transform]=\"'translateX('+deltaX+'px)'\" touch-action=\"none\">{{story.name}}</button>\n</div>"

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
/* harmony import */ var _services_cross_comp_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/cross-comp.service */ "./src/app/services/cross-comp.service.ts");
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
    function DraglistComponent(deviceService, ccService) {
        this.deviceService = deviceService;
        this.ccService = ccService;
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
        // Get scrollTop value
        var scrollTop = -Infinity;
        // Get the movingX and final V_x
        self._subSwap = self.contentPointerdown$.pipe(Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_) { return self.deviceService.onPointermove$.pipe(Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(self.deviceService.onPointerup$), 
        // takeUntil(self.deviceService.onPointermove$.pipe(
        //   debounceTime(400),
        //   merge(self.deviceService.onPointerup$)
        // )),
        Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concat"])(Object(_node_modules_rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({ timeStamp: 0, movementX: 0, screenX: -Infinity, screenY: -Infinity }))); }), Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])(), 
        // map(ev => ev.clientX)
        Object(_node_modules_rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["withLatestFrom"])(self.contentPointerdown$, function (e_move, e_down) {
            if (e_move.timeStamp !== 0) {
                self._tmpXPointermove = { time: e_move.timeStamp, x: e_move.screenX };
            }
            return [e_move.screenX - e_down.screenX, e_move.screenY - e_down.screenY];
        })).subscribe(function (dxy) {
            if (dxy[0] < -1000) {
                self.deltaX = 0;
                self._tmpVx = (self._tmpXPointermove.x - self._tmpXPointerdown.x) / (self._tmpXPointermove.time - self._tmpXPointerdown.time);
                // * [2018-07-19 10:38] send out a notification 'delete' when the speedX is higher than 0.5
                if (Math.abs(self._tmpVx) > self.maxSpeed) {
                    self.delete.next();
                }
                scrollTop = -Infinity;
            }
            else {
                if (Math.abs(dxy[0]) > Math.abs(dxy[1])) {
                    self.deltaX = (dxy[0] < -1000) ? 0 : dxy[0];
                }
                else {
                    if (!!self.ccService.listOfStoredEle) {
                        scrollTop = (scrollTop < -1000) ? self.ccService.listOfStoredEle.scrollTop : scrollTop;
                        self.ccService.listOfStoredEle.scrollTop = scrollTop - dxy[1];
                    }
                }
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
        __metadata("design:paramtypes", [_services_device_service__WEBPACK_IMPORTED_MODULE_2__["DeviceService"], _services_cross_comp_service__WEBPACK_IMPORTED_MODULE_4__["CrossCompService"]])
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

module.exports = ".container {\n    width: 100%;\n    position: relative;\n    -ms-grid-row-align: center;\n        align-self: center;\n    height: 40px;\n    display:-ms-grid;\n    display:grid;\n}\n\n.slideContainer {\n    align-items: center;\n    /* display: flex; */\n    display: -ms-grid;\n    display: grid;\n        -ms-grid-columns: auto 1fr auto;\n        grid-template-columns: auto 1fr auto;\n        -ms-grid-rows: 1fr;\n        grid-template-rows: 1fr;\n        grid-template-areas: \"start center end\";\n}\n\n.slideStart {\n    -ms-grid-row: 1;\n    -ms-grid-column: 1;\n    grid-area: start\n}\n\n.slidePart {\n    display: -ms-grid;\n    display: grid;\n    position: relative;\n    height: 100%;\n    align-items: center;\n    -ms-grid-row: 1;\n    -ms-grid-column: 2;\n    grid-area: center;\n    overflow: hidden;\n    min-width: 0;\n}\n\n.slideEnd {\n    -ms-grid-row: 1;\n    -ms-grid-column: 3;\n    grid-area: end\n}\n\n.slideCanvas {\n    order: 0;\n    z-index: 0;\n    -ms-grid-column: 1;\n    grid-column: 1;\n    -ms-grid-row: 1;\n    grid-row: 1;\n    -o-object-fit: fill;\n       object-fit: fill;\n    width: 100%;\n    height: 100%;\n    position: relative;\n    -webkit-transform-origin: left;\n            transform-origin: left;\n}\n"

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

module.exports = ".container {\n    touch-action: none;\n    width: 100%;\n    height: 100%;\n    display: -ms-grid;\n    display: grid;\n        -ms-grid-columns: 1fr;\n        grid-template-columns: 1fr;\n        -ms-grid-rows: 1fr auto;\n        grid-template-rows: 1fr auto;\n        grid-template-areas: \"main\" \"slider\";\n}\n\n.main {\n    -ms-grid-row: 1;\n    -ms-grid-column: 1;\n    grid-area: main;\n    display: -ms-inline-grid;\n    display: inline-grid;\n        -ms-grid-columns: 1fr;\n        grid-template-columns: 1fr;\n        -ms-grid-rows: 1fr 1fr 1fr;\n        grid-template-rows: 1fr 1fr 1fr;\n        grid-template-areas: \"main-up\" \"main-play\" \"main-down\";\n    align-items: center;\n    justify-items: center;\n}\n\n.main-up {\n    -ms-grid-row: 1;\n    -ms-grid-column: 1;\n    grid-area: main-up;\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 1fr;\n        grid-template-columns: 1fr;\n    z-index: 1;\n}\n\n.main-play {\n    -ms-grid-row: 2;\n    -ms-grid-column: 1;\n    grid-area: main-play;\n    z-index: 1;\n}\n\n.main-down {\n    -ms-grid-row: 3;\n    -ms-grid-column: 1;\n    grid-area: main-down;\n    width: 100%;\n    height: 100%;\n    align-self: baseline;\n    display: -ms-grid;\n    display: grid;\n}\n\n.smallSlider {\n    display: flex;\n    align-items: center;\n    border-radius: 20px;\n    background-color: white;\n    margin: 4px;\n}\n\n.slider {\n    -ms-grid-row: 2;\n    -ms-grid-column: 1;\n    grid-area: slider;\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: auto 1fr auto;\n        grid-template-columns: auto 1fr auto;\n    background-color: white;\n    border-radius: 20px;\n    align-items: center;\n}\n\nmat-slider {\n    -ms-grid-row: 1;\n    grid-row: 1;\n    -ms-grid-column: 2;\n    grid-column: 2;\n}\n\n.slider-start {\n    -ms-grid-row: 1;\n    grid-row: 1;\n    -ms-grid-column: 1;\n    grid-column: 1;\n    margin: 4px;\n}\n\n.slider-end {\n    -ms-grid-row: 1;\n    grid-row: 1;\n    -ms-grid-column: 3;\n    grid-column: 3;\n    margin: 4px;\n}\n\n.upCenter,\n.upLeft,\n.upRight {\n    width: 30%;\n    top: -100%;\n    position: relative;\n    -ms-grid-row: 1;\n    grid-row: 1;\n}\n\n.upLeft {\n    -ms-grid-column: 1;\n    -ms-grid-column-span: 2;\n    grid-column: 1/3;\n}\n\n.upCenter {\n    -ms-grid-column: 2;\n    grid-column: 2;\n    -ms-grid-column-align: center;\n        justify-self: center;\n    text-shadow: 3px 0px 5px black, -3px 0px 5px black, 0px 3px 5px black, 0px -3px 5px black;\n    text-align: center;\n    color: white;\n}\n\n.upRight {\n    -ms-grid-column: 2;\n    -ms-grid-column-span: 2;\n    grid-column: 2/4;\n    -ms-grid-column-align: right;\n        justify-self: right;\n}\n\n.largeBtn {\n    width: 120px;\n    height: 120px;\n}\n\n#btnStart {\n    border-radius: 50% 0 0 50%;\n    margin: 0 8px;\n}\n\n#btnEnd {\n    border-radius: 0 50% 50% 0;\n    margin: 0 8px;\n}\n\n.subtitle,\n.subtitle-shadow {\n    text-align: center;\n    min-height: 20px;\n    width: 100%;\n    height: 100%;\n    background-color: white;\n    -ms-grid-column: 1;\n        grid-column-start: 1;\n    -ms-grid-row: 1;\n        grid-row-start: 1;\n}\n\n.subtitle {\n    z-index: 2;\n}\n\n.subtitle-shadow {\n    z-index: 1;\n    text-shadow: 3px 0px 5px black, -3px 0px 5px black, 0px 3px 5px black, 0px -3px 5px black;\n    color: white;\n    background-color: transparent;\n}\n\n.flex {\n    display: flex;\n    justify-content: center;\n}\n\n.setSS {\n    -ms-grid-row: 1;\n    -ms-grid-column: 1;\n    grid-area: main-up;\n    -ms-grid-row: main-up;\n        grid-row-start: main-up;\n    -ms-grid-row-span: NaN;\n    grid-row-end: main-play;\n    background-color: lightyellow;\n    width: 100%;\n    height: 100%;\n    z-index: 2;\n}"

/***/ }),

/***/ "./src/app/components/me-mani-plate/me-mani-plate.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/me-mani-plate/me-mani-plate.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" [@changeFrame]=\"meService.story.iFrame\" (pointerenter)=\"HideShow='show'\" (pointerleave)=\"onPointLeave($event)\" touch-action=\"none\">\n    <div class=\"main\">\n        <div class=\"main-up\" [@hideShow]=\"HideShow\" *ngIf=\"isSSShown===false\">\n            <div class=\"flex\">\n                <div #ratio class=\"smallSlider\">\n                    <mat-icon>directions_walk</mat-icon>\n                    <mat-slider min=\"0\" [max]=\"meService.availablePlaybackRates.length-1\" step=\"1\" [displayWith]=\"tickDisplayWith(meService)\" thumbLabel [value]=\"meService.availablePlaybackRates.indexOf(meService.playbackRate)\" (input)=\"meService.playbackRate=meService.availablePlaybackRates[$event.value]\"></mat-slider>\n                    <mat-icon>flight</mat-icon>\n                </div>\n                <div #volume class=\"smallSlider\">\n                    <mat-icon>volume_mute</mat-icon>\n                    <mat-slider min=\"0\" max=\"1\" step=\"0.2\" thumbLabel [(ngModel)]=\"meService.volume\"></mat-slider>\n                    <mat-icon>volume_up</mat-icon>\n                </div>\n            </div>\n            <div class=\"flex\">\n                <mat-slide-toggle [(ngModel)]=\"meService.story.frames[meService.story.iFrame].isUtter\" color=\"primary\">\n                    語音模擬字幕？\n                </mat-slide-toggle>\n                <button mat-icon-button mat-raised-button *ngIf=\"meService.story.frames[meService.story.iFrame].isUtter\" (click)=\"onShowSetSS($event)\">\n                <mat-icon class=\"mat-18\">build</mat-icon>\n            </button>\n            </div>\n        </div>\n\n        <div class=\"main-play\" [@hideShow]=\"HideShow\" *ngIf=\"isSSShown===false\">\n            <button id=\"btnStart\" mat-icon-button mat-raised-button (click)=\"meService.seekTime=meService.story.frames[meService.story.iFrame].start\" (pointerdown)=\"startChanged$.next($event)\">\n        <mat-icon class=\"mat-18\">skip_previous</mat-icon>\n    </button>\n            <button mat-icon-button mat-raised-button class=\"largeBtn\" (click)=\"onPlayPause()\">\n        <svg viewBox=\"0 0 10 10\" *ngIf=\"previousState!==MEState.playing\">\n            <polygon points=\"8,5 3,2 3,8\" style=\"fill:darkblue\"/>\n        </svg>\n        <svg viewBox=\"0 0 10 10\" *ngIf=\"previousState===MEState.playing\">\n            <rect x=\"2\" y=\"2\" width=\"2\" height=\"6\" style=\"fill:red\"/>\n            <rect x=\"6\" y=\"2\" width=\"2\" height=\"6\" style=\"fill:red\"/>\n        </svg>\n    </button>\n            <button id=\"btnEnd\" mat-icon-button mat-raised-button (click)=\"meService.seekTime=meService.story.frames[meService.story.iFrame].end\" (pointerdown)=\"endChanged$.next($event)\">\n    <mat-icon class=\"mat-18\">skip_next</mat-icon>\n</button>\n        </div>\n\n        <app-set-speech-synthesis class=\"setSS\" *ngIf=\"isSSShown\" [utterPara]=\"utterPara\" (change)=\"onUtterParaChanged(subtitleView.innerText,$event)\" (close)=\"isSSShown=false\" [@hideShow]=\"HideShow\" [@flyInOut]=\"isSSShown\"></app-set-speech-synthesis>\n\n        <div class=\"main-down\">\n            <div #subtitleView class=\"subtitle-shadow\" [innerHTML]=\"subtitleInput.value|safeHtml\" [style.display]=\"(HideShow==='show')?'none':'block'\"></div>\n            <textarea matInput #subtitleInput class=\"subtitle\" [ngModel]=\"meService.story.frames[meService.story.iFrame].subtitle\" (ngModelChange)=\"subtitleChange$.next([subtitleInput.value,subtitleView.innerText])\" (click)=\"onSubtitleClicked($event)\" [style.opacity]=\"(HideShow==='show')?1:0\">\n            </textarea>\n        </div>\n    </div>\n    <div class=\"slider\">\n        <input #inStart type=\"number\" [@flyInOut]=\"IOStartShown\" class=\"upLeft\" [(ngModel)]=\"meService.story.frames[meService.story.iFrame].start\" (blur)=\"IOStartShown='out'\">\n        <div class=\"upCenter\">{{meService.currentTime}}</div>\n        <input #inEnd type=\"number\" [@flyInOut]=\"IOEndShown\" class=\"upRight\" [(ngModel)]=\"meService.story.frames[meService.story.iFrame].end\" (blur)=\"IOEndShown='out'\">\n        <span class=\"slider-start\" (click)=\"onOpenInputStart(inStart)\">{{meService.story.frames[meService.story.iFrame].start | number: '1.1-1'}}</span>\n        <!-- <mat-form-field><input class=\"slider-start\" matInput [(ngModel)]=\"meService.story.frames[meService.story.iFrame].start\"></mat-form-field> -->\n        <mat-slider #frameSlider [min]=\"meService.story.frames[meService.story.iFrame].start\" [max]=\"meService.story.frames[meService.story.iFrame].end\" [value]=\"meService.currentTime\" (change)=\"meService.seekTime=frameSlider.value\"></mat-slider>\n        <span class=\"slider-end\" (click)=\"onOpenInputEnd(inEnd)\">{{meService.story.frames[meService.story.iFrame].end | number: '1.1-1'}}</span>\n    </div>\n</div>"

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
/* harmony import */ var _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/speech-synthesis.service */ "./src/app/services/speech-synthesis.service.ts");
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
    function MeManiPlateComponent(meService, SSService, device) {
        this.meService = meService;
        this.SSService = SSService;
        this.device = device;
        this.previousState = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].initialized;
        this.MEState = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"];
        this.IOStartShown = 'out';
        this.IOEndShown = 'out';
        this.HideShow = 'show';
        this._msDelta = 400;
        this.isSSShown = false;
        // [innerHtml,innerText]
        this.subtitleChange$ = new _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.unSubscribed$ = new _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.startChanged$ = new _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.endChanged$ = new _node_modules_rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.tickDisplayWith = function (meService) {
            return function (i) {
                return meService.availablePlaybackRates[i];
            };
        };
    }
    MeManiPlateComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.previousState = this.meService.state;
        // * [2018-08-25 18:19] Update utterPara when iFrame is updated
        this.meService.setiFrame$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(self.unSubscribed$)).subscribe(function (i) {
            if (i >= 0) {
                self.updateUtterParaOfAFrame(i);
                if (_this.meService.story.frames[_this.meService.story.iFrame].isUtter === true) {
                    self.utterSubtitle(self.utterPara.text, self.utterPara);
                }
            }
        });
        // * [2018-08-25 18:44] For subtitleChange
        self.subtitleChange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(self.unSubscribed$)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["distinctUntilChanged"])()).subscribe(function (sts) {
            self.meService.story.frames[self.meService.story.iFrame].subtitle = sts[0];
            self.meService.story.frames[self.meService.story.iFrame].utterPara.text = sts[0];
        });
        // * [2018-08-26 16:56] Reutter the subtitle for repeatStart
        self.meService.repeatStart$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(self.unSubscribed$)).subscribe(function (i) {
            if (i >= 0) {
                if (_this.meService.story.frames[i].isUtter === true) {
                    self.utterSubtitle(self.utterPara.text, self.utterPara);
                }
            }
        });
    };
    MeManiPlateComponent.prototype.ngOnDestroy = function () {
        this.unSubscribed$.next(true);
        this.unSubscribed$.complete();
        this.unSubscribed$ = null;
    };
    MeManiPlateComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var self = this;
        Promise.resolve(null).then(function (_) { return _this.HideShow = 'hide'; });
        // * [2018-08-09 14:44] For start and value
        self.startChanged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(self.unSubscribed$)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (ev) {
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
        self.endChanged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(self.unSubscribed$)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (ev) {
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
    MeManiPlateComponent.prototype.onUtterParaChanged = function (text, utterPara) {
        // * [2018-08-25 16:14] Update the frame
        if (this.meService.story.iFrame >= 0) {
            var storyUtterPara = Object.assign({}, utterPara);
            this.meService.story.frames[this.meService.story.iFrame].utterPara = storyUtterPara;
            storyUtterPara.text = text;
            storyUtterPara.voiceName = utterPara.voice.name;
            storyUtterPara.lang = utterPara.voice.lang;
            utterPara.voiceName = utterPara.voice.name;
            utterPara.lang = utterPara.voice.lang;
            delete storyUtterPara['voice'];
        }
        // * [2018-08-25 16:15] Play it.
        if (this.meService.story.frames[this.meService.story.iFrame].isUtter === true) {
            this.utterSubtitle(text, utterPara);
        }
    };
    MeManiPlateComponent.prototype.utterSubtitle = function (text, utterPara) {
        this.utterPara = utterPara;
        this.utterPara.text = text;
        this.SSService.speak(this.utterPara);
    };
    MeManiPlateComponent.prototype.onPointLeave = function (e) {
        if (this.isSubtitleClicked === false) {
            this.HideShow = 'hide';
        }
    };
    MeManiPlateComponent.prototype.onSubtitleClicked = function (e) {
        var self = this;
        self.isSubtitleClicked = true;
        this.HideShow = 'show';
        setTimeout(function (_) { return self.isSubtitleClicked = false; }, 100);
    };
    MeManiPlateComponent.prototype.onShowSetSS = function (e) {
        this.isSSShown = true;
    };
    MeManiPlateComponent.prototype.updateUtterParaOfAFrame = function (iFrame) {
        if (iFrame === void 0) { iFrame = 0; }
        var self = this;
        var story = self.meService.story;
        var utterPara;
        // * [2018-08-25 15:10] Update utterPara from a frame
        if (!!story.frames[iFrame].utterPara === false) {
            utterPara = new _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_6__["SSutterParameters"]();
            story.frames[iFrame].utterPara = utterPara;
        }
        // * [2018-08-25 18:25] Also update this.utterPara
        utterPara = Object.assign({}, story.frames[iFrame].utterPara);
        self.utterPara = self.SSService.updateUtterParaWithVoice(utterPara);
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
        __metadata("design:paramtypes", [src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"], _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_6__["SpeechSynthesisService"],
            _services_device_service__WEBPACK_IMPORTED_MODULE_4__["DeviceService"]])
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

module.exports = ".container {\n    display: flex;\n}\n\n.large {\n    font-size: large;\n}\n\n.listContainer {\n    flex-grow: 1;\n    max-height: 120px;\n    overflow-y: auto;\n    display: inline;\n}\n\n.blink {\n    -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n    -webkit-animation-name: blink;\n            animation-name: blink;\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n}\n\n@-webkit-keyframes blink {\n    to {\n        opacity: 0.8;\n    }\n}\n\n@keyframes blink {\n    to {\n        opacity: 0.8;\n    }\n}"

/***/ }),

/***/ "./src/app/components/me-section-dashboard/me-section-dashboard.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/components/me-section-dashboard/me-section-dashboard.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <button id=\"allBtn\" mat-icon-button mat-raised-button (click)=\"onWhichFrame(-1)\">\n    <mat-icon class=\"mat-18\">all_inclusive</mat-icon>\n  </button>\n  <button id=\"plusBtn\" mat-icon-button mat-raised-button (click)=\"onAddFrame()\">\n    <span class=\"large\">+</span>\n  </button>\n\n  <div class=\"listContainer\">\n    <app-swap-icon\n    *ngFor=\"let aFrame of meService.story.frames; let i = index;\" \n    [index]=\"i\"\n    [bR]=\"aFrame.colorR\"\n    [bG]=\"aFrame.colorG\"\n    [bB]=\"aFrame.colorB\"\n    [class.blink]=\"i===meService.story.iFrame\"\n    (contentClick)=\"onWhichFrame(i)\"\n    (delete)=\"onRemoveFrame(i)\">\n    </app-swap-icon>\n  </div>\n</div>"

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

module.exports = "video{\n    height: 100%;\n    width: auto;\n    max-width: 100%;\n    background: transparent no-repeat;\n    /* For windows, it should be '/www/...' and for android is '/android_asset/www/...' */\n    /* Now I declare it in html file */\n    background-size: contain;\n    background-position: center;\n}\n\n.container, #youtube {\n    width: 100%;\n    height: 100%\n}"

/***/ }),

/***/ "./src/app/components/player/player.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/player/player.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <video #video [style.display]=\"(meService.story.meType===pType.url||meService.story.meType===pType.file)?'block':'none'\" (click)=\"onVideoPlayOrPause($event)\" controls poster=\"data:image/gif;base64,AAAA\" [style.background-image]=\"'url(\\'assets/MusicNotes.svg\\')'\"\n        [src]=\"videoSrc|safe\"></video>\n    <iframe #youtube id=\"youtube\" [frameBorder]=\"0\" [style.display]=\"(meService.story.meType===pType.youtubeID)?'block':'none'\"></iframe>\n</div>"

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
    function PlayerComponent(meService, YTservice, msgService, ngZone, device) {
        this.meService = meService;
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
        if ((this.meService.state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].readyForPlayer) && (this.isInited === false)) {
            this.initMe();
            this.isInited = true;
        }
        if (this.device.isCordova && cordova.platformId === 'ios') {
            self.videoEle.setAttribute("playsinline", "true");
        }
        self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playerReady;
    };
    PlayerComponent.prototype.ngOnDestroy = function () {
        this.unSubscribed.next(true);
        this.unSubscribed.complete();
    };
    PlayerComponent.prototype.getCurrentTime = function () {
        var self = this;
        var meType = self.meService.story.meType;
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
        this.meService.onStateChanged
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
        self.meService.onCurrentTimeChanged = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(self._msInterval)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_) { return self.getCurrentTime(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());
        self.meService.onCurrentTimeChanged
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (t) {
            self.meService.currentTime = t;
            // console.log(t);
        });
        var isDuringStart = false; // For iOS because its seek time might be earlier than the time you are seeking to
        var isDuringEnd = false;
        // * [2018-07-24 13:48] For repeating each frame
        self.meService.onCurrentTimeChanged
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (t) {
            try {
                var start_1 = 0;
                var end = self.meService.duration - 0.1;
                var iFrame_1 = self.meService.story.iFrame;
                if (iFrame_1 >= 0) {
                    var frame = self.meService.story.frames[iFrame_1];
                    if (!!frame) {
                        start_1 = frame.start;
                        end = frame.end;
                    }
                }
                if (t < start_1) {
                    if (isDuringStart === false) {
                        isDuringStart = true;
                        self.meService.seekTime = start_1;
                    }
                }
                else if (t > (end - (self._msInterval / 1000))) {
                    if (isDuringEnd === false) {
                        isDuringEnd = true;
                        setTimeout(function () {
                            isDuringEnd = false;
                            self.meService.seekTime = start_1;
                            if (self.meService.isRepeat === false) {
                                self.meService.onPlayerAction.next(src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause);
                            }
                            else {
                                self.meService.repeatStart$.next(iFrame_1);
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
            self.meService.duration = self.videoEle.duration;
            self.meService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
        });
        self.YTservice.onReady
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (_) {
            self.meService.duration = self.YTservice.ytPlayer.getDuration();
            self.meService.availablePlaybackRates = self.YTservice.ytPlayer.getAvailablePlaybackRates();
        });
        // * For playerAction
        this.meService.onPlayerAction
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(self.unSubscribed))
            .subscribe(function (t) {
            var meType = self.meService.story.meType;
            if (meType === self.pType.url || meType === self.pType.file) {
                switch (t) {
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play:
                        self.videoEle.play();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause:
                        self.videoEle.pause();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].seek:
                        self.videoEle.currentTime = self.meService.seekTime;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getDuration:
                        self.meService.duration = self.videoEle.duration;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getVolume:
                        self.meService._volume = self.videoEle.volume;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].setVolume:
                        self.videoEle.volume = self.meService.volume;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getPlaybackRate:
                        self.meService._playbackRate = self.videoEle.playbackRate;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].setPlaybackRate:
                        self.videoEle.playbackRate = self.meService.playbackRate;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getAllowedPlaybackRate:
                        self.meService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
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
                            ytPlayer.seekTo(self.meService.seekTime, true);
                        }
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getDuration:
                        if (!!ytPlayer && !!ytPlayer.getDuration) {
                            self.meService.duration = ytPlayer.getDuration();
                        }
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getVolume:
                        self.meService._volume = ytPlayer.getVolume() / 100;
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].setVolume:
                        ytPlayer.setVolume(self.meService.volume * 100);
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getPlaybackRate:
                        self.meService._playbackRate = ytPlayer.getPlaybackRate();
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].setPlaybackRate:
                        ytPlayer.setPlaybackRate(self.meService.playbackRate);
                        break;
                    case src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].getAllowedPlaybackRate:
                        self.meService.availablePlaybackRates = ytPlayer.getAvailablePlaybackRates();
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
                        self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing;
                        break;
                    case YT.PlayerState.PAUSED:
                        self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].paused;
                        break;
                    case YT.PlayerState.ENDED:
                        self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].stopped;
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
            if (self.meService.story.modifyTime === 0) {
                var data = self.YTservice.ytPlayer.getVideoData();
                if (!!data && !!data.title) {
                    self.meService.story.name = data.title;
                }
            }
            self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].canPlay;
        });
    };
    PlayerComponent.prototype.eventTriggers = function () {
        var self = this;
        // * [2018-06-18 11:11] for MEState.canPlay
        this.videoEle.oncanplay = function (ev) {
            self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].canPlay;
        };
        // * [2018-06-18 11:11] for MEState.error
        this.videoEle.onerror = function (ev) {
            self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].error;
        };
        // * [2018-06-18 11:11] for MEState.waiting
        this.videoEle.onwaiting = function (ev) {
            self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].waiting;
        };
        // * [2018-06-18 11:11] for MEState.playing
        this.videoEle.onplay = function (ev) {
            self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing;
        };
        this.videoEle.onplaying = function (ev) {
            self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].playing;
        };
        // * [2018-06-18 11:11] for MEState.paused
        this.videoEle.onpause = function (ev) {
            self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].paused;
        };
        // * [2018-06-18 11:11] for MEState.stopped
        this.videoEle.onended = function (ev) {
            self.meService.state = src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].stopped;
        };
        // ************************* TODO *****************************
    };
    PlayerComponent.prototype.initMe = function () {
        // ******* TODO *******
        var meType = this.meService.story.meType;
        var urlOrId = this.meService.story.urlOrID;
        if (meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__["PlayerType"].url) {
            if (src_app_services_youtube_service__WEBPACK_IMPORTED_MODULE_2__["YoutubeService"].isYoutubeURL(urlOrId)) {
                this.meService.story.meType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_6__["PlayerType"].youtubeID;
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
        var state = this.meService.state;
        if (state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].paused || state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].readyForPlayer || state === src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MEState"].canPlay) {
            this.meService.onPlayerAction.next(src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].play);
        }
        else {
            this.meService.onPlayerAction.next(src_app_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["playerAction"].pause);
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

/***/ "./src/app/components/set-speech-synthesis/set-speech-synthesis.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/components/set-speech-synthesis/set-speech-synthesis.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".close {\n    position: absolute;\n    right: 0;\n}\n\n.selVoiceContainer, .utterContainer {\n    justify-content: center;\n    display: flex;\n    flex-wrap: wrap;\n}\n\n.selVoice {\n    min-width: 72%;\n}\n"

/***/ }),

/***/ "./src/app/components/set-speech-synthesis/set-speech-synthesis.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/components/set-speech-synthesis/set-speech-synthesis.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <button mat-icon-button class=\"close\" (click)=\"close.next()\">\n    <mat-icon class=\"mat-18\">close</mat-icon>\n  </button>\n  <div class=\"selVoiceContainer\">\n    <mat-form-field class=\"selVoice\">\n      <mat-select #selVoice [value]=\"utterPara.voice\"\n      (selectionChange)=\"utterPara.voice=selVoice.value;change.next(utterPara)\"\n      [placeholder]=\"(!!pts)?pts.selLang:'選個語音模擬語言'\">\n        <mat-option *ngFor=\"let voice of SSService.voices\" [value]=\"voice\">{{SSService.getVoiceName(voice)}}</mat-option>\n      </mat-select>\n    </mat-form-field>\n  </div>\n  <div class=\"utterContainer\">\n    <div>\n      <mat-icon class=\"mat-18\">directions_walk</mat-icon>\n      <mat-slider #selRate\n        [thumbLabel]=\"true\"\n        [value]=\"utterPara.rate\"\n        (change)=\"utterPara.rate=selRate.value;change.next(utterPara);\"\n        min=\"0.1\" max=\"4\" step=\"0.1\"></mat-slider>\n      <mat-icon class=\"mat-18\">flight</mat-icon>\n    </div>\n    \n    <div>\n      <mat-icon class=\"mat-18\">keyboard_arrow_down</mat-icon>\n      <mat-slider #selPitch\n        [thumbLabel]=\"true\"\n        [value]=\"utterPara.pitch\"\n        (change)=\"utterPara.pitch=selPitch.value;change.next(utterPara);\"\n        min=\"0\" max=\"2\" step=\"0.1\"></mat-slider>\n      <mat-icon class=\"mat-18\">keyboard_arrow_up</mat-icon>\n    </div>\n    <div>\n      <mat-icon class=\"mat-18\">volume_mute</mat-icon>\n      <mat-slider #selVolume\n        [thumbLabel]=\"true\"\n        [value]=\"utterPara.volume\"\n        (change)=\"utterPara.volume=selVolume.value;change.next(utterPara);\"\n        min=\"0.1\" max=\"1\" step=\"0.1\"></mat-slider>\n      <mat-icon class=\"mat-18\">volume_up</mat-icon>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/set-speech-synthesis/set-speech-synthesis.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/components/set-speech-synthesis/set-speech-synthesis.component.ts ***!
  \***********************************************************************************/
/*! exports provided: SetSpeechSynthesisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetSpeechSynthesisComponent", function() { return SetSpeechSynthesisComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/speech-synthesis.service */ "./src/app/services/speech-synthesis.service.ts");
/* harmony import */ var _services_page_texts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/page-texts.service */ "./src/app/services/page-texts.service.ts");
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




var SetSpeechSynthesisComponent = /** @class */ (function () {
    function SetSpeechSynthesisComponent(SSService, ptsService) {
        this.SSService = SSService;
        this.ptsService = ptsService;
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        if (!!this.utterPara === false) {
            this.utterPara = new _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_1__["SSutterParameters"]();
        }
    }
    SetSpeechSynthesisComponent.prototype.ngOnInit = function () {
        var self = this;
        self.ptsService.PTSReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concat"])(self.ptsService.ptsLoaded$)).subscribe(function (_) {
            self.pts = self.ptsService.pts.setSSComp;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], SetSpeechSynthesisComponent.prototype, "close", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], SetSpeechSynthesisComponent.prototype, "change", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_1__["SSutterParameters"])
    ], SetSpeechSynthesisComponent.prototype, "utterPara", void 0);
    SetSpeechSynthesisComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-set-speech-synthesis',
            template: __webpack_require__(/*! ./set-speech-synthesis.component.html */ "./src/app/components/set-speech-synthesis/set-speech-synthesis.component.html"),
            styles: [__webpack_require__(/*! ./set-speech-synthesis.component.css */ "./src/app/components/set-speech-synthesis/set-speech-synthesis.component.css")]
        }),
        __metadata("design:paramtypes", [_services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_1__["SpeechSynthesisService"], _services_page_texts_service__WEBPACK_IMPORTED_MODULE_2__["PageTextsService"]])
    ], SetSpeechSynthesisComponent);
    return SetSpeechSynthesisComponent;
}());



/***/ }),

/***/ "./src/app/components/swap-icon/swap-icon.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/swap-icon/swap-icon.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.container {\n    display: -ms-inline-grid;\n    display: inline-grid;\n        -ms-grid-columns: 1fr;\n        grid-template-columns: 1fr;\n        -ms-grid-rows: 1fr;\n        grid-template-rows: 1fr;\n        grid-template-areas: 'center';\n}\n\nbutton {\n    touch-action: none;\n}\n\n.eachButton, .delBK {\n    -ms-grid-row: 1;\n    -ms-grid-column: 1;\n    grid-area: center;\n    /* grid-column: 1;\n    grid-row: 1; */\n}\n\n.delBK {\n    background-color: red;\n    color: white;\n}"

/***/ }),

/***/ "./src/app/components/swap-icon/swap-icon.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/swap-icon/swap-icon.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"container\">\n  <button mat-icon-button class=\"delBK\">\n    <mat-icon class=\"mat-18\">delete</mat-icon>\n  </button>\n  <button mat-icon-button mat-raised-button\n  class=\"eachButton\"\n  touch-action=\"none\"\n  [style.transform]=\"'translateY('+deltaY+'px)'\"\n  [style.background-color]=\"'rgba('+bR+','+bG+','+bB+','+bA+')'\"\n  (pointerdown)=\"onContentPointerdown($event)\"\n  (click)=\"onBtnClick($event)\">\n  <span>{{index}}</span>\n</button>\n</span>\n"

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

module.exports = ".full-width {\n    width: 100%;\n}\n\n.buttons {\n    display: flex;\n    justify-content: center;\n}"

/***/ }),

/***/ "./src/app/dialog/dialog.component.html":
/*!**********************************************!*\
  !*** ./src/app/dialog/dialog.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"data.dType===dialogType.inputUrl\">\n  <mat-form-field class=\"full-width\" >\n    <input matInput [placeholder]=\"(!!pts)?pts.desireURL:'請輸入想要的網址'\" [(ngModel)]=\"data.url\" >\n  </mat-form-field>\n  <div class=\"buttons\">\n    <button mat-raised-button (click)=\"onLoadURL()\" >{{(!!pts)?pts.load:'載入'}}</button>\n  </div>\n</div>\n<div *ngIf=\"data.dType===dialogType.alert\">\n  <div [innerHTML]=\"data.msg|safeHtml\"></div>\n</div>\n"

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
/* harmony import */ var _services_page_texts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/page-texts.service */ "./src/app/services/page-texts.service.ts");
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
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var DialogComponent = /** @class */ (function () {
    function DialogComponent(ptsService, dialogRef, data) {
        this.ptsService = ptsService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.dialogType = DialogType;
    }
    DialogComponent.prototype.ngOnInit = function () {
        var self = this;
        self.ptsService.PTSReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concat"])(self.ptsService.ptsLoaded$)).subscribe(function (_) {
            self.pts = self.ptsService.pts.dialogComp;
        });
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
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_services_page_texts_service__WEBPACK_IMPORTED_MODULE_2__["PageTextsService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], DialogComponent);
    return DialogComponent;
}());

var DialogType;
(function (DialogType) {
    DialogType[DialogType["inputUrl"] = 0] = "inputUrl";
    DialogType[DialogType["alert"] = 1] = "alert";
})(DialogType || (DialogType = {}));


/***/ }),

/***/ "./src/app/message/message.component.css":
/*!***********************************************!*\
  !*** ./src/app/message/message.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.Error{\n    background-color: red;\n    color: white;\n    text-shadow: 1px 1px 1px black;\n}\n\n.Warn{\n    background-color: yellow;\n    color: blue;\n    text-shadow: 1px 1px 1px green;\n}\n\n.Info{\n    background-color: lightblue;\n    color: green;\n    text-shadow: 1px 1px 1px black;\n}"

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

module.exports = "nav{\n    display: flex;\n    align-items: center;\n    padding: 8px 16px;\n    background: #673ab7;\n}\n\n.flex-spacer{\n    flex-grow: 1;\n    text-align: center;\n    overflow-x: auto;\n}\n\n.isSelect {\n    background-color: aliceblue;\n}"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"docs-navbar-header\">\n  <button mat-icon-button (click)=\"toggleSidenav_Click.next($event)\">\n      <mat-icon class=\"mat-18\">menu</mat-icon>\n  </button>\n  <button mat-icon-button (click)=\"meService.onSaveStory$$()\" *ngIf=\"meService.sideClickType===sideClickType_.new\">\n    <mat-icon class=\"mat-18\">archive</mat-icon>\n  </button>\n  <button mat-icon-button (click)=\"meService.onUpdateStory$$()\" *ngIf=\"meService.sideClickType===sideClickType_.select\">\n    <mat-icon class=\"mat-18\">update</mat-icon>\n  </button>\n<div class=\"flex-spacer\">\n  <div>{{meService.story.title}}</div>\n</div>\n  <button mat-icon-button [matBadge]=\"nUnReadMsg\" (click)=\"showMsgsAtBottom()\" *ngIf=\"nUnReadMsg!=0\">\n    <mat-icon class=\"mat-18\">event_note</mat-icon>\n  </button>\n  <button mat-icon-button [matMenuTriggerFor]=\"langMenu\" >\n      <mat-icon class=\"mat-18\">translate</mat-icon>\n  </button>\n  <mat-menu #langMenu=\"matMenu\">\n    <button mat-menu-item *ngFor=\"let each of ptsService.langList\" \n    (click)=\"ptsService.loadPTS$$(each.isoCode,true)\"\n    [class.isSelect]=\"each.isoCode===ptsService.langCode\">{{each.name}}</button>\n  </mat-menu>\n</nav>"

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
/* harmony import */ var _services_fs_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/fs.service */ "./src/app/services/fs.service.ts");
/* harmony import */ var _services_page_texts_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/page-texts.service */ "./src/app/services/page-texts.service.ts");
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
    function NavbarComponent(bottomSheet, ngZone, db, fsService, meService, msgService, ptsService) {
        this.bottomSheet = bottomSheet;
        this.ngZone = ngZone;
        this.db = db;
        this.fsService = fsService;
        this.meService = meService;
        this.msgService = msgService;
        this.ptsService = ptsService;
        this.toggleSidenav_Click = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.nUnReadMsg = 0;
        this.sideClickType_ = _services_media_edit_service__WEBPACK_IMPORTED_MODULE_5__["SideClickType"];
        var self = this;
        this.nUnReadMsg = msgService.getNUnRead();
        msgService.remindMsgIn.subscribe(function (n) {
            if (msgService.isShown === false) {
                return;
            }
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
            _services_db_service__WEBPACK_IMPORTED_MODULE_4__["DbService"], _services_fs_service__WEBPACK_IMPORTED_MODULE_6__["FsService"], _services_media_edit_service__WEBPACK_IMPORTED_MODULE_5__["MediaEditService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"], _services_page_texts_service__WEBPACK_IMPORTED_MODULE_7__["PageTextsService"]])
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

module.exports = "input[type='file'] {\n    display: none;\n}\n\n.full-width {\n    width: 100%;\n    display: block;\n}\n\n.question {\n    background-color: red;\n    color: yellow;\n    font-weight: bolder;\n    min-width: 0px;\n    box-shadow: 4px;\n}\n\napp-draglist {\n    width:100%;\n}\n\n.storedContainer {\n    min-height: 0; /* crucial */\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-rows: auto 1fr;\n        grid-template-rows: auto 1fr;\n}\n\n.listStored {\n    overflow-y: auto;\n    overflow-x: hidden;\n}"

/***/ }),

/***/ "./src/app/pages/home/home.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div>\n    <button mat-raised-button (click)=\"gv.shownPage = pageType.Test\">Test</button>\n</div> -->\n<div class=\"newContainer\">\n    <h3 [innerText]=\"(!!pts)?pts.newMedia:'讀入新的媒體：'\"></h3>\n    <mat-list dense>\n        <mat-list-item>\n            <button mat-raised-button (click)=\"onLoadFromURL();\">\n                {{(!!pts)?pts.url:'網址'}}\n            </button>\n        </mat-list-item>\n        <mat-list-item>\n            <button mat-raised-button (click)=\"selaudio.click()\"\n                [matTooltip]=\"(!!pts)?pts.ttFile:'請選擇影片、聲音或本APP匯出的json檔'\" >\n                <input #selaudio\n                type=\"file\" (change)=\"onFileSelect(selaudio.files)\">\n                {{(!!pts)?pts.file:'檔案'}}\n            </button>\n        </mat-list-item>\n    </mat-list>\n</div>\n<div class=\"storedContainer\">\n    <h3>{{(!!pts)?pts.storedMedia:'已備份的媒體：'}}</h3>\n\n    <div #listOfStored class=\"listStored\">\n        <mat-list dense>\n        <!-- <mat-list-item *ngFor=\"let story of stories$| async\"> -->\n        <app-draglist *ngFor=\"let story of stories\" \n            [story]=\"story\"\n            (delete)=\"onStoryDelete(story)\"\n            (contentClick)=\"onStoryOpen(story)\" ></app-draglist>\n        <!-- </mat-list-item> -->\n        </mat-list>\n    </div>\n</div>\n"

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
/* harmony import */ var _services_page_texts_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/page-texts.service */ "./src/app/services/page-texts.service.ts");
/* harmony import */ var _services_cross_comp_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../services/cross-comp.service */ "./src/app/services/cross-comp.service.ts");
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
    function HomeComponent(gv, dialog, ptsServic, meService, db, ngZone, fs, msg, clipboard, ccService) {
        this.gv = gv;
        this.dialog = dialog;
        this.ptsServic = ptsServic;
        this.meService = meService;
        this.db = db;
        this.ngZone = ngZone;
        this.fs = fs;
        this.msg = msg;
        this.clipboard = clipboard;
        this.ccService = ccService;
        this.Url = 'https://dzxuyknqkmi1e.cloudfront.net/odb/2018/06/odb-06-12-18.mp3';
        this.testYoutubeUrl = 'https://youtu.be/f1SZ5GaAp3g';
        this.storySearch$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this._unsubscribed = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this.pageType = _services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"];
        var self = this;
        ptsServic.PTSReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["concat"])(ptsServic.ptsLoaded$)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(self._unsubscribed)).subscribe(function (_) {
            self.pts = ptsServic.pts.homePage;
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        var self = this;
        // from(this.db.searchAsync()).subscribe(this.stories$);
        self.db.onDataChanged.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(self._unsubscribed)).subscribe(function (data) { return self.storySearch$.next(null); });
        self.stories$ = self.storySearch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (val) {
            if (val === null) {
                return self.db.searchAsync(_services_db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"].storyTableName, null, null, { viewTime: 'desc' });
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["concatAll"])());
        self.stories$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(self._unsubscribed)).subscribe(function (s) {
            self.ngZone.run(function () {
                self.stories = s;
            });
        });
        // * [2018-08-01 10:27] Check whether FsPlugin is available now
        self.fs.FSReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(self._unsubscribed))
            .subscribe(function (v) { return self.msg.pushMessage({ type: _services_message_service__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].Info, message: "FSReady = " + v }); });
        this.ccService.listOfStoredEle = this.listStoredRef.nativeElement;
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        this.storySearch$.next(null); // initialize the search
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this._unsubscribed.next(true);
        this._unsubscribed.complete();
        this._unsubscribed = null;
        this.ccService.listOfStoredEle = null;
    };
    HomeComponent.prototype.onFileSelect = function (files) {
        var _this = this;
        var self = this;
        if (files !== null && files.length > 0) {
            var file_1 = files[0];
            if (/(video|audio)/.test(file_1.type) === true) {
                this.meService.initMe(file_1);
                this.gv.shownPage = _services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"].MediaEdit;
            }
            else if (file_1.name.slice(file_1.name.lastIndexOf('.')) === '.json') {
                var action$$ = new Promise(function (res, rej) {
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        var text = '';
                        var story;
                        try {
                            text = e.srcElement.result;
                            story = JSON.parse(text);
                            if (!!story.viewTime) {
                                res(story);
                            }
                            else {
                                rej(story);
                            }
                        }
                        catch (error) {
                            rej(error);
                        }
                    };
                    reader.onerror = rej;
                    reader.readAsText(file_1);
                });
                action$$.then(function (story) {
                    story.modifyTime = 0;
                    self.meService.initMe(story);
                })
                    .catch(function (err) { return self.msg.alert(((!!_this.pts) ? _this.pts.errWrongFormat : "\u8F38\u5165\u7684json\u6A94\u683C\u5F0F\u4E0D\u5408\u3002\u932F\u8AA4\u8A0A\u606F\uFF1A ") + ("" + JSON.stringify(err))); });
            }
            else {
                self.msg.alert((!!this.pts) ? this.pts.errFileType : '所選的檔案必須是影片、聲音檔，或者要匯入的json檔。');
                return;
            }
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
                        dialogRef.afterClosed().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(self._unsubscribed)).subscribe(function (result) {
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
        var duplicatedStory = Object.assign({}, story);
        this.meService.initMe(duplicatedStory);
        this.gv.shownPage = _services_gv_service__WEBPACK_IMPORTED_MODULE_1__["PageType"].MediaEdit;
        // * [2018-07-19 21:28] Tell navbar that you select a story
        this.meService.sideClickType = _services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__["SideClickType"].select;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('listOfStored'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], HomeComponent.prototype, "listStoredRef", void 0);
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/pages/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/pages/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_services_gv_service__WEBPACK_IMPORTED_MODULE_1__["GvService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], _services_page_texts_service__WEBPACK_IMPORTED_MODULE_12__["PageTextsService"],
            _services_media_edit_service__WEBPACK_IMPORTED_MODULE_2__["MediaEditService"], _services_db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _services_fs_service__WEBPACK_IMPORTED_MODULE_8__["FsService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_9__["MessageService"], _services_clipboard_service__WEBPACK_IMPORTED_MODULE_11__["ClipboardService"],
            _services_cross_comp_service__WEBPACK_IMPORTED_MODULE_13__["CrossCompService"]])
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

module.exports = ".container {\n    display: -ms-grid;\n    display: grid;\n        -ms-grid-rows: auto 1fr auto auto;\n        grid-template-rows: auto 1fr auto auto;\n        grid-template-areas: \"header\" \"main\" \"cSection\" \"cMain\";\n    height: 100%;\n    width: 100%;\n}\n\nheader {\n    -ms-grid-row: 1;\n    -ms-grid-column: 1;\n    grid-area: header;\n}\n\n.main {\n    -ms-grid-row: 2;\n    -ms-grid-column: 1;\n    grid-area: main;\n    overflow: hidden;\n}\n\napp-player {\n    z-index: 0;\n}\n\napp-me-mani-plate {\n    z-index: 1;\n}\n\n.dashboardSection {\n    -ms-grid-row: 3;\n    -ms-grid-column: 1;\n    grid-area: cSection;\n}\n\n.dashboardMain {\n    -ms-grid-row: 4;\n    -ms-grid-column: 1;\n    grid-area: cMain;\n}"

/***/ }),

/***/ "./src/app/pages/media-edit/media-edit.component.html":
/*!************************************************************!*\
  !*** ./src/app/pages/media-edit/media-edit.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <!-- <header>{{this.dataService.story.name}}</header> -->\n  <!-- <main> -->\n    <!-- <video #videoElement class=\"main\"></video> -->\n    <app-player class=\"main\"></app-player>\n    <app-me-mani-plate class=\"main\"\n      [style.background-color]=\"(meService.story.iFrame<0)?'rgba(0,0,0,0)':'rgba('+meService.story.frames[meService.story.iFrame].colorR+','+meService.story.frames[meService.story.iFrame].colorG+','+meService.story.frames[meService.story.iFrame].colorB+','+'0.2'+')'\"\n      *ngIf=\"meService.story.iFrame>=0\"\n      [@flyInOut]=\"'in'\"\n    ></app-me-mani-plate>\n  <!-- </main> -->\n  <aside></aside>\n  <footer class=\"dashboardSection\">\n    <app-me-section-dashboard></app-me-section-dashboard>\n  </footer>\n  <footer class=\"dashboardMain\">\n    <app-me-main-dashboard></app-me-main-dashboard>\n  </footer>\n</div>\n"

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
/* harmony import */ var _services_story_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/story.service */ "./src/app/services/story.service.ts");
/* harmony import */ var _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/speech-synthesis.service */ "./src/app/services/speech-synthesis.service.ts");
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






var MediaEditComponent = /** @class */ (function () {
    function MediaEditComponent(/*private route: ActivatedRoute, */ meService, SSService) {
        this.meService = meService;
        this.SSService = SSService;
    }
    MediaEditComponent.prototype.ngOnInit = function () {
        var self = this;
        var currentIFrame = -1;
        self.meService.onStateChanged.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (_) { return !!self.meService.onCurrentTimeChanged === true; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).subscribe(function (_) {
            self.meService.onCurrentTimeChanged.subscribe(function (t) {
                if (self.meService.story.utterType === _services_story_service__WEBPACK_IMPORTED_MODULE_3__["utterType"].none) {
                    return;
                }
                else {
                    var i = self.meService.story.frames.findIndex(function (v) { return ((t >= v.start) && (t <= v.end)); });
                    if (i === currentIFrame || self.meService.story.iFrame >= 0) {
                        return;
                    }
                    else {
                        currentIFrame = i;
                        if (i < 0) {
                            return;
                        }
                        if ((self.meService.story.utterType === _services_story_service__WEBPACK_IMPORTED_MODULE_3__["utterType"].all) || (self.meService.story.frames[i].isUtter === true)) {
                            var utterPara = Object.assign({}, self.meService.story.frames[i].utterPara);
                            utterPara = self.SSService.updateUtterParaWithVoice(utterPara);
                            self.SSService.speak(utterPara);
                        }
                    }
                }
            });
        });
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
        __metadata("design:paramtypes", [_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"], _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_4__["SpeechSynthesisService"]])
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

module.exports = ".container {\n    display: -ms-grid;\n    display: grid;\n    height: 100%;\n        -ms-grid-rows: auto 1fr;\n        grid-template-rows: auto 1fr;\n        grid-template-areas: 'main' 'des';\n}\n\n.nameETC {\n    -ms-grid-row: 1;\n    -ms-grid-column: 1;\n    grid-area: main;\n}\n\nmat-form-field {\n    width: 90%;\n}\n\n.description {\n    -ms-grid-row: 2;\n    -ms-grid-column: 1;\n    grid-area: des;\n    height: 100%;\n}\n\n.description ::ng-deep [class^=mat-form-field-wrapper], .description ::ng-deep [class^=mat-form-field-flex], .description ::ng-deep [class^=mat-form-field-infix], textarea {\n    height: 100%;\n}"

/***/ }),

/***/ "./src/app/pages/story/story.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/story/story.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"nameETC\">\n    <div class=\"btns\">\n      <button mat-icon-button (click)=\"meService.onSaveStory$$()\"\n        *ngIf=\"meService.story.viewTime===0\">\n          <mat-icon class=\"mat-18\">archive</mat-icon>\n      </button>\n      <button mat-icon-button (click)=\"meService.onUpdateStory$$()\"\n        *ngIf=\"meService.story.viewTime!==0\">\n          <mat-icon class=\"mat-18\">update</mat-icon>\n      </button>\n      <a mat-icon-button #exportStory [href]=\"downloadHref|safe\" [download]=\"meService.story.viewTime+meService.story.title+'.json'\"\n        (click)=\"onExportStory(exportStory,$event)\">\n          <mat-icon class=\"mat-18\">save</mat-icon>\n      </a>\n      <a mat-icon-button #exportSBV [href]=\"downloadSBVHref|safe\" [download]=\"meService.story.title+'.sbv'\"\n        (click)=\"onExportSBV(exportSBV,$event)\" [matTooltip]=\"(!!pts)?pts.exportSBV:'輸出輸入的字幕'\">\n        <mat-icon class=\"mat-18\">subtitles</mat-icon>\n      </a>\n  </div>\n    <div class=\"selectUtterType\">\n      <mat-select [(ngModel)]=\"meService.story.utterType\" placeholder=\"請選擇語音模擬字幕的模式\">\n          <mat-option [value]=\"utterType.none\">{{(!!pts)?pts.noSS:'不模擬'}}</mat-option>\n          <mat-option [value]=\"utterType.byEach\">{{(!!pts)?pts.actualSS:'依各段要求模擬'}}</mat-option>\n          <mat-option [value]=\"utterType.all\">{{(!!pts)?pts.allSS:'全部模擬'}}</mat-option>\n      </mat-select>\n    </div>\n    <mat-form-field>\n      <input matInput [placeholder]=\"(!!pts)?pts.name:'媒體名稱'\" [(ngModel)]=\"meService.story.name\">\n    </mat-form-field>\n    \n    <mat-form-field>\n      <input matInput [placeholder]=\"(!!pts)?pts.title:'媒體標題'\" [(ngModel)]=\"meService.story.title\">\n    </mat-form-field>\n    \n    <mat-form-field>\n      <input matInput [placeholder]=\"(!!pts)?pts.keywords:'關鍵字'\" [(ngModel)]=\"meService.story.keywords\">\n    </mat-form-field>\n    \n    <mat-form-field>\n      <input matInput [placeholder]=\"(!!pts)?pts.source:'媒體來源'\" [(ngModel)]=\"(meService.story.meType===meService.PlayerType.file)?meService.story.fileName:meService.story.urlOrID\">\n    </mat-form-field>      \n  </div>\n  \n  <mat-form-field class=\"description\">\n    <textarea matInput [placeholder]=\"(!!pts)?pts.description:'描述'\" [(ngModel)]=\"meService.story.description\">\n    </textarea>\n  </mat-form-field>\n</div>\n"

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
/* harmony import */ var _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../vm/player-type.enum */ "./src/app/vm/player-type.enum.ts");
/* harmony import */ var _services_story_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/story.service */ "./src/app/services/story.service.ts");
/* harmony import */ var _services_page_texts_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/page-texts.service */ "./src/app/services/page-texts.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_fs_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/fs.service */ "./src/app/services/fs.service.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/message.service */ "./src/app/services/message.service.ts");
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








var StoryComponent = /** @class */ (function () {
    function StoryComponent(meService, ptsService, msg, fs, cdr) {
        this.meService = meService;
        this.ptsService = ptsService;
        this.msg = msg;
        this.fs = fs;
        this.cdr = cdr;
        this.utterType = _services_story_service__WEBPACK_IMPORTED_MODULE_3__["utterType"];
    }
    StoryComponent.prototype.ngOnInit = function () {
        var self = this;
        self.ptsService.PTSReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concat"])(self.ptsService.ptsLoaded$)).subscribe(function (_) {
            self.pts = self.ptsService.pts.storyComp;
            self.cdr.detectChanges();
        });
    };
    StoryComponent.prototype.onExportStory = function (sender, e) {
        var self = this;
        var a = sender._elementRef.nativeElement;
        if (self.meService.story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_2__["PlayerType"].file) {
            self.msg.alert((!!self.pts) ? self.pts.notYetFileExport : '抱歉，由於想匯出的媒體為local的檔案，這表示此檔案也要一同匯出才行。此版本尚未將此功能建構進來，敬請諒解。');
            return;
        }
        // * [2018-09-04 12:06] Start to store into the file
        if (!!window.cordova === true) {
            e.preventDefault();
            self.fs.saveTxtFile$$(JSON.stringify(self.meService.story), self.meService.story.viewTime
                + self.meService.story.title.replace(/\/|\:/g, '_') + '.json');
        }
        else {
            var blob = new Blob([JSON.stringify(self.meService.story)], { type: 'application/json' });
            this.downloadHref = URL.createObjectURL(blob);
            // this.downloadHref = "data:text/json;charset=utf-8," + encodeURI(JSON.stringify(this.meService.story));
        }
    };
    StoryComponent.prototype.onExportSBV = function (sender, e) {
        return __awaiter(this, void 0, void 0, function () {
            var self, a, getTime, frames, input, blob;
            return __generator(this, function (_a) {
                self = this;
                a = sender._elementRef.nativeElement;
                getTime = function (t) {
                    var st = '';
                    var buf = Math.floor(t);
                    // * [2018-08-27 15:29] Get minisecond
                    st = ('000' + Math.round((t - buf) * 1000)).slice(-3);
                    st = '.' + st;
                    // * [2018-08-27 15:34] Get second
                    t = buf;
                    buf = t % 60;
                    st = ('00' + buf).slice(-2) + st;
                    st = ':' + st;
                    // * [2018-08-27 15:38] Get minute
                    t = (t - buf) / 60;
                    buf = t % 60;
                    st = ('00' + buf).slice(-2) + st;
                    st = ':' + st;
                    // * [2018-08-27 15:38] Get hour
                    t = (t - buf) / 60;
                    buf = t;
                    st = buf + st;
                    // * [2018-08-27 15:42] Return the string
                    return st;
                };
                frames = self.meService.story.frames.slice(0).sort(function (p, b) {
                    return p.start - b.start;
                });
                input = frames.reduce(function (pre, cur) {
                    var st = (!!pre) ? '\n\n' : '';
                    st += getTime(cur.start) + ',' + getTime(cur.end) + '\n';
                    st += cur.utterPara.text;
                    return pre + st;
                }, '');
                // * [2018-09-04 12:00] The part to store the .SBV file
                if (!!window.cordova === true) {
                    e.preventDefault();
                    self.fs.saveTxtFile$$(input, self.meService.story.title.replace(/\/|\:/g, '_') + '.sbv');
                }
                else {
                    blob = new Blob([input], { type: 'text/plain' });
                    this.downloadSBVHref = URL.createObjectURL(blob);
                }
                return [2 /*return*/];
            });
        });
    };
    StoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-story',
            template: __webpack_require__(/*! ./story.component.html */ "./src/app/pages/story/story.component.html"),
            styles: [__webpack_require__(/*! ./story.component.css */ "./src/app/pages/story/story.component.css")]
        }),
        __metadata("design:paramtypes", [_services_media_edit_service__WEBPACK_IMPORTED_MODULE_1__["MediaEditService"],
            _services_page_texts_service__WEBPACK_IMPORTED_MODULE_4__["PageTextsService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_7__["MessageService"],
            _services_fs_service__WEBPACK_IMPORTED_MODULE_6__["FsService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
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

module.exports = "<div>\n    <h1>Test of Speech Synthesis</h1>\n    <input type=\"text\" #ssInput/>\n    <mat-select [(value)]=\"selVoice\" placeholder=\"選個想模擬的語言\">\n        <mat-option *ngFor=\"let voice of SSService.voices\" [value]=\"voice\">{{voice.name}}</mat-option>\n    </mat-select>\n    <button (click)=\"onSpeak(ssInput.value)\">play</button>\n</div>\n\n<input #selFile type=\"file\" multiple (change)=\"onSelFileChange(selFile.files,$event.target === audioFile)\">\n<!-- list of files -->\n<mat-list dense *ngIf=\"!!entries\">\n    <app-draglist *ngFor=\"let entry of entries\"\n    [story]=\"entry\"\n    (delete)=\"onRmFile(entry)\"\n    (contentClick)=\"onClickAFile(entry)\" >\n    </app-draglist>\n</mat-list>\n<video #audioFromFile autoplay controls [src]=\"audioSrc|safe\">\n</video>\n<hr>\n<div>\n    <div>Is cordova support? {{(isCordovaSupport)?\"Yes\":\"No\"}}</div>\n    <div>Is cordova.file support? {{(isFilePluginSupport)?\"Yes\":\"No\"}}</div>\n</div>\n<div>\n    <button mat-raised-button (click)=\"onGetDocFolder()\">\n        <mat-icon>folder</mat-icon>\n    </button>\n    {{newFolderName}}\n</div>\n<br/>\n<div>\n    <button (click)=\"onSelectFromNSQL()\">select nanoSQL</button>\n</div>\n<br/>\n<div>\n    <button (click)=\"ondeleteFromNSQL()\">delete nanoSQL</button>\n</div>\n<br/>\n<div>\n    <button (click)=\"onUpsertFromNSQL()\">upsert nanoSQL</button>\n</div>"

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
/* harmony import */ var _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/speech-synthesis.service */ "./src/app/services/speech-synthesis.service.ts");
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
    function TestComponent(msgService, sanitizer, DBService, fsService, SSService) {
        this.msgService = msgService;
        this.sanitizer = sanitizer;
        this.DBService = DBService;
        this.fsService = fsService;
        this.SSService = SSService;
        var self = this;
        SSService.getVoices$.subscribe(function (isGotten) {
            if (isGotten) {
                self.selVoice = SSService.defaultVoice;
            }
        });
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
    // async onSelFileChange_for_windows_videoLibrary(files: FileList, obj: object) {
    //   console.log(`obj= ${obj}`);
    //   this.audioFile = files[0];
    //   const fName = this.audioFile.name;
    //   let newFile: any;
    //   if (!!window.cordova && (cordova.platformId === 'windows')) {
    //     try {
    //       const outputFile = await Windows.Storage.KnownFolders.videosLibrary.createFileAsync(this.audioFile.name);
    //       const outStream = await outputFile.openAsync(Windows.Storage.FileAccessMode.readWrite);
    //       const inStream = this.audioFile.msDetachStream();
    //       await Windows.Storage.Streams.RandomAccessStream.copyAsync(inStream, outStream);
    //       await outStream.flushAsync();
    //       inStream.close();
    //       outStream.close();
    //       newFile = await Windows.Storage.KnownFolders.videosLibrary.getFileAsync(fName);
    // } catch (error) {
    //       this.msgService.pushMessage({type: MessageTypes.Error, message: error});
    //     }
    //   } else {
    //       newFile = this.audioFile;
    //   }
    //   // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl('https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3');
    //   // this.audioSrc = 'https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3';
    //   // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.audioFile));
    //   this.audioSrc = window.URL.createObjectURL(newFile);
    //   this.msgService.pushMessage({type : MessageTypes.Info, message: `audioSrc: ${JSON.stringify(this.audioSrc)}`});
    // }
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
    TestComponent.prototype.onSpeak = function (text) {
        var para = new _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_6__["SSutterParameters"]();
        para.text = text;
        para.voice = this.selVoice;
        this.SSService.speak(para);
    };
    TestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-test',
            template: __webpack_require__(/*! ./test.component.html */ "./src/app/pages/test/test.component.html"),
            styles: [__webpack_require__(/*! ./test.component.css */ "./src/app/pages/test/test.component.css")]
        }),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"],
            _services_db_service__WEBPACK_IMPORTED_MODULE_3__["DbService"], _services_fs_service__WEBPACK_IMPORTED_MODULE_4__["FsService"],
            _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_6__["SpeechSynthesisService"]])
    ], TestComponent);
    return TestComponent;
}());



/***/ }),

/***/ "./src/app/pipes/safe.pipe.ts":
/*!************************************!*\
  !*** ./src/app/pipes/safe.pipe.ts ***!
  \************************************/
/*! exports provided: SafePipe, SafeHtmlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafePipe", function() { return SafePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeHtmlPipe", function() { return SafeHtmlPipe; });
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

var SafeHtmlPipe = /** @class */ (function () {
    function SafeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeHtmlPipe.prototype.transform = function (html, args) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    };
    SafeHtmlPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'safeHtml',
            pure: true
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());



/***/ }),

/***/ "./src/app/services/ad.service.ts":
/*!****************************************!*\
  !*** ./src/app/services/ad.service.ts ***!
  \****************************************/
/*! exports provided: AdService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdService", function() { return AdService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _device_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./device.service */ "./src/app/services/device.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Gotten from https://github.com/floatinghotpot/cordova-admob-pro
var AdService = /** @class */ (function () {
    function AdService(device) {
        this.device = device;
        this._adReady$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        // public get adReady$(): Observable<boolean> {
        //   return this._adReady$.pipe(first());
        // }
        this.adReady$ = this._adReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
        var self = this;
        if (!!window.cordova) {
            if (cordova.platformId === 'windows') {
                self.iniWinSDK();
            }
            else if (cordova.platformId === 'android' || cordova.platformId === 'ios') {
                self.iniAdMob();
            }
            else {
                self._adReady$.next(false);
                self._adReady$.complete();
            }
            this.prepareInterstitial();
        }
    }
    AdService.prototype.prepareInterstitial = function () {
        var self = this;
        self.adReady$.subscribe(function (isReady) {
            if (isReady) {
                // * [2018-08-15 16:19] Initialize it
                if (!!window['MicrosoftNSJS']) {
                    self.interstitial.requestAd(self.msAdv.InterstitialAdType.display, self.adWin.AppId, self.adWin.AdUnitId);
                }
                else if (!!window['AdMob']) {
                    self.interstitial.prepareInterstitial({ adId: self.admobid.interstitial, autoShow: false });
                }
            }
        });
    };
    AdService.prototype.showInterstitial = function () {
        var self = this;
        self.adReady$.subscribe(function (isReady) {
            if (isReady) {
                if (!!window['MicrosoftNSJS']) {
                    self.interstitial.show();
                }
                else if (!!window['AdMob']) {
                    self.interstitial.showInterstitial();
                }
                // * [2018-08-18 15:47] Renew it 2 min later
                setTimeout(function () {
                    self.prepareInterstitial();
                }, 1000 * 60 * 2);
            }
        });
    };
    AdService.prototype.iniWinSDK = function () {
        var self = this;
        if (!!window.cordova && cordova.platformId === 'windows') {
            // * [2018-08-16 09:33] Load in the needed script
            var doc = window.document;
            var sdkScript = doc.createElement('script');
            sdkScript.type = 'text/javascript';
            sdkScript.src = '//Microsoft.Advertising.JavaScript/ad.js';
            doc.head.appendChild(sdkScript);
            // * [2018-08-16 09:35] Start to load
            // *********************** TODO **************************************
            var isReady_1 = false;
            Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(100).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(10)).subscribe(function (i0) {
                if (i0 >= 9 && isReady_1 === false) {
                    self._adReady$.next(false);
                    self._adReady$.complete();
                }
                else if (isReady_1 === false) {
                    if (!!window['MicrosoftNSJS'] && !!window['MicrosoftNSJS']['Advertising']) {
                        self.msAdv = window['MicrosoftNSJS']['Advertising'];
                        self.interstitial = new self.msAdv.InterstitialAd();
                        self.adWin = {
                            AppId: "d25517cb-12d4-4699-8bdc-52040c712cab",
                            AdUnitId: "test"
                        };
                        self._adReady$.next(true);
                        self._adReady$.complete();
                        isReady_1 = true;
                    }
                }
            });
        }
    };
    AdService.prototype.iniAdMob = function () {
        var self = this;
        // * [2018-08-15 16:17] Initialize admobid
        if (/(android)/i.test(navigator.userAgent)) {
            self.admobid = {
                banner: 'ca-app-pub-3940256099942544/6300978111',
                interstitial: 'ca-app-pub-3940256099942544/1033173712',
                rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
            };
        }
        else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            self.admobid = {
                banner: 'ca-app-pub-3940256099942544/4480807092',
                interstitial: 'ca-app-pub-3940256099942544/4411468910',
                rewardvideo: 'ca-app-pub-3940256099942544/1712485313',
            };
        }
        else {
            self.admobid = {
                banner: 'ca-app-pub-6869992474017983/8878394753',
                interstitial: 'ca-app-pub-6869992474017983/1355127956',
                rewardvideo: '',
            };
        }
        if (self.device.isCordova) {
            self.device.onDeviceReady.subscribe(function (_) {
                if (!!window['AdMob']) {
                    self.interstitial = window['AdMob'];
                    self._adReady$.next(true);
                }
                else {
                    self._adReady$.next(false);
                }
                self._adReady$.complete();
            });
        }
    };
    AdService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_device_service__WEBPACK_IMPORTED_MODULE_3__["DeviceService"]])
    ], AdService);
    return AdService;
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
            if (!!cordova.plugins && cordova.platformId !== 'osx' && cordova.platformId !== 'browser' && !!cordova.plugins.clipboard) {
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

/***/ "./src/app/services/cross-comp.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/cross-comp.service.ts ***!
  \************************************************/
/*! exports provided: CrossCompService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrossCompService", function() { return CrossCompService; });
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

var CrossCompService = /** @class */ (function () {
    function CrossCompService() {
    }
    CrossCompService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], CrossCompService);
    return CrossCompService;
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
        { key: 'frames', type: 'map[]', default: [] },
        { key: 'utterType', type: 'int', default: 0 }
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
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _page_texts_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-texts.service */ "./src/app/services/page-texts.service.ts");
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






var FsService = /** @class */ (function () {
    function FsService(pts, device, msgService) {
        this.pts = pts;
        this.device = device;
        this.msgService = msgService;
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
            if (cordova.platformId === 'ios') {
                // * [2018-09-05 16:04] Try to initialize the socialsharing
                var action = new Promise(function (res, rej) {
                    device.onDeviceReady.subscribe(function (_) {
                        window.plugins.socialsharing.available(function (b) { return res(b); });
                    });
                });
                action.then();
                // action.then(b => {
                //   // * [2018-09-05 17:01] ****** TODO ****** dirty start of socialsharing
                //   if (b) {window.plugins.socialsharing.share('Start'); }
                // });
            }
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
    FsService.prototype.getDir$ = function (path, create, exclusive, fsURL) {
        if (create === void 0) { create = false; }
        if (exclusive === void 0) { exclusive = false; }
        var self = this;
        if (!!fsURL === true) {
            return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (sub) {
                window.resolveLocalFileSystemURL(fsURL + path, function (entry) { sub.next(entry); sub.complete(); }, function (err) { return sub.error(err); });
            });
        }
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
    FsService.prototype.getFile$ = function (name, create, exclusive, dir) {
        if (create === void 0) { create = false; }
        if (exclusive === void 0) { exclusive = false; }
        var self = this;
        if (self.device.isCordova === false) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
        }
        var obs = self.fs$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (fs) { return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subs) {
            var dirEntry = (!!dir) ? dir : fs.root;
            dirEntry.getFile(name, { create: create, exclusive: exclusive }, function (file) {
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
    FsService.prototype.saveTxtFile$$ = function (data, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var self, savePicker, iDot, ext, winFile, status_1, permissions_1, action, downloadDir, fileEntry, blob, isDone, action, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!!fileName === false) {
                            return [2 /*return*/, null];
                        }
                        if (!(!!window.cordova === false)) return [3 /*break*/, 1];
                        // * [2018-09-04 11:06] TODO: ignore the case for pure angular project
                        return [2 /*return*/, null];
                    case 1:
                        if (!(cordova.platformId === 'windows')) return [3 /*break*/, 6];
                        savePicker = new Windows.Storage.Pickers.FileSavePicker();
                        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
                        iDot = fileName.lastIndexOf('.');
                        ext = [(iDot < 0) ? '' : fileName.slice(iDot)];
                        ext.size = 1;
                        savePicker.fileTypeChoices.insert("Plain Text", ext);
                        savePicker.suggestedFileName = fileName.substr(0, iDot);
                        return [4 /*yield*/, savePicker.pickSaveFileAsync()];
                    case 2:
                        winFile = _a.sent();
                        if (!!!winFile) return [3 /*break*/, 5];
                        Windows.Storage.CachedFileManager.deferUpdates(winFile);
                        return [4 /*yield*/, Windows.Storage.FileIO.writeTextAsync(winFile, data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Windows.Storage.CachedFileManager.completeUpdatesAsync(winFile)];
                    case 4:
                        status_1 = _a.sent();
                        // *** [2018-09-04 11:55] Alert about your action
                        if (status_1 === Windows.Storage.Provider.FileUpdateStatus.complete) {
                            self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.fileSaved :
                                "\u6A94\u6848 {0} \u5DF2\u7D93\u5B58\u597D\u4E86").replace('{0}', "<b style=\"color:red;\">" + fileName + "</b>"));
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 21];
                    case 6:
                        if (!(cordova.platformId === 'android' || cordova.platformId === 'osx')) return [3 /*break*/, 17];
                        permissions_1 = cordova.plugins.permissions;
                        action = void 0;
                        if (!(cordova.platformId === 'android')) return [3 /*break*/, 9];
                        // * [2018-09-04 15:21] Check permission at first
                        action = new Promise(function (res, rej) {
                            permissions_1.checkPermission(permissions_1.READ_EXTERNAL_STORAGE, res, rej);
                        });
                        return [4 /*yield*/, action];
                    case 7:
                        if (!((_a.sent()).hasPermission === false)) return [3 /*break*/, 9];
                        // ** [2018-09-04 15:26] Since out of permission, request for one
                        action = new Promise(function (res, rej) {
                            permissions_1.requestPermission(permissions_1.READ_EXTERNAL_STORAGE, res, rej);
                        });
                        return [4 /*yield*/, action];
                    case 8:
                        if ((_a.sent()).hasPermission === false) {
                            self.msgService.alert((!!self.pts.pts) ? self.pts.pts.fsService.noPermission : '沒辦法取得你的認可，所以無法存檔，抱歉。');
                            return [2 /*return*/, null];
                        }
                        _a.label = 9;
                    case 9:
                        downloadDir = void 0;
                        if (!(cordova.platformId === 'android')) return [3 /*break*/, 11];
                        return [4 /*yield*/, self.getDir$('download', false, false, cordova.file.externalRootDirectory).toPromise()];
                    case 10:
                        downloadDir = _a.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, self.getDir$('', false, false, cordova.file.documentsDirectory).toPromise()];
                    case 12:
                        downloadDir = _a.sent();
                        _a.label = 13;
                    case 13:
                        if (!!!downloadDir) return [3 /*break*/, 16];
                        return [4 /*yield*/, self.getFile$(fileName, true, false, downloadDir).toPromise()];
                    case 14:
                        fileEntry = _a.sent();
                        blob = new Blob([data], { type: 'text/plain' });
                        return [4 /*yield*/, self.writeFile$(fileEntry, blob).toPromise()];
                    case 15:
                        isDone = _a.sent();
                        if (isDone) {
                            self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.fileSaved :
                                "\u6A94\u6848 {0} \u5DF2\u7D93\u5B58\u597D\u4E86").replace('{0}', "<b style=\"color:red;\">" + fileName + "</b>"));
                        }
                        _a.label = 16;
                    case 16: return [3 /*break*/, 21];
                    case 17:
                        if (!(cordova.platformId === 'ios')) return [3 /*break*/, 21];
                        action = new Promise(function (res, rej) {
                            window.plugins.socialsharing.available(function (b) { return res(b); });
                        });
                        return [4 /*yield*/, action];
                    case 18:
                        if (!((_a.sent()) === false)) return [3 /*break*/, 19];
                        self.msgService.alert((!!self.pts.pts) ? self.pts.pts.fsService.cannotShare : 'Oh, I cannot share the file.');
                        return [3 /*break*/, 21];
                    case 19:
                        action = new Promise(function (res, rej) {
                            // window.plugins.socialsharing.shareWithOptions({files: fileEntry.toURL()}, res, rej);
                            window.plugins.socialsharing.shareWithOptions({ message: data }, res, rej);
                        });
                        console.log('before sharing');
                        return [4 /*yield*/, action];
                    case 20:
                        result = _a.sent();
                        console.log(JSON.stringify(result));
                        if (result.completed === true) {
                            self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.askSavingToFile : '請將取得的文字存到{0}的檔案裡頭，這些文字才能被正確使用。')
                                .replace('{0}', '<b style="color:red;">' + fileName.substring(fileName.lastIndexOf('.')) + '</b>'));
                        }
                        _a.label = 21;
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    FsService.prototype.rmFile$ = function (file) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subs) {
            if (!!file === false) {
                subs.next(false);
                subs.complete();
                return;
            }
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
        __metadata("design:paramtypes", [_page_texts_service__WEBPACK_IMPORTED_MODULE_5__["PageTextsService"],
            _device_service__WEBPACK_IMPORTED_MODULE_1__["DeviceService"], _message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
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
/* harmony import */ var _ad_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ad.service */ "./src/app/services/ad.service.ts");
/* harmony import */ var _db_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./db.service */ "./src/app/services/db.service.ts");
/* harmony import */ var _fs_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fs.service */ "./src/app/services/fs.service.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _page_texts_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./page-texts.service */ "./src/app/services/page-texts.service.ts");
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










var MediaEditService = /** @class */ (function () {
    function MediaEditService(adService, fsService, msgService, db, ptsService) {
        this.adService = adService;
        this.fsService = fsService;
        this.msgService = msgService;
        this.db = db;
        this.ptsService = ptsService;
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
        this._setiFrame$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.setiFrame$ = this._setiFrame$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["shareReplay"])(1));
        this.repeatStart$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        var self = this;
        self.ptsService.PTSReady$.subscribe(function (_) {
            self.pts = self.ptsService.pts;
            self.story = new _story_service__WEBPACK_IMPORTED_MODULE_2__["Story"](self.pts);
        });
        self.ptsService.ptsLoaded$.subscribe(function (_) {
            self.pts = self.ptsService.pts;
        });
        this._onStateChanged = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.onPlayerAction = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.state = MEState.initialized;
        // * [2018-08-25 21:26] light up setiFrame$
        this.setiFrame$.subscribe();
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
        // * [2018-08-15 16:25] Try to show admob
        this.adService.showInterstitial();
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
                this.story = new _story_service__WEBPACK_IMPORTED_MODULE_2__["Story"](this.pts);
                this.story.meType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].url;
            }
            else if (!!data['makeTime']) {
                this.story = data;
            }
            else if (!!data) {
                this.story = new _story_service__WEBPACK_IMPORTED_MODULE_2__["Story"](this.pts);
                this.story.meType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].file;
            }
            else {
                this.state = MEState.parseFailed;
                return;
            }
        }
        if (!!data['makeTime']) {
            // * [2018-07-19 13:41] If input is a story
        }
        else if ((this.story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].url) || (this.story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].youtubeID)) {
            this.story.urlOrID = data;
            this.story.title = this.story.urlOrID;
            this.story.name = this.story.title.slice(this.story.title.lastIndexOf('/') + 1);
        }
        else if (this.story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].file) {
            this.blob = data;
            this.story.urlOrID = window.URL.createObjectURL(this.blob);
            if (!!data) {
                this.story.title = this.story.fileName = data.name;
                this.story.name = this.story.title;
            }
        }
        // * [2018-07-23 10:16] Update the duration & playbackRates
        if (this.story.meType !== _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].youtubeID) {
            this.onPlayerAction.next(playerAction.getDuration);
            this.onPlayerAction.next(playerAction.getAllowedPlaybackRate);
        }
        // * [2018-08-20 12:44] Update viewTime if it has been stored before
        if (this.story.modifyTime !== 0) {
            this.story.viewTime = Date.now();
            this.onUpdateStory$$();
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
            self._setiFrame$.next(i);
        }
        else {
            self.msgService.alert("Problem in setiFrame(" + i + ")");
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
            self.msgService.alert("Problem in setVolume");
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
            self.msgService.alert("Problem in setPlaybackRate");
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
            self.msgService.alert("Problem in setVolume");
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
            self.msgService.alert("Problem in setPlaybackRate");
        }
    };
    MediaEditService.prototype.onSaveStory$$ = function () {
        return __awaiter(this, void 0, void 0, function () {
            var story, self, isSaved, _a, insert;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        story = this.story;
                        story.modifyTime = story.viewTime = Date.now();
                        self = this;
                        if (!(story.meType === _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_3__["PlayerType"].file)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fsService.getFile$(story.fileName, true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (fEntry) {
                                return self.fsService.writeFile$(fEntry, self.blob);
                            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["concatAll"])()).toPromise()];
                    case 1:
                        isSaved = _b.sent();
                        if (!(isSaved === true)) return [3 /*break*/, 3];
                        _a = story;
                        return [4 /*yield*/, this.fsService.getFile$(story.fileName).toPromise()];
                    case 2:
                        _a.urlOrID = (_b.sent()).toURL();
                        _b.label = 3;
                    case 3:
                        self.msgService.pushMessage({ type: _message_service__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].Info, message: "The file " + story.fileName + " is stored: " + isSaved });
                        _b.label = 4;
                    case 4:
                        delete story['id'];
                        return [4 /*yield*/, this.db.upsertAsync(_db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"].storyTableName, story)];
                    case 5:
                        insert = _b.sent();
                        // * [2018-07-25 19:04] Change its state to 'Update'
                        story['id'] = insert[0].affectedRows[0].id;
                        this.sideClickType = SideClickType.select;
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaEditService.prototype.onUpdateStory$$ = function () {
        return __awaiter(this, void 0, void 0, function () {
            var story;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        story = this.story;
                        story.modifyTime = story.viewTime = Date.now();
                        return [4 /*yield*/, this.db.upsertAsync(_db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"].storyTableName, story)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaEditService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_ad_service__WEBPACK_IMPORTED_MODULE_4__["AdService"],
            _fs_service__WEBPACK_IMPORTED_MODULE_6__["FsService"],
            _message_service__WEBPACK_IMPORTED_MODULE_7__["MessageService"],
            _db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"],
            _page_texts_service__WEBPACK_IMPORTED_MODULE_9__["PageTextsService"]])
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
    MEState[MEState["playerReady"] = 11] = "playerReady";
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
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dialog/dialog.component */ "./src/app/dialog/dialog.component.ts");
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
    function MessageService(dialog) {
        this.dialog = dialog;
        this.remindMsgIn = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.isShown = true;
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
    MessageService.prototype.alert = function (msg) {
        if (!!window.cordova === true) {
            this.dialog.open(_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_3__["DialogComponent"], {
                width: '50%',
                data: { dType: _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_3__["DialogType"].alert, msg: msg }
            });
        }
        else {
            this.alert(msg);
        }
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
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

/***/ "./src/app/services/page-texts.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/page-texts.service.ts ***!
  \************************************************/
/*! exports provided: PageTextsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageTextsService", function() { return PageTextsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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




var PageTextsService = /** @class */ (function () {
    function PageTextsService(http) {
        this.http = http;
        this._ptsLoaded$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.langList = [
            { name: "繁中", isoCode: "zh-tw" },
            { name: "簡中", isoCode: "zh-cn" },
            { name: "English", isoCode: "en" },
            { name: "Indonesia", isoCode: "id" }
        ];
        this.folder_prefix = "iso_";
        this._ptsKey = "PTS";
        this._isoCodeKey = "IsoCode";
        var self = this;
        self.PTSReady$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(self._iniPTS$$()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
    }
    Object.defineProperty(PageTextsService.prototype, "ptsLoaded$", {
        get: function () {
            return this._ptsLoaded$;
        },
        enumerable: true,
        configurable: true
    });
    PageTextsService.prototype._iniPTS$$ = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, lang;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadPTSFromStorage$$()];
                    case 1:
                        result = _a.sent();
                        if (!(!!result === false)) return [3 /*break*/, 3];
                        lang = navigator.language;
                        return [4 /*yield*/, this.loadPTS$$()];
                    case 2:
                        result = _a.sent();
                        this.savePTS2Storage();
                        _a.label = 3;
                    case 3: return [2 /*return*/, (!!result)];
                }
            });
        });
    };
    PageTextsService.prototype.loadPTS$$ = function (isoCode, isSaveIntoStorage) {
        if (isoCode === void 0) { isoCode = 'en'; }
        if (isSaveIntoStorage === void 0) { isSaveIntoStorage = false; }
        return __awaiter(this, void 0, void 0, function () {
            var self, httpGet, obj, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        httpGet = this.http.get("assets/i18n/" + self.folder_prefix + isoCode + "/pageTexts.json").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1));
                        obj = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, httpGet.toPromise()];
                    case 2:
                        obj = (_a.sent());
                        self.langCode = isoCode;
                        self.pts = obj;
                        self._ptsLoaded$.next(self.pts);
                        if (isSaveIntoStorage === true) {
                            self.savePTS2Storage();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        self._ptsLoaded$.next(null);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, obj];
                }
            });
        });
    };
    PageTextsService.prototype.loadPTSFromStorage$$ = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, code;
            return __generator(this, function (_a) {
                self = this;
                code = null;
                try {
                    code = window.localStorage.getItem(self._isoCodeKey);
                }
                catch (error) {
                    code = null;
                }
                if (!!code) {
                    self.langCode = code;
                    self.pts = JSON.parse(window.localStorage.getItem(self._ptsKey));
                    self._ptsLoaded$.next(self.pts);
                }
                return [2 /*return*/, (!!code) ? self.pts : null];
            });
        });
    };
    PageTextsService.prototype.savePTS2Storage = function () {
        var self = this;
        if (!!this.pts) {
            window.localStorage.setItem(self._ptsKey, JSON.stringify(this.pts));
            window.localStorage.setItem(self._isoCodeKey, self.langCode);
        }
    };
    PageTextsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], PageTextsService);
    return PageTextsService;
}());



/***/ }),

/***/ "./src/app/services/speech-synthesis.service.ts":
/*!******************************************************!*\
  !*** ./src/app/services/speech-synthesis.service.ts ***!
  \******************************************************/
/*! exports provided: SpeechSynthesisService, SSutterParameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpeechSynthesisService", function() { return SpeechSynthesisService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SSutterParameters", function() { return SSutterParameters; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _device_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./device.service */ "./src/app/services/device.service.ts");
/* harmony import */ var _page_texts_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-texts.service */ "./src/app/services/page-texts.service.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./message.service */ "./src/app/services/message.service.ts");
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






var SpeechSynthesisService = /** @class */ (function () {
    function SpeechSynthesisService(msg, device, ptsService) {
        this.msg = msg;
        this.device = device;
        this.ptsService = ptsService;
        this._getVoices$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.getVoices$ = this._getVoices$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
        var self = this;
        this.updateVoices$$();
        if (!!window.cordova && cordova.platformId === 'android') {
            ptsService.PTSReady$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["concat"])(ptsService.ptsLoaded$)).subscribe(function (_) {
                // **************** TODO: To notice it that the voices is changed (at least for differnt language) **************
                if (!!self.voices === true) {
                    self.voices = self.voices.slice(0);
                }
            });
        }
    }
    SpeechSynthesisService.prototype.updateVoices$$ = function () {
        return __awaiter(this, void 0, void 0, function () {
            var voices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.device.isCordova && cordova.platformId === 'android')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.device.onDeviceReady.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).toPromise()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, window['TTS'].getVoices()];
                    case 2:
                        voices = (_a.sent());
                        return [3 /*break*/, 5];
                    case 3: 
                    // * [2018-08-23 11:05] Try 5 times to get the voices
                    return [4 /*yield*/, Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(100).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(5), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeWhile"])(function (_) {
                            voices = speechSynthesis.getVoices();
                            return !!voices === false || voices.length === 0;
                        })).toPromise()];
                    case 4:
                        // * [2018-08-23 11:05] Try 5 times to get the voices
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        // * [2018-08-23 11:07] If I got the voice, set the default voice
                        if (!!voices !== false && voices.length > 0) {
                            voices = voices.sort(function (a, b) { return (a.lang < b.lang) ? -1 : 1; });
                            this.defaultVoice = voices.find(function (v) { return /en.*US/.test(v.lang); });
                            this.defaultVoice = (!!this.defaultVoice) ? this.defaultVoice : voices[0];
                            this._getVoices$.next(true);
                        }
                        this.voices = voices;
                        return [2 /*return*/];
                }
            });
        });
    };
    SpeechSynthesisService.prototype.getVoiceName = function (voiceOrLang) {
        if (typeof voiceOrLang === 'string') {
            var voice = this.voices.find(function (v) { return v.lang.replace('_', '-') === voiceOrLang.replace('_', '-'); });
            if (!!voice) {
                return voice.name;
            }
            else {
                return "";
            }
        }
        else {
            if (!!window.cordova && cordova.platformId !== 'windows') {
                var voice = voiceOrLang;
                var codes = voice.lang.split(/(\-|\_)/);
                if (!!this.ptsService.pts === false) {
                    return voice.name;
                }
                else {
                    var result = "";
                    var buf = "";
                    buf = this.ptsService.pts.iso639[codes[0]];
                    if (!!buf) {
                        result += buf;
                    }
                    if (!!buf === true) {
                        result += ': ';
                    }
                    if (codes.length === 3) {
                        buf = this.ptsService.pts.iso3166Country[codes[2]];
                        if (!!buf) {
                            result += buf;
                        }
                    }
                    // * [2018-08-31 16:46] Give more information
                    if (cordova.platformId === 'android') {
                        buf = voice.name.substring(voice.name.lastIndexOf('#') + 1);
                        result += '(' + buf + ')';
                    }
                    else {
                        result = '(' + result + ')' + voice.name;
                    }
                    return result;
                }
            }
            else {
                return voiceOrLang.name;
            }
        }
    };
    SpeechSynthesisService.prototype.speak = function (para) {
        if (this.device.isCordova && cordova.platformId === 'android') {
            window['TTS'].stop();
            if (!!para.voiceName === false) {
                para.voiceName = this.getVoiceName(para.lang);
            }
            var androidPara = Object.assign({ name: para.voiceName }, para);
            window['TTS'].speak(androidPara);
        }
        else {
            if (!!para === false) {
                this.msg.alert("Warning: input of SpeechSynthesisService.speak cannot be " + para);
                return;
            }
            // * [2018-08-22 19:53] Cancel previous utterance
            speechSynthesis.pause();
            speechSynthesis.cancel();
            // * [2018-08-22 19:53] Create a new utterance
            var utter = new SpeechSynthesisUtterance(para.text);
            utter.pitch = para.pitch;
            utter.rate = para.rate;
            utter.volume = para.volume;
            if (!!para.voice === true) {
                utter.voice = para.voice;
            }
            else {
                utter.lang = para.lang;
            }
            // * [2018-08-22 19:54] Play it
            speechSynthesis.speak(utter);
            speechSynthesis.resume();
        }
    };
    SpeechSynthesisService.prototype.updateUtterParaWithVoice = function (old) {
        if (!!old.voiceName === true) {
            old.voice = this.voices.find(function (v) { return v.name === old.voiceName; });
            if (!!old.voice === true) {
                return old;
            }
        }
        if (!!old.lang === true) {
            old.voice = this.voices.find(function (v) { return v.lang.replace('_', '-') === old.lang.replace('_', '-'); });
            if (!!old.voice === true) {
                return old;
            }
        }
        return old;
    };
    SpeechSynthesisService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"], _device_service__WEBPACK_IMPORTED_MODULE_3__["DeviceService"], _page_texts_service__WEBPACK_IMPORTED_MODULE_4__["PageTextsService"]])
    ], SpeechSynthesisService);
    return SpeechSynthesisService;
}());

var SSutterParameters = /** @class */ (function () {
    function SSutterParameters() {
        this.lang = 'en-US';
        this.pitch = 1;
        this.rate = 1;
        this.text = 'test';
        this.volume = 1;
    }
    return SSutterParameters;
}());



/***/ }),

/***/ "./src/app/services/story.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/story.service.ts ***!
  \*******************************************/
/*! exports provided: StoryService, Story, utterType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoryService", function() { return StoryService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Story", function() { return Story; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utterType", function() { return utterType; });
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
    function Story(pts) {
        this.name = '請給個名字';
        this.title = '歡迎使用本App來幫助學習';
        this.description = '';
        this.keywords = '';
        this.urlOrID = ''; // 'https://youtu.be/rpvsEBdP4c8';
        this.meType = _vm_player_type_enum__WEBPACK_IMPORTED_MODULE_1__["PlayerType"].url;
        this.fileName = '';
        this.fileToken = '';
        this.iFrame = -1;
        this.utterType = utterType.none;
        if (!!pts === true) {
            this.name = pts.NewStory.name;
            this.title = pts.NewStory.title;
        }
        var time = Date.now();
        this.makeTime = this.viewTime = time;
        this.modifyTime = 0;
        this.frames = [];
        return this;
    }
    return Story;
}());

var utterType;
(function (utterType) {
    utterType[utterType["none"] = 0] = "none";
    utterType[utterType["byEach"] = 1] = "byEach";
    utterType[utterType["all"] = 2] = "all";
})(utterType || (utterType = {}));


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
    YoutubeService.regYT = /^(http(s)?:\/\/)?(((.*\.youtube\.com)\/.*[\?\&]v=([^\&]+))|(youtu\.be\/([^\&]+)))/i;
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
/* harmony import */ var _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/speech-synthesis.service */ "./src/app/services/speech-synthesis.service.ts");

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
        this.isUtter = false;
        this.utterPara = new _services_speech_synthesis_service__WEBPACK_IMPORTED_MODULE_0__["SSutterParameters"]();
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

module.exports = __webpack_require__(/*! /Users/ychsue/workspace/cordova-ng-test/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map