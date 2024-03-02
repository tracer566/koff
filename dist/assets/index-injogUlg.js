(function () { const r = document.createElement("link").relList; if (r && r.supports && r.supports("modulepreload")) return; for (const a of document.querySelectorAll('link[rel="modulepreload"]')) n(a); new MutationObserver(a => { for (const s of a) if (s.type === "childList") for (const u of s.addedNodes) u.tagName === "LINK" && u.rel === "modulepreload" && n(u) }).observe(document, { childList: !0, subtree: !0 }); function i(a) { const s = {}; return a.integrity && (s.integrity = a.integrity), a.referrerPolicy && (s.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? s.credentials = "include" : a.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s } function n(a) { if (a.ep) return; a.ep = !0; const s = i(a); fetch(a.href, s) } })(); const ge = "modulepreload", me = function (e) { return "/" + e }, q = {}, S = function (r, i, n) { let a = Promise.resolve(); if (i && i.length > 0) { const s = document.getElementsByTagName("link"); a = Promise.all(i.map(u => { if (u = me(u), u in q) return; q[u] = !0; const d = u.endsWith(".css"), _ = d ? '[rel="stylesheet"]' : ""; if (!!n) for (let g = s.length - 1; g >= 0; g--) { const m = s[g]; if (m.href === u && (!d || m.rel === "stylesheet")) return } else if (document.querySelector(`link[href="${u}"]${_}`)) return; const p = document.createElement("link"); if (p.rel = d ? "stylesheet" : ge, d || (p.as = "script", p.crossOrigin = ""), p.href = u, document.head.appendChild(p), d) return new Promise((g, m) => { p.addEventListener("load", g), p.addEventListener("error", () => m(new Error(`Unable to preload CSS for ${u}`))) }) })) } return a.then(() => r()).catch(s => { const u = new Event("vite:preloadError", { cancelable: !0 }); if (u.payload = s, window.dispatchEvent(u), !u.defaultPrevented) throw s }) }; var _e = /([:*])(\w+)/g, ye = "([^/]+)", Ee = /\*/g, Le = "?(?:.*)", Oe = /\/\?/g, Re = "/?([^/]+|)", Pe = "(?:/^|^)", Ae = ""; function z(e) { return e === void 0 && (e = "/"), N() ? location.pathname + location.search + location.hash : e } function h(e) { return e.replace(/\/+$/, "").replace(/^\/+/, "") } function A(e) { return typeof e == "string" } function we(e) { return typeof e == "function" } function w(e) { return e && e.indexOf("#") >= 0 && e.split("#").pop() || "" } function ke(e, r) { return r.length === 0 || !e ? null : e.slice(1, e.length).reduce(function (i, n, a) { return i === null && (i = {}), i[r[a]] = decodeURIComponent(n), i }, null) } function k(e) { var r = h(e).split(/\?(.*)?$/); return [h(r[0]), r.slice(1).join("")] } function T(e) { for (var r = {}, i = e.split("&"), n = 0; n < i.length; n++) { var a = i[n].split("="); if (a[0] !== "") { var s = decodeURIComponent(a[0]); r[s] ? (Array.isArray(r[s]) || (r[s] = [r[s]]), r[s].push(decodeURIComponent(a[1] || ""))) : r[s] = decodeURIComponent(a[1] || "") } } return r } function K(e, r) { var i = k(h(e.currentLocationPath)), n = i[0], a = i[1], s = a === "" ? null : T(a), u = [], d; if (A(r.path)) { if (d = Pe + h(r.path).replace(_e, function (g, m, O) { return u.push(O), ye }).replace(Ee, Le).replace(Oe, Re) + "$", h(r.path) === "" && h(n) === "") return { url: n, queryString: a, hashString: w(e.to), route: r, data: null, params: s } } else d = r.path; var _ = new RegExp(d, Ae), v = n.match(_); if (v) { var p = A(r.path) ? ke(v, u) : v.groups ? v.groups : v.slice(1); return { url: h(n.replace(new RegExp("^" + e.instance.root), "")), queryString: a, hashString: w(e.to), route: r, data: p, params: s } } return !1 } function Q() { return !!(typeof window < "u" && window.history && window.history.pushState) } function L(e, r) { return typeof e[r] > "u" || e[r] === !0 } function Se(e) { if (!e) return {}; var r = e.split(","), i = {}, n; return r.forEach(function (a) { var s = a.split(":").map(function (u) { return u.replace(/(^ +| +$)/g, "") }); switch (s[0]) { case "historyAPIMethod": i.historyAPIMethod = s[1]; break; case "resolveOptionsStrategy": n || (n = {}), n.strategy = s[1]; break; case "resolveOptionsHash": n || (n = {}), n.hash = s[1] === "true"; break; case "updateBrowserURL": case "callHandler": case "updateState": case "force": i[s[0]] = s[1] === "true"; break } }), n && (i.resolveOptions = n), i } function N() { return typeof window < "u" } function be(e, r) { return e === void 0 && (e = []), r === void 0 && (r = {}), e.filter(function (i) { return i }).forEach(function (i) { ["before", "after", "already", "leave"].forEach(function (n) { i[n] && (r[n] || (r[n] = []), r[n].push(i[n])) }) }), r } function E(e, r, i) { var n = r || {}, a = 0; (function s() { if (!e[a]) { i && i(n); return } Array.isArray(e[a]) ? (e.splice.apply(e, [a, 1].concat(e[a][0](n) ? e[a][1] : e[a][2])), s()) : e[a](n, function (u) { typeof u > "u" || u === !0 ? (a += 1, s()) : i && i(n) }) })() } E.if = function (e, r, i) { return Array.isArray(r) || (r = [r]), Array.isArray(i) || (i = [i]), [e, r, i] }; function D(e, r) { typeof e.currentLocationPath > "u" && (e.currentLocationPath = e.to = z(e.instance.root)), e.currentLocationPath = e.instance._checkForAHash(e.currentLocationPath), r() } function b(e, r) { for (var i = 0; i < e.instance.routes.length; i++) { var n = e.instance.routes[i], a = K(e, n); if (a && (e.matches || (e.matches = []), e.matches.push(a), e.resolveOptions.strategy === "ONE")) { r(); return } } r() } function He(e, r) { e.navigateOptions && (typeof e.navigateOptions.shouldResolve < "u" && console.warn('"shouldResolve" is deprecated. Please check the documentation.'), typeof e.navigateOptions.silent < "u" && console.warn('"silent" is deprecated. Please check the documentation.')), r() } function Ce(e, r) { e.navigateOptions.force === !0 ? (e.instance._setCurrent([e.instance._pathToMatchObject(e.to)]), r(!1)) : r() } var W = N(), Fe = Q(); function Te(e, r) { if (L(e.navigateOptions, "updateBrowserURL")) { var i = ("/" + e.to).replace(/\/\//g, "/"), n = W && e.resolveOptions && e.resolveOptions.hash === !0; Fe ? (history[e.navigateOptions.historyAPIMethod || "pushState"](e.navigateOptions.stateObj || {}, e.navigateOptions.title || "", n ? "#" + i : i), location && location.hash && (e.instance.__freezeListening = !0, setTimeout(function () { if (!n) { var a = location.hash; location.hash = "", location.hash = a } e.instance.__freezeListening = !1 }, 1))) : W && (window.location.href = e.to) } r() } function Y(e, r) { var i = e.instance; if (!i.lastResolved()) { r(); return } E(i.lastResolved().map(function (n) { return function (a, s) { if (!n.route.hooks || !n.route.hooks.leave) { s(); return } var u = !1, d = e.instance.matchLocation(n.route.path, e.currentLocationPath, !1); if (n.route.path !== "*") u = !d; else { var _ = e.matches ? e.matches.find(function (v) { return n.route.path === v.route.path }) : !1; u = !_ } if (L(e.navigateOptions, "callHooks") && u) { E(n.route.hooks.leave.map(function (v) { return function (p, g) { return v(function (m) { m === !1 ? e.instance.__markAsClean(e) : g() }, e.matches && e.matches.length > 0 ? e.matches.length === 1 ? e.matches[0] : e.matches : void 0) } }).concat([function () { return s() }])); return } else s() } }), {}, function () { return r() }) } function Ne(e, r) { e.match.route.hooks && e.match.route.hooks.before && L(e.navigateOptions, "callHooks") ? E(e.match.route.hooks.before.map(function (i) { return function (a, s) { return i(function (u) { u === !1 ? e.instance.__markAsClean(e) : s() }, e.match) } }).concat([function () { return r() }])) : r() } function Ie(e, r) { L(e.navigateOptions, "callHandler") && e.match.route.handler(e.match), e.instance.updatePageLinks(), r() } function Ue(e, r) { e.match.route.hooks && e.match.route.hooks.after && L(e.navigateOptions, "callHooks") && e.match.route.hooks.after.forEach(function (i) { return i(e.match) }), r() } function Be(e, r) { var i = e.instance.lastResolved(); if (i && i[0] && i[0].route === e.match.route && i[0].url === e.match.url && i[0].queryString === e.match.queryString) { i.forEach(function (n) { n.route.hooks && n.route.hooks.already && L(e.navigateOptions, "callHooks") && n.route.hooks.already.forEach(function (a) { return a(e.match) }) }), r(!1); return } r() } function Me(e, r) { var i = e.instance._notFoundRoute; if (i) { e.notFoundHandled = !0; var n = k(e.currentLocationPath), a = n[0], s = n[1], u = w(e.to); i.path = h(a); var d = { url: i.path, queryString: s, hashString: u, data: null, route: i, params: s !== "" ? T(s) : null }; e.matches = [d], e.match = d } r() } function je(e, r) { (!e.resolveOptions || e.resolveOptions.noMatchWarning === !1 || typeof e.resolveOptions.noMatchWarning > "u") && console.warn('Navigo: "' + e.currentLocationPath + `" didn't match any of the registered routes.`), r() } function Ge(e, r) { e.instance._setCurrent(null), r() } function J(e, r) { L(e.navigateOptions, "updateState") && e.instance._setCurrent(e.matches), r() } var Z = [Be, Ne, Ie, Ue], V = [Y, Me, E.if(function (e) { var r = e.notFoundHandled; return r }, Z.concat([J]), [je, Ge])]; function C() { return C = Object.assign || function (e) { for (var r = 1; r < arguments.length; r++) { var i = arguments[r]; for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]) } return e }, C.apply(this, arguments) } function X(e, r) { var i = 0; function n() { if (i === e.matches.length) { J(e, r); return } E(Z, C({}, e, { match: e.matches[i] }), function () { i += 1, n() }) } Y(e, n) } function H(e) { e.instance.__markAsClean(e) } function F() { return F = Object.assign || function (e) { for (var r = 1; r < arguments.length; r++) { var i = arguments[r]; for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]) } return e }, F.apply(this, arguments) } var $ = "[data-navigo]"; function qe(e, r) { var i = r || { strategy: "ONE", hash: !1, noMatchWarning: !1, linksSelector: $ }, n = this, a = "/", s = null, u = [], d = !1, _, v = Q(), p = N(); e ? a = h(e) : console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.'); function g(t) { return t.indexOf("#") >= 0 && (i.hash === !0 ? t = t.split("#")[1] || "/" : t = t.split("#")[0]), t } function m(t) { return h(a + "/" + h(t)) } function O(t, o, c, l) { return t = A(t) ? m(t) : t, { name: l || h(String(t)), path: t, handler: o, hooks: be(c) } } function x(t, o, c) { var l = this; return typeof t == "object" && !(t instanceof RegExp) ? (Object.keys(t).forEach(function (f) { if (typeof t[f] == "function") l.on(f, t[f]); else { var y = t[f], R = y.uses, ve = y.as, pe = y.hooks; u.push(O(f, R, [_, pe], ve)) } }), this) : (typeof t == "function" && (c = o, o = t, t = a), u.push(O(t, o, [_, c])), this) } function I(t, o) { if (n.__dirty) { n.__waiting.push(function () { return n.resolve(t, o) }); return } else n.__dirty = !0; t = t ? h(a) + "/" + h(t) : void 0; var c = { instance: n, to: t, currentLocationPath: t, navigateOptions: {}, resolveOptions: F({}, i, o) }; return E([D, b, E.if(function (l) { var f = l.matches; return f && f.length > 0 }, X, V)], c, H), c.matches ? c.matches : !1 } function U(t, o) { if (n.__dirty) { n.__waiting.push(function () { return n.navigate(t, o) }); return } else n.__dirty = !0; t = h(a) + "/" + h(t); var c = { instance: n, to: t, navigateOptions: o || {}, resolveOptions: o && o.resolveOptions ? o.resolveOptions : i, currentLocationPath: g(t) }; E([He, Ce, b, E.if(function (l) { var f = l.matches; return f && f.length > 0 }, X, V), Te, H], c, H) } function ee(t, o, c) { var l = M(t, o); return l !== null ? (U(l.replace(new RegExp("^/?" + a), ""), c), !0) : !1 } function te(t) { return this.routes = u = u.filter(function (o) { return A(t) ? h(o.path) !== h(t) : we(t) ? t !== o.handler : String(o.path) !== String(t) }), this } function re() { v && (this.__popstateListener = function () { n.__freezeListening || I() }, window.addEventListener("popstate", this.__popstateListener)) } function ne() { this.routes = u = [], v && window.removeEventListener("popstate", this.__popstateListener), this.destroyed = d = !0 } function ie(t, o) { return n._notFoundRoute = O("*", t, [_, o], "__NOT_FOUND__"), this } function B() { if (p) return ae().forEach(function (t) { if (t.getAttribute("data-navigo") === "false" || t.getAttribute("target") === "_blank") { t.hasListenerAttached && t.removeEventListener("click", t.navigoHandler); return } t.hasListenerAttached || (t.hasListenerAttached = !0, t.navigoHandler = function (o) { if ((o.ctrlKey || o.metaKey) && o.target.tagName.toLowerCase() === "a") return !1; var c = t.getAttribute("href"); if (typeof c > "u" || c === null) return !1; if (c.match(/^(http|https)/) && typeof URL < "u") try { var l = new URL(c); c = l.pathname + l.search } catch { } var f = Se(t.getAttribute("data-navigo-options")); d || (o.preventDefault(), o.stopPropagation(), n.navigate(h(c), f)) }, t.addEventListener("click", t.navigoHandler)) }), n } function ae() { return p ? [].slice.call(document.querySelectorAll(i.linksSelector || $)) : [] } function oe(t) { return "/" + a + "/" + h(t) } function se(t) { return _ = t, this } function ue() { return s } function M(t, o, c) { var l = u.find(function (R) { return R.name === t }), f = null; if (l) { if (f = l.path, o) for (var y in o) f = f.replace(":" + y, o[y]); f = f.match(/^\//) ? f : "/" + f } return f && c && !c.includeRoot && (f = f.replace(new RegExp("^/" + a), "")), f } function ce(t) { return t.getAttribute("href") } function j(t) { var o = k(h(t)), c = o[0], l = o[1], f = l === "" ? null : T(l), y = w(t), R = O(c, function () { }, [_], c); return { url: c, queryString: l, hashString: y, route: R, data: null, params: f } } function fe() { return j(h(z(a)).replace(new RegExp("^" + a), "")) } function le(t) { var o = { instance: n, currentLocationPath: t, to: t, navigateOptions: {}, resolveOptions: i }; return b(o, function () { }), o.matches ? o.matches : !1 } function he(t, o, c) { typeof o < "u" && (typeof c > "u" || c) && (o = m(o)); var l = { instance: n, to: o, currentLocationPath: o }; D(l, function () { }), typeof t == "string" && (t = typeof c > "u" || c ? m(t) : t); var f = K(l, { name: String(t), path: t, handler: function () { }, hooks: {} }); return f || !1 } function P(t, o, c) { return typeof o == "string" && (o = G(o)), o ? (o.hooks[t] || (o.hooks[t] = []), o.hooks[t].push(c), function () { o.hooks[t] = o.hooks[t].filter(function (l) { return l !== c }) }) : (console.warn("Route doesn't exists: " + o), function () { }) } function G(t) { return typeof t == "string" ? u.find(function (o) { return o.name === m(t) }) : u.find(function (o) { return o.handler === t }) } function de(t) { t.instance.__dirty = !1, t.instance.__waiting.length > 0 && t.instance.__waiting.shift()() } this.root = a, this.routes = u, this.destroyed = d, this.current = s, this.__freezeListening = !1, this.__waiting = [], this.__dirty = !1, this.__markAsClean = de, this.on = x, this.off = te, this.resolve = I, this.navigate = U, this.navigateByName = ee, this.destroy = ne, this.notFound = ie, this.updatePageLinks = B, this.link = oe, this.hooks = se, this.extractGETParameters = function (t) { return k(g(t)) }, this.lastResolved = ue, this.generate = M, this.getLinkPath = ce, this.match = le, this.matchLocation = he, this.getCurrentLocation = fe, this.addBeforeHook = P.bind(this, "before"), this.addAfterHook = P.bind(this, "after"), this.addAlreadyHook = P.bind(this, "already"), this.addLeaveHook = P.bind(this, "leave"), this.getRoute = G, this._pathToMatchObject = j, this._clean = h, this._checkForAHash = g, this._setCurrent = function (t) { return s = n.current = t }, re.call(this), B.call(this) } const De = () => { Promise.all([S(() => import("./index-M5qd_il5.js"), __vite__mapDeps([0, 1])), S(() => import("./swiper-BA1jXL90.js"), __vite__mapDeps([2, 1])), S(() => Promise.resolve({}), __vite__mapDeps([3]))]).then(([{ Navigation: e, Thumbs: r }, i]) => { console.dir(i), console.dir(r), console.dir(e); const n = new i.default(".product__slider-thumbnails", { spaceBetween: 10, slidesPerView: 4, freeMode: !0, watchSlidesProgress: !0 }); new i.default(".product__slider-main", { spaceBetween: 10, navigation: { nextEl: ".product__arrow_next", prevEl: ".product__arrow_prev" }, modules: [e, r], thumbs: { swiper: n } }) }) }, We = () => { De(); const e = new qe("./koff/dist", { linksSelector: 'a[href^="./koff/dist/"]' }); e.on("./koff/dist/", () => { console.log("На главной") }).on("./koff/dist/category", r => { console.log("obj category: ", r), console.log("category") }).on("./koff/dist/favorite", () => { console.log("favorite") }).on("./koff/dist/search", () => { console.log("search") }).on("./koff/dist/product/:id", r => { console.log("product obj: ", r) }).on("./koff/dist/cart", () => { console.log("cart") }).on("./koff/dist/order", () => { console.log("order") }).notFound(() => { }), e.resolve() }; We();
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./koff/dist/assets/index-M5qd_il5.js", "./koff/dist/assets/utils-YjC8BUSu.js", "./koff/dist/assets/swiper-BA1jXL90.js", "./koff/dist/assets/swiper-Be9b3THL.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}

console.log('коммит 11');