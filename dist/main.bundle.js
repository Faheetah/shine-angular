webpackJsonp([1,4],{

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HubsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HubsComponent = (function () {
    function HubsComponent(authService, alertService, router, activatedRoute) {
        this.authService = authService;
        this.alertService = alertService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loading = false;
    }
    HubsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.authService.getUpnpHubs()
            .subscribe(function (data) {
            _this.hubs = data.json();
            if (_this.hubs.length === 1) {
                _this.login(_this.hubs[0].id, _this.hubs[0].internalipaddress);
            }
            _this.loading = false;
            _this.returnUrl = _this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        }, function (error) {
            _this.alertService.danger('Could not get hub from Philips, please visit https://www.meethue.com/api/nupnp to get your hub IP, or check your router.');
            _this.loading = false;
        });
    };
    HubsComponent.prototype.login = function (id, hub) {
        var _this = this;
        this.authService.login(id, hub)
            .subscribe(function (data) {
            _this.alertService.clear();
            _this.alertService.success("Connected to " + hub, true);
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            console.log(111);
            _this.alertService.danger(error);
        });
    };
    HubsComponent.prototype.logout = function (id) {
        this.authService.logout(id);
    };
    return HubsComponent;
}());
HubsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(238)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* ActivatedRoute */]) === "function" && _d || Object])
], HubsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/hubs.component.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LightsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LightsComponent = (function () {
    function LightsComponent(http, alertService, authService) {
        this.http = http;
        this.alertService = alertService;
        this.authService = authService;
        this.lights = [];
        this.updating = false;
        this.endpoint = authService.getEndpoint();
    }
    LightsComponent.prototype.ngOnInit = function () {
        this.getLights();
    };
    LightsComponent.prototype.getLights = function () {
        var _this = this;
        this.http.get(this.endpoint + "/lights")
            .subscribe(function (response) {
            var data = response.json();
            Object.keys(data).forEach(function (i) {
                var light = data[i];
                if (!light.state.on) {
                    light.state.bri = 0;
                }
                light.id = i;
                _this.lights.push(light);
            });
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    LightsComponent.prototype.changeBrightness = function (light, value) {
        var _this = this;
        light.state = {
            on: +value > 0,
            bri: +value,
            reachable: light.state.reachable
        };
        if (this.updating === true) {
            return;
        }
        this.updating = true;
        setTimeout(function () {
            var state = light.state;
            _this.http.put(_this.endpoint + "/lights/" + light.id + "/state", JSON.stringify(state))
                .map(function (response) {
                var data = response.json();
                if ('error' in data) {
                    throw new Error(data.error);
                }
            })
                .subscribe(null, function (error) {
                _this.alertService.danger(error);
            });
            _this.updating = false;
        }, 350);
    };
    LightsComponent.prototype.lightStyle = function (state) {
        if (!state.reachable) {
            return '#FF3333';
        }
        if (state.on) {
            var bri = Math.floor(state.bri / 3) + 150;
            return "rgb(" + bri + ", " + bri + ", 100)";
        }
        return 'rgb(80,80,80)';
    };
    LightsComponent.prototype.toggleOn = function (light) {
        if (light.state.on) {
            this.changeBrightness(light, 0);
        }
        else {
            this.changeBrightness(light, 254);
        }
    };
    LightsComponent.prototype.toggleMenu = function (light) {
        var _this = this;
        var expanded = light['expanded']; //this.lights[index]['expanded'];
        Object.keys(this.lights).forEach(function (l) {
            _this.lights[l]['expanded'] = false;
        });
        if (!expanded) {
            light['expanded'] = true;
        }
    };
    LightsComponent.prototype.rename = function (light) {
        var _this = this;
        var name = prompt('New name:');
        if (!name) {
            return;
        }
        this.http.put(this.endpoint + "/lights/" + light.id, JSON.stringify({ name: name }))
            .map(function (response) {
            var data = response.json();
            if ('error' in data) {
                throw new Error(data.error);
            }
        })
            .subscribe(function () {
            light.name = name;
            light.expanded = false;
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    LightsComponent.prototype.delete = function (light) {
        var _this = this;
        if (!confirm('Really remove this light?')) {
            return;
        }
        this.http.delete(this.endpoint + "/lights/" + light.id)
            .map(function (response) {
            var data = response.json();
            if ('error' in data) {
                throw new Error(data.error);
            }
        })
            .subscribe(function () {
            _this.alertService.danger("Removed light " + light.name);
            _this.getLights();
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    LightsComponent.prototype.search = function () {
        var _this = this;
        this.http.post(this.endpoint + "/lights", {})
            .map(function (response) {
            var data = response.json();
            if ('error' in data) {
                throw new Error(data.error);
            }
        })
            .subscribe(function () {
            _this.alertService.info('Searching for new lights');
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    return LightsComponent;
}());
LightsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(239)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], LightsComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/lights.component.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RoomsComponent = (function () {
    function RoomsComponent(http, alertService, authService) {
        this.http = http;
        this.alertService = alertService;
        this.authService = authService;
        this.lights = {};
        this.updating = false;
        this.classes = [
            "Living room",
            "Kitchen",
            "Dining",
            "Bedroom",
            "Kids bedroom",
            "Bathroom",
            "Nursery",
            "Recreation",
            "Office",
            "Gym",
            "Hallway",
            "Toilet",
            "Front door",
            "Garage",
            "Terrace",
            "Garden",
            "Driveway",
            "Carport",
            "Other"
        ];
        this.endpoint = authService.getEndpoint();
    }
    RoomsComponent.prototype.ngOnInit = function () {
        this.getLights();
        this.getGroups();
    };
    RoomsComponent.prototype.getGroups = function () {
        var _this = this;
        this.http.get(this.endpoint + "/groups")
            .subscribe(function (response) {
            var data = response.json();
            Object.keys(data).forEach(function (group) {
                var lights = {};
                // probably better to abstract this out into a method to get all lights for a group
                Object.keys(data[group].lights).forEach(function (light) {
                    lights[data[group].lights[light]] = _this.lights[data[group].lights[light]];
                });
                data[group].lights = lights;
                if (!data[group].action.on) {
                    data[group].action.bri = 0;
                }
            });
            _this.groups = data;
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    RoomsComponent.prototype.getLights = function () {
        var _this = this;
        this.http.get(this.endpoint + "/lights")
            .subscribe(function (response) {
            var data = response.json();
            Object.keys(data).forEach(function (i) {
                var light = data[i];
                if (!light.state.on) {
                    light.state.bri = 0;
                }
            });
            _this.lights = data;
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    RoomsComponent.prototype.changeBrightness = function (index, value) {
        var _this = this;
        this.groups[index]['action'] = {
            on: +value > 0,
            bri: +value,
        };
        if (this.updating == true) {
            return;
        }
        this.updating = true;
        setTimeout(function () {
            var state = _this.groups[index]['action'];
            _this.http.put(_this.endpoint + "/groups/" + index + "/action", JSON.stringify(state))
                .map(function (response) {
                var data = response.json();
                if ('error' in data) {
                    throw new Error(data.error);
                }
            })
                .subscribe(null, function (error) {
                _this.alertService.danger(error);
            });
            _this.updating = false;
        }, 350);
    };
    RoomsComponent.prototype.lightStyle = function (state) {
        if (state.on) {
            var bri = Math.floor(state.bri / 3) + 150;
            return "rgb(" + bri + ", " + bri + ", 100)";
        }
        return "rgb(80,80,80)";
    };
    RoomsComponent.prototype.toggleOn = function (index) {
        if (this.groups[index]['action'].on) {
            this.changeBrightness(index, 0);
        }
        else {
            this.changeBrightness(index, 254);
        }
    };
    RoomsComponent.prototype.toggleMenu = function (index) {
        var _this = this;
        var expanded = this.groups[index]['expanded'];
        Object.keys(this.groups).forEach(function (g) {
            _this.groups[g]['expanded'] = false;
        });
        if (!expanded) {
            this.groups[index]['expanded'] = true;
        }
    };
    RoomsComponent.prototype.renameGroup = function (index) {
        var _this = this;
        var name = prompt('New name:');
        if (!name) {
            return;
        }
        this.http.put(this.endpoint + "/groups/" + index, JSON.stringify({ name: name }))
            .map(function (response) {
            var data = response.json();
            if ('error' in data) {
                throw new Error(data.error);
            }
        })
            .subscribe(function () {
            _this.groups[index]['name'] = name;
            _this.groups[index]['expanded'] = false;
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    RoomsComponent.prototype.deleteGroup = function (index) {
        var _this = this;
        if (!confirm('Really remove this group?')) {
            return;
        }
        this.http.delete(this.endpoint + "/groups/" + index)
            .map(function (response) {
            var data = response.json();
            if ('error' in data) {
                throw new Error(data.error);
            }
        })
            .subscribe(function () {
            _this.alertService.danger("Removed group " + _this.groups[index]['name']);
            _this.getGroups();
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    RoomsComponent.prototype.assignedToRoom = function (index) {
        for (var g in this.groups) {
            if (g == index || this.groups[g]['type'] != 'Room') {
                continue;
            }
            for (var l in this.groups[g]['lights']) {
                if (l in this.groups[index]['lights']) {
                    this.alertService.danger("Light \"" + this.lights[l]['name'] + "\" is already in room \"" + this.groups[g]['name'] + "\"");
                    return true;
                }
            }
        }
        return false;
    };
    RoomsComponent.prototype.saveGroup = function (index) {
        var _this = this;
        var group = {};
        group['name'] = this.groups[index]['name'];
        group['class'] = this.groups[index]['class'];
        group['lights'] = Object.keys(this.groups[index]['lights']);
        if (this.assignedToRoom(index)) {
            return;
        }
        this.http.put(this.endpoint + "/groups/" + index, JSON.stringify(group))
            .map(function (response) {
            var data = response.json();
            data.forEach(function (msg) {
                if ('error' in msg) {
                    throw new Error(msg['error']['description']);
                }
            });
        })
            .subscribe(function () {
            _this.alertService.success("Updated group " + _this.groups[index]['name']);
            _this.getGroups();
        }, function (error) {
            _this.alertService.danger(error);
        });
    };
    RoomsComponent.prototype.delete = function (obj, key) {
        delete obj[key];
    };
    return RoomsComponent;
}());
RoomsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(240)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], RoomsComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/rooms.component.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScenesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ScenesComponent = (function () {
    function ScenesComponent(http, alertService, authService) {
        this.http = http;
        this.alertService = alertService;
        this.authService = authService;
        this.endpoint = authService.getEndpoint();
    }
    ScenesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(this.endpoint + '/scenes')
            .map(function (response) {
            return response.json();
        })
            .subscribe(function (data) {
            _this.scenes = data;
        }, function (error) { _this.alertService.danger(error); });
    };
    return ScenesComponent;
}());
ScenesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(241),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], ScenesComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/scenes.component.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SchedulesComponent = (function () {
    function SchedulesComponent(http, alertService, authService) {
        this.http = http;
        this.alertService = alertService;
        this.authService = authService;
        this.endpoint = authService.getEndpoint();
    }
    SchedulesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(this.endpoint + '/schedules')
            .map(function (response) {
            return response.json();
        })
            .subscribe(function (data) {
            _this.schedules = Object.keys(data)
                .map(function (k) { return { key: k, value: data[k] }; });
        }, function (error) { _this.alertService.danger(error); });
    };
    return SchedulesComponent;
}());
SchedulesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(242),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], SchedulesComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/schedules.component.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.clearSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.persist = false;
        router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationStart */]) {
                if (_this.persist) {
                    _this.persist = false;
                }
                else {
                    _this.clear();
                }
            }
        });
    }
    AlertService.prototype.alert = function (message, type) {
        if (type === void 0) { type = 'warning'; }
        this.clear();
        this.subject.next({ type: type, message: message });
    };
    AlertService.prototype.info = function (message, persist) {
        if (persist === void 0) { persist = false; }
        this.persist = persist;
        this.alert(message, 'info');
    };
    AlertService.prototype.success = function (message, persist) {
        if (persist === void 0) { persist = false; }
        this.persist = persist;
        this.alert(message, 'success');
    };
    AlertService.prototype.warning = function (message, persist) {
        if (persist === void 0) { persist = false; }
        this.persist = persist;
        this.alert(message, 'warning');
    };
    AlertService.prototype.danger = function (message, persist) {
        if (persist === void 0) { persist = false; }
        this.persist = persist;
        this.alert(message, 'danger');
    };
    AlertService.prototype.clear = function () {
        this.clearSubject.next();
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AlertService.prototype.shouldClear = function () {
        return this.clearSubject.asObservable();
    };
    return AlertService;
}());
AlertService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], AlertService);

var _a;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/alert.service.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = (function () {
    function AuthService(http, router, alertService) {
        this.http = http;
        this.router = router;
        this.alertService = alertService;
        var id = localStorage.getItem('id');
        if (id != undefined && localStorage.getItem(id) != undefined) {
            this.id = id;
        }
    }
    AuthService.prototype.login = function (id, hub) {
        var _this = this;
        var json = JSON.stringify({ "devicetype": "shine#web" });
        return this.http.post("http://" + hub + "/api", json)
            .map(function (response) {
            var current = localStorage.getItem(id);
            if (_this.id === id && _this.id != undefined) {
                return _this.getEndpoint();
            }
            var resp = response.json()[0];
            if ("error" in resp) {
                throw new Error(resp.error.description);
            }
            if ("success" in resp) {
                var user = resp.success.username;
                localStorage.setItem(id, "http://" + hub + "/api/" + user);
                localStorage.setItem('id', id);
                _this.id = id;
                return _this.getEndpoint();
            }
            throw new Error("Could not parse response from server: " + resp.stringify);
        });
    };
    AuthService.prototype.logout = function (id) {
        localStorage.removeItem(id);
        delete this.id;
    };
    AuthService.prototype.getUpnpHubs = function () {
        // [{"id": "1234567890abcdef", "internalipaddress": "localhost:8888"}]
        return this.http.get('https://www.meethue.com/api/nupnp')
            .map(function (response) {
            return response;
        });
    };
    AuthService.prototype.getEndpoint = function () {
        var endpoint = localStorage.getItem(this.id);
        if (endpoint) {
            return endpoint;
        }
        this.id = null;
        this.router.navigate(['/hubs']);
    };
    AuthService.prototype.isConnected = function () {
        if (this.id === undefined) {
            return false;
        }
        return true;
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__alert_service__["a" /* AlertService */]) === "function" && _c || Object])
], AuthService);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/auth.service.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(172);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/main.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
        this.alerts = [];
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage().subscribe(function (alert) {
            if (alert != undefined) {
                _this.open(alert.message, alert.type);
            }
        });
        this.alertService.shouldClear().subscribe(function (clear) {
            _this.alerts = [];
        });
    };
    AlertComponent.prototype.open = function (message, type) {
        if (type === void 0) { type = 'warning'; }
        var nextId = this.alerts.length;
        this.alerts.push({
            id: nextId,
            type: type,
            message: message
        });
    };
    AlertComponent.prototype.close = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-alert',
        template: __webpack_require__(235)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/alert.component.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(authService) {
        this.authService = authService;
    }
    AppComponent.prototype.connected = function () {
        return this.authService.isConnected();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(236)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/app.component.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home_component__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__hubs_hubs_component__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__alert_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__alert_alert_component__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__lights_lights_component__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__rooms_rooms_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__scenes_scenes_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__schedules_schedules_component__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__keys_pipe__ = __webpack_require__(175);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_11__alert_alert_component__["a" /* AlertComponent */],
            __WEBPACK_IMPORTED_MODULE_7__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_8__hubs_hubs_component__["a" /* HubsComponent */],
            __WEBPACK_IMPORTED_MODULE_12__lights_lights_component__["a" /* LightsComponent */],
            __WEBPACK_IMPORTED_MODULE_13__rooms_rooms_component__["a" /* RoomsComponent */],
            __WEBPACK_IMPORTED_MODULE_14__scenes_scenes_component__["a" /* ScenesComponent */],
            __WEBPACK_IMPORTED_MODULE_15__schedules_schedules_component__["a" /* SchedulesComponent */],
            __WEBPACK_IMPORTED_MODULE_16__keys_pipe__["a" /* KeysPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_9__auth_service__["a" /* AuthService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/app.module.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lights_lights_component__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rooms_rooms_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scenes_scenes_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schedules_schedules_component__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__hubs_hubs_component__ = __webpack_require__(134);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });






var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__lights_lights_component__["a" /* LightsComponent */] },
    { path: 'lights', component: __WEBPACK_IMPORTED_MODULE_1__lights_lights_component__["a" /* LightsComponent */] },
    { path: 'rooms', component: __WEBPACK_IMPORTED_MODULE_2__rooms_rooms_component__["a" /* RoomsComponent */] },
    { path: 'scenes', component: __WEBPACK_IMPORTED_MODULE_3__scenes_scenes_component__["a" /* ScenesComponent */] },
    { path: 'schedules', component: __WEBPACK_IMPORTED_MODULE_4__schedules_schedules_component__["a" /* SchedulesComponent */] },
    { path: 'hubs', component: __WEBPACK_IMPORTED_MODULE_5__hubs_hubs_component__["a" /* HubsComponent */] },
    { path: '**', redirectTo: '' },
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(routes, { useHash: true });
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/app.routing.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(authService) {
        this.authService = authService;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(237)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/home.component.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        if (!value) {
            return value;
        }
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Pipe */])({
        name: 'keys'
    })
], KeysPipe);

//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/keys.pipe.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/noway/Development/GitHub/shine/src/environment.js.map

/***/ }),

/***/ 235:
/***/ (function(module, exports) {

module.exports = "<div *ngFor='let alert of alerts'>\r\n  <ngb-alert (close)=\"close(alert)\" [type]=\"alert.type\">\r\n    {{ alert.message }}\r\n  </ngb-alert>\r\n</div>"

/***/ }),

/***/ 236:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"padding-left: 0; padding-right: 0;\">\r\n  <header class=\"navbar navbar-inverse navbar-fixed-top navbar-toggleable-md\">\r\n    <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" (click)=\"navbarCollapsed = !navbarCollapsed\"\r\n            [attr.aria-expanded]=\"!navbarCollapsed\" aria-controls=\"navbarContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n      <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n\r\n    <a class=\"navbar-brand\" [routerLink]=\"['/']\">Shine</a>\r\n\r\n    <div class=\"navbar-collapse\" [ngbCollapse]=\"navbarCollapsed\" id=\"navbarContent\">\r\n      <ul class=\"navbar-nav mr-auto\">\r\n        <li class=\"nav-item\" [routerLinkActive]=\"['active']\">\r\n          <a class=\"nav-link\" [routerLink]=\"['/lights']\">Lights</a>\r\n        </li>\r\n        <li class=\"nav-item\" [routerLinkActive]=\"['active']\">\r\n          <a class=\"nav-link\" [routerLink]=\"['/rooms']\">Rooms</a>\r\n        </li>\r\n        <li class=\"nav-item\" [routerLinkActive]=\"['active']\">\r\n          <a class=\"nav-link\" [routerLink]=\"['/scenes']\">Scenes</a>\r\n        </li>\r\n        <li class=\"nav-item\" [routerLinkActive]=\"['active']\">\r\n          <a class=\"nav-link\" [routerLink]=\"['/schedules']\">Schedules</a>\r\n        </li>\r\n        <li class=\"nav-item\" [routerLinkActive]=\"['active']\">\r\n          <a class=\"nav-link\" [routerLink]=\"['/hubs']\">Hubs</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </header>\r\n</div>\r\n\r\n<div class=\"container\">\r\n  <ngb-alert type=\"danger\" [dismissible]=\"false\" *ngIf=\"!connected()\">Disconnected</ngb-alert>\r\n\r\n  <app-alert></app-alert>\r\n</div>\r\n\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 237:
/***/ (function(module, exports) {

module.exports = "<p>\r\n  {{ authService.getEndpoint() }}\r\n  Future home of.... home?\r\n</p>\r\n"

/***/ }),

/***/ 238:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\r\n  <h2>Select a hub to connect</h2>\r\n  <ngb-alert [dismissible]=\"false\" class=\"text-center\">Be sure to press the hub button first</ngb-alert>\r\n</div>\r\n\r\n<div class=\"col-md-6\" *ngIf='authService.id != undefined'>\r\n  <p><a (click)=\"logout(authService.id)\" class=\"btn btn-danger\">Disconnect from {{ authService.id }}</a> \r\n</div>\r\n\r\n<div class=\"col-md-6\">\r\n  <div *ngIf=\"loading\">Loading hubs...</div>\r\n\r\n  <div *ngIf=\"!loading\">\r\n    <div class=\"input-group form-group\">\r\n      <label class=\"input-group-addon\" for=\"ip\">Manual IP</label>\r\n      <input class=\"form-control\" id=\"ip\" type=\"text\" #manualIP /> \r\n      <button (click)=\"login('manual', manualIP.value)\" class=\"input-group-addon btn btn-primary\" style=\"background-color: #0275d8; border-color: #0275d8; color: white;\">Go</button>\r\n    </div>\r\n\r\n    <div *ngFor=\"let hub of hubs\" class=\"form-group\">\r\n      <p>\r\n        <button (click)=\"login(hub.id, hub.internalipaddress)\" [id]=\"hub.id\" class=\"btn btn-primary\">{{ hub.internalipaddress }}</button>\r\n      </p>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 239:
/***/ (function(module, exports) {

module.exports = "<p>\r\n  <a href=\"#\" (click)=\"search()\">Search for New Lights</a> \r\n</p>\r\n\r\n<div *ngFor=\"let light of lights; let index = index\">\r\n  <div class=\"card\">\r\n    <div class=\"card-block\">\r\n      <div class=\"card-header\">\r\n        <span class=\"pointer\" (click)=\"toggleMenu(light)\">\r\n          <div class=\"fa-stack fa-lg\">\r\n            <i class=\"fa fa-circle fa-stack-2x\"></i>\r\n            <i class=\"fa fa-lightbulb-o fa-stack-1x\" [style.color]=\"lightStyle(light.state)\"></i>\r\n          </div>\r\n\r\n          {{ light.name }} {{ light.id }}\r\n        </span>\r\n\r\n        <div class=\"float-right\" *ngIf=\"light.state.reachable\">\r\n          <i class=\"fa fa-2x fa-toggle-on\" (click)=\"toggleOn(light)\" [ngClass]=\"!light.state.on && 'fa-rotate-180'\"></i>\r\n        </div>\r\n      </div>\r\n\r\n      <div *ngIf=\"light.expanded == true\">\r\n        <div class=\"card-text\">\r\n          <button (click)=\"rename(light)\" class=\"btn btn-primary\">Rename</button> \r\n          <button (click)=\"delete(light)\" class=\"btn btn-danger\">Delete</button>\r\n        </div>\r\n        <div class=\"card-text\">\r\n          ID: {{ light.id }}\r\n        </div>\r\n      </div>\r\n\r\n      <div *ngIf=\"light.state.reachable\">\r\n        <div class=\"card-footer slider\">\r\n          <input max=\"254\" type=\"range\" [(ngModel)]=\"light.state.bri\" (ngModelChange)=\"changeBrightness(light, $event)\" [style.background]=\"lightStyle(light.state)\" />\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 240:
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let group of groups|keys\">\r\n  <div class=\"card\">\r\n    <div class=\"card-block\">\r\n      <div class=\"card-header\">\r\n        <span class=\"pointer\" (click)=\"toggleMenu(group.key)\">\r\n          <div class=\"fa-stack fa-lg\">\r\n            <i class=\"fa fa-circle fa-stack-2x\"></i>\r\n            <i class=\"fa fa-lightbulb-o fa-stack-1x\" [style.color]=\"lightStyle(group.value.action)\"></i>\r\n          </div>\r\n\r\n          {{ group.value.name }}\r\n        </span>\r\n\r\n        <div class=\"float-right\">\r\n          <i class=\"fa fa-2x fa-toggle-on\" (click)=\"toggleOn(group.key)\" [ngClass]=\"!group.value.action.on && 'fa-rotate-180'\"></i>\r\n        </div>\r\n      </div>\r\n\r\n      <div *ngIf=\"group.value.expanded == true\">\r\n        <div class=\"card-text\">\r\n          <button (click)=\"saveGroup(group.key)\" class=\"btn btn-success\">Save</button> \r\n          <button (click)=\"renameGroup(group.key)\" class=\"btn btn-primary\">Rename</button> \r\n          <button (click)=\"deleteGroup(group.key)\" class=\"btn btn-danger\">Delete</button>\r\n        </div>\r\n        <div class=\"card-text\">\r\n          <div *ngIf=\"group.value.type == 'Room'\">\r\n            <label>Room Type: </label>\r\n            <select [(ngModel)]=\"group.value.class\">\r\n              <option *ngFor=\"let c of classes\" [ngValue]=\"c\" >{{ c }}</option>\r\n            </select>\r\n          </div>\r\n          <p>Group Type: {{ group.value.type }}</p>\r\n        </div>\r\n        <div class=\"card-text\">\r\n          <div *ngFor=\"let light of lights|keys\">\r\n            <label>\r\n              <input type=\"checkbox\" \r\n                     [(ngModel)]=\"group.value.lights[light.key]\" \r\n                     (change)=\"$event.target.checked ? group.value.lights[light.key] = light.value : delete(group.value.lights, light.key)\" /> \r\n              {{ light.value.name }}\r\n            </label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"card-footer slider\">\r\n        <input max=\"254\" type=\"range\" [(ngModel)]=\"group.value.action.bri\" (ngModelChange)=\"changeBrightness(group.key, $event)\" [style.background]=\"lightStyle(group.value.action)\" />\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 241:
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let scene of scenes|keys\">\r\n  <h3>{{ scene.value.name }}</h3>\r\n  <div *ngFor=\"let s of scene.value|keys\">\r\n    {{ s.key }} : {{ s.value }}\r\n  </div>\r\n</div>"

/***/ }),

/***/ 242:
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let schedule of schedules\">\r\n  <h3>{{ schedule.value.name }}</h3>\r\n  id : {{ schedule.key }}\r\n  <div *ngFor=\"let item of schedule.value|keys\">\r\n    {{ item.key }} : {{ item.value }}\r\n  </div>\r\n</div>"

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(161);


/***/ }),

/***/ 88:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 88;


/***/ })

},[280]);
//# sourceMappingURL=main.bundle.map