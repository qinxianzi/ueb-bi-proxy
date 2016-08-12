assembler.define("base", [{
    name: "basestyles",
    src: "/js/base-styles.js"
},
{
    name: "pappbase",
    src: "/js/3p-appbase.js"
},
{
    name: "pangulartranslate",
    src: "/js/3p-angular-translate.js"
},
{
    name: "pcrypto",
    src: "/js/3p-crypto.js"
},
{
    name: "plocale",
    src: "/js/3p-locale.js"
}], function () {
    function int(num) {
        return parseInt(num, 10)
    }
    function jsonStringToDate(string) {
        var match;
        if (match = string.match(R_ISO8601_STR)) {
            var date = new Date(0),
                tzHour = 0,
                tzMin = 0,
                dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
                timeSetter = match[8] ? date.setUTCHours : date.setHours;
            match[9] && (tzHour = int(match[9] + match[10]), tzMin = int(match[9] + match[11])),
            dateSetter.call(date, int(match[1]), int(match[2]) - 1, int(match[3]));
            var h = int(match[4] || 0) - tzHour,
                m = int(match[5] || 0) - tzMin,
                s = int(match[6] || 0),
                ms = Math.round(1e3 * parseFloat("0." + (match[7] || 0)));
            return timeSetter.call(date, h, m, s, ms),
            date
        }
        return string
    }
    var mod = ModuleManager.create(window, "base", ["base-styles", "pascalprecht.translate", "tmh.dynamicLocale"], !1);
    mod.translation("en", {
        base: {
            errors: {
                webServerNotReachable: "无法连接到SiSense服务器, 请确认是否连接到网络.  如果网络连接正常，请联系管理员，可能是服务器出现问题.",
                unknown: "服务器异常.  这个异常不应该发生,  请重试, 或联系k3bi@kingdee.com提供支持."
            }
        }
    }),
    window.defined = function (root, path) {
        return "undefined" == typeof path || "null" === path || "" === path ? null !== root && "undefined" != typeof root : "undefined" != typeof $$get(root, path)
    },
    window.$$boolean = function (value, defaultValue) {
        return "boolean" == typeof value ? value : defined(value) ? 1 == value || "true" == value : defaultValue
    },
    window.$$get = function (root, path, defaultValue) {
        if (_.isString(root) && !defined(path) && (path = root, root = window), !defined(root)) return defaultValue;
        if (!defined(path) || "" === path) return root;
        "string" != typeof path && (path = path.toString());
        var i = 0,
            c = root;
        for (path = path.split("."); i < path.length; i++) if (!defined(c = c[path[i]])) return defaultValue;
        return c
    },
    window.$$set = function (root, path, value) {
        if (!defined(root)) return void 0;
        if (defined(path) && "" !== path && ("string" != typeof path && (path = path.toString()), path = path.split("."), 0 != path.length)) {
            for (var t, i = 0, l = path.length - 1, c = root; l > i; i++) defined(t = c[path[i]]) || (t = {}, c[path[i]] = t),
            c = t;
            return defined(c.$reg) ? c.$reg(path[l], value) : c[path[l]] = value,
            c
        }
    },
    window.$$delete = function (root, path) {
        if (_.isString(root) && !defined(path) && (path = root, root = window), !defined(root)) return defaultValue;
        if (!defined(path) || "" === path) return root;
        "string" != typeof path && (path = path.toString());
        var i = 0,
            c = root;
        for (path = path.split("."); i < path.length - 1; i++) if (!defined(c = c[path[i]])) return;
        delete c[path[path.length - 1]]
    },
    window.$$invoke = function (instance, path, fname, args) {
        var target = $$get(instance, path);
        if (defined(target) && defined(target[fname])) return "function" != typeof target[fname] ? target[fname] : target[fname](args)
    };
    !
    function () {
        defined(window.prism) || (window.prism = {});
        var prism = window.prism;
        prism.on = function (eventName, handler) {
            $$.validatestr(eventName, "Event name must be specified."),
            $$.validate(defined(handler) && "function" == typeof handler, "Event handler must be a function");
            var unregister, f = function () {
                defined(unregister) && unregister()
            };
            return defined(prism.$ngscope) ? (unregister = prism.$ngscope.$on(eventName, handler), f) : void setTimeout(function () {
                unregister = prism.on(eventName, handler)
            }, 0)
        }
    }(),
    defined(window.prism) || (window.prism = {}),
    window.prism.application = {},
    window.prism.factories = {},
    window.prism.services = {},
    window.prism.consts = {
        nullValue: "N\\A"
    },
    window.prism.run = function (f, self, args) {
        window.prism.$injector.invoke(f, self, args)
    },
    window.$$ = function () {
        var $$ = {};
        return $$.valueOrDefault = function (v, d) {
            return defined(v) ? v : d
        },
        $$.isPromise = function (o) {
            return defined(o, "then") && defined(o, "catch") && "function" == typeof o.then && "function" == typeof o["catch"]
        },
        $$.validate = function (v, msg) {
            if (v === !1) throw msg;
            if ("function" == typeof v && v() === !1) throw msg;
            if (!defined(v)) throw msg
        },
        $$.validatestr = function (v, msg) {
            if (!defined(v)) throw msg
        },
        $$.warn = function (o) {
            defined(console, "warn") && console.warn(o)
        },
        $$.error = function (o) {
            if (defined(console, "error")) {
                var pre = "";
                2 == arguments.length && (pre = arguments[0], o = arguments[1]),
                o instanceof Error && (o.stack ? o = o.message && -1 === o.stack.indexOf(o.message) ? "Error: " + o.message + "\n" + o.stack : o.stack : o.sourceURL && (o = o.message + "\n" + o.sourceURL + ":" + o.line)),
                console.error(pre + " - " + o)
            }
        },
        $$.log = function (o) {
            defined(console, "log") && console.log(o)
        },
        $$.map = function (o, keyMapper, valueMapper) {
            var result;
            if (_.isArray(o)) {
                var curr, i = 0,
                    l = o.length;
                if (_.isString(keyMapper)) if (result = {}, defined(valueMapper)) if (_.isFunction(valueMapper)) for (; l > i; i++) curr = o[i],
                result[curr[keyMapper]] = valueMapper(curr);
                else for (; l > i; i++) curr = o[i],
                result[curr[keyMapper]] = curr[valueMapper];
                else for (; l > i; i++) curr = o[i],
                result[curr[keyMapper]] = curr;
                if (_.isFunction(keyMapper)) if (result = {}, defined(valueMapper)) if (_.isFunction(valueMapper)) for (; l > i; i++) curr = o[i],
                result[keyMapper(curr)] = valueMapper(curr);
                else for (; l > i; i++) curr = o[i],
                result[keyMapper(curr)] = curr[valueMapper];
                else for (; l > i; i++) curr = o[i],
                result[keyMapper(curr)] = curr;
                else if (!defined(keyMapper)) if (result = [], defined(valueMapper)) if (_.isFunction(valueMapper)) for (; l > i; i++) result.push(valueMapper(o[i]));
                else for (; l > i; i++) result.push(o[i][valueMapper]);
                else for (; l > i; i++) result.push(o[i])
            } else if (_.isObject(o)) return this.map($$.object.toArray(o), keyMapper, valueMapper);
            return result
        },
        $$.debug = {
            log: DEBUG ?
            function () {
                defined(console, "log.apply") ? console.log.apply(console, arguments) : console.log(Array.prototype.slice.call(arguments, 0, arguments.length))
            } : function () {}
        },
        $$
    }(),
    window.$$.object = function (owner) {
        var o = {};
        return o.removeAttrs = function (obj, names, deep) {
            if (_.isFunction(names)) {
                var props = Object.getOwnPropertyNames(obj);
                props.forEach(function (prop) {
                    obj.hasOwnProperty(prop) && names(prop) && delete obj[prop]
                })
            } else {
                _.isString(names) && (names = [names]);
                for (var i = 0, l = names.length; l > i; i++) delete obj[names[i]]
            }
            deep && Object.getOwnPropertyNames(obj).forEach(function (prop) {
                if (obj.hasOwnProperty(prop)) {
                    var val = obj[prop];
                    (val && "object" == typeof val || Array.isArray(val)) && o.removeAttrs(val, names, deep)
                }
            })
        },
        o.attrs = function (obj, names) {
            if (defined(obj) && defined(names)) {
                for (var name, result = {}, i = 0; i < names.length; i++) name = names[i],
                result[name] = obj[name];
                return result
            }
        },
        o.deepFreeze = function (obj) {
            return Object.freeze(obj),
            Object.getOwnPropertyNames(obj).forEach(function (prop) {
                if (obj.hasOwnProperty(prop)) {
                    var val = obj[prop];
                    defined(val) && "object" == typeof val && "function" == typeof val && !Object.isFrozen(val) && o.deepFreeze(val)
                }
            }),
            obj
        },
        o.clone = function (o, deep) {
            return $.extend(deep, {}, o)
        },
        o.plain = function (source, predicate) {
            if (_.isArray(source)) {
                for (var v, result = [], i = 0; i < source.length; i++)(!predicate || predicate(i, v)) && (v = o.plain(source[i], predicate), defined(v) && result.push(v));
                return result
            }
            if (!_.isFunction(source)) {
                if (angular.isDate(source)) return source;
                if (_.isObject(source)) {
                    for (var p, v, result = {}, props = Object.getOwnPropertyNames(source), i = 0; i < props.length; i++) p = props[i],
                    Object.getOwnPropertyDescriptor(source, p).enumerable && (!predicate || predicate(p, v)) && (v = o.plain(source[p], predicate), defined(v) && (result[p] = v));
                    return result
                }
                return source
            }
        },
        o.override = function (source, target) {
            if (defined(target) || (target = {}), !defined(source)) return target;
            for (var p, props = Object.getOwnPropertyNames(source), i = 0; i < props.length; i++) p = props[i],
            target[p] = source[p];
            return target
        },
        o.copyNewer = function (source, target) {
            if (defined(target) || (target = {}), !defined(source)) return target;
            for (var p, props = Object.getOwnPropertyNames(source), i = 0; i < props.length; i++) p = props[i],
            defined(target[p]) || (target[p] = source[p]);
            return target
        },
        o.deepCopyNewer = function (source, target) {
            for (var p, props = Object.getOwnPropertyNames(source), i = 0; i < props.length; i++) p = props[i],
            defined(target[p]) ? _.isObject(source[p]) && o.deepCopyNewer(source[p], target[p]) : target[p] = source[p];
            return target
        },
        o.countAttrs = function (o) {
            if (defined(o.__count__)) return o.__count__;
            var p, c = 0;
            for (p in o) o.hasOwnProperty(p) && (c += 1);
            return c
        },
        o.first = function (o) {
            var p;
            for (p in o) if (o.hasOwnProperty(p)) return o[p]
        },
        o.toArray = function (o) {
            var result = [];
            return Object.getOwnPropertyNames(o).forEach(function (prop) {
                o.hasOwnProperty(prop) && result.push(o[prop])
            }),
            result
        },
        o.areEqual = function (x, y) {
            if (x === y) return !0;
            if (!(x instanceof Object && y instanceof Object)) return !1;
            if (x.constructor !== y.constructor) return !1;
            for (var p in x) if (x.hasOwnProperty(p)) {
                if (!y.hasOwnProperty(p)) return !1;
                if (x[p] !== y[p]) {
                    if ("object" != typeof x[p]) return !1;
                    if (!o.areEqual(x[p], y[p])) return !1
                }
            }
            for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return !1;
            return !0
        },
        o
    }(),


    function (owner) {
        if (defined(owner.url)) throw "url is already defined";
        var o = function () {};
        o.prototype.loginPage = "/account/login",
        o.prototype.getResourceType = function (url) {
            var extidxst = url.lastIndexOf(".");
            if (!(0 > extidxst || extidxst == url.length - 1)) return url.substring(extidxst + 1).toLowerCase()
        },
        o.prototype.encodeParams = function (o) {
            var name, value, result = [],
                first = !0;
            for (name in o) o.hasOwnProperty(name) && defined(value = o[name]) && (first || result.push("&"), result.push(name), result.push("="), "object" == typeof value && (value = JSON.stringify(value)), result.push(encodeURIComponent(value.toString())), first = !1);
            return result.join("")
        },
        o.prototype.decodeParams = function (query) {
            var result = {};
            if (!defined(query) || "" == query) return result;
            for (var pair, n, v, vars = query.split("&"), i = 0, l = vars.length; l > i; i++) pair = vars[i].split("="),
            pair.length < 2 || (n = decodeURIComponent(pair[0]), v = decodeURIComponent(pair[1]), (v.length > 0 && "{" === v[0] && "}" === v[v.length - 1] || "[" === v[0] && "]" === v[v.length - 1]) && (v = JSON.parse(v)), result[n] = v);
            return result
        },
        o.prototype.dashboard = function (id, relative, options) {
            defined(options) || (options = {}),
            options.d = id;
            var base = "";
            return relative === !1 && (base = ma.utilities.getCurrentDomain()),
            base.concat("/dashboard/?", this.encodeParams(options))
        },
        o.prototype.parseQueryString = function (s) {
            var result = {};
            if (!defined(s)) return result;
            for (var curr, lastchar, firstchar, regex = /([^&=]+)=?([^&]*)/g; curr = regex.exec(s);) {
                if (curr[2] = decodeURIComponent(curr[2]), curr[2].length > 0 && (firstchar = curr[2][0], lastchar = curr[2][curr[2].length - 1], "[" === firstchar && "]" === lastchar || "{" === firstchar && "}" === lastchar)) try {
                    curr[2] = JSON.parse(curr[2])
                } catch (ex) {
                    $$.error(ex)
                }
                result[decodeURIComponent(curr[1])] = curr[2]
            }
            return result
        },
        owner.url = new o
    }(window.$$),


    function (owner) {
        if (defined(owner.mouse)) throw "mouse is already defined";
        var mouse = function () {};
        mouse.prototype.isOver = function ($lmnt) {
            if (!defined($lmnt)) return !1;
            var lmnt;
            if ($lmnt instanceof jQuery ? lmnt = $lmnt.get(0) : (lmnt = $lmnt, $lmnt = $(lmnt)), $$ie8orless() || $.browser.opera) {
                for (var molmnts = $($lmnt.get(0).className + ":hover", $lmnt.parent()), i = 0, l = molmnts.length; l > i; i++) if (molmnts.get(0) === lmnt) return !0;
                return !1
            }
            return $lmnt.is(":hover")
        },
        owner.mouse = new mouse
    }(window.$$),


    function () {
        function setMouseXY(e) {
            var x = 0,
                y = 0;
            return x = e.pageX,
            y = e.pageY,
            x = Math.max(0, x),
            y = Math.max(0, y),
            document.mousePosition = {
                    x: x,
                    y: y
                },
            !0
        }
        document.onmousemove = setMouseXY
    }(),


    function (owner) {
        if (defined(owner.ajax)) throw "ajax is already defined";
        var o = function () {};
        o.prototype.sendRequest = function (r) {
            if (!defined(r.url) || "" == r.url) throw new prism.exception("url is a required attribute by ajax request");
            return defined(r.cache) || (r.cache = !1),
            $.ajax(r)
        },
        o.prototype._prepare = function (r) {
            return defined(r.OnSuccessCallback) && (r.success = r.OnSuccessCallback, delete r.OnSuccessCallback),
            defined(r.OnErrorCallback) && (r.error = r.OnErrorCallback, delete r.OnErrorCallback),
            defined(r.OnCompleteCallback) && (r.complete = r.OnCompleteCallback, delete r.OnCompleteCallback),
            defined(r.OnBeforeSendCallback) && (r.beforeSend = r.OnBeforeSendCallback, delete r.OnBeforeSendCallback),
            defined(r.OnBeforeSendCallback) && (r.beforeSend = r.OnBeforeSendCallback, delete r.OnBeforeSendCallback),
            defined(r.EndPoint) && (r.url = r.EndPoint, delete r.EndPoint),
            defined(r.Params) && (r.data = r.Params, delete r.Params),
            r
        },
        o.prototype.put = function (r) {
            return r.type = "PUT",
            r.contentType = "application/json; charset=utf-8",
            r.cache = !1,
            r.dataType = "json",
            this.sendRequest(this._prepare(r))
        },
        o.prototype.get = function (r) {
            return r.type = "GET",
            r.cache = !1,
            this.sendRequest(this._prepare(r))
        },
        o.prototype.post = function (r) {
            return r.type = "POST",
            r.contentType = "application/json; charset=utf-8",
            r.cache = !1,
            r.dataType = "json",
            this.sendRequest(this._prepare(r))
        },
        o.prototype.getJSON = function (r) {
            return r.type = "GET",
            r.contentType = "application/json; charset=utf-8",
            r.cache = !1,
            r.dataType = "json",
            this.sendRequest(this._prepare(r))
        },
        o.prototype.getHTML = function (r) {
            return r.type = "GET",
            r.cache = !1,
            r.dataType = "html",
            this.sendRequest(this._prepare(r))
        },
        o.prototype.authenticate = function (callback) {
            return $.getJSON("UsersService/isauthenticated", callback)
        },
        o.prototype.getViewUrl = function (viewName) {
            return "/" + prism.versionHash + "/views/" + viewName + ".ejs"
        },
        owner.ajax = new o
    }(window.$$),


    function (owner) {
        if (defined(owner, "class")) throw "class is already defined";
        var manifest = {},
            classmember = function (type, name, data) {
                this.type = type,
                this.name = name,
                this.data = data
            },
            classproperty = function (name, descriptor) {
                this.name = name,
                this.descriptor = descriptor
            };
        classmember.prototype.invoke = function (instance, args) {
                return _.isFunction(this.data) ? this.data.apply(instance, args) : this.data
            };
        var classtype = function (name, ctor) {
                function attachInstanceMember(member) {
                    this.getContructor().prototype[member.name] = member.data
                }
                function attachStaticMember(member) {
                    this.getContructor()[member.name] = member.data
                }
                function returnMyself() {
                    return me
                }
                function baseCall(name, args) {
                    if (!defined(_base)) throw "no base class defined for " + this.fullname;
                    return _base.invoke(this.__proto__, name, args)
                }
                function attachBaseConstructor() {
                    if (defined(_base)) {
                        defined(_usrctor) || this.ctor(default_ctor);
                        var basector = _base.getContructor();
                        _ctor.prototype = new basector({
                            __prototypeInitialization: !0
                        }),
                        _ctor.prototype.constructor = _ctor
                    }
                }
                function attachBase(baseName) {
                    _base = baseName,
                    attachBaseConstructor.call(this)
                }
                function attachCtorDIs(ctor, dis) {
                    defined(ctor) && defined(dis) && (ctor.$inject = dis)
                }
                function toString() {
                    return name
                }
                function attachInstanceProperties(o) {
                    for (var d, i = 0, l = _propsList.length; l > i; i++) {
                        "function" == typeof(d = _propsList[i].descriptor) && (d = d.call(o));
                        try {
                            Object.defineProperty(o, _propsList[i].name, d)
                        } catch (err) {
                            throw 'error setting up "' + _propsList[i].name + '" for "' + name + '": ' + err
                        }
                    }
                }
                var default_ctor = function () {};
                if (defined(manifest, name)) throw name + " already defined.";
                manifest[name] = this;
                var _base, _usrctor, _ctor, _ctordis, me = this,
                    _freezed = !1,
                    _sealed = !1,
                    _staticMemberList = [],
                    _staticMemberMap = {},
                    _instanceMemberList = [],
                    _instanceMemberMap = {},
                    _propsList = [],
                    _propsMap = {},
                    path = name.split(".");
                name.length;
                this.name = path[path.length - 1],
                this.fullname = name,
                this.getContructor = function () {
                        return _ctor
                    },
                this.$$setUserConstructor = function (userctor) {
                        defined(userctor) || (userctor = default_ctor),
                        userctor.prototype.base = baseCall,
                        userctor.prototype.getType = returnMyself,
                        userctor.prototype.toString = toString,
                        userctor.getType = returnMyself,
                        _usrctor = userctor,
                        _ctor = function () {
                            var args = arguments;
                            args.length > 0 && defined(args[0], "jsoninit") && ($.extend(!0, this, args[0].jsoninit), args = Array.prototype.slice.call(args, 1, args.length - 1));
                            var isExtending = defined(_base);
                            if (isExtending ? _base.getContructor().apply(this, args) : this.$$events = {}, defined(this, "instanceid") || Object.defineProperty(this, "instanceid", {
                                value: $$guid_fast(13),
                                enumerable: !0,
                                configurable: !0,
                                writable: !1
                            }), attachInstanceProperties(this), 1 !== args.length || $$get(args, "0.__prototypeInitialization") !== !0) {
                                var instance = _usrctor.apply(this, args);
                                return _freezed ? Object.freeze(instance) : _sealed && Object.seal(instance),
                                instance
                            }
                        },
                        _ctor.getType = returnMyself,
                        _ctor.Create = function () {
                            var args = arguments;
                            switch (args.length) {
                            case 0:
                                return new _ctor;
                            case 1:
                                return new _ctor(args[0]);
                            case 2:
                                return new _ctor(args[0], args[1]);
                            case 3:
                                return new _ctor(args[0], args[1], args[2]);
                            case 4:
                                return new _ctor(args[0], args[1], args[2], args[3]);
                            case 5:
                                return new _ctor(args[0], args[1], args[2], args[3], args[4]);
                            case 6:
                                return new _ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                            case 7:
                                return new _ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                            case 8:
                                return new _ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
                            case 9:
                                return new _ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
                            case 10:
                                return new _ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
                            }
                            throw 'Error creating "' + name + '"'
                        },
                        _ctor.CreateFrom = function (json, args) {
                            _.isString(json) && (json = JSON.parse(json)),
                            defined(args) || (args = []),
                            args.splice(0, 0, {
                                jsoninit: json
                            });
                            var instance = _ctor.Create.apply(this, args);
                            return instance
                        },
                        _ctor.prototype["static"] = _ctor,
                        _ctor.prototype.event = function (evnt, before, after) {
                            return this.$$events[evnt] = {
                                name: evnt,
                                before: before,
                                after: after,
                                handlers: []
                            },
                            this
                        },
                        _ctor.prototype.$$eventHandlers = function (evnt) {
                            return $$get(this, "$$events." + evnt + ".handlers") || []
                        },
                        _ctor.prototype.on = function (evnt, callback) {
                            var eventdef = $$get(this.$$events[evnt]);
                            if (!defined(eventdef)) throw "the " + evnt + " event is undefined";
                            return eventdef.handlers.push(callback),
                            this
                        },
                        _ctor.prototype.off = function (evnt, callback) {
                            var eventdef = $$get(this.$$events[evnt]);
                            if (!defined(eventdef)) throw "the " + evnt + " event is undefined";
                            var index = eventdef.handlers.indexOf(callback);
                            if (!(0 > index)) return eventdef.handlers.splice(index, 1),
                            this
                        },
                        _ctor.prototype.trigger = function (evnt, args) {
                            var result = args,
                                eventdef = $$get(this.$$events[evnt]);
                            if (!defined(eventdef)) throw "the " + evnt + " event is undefined";
                            if (defined(eventdef.before)) try {
                                    result = eventdef.before(this, args) || result
                                } catch (exception) {
                                    $$.error(exception)
                                }
                            try {
                                    var f = $$get(this, "beforeEvent");
                                    defined(f) && (result |= f.call(evnt, this, args) || result)
                                } catch (exception) {
                                    $$.error(exception)
                                }
                            var handlers = eventdef.handlers.slice(0, eventdef.handlers.length);
                            if (handlers.forEach(function (handler) {
                                    try {
                                        result = handler(this, args) || result
                                    } catch (exception) {
                                        $$.error(exception)
                                    }
                                }, this), defined(eventdef.after)) try {
                                    result = eventdef.after(this, args) || result
                                } catch (exception) {
                                    $$.error(exception)
                                }
                            try {
                                    var f = $$get(this, "afterEvent");
                                    defined(f) && (result |= f.call(this, evnt, this, args) || result)
                                } catch (exception) {
                                    $$.error(exception)
                                }
                            return result
                        };
                        for (var i, l = _instanceMemberList.length; l > i; i++) attachInstanceMember.call(this, _instanceMemberList[i]);
                        for (i = 0, l = _staticMemberList.length; l > i; i++) attachStaticMember.call(this, _staticMemberList[i]);
                        return attachCtorDIs.call(this, _ctor, _ctordis),
                        attachBaseConstructor.call(this),
                        this
                    },
                this.$$freeze = function () {
                        _freezed = !0
                    },
                this.$$seal = function () {
                        _sealed = !0
                    },
                this.$$setDI = function (dis) {
                        defined(dis) && (_ctordis = dis, attachCtorDIs.call(this, _ctor, dis))
                    },
                this.$$setDI = function (dis) {
                        defined(dis) && (_ctordis = dis, attachCtorDIs.call(this, _ctor, dis))
                    },
                this.$$setBaseClass = function (type) {
                        attachBase.call(this, type)
                    },
                this.getBaseClass = function () {
                        return _base
                    },
                this.hasBaseClass = function () {
                        return defined(_base)
                    },
                this.setMember = function (membername, data) {
                        if (defined(_instanceMemberMap[membername])) throw membername + " already defiend for " + this.fullname;
                        var member = new classmember(this, membername, data);
                        _instanceMemberMap[membername] = member,
                        _instanceMemberList.push(member),
                        defined(_usrctor) && attachInstanceMember.call(this, member)
                    },
                this.setProperty = function (name, descriptor) {
                        if (!defined(name)) throw "property name not specified";
                        if (defined(_propsMap[name])) throw name + " already defiend for " + this.fullname;
                        var p = new classproperty(name, descriptor);
                        _propsList.push(p),
                        _propsMap[name] = p
                    },
                this.setStaticMember = function (membername, data) {
                        if (defined(_staticMemberMap[membername])) throw membername + " already defiend for " + this.fullname;
                        var member = new classmember(this, membername, data);
                        _staticMemberMap[membername] = member,
                        _staticMemberList.push(member),
                        defined(_usrctor) || this.$$setUserConstructor(),
                        attachStaticMember.call(this, member)
                    },
                this.invoke = function (instance, name, args) {
                        var member;
                        if (defined(instance) ? (member = _instanceMemberMap[name], !defined(member) && defined(member = instance[name]) && (member = new classmember(this, name, member))) : member = _staticMemberMap[name], !defined(member)) {
                            if (!defined(_base)) throw name + " not found for " + this.fullname;
                            return _base.invoke(instance, name, args)
                        }
                        return member.invoke(instance, args)
                    },
                this.$$setUserConstructor(ctor)
            };
        classtype.prototype.attach = function (context, name) {
                return defined(context) || (context = window),
                defined(name) || (name = this.fullname),
                $$set(context, name, this.getContructor()),
                this
            },
        classtype.prototype["extends"] = function (base) {
                var btype = base;
                if (_.isString(base) && (btype = $$get(window, base)), !defined(btype)) throw base + " is undefined";
                return this.$$setBaseClass(btype.getType()),
                this
            },
        classtype.prototype["static"] = function () {
                if (1 == arguments.length && _.isObject(arguments[0])) {
                    var name, members = arguments[0];
                    for (name in members) members.hasOwnProperty(name) && this.setStaticMember(name, members[name])
                }
                return this
            },
        classtype.prototype.instance = function () {
                if (1 == arguments.length && _.isObject(arguments[0])) {
                    var name, members = arguments[0];
                    for (name in members) members.hasOwnProperty(name) && this.setMember(name, members[name])
                }
                return this
            },
        classtype.prototype.$inject = function () {
                return this.$$setDI(1 == arguments.length && _.isArray(arguments[0]) ? arguments[0] : arguments),
                this
            },
        classtype.prototype.properties = function () {
                if (1 == arguments.length && _.isObject(arguments[0])) if (defined(arguments[0].name)) this.setProperty(arguments[0].name, arguments[0]);
                else {
                    var name, properties = arguments[0];
                    for (name in properties) properties.hasOwnProperty(name) && this.setProperty(name, properties[name])
                } else if (1 == arguments.length && _.isArray(arguments[0])) for (var i = 0, l = arguments[0].length; l > i; i++) this.setProperty(arguments[0][i].name, arguments[0][i]);
                else if (2 == arguments.length && _.isString(arguments[0]) && _.isObject(arguments[1])) this.property(arguments[0], arguments[1]);
                else for (var i = 0, l = arguments.length; l > i; i++) this.setProperty(argument[i].name, arguments[i]);
                return this
            },
        classtype.prototype.ctor = function (ctor) {
                return this.$$setUserConstructor(ctor),
                this
            },
        classtype.prototype.seal = function (ctor) {
                return this.$$seal(),
                this
            },
        classtype.prototype.freeze = function (ctor) {
                return this.$$freeze(),
                this
            };
        var c = function () {},
            c = function () {
                var name, ctor;
                2 == arguments.length && _.isString(arguments[0]) && _.isFunction(arguments[1]) ? (name = arguments[0], ctor = arguments[1]) : 1 == arguments.length && _.isString(arguments[0]) && (name = arguments[0]);
                var def = new classtype(name);
                return defined(ctor) && def.init(ctor),
                def
            };
        c.get = function (typename) {
                return manifest[typename]
            },
        owner["class"] = c
    }(window.$$),


    function (owner) {
        if (defined(owner.array)) throw "array is already defined";
        var a = function () {};
        a.prototype.all = function (array, predicate) {
            for (var i = 0; i < array.length; i++) if (!predicate(array[i])) return !1;
            return !0
        },
        a.prototype.observe = function (array, addHandler, removeHandler) {
            var add = function (items) {
                return Array.prototype.forEach.call(items, function (item) {
                    addHandler(item)
                }),
                items
            },
                remove = function (items) {
                    return Array.prototype.forEach.call(items, function (item) {
                        removeHandler(item)
                    }),
                    items
                };
            return array.push = function () {
                    Array.prototype.push.apply(this, add(arguments))
                },
            array.pop = function () {
                    removeHandler(Array.prototype.pop.call(this))
                },
            array.shift = function () {
                    removeHandler(Array.prototype.shift.call(this))
                },
            array.unshift = function () {
                    Array.prototype.unshift.apply(this, add(arguments))
                },
            array.slice = function () {
                    remove(Array.prototype.slice.apply(this, arguments))
                },
            array.splice = function () {
                    arguments.length > 2 && add(Array.prototype.slice.call(arguments, 2, arguments.length)),
                    remove(Array.prototype.splice.apply(this, arguments))
                },
            add(array),
            array
        },
        owner.array = new a
    }(window.$$),


    function (owner) {
        if (defined(owner.eventbus)) throw "eventbus is already defined";
        var bus = function () {};
        bus.prototype.on = function (evnt, callback, context) {
            return context && defined(context.on) && "function" == typeof context.on ? void context.on(event, callback) : void 0
        },
        bus.prototype.off = function (evnt, callback, context) {
            return context && defined(context.off) && "function" == typeof context.off ? void context.off(event, callback) : void 0
        },
        bus.prototype.release = function (context) {
            context && defined(context, "instanceid")
        },
        bus.prototype.trigger = function (evnt, args, context) {
            return context && defined(context.trigger) && "function" == typeof context.trigger ? void context.trigger(event, args) : void 0
        },
        owner.eventbus = new bus
    }(window.$$),


    function (owner) {
        function mockEvent() {}
        if (defined(owner.event)) throw "eventbus is already defined";
        var obj = function () {};
        mockEvent.prototype.preventDefault = function () {
            console.error("mockEvent.preventDefault was called - meaning no event was available to $$.event.stop! Please fix this.")
        },
        obj.prototype.stop = function (ev) {
            ev || console.log("**** stop called without passing an event - bad practice!!! ****");
            var eventToStop = ev || window.event || new mockEvent,
                ieFlag = !0;
            eventToStop.preventDefault && (eventToStop.preventDefault(), ieFlag = !1),
            eventToStop.stopPropagation && (eventToStop.stopPropagation(), ieFlag = !1),
            ieFlag && ev && (ev.cancelBubble = !0, ev.returnValue = !1)
        },
        obj.prototype.isCtrlOrCmdKey = function (ev) {
            var cmdCodes = [224, 17, 91, 93];
            return ev.ctrlKey || ev.metaKey || ev.keyCode && _.contains(cmdCodes, ev.keyCode)
        },
        owner.event = new obj
    }(window.$$),
    Array.prototype.reverse = function (index, count) {
        if (defined(index) || (index = 0), defined(count) || (count = this.length - index), 2 > count) return this;
        for (var t, left, right, i = 0, l = Math.floor(count / 2), endidx = index + count - 1; l > i; i++) left = i + index,
        right = endidx - i,
        t = this[left],
        this[left] = this[right],
        this[right] = t;
        return this
    },
    Array.prototype.remove = function (item) {
        var index = this.indexOf(item);
        0 > index || this.splice(index, 1)
    },
    Array.prototype.distinct = function () {
        for (var c, map = {}, list = [], i = 0; i < this.length; i++) c = this[i],
        map[c] || (map[c] = !0, list.push(c));
        return list
    },
    Array.prototype.call = function (func, args) {
        for (var i = 0, l = this.length; l > i; i++) this[i][func](args)
    },
    Array.prototype.copyTo = function (target, startIndex, endIndex) {
        startIndex = startIndex || 0,
        (!defined(endIndex) || -1 > endIndex) && (endIndex = this.length - 1),
        endIndex = Math.min(endIndex, this.length - 1);
        for (var i = startIndex; endIndex >= i; i++) target.push(this[i])
    },
    Array.prototype.repeat = function (f, times) {
        for (var i = 0, l = this.length; l > i; i++) this.push(f());
        return this
    },
    Array.prototype.any = function (f) {
        for (var i = 0; i < this.length; i++) if (f(this[i])) return !0;
        return !1
    },
    Array.prototype.first = function (f) {
        if (1 === arguments.length && _.isFunction(arguments[0])) {
            for (var f = arguments[0], i = 0; i < this.length; i++) if (f(this[i])) return this[i]
        } else if (2 === arguments.length) {
            for (var k = arguments[0], v = arguments[1], i = 0; i < this.length; i++) if (this[i][k] === v) return this[i]
        } else if (this.length > 0) return this[0]
    },
    Array.prototype.swap = function (x, y) {
        var b = this[x];
        return this[x] = this[y],
        this[y] = b,
        this
    },
    Date.prototype.isValid = function () {
        return isFinite(this)
    };
    var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return Date.parseDate = Date.prototype.parseDate = function (input) {
        var stringdate = input;
        if ("string" != typeof stringdate) return input;
        var msidx = stringdate.indexOf(".");
        if (msidx > 0 && (stringdate = stringdate.substring(0, msidx)), /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(stringdate)) var o = moment(jsonStringToDate(input));
        else var o = moment(input);
        return o.isValid() ? o.toDate() : input
    },
    Date.prototype.toECString = function () {
        var month = ("00" + (this.getMonth() + 1)).slice(-2),
            day = ("00" + this.getDate()).slice(-2);
        return "{0}-{1}-{2}T00:00:00".format(this.getFullYear(), month, day)
    },
    Date.prototype.toISOString = Date.prototype.toECString,
    Date.prototype.parseDateGMT = function (stringdate) {
        var msidx = stringdate.indexOf(".");
        return msidx > 0 && (stringdate = stringdate.substring(0, msidx)),
        Date.parseExact(stringdate, "yyyy-MM-ddTHH:mm:ss")
    },


    function (owner) {
        function FormatJSON(oData, sIndent) {
            if (arguments.length < 2) var sIndent = "";
            var sIndentStyle = "    ",
                sDataType = RealTypeOf(oData);
            if ("array" == sDataType) {
                    if (0 == oData.length) return "[]";
                    var sHTML = "["
                } else {
                    var iCount = 0;
                    if ($.each(oData, function () {
                        iCount++
                    }), 0 == iCount) return "{}";
                    var sHTML = "{"
                }
            var iCount = 0;
            return $.each(oData, function (sKey, vValue) {
                    switch (iCount > 0 && (sHTML += ","), sHTML += "array" == sDataType ? "\n" + sIndent + sIndentStyle : "\n" + sIndent + sIndentStyle + '"' + sKey + '": ', RealTypeOf(vValue)) {
                    case "array":
                    case "object":
                        sHTML += FormatJSON(vValue, sIndent + sIndentStyle);
                        break;
                    case "boolean":
                    case "number":
                        sHTML += vValue.toString();
                        break;
                    case "null":
                        sHTML += "null";
                        break;
                    case "string":
                        sHTML += '"' + vValue + '"';
                        break;
                    default:
                        sHTML += "TYPEOF: " + typeof vValue
                    }
                    iCount++
                }),
            sHTML += "array" == sDataType ? "\n" + sIndent + "]" : "\n" + sIndent + "}"
        }
        owner.JSON || (owner.JSON = {});
        var RealTypeOf = function (v) {
            return "object" == typeof v ? null === v ? "null" : v.constructor == (new Array).constructor ? "array" : v.constructor == (new Date).constructor ? "date" : v.constructor == (new RegExp).constructor ? "regex" : "object" : typeof v
        };
        owner.JSON.format = FormatJSON
    }(window),
    String.prototype.capitalize = function () {
        return this.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase()
        })
    },
    String.prototype.splice = function (idx, rem, s) {
        return this.slice(0, idx) + s + this.slice(idx + Math.abs(rem))
    },
    String.prototype.format = function () {
        for (var i = 0, string = "function" != typeof this || i++ ? this : arguments[0]; i < arguments.length; i++) string = string.replace(RegExp("\\{" + i + "\\}", "g"), arguments[i]);
        return string
    },
    String.prototype.startsWith = function (str) {
        return 0 == this.indexOf(str)
    },
    String.prototype.equalsIgnoreCase = function (s) {
        return defined(s) && this.toLowerCase() === s.toLowerCase()
    },
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    },
    String.prototype.replaceSpaces = function () {
        return this.replace(/ /g, "_")
    },
    String.prototype.restoreSpaces = function () {
        return this.replace(/_/g, " ")
    },
    String.prototype.removeCommas = function () {
        return this.replace(/,/g, "")
    },
    String.prototype.hasSubstring = function (substring) {
        return -1 !== this.indexOf(substring)
    },
    _.intersectionObjects = function (array) {
        var slice = Array.prototype.slice,
            rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function (item) {
                return _.every(rest, function (other) {
                    return _.any(other, function (element) {
                        return _.isEqual(element, item)
                    })
                })
            })
    },
    _.differenceObjects = function (array) {
        var slice = Array.prototype.slice,
            flatten = function (input, shallow, strict, output) {
                var concat = Array.prototype.concat;
                if (shallow && _.every(input, _.isArray)) return concat.apply(output, input);
                for (var i = 0, length = input.length; length > i; i++) {
                    var value = input[i];
                    _.isArray(value) || _.isArguments(value) ? shallow ? push.apply(output, value) : flatten(value, shallow, strict, output) : strict || output.push(value)
                }
                return output
            },
            rest = flatten(slice.call(arguments, 1), !0, !0, []);
        return _.filter(array, function (value) {
                return !_.any(rest, function (element) {
                    return _.isEqual(element, value)
                })
            })
    },
    _.unionObjects = function (a1, a2) {
        var same = _.intersectionObjects(a1, a2),
            d1 = _.differenceObjects(a1, a2),
            d2 = _.differenceObjects(a2, a1);
        return [].concat(same, d1, d2)
    },
    _.findKey = function (collection, iterator) {
        var i, idx = -1,
            keys = Object.keys(collection);
        for (i = 0; i < keys.length && -1 == idx; i++) {
                var k = keys[i];
                iterator(collection[k]) && (idx = k)
            }
        return idx
    },
    $$["class"]("Color").ctor(function (color_string) {
        if (3 === arguments.length) return this.a = 1,
        this.r = arguments[0],
        this.g = arguments[1],
        this.b = arguments[2],
        void(this.ok = !0);
        if (4 === arguments.length) return this.a = arguments[0],
        this.r = arguments[1],
        this.g = arguments[2],
        this.b = arguments[3],
        void(this.ok = !0);
        if (!defined(color_string) || "" === color_string || "transparent" == color_string.toString().toLowerCase()) return this.a = 0,
        this.r = 255,
        this.g = 255,
        this.b = 255,
        this.ok = !0,
        void(this.isTransparent = !0);
        this.ok = !1,
        "white" == color_string.toString().toLowerCase() && (color_string = "#ffffff"),
        "#" == color_string.charAt(0) && (color_string = color_string.substr(1, 6)),
        color_string = color_string.replace(/ /g, ""),
        color_string = color_string.toLowerCase();
        for (var re, bits, i = 0, l = this.color_defs.length; l > i; i++) if (re = this.color_defs[i].re, bits = re.exec(color_string)) {
            var channels = this.color_defs[i].process(bits);
            this.r = channels[0],
            this.g = channels[1],
            this.b = channels[2],
            this.a = channels[3],
            this.ok = !0
        }
        this.a = this.a < 0 || isNaN(this.a) || this.a > 1 ? 1 : this.a,
        this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r,
        this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g,
        this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b,
        this.isTransparent = "" == color_string
    })["static"]({
        transparent: "transparent"
    }).instance({
        color_defs: [{
            re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{0,1}?(\.?\d{0,3}?))\)$/,
            example: ["rgba(123, 234, 45, 1)", "rgb(255,234,245, 1)"],
            process: function (bits) {
                return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), parseFloat(bits[4])];
            }
        },
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
            process: function (bits) {
                return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), 1]
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ["#00ff00", "336699"],
            process: function (bits) {
                return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16), 1]
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ["#fb0", "f0f"],
            process: function (bits) {
                return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16), 1]
            }
        }],
        toBrowserSupported: function (transparentFallbackValue) {
            return 1 === this.a ? this.toHex() : $$ie8orless() ? 0 == this.a ? transparentFallbackValue : this.toHex() : this.toRGBA()
        },
        toRGB: function () {
            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
        },
        toRGBA: function () {
            return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")"
        },
        toHex: function () {
            var r = this.r.toString(16),
                g = this.g.toString(16),
                b = this.b.toString(16);
            return 1 == r.length && (r = "0" + r),
            1 == g.length && (g = "0" + g),
            1 == b.length && (b = "0" + b),
            "#" + r + g + b
        },
        isdark: function () {
            return (this.r + this.g + this.b) / 3 < 150
        },
        isBrightColor: function () {
            var threshold = 70;
            return this.toHSL().l > threshold
        },
        toHSL: function () {
            var r1 = this.r / 255,
                g1 = this.g / 255,
                b1 = this.b / 255,
                maxColor = Math.max(r1, g1, b1),
                minColor = Math.min(r1, g1, b1),
                L = (maxColor + minColor) / 2,
                S = 0,
                H = 0;
            return maxColor != minColor && (S = .5 > L ? (maxColor - minColor) / (maxColor + minColor) : (maxColor - minColor) / (2 - maxColor - minColor), H = r1 == maxColor ? (g1 - b1) / (maxColor - minColor) : g1 == maxColor ? 2 + (b1 - r1) / (maxColor - minColor) : 4 + (r1 - g1) / (maxColor - minColor)),
            L = 100 * L,
            S = 100 * S,
            H = 60 * H,
            0 > H && (H += 360),
            {
                    h: H,
                    s: S,
                    l: L
                }
        },
        toHSV: function () {
            var var_R = this.r / 255,
                var_G = this.g / 255,
                var_B = this.b / 255,
                var_Min = Math.min(var_R, var_G, var_B),
                var_Max = Math.max(var_R, var_G, var_B),
                del_Max = var_Max - var_Min,
                V = var_Max,
                H = 0,
                S = 0;
            if (0 == del_Max);
            else {
                    S = del_Max / var_Max;
                    var del_R = ((var_Max - var_R) / 6 + del_Max / 2) / del_Max,
                        del_G = ((var_Max - var_G) / 6 + del_Max / 2) / del_Max,
                        del_B = ((var_Max - var_B) / 6 + del_Max / 2) / del_Max;
                    var_R == var_Max ? H = del_B - del_G : var_G == var_Max ? H = 1 / 3 + del_R - del_B : var_B == var_Max && (H = 2 / 3 + del_G - del_R),
                    0 > H && (H += 1),
                    H > 1 && (H -= 1)
                }
            return {
                    h: H,
                    s: S,
                    v: V
                }
        },
        setAlpha: function (a) {
            return this.a = a,
            this
        },
        setHSV: function (hsv) {
            var R = 0,
                G = 0,
                B = 0;
            if (0 == hsv.s) R = 255 * hsv.v,
            G = 255 * hsv.v,
            B = 255 * hsv.v;
            else {
                    var var_r = 0,
                        var_g = 0,
                        var_b = 0,
                        var_h = 6 * hsv.h;
                    6 == var_h && (var_h = 0);
                    var var_i = Math.floor(var_h),
                        var_1 = hsv.v * (1 - hsv.s),
                        var_2 = hsv.v * (1 - hsv.s * (var_h - var_i)),
                        var_3 = hsv.v * (1 - hsv.s * (1 - (var_h - var_i)));
                    0 == var_i ? (var_r = hsv.v, var_g = var_3, var_b = var_1) : 1 == var_i ? (var_r = var_2, var_g = hsv.v, var_b = var_1) : 2 == var_i ? (var_r = var_1, var_g = hsv.v, var_b = var_3) : 3 == var_i ? (var_r = var_1, var_g = var_2, var_b = hsv.v) : 4 == var_i ? (var_r = var_3, var_g = var_1, var_b = hsv.v) : (var_r = hsv.v, var_g = var_1, var_b = var_2),
                    R = 255 * var_r,
                    G = 255 * var_g,
                    B = 255 * var_b
                }
            return this.r = Math.round(R),
            this.g = Math.round(G),
            this.b = Math.round(B),
            this
        },
        scaleBrightness: function (percent) {
            var hsv = this.toHSV(),
                newv = 0 === hsv.v ? percent : hsv.v + hsv.v * percent,
                news = hsv.s;
            return newv > 1 && (news -= (newv - 1) / 1.677),
            hsv.s = Math.max(0, Math.min(1, news)),
            hsv.v = Math.max(0, Math.min(1, newv)),
            this.setHSV(hsv)
        },
        gray: function () {
            var v = Math.round(.2126 * this.r + .7152 * this.g + .0722 * this.b);
            return this.r = v,
            this.g = v,
            this.b = v,
            this
        }
    }).attach(window),
    HTMLEncoder = {
        EncodeType: "entity",
        isEmpty: function (val) {
            return val ? null === val || 0 == val.length || /^\s+$/.test(val) : !0
        },
        arr1: ["&nbsp;", "&iexcl;", "&cent;", "&pound;", "&curren;", "&yen;", "&brvbar;", "&sect;", "&uml;", "&copy;", "&ordf;", "&laquo;", "&not;", "&shy;", "&reg;", "&macr;", "&deg;", "&plusmn;", "&sup2;", "&sup3;", "&acute;", "&micro;", "&para;", "&middot;", "&cedil;", "&sup1;", "&ordm;", "&raquo;", "&frac14;", "&frac12;", "&frac34;", "&iquest;", "&Agrave;", "&Aacute;", "&Acirc;", "&Atilde;", "&Auml;", "&Aring;", "&AElig;", "&Ccedil;", "&Egrave;", "&Eacute;", "&Ecirc;", "&Euml;", "&Igrave;", "&Iacute;", "&Icirc;", "&Iuml;", "&ETH;", "&Ntilde;", "&Ograve;", "&Oacute;", "&Ocirc;", "&Otilde;", "&Ouml;", "&times;", "&Oslash;", "&Ugrave;", "&Uacute;", "&Ucirc;", "&Uuml;", "&Yacute;", "&THORN;", "&szlig;", "&agrave;", "&aacute;", "&acirc;", "&atilde;", "&auml;", "&aring;", "&aelig;", "&ccedil;", "&egrave;", "&eacute;", "&ecirc;", "&euml;", "&igrave;", "&iacute;", "&icirc;", "&iuml;", "&eth;", "&ntilde;", "&ograve;", "&oacute;", "&ocirc;", "&otilde;", "&ouml;", "&divide;", "&oslash;", "&ugrave;", "&uacute;", "&ucirc;", "&uuml;", "&yacute;", "&thorn;", "&yuml;", "&quot;", "&amp;", "&lt;", "&gt;", "&OElig;", "&oelig;", "&Scaron;", "&scaron;", "&Yuml;", "&circ;", "&tilde;", "&ensp;", "&emsp;", "&thinsp;", "&zwnj;", "&zwj;", "&lrm;", "&rlm;", "&ndash;", "&mdash;", "&lsquo;", "&rsquo;", "&sbquo;", "&ldquo;", "&rdquo;", "&bdquo;", "&dagger;", "&Dagger;", "&permil;", "&lsaquo;", "&rsaquo;", "&euro;", "&fnof;", "&Alpha;", "&Beta;", "&Gamma;", "&Delta;", "&Epsilon;", "&Zeta;", "&Eta;", "&Theta;", "&Iota;", "&Kappa;", "&Lambda;", "&Mu;", "&Nu;", "&Xi;", "&Omicron;", "&Pi;", "&Rho;", "&Sigma;", "&Tau;", "&Upsilon;", "&Phi;", "&Chi;", "&Psi;", "&Omega;", "&alpha;", "&beta;", "&gamma;", "&delta;", "&epsilon;", "&zeta;", "&eta;", "&theta;", "&iota;", "&kappa;", "&lambda;", "&mu;", "&nu;", "&xi;", "&omicron;", "&pi;", "&rho;", "&sigmaf;", "&sigma;", "&tau;", "&upsilon;", "&phi;", "&chi;", "&psi;", "&omega;", "&thetasym;", "&upsih;", "&piv;", "&bull;", "&hellip;", "&prime;", "&Prime;", "&oline;", "&frasl;", "&weierp;", "&image;", "&real;", "&trade;", "&alefsym;", "&larr;", "&uarr;", "&rarr;", "&darr;", "&harr;", "&crarr;", "&lArr;", "&uArr;", "&rArr;", "&dArr;", "&hArr;", "&forall;", "&part;", "&exist;", "&empty;", "&nabla;", "&isin;", "&notin;", "&ni;", "&prod;", "&sum;", "&minus;", "&lowast;", "&radic;", "&prop;", "&infin;", "&ang;", "&and;", "&or;", "&cap;", "&cup;", "&int;", "&there4;", "&sim;", "&cong;", "&asymp;", "&ne;", "&equiv;", "&le;", "&ge;", "&sub;", "&sup;", "&nsub;", "&sube;", "&supe;", "&oplus;", "&otimes;", "&perp;", "&sdot;", "&lceil;", "&rceil;", "&lfloor;", "&rfloor;", "&lang;", "&rang;", "&loz;", "&spades;", "&clubs;", "&hearts;", "&diams;"],
        arr2: ["&#160;", "&#161;", "&#162;", "&#163;", "&#164;", "&#165;", "&#166;", "&#167;", "&#168;", "&#169;", "&#170;", "&#171;", "&#172;", "&#173;", "&#174;", "&#175;", "&#176;", "&#177;", "&#178;", "&#179;", "&#180;", "&#181;", "&#182;", "&#183;", "&#184;", "&#185;", "&#186;", "&#187;", "&#188;", "&#189;", "&#190;", "&#191;", "&#192;", "&#193;", "&#194;", "&#195;", "&#196;", "&#197;", "&#198;", "&#199;", "&#200;", "&#201;", "&#202;", "&#203;", "&#204;", "&#205;", "&#206;", "&#207;", "&#208;", "&#209;", "&#210;", "&#211;", "&#212;", "&#213;", "&#214;", "&#215;", "&#216;", "&#217;", "&#218;", "&#219;", "&#220;", "&#221;", "&#222;", "&#223;", "&#224;", "&#225;", "&#226;", "&#227;", "&#228;", "&#229;", "&#230;", "&#231;", "&#232;", "&#233;", "&#234;", "&#235;", "&#236;", "&#237;", "&#238;", "&#239;", "&#240;", "&#241;", "&#242;", "&#243;", "&#244;", "&#245;", "&#246;", "&#247;", "&#248;", "&#249;", "&#250;", "&#251;", "&#252;", "&#253;", "&#254;", "&#255;", "&#34;", "&#38;", "&#60;", "&#62;", "&#338;", "&#339;", "&#352;", "&#353;", "&#376;", "&#710;", "&#732;", "&#8194;", "&#8195;", "&#8201;", "&#8204;", "&#8205;", "&#8206;", "&#8207;", "&#8211;", "&#8212;", "&#8216;", "&#8217;", "&#8218;", "&#8220;", "&#8221;", "&#8222;", "&#8224;", "&#8225;", "&#8240;", "&#8249;", "&#8250;", "&#8364;", "&#402;", "&#913;", "&#914;", "&#915;", "&#916;", "&#917;", "&#918;", "&#919;", "&#920;", "&#921;", "&#922;", "&#923;", "&#924;", "&#925;", "&#926;", "&#927;", "&#928;", "&#929;", "&#931;", "&#932;", "&#933;", "&#934;", "&#935;", "&#936;", "&#937;", "&#945;", "&#946;", "&#947;", "&#948;", "&#949;", "&#950;", "&#951;", "&#952;", "&#953;", "&#954;", "&#955;", "&#956;", "&#957;", "&#958;", "&#959;", "&#960;", "&#961;", "&#962;", "&#963;", "&#964;", "&#965;", "&#966;", "&#967;", "&#968;", "&#969;", "&#977;", "&#978;", "&#982;", "&#8226;", "&#8230;", "&#8242;", "&#8243;", "&#8254;", "&#8260;", "&#8472;", "&#8465;", "&#8476;", "&#8482;", "&#8501;", "&#8592;", "&#8593;", "&#8594;", "&#8595;", "&#8596;", "&#8629;", "&#8656;", "&#8657;", "&#8658;", "&#8659;", "&#8660;", "&#8704;", "&#8706;", "&#8707;", "&#8709;", "&#8711;", "&#8712;", "&#8713;", "&#8715;", "&#8719;", "&#8721;", "&#8722;", "&#8727;", "&#8730;", "&#8733;", "&#8734;", "&#8736;", "&#8743;", "&#8744;", "&#8745;", "&#8746;", "&#8747;", "&#8756;", "&#8764;", "&#8773;", "&#8776;", "&#8800;", "&#8801;", "&#8804;", "&#8805;", "&#8834;", "&#8835;", "&#8836;", "&#8838;", "&#8839;", "&#8853;", "&#8855;", "&#8869;", "&#8901;", "&#8968;", "&#8969;", "&#8970;", "&#8971;", "&#9001;", "&#9002;", "&#9674;", "&#9824;", "&#9827;", "&#9829;", "&#9830;"],
        HTML2Numerical: function (s) {
            return this.swapArrayVals(s, this.arr1, this.arr2)
        },
        NumericalToHTML: function (s) {
            return this.swapArrayVals(s, this.arr2, this.arr1)
        },
        numEncode: function (s) {
            if (this.isEmpty(s)) return "";
            for (var a = [], l = s.length, i = 0; l > i; i++) {
                var c = s.charAt(i);
                " " > c || c > "~" ? (a.push("&#"), a.push(c.charCodeAt()), a.push(";")) : a.push(c)
            }
            return a.join("")
        },
        htmlDecode: function (s) {
            var c, m, d = s;
            if (this.isEmpty(d)) return "";
            if (d = this.HTML2Numerical(d), arr = d.match(/&#[0-9]{1,5};/g), null != arr) for (var x = 0; x < arr.length; x++) m = arr[x],
            c = m.substring(2, m.length - 1),
            d = c >= -32768 && 65535 >= c ? d.replace(m, String.fromCharCode(c)) : d.replace(m, "");
            return d
        },
        htmlEncode: function (s, dbl) {
            return this.isEmpty(s) ? "" : (dbl = dbl || !1, dbl && (s = "numerical" == this.EncodeType ? s.replace(/&/g, "&#38;") : s.replace(/&/g, "&amp;")), s = this.XSSEncode(s, !1), "numerical" != this.EncodeType && dbl || (s = this.HTML2Numerical(s)), s = this.numEncode(s), dbl || (s = s.replace(/&#/g, "##AMPHASH##"), s = "numerical" == this.EncodeType ? s.replace(/&/g, "&#38;") : s.replace(/&/g, "&amp;"), s = s.replace(/##AMPHASH##/g, "&#")), s = s.replace(/&#\d*([^\d;]|$)/g, "$1"), dbl || (s = this.correctEncoding(s)), "entity" == this.EncodeType && (s = this.NumericalToHTML(s)), s)
        },
        XSSEncode: function (s, en) {
            return this.isEmpty(s) ? "" : (en = en || !0, en ? (s = s.replace(/\'/g, "&#39;"), s = s.replace(/\"/g, "&quot;"), s = s.replace(/</g, "&lt;"), s = s.replace(/>/g, "&gt;")) : (s = s.replace(/\'/g, "&#39;"), s = s.replace(/\"/g, "&#34;"), s = s.replace(/</g, "&#60;"), s = s.replace(/>/g, "&#62;")), s)
        },
        hasEncoded: function (s) {
            return /&#[0-9]{1,5};/g.test(s) ? !0 : /&[A-Z]{2,6};/gi.test(s) ? !0 : !1
        },
        stripUnicode: function (s) {
            return s.replace(/[^\x20-\x7E]/g, "")
        },
        correctEncoding: function (s) {
            return s.replace(/(&amp;)(amp;)+/, "$1")
        },
        swapArrayVals: function (s, arr1, arr2) {
            if (this.isEmpty(s)) return "";
            var re;
            if (arr1 && arr2 && arr1.length == arr2.length) for (var x = 0, i = arr1.length; i > x; x++) re = new RegExp(arr1[x], "g"),
            s = s.replace(re, arr2[x]);
            return s
        },
        inArray: function (item, arr) {
            for (var i = 0, x = arr.length; x > i; i++) if (arr[i] === item) return i;
            return -1
        }
    },
    mod.filter("capitalize", [function () {
        return function (str) {
            return angular.isString(str) && "" != str ? str[0].toUpperCase() + str.substring(1) : void 0
        }
    }]),
    mod.filter("currencyFormatter", ["$filter", function (filter) {
        return function (n, format) {
            return format ? defined(format.symbol) && defined(format.position) ? "pre" == format.position ? format.symbol + n : n + format.symbol : format.symbol ? format.symbol + n : (format.pre || "") + n + (format.post || "") : n
        }
    }]),
    mod.filter("emailPrefix", [function () {
        return function (str) {
            if (!angular.isString(str) || "" == str) return str;
            var index = _.indexOf(str, "@");
            return -1 === index ? str : str.slice(0, index)
        }
    }]),
    mod.filter("levelDate", ["$filter", function (filter) {
        var def = filter("date");
        return function (dt, format) {
            if (!defined(dt) || dt == prism.consts.nullValue) return prism.consts.nullValue;
            if ("string" == typeof dt && (dt = Date.parseDate(dt)), !angular.isDate(dt) || !angular.isString(format) || angular.isDate(dt) && !dt.isValid()) return dt;
            if (format.indexOf("Q") > -1) {
                for (var q = parseInt(dt.getMonth() / 3) + 1, str = format.split("QQ"), res = "", i = 0, l = str.length; l > i; i++) i > 0 && (res += "Quarter " + q),
                0 != str[i].length && (res += def(dt, str[i]).replace("Q", "Q" + q));
                return res
            }
            return def(dt, format)
        }
    }]),
    mod.filter("localeDate", [function () {
        return function (date) {
            return date.toLocaleString ? date.toLocaleString() : date
        }
    }]),
    mod.filter("numberFormatter", ["$filter", "$locale", function (filter, locale) {
        var num = filter("number");
        return function (n, format) {
            return format ? format.separated ? num(n, format.decimals || 0) : num(n, format.decimals || 0).split(locale.NUMBER_FORMATS.GROUP_SEP).join("") : n
        }
    }]),
    mod.filter("numeric", ["$filter", function (filter) {
        var nf = filter("numberFormatter"),
            cf = filter("currencyFormatter"),
            pf = filter("percentFormatter"),
            num = filter("number"),
            getAutoDecimals = function (n, max) {
                var t = n.toString(),
                    sepidx = t.indexOf(".");
                if (0 > sepidx) return 0;
                t = t.substr(sepidx + 1);
                var decimals = 0;
                return max >= 3 && t.length > 2 && "0" !== t[2] ? decimals = 3 : max >= 2 && t.length > 1 && "0" !== t[1] ? decimals = 2 : max >= 1 && t.length > 0 && "0" !== t[0] && (decimals = 1),
                decimals
            };
        return function (n, format) {
                if (!format) return n;
                var abbreviation = "",
                    absn = Math.abs(n);
                format = $$.object.clone(format);
                var shouldAbbreviate = defined(format.abbreviations) && "percent" != format.type && !defined(format.percent);
                if (shouldAbbreviate && format.abbreviations.t && absn >= 1e12 ? (n /= 1e12, abbreviation = "T") : shouldAbbreviate && format.abbreviations.b && absn >= 1e9 ? (n /= 1e9, abbreviation = "B") : shouldAbbreviate && format.abbreviations.m && absn >= 1e6 ? (n /= 1e6, abbreviation = "M") : shouldAbbreviate && format.abbreviations.k && absn >= 1e3 && (n /= 1e3, abbreviation = "K"), "auto" === format.decimals && ("" !== abbreviation ? (absn = Math.abs(n), absn >= 100 ? format.decimals = getAutoDecimals(n, 1) : format.decimals = getAutoDecimals(n, 2)) : n % 1 !== 0 ? format.decimals = getAutoDecimals(n, 2) : format.decimals = 0), "number" == format.type) return nf(n, format) + abbreviation;
                if ("currency" == format.type) {
                        var temp = num(n, format.decimals || 0) + abbreviation;
                        return cf(temp, format)
                    }
                if ("percent" == format.type) return pf(n, format) + abbreviation;
                if (format.number) return nf(n, {
                        decimals: format.decimals,
                        separated: format.number.separated
                    }) + abbreviation;
                if (format.currency) {
                        var temp = num(n, format.decimals || 0) + abbreviation;
                        return cf(temp, {
                            decimals: format.decimals,
                            symbol: format.currency.symbol,
                            pre: format.currency.pre,
                            post: format.currency.post,
                            position: format.currency.position
                        })
                    }
                return format.percent ? pf(n, format) + abbreviation : void 0
            }
    }]),
    mod.filter("percentFormatter", ["$filter", function (filter) {
        var num = filter("number");
        return function (n, format) {
            return format ? defined(n) && n != prism.consts.nullValue ? (angular.isString(n) && (n = parseFloat(n) || 0), num(100 * n, format.decimals || 0) + "%") : "" : void 0
        }
    }]),
    mod.service("$activity", ["$q", "$http", "$device", function ($q, $http, $device) {
        var device = $device.name();
        this.pushDashboard = function (dashboard, action) {
            try {
                if (!defined(dashboard, "oid") || !defined(dashboard, "widgets.length")) return;
                this.pushAction("dashboard;" + dashboard.oid + ";" + dashboard.widgets.length, action)
            } catch (exception) {
                $$.error(exception)
            }
        },
        this.pushWidget = function (widget, action) {
            try {
                if (!defined(widget, "oid")) return;
                this.pushAction("widget;" + widget.oid, action)
            } catch (exception) {
                $$.error(exception)
            }
        },
        this.pushAction = function (resource, action) {
            defined(action) && (defined(resource) || (resource = "N/A"), this.push([{
                action: action,
                resourceId: resource,
                device: device
            }]))
        },
        this.push = function (data) {
            return defined(data) ? (_.isArray(data) || (data = [data]), $http({
                method: "POST",
                url: "/api/activities",
                data: data,
                cache: !1
            })) : void 0
        }
    }]),
    mod.service("$color", [function () {
        this.average = function (colors) {
            if (defined(colors)) {
                for (var r = 0, g = 0, b = 0, i = 0; colors > i; i++) {
                    var color = new Color(c);
                    r += color.r,
                    g += color.g,
                    b += color.b
                }
                return r /= colors.length,
                g /= colors.length,
                b /= colors.length,
                new Color(r, g, b).toHex()
            }
        },
        this.greyscale = function (colors) {
            var avg = new Color(this.average(colors));
            return avg.s = 0,
            avg.toHex()
        },
        this.gradientValue = function (steps, position) {
            for (var startidx = 0; position < steps[startidx].position;) startidx++;
            var endidx = startidx + 1;
            if (endidx >= steps.length) return steps[startidx];
            var c1 = new Color(steps[startidx].color),
                c2 = new Color(steps[endidx].color),
                factor = (position - c1.position) / (c2.position - c1.position);
            return new Color(Math.Max(0, Math.min(1, Math.round(c1.a + (c2.a - c1.a) * factor))), Math.Max(0, Math.min(255, Math.round(c1.r + (c2.r - c1.r) * factor))), Math.Max(0, Math.min(255, Math.round(c1.g + (c2.g - c1.g) * factor))), Math.Max(0, Math.min(255, Math.round(c1.b + (c2.b - c1.b) * factor)))).toHex()
        }
    }]).$namespace(),
    mod.service("$command", ["$rootScope", "$injector", function ($rootScope, $injector) {
        var commands = {},
            commandslist = [];
        window.prism.$command = this,
        this.register = function (name, ctor) {
                if (defined(commands[name])) throw "the command '" + name + "' is already registered";
                commands[name] = ctor,
                commandslist.push(ctor)
            },
        this.create = function (name, initargs) {
                var commandfunc = $$get(window, name);
                $$.validate(commandfunc, name + " is not a registered command.");
                var command = $injector.instantiate(commandfunc, initargs);
                return command
            },
        this.execute = function (name, initargs, commandargs) {
                var command = this.create(name, initargs);
                if (defined(command.canExecute) && !command.canExecute(commandargs)) return void $$.debug.log("■ command execution refused (" + name + ")");
                var result;
                try {
                    result = command.execute(commandargs)
                } catch (error) {
                    $$.error(error)
                } finally {
                    $rootScope.$$phase || $rootScope.$digest()
                }
                return result
            }
    }]).$namespace(),
    mod.service("$commandHelper", [function () {
        var self = this;
        this.processItems = function (items) {
            return items.filter(function (item) {
                return defined(item.command) || defined(item.items)
            }).forEach(function (item) {
                if (!defined(item.items)) return item.caption = $$get(item, "commandArgs.title") || item.command.title,
                item.tooltip = item.command.desc,
                void(item.disabled = !item.command.canExecute(item.commandArgs));
                if (_.isArray(item.items)) {
                    var commands = self.processItems(item.items);
                    if (!_.isEmpty(commands)) {
                        var filteredCommands = _.filter(commands, function (item) {
                            return defined(item.command) || defined(item.items)
                        });
                        _.isEmpty(filteredCommands) || (item.disabled = _.every(filteredCommands, function (c) {
                            return c.disabled
                        }))
                    }
                }
            }),
            items
        },
        this.areAllItemsCannotGetExecuted = function (items) {
            items = self.processItems(items);
            var filteredItems = _.filter(items, function (item) {
                return defined(item.command) || defined(item.items)
            });
            return _.every(filteredItems, function (item) {
                return item.disabled
            })
        }
    }]),
    mod.service("$dateFormat", ["base.services.$identity", function ($identity) {
        var _defaultFormat = null,
            isLocaleEnUs = function () {
                var language = $identity.getLocalization();
                return "en-us" === language
            },
            getSelectedDays = function () {
                return isLocaleEnUs() ? "MM/dd/yyyy" : "shortDate"
            },
            getDaysFormats = function () {
                var enUSFormat = "";
                isLocaleEnUs() && (enUSFormat = "MM/dd/yyyy");
                var daysFormats = ["shortDate", enUSFormat, "mediumDate", "longDate", "fullDate"];
                return _.without(daysFormats, "")
            };
        this.getLevels = function () {
                return ["years", "quarters", "months", "days"]
            },
        this.getDefaultFormat = function () {
                return null != _defaultFormat ? _defaultFormat : _defaultFormat = {
                    years: {
                        selected: "yyyy",
                        formats: ["yyyy", "yy"]
                    },
                    quarters: {
                        selected: "Q yyyy",
                        formats: ["Q yyyy", "yyyy Q"]
                    },
                    months: {
                        selected: "MM/yyyy",
                        formats: ["M/yy", "MM/yyyy", "MMM yyyy", "MMMM yyyy"]
                    },
                    days: {
                        selected: getSelectedDays(),
                        formats: getDaysFormats()
                    }
                }
            }
    }]),
    window.prism.$device = function () {
        var _name, SIMULATE_PHONE = !1,
            SIMULATE_TABLET = !1,
            useragent = window.navigator.userAgent.toLowerCase(),
            _android = useragent.match(/android/i),
            _androidPhone = _android && useragent.match(/mobile/i),
            _androidTablet = _android && !_androidPhone,
            _iphone = useragent.match(/iphone/i) || useragent.match(/ipod/i),
            _ipad = useragent.match(/ipad/i),
            _winphone = useragent.match(/windows phone/i),
            _blackberry = useragent.match(/blackberry/i),
            _blackberryPhone = _blackberry && !useragent.match(/tablet/i),
            _blackberryTablet = useragent.match(/rim tablet/i),
            _desktop = !1,
            _tablet = !1,
            _orientation = window.orientation,
            _phone = !1,
            _locale = window.navigator.browserLanguage || window.navigator.language || "en-US",
            _browser = {
                opera: defined(window.opera),
                ie: /msie/i.test(useragent) && !window.opera,
                ff: /firefox/.test(useragent),
                chrome: /chrome/.test(useragent),
                safari: /safari/.test(useragent) && !/chrome/.test(useragent),
                webkit: /applewebkit/.test(useragent),
                ios: /(ipad|iphone|ipod)/g.test(useragent),
                name: "",
                names: {
                    opera: "opera",
                    ie: "ie",
                    ff: "ff",
                    chrome: "chrome",
                    safari: "safari"
                }
            };
        return _browser.name = _browser.opera ? "opera" : _browser.ie ? "ie" : _browser.ff ? "ff" : _browser.chrome ? "chrome" : _browser.safari ? "safari" : "",
        SIMULATE_PHONE |= window.location.pathname.indexOf("-phone") > -1,
        _androidTablet || _ipad || _blackberryTablet || SIMULATE_TABLET ? (_name = "tablet", _tablet = !0) : _iphone || _androidPhone || _winphone || _blackberryPhone || SIMULATE_PHONE ? (_name = "phone", _phone = !0) : (_name = "desktop", _desktop = !0),
        {
                names: {
                    desktop: "desktop",
                    tablet: "tablet",
                    phone: "phone"
                },
                suffix: function (text) {
                    return text + "-" + _name
                },
                desktop: function () {
                    return _desktop
                },
                tablet: function () {
                    return _tablet
                },
                phone: function () {
                    return _phone
                },
                orientation: function () {
                    return _orientation = 0 == window.orientation ? "portrait" : "landscape"
                },
                name: function () {
                    return _name
                },
                locale: function () {
                    return _locale
                },
                browser: function () {
                    return _browser
                }
            }
    }(),
    mod.service("$device", function () {
        angular.copy(prism.$device, this)
    }).$namespace(),
    mod.service("$globalization", [function () {
        this.getLocalization = function () {
            return $$get(window.prism, "globalization.localization")
        }
    }]),
    mod.service("$identity", ["$q", "$http", "base.services.$sessionStorage", "$device", "base.services.$globalization", "tmhDynamicLocale", function ($q, $http, $sessionStorage, $device, $globalization, tmhDynamicLocale) {
        var _language, _this = this;
        this.user = {},
        this.getLoggedInUser = function () {
            var d = $q.defer(),
                loggedinUrl = "/api/users/loggedIn";
            return $http.get(loggedinUrl).then(function (result) {
                    return _this.user = result.data,
                    prism.user = result.data,
                    _this.getLocalization()
                }).then(function (language) {
                    tmhDynamicLocale.set(language),
                    d.resolve(_this.user)
                })["catch"](function (err) {
                    d.reject(err)
                }),
            d.promise
        },
        this.signout = function () {
            $http.get("/api/auth/logout").then(function (result) {
                $sessionStorage.clear("token"),
                window.location.href = result && result.data && "" != result.data ? result.data : "/app/account#/login"
            })["catch"](function (err) {})
        },
        this.getBaseRoleName = function () {
            return $$get(_this, "user.baseRoleName")
        },
        this.isAdmin = function () {
            return "super" === _this.user.baseRoleName || "admin" === _this.user.baseRoleName
        },
        this.getLocalization = function () {
            if (_language) return _language;
            var localization = $globalization.getLocalization(),
                userPreferences = prism.user.preferences;
            return _language = userPreferences && userPreferences.localeId || $device.locale(),
            defined(localization) && (_language = localization.autoDetectEnabled ? _language : localization["default"]),
            _language.toLowerCase()
        }
    }]),
    mod.service("$localStorage", function ($http, $localStorage, $rootScope) {
        this.isSupported = function () {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch (e) {
                return !1
            }
        },
        this.get = function (key, format) {
            var result = null;
            if (this.supported) if (format && "json" === format) try {
                result = JSON.parse(this.$storage.getItem(key))
            } catch (e) {
                $$.debug.log("error - JSON.parse in $localStorage.getItem(" + key + ")")
            } else result = this.$storage.getItem(key);
            return result
        },
        this.set = function (key, value, format) {
            if (this.supported && format && "json" === format) try {
                var json = JSON.stringify(value);
                this.$storage.setItem(key, json)
            } catch (e) {
                $$.debug.log("error - $localStorage.setItem(" + key + ")")
            }
        },
        this.clear = function (key) {
            this.supported && delete this.$storage[key]
        },
        this.$storage = null,
        this.supported = this.isSupported(),
        this.supported && (this.$storage = window.localStorage)
    }),
    mod.service("$mongo", [function () {
        this.toStringMongo = function (txt) {
            return angular.isString(txt) ? ("$" === txt[0] && (txt = "%36" + txt.substring(1)), txt.replace(/\./g, "%46")) : txt
        },
        this.fromStringMongo = function (txt) {
            return angular.isString(txt) ? (txt.startsWith("%36") && (txt = txt.substring(3)), txt.replace(/%46/, ".")) : txt
        }
    }]),
    mod.service("$naming", ["eucalyptus.services.$timeExp", "base.services.$dateFormat", "$filter", function ($timeExp, $dateFormat, $filter) {
        function e(str) {
            return str && str.length > 0 ? " " + str : ""
        }
        function handleTimeExpression(jaql) {
            var plain, html, option = $timeExp.extract(jaql);
            return plain = option.text,
            html = plain,
            {
                plain: plain,
                html: html
            }
        }
        function handleFilter(filter, type, level) {
            var plain, html;
            if (defined(level) && (level = level.toLowerCase().trim()), angular.isObject(filter)) {
                var exclude = defined(filter.exclude),
                    mode = getFilterType({
                        filter: filter
                    });
                if ("custom" == mode && (plain = "filtered with custom filter", html = '<span class="jaql-human-filterpost">{0}</span>'.format(plain)), "member" == mode) {
                        var text, members = exclude ? filter.exclude.members : filter.members,
                            explicit = exclude ? filter.exclude.explicit : filter.explicit,
                            empty = !members || 0 === members.length;
                        if (exclude || explicit || !empty ? exclude || explicit || empty ? !exclude && explicit && empty ? text = "Include all" : exclude || !explicit || empty ? exclude && !explicit && empty ? text = "Include all" : !exclude || explicit || empty ? exclude && explicit && empty ? text = "Exclude nothing." : exclude && explicit && !empty && (text = "Exclude:") : text = "Exclude:" : text = "" : text = "" : text = "Include all", defined(members) && members.length > 0) {
                                var mem = members;
                                if ("datetime" == type && defined(level)) {
                                    var formatter = $filter("levelDate"),
                                        format = $dateFormat.getDefaultFormat()[level].selected;
                                    mem = mem.map(function (item) {
                                            return formatter(item, format)
                                        })
                                }
                                plain = "{0} {1}".format(text, mem.join(", ")),
                                html = '<span class="jaql-human-filterpost">{0}</span><ul class="jaql-human-members"><li>{1}</li></ul>'.format(text, mem.join("</li><li>"))
                            } else plain = "{0}".format(text),
                        html = '<span class="jaql-human-filterpost">{0}</span>'.format(text)
                    }
                if ("criteria" == mode) if ("text" == type) {
                        var text;
                        defined(filter.startsWith) ? text = 'starting with "' + filter.startsWith + '"' : defined(filter.endsWith) ? text = 'ending with "' + filter.endsWith + '"' : defined(filter.contains) ? text = 'containing "' + filter.contains + '"' : defined(filter.equals) ? text = 'equal to "' + filter.equals + '"' : defined(filter.doesntStartWith) ? text = 'not starting with "' + filter.doesntStartWith + '"' : defined(filter.doesntEndWith) ? text = 'not ending with "' + filter.doesntEndWith + '"' : defined(filter.doesntContain) ? text = 'not containing "' + filter.doesntContain + '"' : defined(filter.doesntEqual) && (text = 'not equal to "' + filter.doesntEqual + '"'),
                        plain = "Items {0}".format(text),
                        html = '<span class="jaql-human-filterpost">{0}</span>'.format(plain)
                    } else if ("numeric" == type) {
                        var text;
                        defined(filter.exclude && filter.exclude.equals) ? text = "not equal to " + filter.exclude.equals : defined(filter.doesntEqual) ? text = "not equal to " + filter.doesntEqual : defined(filter.equals) ? text = "equal to " + filter.equals : defined(filter.from) && defined(filter.to) ? text = "between " + filter.from + " and " + filter.to + " (inclusive)" : defined(filter.fromNotEqual) && defined(filter.toNotEqual) ? text = "between " + filter.fromNotEqual + " and " + filter.toNotEqual + " (exclusive)" : defined(filter.toNotEqual) ? text = "smaller than " + filter.toNotEqual : defined(filter.to) ? text = "smaller or equal to " + filter.to : defined(filter.fromNotEqual) ? text = "greater than " + filter.fromNotEqual : defined(filter.from) && (text = "larger or equal to " + filter.from),
                        plain = "Values {0}".format(text),
                        html = '<span class="jaql-human-filterpost">{0}</span>'.format(plain)
                    } else if ("datetime" == type) {
                        var text, dateformat = $dateFormat.getDefaultFormat().days.selected,
                            dateFilter = $filter("levelDate"),
                            f = filter,
                            from = dateFilter(f.from, dateformat),
                            to = dateFilter(f.to, dateformat);
                        text = defined(f.from) ? defined(f.to) ? f.from == f.to ? from : from + " to " + to : from : to,
                        plain = text,
                        html = '<span class="jaql-mini-daterange">{0}</span>'.format(text)
                    }
                if ("rank" == mode) {
                        var count, by, format;
                        filter.top ? (count = filter.top, formatDesc = $translate("TOPDESC")) : filter.bottom && (count = filter.bottom, formatDesc = $translate("BOTTOMDESC")),
                        by = filter.by;
                        var bystring = defined(by) ? me.humanize(by) : {
                            plain: $translate("MEASURE")
                        };
                        plain = formatDesc.format(count, bystring.plain),
                        html = '<span class="jaql-mini-daterange">{0}</span>'.format(plain)
                    }
                return {
                        plain: plain,
                        html: html
                    }
            }
            throw "cant extract filter"
        }
        function handleQuickFunction(func, inner) {
            var out = "";
            switch (func.toLowerCase().trim()) {
            case "contribution":
                out = "Contribution to";
                break;
            case "pastyear":
                out = "Past Year";
                break;
            case "pastquarter":
                out = "Past Quarter";
                break;
            case "pastmonth":
                out = "Past Month";
                break;
            case "pastweek":
                out = "Past Week";
                break;
            case "pastday":
                out = "Past Day";
                break;
            case "growthrate":
                out = "Growth Rate of";
                break;
            case "growth":
                out = "Growth of";
                break;
            case "ytdsum":
                out = "Yearly Total of";
                break;
            case "qtdsum":
                out = "Quarterly Total of";
                break;
            case "mtdsum":
                out = "Monthly Total of";
                break;
            case "ytdavg":
                out = "Yearly Average of";
                break;
            case "qtdavg":
                out = "Quarterly Average of";
                break;
            case "mtdavg":
                out = "Monthly Average of"
            }
            return _.isEmpty(out) ? "{0}({1})".format(func, me.fromBrackets(inner)) : "{0} {1}".format(out, me.fromBrackets(inner))
        }
        function handleFilterShort(filter, type) {
            var plain = {
                pre: "",
                post: ""
            },
                html = {
                    pre: "",
                    post: ""
                };
            if (angular.isObject(filter)) {
                    var mode = (defined(filter.exclude), getFilterType({
                        filter: filter
                    }));
                    if ("member" == mode && (plain.pre = "Selected", html.pre = '<span class="jaql-human-filterpre">{0}</span>'.format(plain.pre)), "criteria" == mode && ("text" == type ? (defined(filter.startsWith) ? plain.post = 'that start with "' + filter.startsWith + '"' : defined(filter.endsWith) ? plain.post = 'that end with "' + filter.endsWith + '"' : defined(filter.contains) ? plain.post = 'that contain "' + filter.contains + '"' : defined(filter.equals) ? plain.post = 'that are equal to "' + filter.equals + '"' : defined(filter.doesntStartWith) ? plain.post = "that don't start with \"" + filter.doesntStartWith + '"' : defined(filter.doesntEndWith) ? plain.post = "that don't end with \"" + filter.doesntEndWith + '"' : defined(filter.doesntContain) ? plain.post = "that don't contain \"" + filter.doesntContain + '"' : defined(filter.doesntEqual) && (plain.post = "that aren't equal to \"" + filter.doesntEqual + '"'), html.post = '<span class="jaql-human-filterpost">{0}</span>'.format(plain.post)) : "numeric" == type ? (defined(filter.exclude && filter.exclude.equals) ? plain.post = "not equal to " + filter.exclude.equals : defined(filter.doesntEqual) ? plain.post = "not equal to " + filter.doesntEqual : defined(filter.equals) ? plain.post = "equal to " + filter.equals : defined(filter.from && filter.to) ? plain.post = "between " + filter.from + " and " + filter.to + " (inclusive)" : defined(filter.fromNotEqual && filter.toNotEqual) ? plain.post = "between " + filter.fromNotEqual + " and " + filter.toNotEqual + " (inclusive)" : defined(filter.toNotEqual) ? plain.post = "smaller than " + filter.toNotEqual : defined(filter.to) ? plain.post = "smaller or equal to " + filter.to : defined(filter.fromNotEqual) ? plain.post = "greater than " + filter.fromNotEqual : defined(filter.from) && (plain.post = "larger or equal to " + filter.from), html.post = '<span class="jaql-human-filterpost">{0}</span>'.format(plain.post)) : "datetime" == type && (plain.post = "- Selected Range", html.post = '<span class="jaql-human-filterpost">{0}</span>'.format(plain.post))), "rank" == mode) {
                        var type, num;
                        filter.top ? (type = "Top", num = filter.top) : filter.bottom && (type = "Bottom", num = filter.bottom),
                        plain.pre = "{0} {1}".format(type, num),
                        html.pre = '<span class="jaql-human-filterpre">{0}</span>'.format(plain.pre)
                    }
                    return {
                        plain: plain,
                        html: html
                    }
                }
            throw "cant extract filter"
        }
        function handleAgg(agg) {
            if (angular.isString(agg)) {
                var aggTitle = "";
                switch (agg.toLowerCase().trim()) {
                case "sum":
                    aggTitle = "Total";
                    break;
                case "avg":
                    aggTitle = "Average";
                    break;
                case "min":
                    aggTitle = "Min";
                    break;
                case "max":
                    aggTitle = "Max";
                    break;
                case "countduplicates":
                    aggTitle = "# of";
                    break;
                case "count":
                    aggTitle = "# of unique";
                    break;
                case "median":
                    aggTitle = "Median of";
                    break;
                case "stdev":
                    aggTitle = "Standard Deviation of";
                    break;
                case "var":
                    aggTitle = "Variance of"
                }
                var plain = aggTitle,
                    html = '<span class="jaql-agg">{0}</span>'.format(aggTitle);
                return {
                        plain: plain,
                        html: html
                    }
            }
            throw "cant extract aggregation"
        }
        function handleDim(dim, level, short) {
            var fullName;
            fullName = angular.isObject(dim) && defined(dim.id) ? dim.id : dim,
            fullName = me.fromBrackets(fullName);
            var lastPoint = fullName.lastIndexOf("."); - 1 != lastPoint && (fullName = fullName.slice(lastPoint + 1)),
            fullName = fullName.replace("(Calendar)", ""),
            short || (fullName = fullName.spaceOut().capitalize());
            var plain = fullName,
                html = '<span class="jaql-dim">{0}</span>'.format(plain);
            return level && (plain = "{0} in {1}".format(level.capitalize(), plain), html = '<span class="jaql-dim-level">{0}</span>&nbsp;in&nbsp;{1}'.format(level.capitalize(), html)),
            {
                    plain: plain,
                    html: html
                }
        }
        function getFilterType(jaql) {
            if (defined(jaql) && defined(jaql.filter)) {
                var exclude = defined(jaql.filter.exclude),
                    filter = exclude ? jaql.filter.exclude : jaql.filter;
                return defined(filter.custom) && filter.custom ? "custom" : defined(filter.members) || filter.all ? "member" : defined(filter.attributes) ? "attr" : defined(filter.top) || defined(filter.bottom) ? "rank" : defined(filter.startsWith) || defined(filter.doesntStartWith) || defined(filter.endsWith) || defined(filter.doesntEndWith) || defined(filter.contains) || defined(filter.doesntContain) || defined(filter.equals) || defined(filter.doesntEqual) || defined(filter.toNotEqual) || defined(filter.to) || defined(filter.fromNotEqual) || defined(filter.from) ? "criteria" : "custom"
            }
            return "member"
        }
        var me = this,
            _translate = $filter("translate"),
            prefix = "UC.FILTER.TAG.",
            $translate = function (id) {
                return _translate(prefix + id)
            };
        this.balanceBrackets = function (str) {
                if (!angular.isString(str) || "" == str) return str;
                for (var i = 0, l = str.length, opened = 0, left = 0; l > i; i++)"[" == str[i] ? opened++ : "]" == str[i] && (opened ? opened-- : left++);
                for (; opened > 0; opened--) str += "]";
                for (; left > 0; left--) str = "[" + str;
                return str
            },
        this.toBrackets = function (str, enforce, balance) {
                return angular.isString(str) && "" != str ? (balance && (str = me.balanceBrackets(str)), (enforce || "[" != str[0] || "]" != str[str.length - 1]) && (str = "[" + str + "]"), str) : str
            },
        this.fromBrackets = function (str) {
                return !angular.isString(str) || str.length < 2 || "[" != str[0] || "]" != str[str.length - 1] ? str : str.substring(1, str.length - 1)
            },
        this.humanizeFormula = function (jaql) {
                if (!jaql || !defined(jaql.formula)) return "";
                if (!jaql.context) return jaql.formula;
                var i, title, res = jaql.formula;
                return angular.forEach(_.keys(jaql.context), function (k) {
                    for (i = 20, title = "[" + (jaql.context[k].title || me.toPlainTextHumanize(jaql.context[k])) + "]"; --i && res.indexOf(k) > -1;) res = res.replace(k, title)
                }),
                res
            },
        this.getQuickFunctionTitle = handleQuickFunction,
        this.toPlainTextHumanize = function (item) {
                var jaql = $$get(item, "jaql") || item;
                return me.humanize(jaql).plain
            },
        this.toHtmlHumanize = function (item) {
                var jaql = $$get(item, "jaql") || item;
                return me.humanize(jaql).html
            },
        this.toMinilyptusDescription = function (item) {
                var jaql = $$get(item, "jaql") || item;
                getFilterType({
                    filter: jaql.filter
                }),
                jaql.datatype;
                return me.humanize(jaql).html
            },
        this.toPlainTextTitle = function (item, blackList) {
                var jaql = $$get(item, "jaql") || item,
                    title = me.getTitle(jaql);
                if (angular.isArray(blackList)) {
                        var black = {};
                        angular.forEach(blackList, function (nogo) {
                            black[nogo.toLowerCase()] = !0
                        }),
                        blackList = black
                    }
                if (angular.isObject(blackList)) {
                        var orig, matcher, i = 0;
                        for (orig = matcher = title.plain.toLowerCase(); blackList[matcher];) matcher = orig + (++i).toString();
                        i > 0 && (title.plain += i.toString())
                    }
                return title.plain
            },
        this.toName = function (item) {
                var jaql = $$get(item, "jaql") || item,
                    title = me.getTitle(jaql);
                return item.title = title.plain,
                title.html
            },
        this.getTitle = function (jaql, filters) {
                function suka(err, bul) {
                    if (bul) throw err
                }
                function e(str) {
                    return str && str.length > 0 ? " " + str : ""
                }
                if (suka("JAQL must be a JSON object!", !angular.isObject(jaql)), jaql.formula) {
                    var title = jaql.title || me.humanizeFormula(jaql);
                    return {
                        html: title,
                        plain: title
                    }
                }
                suka("JAQL must have a dimension!", !jaql.dim);
                var dimtype, level, name, agg = {
                    plain: "",
                    html: ""
                },
                    filter = {
                        plain: {
                            pre: "",
                            post: ""
                        },
                        html: {
                            pre: "",
                            post: ""
                        }
                    };
                if (defined(jaql.datatype)) dimtype = jaql.datatype;
                else {
                        if ("object" != typeof jaql.dim) throw "No dim/data type provided!";
                        dimtype = jaql.dimtype
                    }
                "datetime" == dimtype && (level = "object" == typeof jaql.dim ? jaql.dim.level : jaql.level),
                name = handleDim(jaql.dim, level, !0),
                jaql.filter && filters && (filter = handleFilterShort(jaql.filter, dimtype)),
                jaql.agg && (agg = handleAgg(jaql.agg));
                var plain = "{0}{1}{2}{3}".format(e(filter.plain.pre), e(agg.plain), e(name.plain), e(filter.plain.post)).trim(),
                    html = "{0}{1}{2}{3}".format(e(filter.html.pre), e(agg.html), e(name.html), e(filter.html.post)).trim();
                return {
                        plain: plain,
                        html: html
                    }
            },
        this.humanize = function (jaql) {
                if ("object" != typeof jaql) throw "JAQL must be a JSON object!";
                if (!defined(jaql.dim) && !defined(jaql.formula)) throw "JAQL must contain either a dimension or a formula!";
                var name, dimtype, level, fltr = {
                    plain: {
                        pre: "",
                        post: ""
                    },
                    html: {
                        pre: "",
                        post: ""
                    }
                },
                    agg = {
                        plain: "",
                        html: ""
                    };
                if (defined(jaql.formula) || defined(jaql.agg)) dimtype = "numeric";
                else if (defined(jaql.datatype)) dimtype = jaql.datatype;
                else {
                        if ("object" != typeof jaql.dim) throw "No dim/data type provided!";
                        dimtype = jaql.dimtype
                    }
                if ("datetime" == dimtype && (level = "object" == typeof jaql.dim ? jaql.dim.level : jaql.level), jaql.filter && ($timeExp.isTimeExpression(jaql) ? (fltr = handleTimeExpression(jaql), name = handleDim(jaql.dim, "", !1)) : fltr = handleFilter(jaql.filter, dimtype, level), defined(fltr))) return fltr;
                if (!defined(jaql.dim) && defined(jaql.formula)) {
                        var ftit = me.toPlainTextTitle({
                            formula: jaql.formula,
                            context: jaql.context
                        });
                        name = {
                            plain: ftit,
                            html: '<span class="jaql-formula">{0}</span>'.format(ftit)
                        }
                    } else name = handleDim(jaql.dim, level, !1);
                jaql.agg && (agg = handleAgg(jaql.agg));
                var plain = "{0}{1}{2}{3}".format(e(agg.plain), e(fltr.plain.pre), e(name.plain), e(fltr.plain.post)).trim(),
                    html = "{0}{1}{2}{3}".format(e(agg.html), e(fltr.html.pre), e(name.html), e(fltr.html.post)).trim();
                return {
                        plain: plain,
                        html: html
                    }
            },
        this.getFilterDescription = function (filter, datatype) {
                var plain = handleFilter(filter, datatype).plain;
                return plain
            },
        String.prototype.spaceOut = function () {
                for (var match, str = this, reg1 = /[A-Z][a-z]/g, reg2 = /[a-z][A-Z]/g, reg3 = /_/g, matches = []; null != (match = reg1.exec(str));) matches.push(match.index);
                for (var i = 0; i < matches.length; i++) str = str.splice(matches[i] + i, 0, " ");
                for (matches = []; null != (match = reg2.exec(str));) matches.push(match.index);
                for (var i = 0; i < matches.length; i++) str = str.splice(matches[i] + i + 1, 0, " ");
                return str = str.replace(reg3, " "),
                str.trim()
            }
    }]),
    mod.service("$nav", ["$rootScope", "$location", "$route", "$state", "$urlRouter", function ($rootScope, $location, $route, $state, $urlRouter) {
        function copyParam(source, target, name) {
            defined(source[name]) && (target[name] = source[name])
        }
        var data;
        this.data = function (keep) {
            var result = data;
            return keep !== !0 && (data = null),
            result
        },
        this.go = function (config) {
            if (config.data && (data = config.data), config.prms) {
                $rootScope.$root["volatile"] ? (config.prms["volatile"] = !0, "layout.shell.dashboard" === config.state && (config.prms.h = !1, config.prms.t = !1, config.prms.l = !1)) : config.prms["volatile"] = void 0;
                var search = $location.search();
                copyParam(search, config.prms, "embed"),
                copyParam(search, config.prms, "l"),
                copyParam(search, config.prms, "r"),
                copyParam(search, config.prms, "t"),
                copyParam(search, config.prms, "h")
            }
            var target = $state.href(config.state, config.prms).substring(1);
            $location.url(target, !0)
        }
    }]).$namespace(),
    mod.service("$safeApply", ["$rootScope", function ($rootScope) {
        this.apply = function (fn, scope) {
            var s = scope || $rootScope,
                phase = s.$$phase;
            "$apply" == phase || "$digest" == phase ? fn && angular.isFunction(fn) && fn() : s.$apply(fn)
        }
    }]),
    mod.service("$sessionStorage", function ($http, $sessionStorage, $rootScope) {
        this.isSupported = function () {
            try {
                return "sessionStorage" in window && null !== window.sessionStorage
            } catch (e) {
                return !1
            }
        },
        this.get = function (key, format) {
            var result = null;
            if (this.supported) if (format && "json" === format) try {
                result = JSON.parse(this.$storage.getItem(key))
            } catch (e) {
                $$.debug.log("error - JSON.parse in $sessionStorage.getItem(" + key + ")")
            } else result = this.$storage.getItem(key);
            return result
        },
        this.set = function (key, value, format) {
            if (this.supported) if (format && "json" === format) try {
                var json = JSON.stringify(value);
                this.$storage.setItem(key, json)
            } catch (e) {
                $$.debug.log("error - $sessionStorage.setItem(" + key + ")")
            } else try {
                this.$storage.setItem(key, value)
            } catch (e) {
                $$.debug.log("error - $sessionStorage.setItem(" + key + ")")
            }
        },
        this.clear = function (key) {
            this.supported && delete this.$storage[key]
        },
        this.$storage = null,
        this.supported = this.isSupported(),
        this.supported && (this.$storage = window.sessionStorage)
    }),
    mod.service("$sizing", ["$rootScope", "base.factories.sizing", function ($scope, atoms) {
        function core() {
            if (enabled !== !1) {
                var h = document.documentElement.clientHeight,
                    w = document.documentElement.clientWidth,
                    offsetY = atoms.topmost,
                    offsetX = atoms.outergap,
                    offsetNegX = atoms.outergap;
// that.visible.header ? ($scope.sizing.header = {
// height: atoms.headerheight + "px",
// width: w - 2 * offsetX + "px",
// top: offsetY + "px",
// left: offsetX + "px"
// }, offsetY += atoms.headerheight + atoms.midVgap) : $scope.sizing.header = {
// display: "none",
// never: $$get(that, "visible.never.h")
// },
// that.visible.toolbar ? ($scope.sizing.toolbar = {
// height: atoms.toolbarheight + "px",
// width: w - 2 * offsetX + "px",
// w: w - 2 * offsetX,
// top: offsetY + "px",
// left: offsetX + "px"
// }, offsetY += atoms.toolbarheight + atoms.midVgap) : $scope.sizing.toolbar =
// {
// display: "none"
// },
// that.visible.leftpane ? ($scope.sizing.leftpane = {
// vis: !0,
// h: h - (atoms.topmost + offsetY + atoms.outergap),
// height: h - (atoms.topmost + offsetY + atoms.outergap) + "px",
// width: atoms.sidewidth + "px",
// top: offsetY + "px",
// left: offsetX + "px"
// }, offsetX += atoms.sidewidth + atoms.midHgap) : $scope.sizing.leftpane = {
// display: "none",
// never: $$get(that, "visible.never.l")
// },
                
                $scope.sizing.header = {
   					 display: "none",
   					 never: $$get(that, "visible.never.h")
				},
				$scope.sizing.toolbar ={
   					 display: "none"
				},
				$scope.sizing.leftpane = {
   					 display: "none",
   					 never: $$get(that, "visible.never.l")
				 },
                that.visible.rightpane ? ($scope.sizing.rightpane = {
                        vis: !0,
                        height: h - (atoms.topmost + offsetY + atoms.outergap) + "px",
                        width: atoms.sidewidth + "px",
                       // top: offsetY + "px",
                       // right: atoms.outergap + "px"
                        // TODO: UEB集成BI到OMS
                        top: "20px", 
                        right: "20px"
                    }, offsetNegX += atoms.sidewidth + atoms.midHgap) : $scope.sizing.rightpane = {
                        display: "none",
                        never: $$get(that, "visible.never.r")
                    },
                that.visible.midpane ? $scope.sizing.midpane = {
                        height: h - (atoms.topmost + offsetY + atoms.outergap) + "px",
                        h: h - (atoms.topmost + offsetY + atoms.outergap),
                        width: w - (offsetX + offsetNegX) - 20 + "px",
                        w: w - (offsetX + offsetNegX) - 20,
                       // top: offsetY + "px",
                        // left: offsetX + "px"
                        // TODO: UEB集成BI到OMS
                        top: "20px", 
                        left: "20px"
                    } : $scope.sizing.midpane = {
                        display: "none"
                    }
            }
        }
        function invalidate() {
            core()
        }
        var that = this,
            enabled = !0;
        this.visible = {},
        $scope.sizing = {
                header: {},
                toolbar: {},
                leftpane: {},
                midpane: {},
                rightpane: {},
                atoms: atoms
            },
        this.disable = function () {
                enabled = !1
            },
        this.enable = function () {
                enabled = !0
            },
        this.setVisibility = function (vis) {
                that.visible = vis || {},
                invalidate()
            },
        this.toggle = function (prop, val) {
                var res =  void 0 !== val && "boolean" == typeof val ? (val && !that.visible[prop] ? (that.visible[prop] = !0, invalidate()) : !val && that.visible[prop] && (that.visible[prop] = !1, invalidate()), val) : (that.visible[prop] = !that.visible[prop], invalidate(), that.visible[prop])
//        		if(!res){
//                		jQuery("div.right","#prism-mainview").find("div.pcol-tri").css("background","#33CCFF");
//                		jQuery("div.right","#prism-mainview").find(".pcol-thumb").css("background","url('/resources/widget-editor/images/arrow-10.png') 0 0 no-repeat");
//        		}
//        		else{
//        			jQuery("div.right","#prism-mainview").find("div.pcol-tri").css("background","none");
//        			jQuery("div.right","#prism-mainview").find(".pcol-thumb").css("background","none");
//        		}
                return res;
            },
        invalidate(),
        $(window).on("resize", function () {
                $scope.$apply(function () {
                    invalidate()
                })
            })
    }]),


    function () {
        window.translation = function () {
            var map = Object.create(null);
            return {
                get: function () {
                    var key;
                    return 1 === arguments.length ? key = arguments[0] : 2 === arguments.length && (key = arguments[0] + "." + arguments[1]),
                    $$get(map, key)
                }
            }
        }(),
        mod.service("$translation", function () {}).$namespace().$global("prism.$translation")
    }(),
    window.prism.$url = {
        template: function (name, modulename) {
            return defined(modulename) ? "/views/" + modulename + "/" + name + ".html" : "/views/" + name + ".html"
        },
        templateResponsive: function (name, modulename) {
            return defined(modulename) ? "/views/" + modulename + "/" + prism.$device.suffix(name) + ".html" : "/views/" + name + ".html"
        }
    },
    mod.service("$url", function () {
        this.template = prism.$url.template,
        this.templateResponsive = prism.$url.templateResponsive
    }),
    mod.service("crypto", ["$http", function ($http) {
        function getSecretKey() {
            return $http.get("/api/auth/secret").success(function (data, status, headers, config) {
                secretKey = data.secret
            }).error(function (response, status, headers, config) {})
        }
        var secretKey;
        getSecretKey(),
        this.encrypt = function (message, token) {
            return result = {},
            result.token = token || secretKey,
            result.payload = CryptoJS.AES.encrypt(message, result.token, {
                format: JsonFormatter
            }),
            result
        },
        this.decrypt = function (digest, token) {
            return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(JSON.stringify(digest), token, {
                format: JsonFormatter
            }))
        }
    }]),
    mod.service("jaqlService", ["$http", function ($http) {
        function executeQuery(jaql) {
            jaql.isMaskedResponse = !1;
            var ds = jaql.datasource,
                dsTitle = "string" == typeof ds ? ds : ds.title,
                url = "../api/datasources/{0}/jaql".format(encodeURIComponent(dsTitle)),
                staTime = new Date,
                deffered = $http({
                    method: "POST",
                    url: url,
                    data: angular.toJson(jaql)
                });
            return deffered["finally"](function () {
                    var finTime = new Date;
                    console.log('HTTP POST Ajax request to "../jaql/query" finished in ' + (finTime - staTime) + " ms")
                }),
            deffered
        }
        function parseJaql(datasource, jaql) {
            if ("string" != typeof datasource && "object" != typeof datasource || "object" != typeof jaql) throw "parseJaql requires a datasource (string/object) and jaql query object!";
            jaql.isMaskedResponse = !1;
            var dsTitle = "string" == typeof datasource ? datasource : datasource.title,
                url = "../api/datasources/{0}/parse".format(encodeURIComponent(dsTitle)),
                staTime = new Date,
                deffered = $http({
                    method: "POST",
                    url: url,
                    data: angular.toJson(jaql)
                });
            return deffered["finally"](function () {
                    var finTime = new Date;
                    console.log("HTTP POST Ajax request to {0} finished in {1} ms".format(url, finTime - staTime))
                }),
            deffered
        }
        this.compileFormula = function (ds, formula, context) {
            var jaql = {
                formula: formula,
                context: context
            };
            return parseJaql(ds, jaql)
        },
        this.runFormula = function (ds, formula, context) {
            var jaql = {
                datasource: ds,
                metadata: [{
                    formula: formula,
                    context: context
                }]
            };
            return executeQuery(jaql)
        },
        this.getMinMax = function (ds, dim, callback) {
            var jaql = {
                datasource: ds,
                metadata: [{
                    dim: dim.id,
                    agg: "min"
                },
                {
                    dim: dim.id,
                    agg: "max"
                }]
            },
                q = executeQuery(jaql);
            q.success(function (data) {
                    var min = data.values[0],
                        max = data.values[1];
                    callback({
                            min: min,
                            max: max
                        })
                })
        },
        this.getMeasureMinMax = function (ds, m, item, callback) {
            if (!defined(item)) return void callback({
                min: -1e3,
                max: 1e3
            });
            var dim = {
                dim: item.jaql.dim
            };
            defined(item.jaql.level) && (dim.level = item.jaql.level);
            var measure;
            measure = defined(m.formula) ? {
                formula: m.formula,
                context: m.context
            } : {
                dim: m.dim,
                agg: m.agg
            };
            var context = {
                D: dim,
                M: measure
            },
                jaql = {
                    datasource: ds,
                    metadata: [{
                        formula: "min(D ,M)",
                        context: context
                    },
                    {
                        formula: "max(D ,M)",
                        context: context
                    }]
                },
                q = executeQuery(jaql);
            q.success(function (data) {
                    var min = data.values[0],
                        max = data.values[1];
                    callback({
                            min: min,
                            max: max
                        })
                })
        },
        this.getCountByFilter = function (ds, dim, filter, callback) {
            if ("string" == typeof dim) var dimId = dim;
            else {
                if ("object" != typeof dim) throw "dimension passed in wrong format.";
                var dimId = dim.id,
                    level = dim.level
            }
            var jaql = {
                datasource: ds,
                metadata: [{
                    dim: dimId,
                    agg: "count"
                }]
            };
            defined(level) && (jaql.metadata[0].level = level),
            "object" == typeof filter && (jaql.metadata[0].scope = {
                dim: dimId,
                filter: filter
            });
            var q = executeQuery(jaql);
            q.success(function (data) {
                var count = data.values[0];
                callback(count)
            })
        },
        this.getMembersForMeasureFilter = function (jaql, callback) {
            executeQuery(jaql).success(function (data) {
                var members = _.map(data.values, function (item) {
                    return item[0]
                });
                callback(members)
            })
        },
        this.getMembersByFilter = function (ds, dim, offset, count, filter) {
            if ("string" == typeof dim) var dimId = dim;
            else {
                if ("object" != typeof dim) throw "dimension passed in wrong format.";
                var dimId = dim.id,
                    level = dim.level
            }
            var jaql = {
                datasource: ds,
                metadata: [{
                    dim: dimId
                }]
            };
            return defined(level) && (jaql.metadata[0].level = level),
            defined(offset) && defined(count) && (jaql.offset = offset, jaql.count = count),
            "object" == typeof filter && (jaql.metadata[0].filter = filter),
            executeQuery(jaql)
        },
        this.getMembers = function (datasource, dim, offset, count, search, searchType, exclude, scope) {
            if (("string" != typeof datasource || 0 == datasource.length) && "object" != typeof datasource) throw "no datasource passed";
            if (!defined(offset) && defined(count) || defined(offset) && !defined(count)) throw "offset & count must both be provided, or neither";
            if (defined(offset) && defined(count) && ("number" != typeof offset || "number" != typeof count)) throw "offset & count must both be numbers";
            if (defined(search) && "string" != typeof search) throw "search value must be a string";
            if (defined(searchType) && "string" != typeof searchType) throw "search type should be a string, or nothing";
            if (defined(exclude) && "boolean" != typeof exclude) throw "exclude flag should be a boolean, or nothing";
            if ("string" == typeof dim) var dimId = dim;
            else {
                if ("object" != typeof dim) throw "dimension passed in wrong format.";
                var dimId = dim.id,
                    level = dim.level
            }
            var sort = "asc";
            (defined(level) || -1 != dimId.toLowerCase().indexOf("(calendar)")) && (sort = "desc");
            var jaql = {
                datasource: datasource,
                metadata: [{
                    dim: dimId,
                    sort: sort
                }]
            };
            if (defined(search)) {
                defined(searchType) || (searchType = "contains");
                var fltr = {};
                fltr[searchType] = search,
                exclude && (fltr = {
                    exclude: fltr
                }),
                jaql.metadata[0].filter = fltr
            }
            return defined(offset) && defined(count) && (jaql.offset = offset, jaql.count = count),
            defined(level) && (jaql.metadata[0].level = level),
            defined(scope) && (jaql.metadata = jaql.metadata.concat(scope)),
            executeQuery(jaql)
        }
    }]),
    mod.service("ldapService", ["$http", "base.services.crypto", "$q", function ($http, crypto, $q) {
        var url = "/api/settings/ldap";
        this.isAdEnabled = function () {
            var deferred = $q.defer();
            return $http.get(url, {
                cache: !1
            }).then(function (response) {
                if (!defined(response, "data") || 200 !== response.status) throw response;
                var data = response.data;
                data = JSON.parse(crypto.decrypt(data.payload, data.token));
                var enabled = data && data.enabled;
                deferred.resolve(enabled)
            })["catch"](function () {
                deferred.reject(arguments)
            }),
            deferred.promise
        }
    }]),
    mod.service("localStorage", [function () {
        var isSupportsHtml5Storage = function () {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch (e) {
                return !1
            }
        }();
        this.isSupported = isSupportsHtml5Storage,
        this.setItem = function (key, value) {
            var result = !1;
            if (isSupportsHtml5Storage) try {
                var json = JSON.stringify(value);
                localStorage.setItem(key, json),
                result = !0
            } catch (e) {
                $$.debug.log("error - userPreferences.setItem(" + key + ")")
            }
            return result
        },
        this.getItem = function (key) {
            var result = null;
            if (isSupportsHtml5Storage) try {
                result = JSON.parse(localStorage.getItem(key))
            } catch (e) {
                $$.debug.log("error - JSON.parse in userPreferences.getItem(" + key + ")"),
                result = localStorage.getItem(key)
            }
            return result
        }
    }]),
    mod.service("permissionsService", ["base.services.$identity", function ($identity) {
        function getAuthenticationObject(source) {
            var authenticationObject;
            return "string" != typeof source ? source.userAuth || source.dashboard.userAuth : authenticationObject = "user" === source ? $$get($identity, "user.userAuth") : $$get(window, this.sourceToGlobalObjects[source])
        }
        this.sourceToGlobalObjects = {
            dashboard: "prism.activeDashboard.userAuth",
            widget: "prism.activeWidget.dashboard.userAuth"
        },
        this.hasPermissions = function (source, path) {
            path = path.replace(/\//g, ".").replace(/^[.\s]+|[.\s]+$/g, "");
            var authenticationObject = getAuthenticationObject.call(this, source),
                result = $$get(authenticationObject, path);
            return result
        }
    }]),
    mod.service("reportingConfig", ["$q", function ($q) {
        var configDefaults = {
            widgets: {
                pivot: {
                    showPager: !1
                },
                basicchart: {
                    showBirdsEye: !1
                },
                scattermap: {
                    showZoomControl: !1
                },
                areamap: {
                    showZoomControl: !1
                }
            }
        },
            config = {},
            enabled = !1;
        this.setConfig = function (conf) {
                enabled = !0,
                config = angular.extend(configDefaults, conf)
            },
        this.getConfig = function () {
                return enabled ? config : {}
            }
    }]),
    mod.service("urlAnalysisService", function () {
        this.isLocalhostServer = function (address) {
            var representations = ["localhost", "127.0.0.1", "0.0.0.0"];
            return address = address || window.location.host,
            ~address.indexOf(":") && (address = address.split(":")[0]),
            _.contains(representations, address.toLowerCase())
        }
    }),
    mod.service("userPreferences", ["$q", "base.services.localStorage", function ($q, localStorage) {
        this.setDefaultDatasource = function (value) {
            var deferred = $q.defer();
            return deferred.resolve(localStorage.setItem("defaultDatasource", value)),
            deferred.promise
        },
        this.getDefaultDatasource = function () {
            var deferred = $q.defer();
            return deferred.resolve(localStorage.getItem("defaultDatasource")),
            deferred.promise
        }
    }]),
    mod.factory("allFactories", ["base.factories.sizeFactory", "base.factories.numericFactory", "base.factories.colorFactory", function (fSize, fNumber, fColor) {
        return {
            color: fColor,
            size: fSize,
            number: fNumber,
            defaults: {
                color: fColor.defaultFormat,
                size: fSize.defaultFormat,
                number: fNumber.defaultFormat
            }
        }
    }]),
    mod.factory("colorFactory", function () {
        function createColorRange(color) {
            var f = .16;
            return [new Color(color).scaleBrightness(2 * f).toHex(), new Color(color).scaleBrightness(1 * f).toHex(), new Color(color).toHex(), new Color(color).scaleBrightness(-1 * f).toHex(), new Color(color).scaleBrightness(-2 * f).toHex()]
        }
        var baseColors = ["#00cee6", "#9b9bd7", "#6EDA55", "#fc7570", "#fbb755", "#218A8C"];
        return {
            types: ["color", "condition", "range"],
            entryTypes: ["colors", "header"],
            createPalette: function (colorsArr) {
                return colorsArr.map(createColorRange)
            },
            regularColors: [
                ["#ff0000", "#ffab03", "#ffff01", "#00a808", "#124c87"],
                ["#ffffff", "#e6e6e6", "#bfbfbf", "#808080", "#000000"]
            ],
            defaultFormat: {
                operators: [">", "≥", "≠", "=", "≤", "<"],
                palette: [createColorRange(baseColors[0]), createColorRange(baseColors[1]), createColorRange(baseColors[2]), createColorRange(baseColors[3]), createColorRange(baseColors[4]), createColorRange(baseColors[5])],
                color: {
                    color: baseColors[0]
                },
                condition: {
                    conditions: [{
                        color: baseColors[3],
                        operator: "<",
                        expression: "0"
                    },
                    {
                        color: baseColors[2],
                        operator: "≥",
                        expression: "0"
                    }]
                },
                range: {
                    mode: "auto",
                    steps: {
                        value: 7,
                        max: 10
                    },
                    min: {
                        color: baseColors[3]
                    },
                    mid: {},
                    max: {
                        color: baseColors[2]
                    }
                }
            }
        }
    }),
    mod.factory("currencyFactory", function () {
        return {
            defaultSymbol: "$",
            majorSymbols: ["$", "€", "£", "¥"]
        }
    }),
    mod.factory("numericFactory", ["base.factories.currencyFactory", function (currencyFactory) {
        return {
            types: ["number", "currency", "percent"],
            defaultFormat: {
                decimals: "auto",
                number: {
                    separated: !0
                },
                currency: {
                    symbol: currencyFactory.defaultSymbol
                },
                percent: {}
            }
        }
    }]),
    mod.factory("sizeFactory", function () {
        return {
            defaultFormat: {
                values: {
                    min: 15,
                    max: 25
                },
                range: {
                    min: 10,
                    max: 50
                }
            }
        }
    }),
    mod.factory("sizing", function () {
        return {
            topmost: 0,
            outergap: 10,
            headerheight: 50,
            toolbarheight: 50,
            midVgap: 3,
            midHgap: 3,
            sidewidth: 240,
            innergap: 8
        }
    }),
    mod.factory("translationLoader", ["$http", "$q", function ($http, $q) {
        return function (options) {
            var deferred = $q.defer(),
                language = {},
                parentKey = "translations.{0}.keys".format(options.key),
                allModules = Object.keys(ModuleManager.modules);
            return _.each(allModules, function (moduleName) {
                    if (ModuleManager.modules.hasOwnProperty(moduleName)) {
                        var module = ModuleManager.modules[moduleName];
                        if (defined(module, parentKey)) {
                            var keys = $$get(module, parentKey);
                            language = $.extend(language, keys)
                        }
                    }
                }),
            deferred.resolve(language),
            deferred.promise
        }
    }]),
    $$["class"]("modelbase").ctor(function () {}).instance({}).attach(mod.models),
    mod.directive("branding", ["$rootScope", "$injector", "$command", function ($rootScope, $injector, $command) {
        return {
            restrict: "A",
            priority: 9999,
            link: function (scope, element, attrs) {
                var $lmnt = $(element),
                    name = attrs.branding,
                    value = null,
                    context = null;
                if (scope.brand && scope.brand.enabled && (value = $$get(scope.brand, name)) && defined(context = attrs.brandingType)) switch (context) {
                    case "logo":
                        $lmnt.css("background", "url(" + value + ") 0 0 no-repeat");
                        break;
                    case "html":
                        $lmnt.html(value);
                        break;
                    case "text":
                        $lmnt.text(value);
                        break;
                    case "email":
                        $lmnt.attr("href", "mailto:" + value),
                        $lmnt.text(value);
                        break;
                    case "iframe":
                        $lmnt.attr("src", value)
                    }
            }
        }
    }]),
    mod.directive("command", ["$rootScope", "$injector", "$command", function ($rootScope, $injector, $command) {
        var attach = function (lmnt, handler) {
            var nodeName = lmnt[0].nodeName;
            switch (nodeName.toLowerCase()) {
            case "div":
            case "a":
            case "button":
                lmnt.on("click", handler)
            }
        },
            dettach = function (lmnt, handler) {
                var nodeName = lmnt[0].nodeName;
                switch (nodeName.toLowerCase()) {
                case "div":
                case "a":
                case "button":
                    lmnt.off("click", handler)
                }
            };
        return {
                restrict: "A",
                priority: 9999,
                link: function (scope, element, attrs) {
                    var $lmnt = $(element),
                        name = attrs.command,
                        context = scope;
                    if (defined(attrs.commandContext) && (context = $$get(context, attrs.commandContext), _.isFunction(context) && (context = context())), defined(attrs.commandVisibility)) {
                            attrs.$observe("commandVisibility", function (newValue) {
                                $$boolean(newValue, !1) ? $lmnt.show() : $lmnt.hide()
                            })
                        }
                    var handler = function () {
                            var commandargs = attrs.commandArgs;
                            defined(commandargs) && (commandargs = scope.$eval(commandargs));
                            var commandResult = $command.execute(name, {
                                $scope: scope,
                                $element: element
                            }, commandargs);
                            defined(commandResult, "finally") && "function" == typeof commandResult["finally"] && ($lmnt.addClass("request-pending"), commandResult["finally"](function () {
                                $lmnt.removeClass("request-pending")
                            }))
                        };
                    attach(element, handler),
                    scope.$on("$destroy", function () {
                            dettach(element, handler)
                        })
                }
            }
    }]),
    mod.directive("handle", [function () {
        return {
            restrict: "A",
            scope: {
                handle: "=handle"
            },
            link: function (scope, element, attrs) {
                scope.handle = $(element)
            }
        }
    }]),
    mod.directive("hasPermission", ["base.services.permissionsService", function (permissionsService) {
        return {
            restrict: "A",
            priority: 9999,
            scope: {
                source: "@",
                path: "@",
                permissionsResult: "=?",
                additionalCondition: "=",
                displayActionIfHasPermission: "@",
                disabledActionIfHasPermission: "@",
                classesHasPermission: "@",
                classesHasNotPermission: "@"
            },
            link: function (scope, element, attrs) {
                function _applyPermissions() {
                    var hasPermission = permissionsService.hasPermissions(scope.source, scope.path),
                        $element = $(element);
                    if (defined(scope.additionalCondition) && !scope.additionalCondition && (hasPermission = !1), scope.permissionsResult = hasPermission, _.contains(displayActionInputs, scope.displayActionIfHasPermission) || (scope.displayActionIfHasPermission = "none"), _.contains(disabledActionInputs, scope.disabledActionIfHasPermission) || (scope.disabledActionIfHasPermission = "none"), "show" === scope.displayActionIfHasPermission && !hasPermission || "hide" === scope.displayActionIfHasPermission && hasPermission) $element.hide();
                    else {
                            if ($element.addClass(hasPermission ? scope.classesHasPermission || "" : scope.classesHasNotPermission || ""), "none" !== scope.disabledActionIfHasPermission) {
                                var disabledValue = "enabled" === scope.disabledActionIfHasPermission && !hasPermission || "disabled" === scope.disabledActionIfHasPermission && hasPermission;
                                $element.attr("ng-disabled", disabledValue)
                            }
                            $element.show()
                        }
                }
                var displayActionInputs = ["none", "show", "hide"],
                    disabledActionInputs = ["none", "enabled", "disabled"],
                    objectToWatch = permissionsService.sourceToGlobalObjects[scope.source];
                objectToWatch ? (scope.prism = prism, scope.$watch(objectToWatch, function (userAuth) {
                        _applyPermissions()
                    })) : _applyPermissions(),
                scope.$watch("additionalCondition", function () {
                        _applyPermissions()
                    })
            }
        }
    }]),
    mod.directive("scroll", function () {
        return {
            restrict: "A",
            priority: 9999,
            link: function (scope, element, attrs) {
                element = element[0];
                var $window = $(window),
                    $element = $(element),
                    $parent = $element.parent(),
                    attr = scope.$eval(attrs.stretch),
                    set = function (siblings, attrvalue, attrname, value) {
                        if (defined(attrvalue)) {
                            var v = $parent[attrname]();
                            if ("fit" == attrvalue) v -= siblings.reduce(function (prev, v) {
                                return prev + $(v)[attrname]()
                            }, 0);
                            else if ("100%" != attrvalue) throw "unsupported attribute value";
                            $element[attrname](v)
                        }
                    },
                    run = function () {
                        var siblings = $parent.children().toArray().filter(function (item) {
                            return item != element
                        });
                        set(siblings, attr.width, "width"),
                        set(siblings, attr.height, "height")
                    };
                $window.on("resize", run),
                scope.$on("destroy", function () {
                        $window.off("resize", run)
                    }),
                run()
            }
        }
    }),
    mod.directive("stretch", function () {
        return {
            restrict: "A",
            priority: 9999,
            link: function (scope, element, attrs) {
                element = element[0];
                var $window = $(window),
                    $element = $(element),
                    $parent = $element.parent(),
                    attr = scope.$eval(attrs.stretch),
                    set = function (siblings, attrvalue, attrname, value) {
                        if (defined(attrvalue)) {
                            var v = $parent[attrname]();
                            if ("fit" == attrvalue) v -= siblings.reduce(function (prev, v) {
                                return prev + $(v)[attrname]()
                            }, 0);
                            else if ("100%" != attrvalue) throw "unsupported attribute value";
                            $element[attrname](v)
                        }
                    },
                    run = function () {
                        var siblings = $parent.children().toArray().filter(function (item) {
                            return item != element
                        });
                        set(siblings, attr.width, "width"),
                        set(siblings, attr.height, "height")
                    };
                $window.on("resize", run),
                scope.$on("destroy", function () {
                        $window.off("resize", run)
                    }),
                run()
            }
        }
    }),
    mod.nginit(),
    mod.ngmod.config(["$httpProvider", "$compileProvider", "tmhDynamicLocaleProvider", function ($httpProvider, $compileProvider, tmhDynamicLocaleProvider) {
        var isIE = /msie/i.test(navigator.userAgent.toLowerCase()) && !window.opera || "Netscape" == navigator.appName && navigator.appVersion && navigator.appVersion.indexOf("rv:11.") > -1,
            isAccountApp = !1;
        try {
                isAccountApp = defined(angular.module("account"))
            } catch (e) {}
        var checkIsAuth = function ($q) {
                var deferred = $q.defer();
                return $.ajax({
                    type: "GET",
                    url: "/api/auth/isauth",
                    success: function (data) {
                        deferred.resolve(data)
                    },
                    error: function (err) {
                        deferred.reject(err)
                    }
                }),
                deferred.promise
            };
        $httpProvider.interceptors.push(function ($q) {
                return {
                    request: function (config) {
                        var sep = -1 === config.url.indexOf("?") ? "?" : "&";
                        return config.cache || !isIE ? -1 != config.url.indexOf("views") && (config.url = config.url + sep + "v=" + prism.version) : isIE && "GET" === config.method && !config.cache && (config.url = config.url + sep + "cacheSlayer=" + (new Date).getTime()),
                        config || $q.when(config)
                    }
                }
            }),
        $httpProvider.interceptors.push(["$q", "$window", function ($q, $window) {
                return {
                    request: function (config) {
                        return config.headers = config.headers || {},
                        $window.sessionStorage.token && (config.headers.Authorization = "Bearer " + $window.sessionStorage.token),
                        config || $q.when(config)
                    },
                    responseError: function (rejection) {
                        if (isAccountApp) return $q.reject(rejection);
                        var status = rejection.status;
                        return 401 == status || 403 == status ? checkIsAuth($q).then(function (authenticationData) {
                            return authenticationData.isAuthenticated ? $q.reject(rejection) : void(authenticationData.ssoEnabled ? window.location.reload() : window.location.href = "/app/account#/login?src=" + encodeURIComponent(window.location.href))
                        })["catch"](function (err) {
                            return $q.reject(rejection)
                        }) : $q.reject(rejection)
                    }
                }
            }]),
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|cube):/),
        tmhDynamicLocaleProvider.localeLocationPattern("/resources/base/localization/angular-locale_{{locale}}.js")
    }]),
    mod.ngmod.run(["$rootScope", "$injector", function ($rootScope, $injector) {
        defined(window.prism.$ngscope) || ($rootScope.brand = $$get(prism, "brand.enabled") ? prism.brand : {}, window.prism.$ngscope = $rootScope, window.prism.$injector = $injector)
    }]),
    $$
});