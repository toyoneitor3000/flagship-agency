(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[727],{

/***/ 67:
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ 195:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 259:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ nHandler)
});

// NAMESPACE OBJECT: ./node_modules/@auth/core/lib/vendored/cookie.js
var vendored_cookie_namespaceObject = {};
__webpack_require__.r(vendored_cookie_namespaceObject);
__webpack_require__.d(vendored_cookie_namespaceObject, {
  parse: () => (parse),
  serialize: () => (serialize)
});

// NAMESPACE OBJECT: ./src/middleware.ts
var middleware_namespaceObject = {};
__webpack_require__.r(middleware_namespaceObject);
__webpack_require__.d(middleware_namespaceObject, {
  config: () => (config),
  middleware: () => (auth)
});

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/globals.js
async function registerInstrumentation() {
    if ("_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && _ENTRIES.middleware_instrumentation.register) {
        try {
            await _ENTRIES.middleware_instrumentation.register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === "then") {
                return {};
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        construct () {
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        apply (_target, _this, args) {
            if (typeof args[0] === "function") {
                return args[0](proxy);
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    // The condition is true when the "process" module is provided
    if (process !== __webpack_require__.g.process) {
        // prefer local process but global.process has correct "env"
        process.env = __webpack_require__.g.process.env;
        __webpack_require__.g.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, "__import_unsupported", {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals(); //# sourceMappingURL=globals.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/error.js
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/utils.js
/**
 * Converts a Node.js IncomingHttpHeaders object to a Headers object. Any
 * headers with multiple values will be joined with a comma and space. Any
 * headers that have an undefined value will be ignored and others will be
 * coerced to strings.
 *
 * @param nodeHeaders the headers object to convert
 * @returns the converted headers object
 */ function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === "undefined") continue;
            if (typeof v === "number") {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.
  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.
  
  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
/**
 * Converts a Headers object to a Node.js OutgoingHttpHeaders object. This is
 * required to support the set-cookie header, which may have multiple values.
 *
 * @param headers the headers object to convert
 * @returns the converted headers object
 */ function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === "set-cookie") {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
/**
 * Validate the correctness of a user-provided URL.
 */ function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
} //# sourceMappingURL=utils.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js

const responseSymbol = Symbol("response");
const passThroughSymbol = Symbol("passThrough");
const waitUntilSymbol = Symbol("waitUntil");
class FetchEvent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_request){
        this[waitUntilSymbol] = [];
        this[passThroughSymbol] = false;
    }
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        this[waitUntilSymbol].push(promise);
    }
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        super(params.request);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
} //# sourceMappingURL=fetch-event.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":", 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ function removeTrailingSlash(route) {
    return route.replace(/\/$/, "") || "/";
} //# sourceMappingURL=remove-trailing-slash.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ function parsePath(path) {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : "",
            hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
    }
    return {
        pathname: path,
        query: "",
        hash: ""
    };
} //# sourceMappingURL=parse-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js

/**
 * Adds the provided prefix to the given path. It first ensures that the path
 * is indeed starting with a slash.
 */ function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js

/**
 * Similarly to `addPathPrefix`, this function adds a suffix at the end on the
 * provided path. It also works only for paths ensuring the argument starts
 * with a slash.
 */ function addPathSuffix(path, suffix) {
    if (!path.startsWith("/") || !suffix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js

/**
 * Checks if a given path starts with a given prefix. It ensures it matches
 * exactly without containing extra chars. e.g. prefix /docs should replace
 * for /docs, /docs/, /docs/a but not /docsss
 * @param path The path to check.
 * @param prefix The prefix to check against.
 */ function pathHasPrefix(path, prefix) {
    if (typeof path !== "string") {
        return false;
    }
    const { pathname } = parsePath(path);
    return pathname === prefix || pathname.startsWith(prefix + "/");
} //# sourceMappingURL=path-has-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js


/**
 * For a given path and a locale, if the locale is given, it will prefix the
 * locale. The path shouldn't be an API path. If a default locale is given the
 * prefix will be omitted if the locale is already the default locale.
 */ function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if (pathHasPrefix(lower, "/api")) return path;
        if (pathHasPrefix(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return addPathPrefix(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js




function formatNextPathnameInfo(info) {
    let pathname = addLocale(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = removeTrailingSlash(pathname);
    }
    if (info.buildId) {
        pathname = addPathSuffix(addPathPrefix(pathname, "/_next/data/" + info.buildId), info.pathname === "/" ? "index.json" : ".json");
    }
    pathname = addPathPrefix(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith("/") ? addPathSuffix(pathname, "/") : pathname : removeTrailingSlash(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/get-hostname.js
/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(":", 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js
/**
 * For a pathname that may include a locale from a list of locales, it
 * removes the locale from the pathname returning it alongside with the
 * detected locale.
 *
 * @param pathname A pathname that may include a locale.
 * @param locales A list of locales.
 * @returns The detected locale and pathname without locale
 */ function normalizeLocalePath(pathname, locales) {
    let detectedLocale;
    // first item will be empty string from splitting at first char
    const pathnameParts = pathname.split("/");
    (locales || []).some((locale)=>{
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
            detectedLocale = locale;
            pathnameParts.splice(1, 1);
            pathname = pathnameParts.join("/") || "/";
            return true;
        }
        return false;
    });
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js

/**
 * Given a path and a prefix it will remove the prefix when it exists in the
 * given path. It ensures it matches exactly without containing extra chars
 * and if the prefix is not there it will be noop.
 *
 * @param path The path to remove the prefix from.
 * @param prefix The prefix to be removed.
 */ function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!pathHasPrefix(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith("/")) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js



function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
    };
    if (basePath && pathHasPrefix(info.pathname, basePath)) {
        info.pathname = removePathPrefix(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith("/_next/data/") && info.pathname.endsWith(".json")) {
        const paths = info.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : normalizeLocalePath(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : normalizeLocalePath(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/next-url.js




const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
}
const Internal = Symbol("NextURLInternal");
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ""
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = getNextPathnameInfo(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = getHostname(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : detectDomainLocale((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? "";
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return formatNextPathnameInfo({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? "";
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/@edge-runtime/cookies/index.js
var _edge_runtime_cookies = __webpack_require__(283);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/cookies.js
 //# sourceMappingURL=cookies.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/request.js




const INTERNALS = Symbol("internal request");
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        validateURL(url);
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new NextURL(url, {
            headers: toNodeOutgoingHttpHeaders(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _edge_runtime_cookies.RequestCookies(this.headers),
            geo: init.geo || {},
            ip: init.ip,
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/response.js



const response_INTERNALS = Symbol("internal response");
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw new Error("request.headers must be an instance of Headers");
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set("x-middleware-request-" + key, value);
            keys.push(key);
        }
        headers.set("x-middleware-override-headers", keys.join(","));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        this[response_INTERNALS] = {
            cookies: new _edge_runtime_cookies.ResponseCookies(this.headers),
            url: init.url ? new NextURL(init.url, {
                headers: toNodeOutgoingHttpHeaders(this.headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[response_INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === "object" ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set("Location", validateURL(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-rewrite", validateURL(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-next", "1");
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js
/**
 * Given a URL as a string and a base URL it will make the URL relative
 * if the parsed protocol and host is the same as the one in the base
 * URL. Otherwise it returns the same URL string.
 */ function relativizeURL(url, base) {
    const baseURL = typeof base === "string" ? new URL(base) : base;
    const relative = new URL(url, base);
    const origin = baseURL.protocol + "//" + baseURL.host;
    return relative.protocol + "//" + relative.host === origin ? relative.toString().replace(origin, "") : relative.toString();
} //# sourceMappingURL=relativize-url.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/app-router-headers.js
const RSC_HEADER = "RSC";
const ACTION = "Next-Action";
const NEXT_ROUTER_STATE_TREE = "Next-Router-State-Tree";
const NEXT_ROUTER_PREFETCH_HEADER = "Next-Router-Prefetch";
const NEXT_URL = "Next-Url";
const RSC_CONTENT_TYPE_HEADER = "text/x-component";
const RSC_VARY_HEADER = RSC_HEADER + ", " + NEXT_ROUTER_STATE_TREE + ", " + NEXT_ROUTER_PREFETCH_HEADER + ", " + NEXT_URL;
const FLIGHT_PARAMETERS = [
    [
        RSC_HEADER
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH_HEADER
    ]
];
const NEXT_RSC_UNION_QUERY = "_rsc";
const NEXT_DID_POSTPONE_HEADER = "x-nextjs-postponed"; //# sourceMappingURL=app-router-headers.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/shared/lib/modern-browserslist-target.js
var modern_browserslist_target = __webpack_require__(253);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/constants.js


const COMPILER_NAMES = {
    client: "client",
    server: "server",
    edgeServer: "edge-server"
};
/**
 * Headers that are set by the Next.js server and should be stripped from the
 * request headers going to the user's application.
 */ const constants_INTERNAL_HEADERS = (/* unused pure expression or super */ null && ([
    "x-invoke-error",
    "x-invoke-output",
    "x-invoke-path",
    "x-invoke-query",
    "x-invoke-status",
    "x-middleware-invoke"
]));
const COMPILER_INDEXES = {
    [COMPILER_NAMES.client]: 0,
    [COMPILER_NAMES.server]: 1,
    [COMPILER_NAMES.edgeServer]: 2
};
const PHASE_EXPORT = "phase-export";
const PHASE_PRODUCTION_BUILD = "phase-production-build";
const PHASE_PRODUCTION_SERVER = "phase-production-server";
const PHASE_DEVELOPMENT_SERVER = "phase-development-server";
const PHASE_TEST = "phase-test";
const PHASE_INFO = "phase-info";
const PAGES_MANIFEST = "pages-manifest.json";
const APP_PATHS_MANIFEST = "app-paths-manifest.json";
const APP_PATH_ROUTES_MANIFEST = "app-path-routes-manifest.json";
const BUILD_MANIFEST = "build-manifest.json";
const APP_BUILD_MANIFEST = "app-build-manifest.json";
const FUNCTIONS_CONFIG_MANIFEST = "functions-config-manifest.json";
const SUBRESOURCE_INTEGRITY_MANIFEST = "subresource-integrity-manifest";
const NEXT_FONT_MANIFEST = "next-font-manifest";
const EXPORT_MARKER = "export-marker.json";
const EXPORT_DETAIL = "export-detail.json";
const PRERENDER_MANIFEST = "prerender-manifest.json";
const ROUTES_MANIFEST = "routes-manifest.json";
const IMAGES_MANIFEST = "images-manifest.json";
const SERVER_FILES_MANIFEST = "required-server-files.json";
const DEV_CLIENT_PAGES_MANIFEST = "_devPagesManifest.json";
const MIDDLEWARE_MANIFEST = "middleware-manifest.json";
const DEV_MIDDLEWARE_MANIFEST = "_devMiddlewareManifest.json";
const REACT_LOADABLE_MANIFEST = "react-loadable-manifest.json";
const FONT_MANIFEST = "font-manifest.json";
const SERVER_DIRECTORY = "server";
const CONFIG_FILES = (/* unused pure expression or super */ null && ([
    "next.config.js",
    "next.config.mjs"
]));
const BUILD_ID_FILE = "BUILD_ID";
const BLOCKED_PAGES = (/* unused pure expression or super */ null && ([
    "/_document",
    "/_app",
    "/_error"
]));
const CLIENT_PUBLIC_FILES_PATH = "public";
const CLIENT_STATIC_FILES_PATH = "static";
const STRING_LITERAL_DROP_BUNDLE = "__NEXT_DROP_CLIENT_FILE__";
const NEXT_BUILTIN_DOCUMENT = "__NEXT_BUILTIN_DOCUMENT__";
const BARREL_OPTIMIZATION_PREFIX = "__barrel_optimize__";
// server/[entry]/page_client-reference-manifest.js
const CLIENT_REFERENCE_MANIFEST = "client-reference-manifest";
// server/server-reference-manifest
const SERVER_REFERENCE_MANIFEST = "server-reference-manifest";
// server/middleware-build-manifest.js
const MIDDLEWARE_BUILD_MANIFEST = "middleware-build-manifest";
// server/middleware-react-loadable-manifest.js
const MIDDLEWARE_REACT_LOADABLE_MANIFEST = "middleware-react-loadable-manifest";
// static/runtime/main.js
const CLIENT_STATIC_FILES_RUNTIME_MAIN = "main";
const CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = "" + CLIENT_STATIC_FILES_RUNTIME_MAIN + "-app";
// next internal client components chunk for layouts
const APP_CLIENT_INTERNALS = "app-pages-internals";
// static/runtime/react-refresh.js
const CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = "react-refresh";
// static/runtime/amp.js
const CLIENT_STATIC_FILES_RUNTIME_AMP = "amp";
// static/runtime/webpack.js
const CLIENT_STATIC_FILES_RUNTIME_WEBPACK = "webpack";
// static/runtime/polyfills.js
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = "polyfills";
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = Symbol(CLIENT_STATIC_FILES_RUNTIME_POLYFILLS);
const EDGE_RUNTIME_WEBPACK = "edge-runtime-webpack";
const STATIC_PROPS_ID = "__N_SSG";
const SERVER_PROPS_ID = "__N_SSP";
const GOOGLE_FONT_PROVIDER = "https://fonts.googleapis.com/";
const OPTIMIZED_FONT_PROVIDERS = [
    {
        url: GOOGLE_FONT_PROVIDER,
        preconnect: "https://fonts.gstatic.com"
    },
    {
        url: "https://use.typekit.net",
        preconnect: "https://use.typekit.net"
    }
];
const DEFAULT_SERIF_FONT = {
    name: "Times New Roman",
    xAvgCharWidth: 821,
    azAvgWidth: 854.3953488372093,
    unitsPerEm: 2048
};
const DEFAULT_SANS_SERIF_FONT = {
    name: "Arial",
    xAvgCharWidth: 904,
    azAvgWidth: 934.5116279069767,
    unitsPerEm: 2048
};
const STATIC_STATUS_PAGES = (/* unused pure expression or super */ null && ([
    "/500"
]));
const TRACE_OUTPUT_VERSION = 1;
// in `MB`
const TURBO_TRACE_DEFAULT_MEMORY_LIMIT = 6000;
const RSC_MODULE_TYPES = {
    client: "client",
    server: "server"
};
// comparing
// https://nextjs.org/docs/api-reference/edge-runtime
// with
// https://nodejs.org/docs/latest/api/globals.html
const EDGE_UNSUPPORTED_NODE_APIS = (/* unused pure expression or super */ null && ([
    "clearImmediate",
    "setImmediate",
    "BroadcastChannel",
    "ByteLengthQueuingStrategy",
    "CompressionStream",
    "CountQueuingStrategy",
    "DecompressionStream",
    "DomException",
    "MessageChannel",
    "MessageEvent",
    "MessagePort",
    "ReadableByteStreamController",
    "ReadableStreamBYOBRequest",
    "ReadableStreamDefaultController",
    "TransformStreamDefaultController",
    "WritableStreamDefaultController"
]));
const SYSTEM_ENTRYPOINTS = new Set([
    CLIENT_STATIC_FILES_RUNTIME_MAIN,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH,
    CLIENT_STATIC_FILES_RUNTIME_AMP,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP
]); //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/internal-utils.js


const INTERNAL_QUERY_NAMES = [
    "__nextFallback",
    "__nextLocale",
    "__nextInferredLocaleFromDefault",
    "__nextDefaultLocale",
    "__nextIsNotFound",
    NEXT_RSC_UNION_QUERY
];
const EDGE_EXTENDED_INTERNAL_QUERY_NAMES = [
    "__nextDataReq"
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url, isEdge) {
    const isStringUrl = typeof url === "string";
    const instance = isStringUrl ? new URL(url) : url;
    for (const name of INTERNAL_QUERY_NAMES){
        instance.searchParams.delete(name);
    }
    if (isEdge) {
        for (const name of EDGE_EXTENDED_INTERNAL_QUERY_NAMES){
            instance.searchParams.delete(name);
        }
    }
    return isStringUrl ? instance.toString() : instance;
}
/**
 * Strip internal headers from the request headers.
 *
 * @param headers the headers to strip of internal headers
 */ function stripInternalHeaders(headers) {
    for (const key of INTERNAL_HEADERS){
        delete headers[key];
    }
} //# sourceMappingURL=internal-utils.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js


/**
 * Normalizes an app route so it represents the actual request path. Essentially
 * performing the following transformations:
 *
 * - `/(dashboard)/user/[id]/page` to `/user/[id]`
 * - `/(dashboard)/account/page` to `/account`
 * - `/user/[id]/page` to `/user/[id]`
 * - `/account/page` to `/account`
 * - `/page` to `/`
 * - `/(dashboard)/user/[id]/route` to `/user/[id]`
 * - `/(dashboard)/account/route` to `/account`
 * - `/user/[id]/route` to `/user/[id]`
 * - `/account/route` to `/account`
 * - `/route` to `/`
 * - `/` to `/`
 *
 * @param route the app route to normalize
 * @returns the normalized pathname
 */ function normalizeAppPath(route) {
    return ensureLeadingSlash(route.split("/").reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (isGroupSegment(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === "@") {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ""));
}
/**
 * Strips the `.rsc` extension if it's in the pathname.
 * Since this function is used on full urls it checks `?` for searchParams handling.
 */ function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, "$1");
} //# sourceMappingURL=app-paths.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/lib/constants.js
const NEXT_QUERY_PARAM_PREFIX = "nxtP";
const PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
const RSC_PREFETCH_SUFFIX = ".prefetch.rsc";
const RSC_SUFFIX = ".rsc";
const NEXT_DATA_SUFFIX = ".json";
const NEXT_META_SUFFIX = ".meta";
const NEXT_BODY_SUFFIX = ".body";
const NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
const NEXT_CACHE_SOFT_TAGS_HEADER = "x-next-cache-soft-tags";
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
// in seconds
const CACHE_ONE_YEAR = 31536000;
// Patterns to detect middleware files
const MIDDLEWARE_FILENAME = "middleware";
const MIDDLEWARE_LOCATION_REGEXP = (/* unused pure expression or super */ null && (`(?:src/)?${MIDDLEWARE_FILENAME}`));
// Pattern to detect instrumentation hooks file
const INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
// Because on Windows absolute paths in the generated code can break because of numbers, eg 1 in the path,
// we have to use a private alias
const PAGES_DIR_ALIAS = "private-next-pages";
const DOT_NEXT_ALIAS = "private-dot-next";
const ROOT_DIR_ALIAS = "private-next-root-dir";
const APP_DIR_ALIAS = "private-next-app-dir";
const RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
const RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
const RSC_ACTION_PROXY_ALIAS = "private-next-rsc-action-proxy";
const RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = (/* unused pure expression or super */ null && (`You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`));
const SSG_GET_INITIAL_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`));
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`));
const SERVER_PROPS_SSG_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`));
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = (/* unused pure expression or super */ null && (`can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`));
const SERVER_PROPS_EXPORT_ERROR = (/* unused pure expression or super */ null && (`pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`));
const GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
const GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
const UNSTABLE_REVALIDATE_RENAME_ERROR = (/* unused pure expression or super */ null && ("The `unstable_revalidate` property is available for general use.\n" + "Please use `revalidate` instead."));
const GSSP_COMPONENT_MEMBER_ERROR = (/* unused pure expression or super */ null && (`can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`));
const NON_STANDARD_NODE_ENV = (/* unused pure expression or super */ null && (`You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`));
const SSG_FALLBACK_EXPORT_ERROR = (/* unused pure expression or super */ null && (`Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`));
const ESLINT_DEFAULT_DIRS = (/* unused pure expression or super */ null && ([
    "app",
    "pages",
    "components",
    "lib",
    "src"
]));
const ESLINT_PROMPT_VALUES = [
    {
        title: "Strict",
        recommended: true,
        config: {
            extends: "next/core-web-vitals"
        }
    },
    {
        title: "Base",
        config: {
            extends: "next"
        }
    },
    {
        title: "Cancel",
        config: null
    }
];
const SERVER_RUNTIME = {
    edge: "edge",
    experimentalEdge: "experimental-edge",
    nodejs: "nodejs"
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: "shared",
    /**
   * React Server Components layer (rsc).
   */ reactServerComponents: "rsc",
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: "ssr",
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: "action-browser",
    /**
   * The layer for the API routes.
   */ api: "api",
    /**
   * The layer for the middleware code.
   */ middleware: "middleware",
    /**
   * The layer for assets on the edge.
   */ edgeAsset: "edge-asset",
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: "app-pages-browser",
    /**
   * The server bundle layer for metadata routes.
   */ appMetadataRoute: "app-metadata-route",
    /**
   * The layer for the server bundle for App Route handlers.
   */ appRouteHandler: "app-route-handler"
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        server: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler
        ],
        nonClientServerTarget: [
            // plus middleware and pages api
            WEBPACK_LAYERS_NAMES.middleware,
            WEBPACK_LAYERS_NAMES.api
        ],
        app: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.shared
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: "__next_edge_ssr_entry__",
    metadata: "__next_metadata__",
    metadataRoute: "__next_metadata_route__",
    metadataImageMeta: "__next_metadata_image_meta__"
};
 //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js

/**
 * @internal
 */ class ReadonlyHeadersError extends Error {
    constructor(){
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === "symbol") {
                    return ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === "undefined") return;
                // If the original casing exists, return the value.
                return ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === "symbol") {
                    return ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === "undefined") return false;
                // If the original casing exists, return true.
                return ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === "undefined") return true;
                // If the original casing exists, delete the property.
                return ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case "append":
                    case "delete":
                    case "set":
                        return ReadonlyHeadersError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(", ");
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === "string") {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== "undefined") return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== "undefined";
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js


/**
 * @internal
 */ class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case "clear":
                    case "delete":
                    case "set":
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new _edge_runtime_cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            var _fetch___nextGetStaticStore;
            // TODO-APP: change method of getting staticGenerationAsyncStore
            const staticGenerationAsyncStore = fetch.__nextGetStaticStore == null ? void 0 : (_fetch___nextGetStaticStore = fetch.__nextGetStaticStore.call(fetch)) == null ? void 0 : _fetch___nextGetStaticStore.getStore();
            if (staticGenerationAsyncStore) {
                staticGenerationAsyncStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _edge_runtime_cookies.ResponseCookies(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        return new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case "delete":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case "set":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                return target.set(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
} //# sourceMappingURL=request-cookies.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/api-utils/index.js


/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */ function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */ function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === "string") {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== "number" || typeof url !== "string") {
        throw new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`);
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = HeadersAdapter.from(req.headers);
    const previewModeId = headers.get(PRERENDER_REVALIDATE_HEADER);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = (/* unused pure expression or super */ null && (4 * 1024 * 1024));
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __webpack_require__(578);
    const previous = res.getHeader("Set-Cookie");
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === "string" ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
/**
 * Custom error class
 */ class ApiError extends (/* unused pure expression or super */ null && (Error)) {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */ function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */ function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js

class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && checkIsOnDemandRevalidate(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(COOKIE_NAME_PRERENDER_BYPASS)) == null ? void 0 : _cookies_get.value;
        this.isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && cookieValue === previewProps.previewModeId);
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    enable() {
        if (!this._previewModeId) {
            throw new Error("Invariant: previewProps missing previewModeId this should never happen");
        }
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: this._previewModeId,
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/"
        });
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: "",
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            expires: new Date(0)
        });
    }
} //# sourceMappingURL=draft-mode-provider.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js





function getHeaders(headers) {
    const cleaned = HeadersAdapter.from(headers);
    for (const param of FLIGHT_PARAMETERS){
        cleaned.delete(param.toString().toLowerCase());
    }
    return HeadersAdapter.seal(cleaned);
}
function getCookies(headers) {
    const cookies = new _edge_runtime_cookies.RequestCookies(HeadersAdapter.from(headers));
    return RequestCookiesAdapter.seal(cookies);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new _edge_runtime_cookies.RequestCookies(HeadersAdapter.from(headers));
    return MutableRequestCookiesAdapter.wrap(cookies, onUpdateCookies);
}
const RequestAsyncStorageWrapper = {
    /**
   * Wrap the callback with the given store so it can access the underlying
   * store using hooks.
   *
   * @param storage underlying storage object returned by the module
   * @param context context to seed the store
   * @param callback function to call within the scope of the context
   * @returns the result returned by the callback
   */ wrap (storage, { req, res, renderOpts }, callback) {
        let previewProps = undefined;
        if (renderOpts && "previewProps" in renderOpts) {
            // TODO: investigate why previewProps isn't on RenderOpts
            previewProps = renderOpts.previewProps;
        }
        function defaultOnUpdateCookies(cookies) {
            if (res) {
                res.setHeader("Set-Cookie", cookies);
            }
        }
        const cache = {};
        const store = {
            get headers () {
                if (!cache.headers) {
                    // Seal the headers object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.headers = getHeaders(req.headers);
                }
                return cache.headers;
            },
            get cookies () {
                if (!cache.cookies) {
                    // Seal the cookies object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.cookies = getCookies(req.headers);
                }
                return cache.cookies;
            },
            get mutableCookies () {
                if (!cache.mutableCookies) {
                    cache.mutableCookies = getMutableCookies(req.headers, (renderOpts == null ? void 0 : renderOpts.onUpdateCookies) || (res ? defaultOnUpdateCookies : undefined));
                }
                return cache.mutableCookies;
            },
            get draftMode () {
                if (!cache.draftMode) {
                    cache.draftMode = new DraftModeProvider(previewProps, req, this.cookies, this.mutableCookies);
                }
                return cache.draftMode;
            }
        };
        return storage.run(store, callback, store);
    }
}; //# sourceMappingURL=request-async-storage-wrapper.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/async-local-storage.js
var async_local_storage = __webpack_require__(151);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/request-async-storage.external.js

const request_async_storage_external_requestAsyncStorage = (0,async_local_storage/* createAsyncLocalStorage */.P)(); //# sourceMappingURL=request-async-storage.external.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/lib/trace/constants.js
/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
/* eslint-disable no-shadow */ var BaseServerSpan;
(function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
})(BaseServerSpan || (BaseServerSpan = {}));
var LoadComponentsSpan;
(function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
})(LoadComponentsSpan || (LoadComponentsSpan = {}));
var NextServerSpan;
(function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
})(NextServerSpan || (NextServerSpan = {}));
var NextNodeServerSpan;
(function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
})(NextNodeServerSpan || (NextNodeServerSpan = {}));
var StartServerSpan;
(function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
})(StartServerSpan || (StartServerSpan = {}));
var RenderSpan;
(function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
})(RenderSpan || (RenderSpan = {}));
var AppRenderSpan;
(function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
})(AppRenderSpan || (AppRenderSpan = {}));
var RouterSpan;
(function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
})(RouterSpan || (RouterSpan = {}));
var NodeSpan;
(function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
})(NodeSpan || (NodeSpan = {}));
var AppRouteRouteHandlersSpan;
(function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
})(AppRouteRouteHandlersSpan || (AppRouteRouteHandlersSpan = {}));
var ResolveMetadataSpan;
(function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
})(ResolveMetadataSpan || (ResolveMetadataSpan = {}));
// This list is used to filter out spans that are not relevant to the user
const NextVanillaSpanAllowlist = [
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule"
];
 //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/lib/trace/tracer.js

let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if (true) {
    api = __webpack_require__(38);
} else {}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
const isPromise = (p)=>{
    return p !== null && typeof p === "object" && typeof p.then === "function";
};
const closeSpanWithError = (span, error)=>{
    if ((error == null ? void 0 : error.bubble) === true) {
        span.setAttribute("next.bubble", true);
    } else {
        if (error) {
            span.recordException(error);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey("next.rootSpanId");
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer("next.js", "0.0.1");
    }
    getContext() {
        return context;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    withPropagatedContext(carrier, fn, getter) {
        const activeContext = context.active();
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        var _trace_getSpanContext;
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === "function" ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        if (!NextVanillaSpanAllowlist.includes(type) && process.env.NEXT_OTEL_VERBOSE !== "1" || options.hideSpan) {
            return fn();
        }
        const spanName = options.spanName ?? type;
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        let isRootSpan = false;
        if (!spanContext) {
            spanContext = ROOT_CONTEXT;
            isRootSpan = true;
        } else if ((_trace_getSpanContext = trace.getSpanContext(spanContext)) == null ? void 0 : _trace_getSpanContext.isRemote) {
            isRootSpan = true;
        }
        const spanId = getSpanId();
        options.attributes = {
            "next.span_name": spanName,
            "next.span_type": type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                const onCleanup = ()=>{
                    rootSpanAttributesStore.delete(spanId);
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                try {
                    if (fn.length > 1) {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    }
                    const result = fn(span);
                    if (isPromise(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!NextVanillaSpanAllowlist.includes(name) && process.env.NEXT_OTEL_VERBOSE !== "1") {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === "function" && typeof fn === "function") {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === "function") {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})();
 //# sourceMappingURL=tracer.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/adapter.js
















class NextRequestHint extends NextRequest {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    waitUntil() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
}
const headersGetter = {
    keys: (headers)=>Array.from(headers.keys()),
    get: (headers, key)=>headers.get(key) ?? undefined
};
let propagator = (request, fn)=>{
    const tracer = getTracer();
    return tracer.withPropagatedContext(request.headers, fn, headersGetter);
};
let testApisIntercepted = false;
function ensureTestApisIntercepted() {
    if (!testApisIntercepted) {
        testApisIntercepted = true;
        if (process.env.NEXT_PRIVATE_TEST_PROXY === "true") {
            const { interceptTestApis, wrapRequestHandler } = __webpack_require__(895);
            interceptTestApis();
            propagator = wrapRequestHandler(propagator);
        }
    }
}
async function adapter(params) {
    ensureTestApisIntercepted();
    await ensureInstrumentationRegistered();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof self.__BUILD_MANIFEST !== "undefined";
    const prerenderManifest = typeof self.__PRERENDER_MANIFEST === "string" ? JSON.parse(self.__PRERENDER_MANIFEST) : undefined;
    params.request.url = normalizeRscURL(params.request.url);
    const requestUrl = new NextURL(params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestUrl.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestUrl.searchParams.getAll(key);
        if (key !== NEXT_QUERY_PARAM_PREFIX && key.startsWith(NEXT_QUERY_PARAM_PREFIX)) {
            const normalizedKey = key.substring(NEXT_QUERY_PARAM_PREFIX.length);
            requestUrl.searchParams.delete(normalizedKey);
            for (const val of value){
                requestUrl.searchParams.append(normalizedKey, val);
            }
            requestUrl.searchParams.delete(key);
        }
    }
    // Ensure users only see page requests, never data requests.
    const buildId = requestUrl.buildId;
    requestUrl.buildId = "";
    const isDataReq = params.request.headers["x-nextjs-data"];
    if (isDataReq && requestUrl.pathname === "/index") {
        requestUrl.pathname = "/";
    }
    const requestHeaders = fromNodeOutgoingHttpHeaders(params.request.headers);
    const flightHeaders = new Map();
    // Parameters should only be stripped for middleware
    if (!isEdgeRendering) {
        for (const param of FLIGHT_PARAMETERS){
            const key = param.toString().toLowerCase();
            const value = requestHeaders.get(key);
            if (value) {
                flightHeaders.set(key, requestHeaders.get(key));
                requestHeaders.delete(key);
            }
        }
    }
    const normalizeUrl =  false ? 0 : requestUrl;
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input: stripInternalSearchParams(normalizeUrl, true).toString(),
        init: {
            body: params.request.body,
            geo: params.request.geo,
            headers: requestHeaders,
            ip: params.request.ip,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isDataReq) {
        Object.defineProperty(request, "__isData", {
            enumerable: false,
            value: true
        });
    }
    if (!globalThis.__incrementalCache && params.IncrementalCache) {
        globalThis.__incrementalCache = new params.IncrementalCache({
            appDir: true,
            fetchCache: true,
            minimalMode: "production" !== "development",
            fetchCacheKeyPrefix: undefined,
            dev: "production" === "development",
            requestHeaders: params.request.headers,
            requestProtocol: "https",
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: {
                        previewModeId: "development-id"
                    }
                };
            }
        });
    }
    const event = new NextFetchEvent({
        request,
        page: params.page
    });
    let response;
    let cookiesFromResponse;
    response = await propagator(request, ()=>{
        // we only care to make async storage available for middleware
        const isMiddleware = params.page === "/middleware" || params.page === "/src/middleware";
        if (isMiddleware) {
            return RequestAsyncStorageWrapper.wrap(request_async_storage_external_requestAsyncStorage, {
                req: request,
                renderOpts: {
                    onUpdateCookies: (cookies)=>{
                        cookiesFromResponse = cookies;
                    },
                    // @ts-expect-error: TODO: investigate why previewProps isn't on RenderOpts
                    previewProps: (prerenderManifest == null ? void 0 : prerenderManifest.preview) || {
                        previewModeId: "development-id",
                        previewModeEncryptionKey: "",
                        previewModeSigningKey: ""
                    }
                }
            }, ()=>params.handler(request, event));
        }
        return params.handler(request, event);
    });
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw new TypeError("Expected an instance of Response to be returned");
    }
    if (response && cookiesFromResponse) {
        response.headers.set("set-cookie", cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get("x-middleware-rewrite");
    if (response && rewrite) {
        const rewriteUrl = new NextURL(rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if (true) {
            if (rewriteUrl.host === request.nextUrl.host) {
                rewriteUrl.buildId = buildId || rewriteUrl.buildId;
                response.headers.set("x-middleware-rewrite", String(rewriteUrl));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const relativizedRewrite = relativizeURL(String(rewriteUrl), String(requestUrl));
        if (isDataReq && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !(undefined && 0)) {
            response.headers.set("x-nextjs-rewrite", relativizedRewrite);
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get("Location");
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new NextURL(redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (true) {
            if (redirectURL.host === request.nextUrl.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set("Location", String(redirectURL));
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isDataReq) {
            response.headers.delete("Location");
            response.headers.set("x-nextjs-redirect", relativizeURL(String(redirectURL), String(requestUrl)));
        }
    }
    const finalResponse = response ? response : NextResponse.next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get("x-middleware-override-headers");
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set("x-middleware-override-headers", middlewareOverrideHeaders + "," + overwrittenHeaders.join(","));
        }
    }
    return {
        response: finalResponse,
        waitUntil: Promise.all(event[waitUntilSymbol]),
        fetchMetrics: request.fetchMetrics
    };
} //# sourceMappingURL=adapter.js.map

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/cookie.js
var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SessionStore_instances, _SessionStore_chunks, _SessionStore_option, _SessionStore_logger, _SessionStore_chunk, _SessionStore_clean;
// Uncomment to recalculate the estimated size
// of an empty session cookie
// import * as cookie from "../vendored/cookie.js"
// const { serialize } = cookie
// console.log(
//   "Cookie estimated to be ",
//   serialize(`__Secure.authjs.session-token.0`, "", {
//     expires: new Date(),
//     httpOnly: true,
//     maxAge: Number.MAX_SAFE_INTEGER,
//     path: "/",
//     sameSite: "strict",
//     secure: true,
//     domain: "example.com",
//   }).length,
//   " bytes"
// )
const ALLOWED_COOKIE_SIZE = 4096;
// Based on commented out section above
const ESTIMATED_EMPTY_COOKIE_SIZE = 160;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
/**
 * Use secure cookies if the site uses HTTPS
 * This being conditional allows cookies to work non-HTTPS development URLs
 * Honour secure cookie option, which sets 'secure' and also adds '__Secure-'
 * prefix, but enable them by default if the site URL is HTTPS; but not for
 * non-HTTPS URLs like http://localhost which are used in development).
 * For more on prefixes see https://googlechrome.github.io/samples/cookie-prefixes/
 *
 * @TODO Review cookie settings (names, options)
 */ function cookie_defaultCookies(useSecureCookies) {
    const cookiePrefix = useSecureCookies ? "__Secure-" : "";
    return {
        // default cookie options
        sessionToken: {
            name: `${cookiePrefix}authjs.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        callbackUrl: {
            name: `${cookiePrefix}authjs.callback-url`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        csrfToken: {
            // Default to __Host- for CSRF token for additional protection if using useSecureCookies
            // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
            name: `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        pkceCodeVerifier: {
            name: `${cookiePrefix}authjs.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        state: {
            name: `${cookiePrefix}authjs.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        nonce: {
            name: `${cookiePrefix}authjs.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        webauthnChallenge: {
            name: `${cookiePrefix}authjs.challenge`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        }
    };
}
class cookie_SessionStore {
    constructor(option, cookies, logger){
        _SessionStore_instances.add(this);
        _SessionStore_chunks.set(this, {});
        _SessionStore_option.set(this, void 0);
        _SessionStore_logger.set(this, void 0);
        __classPrivateFieldSet(this, _SessionStore_logger, logger, "f");
        __classPrivateFieldSet(this, _SessionStore_option, option, "f");
        if (!cookies) return;
        const { name: sessionCookiePrefix } = option;
        for (const [name, value] of Object.entries(cookies)){
            if (!name.startsWith(sessionCookiePrefix) || !value) continue;
            __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
        }
    }
    /**
     * The JWT Session or database Session ID
     * constructed from the cookie chunks.
     */ get value() {
        // Sort the chunks by their keys before joining
        const sortedKeys = Object.keys(__classPrivateFieldGet(this, _SessionStore_chunks, "f")).sort((a, b)=>{
            const aSuffix = parseInt(a.split(".").pop() || "0");
            const bSuffix = parseInt(b.split(".").pop() || "0");
            return aSuffix - bSuffix;
        });
        // Use the sorted keys to join the chunks in the correct order
        return sortedKeys.map((key)=>__classPrivateFieldGet(this, _SessionStore_chunks, "f")[key]).join("");
    }
    /**
     * Given a cookie value, return new cookies, chunked, to fit the allowed cookie size.
     * If the cookie has changed from chunked to unchunked or vice versa,
     * it deletes the old cookies as well.
     */ chunk(value, options) {
        // Assume all cookies should be cleaned by default
        const cookies = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this);
        // Calculate new chunks
        const chunked = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_chunk).call(this, {
            name: __classPrivateFieldGet(this, _SessionStore_option, "f").name,
            value,
            options: {
                ...__classPrivateFieldGet(this, _SessionStore_option, "f").options,
                ...options
            }
        });
        // Update stored chunks / cookies
        for (const chunk of chunked){
            cookies[chunk.name] = chunk;
        }
        return Object.values(cookies);
    }
    /** Returns a list of cookies that should be cleaned. */ clean() {
        return Object.values(__classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this));
    }
}
_SessionStore_chunks = new WeakMap(), _SessionStore_option = new WeakMap(), _SessionStore_logger = new WeakMap(), _SessionStore_instances = new WeakSet(), _SessionStore_chunk = function _SessionStore_chunk(cookie) {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
    if (chunkCount === 1) {
        __classPrivateFieldGet(this, _SessionStore_chunks, "f")[cookie.name] = cookie.value;
        return [
            cookie
        ];
    }
    const cookies = [];
    for(let i = 0; i < chunkCount; i++){
        const name = `${cookie.name}.${i}`;
        const value = cookie.value.substr(i * CHUNK_SIZE, CHUNK_SIZE);
        cookies.push({
            ...cookie,
            name,
            value
        });
        __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
    }
    __classPrivateFieldGet(this, _SessionStore_logger, "f").debug("CHUNKING_SESSION_COOKIE", {
        message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
        emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
        valueSize: cookie.value.length,
        chunks: cookies.map((c)=>c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
    });
    return cookies;
}, _SessionStore_clean = function _SessionStore_clean() {
    const cleanedChunks = {};
    for(const name in __classPrivateFieldGet(this, _SessionStore_chunks, "f")){
        delete __classPrivateFieldGet(this, _SessionStore_chunks, "f")?.[name];
        cleanedChunks[name] = {
            name,
            value: "",
            options: {
                ...__classPrivateFieldGet(this, _SessionStore_option, "f").options,
                maxAge: 0
            }
        };
    }
    return cleanedChunks;
};

;// CONCATENATED MODULE: ./node_modules/@auth/core/errors.js
/**
 * Base error class for all Auth.js errors.
 * It's optimized to be printed in the server logs in a nicely formatted way
 * via the [`logger.error`](https://authjs.dev/reference/core#logger) option.
 * @noInheritDoc
 */ class AuthError extends Error {
    /** @internal */ constructor(message, errorOptions){
        if (message instanceof Error) {
            super(undefined, {
                cause: {
                    err: message,
                    ...message.cause,
                    ...errorOptions
                }
            });
        } else if (typeof message === "string") {
            if (errorOptions instanceof Error) {
                errorOptions = {
                    err: errorOptions,
                    ...errorOptions.cause
                };
            }
            super(message, errorOptions);
        } else {
            super(undefined, message);
        }
        this.name = this.constructor.name;
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
        this.type = this.constructor.type ?? "AuthError";
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
        this.kind = this.constructor.kind ?? "error";
        Error.captureStackTrace?.(this, this.constructor);
        const url = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
        this.message += `${this.message ? ". " : ""}Read more at ${url}`;
    }
}
/**
 * Thrown when the user's sign-in attempt failed.
 * @noInheritDoc
 */ class SignInError extends AuthError {
}
/** @internal */ SignInError.kind = "signIn";
/**
 * One of the database [`Adapter` methods](https://authjs.dev/reference/core/adapters#methods)
 * failed during execution.
 *
 * :::tip
 * If `debug: true` is set, you can check out `[auth][debug]` in the logs to learn more about the failed adapter method execution.
 * @example
 * ```sh
 * [auth][debug]: adapter_getUserByEmail
 * { "args": [undefined] }
 * ```
 * :::
 * @noInheritDoc
 */ class AdapterError extends AuthError {
}
AdapterError.type = "AdapterError";
/**
 * Thrown when the execution of the [`signIn` callback](https://authjs.dev/reference/core/types#signin) fails
 * or if it returns `false`.
 * @noInheritDoc
 */ class AccessDenied extends AuthError {
}
AccessDenied.type = "AccessDenied";
/**
 * This error occurs when the user cannot finish login.
 * Depending on the provider type, this could have happened for multiple reasons.
 *
 * :::tip
 * Check out `[auth][details]` in the logs to know which provider failed.
 * @example
 * ```sh
 * [auth][details]: { "provider": "github" }
 * ```
 * :::
 *
 * For an [OAuth provider](https://authjs.dev/getting-started/authentication/oauth), possible causes are:
 * - The user denied access to the application
 * - There was an error parsing the OAuth Profile:
 *   Check out the provider's `profile` or `userinfo.request` method to make sure
 *   it correctly fetches the user's profile.
 * - The `signIn` or `jwt` callback methods threw an uncaught error:
 *   Check the callback method implementations.
 *
 * For an [Email provider](https://authjs.dev/getting-started/authentication/email), possible causes are:
 * - The provided email/token combination was invalid/missing:
 *   Check if the provider's `sendVerificationRequest` method correctly sends the email.
 * - The provided email/token combination has expired:
 *   Ask the user to log in again.
 * - There was an error with the database:
 *   Check the database logs.
 *
 * For a [Credentials provider](https://authjs.dev/getting-started/authentication/credentials), possible causes are:
 * - The `authorize` method threw an uncaught error:
 *   Check the provider's `authorize` method.
 * - The `signIn` or `jwt` callback methods threw an uncaught error:
 *   Check the callback method implementations.
 *
 * :::tip
 * Check out `[auth][cause]` in the error message for more details.
 * It will show the original stack trace.
 * :::
 * @noInheritDoc
 */ class CallbackRouteError extends AuthError {
}
CallbackRouteError.type = "CallbackRouteError";
/**
 * Thrown when Auth.js is misconfigured and accidentally tried to require authentication on a custom error page.
 * To prevent an infinite loop, Auth.js will instead render its default error page.
 *
 * To fix this, make sure that the `error` page does not require authentication.
 *
 * Learn more at [Guide: Error pages](https://authjs.dev/guides/pages/error)
 * @noInheritDoc
 */ class ErrorPageLoop extends AuthError {
}
ErrorPageLoop.type = "ErrorPageLoop";
/**
 * One of the [`events` methods](https://authjs.dev/reference/core/types#eventcallbacks)
 * failed during execution.
 *
 * Make sure that the `events` methods are implemented correctly and uncaught errors are handled.
 *
 * Learn more at [`events`](https://authjs.dev/reference/core/types#eventcallbacks)
 * @noInheritDoc
 */ class EventError extends AuthError {
}
EventError.type = "EventError";
/**
 * Thrown when Auth.js is unable to verify a `callbackUrl` value.
 * The browser either disabled cookies or the `callbackUrl` is not a valid URL.
 *
 * Somebody might have tried to manipulate the callback URL that Auth.js uses to redirect the user back to the configured `callbackUrl`/page.
 * This could be a malicious hacker trying to redirect the user to a phishing site.
 * To prevent this, Auth.js checks if the callback URL is valid and throws this error if it is not.
 *
 * There is no action required, but it might be an indicator that somebody is trying to attack your application.
 * @noInheritDoc
 */ class InvalidCallbackUrl extends AuthError {
}
InvalidCallbackUrl.type = "InvalidCallbackUrl";
/**
 * Can be thrown from the `authorize` callback of the Credentials provider.
 * When an error occurs during the `authorize` callback, two things can happen:
 * 1. The user is redirected to the signin page, with `error=CredentialsSignin&code=credentials` in the URL. `code` is configurable.
 * 2. If you throw this error in a framework that handles form actions server-side, this error is thrown, instead of redirecting the user, so you'll need to handle.
 * @noInheritDoc
 */ class CredentialsSignin extends SignInError {
    constructor(){
        super(...arguments);
        /**
         * The error code that is set in the `code` query parameter of the redirect URL.
         *
         *
         * ⚠ NOTE: This property is going to be included in the URL, so make sure it does not hint at sensitive errors.
         *
         * The full error is always logged on the server, if you need to debug.
         *
         * Generally, we don't recommend hinting specifically if the user had either a wrong username or password specifically,
         * try rather something like "Invalid credentials".
         */ this.code = "credentials";
    }
}
CredentialsSignin.type = "CredentialsSignin";
/**
 * One of the configured OAuth or OIDC providers is missing the `authorization`, `token` or `userinfo`, or `issuer` configuration.
 * To perform OAuth or OIDC sign in, at least one of these endpoints is required.
 *
 * Learn more at [`OAuth2Config`](https://authjs.dev/reference/core/providers#oauth2configprofile) or [Guide: OAuth Provider](https://authjs.dev/guides/configuring-oauth-providers)
 * @noInheritDoc
 */ class InvalidEndpoints extends AuthError {
}
InvalidEndpoints.type = "InvalidEndpoints";
/**
 * Thrown when a PKCE, state or nonce OAuth check could not be performed.
 * This could happen if the OAuth provider is configured incorrectly or if the browser is blocking cookies.
 *
 * Learn more at [`checks`](https://authjs.dev/reference/core/providers#checks)
 * @noInheritDoc
 */ class InvalidCheck extends AuthError {
}
InvalidCheck.type = "InvalidCheck";
/**
 * Logged on the server when Auth.js could not decode or encode a JWT-based (`strategy: "jwt"`) session.
 *
 * Possible causes are either a misconfigured `secret` or a malformed JWT or `encode/decode` methods.
 *
 * :::note
 * When this error is logged, the session cookie is destroyed.
 * :::
 *
 * Learn more at [`secret`](https://authjs.dev/reference/core#secret), [`jwt.encode`](https://authjs.dev/reference/core/jwt#encode-1) or [`jwt.decode`](https://authjs.dev/reference/core/jwt#decode-2) for more information.
 * @noInheritDoc
 */ class JWTSessionError extends AuthError {
}
JWTSessionError.type = "JWTSessionError";
/**
 * Thrown if Auth.js is misconfigured. This could happen if you configured an Email provider but did not set up a database adapter,
 * or tried using a `strategy: "database"` session without a database adapter.
 * In both cases, make sure you either remove the configuration or add the missing adapter.
 *
 * Learn more at [Database Adapters](https://authjs.dev/getting-started/database), [Email provider](https://authjs.dev/getting-started/authentication/email) or [Concept: Database session strategy](https://authjs.dev/concepts/session-strategies#database-session)
 * @noInheritDoc
 */ class MissingAdapter extends AuthError {
}
MissingAdapter.type = "MissingAdapter";
/**
 * Thrown similarily to [`MissingAdapter`](https://authjs.dev/reference/core/errors#missingadapter), but only some required methods were missing.
 *
 * Make sure you either remove the configuration or add the missing methods to the adapter.
 *
 * Learn more at [Database Adapters](https://authjs.dev/getting-started/database)
 * @noInheritDoc
 */ class MissingAdapterMethods extends AuthError {
}
MissingAdapterMethods.type = "MissingAdapterMethods";
/**
 * Thrown when a Credentials provider is missing the `authorize` configuration.
 * To perform credentials sign in, the `authorize` method is required.
 *
 * Learn more at [Credentials provider](https://authjs.dev/getting-started/authentication/credentials)
 * @noInheritDoc
 */ class MissingAuthorize extends AuthError {
}
MissingAuthorize.type = "MissingAuthorize";
/**
 * Auth.js requires a secret or multiple secrets to be set, but none was not found. This is used to encrypt cookies, JWTs and other sensitive data.
 *
 * :::note
 * If you are using a framework like Next.js, we try to automatically infer the secret from the `AUTH_SECRET`, `AUTH_SECRET_1`, etc. environment variables.
 * Alternatively, you can also explicitly set the [`AuthConfig.secret`](https://authjs.dev/reference/core#secret) option.
 * :::
 *
 *
 * :::tip
 * To generate a random string, you can use the Auth.js CLI: `npx auth secret`
 * :::
 * @noInheritDoc
 */ class errors_MissingSecret extends AuthError {
}
errors_MissingSecret.type = "MissingSecret";
/**
 * Thrown when an Email address is already associated with an account
 * but the user is trying an OAuth account that is not linked to it.
 *
 * For security reasons, Auth.js does not automatically link OAuth accounts to existing accounts if the user is not signed in.
 *
 * :::tip
 * If you trust the OAuth provider to have verified the user's email address,
 * you can enable automatic account linking by setting [`allowDangerousEmailAccountLinking: true`](https://authjs.dev/reference/core/providers#allowdangerousemailaccountlinking)
 * in the provider configuration.
 * :::
 * @noInheritDoc
 */ class OAuthAccountNotLinked extends SignInError {
}
OAuthAccountNotLinked.type = "OAuthAccountNotLinked";
/**
 * Thrown when an OAuth provider returns an error during the sign in process.
 * This could happen for example if the user denied access to the application or there was a configuration error.
 *
 * For a full list of possible reasons, check out the specification [Authorization Code Grant: Error Response](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1)
 * @noInheritDoc
 */ class OAuthCallbackError extends SignInError {
}
OAuthCallbackError.type = "OAuthCallbackError";
/**
 * This error occurs during an OAuth sign in attempt when the provider's
 * response could not be parsed. This could for example happen if the provider's API
 * changed, or the [`OAuth2Config.profile`](https://authjs.dev/reference/core/providers#oauth2configprofile) method is not implemented correctly.
 * @noInheritDoc
 */ class OAuthProfileParseError extends AuthError {
}
OAuthProfileParseError.type = "OAuthProfileParseError";
/**
 * Logged on the server when Auth.js could not retrieve a session from the database (`strategy: "database"`).
 *
 * The database adapter might be misconfigured or the database is not reachable.
 *
 * Learn more at [Concept: Database session strategy](https://authjs.dev/concepts/session-strategies#database)
 * @noInheritDoc
 */ class SessionTokenError extends AuthError {
}
SessionTokenError.type = "SessionTokenError";
/**
 * Happens when login by [OAuth](https://authjs.dev/getting-started/authentication/oauth) could not be started.
 *
 * Possible causes are:
 * - The Authorization Server is not compliant with the [OAuth 2.0](https://www.ietf.org/rfc/rfc6749.html) or the [OIDC](https://openid.net/specs/openid-connect-core-1_0.html) specification.
 *   Check the details in the error message.
 *
 * :::tip
 * Check out `[auth][details]` in the logs to know which provider failed.
 * @example
 * ```sh
 * [auth][details]: { "provider": "github" }
 * ```
 * :::
 * @noInheritDoc
 */ class OAuthSignInError extends SignInError {
}
OAuthSignInError.type = "OAuthSignInError";
/**
 * Happens when the login by an [Email provider](https://authjs.dev/getting-started/authentication/email) could not be started.
 *
 * Possible causes are:
 * - The email sent from the client is invalid, could not be normalized by [`EmailConfig.normalizeIdentifier`](https://authjs.dev/reference/core/providers/email#normalizeidentifier)
 * - The provided email/token combination has expired:
 *   Ask the user to log in again.
 * - There was an error with the database:
 *   Check the database logs.
 * @noInheritDoc
 */ class EmailSignInError extends SignInError {
}
EmailSignInError.type = "EmailSignInError";
/**
 * Represents an error that occurs during the sign-out process. This error
 * is logged when there are issues in terminating a user's session, either
 * by failing to delete the session from the database (in database session
 * strategies) or encountering issues during other parts of the sign-out
 * process, such as emitting sign-out events or clearing session cookies.
 *
 * The session cookie(s) are emptied even if this error is logged.
 * @noInheritDoc
 */ class SignOutError extends AuthError {
}
SignOutError.type = "SignOutError";
/**
 * Auth.js was requested to handle an operation that it does not support.
 *
 * See [`AuthAction`](https://authjs.dev/reference/core/types#authaction) for the supported actions.
 * @noInheritDoc
 */ class UnknownAction extends AuthError {
}
UnknownAction.type = "UnknownAction";
/**
 * Thrown when a Credentials provider is present but the JWT strategy (`strategy: "jwt"`) is not enabled.
 *
 * Learn more at [`strategy`](https://authjs.dev/reference/core#strategy) or [Credentials provider](https://authjs.dev/getting-started/authentication/credentials)
 * @noInheritDoc
 */ class UnsupportedStrategy extends AuthError {
}
UnsupportedStrategy.type = "UnsupportedStrategy";
/**
 * Thrown when an endpoint was incorrectly called without a provider, or with an unsupported provider.
 * @noInheritDoc
 */ class InvalidProvider extends AuthError {
}
InvalidProvider.type = "InvalidProvider";
/**
 * Thrown when the `trustHost` option was not set to `true`.
 *
 * Auth.js requires the `trustHost` option to be set to `true` since it's relying on the request headers' `host` value.
 *
 * :::note
 * Official Auth.js libraries might attempt to automatically set the `trustHost` option to `true` if the request is coming from a trusted host on a trusted platform.
 * :::
 *
 * Learn more at [`trustHost`](https://authjs.dev/reference/core#trusthost) or [Guide: Deployment](https://authjs.dev/getting-started/deployment)
 * @noInheritDoc
 */ class UntrustedHost extends AuthError {
}
UntrustedHost.type = "UntrustedHost";
/**
 * The user's email/token combination was invalid.
 * This could be because the email/token combination was not found in the database,
 * or because the token has expired. Ask the user to log in again.
 * @noInheritDoc
 */ class Verification extends AuthError {
}
Verification.type = "Verification";
/**
 * Error for missing CSRF tokens in client-side actions (`signIn`, `signOut`, `useSession#update`).
 * Thrown when actions lack the double submit cookie, essential for CSRF protection.
 *
 * CSRF ([Cross-Site Request Forgery](https://owasp.org/www-community/attacks/csrf))
 * is an attack leveraging authenticated user credentials for unauthorized actions.
 *
 * Double submit cookie pattern, a CSRF defense, requires matching values in a cookie
 * and request parameter. More on this at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/CSRF).
 * @noInheritDoc
 */ class MissingCSRF extends SignInError {
}
MissingCSRF.type = "MissingCSRF";
const clientErrors = new Set([
    "CredentialsSignin",
    "OAuthAccountNotLinked",
    "OAuthCallbackError",
    "AccessDenied",
    "Verification",
    "MissingCSRF",
    "AccountNotLinked",
    "WebAuthnVerificationError"
]);
/**
 * Used to only allow sending a certain subset of errors to the client.
 * Errors are always logged on the server, but to prevent leaking sensitive information,
 * only a subset of errors are sent to the client as-is.
 * @internal
 */ function isClientError(error) {
    if (error instanceof AuthError) return clientErrors.has(error.type);
    return false;
}
/**
 * Thrown when multiple providers have `enableConditionalUI` set to `true`.
 * Only one provider can have this option enabled at a time.
 * @noInheritDoc
 */ class DuplicateConditionalUI extends AuthError {
}
DuplicateConditionalUI.type = "DuplicateConditionalUI";
/**
 * Thrown when a WebAuthn provider has `enableConditionalUI` set to `true` but no formField has `webauthn` in its autocomplete param.
 *
 * The `webauthn` autocomplete param is required for conditional UI to work.
 * @noInheritDoc
 */ class MissingWebAuthnAutocomplete extends AuthError {
}
MissingWebAuthnAutocomplete.type = "MissingWebAuthnAutocomplete";
/**
 * Thrown when a WebAuthn provider fails to verify a client response.
 * @noInheritDoc
 */ class WebAuthnVerificationError extends AuthError {
}
WebAuthnVerificationError.type = "WebAuthnVerificationError";
/**
 * Thrown when an Email address is already associated with an account
 * but the user is trying an account that is not linked to it.
 *
 * For security reasons, Auth.js does not automatically link accounts to existing accounts if the user is not signed in.
 * @noInheritDoc
 */ class AccountNotLinked extends SignInError {
}
AccountNotLinked.type = "AccountNotLinked";
/**
 * Thrown when an experimental feature is used but not enabled.
 * @noInheritDoc
 */ class ExperimentalFeatureNotEnabled extends AuthError {
}
ExperimentalFeatureNotEnabled.type = "ExperimentalFeatureNotEnabled";

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/assert.js


let warned = false;
function isValidHttpUrl(url, baseUrl) {
    try {
        return /^https?:/.test(new URL(url, url.startsWith("/") ? baseUrl : undefined).protocol);
    } catch  {
        return false;
    }
}
function isSemverString(version) {
    return /^v\d+(?:\.\d+){0,2}$/.test(version);
}
let hasCredentials = false;
let hasEmail = false;
let hasWebAuthn = false;
const emailMethods = [
    "createVerificationToken",
    "useVerificationToken",
    "getUserByEmail"
];
const sessionMethods = [
    "createUser",
    "getUser",
    "getUserByEmail",
    "getUserByAccount",
    "updateUser",
    "linkAccount",
    "createSession",
    "getSessionAndUser",
    "updateSession",
    "deleteSession"
];
const webauthnMethods = [
    "createUser",
    "getUser",
    "linkAccount",
    "getAccount",
    "getAuthenticator",
    "createAuthenticator",
    "listAuthenticatorsByUserId",
    "updateAuthenticatorCounter"
];
/**
 * Verify that the user configured Auth.js correctly.
 * Good place to mention deprecations as well.
 *
 * This is invoked before the init method, so default values are not available yet.
 */ function assertConfig(request, options) {
    const { url } = request;
    const warnings = [];
    if (!warned && options.debug) warnings.push("debug-enabled");
    if (!options.trustHost) {
        return new UntrustedHost(`Host must be trusted. URL was: ${request.url}`);
    }
    if (!options.secret?.length) {
        return new errors_MissingSecret("Please define a `secret`");
    }
    const callbackUrlParam = request.query?.callbackUrl;
    if (callbackUrlParam && !isValidHttpUrl(callbackUrlParam, url.origin)) {
        return new InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlParam}`);
    }
    const { callbackUrl: defaultCallbackUrl } = cookie_defaultCookies(options.useSecureCookies ?? url.protocol === "https:");
    const callbackUrlCookie = request.cookies?.[options.cookies?.callbackUrl?.name ?? defaultCallbackUrl.name];
    if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.origin)) {
        return new InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlCookie}`);
    }
    // Keep track of webauthn providers that use conditional UI
    let hasConditionalUIProvider = false;
    for (const p of options.providers){
        const provider = typeof p === "function" ? p() : p;
        if ((provider.type === "oauth" || provider.type === "oidc") && !(provider.issuer ?? provider.options?.issuer)) {
            const { authorization: a, token: t, userinfo: u } = provider;
            let key;
            if (typeof a !== "string" && !a?.url) key = "authorization";
            else if (typeof t !== "string" && !t?.url) key = "token";
            else if (typeof u !== "string" && !u?.url) key = "userinfo";
            if (key) {
                return new InvalidEndpoints(`Provider "${provider.id}" is missing both \`issuer\` and \`${key}\` endpoint config. At least one of them is required`);
            }
        }
        if (provider.type === "credentials") hasCredentials = true;
        else if (provider.type === "email") hasEmail = true;
        else if (provider.type === "webauthn") {
            hasWebAuthn = true;
            // Validate simpleWebAuthnBrowserVersion
            if (provider.simpleWebAuthnBrowserVersion && !isSemverString(provider.simpleWebAuthnBrowserVersion)) {
                return new AuthError(`Invalid provider config for "${provider.id}": simpleWebAuthnBrowserVersion "${provider.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
            }
            if (provider.enableConditionalUI) {
                // Make sure only one webauthn provider has "enableConditionalUI" set to true
                if (hasConditionalUIProvider) {
                    return new DuplicateConditionalUI(`Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time`);
                }
                hasConditionalUIProvider = true;
                // Make sure at least one formField has "webauthn" in its autocomplete param
                const hasWebauthnFormField = Object.values(provider.formFields).some((f)=>f.autocomplete && f.autocomplete.toString().indexOf("webauthn") > -1);
                if (!hasWebauthnFormField) {
                    return new MissingWebAuthnAutocomplete(`Provider "${provider.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
                }
            }
        }
    }
    if (hasCredentials) {
        const dbStrategy = options.session?.strategy === "database";
        const onlyCredentials = !options.providers.some((p)=>(typeof p === "function" ? p() : p).type !== "credentials");
        if (dbStrategy && onlyCredentials) {
            return new UnsupportedStrategy("Signing in with credentials only supported if JWT strategy is enabled");
        }
        const credentialsNoAuthorize = options.providers.some((p)=>{
            const provider = typeof p === "function" ? p() : p;
            return provider.type === "credentials" && !provider.authorize;
        });
        if (credentialsNoAuthorize) {
            return new MissingAuthorize("Must define an authorize() handler to use credentials authentication provider");
        }
    }
    const { adapter, session } = options;
    const requiredMethods = [];
    if (hasEmail || session?.strategy === "database" || !session?.strategy && adapter) {
        if (hasEmail) {
            if (!adapter) return new MissingAdapter("Email login requires an adapter");
            requiredMethods.push(...emailMethods);
        } else {
            if (!adapter) return new MissingAdapter("Database session requires an adapter");
            requiredMethods.push(...sessionMethods);
        }
    }
    if (hasWebAuthn) {
        // Log experimental warning
        if (options.experimental?.enableWebAuthn) {
            warnings.push("experimental-webauthn");
        } else {
            return new ExperimentalFeatureNotEnabled("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
        }
        if (!adapter) return new MissingAdapter("WebAuthn requires an adapter");
        requiredMethods.push(...webauthnMethods);
    }
    if (adapter) {
        const missing = requiredMethods.filter((m)=>!(m in adapter));
        if (missing.length) {
            return new MissingAdapterMethods(`Required adapter methods were missing: ${missing.join(", ")}`);
        }
    }
    if (!warned) warned = true;
    return warnings;
}

;// CONCATENATED MODULE: ./node_modules/@panva/hkdf/dist/web/runtime/hkdf.js
const getGlobal = ()=>{
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (false) {}
    throw new Error("unable to locate global object");
};
/* harmony default export */ const hkdf = (async (digest, ikm, salt, info, keylen)=>{
    const { crypto: { subtle } } = getGlobal();
    return new Uint8Array(await subtle.deriveBits({
        name: "HKDF",
        hash: `SHA-${digest.substr(3)}`,
        salt,
        info
    }, await subtle.importKey("raw", ikm, "HKDF", false, [
        "deriveBits"
    ]), keylen << 3));
});

;// CONCATENATED MODULE: ./node_modules/@panva/hkdf/dist/web/index.js

function normalizeDigest(digest) {
    switch(digest){
        case "sha256":
        case "sha384":
        case "sha512":
        case "sha1":
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === "string") return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array)) throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, "ikm");
    if (!ikm.byteLength) throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, "info");
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== "number" || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function web_hkdf(digest, ikm, salt, info, keylen) {
    return hkdf(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, "salt"), normalizeInfo(info), normalizeKeylen(keylen, digest));
}


;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/digest.js
async function digest(algorithm, data) {
    const subtleDigest = `SHA-${algorithm.slice(-3)}`;
    return new Uint8Array(await crypto.subtle.digest(subtleDigest, data));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/buffer_utils.js
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const MAX_INT32 = 2 ** 32;
function concat(...buffers) {
    const size = buffers.reduce((acc, { length })=>acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    for (const buffer of buffers){
        buf.set(buffer, i);
        i += buffer.length;
    }
    return buf;
}
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([
        value >>> 24,
        value >>> 16,
        value >>> 8,
        value & 0xff
    ], offset);
}
function uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
}
function uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
}
function encode(string) {
    const bytes = new Uint8Array(string.length);
    for(let i = 0; i < string.length; i++){
        const code = string.charCodeAt(i);
        if (code > 127) {
            throw new TypeError("non-ASCII string encountered in encode()");
        }
        bytes[i] = code;
    }
    return bytes;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/base64.js
function encodeBase64(input) {
    if (Uint8Array.prototype.toBase64) {
        return input.toBase64();
    }
    const CHUNK_SIZE = 0x8000;
    const arr = [];
    for(let i = 0; i < input.length; i += CHUNK_SIZE){
        arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join(""));
}
function decodeBase64(encoded) {
    if (Uint8Array.fromBase64) {
        return Uint8Array.fromBase64(encoded);
    }
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++){
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/util/base64url.js


function decode(input) {
    if (Uint8Array.fromBase64) {
        return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), {
            alphabet: "base64url"
        });
    }
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = decoder.decode(encoded);
    }
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    try {
        return decodeBase64(encoded);
    } catch  {
        throw new TypeError("The input to be decoded is not correctly encoded.");
    }
}
function base64url_encode(input) {
    let unencoded = input;
    if (typeof unencoded === "string") {
        unencoded = encoder.encode(unencoded);
    }
    if (Uint8Array.prototype.toBase64) {
        return unencoded.toBase64({
            alphabet: "base64url",
            omitPadding: true
        });
    }
    return encodeBase64(unencoded).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/util/errors.js
class JOSEError extends Error {
    static{
        this.code = "ERR_JOSE_GENERIC";
    }
    constructor(message, options){
        super(message, options);
        this.code = "ERR_JOSE_GENERIC";
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class JWTClaimValidationFailed extends JOSEError {
    static{
        this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    }
    constructor(message, payload, claim = "unspecified", reason = "unspecified"){
        super(message, {
            cause: {
                claim,
                reason,
                payload
            }
        });
        this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
class JWTExpired extends JOSEError {
    static{
        this.code = "ERR_JWT_EXPIRED";
    }
    constructor(message, payload, claim = "unspecified", reason = "unspecified"){
        super(message, {
            cause: {
                claim,
                reason,
                payload
            }
        });
        this.code = "ERR_JWT_EXPIRED";
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
class JOSEAlgNotAllowed extends JOSEError {
    static{
        this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
    }
    constructor(...args){
        super(...args);
        this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
    }
}
class JOSENotSupported extends JOSEError {
    static{
        this.code = "ERR_JOSE_NOT_SUPPORTED";
    }
    constructor(...args){
        super(...args);
        this.code = "ERR_JOSE_NOT_SUPPORTED";
    }
}
class JWEDecryptionFailed extends JOSEError {
    static{
        this.code = "ERR_JWE_DECRYPTION_FAILED";
    }
    constructor(message = "decryption operation failed", options){
        super(message, options);
        this.code = "ERR_JWE_DECRYPTION_FAILED";
    }
}
class JWEInvalid extends JOSEError {
    static{
        this.code = "ERR_JWE_INVALID";
    }
    constructor(...args){
        super(...args);
        this.code = "ERR_JWE_INVALID";
    }
}
class JWSInvalid extends JOSEError {
    static{
        this.code = "ERR_JWS_INVALID";
    }
    constructor(...args){
        super(...args);
        this.code = "ERR_JWS_INVALID";
    }
}
class JWTInvalid extends JOSEError {
    static{
        this.code = "ERR_JWT_INVALID";
    }
    constructor(...args){
        super(...args);
        this.code = "ERR_JWT_INVALID";
    }
}
class JWKInvalid extends JOSEError {
    static{
        this.code = "ERR_JWK_INVALID";
    }
    constructor(...args){
        super(...args);
        this.code = "ERR_JWK_INVALID";
    }
}
class JWKSInvalid extends JOSEError {
    static{
        this.code = "ERR_JWKS_INVALID";
    }
    constructor(...args){
        super(...args);
        this.code = "ERR_JWKS_INVALID";
    }
}
class JWKSNoMatchingKey extends JOSEError {
    static{
        this.code = "ERR_JWKS_NO_MATCHING_KEY";
    }
    constructor(message = "no applicable key found in the JSON Web Key Set", options){
        super(message, options);
        this.code = "ERR_JWKS_NO_MATCHING_KEY";
    }
}
let prop;
class JWKSMultipleMatchingKeys extends JOSEError {
    static{
        prop = Symbol.asyncIterator;
    }
    static{
        this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    }
    constructor(message = "multiple matching keys found in the JSON Web Key Set", options){
        super(message, options);
        this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    }
}
class JWKSTimeout extends JOSEError {
    static{
        this.code = "ERR_JWKS_TIMEOUT";
    }
    constructor(message = "request timed out", options){
        super(message, options);
        this.code = "ERR_JWKS_TIMEOUT";
    }
}
class JWSSignatureVerificationFailed extends JOSEError {
    static{
        this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    }
    constructor(message = "signature verification failed", options){
        super(message, options);
        this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/is_key_like.js
function assertCryptoKey(key) {
    if (!isCryptoKey(key)) {
        throw new Error("CryptoKey instance expected");
    }
}
const isCryptoKey = (key)=>{
    if (key?.[Symbol.toStringTag] === "CryptoKey") return true;
    try {
        return key instanceof CryptoKey;
    } catch  {
        return false;
    }
};
const isKeyObject = (key)=>key?.[Symbol.toStringTag] === "KeyObject";
const isKeyLike = (key)=>isCryptoKey(key) || isKeyObject(key);

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/is_object.js
const isObjectLike = (value)=>typeof value === "object" && value !== null;
function isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while(Object.getPrototypeOf(proto) !== null){
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/is_jwk.js

const isJWK = (key)=>isObject(key) && typeof key.kty === "string";
const isPrivateJWK = (key)=>key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string");
const isPublicJWK = (key)=>key.kty !== "oct" && key.d === undefined && key.priv === undefined;
const isSecretJWK = (key)=>key.kty === "oct" && typeof key.k === "string";

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/invalid_key_input.js
function message(msg, actual, ...types) {
    types = types.filter(Boolean);
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(", ")}, or ${last}.`;
    } else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
    } else {
        msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
        msg += ` Received ${actual}`;
    } else if (typeof actual === "function" && actual.name) {
        msg += ` Received function ${actual.name}`;
    } else if (typeof actual === "object" && actual != null) {
        if (actual.constructor?.name) {
            msg += ` Received an instance of ${actual.constructor.name}`;
        }
    }
    return msg;
}
const invalidKeyInput = (actual, ...types)=>message("Key must be ", actual, ...types);
const withAlg = (alg, actual, ...types)=>message(`Key for the ${alg} algorithm must be `, actual, ...types);

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/key_to_jwk.js



async function keyToJWK(key) {
    if (isKeyObject(key)) {
        if (key.type === "secret") {
            key = key.export();
        } else {
            return key.export({
                format: "jwk"
            });
        }
    }
    if (key instanceof Uint8Array) {
        return {
            kty: "oct",
            k: base64url_encode(key)
        };
    }
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "Uint8Array"));
    }
    if (!key.extractable) {
        throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
    }
    const { ext, key_ops, alg, use, ...jwk } = await crypto.subtle.exportKey("jwk", key);
    if (jwk.kty === "AKP") {
        ;
        jwk.alg = alg;
    }
    return jwk;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/key/export.js


async function exportSPKI(key) {
    return exportPublic(key);
}
async function exportPKCS8(key) {
    return exportPrivate(key);
}
async function exportJWK(key) {
    return keyToJWK(key);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/jwk/thumbprint.js








const check = (value, description)=>{
    if (typeof value !== "string" || !value) {
        throw new JWKInvalid(`${description} missing or invalid`);
    }
};
async function calculateJwkThumbprint(key, digestAlgorithm) {
    let jwk;
    if (isJWK(key)) {
        jwk = key;
    } else if (isKeyLike(key)) {
        jwk = await exportJWK(key);
    } else {
        throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
    }
    digestAlgorithm ??= "sha256";
    if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") {
        throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch(jwk.kty){
        case "AKP":
            check(jwk.alg, '"alg" (Algorithm) Parameter');
            check(jwk.pub, '"pub" (Public key) Parameter');
            components = {
                alg: jwk.alg,
                kty: jwk.kty,
                pub: jwk.pub
            };
            break;
        case "EC":
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x,
                y: jwk.y
            };
            break;
        case "OKP":
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x
            };
            break;
        case "RSA":
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = {
                e: jwk.e,
                kty: jwk.kty,
                n: jwk.n
            };
            break;
        case "oct":
            check(jwk.k, '"k" (Key Value) Parameter');
            components = {
                k: jwk.k,
                kty: jwk.kty
            };
            break;
        default:
            throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encode(JSON.stringify(components));
    return base64url_encode(await digest(digestAlgorithm, data));
}
async function calculateJwkThumbprintUri(key, digestAlgorithm) {
    digestAlgorithm ??= "sha256";
    const thumbprint = await calculateJwkThumbprint(key, digestAlgorithm);
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/private_symbols.js
const unprotected = Symbol();

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/iv.js

function bitLength(alg) {
    switch(alg){
        case "A128GCM":
        case "A128GCMKW":
        case "A192GCM":
        case "A192GCMKW":
        case "A256GCM":
        case "A256GCMKW":
            return 96;
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            return 128;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
const generateIv = (alg)=>crypto.getRandomValues(new Uint8Array(bitLength(alg) >> 3));

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/check_iv_length.js


function checkIvLength(enc, iv) {
    if (iv.length << 3 !== bitLength(enc)) {
        throw new JWEInvalid("Invalid Initialization Vector length");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/check_cek_length.js

function checkCekLength(cek, expected) {
    const actual = cek.byteLength << 3;
    if (actual !== expected) {
        throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/crypto_key.js
const unusable = (name, prop = "algorithm.name")=>new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
const isAlgorithm = (algorithm, name)=>algorithm.name === name;
function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
    switch(alg){
        case "ES256":
            return "P-256";
        case "ES384":
            return "P-384";
        case "ES512":
            return "P-521";
        default:
            throw new Error("unreachable");
    }
}
function checkUsage(key, usage) {
    if (usage && !key.usages.includes(usage)) {
        throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
    }
}
function checkSigCryptoKey(key, alg, usage) {
    switch(alg){
        case "HS256":
        case "HS384":
        case "HS512":
            {
                if (!isAlgorithm(key.algorithm, "HMAC")) throw unusable("HMAC");
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
                break;
            }
        case "RS256":
        case "RS384":
        case "RS512":
            {
                if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5")) throw unusable("RSASSA-PKCS1-v1_5");
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
                break;
            }
        case "PS256":
        case "PS384":
        case "PS512":
            {
                if (!isAlgorithm(key.algorithm, "RSA-PSS")) throw unusable("RSA-PSS");
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
                break;
            }
        case "Ed25519":
        case "EdDSA":
            {
                if (!isAlgorithm(key.algorithm, "Ed25519")) throw unusable("Ed25519");
                break;
            }
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
            {
                if (!isAlgorithm(key.algorithm, alg)) throw unusable(alg);
                break;
            }
        case "ES256":
        case "ES384":
        case "ES512":
            {
                if (!isAlgorithm(key.algorithm, "ECDSA")) throw unusable("ECDSA");
                const expected = getNamedCurve(alg);
                const actual = key.algorithm.namedCurve;
                if (actual !== expected) throw unusable(expected, "algorithm.namedCurve");
                break;
            }
        default:
            throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usage);
}
function checkEncCryptoKey(key, alg, usage) {
    switch(alg){
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            {
                if (!isAlgorithm(key.algorithm, "AES-GCM")) throw unusable("AES-GCM");
                const expected = parseInt(alg.slice(1, 4), 10);
                const actual = key.algorithm.length;
                if (actual !== expected) throw unusable(expected, "algorithm.length");
                break;
            }
        case "A128KW":
        case "A192KW":
        case "A256KW":
            {
                if (!isAlgorithm(key.algorithm, "AES-KW")) throw unusable("AES-KW");
                const expected = parseInt(alg.slice(1, 4), 10);
                const actual = key.algorithm.length;
                if (actual !== expected) throw unusable(expected, "algorithm.length");
                break;
            }
        case "ECDH":
            {
                switch(key.algorithm.name){
                    case "ECDH":
                    case "X25519":
                        break;
                    default:
                        throw unusable("ECDH or X25519");
                }
                break;
            }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
            if (!isAlgorithm(key.algorithm, "PBKDF2")) throw unusable("PBKDF2");
            break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            {
                if (!isAlgorithm(key.algorithm, "RSA-OAEP")) throw unusable("RSA-OAEP");
                const expected = parseInt(alg.slice(9), 10) || 1;
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
                break;
            }
        default:
            throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usage);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/encrypt.js








async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    if (!(cek instanceof Uint8Array)) {
        throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, [
        "encrypt"
    ]);
    const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
        hash: `SHA-${keySize << 1}`,
        name: "HMAC"
    }, false, [
        "sign"
    ]);
    const ciphertext = new Uint8Array(await crypto.subtle.encrypt({
        iv: iv,
        name: "AES-CBC"
    }, encKey, plaintext));
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const tag = new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    return {
        ciphertext,
        tag,
        iv
    };
}
async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
        encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, [
            "encrypt"
        ]);
    } else {
        checkEncCryptoKey(cek, enc, "encrypt");
        encKey = cek;
    }
    const encrypted = new Uint8Array(await crypto.subtle.encrypt({
        additionalData: aad,
        iv: iv,
        name: "AES-GCM",
        tagLength: 128
    }, encKey, plaintext));
    const tag = encrypted.slice(-16);
    const ciphertext = encrypted.slice(0, -16);
    return {
        ciphertext,
        tag,
        iv
    };
}
async function encrypt(enc, plaintext, cek, iv, aad) {
    if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
        throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
    }
    if (iv) {
        checkIvLength(enc, iv);
    } else {
        iv = generateIv(enc);
    }
    switch(enc){
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            if (cek instanceof Uint8Array) {
                checkCekLength(cek, parseInt(enc.slice(-3), 10));
            }
            return cbcEncrypt(enc, plaintext, cek, iv, aad);
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            if (cek instanceof Uint8Array) {
                checkCekLength(cek, parseInt(enc.slice(1, 4), 10));
            }
            return gcmEncrypt(enc, plaintext, cek, iv, aad);
        default:
            throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/aeskw.js

function checkKeySize(key, alg) {
    if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
}
function getCryptoKey(key, alg, usage) {
    if (key instanceof Uint8Array) {
        return crypto.subtle.importKey("raw", key, "AES-KW", true, [
            usage
        ]);
    }
    checkEncCryptoKey(key, alg, usage);
    return key;
}
async function wrap(alg, key, cek) {
    const cryptoKey = await getCryptoKey(key, alg, "wrapKey");
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await crypto.subtle.importKey("raw", cek, {
        hash: "SHA-256",
        name: "HMAC"
    }, true, [
        "sign"
    ]);
    return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
}
async function unwrap(alg, key, encryptedKey) {
    const cryptoKey = await getCryptoKey(key, alg, "unwrapKey");
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", {
        hash: "SHA-256",
        name: "HMAC"
    }, true, [
        "sign"
    ]);
    return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/ecdhes.js



function lengthAndInput(input) {
    return concat(uint32be(input.length), input);
}
async function concatKdf(Z, L, OtherInfo) {
    const dkLen = L >> 3;
    const hashLen = 32;
    const reps = Math.ceil(dkLen / hashLen);
    const dk = new Uint8Array(reps * hashLen);
    for(let i = 1; i <= reps; i++){
        const hashInput = new Uint8Array(4 + Z.length + OtherInfo.length);
        hashInput.set(uint32be(i), 0);
        hashInput.set(Z, 4);
        hashInput.set(OtherInfo, 4 + Z.length);
        const hashResult = await digest("sha256", hashInput);
        dk.set(hashResult, (i - 1) * hashLen);
    }
    return dk.slice(0, dkLen);
}
async function deriveKey(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(), apv = new Uint8Array()) {
    checkEncCryptoKey(publicKey, "ECDH");
    checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
    const algorithmID = lengthAndInput(encode(algorithm));
    const partyUInfo = lengthAndInput(apu);
    const partyVInfo = lengthAndInput(apv);
    const suppPubInfo = uint32be(keyLength);
    const suppPrivInfo = new Uint8Array();
    const otherInfo = concat(algorithmID, partyUInfo, partyVInfo, suppPubInfo, suppPrivInfo);
    const Z = new Uint8Array(await crypto.subtle.deriveBits({
        name: publicKey.algorithm.name,
        public: publicKey
    }, privateKey, getEcdhBitLength(publicKey)));
    return concatKdf(Z, keyLength, otherInfo);
}
function getEcdhBitLength(publicKey) {
    if (publicKey.algorithm.name === "X25519") {
        return 256;
    }
    return Math.ceil(parseInt(publicKey.algorithm.namedCurve.slice(-3), 10) / 8) << 3;
}
function allowed(key) {
    switch(key.algorithm.namedCurve){
        case "P-256":
        case "P-384":
        case "P-521":
            return true;
        default:
            return key.algorithm.name === "X25519";
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/pbes2kw.js





function pbes2kw_getCryptoKey(key, alg) {
    if (key instanceof Uint8Array) {
        return crypto.subtle.importKey("raw", key, "PBKDF2", false, [
            "deriveBits"
        ]);
    }
    checkEncCryptoKey(key, alg, "deriveBits");
    return key;
}
const concatSalt = (alg, p2sInput)=>concat(encode(alg), Uint8Array.of(0x00), p2sInput);
async function pbes2kw_deriveKey(p2s, alg, p2c, key) {
    if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
        throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
    }
    const salt = concatSalt(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10);
    const subtleAlg = {
        hash: `SHA-${alg.slice(8, 11)}`,
        iterations: p2c,
        name: "PBKDF2",
        salt
    };
    const cryptoKey = await pbes2kw_getCryptoKey(key, alg);
    return new Uint8Array(await crypto.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
}
async function pbes2kw_wrap(alg, key, cek, p2c = 2048, p2s = crypto.getRandomValues(new Uint8Array(16))) {
    const derived = await pbes2kw_deriveKey(p2s, alg, p2c, key);
    const encryptedKey = await wrap(alg.slice(-6), derived, cek);
    return {
        encryptedKey,
        p2c,
        p2s: base64url_encode(p2s)
    };
}
async function pbes2kw_unwrap(alg, key, encryptedKey, p2c, p2s) {
    const derived = await pbes2kw_deriveKey(p2s, alg, p2c, key);
    return unwrap(alg.slice(-6), derived, encryptedKey);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/check_key_length.js
function checkKeyLength(alg, key) {
    if (alg.startsWith("RS") || alg.startsWith("PS")) {
        const { modulusLength } = key.algorithm;
        if (typeof modulusLength !== "number" || modulusLength < 2048) {
            throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/rsaes.js



const subtleAlgorithm = (alg)=>{
    switch(alg){
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            return "RSA-OAEP";
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
};
async function rsaes_encrypt(alg, key, cek) {
    checkEncCryptoKey(key, alg, "encrypt");
    checkKeyLength(alg, key);
    return new Uint8Array(await crypto.subtle.encrypt(subtleAlgorithm(alg), key, cek));
}
async function decrypt(alg, key, encryptedKey) {
    checkEncCryptoKey(key, alg, "decrypt");
    checkKeyLength(alg, key);
    return new Uint8Array(await crypto.subtle.decrypt(subtleAlgorithm(alg), key, encryptedKey));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/jwk_to_key.js

function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch(jwk.kty){
        case "AKP":
            {
                switch(jwk.alg){
                    case "ML-DSA-44":
                    case "ML-DSA-65":
                    case "ML-DSA-87":
                        algorithm = {
                            name: jwk.alg
                        };
                        keyUsages = jwk.priv ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "RSA":
            {
                switch(jwk.alg){
                    case "PS256":
                    case "PS384":
                    case "PS512":
                        algorithm = {
                            name: "RSA-PSS",
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "RS256":
                    case "RS384":
                    case "RS512":
                        algorithm = {
                            name: "RSASSA-PKCS1-v1_5",
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "RSA-OAEP":
                    case "RSA-OAEP-256":
                    case "RSA-OAEP-384":
                    case "RSA-OAEP-512":
                        algorithm = {
                            name: "RSA-OAEP",
                            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
                        };
                        keyUsages = jwk.d ? [
                            "decrypt",
                            "unwrapKey"
                        ] : [
                            "encrypt",
                            "wrapKey"
                        ];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "EC":
            {
                switch(jwk.alg){
                    case "ES256":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-256"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ES384":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-384"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ES512":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-521"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ECDH-ES":
                    case "ECDH-ES+A128KW":
                    case "ECDH-ES+A192KW":
                    case "ECDH-ES+A256KW":
                        algorithm = {
                            name: "ECDH",
                            namedCurve: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            "deriveBits"
                        ] : [];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "OKP":
            {
                switch(jwk.alg){
                    case "Ed25519":
                    case "EdDSA":
                        algorithm = {
                            name: "Ed25519"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ECDH-ES":
                    case "ECDH-ES+A128KW":
                    case "ECDH-ES+A192KW":
                    case "ECDH-ES+A256KW":
                        algorithm = {
                            name: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            "deriveBits"
                        ] : [];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return {
        algorithm,
        keyUsages
    };
}
async function jwkToKey(jwk) {
    if (!jwk.alg) {
        throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    const { algorithm, keyUsages } = subtleMapping(jwk);
    const keyData = {
        ...jwk
    };
    if (keyData.kty !== "AKP") {
        delete keyData.alg;
    }
    delete keyData.use;
    return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? (jwk.d || jwk.priv ? false : true), jwk.key_ops ?? keyUsages);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/normalize_key.js




let cache;
const handleJWK = async (key, jwk, alg, freeze = false)=>{
    cache ||= new WeakMap();
    let cached = cache.get(key);
    if (cached?.[alg]) {
        return cached[alg];
    }
    const cryptoKey = await jwkToKey({
        ...jwk,
        alg
    });
    if (freeze) Object.freeze(key);
    if (!cached) {
        cache.set(key, {
            [alg]: cryptoKey
        });
    } else {
        cached[alg] = cryptoKey;
    }
    return cryptoKey;
};
const handleKeyObject = (keyObject, alg)=>{
    cache ||= new WeakMap();
    let cached = cache.get(keyObject);
    if (cached?.[alg]) {
        return cached[alg];
    }
    const isPublic = keyObject.type === "public";
    const extractable = isPublic ? true : false;
    let cryptoKey;
    if (keyObject.asymmetricKeyType === "x25519") {
        switch(alg){
            case "ECDH-ES":
            case "ECDH-ES+A128KW":
            case "ECDH-ES+A192KW":
            case "ECDH-ES+A256KW":
                break;
            default:
                throw new TypeError("given KeyObject instance cannot be used for this algorithm");
        }
        cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, isPublic ? [] : [
            "deriveBits"
        ]);
    }
    if (keyObject.asymmetricKeyType === "ed25519") {
        if (alg !== "EdDSA" && alg !== "Ed25519") {
            throw new TypeError("given KeyObject instance cannot be used for this algorithm");
        }
        cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
            isPublic ? "verify" : "sign"
        ]);
    }
    switch(keyObject.asymmetricKeyType){
        case "ml-dsa-44":
        case "ml-dsa-65":
        case "ml-dsa-87":
            {
                if (alg !== keyObject.asymmetricKeyType.toUpperCase()) {
                    throw new TypeError("given KeyObject instance cannot be used for this algorithm");
                }
                cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
                    isPublic ? "verify" : "sign"
                ]);
            }
    }
    if (keyObject.asymmetricKeyType === "rsa") {
        let hash;
        switch(alg){
            case "RSA-OAEP":
                hash = "SHA-1";
                break;
            case "RS256":
            case "PS256":
            case "RSA-OAEP-256":
                hash = "SHA-256";
                break;
            case "RS384":
            case "PS384":
            case "RSA-OAEP-384":
                hash = "SHA-384";
                break;
            case "RS512":
            case "PS512":
            case "RSA-OAEP-512":
                hash = "SHA-512";
                break;
            default:
                throw new TypeError("given KeyObject instance cannot be used for this algorithm");
        }
        if (alg.startsWith("RSA-OAEP")) {
            return keyObject.toCryptoKey({
                name: "RSA-OAEP",
                hash
            }, extractable, isPublic ? [
                "encrypt"
            ] : [
                "decrypt"
            ]);
        }
        cryptoKey = keyObject.toCryptoKey({
            name: alg.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
            hash
        }, extractable, [
            isPublic ? "verify" : "sign"
        ]);
    }
    if (keyObject.asymmetricKeyType === "ec") {
        const nist = new Map([
            [
                "prime256v1",
                "P-256"
            ],
            [
                "secp384r1",
                "P-384"
            ],
            [
                "secp521r1",
                "P-521"
            ]
        ]);
        const namedCurve = nist.get(keyObject.asymmetricKeyDetails?.namedCurve);
        if (!namedCurve) {
            throw new TypeError("given KeyObject instance cannot be used for this algorithm");
        }
        if (alg === "ES256" && namedCurve === "P-256") {
            cryptoKey = keyObject.toCryptoKey({
                name: "ECDSA",
                namedCurve
            }, extractable, [
                isPublic ? "verify" : "sign"
            ]);
        }
        if (alg === "ES384" && namedCurve === "P-384") {
            cryptoKey = keyObject.toCryptoKey({
                name: "ECDSA",
                namedCurve
            }, extractable, [
                isPublic ? "verify" : "sign"
            ]);
        }
        if (alg === "ES512" && namedCurve === "P-521") {
            cryptoKey = keyObject.toCryptoKey({
                name: "ECDSA",
                namedCurve
            }, extractable, [
                isPublic ? "verify" : "sign"
            ]);
        }
        if (alg.startsWith("ECDH-ES")) {
            cryptoKey = keyObject.toCryptoKey({
                name: "ECDH",
                namedCurve
            }, extractable, isPublic ? [] : [
                "deriveBits"
            ]);
        }
    }
    if (!cryptoKey) {
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    }
    if (!cached) {
        cache.set(keyObject, {
            [alg]: cryptoKey
        });
    } else {
        cached[alg] = cryptoKey;
    }
    return cryptoKey;
};
async function normalizeKey(key, alg) {
    if (key instanceof Uint8Array) {
        return key;
    }
    if (isCryptoKey(key)) {
        return key;
    }
    if (isKeyObject(key)) {
        if (key.type === "secret") {
            return key.export();
        }
        if ("toCryptoKey" in key && typeof key.toCryptoKey === "function") {
            try {
                return handleKeyObject(key, alg);
            } catch (err) {
                if (err instanceof TypeError) {
                    throw err;
                }
            }
        }
        let jwk = key.export({
            format: "jwk"
        });
        return handleJWK(key, jwk, alg);
    }
    if (isJWK(key)) {
        if (key.k) {
            return decode(key.k);
        }
        return handleJWK(key, key, alg, true);
    }
    throw new Error("unreachable");
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/cek.js

function cekLength(alg) {
    switch(alg){
        case "A128GCM":
            return 128;
        case "A192GCM":
            return 192;
        case "A256GCM":
        case "A128CBC-HS256":
            return 256;
        case "A192CBC-HS384":
            return 384;
        case "A256CBC-HS512":
            return 512;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
const generateCek = (alg)=>crypto.getRandomValues(new Uint8Array(cekLength(alg) >> 3));

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/decrypt.js







async function timingSafeEqual(a, b) {
    if (!(a instanceof Uint8Array)) {
        throw new TypeError("First argument must be a buffer");
    }
    if (!(b instanceof Uint8Array)) {
        throw new TypeError("Second argument must be a buffer");
    }
    const algorithm = {
        name: "HMAC",
        hash: "SHA-256"
    };
    const key = await crypto.subtle.generateKey(algorithm, false, [
        "sign"
    ]);
    const aHmac = new Uint8Array(await crypto.subtle.sign(algorithm, key, a));
    const bHmac = new Uint8Array(await crypto.subtle.sign(algorithm, key, b));
    let out = 0;
    let i = -1;
    while(++i < 32){
        out |= aHmac[i] ^ bHmac[i];
    }
    return out === 0;
}
async function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    if (!(cek instanceof Uint8Array)) {
        throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, [
        "decrypt"
    ]);
    const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
        hash: `SHA-${keySize << 1}`,
        name: "HMAC"
    }, false, [
        "sign"
    ]);
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const expectedTag = new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    let macCheckPassed;
    try {
        macCheckPassed = await timingSafeEqual(tag, expectedTag);
    } catch  {}
    if (!macCheckPassed) {
        throw new JWEDecryptionFailed();
    }
    let plaintext;
    try {
        plaintext = new Uint8Array(await crypto.subtle.decrypt({
            iv: iv,
            name: "AES-CBC"
        }, encKey, ciphertext));
    } catch  {}
    if (!plaintext) {
        throw new JWEDecryptionFailed();
    }
    return plaintext;
}
async function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
        encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, [
            "decrypt"
        ]);
    } else {
        checkEncCryptoKey(cek, enc, "decrypt");
        encKey = cek;
    }
    try {
        return new Uint8Array(await crypto.subtle.decrypt({
            additionalData: aad,
            iv: iv,
            name: "AES-GCM",
            tagLength: 128
        }, encKey, concat(ciphertext, tag)));
    } catch  {
        throw new JWEDecryptionFailed();
    }
}
async function decrypt_decrypt(enc, cek, ciphertext, iv, tag, aad) {
    if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
        throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
    }
    if (!iv) {
        throw new JWEInvalid("JWE Initialization Vector missing");
    }
    if (!tag) {
        throw new JWEInvalid("JWE Authentication Tag missing");
    }
    checkIvLength(enc, iv);
    switch(enc){
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(-3), 10));
            return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(1, 4), 10));
            return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
        default:
            throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/aesgcmkw.js



async function aesgcmkw_wrap(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    const wrapped = await encrypt(jweAlgorithm, cek, key, iv, new Uint8Array());
    return {
        encryptedKey: wrapped.ciphertext,
        iv: base64url_encode(wrapped.iv),
        tag: base64url_encode(wrapped.tag)
    };
}
async function aesgcmkw_unwrap(alg, key, encryptedKey, iv, tag) {
    const jweAlgorithm = alg.slice(0, 7);
    return decrypt_decrypt(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array());
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/encrypt_key_management.js











async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    switch(alg){
        case "dir":
            {
                cek = key;
                break;
            }
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                assertCryptoKey(key);
                if (!allowed(key)) {
                    throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
                }
                const { apu, apv } = providedParameters;
                let ephemeralKey;
                if (providedParameters.epk) {
                    ephemeralKey = await normalizeKey(providedParameters.epk, alg);
                } else {
                    ephemeralKey = (await crypto.subtle.generateKey(key.algorithm, true, [
                        "deriveBits"
                    ])).privateKey;
                }
                const { x, y, crv, kty } = await exportJWK(ephemeralKey);
                const sharedSecret = await deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? cekLength(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
                parameters = {
                    epk: {
                        x,
                        crv,
                        kty
                    }
                };
                if (kty === "EC") parameters.epk.y = y;
                if (apu) parameters.apu = base64url_encode(apu);
                if (apv) parameters.apv = base64url_encode(apv);
                if (alg === "ECDH-ES") {
                    cek = sharedSecret;
                    break;
                }
                cek = providedCek || generateCek(enc);
                const kwAlg = alg.slice(-6);
                encryptedKey = await wrap(kwAlg, sharedSecret, cek);
                break;
            }
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            {
                cek = providedCek || generateCek(enc);
                assertCryptoKey(key);
                encryptedKey = await rsaes_encrypt(alg, key, cek);
                break;
            }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
            {
                cek = providedCek || generateCek(enc);
                const { p2c, p2s } = providedParameters;
                ({ encryptedKey, ...parameters } = await pbes2kw_wrap(alg, key, cek, p2c, p2s));
                break;
            }
        case "A128KW":
        case "A192KW":
        case "A256KW":
            {
                cek = providedCek || generateCek(enc);
                encryptedKey = await wrap(alg, key, cek);
                break;
            }
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
            {
                cek = providedCek || generateCek(enc);
                const { iv } = providedParameters;
                ({ encryptedKey, ...parameters } = await aesgcmkw_wrap(alg, key, cek, iv));
                break;
            }
        default:
            {
                throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
            }
    }
    return {
        cek,
        encryptedKey,
        parameters
    };
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/is_disjoint.js
function isDisjoint(...headers) {
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources){
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters){
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/validate_crit.js

function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader?.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input)=>typeof input !== "string" || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([
            ...Object.entries(recognizedOption),
            ...recognizedDefault.entries()
        ]);
    } else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit){
        if (!recognized.has(parameter)) {
            throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        }
        if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/check_key_type.js



const tag = (key)=>key?.[Symbol.toStringTag];
const jwkMatchesOp = (alg, key, usage)=>{
    if (key.use !== undefined) {
        let expected;
        switch(usage){
            case "sign":
            case "verify":
                expected = "sig";
                break;
            case "encrypt":
            case "decrypt":
                expected = "enc";
                break;
        }
        if (key.use !== expected) {
            throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
        }
    }
    if (key.alg !== undefined && key.alg !== alg) {
        throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
    }
    if (Array.isArray(key.key_ops)) {
        let expectedKeyOp;
        switch(true){
            case usage === "sign" || usage === "verify":
            case alg === "dir":
            case alg.includes("CBC-HS"):
                expectedKeyOp = usage;
                break;
            case alg.startsWith("PBES2"):
                expectedKeyOp = "deriveBits";
                break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(alg):
                if (!alg.includes("GCM") && alg.endsWith("KW")) {
                    expectedKeyOp = usage === "encrypt" ? "wrapKey" : "unwrapKey";
                } else {
                    expectedKeyOp = usage;
                }
                break;
            case usage === "encrypt" && alg.startsWith("RSA"):
                expectedKeyOp = "wrapKey";
                break;
            case usage === "decrypt":
                expectedKeyOp = alg.startsWith("RSA") ? "unwrapKey" : "deriveBits";
                break;
        }
        if (expectedKeyOp && key.key_ops?.includes?.(expectedKeyOp) === false) {
            throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
        }
    }
    return true;
};
const symmetricTypeCheck = (alg, key, usage)=>{
    if (key instanceof Uint8Array) return;
    if (isJWK(key)) {
        if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage)) return;
        throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
    }
    if (!isKeyLike(key)) {
        throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
    }
    if (key.type !== "secret") {
        throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
    }
};
const asymmetricTypeCheck = (alg, key, usage)=>{
    if (isJWK(key)) {
        switch(usage){
            case "decrypt":
            case "sign":
                if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage)) return;
                throw new TypeError(`JSON Web Key for this operation be a private JWK`);
            case "encrypt":
            case "verify":
                if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage)) return;
                throw new TypeError(`JSON Web Key for this operation be a public JWK`);
        }
    }
    if (!isKeyLike(key)) {
        throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
    }
    if (key.type === "secret") {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (key.type === "public") {
        switch(usage){
            case "sign":
                throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
            case "decrypt":
                throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
        }
    }
    if (key.type === "private") {
        switch(usage){
            case "verify":
                throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
            case "encrypt":
                throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
        }
    }
};
function checkKeyType(alg, key, usage) {
    switch(alg.substring(0, 2)){
        case "A1":
        case "A2":
        case "di":
        case "HS":
        case "PB":
            symmetricTypeCheck(alg, key, usage);
            break;
        default:
            asymmetricTypeCheck(alg, key, usage);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/jwe/flattened/encrypt.js










class FlattenedEncrypt {
    #plaintext;
    #protectedHeader;
    #sharedUnprotectedHeader;
    #unprotectedHeader;
    #aad;
    #cek;
    #iv;
    #keyManagementParameters;
    constructor(plaintext){
        if (!(plaintext instanceof Uint8Array)) {
            throw new TypeError("plaintext must be an instance of Uint8Array");
        }
        this.#plaintext = plaintext;
    }
    setKeyManagementParameters(parameters) {
        if (this.#keyManagementParameters) {
            throw new TypeError("setKeyManagementParameters can only be called once");
        }
        this.#keyManagementParameters = parameters;
        return this;
    }
    setProtectedHeader(protectedHeader) {
        if (this.#protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this.#protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this.#sharedUnprotectedHeader) {
            throw new TypeError("setSharedUnprotectedHeader can only be called once");
        }
        this.#sharedUnprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.#unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this.#unprotectedHeader = unprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this.#aad = aad;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this.#cek) {
            throw new TypeError("setContentEncryptionKey can only be called once");
        }
        this.#cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this.#iv) {
            throw new TypeError("setInitializationVector can only be called once");
        }
        this.#iv = iv;
        return this;
    }
    async encrypt(key, options) {
        if (!this.#protectedHeader && !this.#unprotectedHeader && !this.#sharedUnprotectedHeader) {
            throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
        }
        if (!isDisjoint(this.#protectedHeader, this.#unprotectedHeader, this.#sharedUnprotectedHeader)) {
            throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
        }
        const joseHeader = {
            ...this.#protectedHeader,
            ...this.#unprotectedHeader,
            ...this.#sharedUnprotectedHeader
        };
        validateCrit(JWEInvalid, new Map(), options?.crit, this.#protectedHeader, joseHeader);
        if (joseHeader.zip !== undefined) {
            throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        }
        const { alg, enc } = joseHeader;
        if (typeof alg !== "string" || !alg) {
            throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (typeof enc !== "string" || !enc) {
            throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        let encryptedKey;
        if (this.#cek && (alg === "dir" || alg === "ECDH-ES")) {
            throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
        }
        checkKeyType(alg === "dir" ? enc : alg, key, "encrypt");
        let cek;
        {
            let parameters;
            const k = await normalizeKey(key, alg);
            ({ cek, encryptedKey, parameters } = await encryptKeyManagement(alg, enc, k, this.#cek, this.#keyManagementParameters));
            if (parameters) {
                if (options && unprotected in options) {
                    if (!this.#unprotectedHeader) {
                        this.setUnprotectedHeader(parameters);
                    } else {
                        this.#unprotectedHeader = {
                            ...this.#unprotectedHeader,
                            ...parameters
                        };
                    }
                } else if (!this.#protectedHeader) {
                    this.setProtectedHeader(parameters);
                } else {
                    this.#protectedHeader = {
                        ...this.#protectedHeader,
                        ...parameters
                    };
                }
            }
        }
        let additionalData;
        let protectedHeaderS;
        let protectedHeaderB;
        let aadMember;
        if (this.#protectedHeader) {
            protectedHeaderS = base64url_encode(JSON.stringify(this.#protectedHeader));
            protectedHeaderB = encode(protectedHeaderS);
        } else {
            protectedHeaderS = "";
            protectedHeaderB = new Uint8Array();
        }
        if (this.#aad) {
            aadMember = base64url_encode(this.#aad);
            const aadMemberBytes = encode(aadMember);
            additionalData = concat(protectedHeaderB, encode("."), aadMemberBytes);
        } else {
            additionalData = protectedHeaderB;
        }
        const { ciphertext, tag, iv } = await encrypt(enc, this.#plaintext, cek, this.#iv, additionalData);
        const jwe = {
            ciphertext: base64url_encode(ciphertext)
        };
        if (iv) {
            jwe.iv = base64url_encode(iv);
        }
        if (tag) {
            jwe.tag = base64url_encode(tag);
        }
        if (encryptedKey) {
            jwe.encrypted_key = base64url_encode(encryptedKey);
        }
        if (aadMember) {
            jwe.aad = aadMember;
        }
        if (this.#protectedHeader) {
            jwe.protected = protectedHeaderS;
        }
        if (this.#sharedUnprotectedHeader) {
            jwe.unprotected = this.#sharedUnprotectedHeader;
        }
        if (this.#unprotectedHeader) {
            jwe.header = this.#unprotectedHeader;
        }
        return jwe;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/jwe/compact/encrypt.js

class CompactEncrypt {
    #flattened;
    constructor(plaintext){
        this.#flattened = new FlattenedEncrypt(plaintext);
    }
    setContentEncryptionKey(cek) {
        this.#flattened.setContentEncryptionKey(cek);
        return this;
    }
    setInitializationVector(iv) {
        this.#flattened.setInitializationVector(iv);
        return this;
    }
    setProtectedHeader(protectedHeader) {
        this.#flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    setKeyManagementParameters(parameters) {
        this.#flattened.setKeyManagementParameters(parameters);
        return this;
    }
    async encrypt(key, options) {
        const jwe = await this.#flattened.encrypt(key, options);
        return [
            jwe.protected,
            jwe.encrypted_key,
            jwe.iv,
            jwe.ciphertext,
            jwe.tag
        ].join(".");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/jwt_claims_set.js



const epoch = (date)=>Math.floor(date.getTime() / 1000);
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function secs(str) {
    const matched = REGEX.exec(str);
    if (!matched || matched[4] && matched[1]) {
        throw new TypeError("Invalid time period format");
    }
    const value = parseFloat(matched[2]);
    const unit = matched[3].toLowerCase();
    let numericDate;
    switch(unit){
        case "sec":
        case "secs":
        case "second":
        case "seconds":
        case "s":
            numericDate = Math.round(value);
            break;
        case "minute":
        case "minutes":
        case "min":
        case "mins":
        case "m":
            numericDate = Math.round(value * minute);
            break;
        case "hour":
        case "hours":
        case "hr":
        case "hrs":
        case "h":
            numericDate = Math.round(value * hour);
            break;
        case "day":
        case "days":
        case "d":
            numericDate = Math.round(value * day);
            break;
        case "week":
        case "weeks":
        case "w":
            numericDate = Math.round(value * week);
            break;
        default:
            numericDate = Math.round(value * year);
            break;
    }
    if (matched[1] === "-" || matched[4] === "ago") {
        return -numericDate;
    }
    return numericDate;
}
function validateInput(label, input) {
    if (!Number.isFinite(input)) {
        throw new TypeError(`Invalid ${label} input`);
    }
    return input;
}
const normalizeTyp = (value)=>{
    if (value.includes("/")) {
        return value.toLowerCase();
    }
    return `application/${value.toLowerCase()}`;
};
const checkAudiencePresence = (audPayload, audOption)=>{
    if (typeof audPayload === "string") {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
    let payload;
    try {
        payload = JSON.parse(decoder.decode(encodedPayload));
    } catch  {}
    if (!isObject(payload)) {
        throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
    }
    const { typ } = options;
    if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
    }
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
    const presenceCheck = [
        ...requiredClaims
    ];
    if (maxTokenAge !== undefined) presenceCheck.push("iat");
    if (audience !== undefined) presenceCheck.push("aud");
    if (subject !== undefined) presenceCheck.push("sub");
    if (issuer !== undefined) presenceCheck.push("iss");
    for (const claim of new Set(presenceCheck.reverse())){
        if (!(claim in payload)) {
            throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
        }
    }
    if (issuer && !(Array.isArray(issuer) ? issuer : [
        issuer
    ]).includes(payload.iss)) {
        throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
    }
    if (subject && payload.sub !== subject) {
        throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
    }
    if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [
        audience
    ] : audience)) {
        throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
    }
    let tolerance;
    switch(typeof options.clockTolerance){
        case "string":
            tolerance = secs(options.clockTolerance);
            break;
        case "number":
            tolerance = options.clockTolerance;
            break;
        case "undefined":
            tolerance = 0;
            break;
        default:
            throw new TypeError("Invalid clockTolerance option type");
    }
    const { currentDate } = options;
    const now = epoch(currentDate || new Date());
    if ((payload.iat !== undefined || maxTokenAge) && typeof payload.iat !== "number") {
        throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== "number") {
            throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
        }
        if (payload.nbf > now + tolerance) {
            throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== "number") {
            throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
        }
        if (payload.exp <= now - tolerance) {
            throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
        }
    }
    if (maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
        if (age - tolerance > max) {
            throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
        }
        if (age < 0 - tolerance) {
            throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
        }
    }
    return payload;
}
class JWTClaimsBuilder {
    #payload;
    constructor(payload){
        if (!isObject(payload)) {
            throw new TypeError("JWT Claims Set MUST be an object");
        }
        this.#payload = structuredClone(payload);
    }
    data() {
        return encoder.encode(JSON.stringify(this.#payload));
    }
    get iss() {
        return this.#payload.iss;
    }
    set iss(value) {
        this.#payload.iss = value;
    }
    get sub() {
        return this.#payload.sub;
    }
    set sub(value) {
        this.#payload.sub = value;
    }
    get aud() {
        return this.#payload.aud;
    }
    set aud(value) {
        this.#payload.aud = value;
    }
    set jti(value) {
        this.#payload.jti = value;
    }
    set nbf(value) {
        if (typeof value === "number") {
            this.#payload.nbf = validateInput("setNotBefore", value);
        } else if (value instanceof Date) {
            this.#payload.nbf = validateInput("setNotBefore", epoch(value));
        } else {
            this.#payload.nbf = epoch(new Date()) + secs(value);
        }
    }
    set exp(value) {
        if (typeof value === "number") {
            this.#payload.exp = validateInput("setExpirationTime", value);
        } else if (value instanceof Date) {
            this.#payload.exp = validateInput("setExpirationTime", epoch(value));
        } else {
            this.#payload.exp = epoch(new Date()) + secs(value);
        }
    }
    set iat(value) {
        if (value === undefined) {
            this.#payload.iat = epoch(new Date());
        } else if (value instanceof Date) {
            this.#payload.iat = validateInput("setIssuedAt", epoch(value));
        } else if (typeof value === "string") {
            this.#payload.iat = validateInput("setIssuedAt", epoch(new Date()) + secs(value));
        } else {
            this.#payload.iat = validateInput("setIssuedAt", value);
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/jwt/encrypt.js


class EncryptJWT {
    #cek;
    #iv;
    #keyManagementParameters;
    #protectedHeader;
    #replicateIssuerAsHeader;
    #replicateSubjectAsHeader;
    #replicateAudienceAsHeader;
    #jwt;
    constructor(payload = {}){
        this.#jwt = new JWTClaimsBuilder(payload);
    }
    setIssuer(issuer) {
        this.#jwt.iss = issuer;
        return this;
    }
    setSubject(subject) {
        this.#jwt.sub = subject;
        return this;
    }
    setAudience(audience) {
        this.#jwt.aud = audience;
        return this;
    }
    setJti(jwtId) {
        this.#jwt.jti = jwtId;
        return this;
    }
    setNotBefore(input) {
        this.#jwt.nbf = input;
        return this;
    }
    setExpirationTime(input) {
        this.#jwt.exp = input;
        return this;
    }
    setIssuedAt(input) {
        this.#jwt.iat = input;
        return this;
    }
    setProtectedHeader(protectedHeader) {
        if (this.#protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this.#protectedHeader = protectedHeader;
        return this;
    }
    setKeyManagementParameters(parameters) {
        if (this.#keyManagementParameters) {
            throw new TypeError("setKeyManagementParameters can only be called once");
        }
        this.#keyManagementParameters = parameters;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this.#cek) {
            throw new TypeError("setContentEncryptionKey can only be called once");
        }
        this.#cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this.#iv) {
            throw new TypeError("setInitializationVector can only be called once");
        }
        this.#iv = iv;
        return this;
    }
    replicateIssuerAsHeader() {
        this.#replicateIssuerAsHeader = true;
        return this;
    }
    replicateSubjectAsHeader() {
        this.#replicateSubjectAsHeader = true;
        return this;
    }
    replicateAudienceAsHeader() {
        this.#replicateAudienceAsHeader = true;
        return this;
    }
    async encrypt(key, options) {
        const enc = new CompactEncrypt(this.#jwt.data());
        if (this.#protectedHeader && (this.#replicateIssuerAsHeader || this.#replicateSubjectAsHeader || this.#replicateAudienceAsHeader)) {
            this.#protectedHeader = {
                ...this.#protectedHeader,
                iss: this.#replicateIssuerAsHeader ? this.#jwt.iss : undefined,
                sub: this.#replicateSubjectAsHeader ? this.#jwt.sub : undefined,
                aud: this.#replicateAudienceAsHeader ? this.#jwt.aud : undefined
            };
        }
        enc.setProtectedHeader(this.#protectedHeader);
        if (this.#iv) {
            enc.setInitializationVector(this.#iv);
        }
        if (this.#cek) {
            enc.setContentEncryptionKey(this.#cek);
        }
        if (this.#keyManagementParameters) {
            enc.setKeyManagementParameters(this.#keyManagementParameters);
        }
        return enc.encrypt(key, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/key/import.js





async function importSPKI(spki, alg, options) {
    if (typeof spki !== "string" || spki.indexOf("-----BEGIN PUBLIC KEY-----") !== 0) {
        throw new TypeError('"spki" must be SPKI formatted string');
    }
    return fromSPKI(spki, alg, options);
}
async function importX509(x509, alg, options) {
    if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) {
        throw new TypeError('"x509" must be X.509 formatted string');
    }
    return fromX509(x509, alg, options);
}
async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) {
        throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
    }
    return fromPKCS8(pkcs8, alg, options);
}
async function importJWK(jwk, alg, options) {
    if (!isObject(jwk)) {
        throw new TypeError("JWK must be an object");
    }
    let ext;
    alg ??= jwk.alg;
    ext ??= options?.extractable ?? jwk.ext;
    switch(jwk.kty){
        case "oct":
            if (typeof jwk.k !== "string" || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            return decode(jwk.k);
        case "RSA":
            if ("oth" in jwk && jwk.oth !== undefined) {
                throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
            return jwkToKey({
                ...jwk,
                alg,
                ext
            });
        case "AKP":
            {
                if (typeof jwk.alg !== "string" || !jwk.alg) {
                    throw new TypeError('missing "alg" (Algorithm) Parameter value');
                }
                if (alg !== undefined && alg !== jwk.alg) {
                    throw new TypeError("JWK alg and alg option value mismatch");
                }
                return jwkToKey({
                    ...jwk,
                    ext
                });
            }
        case "EC":
        case "OKP":
            return jwkToKey({
                ...jwk,
                alg,
                ext
            });
        default:
            throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/decrypt_key_management.js











async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
    switch(alg){
        case "dir":
            {
                if (encryptedKey !== undefined) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
                return key;
            }
        case "ECDH-ES":
            if (encryptedKey !== undefined) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                if (!isObject(joseHeader.epk)) throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
                assertCryptoKey(key);
                if (!allowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
                const epk = await importJWK(joseHeader.epk, alg);
                assertCryptoKey(epk);
                let partyUInfo;
                let partyVInfo;
                if (joseHeader.apu !== undefined) {
                    if (typeof joseHeader.apu !== "string") throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
                    try {
                        partyUInfo = decode(joseHeader.apu);
                    } catch  {
                        throw new JWEInvalid("Failed to base64url decode the apu");
                    }
                }
                if (joseHeader.apv !== undefined) {
                    if (typeof joseHeader.apv !== "string") throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
                    try {
                        partyVInfo = decode(joseHeader.apv);
                    } catch  {
                        throw new JWEInvalid("Failed to base64url decode the apv");
                    }
                }
                const sharedSecret = await deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? cekLength(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
                if (alg === "ECDH-ES") return sharedSecret;
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                return unwrap(alg.slice(-6), sharedSecret, encryptedKey);
            }
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                assertCryptoKey(key);
                return decrypt(alg, key, encryptedKey);
            }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                if (typeof joseHeader.p2c !== "number") throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
                const p2cLimit = options?.maxPBES2Count || 10000;
                if (joseHeader.p2c > p2cLimit) throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
                if (typeof joseHeader.p2s !== "string") throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
                let p2s;
                try {
                    p2s = decode(joseHeader.p2s);
                } catch  {
                    throw new JWEInvalid("Failed to base64url decode the p2s");
                }
                return pbes2kw_unwrap(alg, key, encryptedKey, joseHeader.p2c, p2s);
            }
        case "A128KW":
        case "A192KW":
        case "A256KW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                return unwrap(alg, key, encryptedKey);
            }
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                if (typeof joseHeader.iv !== "string") throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
                if (typeof joseHeader.tag !== "string") throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
                let iv;
                try {
                    iv = decode(joseHeader.iv);
                } catch  {
                    throw new JWEInvalid("Failed to base64url decode the iv");
                }
                let tag;
                try {
                    tag = decode(joseHeader.tag);
                } catch  {
                    throw new JWEInvalid("Failed to base64url decode the tag");
                }
                return aesgcmkw_unwrap(alg, key, encryptedKey, iv, tag);
            }
        default:
            {
                throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
            }
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/lib/validate_algorithms.js
function validateAlgorithms(option, algorithms) {
    if (algorithms !== undefined && (!Array.isArray(algorithms) || algorithms.some((s)=>typeof s !== "string"))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/jwe/flattened/decrypt.js












async function flattenedDecrypt(jwe, key, options) {
    if (!isObject(jwe)) {
        throw new JWEInvalid("Flattened JWE must be an object");
    }
    if (jwe.protected === undefined && jwe.header === undefined && jwe.unprotected === undefined) {
        throw new JWEInvalid("JOSE Header missing");
    }
    if (jwe.iv !== undefined && typeof jwe.iv !== "string") {
        throw new JWEInvalid("JWE Initialization Vector incorrect type");
    }
    if (typeof jwe.ciphertext !== "string") {
        throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
    }
    if (jwe.tag !== undefined && typeof jwe.tag !== "string") {
        throw new JWEInvalid("JWE Authentication Tag incorrect type");
    }
    if (jwe.protected !== undefined && typeof jwe.protected !== "string") {
        throw new JWEInvalid("JWE Protected Header incorrect type");
    }
    if (jwe.encrypted_key !== undefined && typeof jwe.encrypted_key !== "string") {
        throw new JWEInvalid("JWE Encrypted Key incorrect type");
    }
    if (jwe.aad !== undefined && typeof jwe.aad !== "string") {
        throw new JWEInvalid("JWE AAD incorrect type");
    }
    if (jwe.header !== undefined && !isObject(jwe.header)) {
        throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
    }
    if (jwe.unprotected !== undefined && !isObject(jwe.unprotected)) {
        throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
    }
    let parsedProt;
    if (jwe.protected) {
        try {
            const protectedHeader = decode(jwe.protected);
            parsedProt = JSON.parse(decoder.decode(protectedHeader));
        } catch  {
            throw new JWEInvalid("JWE Protected Header is invalid");
        }
    }
    if (!isDisjoint(parsedProt, jwe.header, jwe.unprotected)) {
        throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
        ...parsedProt,
        ...jwe.header,
        ...jwe.unprotected
    };
    validateCrit(JWEInvalid, new Map(), options?.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== undefined) {
        throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== "string" || !alg) {
        throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
    }
    if (typeof enc !== "string" || !enc) {
        throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
    }
    const keyManagementAlgorithms = options && validateAlgorithms("keyManagementAlgorithms", options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options && validateAlgorithms("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2")) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
        throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== undefined) {
        try {
            encryptedKey = decode(jwe.encrypted_key);
        } catch  {
            throw new JWEInvalid("Failed to base64url decode the encrypted_key");
        }
    }
    let resolvedKey = false;
    if (typeof key === "function") {
        key = await key(parsedProt, jwe);
        resolvedKey = true;
    }
    checkKeyType(alg === "dir" ? enc : alg, key, "decrypt");
    const k = await normalizeKey(key, alg);
    let cek;
    try {
        cek = await decryptKeyManagement(alg, k, encryptedKey, joseHeader, options);
    } catch (err) {
        if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) {
            throw err;
        }
        cek = generateCek(enc);
    }
    let iv;
    let tag;
    if (jwe.iv !== undefined) {
        try {
            iv = decode(jwe.iv);
        } catch  {
            throw new JWEInvalid("Failed to base64url decode the iv");
        }
    }
    if (jwe.tag !== undefined) {
        try {
            tag = decode(jwe.tag);
        } catch  {
            throw new JWEInvalid("Failed to base64url decode the tag");
        }
    }
    const protectedHeader = jwe.protected !== undefined ? encode(jwe.protected) : new Uint8Array();
    let additionalData;
    if (jwe.aad !== undefined) {
        additionalData = concat(protectedHeader, encode("."), encode(jwe.aad));
    } else {
        additionalData = protectedHeader;
    }
    let ciphertext;
    try {
        ciphertext = decode(jwe.ciphertext);
    } catch  {
        throw new JWEInvalid("Failed to base64url decode the ciphertext");
    }
    const plaintext = await decrypt_decrypt(enc, cek, ciphertext, iv, tag, additionalData);
    const result = {
        plaintext
    };
    if (jwe.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== undefined) {
        try {
            result.additionalAuthenticatedData = decode(jwe.aad);
        } catch  {
            throw new JWEInvalid("Failed to base64url decode the aad");
        }
    }
    if (jwe.unprotected !== undefined) {
        result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== undefined) {
        result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
        return {
            ...result,
            key: k
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/jwe/compact/decrypt.js



async function compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
        jwe = decoder.decode(jwe);
    }
    if (typeof jwe !== "string") {
        throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
    if (length !== 5) {
        throw new JWEInvalid("Invalid Compact JWE");
    }
    const decrypted = await flattenedDecrypt({
        ciphertext,
        iv: iv || undefined,
        protected: protectedHeader,
        tag: tag || undefined,
        encrypted_key: encryptedKey || undefined
    }, key, options);
    const result = {
        plaintext: decrypted.plaintext,
        protectedHeader: decrypted.protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: decrypted.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/jwt/decrypt.js



async function jwtDecrypt(jwt, key, options) {
    const decrypted = await compactDecrypt(jwt, key, options);
    const payload = validateClaimsSet(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== undefined && protectedHeader.iss !== payload.iss) {
        throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', payload, "iss", "mismatch");
    }
    if (protectedHeader.sub !== undefined && protectedHeader.sub !== payload.sub) {
        throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', payload, "sub", "mismatch");
    }
    if (protectedHeader.aud !== undefined && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
        throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', payload, "aud", "mismatch");
    }
    const result = {
        payload,
        protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: decrypted.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/vendored/cookie.js
/**
 * @source https://github.com/jshttp/cookie
 * @author blakeembrey
 * @license MIT
 */ /**
 * This is a workaround to support ESM-only environments, until `cookie` ships ESM builds.
 * @see https://github.com/jshttp/cookie/issues/211
 */ /**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 */ const cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 */ const cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */ const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */ const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (()=>{
    const C = function() {};
    C.prototype = Object.create(null);
    return C;
})();
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */ function parse(str, options) {
    const obj = new NullObject();
    const len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2) return obj;
    const dec = options?.decode || cookie_decode;
    let index = 0;
    do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) break; // No more cookie pairs.
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        // only assign once
        if (obj[key] === undefined) {
            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            let valEndIdx = endIndex(str, endIdx, valStartIdx);
            const value = dec(str.slice(valStartIdx, valEndIdx));
            obj[key] = value;
        }
        index = endIdx + 1;
    }while (index < len);
    return obj;
}
function startIndex(str, index, max) {
    do {
        const code = str.charCodeAt(index);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) return index;
    }while (++index < max);
    return max;
}
function endIndex(str, index, min) {
    while(index > min){
        const code = str.charCodeAt(--index);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) return index + 1;
    }
    return min;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 */ function serialize(name, val, options) {
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
    }
    const value = enc(val);
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
    }
    let str = name + "=" + value;
    if (!options) return str;
    if (options.maxAge !== undefined) {
        if (!Number.isInteger(options.maxAge)) {
            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
            throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
    }
    if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
            throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
    }
    if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
            throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
        str += "; HttpOnly";
    }
    if (options.secure) {
        str += "; Secure";
    }
    if (options.partitioned) {
        str += "; Partitioned";
    }
    if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : undefined;
        switch(priority){
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
    }
    if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch(sameSite){
            case true:
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 */ function cookie_decode(str) {
    if (str.indexOf("%") === -1) return str;
    try {
        return decodeURIComponent(str);
    } catch (e) {
        return str;
    }
}
/**
 * Determine if value is a Date.
 */ function isDate(val) {
    return __toString.call(val) === "[object Date]";
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/jwt.js
/**
 *
 *
 * This module contains functions and types
 * to encode and decode {@link https://authjs.dev/concepts/session-strategies#jwt-session JWT}s
 * issued and used by Auth.js.
 *
 * The JWT issued by Auth.js is _encrypted by default_, using the _A256CBC-HS512_ algorithm ({@link https://www.rfc-editor.org/rfc/rfc7518.html#section-5.2.5 JWE}).
 * It uses the `AUTH_SECRET` environment variable or the passed `secret` property to derive a suitable encryption key.
 *
 * :::info Note
 * Auth.js JWTs are meant to be used by the same app that issued them.
 * If you need JWT authentication for your third-party API, you should rely on your Identity Provider instead.
 * :::
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/core
 * ```
 *
 * You can then import this submodule from `@auth/core/jwt`.
 *
 * ## Usage
 *
 * :::warning Warning
 * This module *will* be refactored/changed. We do not recommend relying on it right now.
 * :::
 *
 *
 * ## Resources
 *
 * - [What is a JWT session strategy](https://authjs.dev/concepts/session-strategies#jwt-session)
 * - [RFC7519 - JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)
 *
 * @module jwt
 */ 




const { parse: parseCookie } = vendored_cookie_namespaceObject;
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const now = ()=>Date.now() / 1000 | 0;
const alg = "dir";
const enc = "A256CBC-HS512";
/** Issues a JWT. By default, the JWT is encrypted using "A256CBC-HS512". */ async function jwt_encode(params) {
    const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt } = params;
    const secrets = Array.isArray(secret) ? secret : [
        secret
    ];
    const encryptionSecret = await getDerivedEncryptionKey(enc, secrets[0], salt);
    const thumbprint = await calculateJwkThumbprint({
        kty: "oct",
        k: base64url_encode(encryptionSecret)
    }, `sha${encryptionSecret.byteLength << 3}`);
    // @ts-expect-error `jose` allows any object as payload.
    return await new EncryptJWT(token).setProtectedHeader({
        alg,
        enc,
        kid: thumbprint
    }).setIssuedAt().setExpirationTime(now() + maxAge).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
/** Decodes an Auth.js issued JWT. */ async function jwt_decode(params) {
    const { token, secret, salt } = params;
    const secrets = Array.isArray(secret) ? secret : [
        secret
    ];
    if (!token) return null;
    const { payload } = await jwtDecrypt(token, async ({ kid, enc })=>{
        for (const secret of secrets){
            const encryptionSecret = await getDerivedEncryptionKey(enc, secret, salt);
            if (kid === undefined) return encryptionSecret;
            const thumbprint = await calculateJwkThumbprint({
                kty: "oct",
                k: base64url_encode(encryptionSecret)
            }, `sha${encryptionSecret.byteLength << 3}`);
            if (kid === thumbprint) return encryptionSecret;
        }
        throw new Error("no matching decryption secret");
    }, {
        clockTolerance: 15,
        keyManagementAlgorithms: [
            alg
        ],
        contentEncryptionAlgorithms: [
            enc,
            "A256GCM"
        ]
    });
    return payload;
}
async function getToken(params) {
    const { secureCookie, cookieName = defaultCookies(secureCookie ?? false).sessionToken.name, decode: _decode = jwt_decode, salt = cookieName, secret, logger = console, raw, req } = params;
    if (!req) throw new Error("Must pass `req` to JWT getToken()");
    const headers = req.headers instanceof Headers ? req.headers : new Headers(req.headers);
    const sessionStore = new SessionStore({
        name: cookieName,
        options: {
            secure: secureCookie
        }
    }, parseCookie(headers.get("cookie") ?? ""), logger);
    let token = sessionStore.value;
    const authorizationHeader = headers.get("authorization");
    if (!token && authorizationHeader?.split(" ")[0] === "Bearer") {
        const urlEncodedToken = authorizationHeader.split(" ")[1];
        token = decodeURIComponent(urlEncodedToken);
    }
    if (!token) return null;
    if (raw) return token;
    if (!secret) throw new MissingSecret("Must pass `secret` if not set to JWT getToken()");
    try {
        return await _decode({
            token,
            secret,
            salt
        });
    } catch  {
        return null;
    }
}
async function getDerivedEncryptionKey(enc, keyMaterial, salt) {
    let length;
    switch(enc){
        case "A256CBC-HS512":
            length = 64;
            break;
        case "A256GCM":
            length = 32;
            break;
        default:
            throw new Error("Unsupported JWT Content Encryption Algorithm");
    }
    return await web_hkdf("sha256", keyMaterial, salt, `Auth.js Generated Encryption Key (${salt})`, length);
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/callback-url.js
/**
 * Get callback URL based on query param / cookie + validation,
 * and add it to `req.options.callbackUrl`.
 */ async function createCallbackUrl({ options, paramValue, cookieValue }) {
    const { url, callbacks } = options;
    let callbackUrl = url.origin;
    if (paramValue) {
        // If callbackUrl form field or query parameter is passed try to use it if allowed
        callbackUrl = await callbacks.redirect({
            url: paramValue,
            baseUrl: url.origin
        });
    } else if (cookieValue) {
        // If no callbackUrl specified, try using the value from the cookie if allowed
        callbackUrl = await callbacks.redirect({
            url: cookieValue,
            baseUrl: url.origin
        });
    }
    return {
        callbackUrl,
        // Save callback URL in a cookie so that it can be used for subsequent requests in signin/signout/callback flow
        callbackUrlCookie: callbackUrl !== cookieValue ? callbackUrl : undefined
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/logger.js

const red = "\x1b[31m";
const yellow = "\x1b[33m";
const grey = "\x1b[90m";
const logger_reset = "\x1b[0m";
const defaultLogger = {
    error (error) {
        const name = error instanceof AuthError ? error.type : error.name;
        console.error(`${red}[auth][error]${logger_reset} ${name}: ${error.message}`);
        if (error.cause && typeof error.cause === "object" && "err" in error.cause && error.cause.err instanceof Error) {
            const { err, ...data } = error.cause;
            console.error(`${red}[auth][cause]${logger_reset}:`, err.stack);
            if (data) console.error(`${red}[auth][details]${logger_reset}:`, JSON.stringify(data, null, 2));
        } else if (error.stack) {
            console.error(error.stack.replace(/.*/, "").substring(1));
        }
    },
    warn (code) {
        const url = `https://warnings.authjs.dev`;
        console.warn(`${yellow}[auth][warn][${code}]${logger_reset}`, `Read more: ${url}`);
    },
    debug (message, metadata) {
        console.log(`${grey}[auth][debug]:${logger_reset} ${message}`, JSON.stringify(metadata, null, 2));
    }
};
/**
 * Override the built-in logger with user's implementation.
 * Any `undefined` level will use the default logger.
 */ function setLogger(config) {
    const newLogger = {
        ...defaultLogger
    };
    // Turn off debug logging if `debug` isn't set to `true`
    if (!config.debug) newLogger.debug = ()=>{};
    if (config.logger?.error) newLogger.error = config.logger.error;
    if (config.logger?.warn) newLogger.warn = config.logger.warn;
    if (config.logger?.debug) newLogger.debug = config.logger.debug;
    config.logger ?? (config.logger = newLogger);
    return newLogger;
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/actions.js
const actions = [
    "providers",
    "session",
    "csrf",
    "signin",
    "signout",
    "callback",
    "verify-request",
    "error",
    "webauthn-options"
];
function isAuthAction(action) {
    return actions.includes(action);
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/web.js




const { parse: web_parseCookie, serialize: serializeCookie } = vendored_cookie_namespaceObject;
async function getBody(req) {
    if (!("body" in req) || !req.body || req.method !== "POST") return;
    const contentType = req.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        return await req.json();
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
        const params = new URLSearchParams(await req.text());
        return Object.fromEntries(params);
    }
}
async function toInternalRequest(req, config) {
    try {
        if (req.method !== "GET" && req.method !== "POST") throw new UnknownAction("Only GET and POST requests are supported");
        // Defaults are usually set in the `init` function, but this is needed below
        config.basePath ?? (config.basePath = "/auth");
        const url = new URL(req.url);
        const { action, providerId } = parseActionAndProviderId(url.pathname, config.basePath);
        return {
            url,
            action,
            providerId,
            method: req.method,
            headers: Object.fromEntries(req.headers),
            body: req.body ? await getBody(req) : undefined,
            cookies: web_parseCookie(req.headers.get("cookie") ?? "") ?? {},
            error: url.searchParams.get("error") ?? undefined,
            query: Object.fromEntries(url.searchParams)
        };
    } catch (e) {
        const logger = setLogger(config);
        logger.error(e);
        logger.debug("request", req);
    }
}
function toRequest(request) {
    return new Request(request.url, {
        headers: request.headers,
        method: request.method,
        body: request.method === "POST" ? JSON.stringify(request.body ?? {}) : undefined
    });
}
function toResponse(res) {
    const headers = new Headers(res.headers);
    res.cookies?.forEach((cookie)=>{
        const { name, value, options } = cookie;
        const cookieHeader = serializeCookie(name, value, options);
        if (headers.has("Set-Cookie")) headers.append("Set-Cookie", cookieHeader);
        else headers.set("Set-Cookie", cookieHeader);
    });
    let body = res.body;
    if (headers.get("content-type") === "application/json") body = JSON.stringify(res.body);
    else if (headers.get("content-type") === "application/x-www-form-urlencoded") body = new URLSearchParams(res.body).toString();
    const status = res.redirect ? 302 : res.status ?? 200;
    const response = new Response(body, {
        headers,
        status
    });
    if (res.redirect) response.headers.set("Location", res.redirect);
    return response;
}
/** Web compatible method to create a hash, using SHA256 */ async function createHash(message) {
    const data = new TextEncoder().encode(message);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map((b)=>b.toString(16).padStart(2, "0")).join("").toString();
}
/** Web compatible method to create a random string of a given length */ function randomString(size) {
    const i2hex = (i)=>("0" + i.toString(16)).slice(-2);
    const r = (a, i)=>a + i2hex(i);
    const bytes = crypto.getRandomValues(new Uint8Array(size));
    return Array.from(bytes).reduce(r, "");
}
/** @internal Parse the action and provider id from a URL pathname. */ function parseActionAndProviderId(pathname, base) {
    const a = pathname.match(new RegExp(`^${base}(.+)`));
    if (a === null) throw new UnknownAction(`Cannot parse action at ${pathname}`);
    const actionAndProviderId = a.at(-1);
    const b = actionAndProviderId.replace(/^\//, "").split("/").filter(Boolean);
    if (b.length !== 1 && b.length !== 2) throw new UnknownAction(`Cannot parse action at ${pathname}`);
    const [action, providerId] = b;
    if (!isAuthAction(action)) throw new UnknownAction(`Cannot parse action at ${pathname}`);
    if (providerId && ![
        "signin",
        "callback",
        "webauthn-options"
    ].includes(action)) throw new UnknownAction(`Cannot parse action at ${pathname}`);
    return {
        action,
        providerId: providerId == "undefined" ? undefined : providerId
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/callback/oauth/csrf-token.js


/**
 * Ensure CSRF Token cookie is set for any subsequent requests.
 * Used as part of the strategy for mitigation for CSRF tokens.
 *
 * Creates a cookie like 'next-auth.csrf-token' with the value 'token|hash',
 * where 'token' is the CSRF token and 'hash' is a hash made of the token and
 * the secret, and the two values are joined by a pipe '|'. By storing the
 * value and the hash of the value (with the secret used as a salt) we can
 * verify the cookie was set by the server and not by a malicious attacker.
 *
 * For more details, see the following OWASP links:
 * https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
 * https://owasp.org/www-chapter-london/assets/slides/David_Johansson-Double_Defeat_of_Double-Submit_Cookie.pdf
 */ async function createCSRFToken({ options, cookieValue, isPost, bodyValue }) {
    if (cookieValue) {
        const [csrfToken, csrfTokenHash] = cookieValue.split("|");
        const expectedCsrfTokenHash = await createHash(`${csrfToken}${options.secret}`);
        if (csrfTokenHash === expectedCsrfTokenHash) {
            // If hash matches then we trust the CSRF token value
            // If this is a POST request and the CSRF Token in the POST request matches
            // the cookie we have already verified is the one we have set, then the token is verified!
            const csrfTokenVerified = isPost && csrfToken === bodyValue;
            return {
                csrfTokenVerified,
                csrfToken
            };
        }
    }
    // New CSRF token
    const csrfToken = randomString(32);
    const csrfTokenHash = await createHash(`${csrfToken}${options.secret}`);
    const cookie = `${csrfToken}|${csrfTokenHash}`;
    return {
        cookie,
        csrfToken
    };
}
function validateCSRF(action, verified) {
    if (verified) return;
    throw new MissingCSRF(`CSRF token was missing during an action ${action}`);
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/merge.js
function merge_isObject(item) {
    return item !== null && typeof item === "object";
}
/** Deep merge two or more objects */ function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (merge_isObject(target) && merge_isObject(source)) {
        for(const key in source){
            if (merge_isObject(source[key])) {
                if (!merge_isObject(target[key])) target[key] = Array.isArray(source[key]) ? [] : {};
                merge(target[key], source[key]);
            } else if (source[key] !== undefined) target[key] = source[key];
        }
    }
    return merge(target, ...sources);
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/symbols.js
/**
 * :::danger
 * This option is intended for framework authors.
 * :::
 *
 * Auth.js comes with built-in CSRF protection, but
 * if you are implementing a framework that is already protected against CSRF attacks, you can skip this check by
 * passing this value to {@link AuthConfig.skipCSRFCheck}.
 */ const skipCSRFCheck = Symbol("skip-csrf-check");
/**
 * :::danger
 * This option is intended for framework authors.
 * :::
 *
 * Auth.js returns a web standard {@link Response} by default, but
 * if you are implementing a framework you might want to get access to the raw internal response
 * by passing this value to {@link AuthConfig.raw}.
 */ const raw = Symbol("return-type-raw");
/**
 * :::danger
 * This option allows you to override the default `fetch` function used by the provider
 * to make requests to the provider's OAuth endpoints directly.
 * Used incorrectly, it can have security implications.
 * :::
 *
 * It can be used to support corporate proxies, custom fetch libraries, cache discovery endpoints,
 * add mocks for testing, logging, set custom headers/params for non-spec compliant providers, etc.
 *
 * @example
 * ```ts
 * import { Auth, customFetch } from "@auth/core"
 * import GitHub from "@auth/core/providers/github"
 *
 * const dispatcher = new ProxyAgent("my.proxy.server")
 * function proxy(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
 *   return undici(args[0], { ...(args[1] ?? {}), dispatcher })
 * }
 *
 * const response = await Auth(request, {
 *   providers: [GitHub({ [customFetch]: proxy })]
 * })
 * ```
 *
 * @see https://undici.nodejs.org/#/docs/api/ProxyAgent?id=example-basic-proxy-request-with-local-agent-dispatcher
 * @see https://authjs.dev/guides/corporate-proxy
 */ const customFetch = Symbol("custom-fetch");
/**
 * @internal
 *
 * Used to mark some providers for processing within the core library.
 *
 * **Do not use or you will be fired.**
 */ const conformInternal = Symbol("conform-internal");

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/providers.js


/**
 * Adds `signinUrl` and `callbackUrl` to each provider
 * and deep merge user-defined options.
 */ function parseProviders(params) {
    const { providerId, config } = params;
    const url = new URL(config.basePath ?? "/auth", params.url.origin);
    const providers = config.providers.map((p)=>{
        const provider = typeof p === "function" ? p() : p;
        const { options: userOptions, ...defaults } = provider;
        const id = userOptions?.id ?? defaults.id;
        // TODO: Support if properties have different types, e.g. authorization: string or object
        const merged = merge(defaults, userOptions, {
            signinUrl: `${url}/signin/${id}`,
            callbackUrl: `${url}/callback/${id}`
        });
        if (provider.type === "oauth" || provider.type === "oidc") {
            merged.redirectProxyUrl ?? (merged.redirectProxyUrl = userOptions?.redirectProxyUrl ?? config.redirectProxyUrl);
            const normalized = normalizeOAuth(merged);
            // We currently don't support redirect proxies for response_mode=form_post
            if (normalized.authorization?.url.searchParams.get("response_mode") === "form_post") {
                delete normalized.redirectProxyUrl;
            }
            // @ts-expect-error Symbols don't get merged by the `merge` function
            // so we need to do it manually.
            normalized[customFetch] ?? (normalized[customFetch] = userOptions?.[customFetch]);
            return normalized;
        }
        return merged;
    });
    const provider = providers.find(({ id })=>id === providerId);
    if (providerId && !provider) {
        const availableProviders = providers.map((p)=>p.id).join(", ");
        throw new Error(`Provider with id "${providerId}" not found. Available providers: [${availableProviders}].`);
    }
    return {
        providers,
        provider
    };
}
// TODO: Also add discovery here, if some endpoints/config are missing.
// We should return both a client and authorization server config.
function normalizeOAuth(c) {
    if (c.issuer) c.wellKnown ?? (c.wellKnown = `${c.issuer}/.well-known/openid-configuration`);
    const authorization = normalizeEndpoint(c.authorization, c.issuer);
    if (authorization && !authorization.url?.searchParams.has("scope")) {
        authorization.url.searchParams.set("scope", "openid profile email");
    }
    const token = normalizeEndpoint(c.token, c.issuer);
    const userinfo = normalizeEndpoint(c.userinfo, c.issuer);
    const checks = c.checks ?? [
        "pkce"
    ];
    if (c.redirectProxyUrl) {
        if (!checks.includes("state")) checks.push("state");
        c.redirectProxyUrl = `${c.redirectProxyUrl}/callback/${c.id}`;
    }
    return {
        ...c,
        authorization,
        token,
        checks,
        userinfo,
        profile: c.profile ?? defaultProfile,
        account: c.account ?? defaultAccount
    };
}
/**
 * Returns basic user profile from the userinfo response/`id_token` claims.
 * The returned `id` will become the `account.providerAccountId`. `user.id`
 * and `account.id` are auto-generated UUID's.
 *
 * The result if this function is used to create the `User` in the database.
 * @see https://authjs.dev/reference/core/adapters#user
 * @see https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 * @see https://openid.net/specs/openid-connect-core-1_0.html#
 */ const defaultProfile = (profile)=>{
    return stripUndefined({
        id: profile.sub ?? profile.id ?? crypto.randomUUID(),
        name: profile.name ?? profile.nickname ?? profile.preferred_username,
        email: profile.email,
        image: profile.picture
    });
};
/**
 * Returns basic OAuth/OIDC values from the token response.
 * @see https://www.ietf.org/rfc/rfc6749.html#section-5.1
 * @see https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse
 * @see https://authjs.dev/reference/core/adapters#account
 */ const defaultAccount = (account)=>{
    return stripUndefined({
        access_token: account.access_token,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at,
        scope: account.scope,
        token_type: account.token_type,
        session_state: account.session_state
    });
};
function stripUndefined(o) {
    const result = {};
    for (const [k, v] of Object.entries(o)){
        if (v !== undefined) result[k] = v;
    }
    return result;
}
function normalizeEndpoint(e, issuer) {
    if (!e && issuer) return;
    if (typeof e === "string") {
        return {
            url: new URL(e)
        };
    }
    // If e.url is undefined, it's because the provider config
    // assumes that we will use the issuer endpoint.
    // The existence of either e.url or provider.issuer is checked in
    // assert.ts. We fallback to "https://authjs.dev" to be able to pass around
    // a valid URL even if the user only provided params.
    // NOTE: This need to be checked when constructing the URL
    // for the authorization, token and userinfo endpoints.
    const url = new URL(e?.url ?? "https://authjs.dev");
    if (e?.params != null) {
        for (let [key, value] of Object.entries(e.params)){
            if (key === "claims") {
                value = JSON.stringify(value);
            }
            url.searchParams.set(key, String(value));
        }
    }
    return {
        url,
        request: e?.request,
        conform: e?.conform,
        ...e?.clientPrivateKey ? {
            clientPrivateKey: e?.clientPrivateKey
        } : null
    };
}
function isOIDCProvider(provider) {
    return provider.type === "oidc";
}
function isOAuth2Provider(provider) {
    return provider.type === "oauth";
}
/** Either OAuth 2 or OIDC */ function isOAuthProvider(provider) {
    return provider.type === "oauth" || provider.type === "oidc";
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/init.js








const defaultCallbacks = {
    signIn () {
        return true;
    },
    redirect ({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
    },
    session ({ session }) {
        return {
            user: {
                name: session.user?.name,
                email: session.user?.email,
                image: session.user?.image
            },
            expires: session.expires?.toISOString?.() ?? session.expires
        };
    },
    jwt ({ token }) {
        return token;
    }
};
/** Initialize all internal options and cookies. */ async function init({ authOptions: config, providerId, action, url, cookies: reqCookies, callbackUrl: reqCallbackUrl, csrfToken: reqCsrfToken, csrfDisabled, isPost }) {
    const logger = setLogger(config);
    const { providers, provider } = parseProviders({
        url,
        providerId,
        config
    });
    const maxAge = 30 * 24 * 60 * 60; // Sessions expire after 30 days of being idle by default
    let isOnRedirectProxy = false;
    if ((provider?.type === "oauth" || provider?.type === "oidc") && provider.redirectProxyUrl) {
        try {
            isOnRedirectProxy = new URL(provider.redirectProxyUrl).origin === url.origin;
        } catch  {
            throw new TypeError(`redirectProxyUrl must be a valid URL. Received: ${provider.redirectProxyUrl}`);
        }
    }
    // User provided options are overridden by other options,
    // except for the options with special handling above
    const options = {
        debug: false,
        pages: {},
        theme: {
            colorScheme: "auto",
            logo: "",
            brandColor: "",
            buttonText: ""
        },
        // Custom options override defaults
        ...config,
        // These computed settings can have values in userOptions but we override them
        // and are request-specific.
        url,
        action,
        // @ts-expect-errors
        provider,
        cookies: merge(cookie_defaultCookies(config.useSecureCookies ?? url.protocol === "https:"), config.cookies),
        providers,
        // Session options
        session: {
            // If no adapter specified, force use of JSON Web Tokens (stateless)
            strategy: config.adapter ? "database" : "jwt",
            maxAge,
            updateAge: 24 * 60 * 60,
            generateSessionToken: ()=>crypto.randomUUID(),
            ...config.session
        },
        // JWT options
        jwt: {
            secret: config.secret,
            maxAge: config.session?.maxAge ?? maxAge,
            encode: jwt_encode,
            decode: jwt_decode,
            ...config.jwt
        },
        // Event messages
        events: eventsErrorHandler(config.events ?? {}, logger),
        adapter: adapterErrorHandler(config.adapter, logger),
        // Callback functions
        callbacks: {
            ...defaultCallbacks,
            ...config.callbacks
        },
        logger,
        callbackUrl: url.origin,
        isOnRedirectProxy,
        experimental: {
            ...config.experimental
        }
    };
    // Init cookies
    const cookies = [];
    if (csrfDisabled) {
        options.csrfTokenVerified = true;
    } else {
        const { csrfToken, cookie: csrfCookie, csrfTokenVerified } = await createCSRFToken({
            options,
            cookieValue: reqCookies?.[options.cookies.csrfToken.name],
            isPost,
            bodyValue: reqCsrfToken
        });
        options.csrfToken = csrfToken;
        options.csrfTokenVerified = csrfTokenVerified;
        if (csrfCookie) {
            cookies.push({
                name: options.cookies.csrfToken.name,
                value: csrfCookie,
                options: options.cookies.csrfToken.options
            });
        }
    }
    const { callbackUrl, callbackUrlCookie } = await createCallbackUrl({
        options,
        cookieValue: reqCookies?.[options.cookies.callbackUrl.name],
        paramValue: reqCallbackUrl
    });
    options.callbackUrl = callbackUrl;
    if (callbackUrlCookie) {
        cookies.push({
            name: options.cookies.callbackUrl.name,
            value: callbackUrlCookie,
            options: options.cookies.callbackUrl.options
        });
    }
    return {
        options,
        cookies
    };
}
/** Wraps an object of methods and adds error handling. */ function eventsErrorHandler(methods, logger) {
    return Object.keys(methods).reduce((acc, name)=>{
        acc[name] = async (...args)=>{
            try {
                const method = methods[name];
                return await method(...args);
            } catch (e) {
                logger.error(new EventError(e));
            }
        };
        return acc;
    }, {});
}
/** Handles adapter induced errors. */ function adapterErrorHandler(adapter, logger) {
    if (!adapter) return;
    return Object.keys(adapter).reduce((acc, name)=>{
        acc[name] = async (...args)=>{
            try {
                logger.debug(`adapter_${name}`, {
                    args
                });
                const method = adapter[name];
                return await method(...args);
            } catch (e) {
                const error = new AdapterError(e);
                logger.error(error);
                throw error;
            }
        };
        return acc;
    }, {});
}

;// CONCATENATED MODULE: ./node_modules/preact/dist/preact.module.js
var preact_module_n, preact_module_l, u, preact_module_t, i, o, preact_module_r, f, preact_module_e, c, s, a, h = {}, v = [], p = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, y = Array.isArray;
function d(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function w(n) {
    n && n.parentNode && n.parentNode.removeChild(n);
}
function _(l, u, t) {
    var i, o, r, f = {};
    for(r in u)"key" == r ? i = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? preact_module_n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for(r in l.defaultProps)void 0 === f[r] && (f[r] = l.defaultProps[r]);
    return g(l, f, i, o, null);
}
function g(n, t, i, o, r) {
    var f = {
        type: n,
        props: t,
        key: i,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: null == r ? ++u : r,
        __i: -1,
        __u: 0
    };
    return null == r && null != preact_module_l.vnode && preact_module_l.vnode(f), f;
}
function m() {
    return {
        current: null
    };
}
function preact_module_b(n) {
    return n.children;
}
function k(n, l) {
    this.props = n, this.context = l;
}
function x(n, l) {
    if (null == l) return n.__ ? x(n.__, n.__i + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? x(n) : null;
}
function C(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return C(n);
    }
}
function S(n) {
    (!n.__d && (n.__d = !0) && i.push(n) && !M.__r++ || o !== preact_module_l.debounceRendering) && ((o = preact_module_l.debounceRendering) || preact_module_r)(M);
}
function M() {
    var n, u, t, o, r, e, c, s;
    for(i.sort(f); n = i.shift();)n.__d && (u = i.length, o = void 0, e = (r = (t = n).__v).__e, c = [], s = [], t.__P && ((o = d({}, r)).__v = r.__v + 1, preact_module_l.vnode && preact_module_l.vnode(o), O(t.__P, o, r, t.__n, t.__P.namespaceURI, 32 & r.__u ? [
        e
    ] : null, c, null == e ? x(r) : e, !!(32 & r.__u), s), o.__v = r.__v, o.__.__k[o.__i] = o, j(c, o, s), o.__e != e && C(o)), i.length > u && i.sort(f));
    M.__r = 0;
}
function P(n, l, u, t, i, o, r, f, e, c, s) {
    var a, p, y, d, w, _ = t && t.__k || v, g = l.length;
    for(u.__d = e, $(u, l, _), e = u.__d, a = 0; a < g; a++)null != (y = u.__k[a]) && (p = -1 === y.__i ? h : _[y.__i] || h, y.__i = a, O(n, y, p, i, o, r, f, e, c, s), d = y.__e, y.ref && p.ref != y.ref && (p.ref && N(p.ref, null, y), s.push(y.ref, y.__c || d, y)), null == w && null != d && (w = d), 65536 & y.__u || p.__k === y.__k ? e = I(y, e, n) : "function" == typeof y.type && void 0 !== y.__d ? e = y.__d : d && (e = d.nextSibling), y.__d = void 0, y.__u &= -196609);
    u.__d = e, u.__e = w;
}
function $(n, l, u) {
    var t, i, o, r, f, e = l.length, c = u.length, s = c, a = 0;
    for(n.__k = [], t = 0; t < e; t++)null != (i = l[t]) && "boolean" != typeof i && "function" != typeof i ? (r = t + a, (i = n.__k[t] = "string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? g(null, i, null, null, null) : y(i) ? g(preact_module_b, {
        children: i
    }, null, null, null) : void 0 === i.constructor && i.__b > 0 ? g(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = n, i.__b = n.__b + 1, o = null, -1 !== (f = i.__i = L(i, u, r, s)) && (s--, (o = u[f]) && (o.__u |= 131072)), null == o || null === o.__v ? (-1 == f && a--, "function" != typeof i.type && (i.__u |= 65536)) : f !== r && (f == r - 1 ? a-- : f == r + 1 ? a++ : (f > r ? a-- : a++, i.__u |= 65536))) : i = n.__k[t] = null;
    if (s) for(t = 0; t < c; t++)null != (o = u[t]) && 0 == (131072 & o.__u) && (o.__e == n.__d && (n.__d = x(o)), V(o, o));
}
function I(n, l, u) {
    var t, i;
    if ("function" == typeof n.type) {
        for(t = n.__k, i = 0; t && i < t.length; i++)t[i] && (t[i].__ = n, l = I(t[i], l, u));
        return l;
    }
    n.__e != l && (l && n.type && !u.contains(l) && (l = x(n)), u.insertBefore(n.__e, l || null), l = n.__e);
    do {
        l = l && l.nextSibling;
    }while (null != l && 8 === l.nodeType);
    return l;
}
function H(n, l) {
    return l = l || [], null == n || "boolean" == typeof n || (y(n) ? n.some(function(n) {
        H(n, l);
    }) : l.push(n)), l;
}
function L(n, l, u, t) {
    var i = n.key, o = n.type, r = u - 1, f = u + 1, e = l[u];
    if (null === e || e && i == e.key && o === e.type && 0 == (131072 & e.__u)) return u;
    if (t > (null != e && 0 == (131072 & e.__u) ? 1 : 0)) for(; r >= 0 || f < l.length;){
        if (r >= 0) {
            if ((e = l[r]) && 0 == (131072 & e.__u) && i == e.key && o === e.type) return r;
            r--;
        }
        if (f < l.length) {
            if ((e = l[f]) && 0 == (131072 & e.__u) && i == e.key && o === e.type) return f;
            f++;
        }
    }
    return -1;
}
function T(n, l, u) {
    "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || p.test(l) ? u : u + "px";
}
function A(n, l, u, t, i) {
    var o;
    n: if ("style" === l) if ("string" == typeof u) n.style.cssText = u;
    else {
        if ("string" == typeof t && (n.style.cssText = t = ""), t) for(l in t)u && l in u || T(n.style, l, "");
        if (u) for(l in u)t && u[l] === t[l] || T(n.style, l, u[l]);
    }
    else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/(PointerCapture)$|Capture$/i, "$1")), l = l.toLowerCase() in n || "onFocusOut" === l || "onFocusIn" === l ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? t ? u.u = t.u : (u.u = preact_module_e, n.addEventListener(l, o ? s : c, o)) : n.removeEventListener(l, o ? s : c, o);
    else {
        if ("http://www.w3.org/2000/svg" == i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" != l && "height" != l && "href" != l && "list" != l && "form" != l && "tabIndex" != l && "download" != l && "rowSpan" != l && "colSpan" != l && "role" != l && "popover" != l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
        } catch (n) {}
        "function" == typeof u || (null == u || !1 === u && "-" !== l[4] ? n.removeAttribute(l) : n.setAttribute(l, "popover" == l && 1 == u ? "" : u));
    }
}
function F(n) {
    return function(u) {
        if (this.l) {
            var t = this.l[u.type + n];
            if (null == u.t) u.t = preact_module_e++;
            else if (u.t < t.u) return;
            return t(preact_module_l.event ? preact_module_l.event(u) : u);
        }
    };
}
function O(n, u, t, i, o, r, f, e, c, s) {
    var a, h, v, p, w, _, g, m, x, C, S, M, $, I, H, L, T = u.type;
    if (void 0 !== u.constructor) return null;
    128 & t.__u && (c = !!(32 & t.__u), r = [
        e = u.__e = t.__e
    ]), (a = preact_module_l.__b) && a(u);
    n: if ("function" == typeof T) try {
        if (m = u.props, x = "prototype" in T && T.prototype.render, C = (a = T.contextType) && i[a.__c], S = a ? C ? C.props.value : a.__ : i, t.__c ? g = (h = u.__c = t.__c).__ = h.__E : (x ? u.__c = h = new T(m, S) : (u.__c = h = new k(m, S), h.constructor = T, h.render = q), C && C.sub(h), h.props = m, h.state || (h.state = {}), h.context = S, h.__n = i, v = h.__d = !0, h.__h = [], h._sb = []), x && null == h.__s && (h.__s = h.state), x && null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = d({}, h.__s)), d(h.__s, T.getDerivedStateFromProps(m, h.__s))), p = h.props, w = h.state, h.__v = u, v) x && null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), x && null != h.componentDidMount && h.__h.push(h.componentDidMount);
        else {
            if (x && null == T.getDerivedStateFromProps && m !== p && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, S), !h.__e && (null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, S) || u.__v === t.__v)) {
                for(u.__v !== t.__v && (h.props = m, h.state = h.__s, h.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n) {
                    n && (n.__ = u);
                }), M = 0; M < h._sb.length; M++)h.__h.push(h._sb[M]);
                h._sb = [], h.__h.length && f.push(h);
                break n;
            }
            null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, S), x && null != h.componentDidUpdate && h.__h.push(function() {
                h.componentDidUpdate(p, w, _);
            });
        }
        if (h.context = S, h.props = m, h.__P = n, h.__e = !1, $ = preact_module_l.__r, I = 0, x) {
            for(h.state = h.__s, h.__d = !1, $ && $(u), a = h.render(h.props, h.state, h.context), H = 0; H < h._sb.length; H++)h.__h.push(h._sb[H]);
            h._sb = [];
        } else do {
            h.__d = !1, $ && $(u), a = h.render(h.props, h.state, h.context), h.state = h.__s;
        }while (h.__d && ++I < 25);
        h.state = h.__s, null != h.getChildContext && (i = d(d({}, i), h.getChildContext())), x && !v && null != h.getSnapshotBeforeUpdate && (_ = h.getSnapshotBeforeUpdate(p, w)), P(n, y(L = null != a && a.type === preact_module_b && null == a.key ? a.props.children : a) ? L : [
            L
        ], u, t, i, o, r, f, e, c, s), h.base = u.__e, u.__u &= -161, h.__h.length && f.push(h), g && (h.__E = h.__ = null);
    } catch (n) {
        if (u.__v = null, c || null != r) {
            for(u.__u |= c ? 160 : 128; e && 8 === e.nodeType && e.nextSibling;)e = e.nextSibling;
            r[r.indexOf(e)] = null, u.__e = e;
        } else u.__e = t.__e, u.__k = t.__k;
        preact_module_l.__e(n, u, t);
    }
    else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = z(t.__e, u, t, i, o, r, f, c, s);
    (a = preact_module_l.diffed) && a(u);
}
function j(n, u, t) {
    u.__d = void 0;
    for(var i = 0; i < t.length; i++)N(t[i], t[++i], t[++i]);
    preact_module_l.__c && preact_module_l.__c(u, n), n.some(function(u) {
        try {
            n = u.__h, u.__h = [], n.some(function(n) {
                n.call(u);
            });
        } catch (n) {
            preact_module_l.__e(n, u.__v);
        }
    });
}
function z(u, t, i, o, r, f, e, c, s) {
    var a, v, p, d, _, g, m, b = i.props, k = t.props, C = t.type;
    if ("svg" === C ? r = "http://www.w3.org/2000/svg" : "math" === C ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), null != f) {
        for(a = 0; a < f.length; a++)if ((_ = f[a]) && "setAttribute" in _ == !!C && (C ? _.localName === C : 3 === _.nodeType)) {
            u = _, f[a] = null;
            break;
        }
    }
    if (null == u) {
        if (null === C) return document.createTextNode(k);
        u = document.createElementNS(r, C, k.is && k), c && (preact_module_l.__m && preact_module_l.__m(t, f), c = !1), f = null;
    }
    if (null === C) b === k || c && u.data === k || (u.data = k);
    else {
        if (f = f && preact_module_n.call(u.childNodes), b = i.props || h, !c && null != f) for(b = {}, a = 0; a < u.attributes.length; a++)b[(_ = u.attributes[a]).name] = _.value;
        for(a in b)if (_ = b[a], "children" == a) ;
        else if ("dangerouslySetInnerHTML" == a) p = _;
        else if (!(a in k)) {
            if ("value" == a && "defaultValue" in k || "checked" == a && "defaultChecked" in k) continue;
            A(u, a, null, _, r);
        }
        for(a in k)_ = k[a], "children" == a ? d = _ : "dangerouslySetInnerHTML" == a ? v = _ : "value" == a ? g = _ : "checked" == a ? m = _ : c && "function" != typeof _ || b[a] === _ || A(u, a, _, b[a], r);
        if (v) c || p && (v.__html === p.__html || v.__html === u.innerHTML) || (u.innerHTML = v.__html), t.__k = [];
        else if (p && (u.innerHTML = ""), P(u, y(d) ? d : [
            d
        ], t, i, o, "foreignObject" === C ? "http://www.w3.org/1999/xhtml" : r, f, e, f ? f[0] : i.__k && x(i, 0), c, s), null != f) for(a = f.length; a--;)w(f[a]);
        c || (a = "value", "progress" === C && null == g ? u.removeAttribute("value") : void 0 !== g && (g !== u[a] || "progress" === C && !g || "option" === C && g !== b[a]) && A(u, a, g, b[a], r), a = "checked", void 0 !== m && m !== u[a] && A(u, a, m, b[a], r));
    }
    return u;
}
function N(n, u, t) {
    try {
        if ("function" == typeof n) {
            var i = "function" == typeof n.__u;
            i && n.__u(), i && null == u || (n.__u = n(u));
        } else n.current = u;
    } catch (n) {
        preact_module_l.__e(n, t);
    }
}
function V(n, u, t) {
    var i, o;
    if (preact_module_l.unmount && preact_module_l.unmount(n), (i = n.ref) && (i.current && i.current !== n.__e || N(i, null, u)), null != (i = n.__c)) {
        if (i.componentWillUnmount) try {
            i.componentWillUnmount();
        } catch (n) {
            preact_module_l.__e(n, u);
        }
        i.base = i.__P = null;
    }
    if (i = n.__k) for(o = 0; o < i.length; o++)i[o] && V(i[o], u, t || "function" != typeof n.type);
    t || w(n.__e), n.__c = n.__ = n.__e = n.__d = void 0;
}
function q(n, l, u) {
    return this.constructor(n, u);
}
function B(u, t, i) {
    var o, r, f, e;
    preact_module_l.__ && preact_module_l.__(u, t), r = (o = "function" == typeof i) ? null : i && i.__k || t.__k, f = [], e = [], O(t, u = (!o && i || t).__k = _(preact_module_b, null, [
        u
    ]), r || h, h, t.namespaceURI, !o && i ? [
        i
    ] : r ? null : t.firstChild ? preact_module_n.call(t.childNodes) : null, f, !o && i ? i : r ? r.__e : t.firstChild, o, e), j(f, u, e);
}
function D(n, l) {
    B(n, l, D);
}
function E(l, u, t) {
    var i, o, r, f, e = d({}, l.props);
    for(r in l.type && l.type.defaultProps && (f = l.type.defaultProps), u)"key" == r ? i = u[r] : "ref" == r ? o = u[r] : e[r] = void 0 === u[r] && void 0 !== f ? f[r] : u[r];
    return arguments.length > 2 && (e.children = arguments.length > 3 ? preact_module_n.call(arguments, 2) : t), g(l.type, e, i || l.key, o || l.ref, null);
}
function G(n, l) {
    var u = {
        __c: l = "__cC" + a++,
        __: n,
        Consumer: function(n, l) {
            return n.children(l);
        },
        Provider: function(n) {
            var u, t;
            return this.getChildContext || (u = new Set, (t = {})[l] = this, this.getChildContext = function() {
                return t;
            }, this.componentWillUnmount = function() {
                u = null;
            }, this.shouldComponentUpdate = function(n) {
                this.props.value !== n.value && u.forEach(function(n) {
                    n.__e = !0, S(n);
                });
            }, this.sub = function(n) {
                u.add(n);
                var l = n.componentWillUnmount;
                n.componentWillUnmount = function() {
                    u && u.delete(n), l && l.call(n);
                };
            }), n.children;
        }
    };
    return u.Provider.__ = u.Consumer.contextType = u;
}
preact_module_n = v.slice, preact_module_l = {
    __e: function(n, l, u, t) {
        for(var i, o, r; l = l.__;)if ((i = l.__c) && !i.__) try {
            if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(n)), r = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), r = i.__d), r) return i.__E = i;
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, u = 0, preact_module_t = function(n) {
    return null != n && null == n.constructor;
}, k.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n && (n = n(d({}, u), this.props)), n && d(u, n), null != n && this.__v && (l && this._sb.push(l), S(this));
}, k.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), S(this));
}, k.prototype.render = preact_module_b, i = [], preact_module_r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n, l) {
    return n.__v.__b - l.__v.__b;
}, M.__r = 0, preact_module_e = 0, c = F(!1), s = F(!0), a = 0;
 //# sourceMappingURL=preact.module.js.map

;// CONCATENATED MODULE: ./node_modules/preact-render-to-string/dist/index.module.js

var index_module_r = /[\s\n\\/='"\0<>]/, index_module_o = /^(xlink|xmlns|xml)([A-Z])/, index_module_i = /^accessK|^auto[A-Z]|^cell|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z]/, index_module_a = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, index_module_c = new Set([
    "draggable",
    "spellcheck"
]), index_module_s = /["&<]/;
function l(e) {
    if (0 === e.length || !1 === index_module_s.test(e)) return e;
    for(var t = 0, n = 0, r = "", o = ""; n < e.length; n++){
        switch(e.charCodeAt(n)){
            case 34:
                o = "&quot;";
                break;
            case 38:
                o = "&amp;";
                break;
            case 60:
                o = "&lt;";
                break;
            default:
                continue;
        }
        n !== t && (r += e.slice(t, n)), r += o, t = n + 1;
    }
    return n !== t && (r += e.slice(t, n)), r;
}
var index_module_u = {}, index_module_f = new Set([
    "animation-iteration-count",
    "border-image-outset",
    "border-image-slice",
    "border-image-width",
    "box-flex",
    "box-flex-group",
    "box-ordinal-group",
    "column-count",
    "fill-opacity",
    "flex",
    "flex-grow",
    "flex-negative",
    "flex-order",
    "flex-positive",
    "flex-shrink",
    "flood-opacity",
    "font-weight",
    "grid-column",
    "grid-row",
    "line-clamp",
    "line-height",
    "opacity",
    "order",
    "orphans",
    "stop-opacity",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "tab-size",
    "widows",
    "z-index",
    "zoom"
]), index_module_p = /[A-Z]/g;
function index_module_h(e) {
    var t = "";
    for(var n in e){
        var r = e[n];
        if (null != r && "" !== r) {
            var o = "-" == n[0] ? n : index_module_u[n] || (index_module_u[n] = n.replace(index_module_p, "-$&").toLowerCase()), i = ";";
            "number" != typeof r || o.startsWith("--") || index_module_f.has(o) || (i = "px;"), t = t + o + ":" + r + i;
        }
    }
    return t || void 0;
}
function index_module_d() {
    this.__d = !0;
}
function index_module_(e, t) {
    return {
        __v: e,
        context: t,
        props: e.props,
        setState: index_module_d,
        forceUpdate: index_module_d,
        __d: !0,
        __h: new Array(0)
    };
}
function index_module_v(e, t, n) {
    if (!e.s) {
        if (n instanceof index_module_m) {
            if (!n.s) return void (n.o = index_module_v.bind(null, e, t));
            1 & t && (t = n.s), n = n.v;
        }
        if (n && n.then) return void n.then(index_module_v.bind(null, e, t), index_module_v.bind(null, e, 2));
        e.s = t, e.v = n;
        const r = e.o;
        r && r(e);
    }
}
var index_module_m = /*#__PURE__*/ (/* unused pure expression or super */ null && (function() {
    function e() {}
    return e.prototype.then = function(t, n) {
        var r = new e, o = this.s;
        if (o) {
            var i = 1 & o ? t : n;
            if (i) {
                try {
                    index_module_v(r, 1, i(this.v));
                } catch (e) {
                    index_module_v(r, 2, e);
                }
                return r;
            }
            return this;
        }
        return this.o = function(e) {
            try {
                var o = e.v;
                1 & e.s ? index_module_v(r, 1, t ? t(o) : o) : n ? index_module_v(r, 1, n(o)) : index_module_v(r, 2, o);
            } catch (e) {
                index_module_v(r, 2, e);
            }
        }, r;
    }, e;
}()));
function index_module_y(e) {
    return e instanceof index_module_m && 1 & e.s;
}
function index_module_g(e, t, n) {
    for(var r;;){
        var o = e();
        if (index_module_y(o) && (o = o.v), !o) return i;
        if (o.then) {
            r = 0;
            break;
        }
        var i = n();
        if (i && i.then) {
            if (!index_module_y(i)) {
                r = 1;
                break;
            }
            i = i.s;
        }
        if (t) {
            var a = t();
            if (a && a.then && !index_module_y(a)) {
                r = 2;
                break;
            }
        }
    }
    var c = new index_module_m, s = index_module_v.bind(null, c, 2);
    return (0 === r ? o.then(u) : 1 === r ? i.then(l) : a.then(f)).then(void 0, s), c;
    function l(r) {
        i = r;
        do {
            if (t && (a = t()) && a.then && !index_module_y(a)) return void a.then(f).then(void 0, s);
            if (!(o = e()) || index_module_y(o) && !o.v) return void index_module_v(c, 1, i);
            if (o.then) return void o.then(u).then(void 0, s);
            index_module_y(i = n()) && (i = i.v);
        }while (!i || !i.then);
        i.then(l).then(void 0, s);
    }
    function u(e) {
        e ? (i = n()) && i.then ? i.then(l).then(void 0, s) : l(i) : index_module_v(c, 1, i);
    }
    function f() {
        (o = e()) ? o.then ? o.then(u).then(void 0, s) : u(o) : index_module_v(c, 1, i);
    }
}
function b(e, t) {
    try {
        var n = e();
    } catch (e) {
        return t(!0, e);
    }
    return n && n.then ? n.then(t.bind(null, !1), t.bind(null, !0)) : t(!1, n);
}
var index_module_k, index_module_w, index_module_x, index_module_C, index_module_S = function(r, o) {
    try {
        var i = e.__s;
        e.__s = !0, index_module_k = e.__b, index_module_w = e.diffed, index_module_x = e.__r, index_module_C = e.unmount;
        var a = t(n, null);
        return a.__k = [
            r
        ], Promise.resolve(b(function() {
            return Promise.resolve(U(r, o || index_module_A, !1, void 0, a, !0, void 0)).then(function(e) {
                var t, n = function() {
                    if (index_module_E(e)) {
                        var n = function() {
                            var e = o.join(index_module_j);
                            return t = 1, e;
                        }, r = 0, o = e, i = index_module_g(function() {
                            return !!o.some(function(e) {
                                return e && "function" == typeof e.then;
                            }) && r++ < 25;
                        }, void 0, function() {
                            return Promise.resolve(Promise.all(o)).then(function(e) {
                                o = e.flat();
                            });
                        });
                        return i && i.then ? i.then(n) : n();
                    }
                }();
                return n && n.then ? n.then(function(n) {
                    return t ? n : e;
                }) : t ? n : e;
            });
        }, function(t, n) {
            if (e.__c && e.__c(r, index_module_L), e.__s = i, index_module_L.length = 0, t) throw n;
            return n;
        }));
    } catch (e) {
        return Promise.reject(e);
    }
}, index_module_A = {}, index_module_L = [], index_module_E = Array.isArray, index_module_T = Object.assign, index_module_j = "";
function index_module_D(r, o, i) {
    var a = preact_module_l.__s;
    preact_module_l.__s = !0, index_module_k = preact_module_l.__b, index_module_w = preact_module_l.diffed, index_module_x = preact_module_l.__r, index_module_C = preact_module_l.unmount;
    var c = _(preact_module_b, null);
    c.__k = [
        r
    ];
    try {
        var s = U(r, o || index_module_A, !1, void 0, c, !1, i);
        return index_module_E(s) ? s.join(index_module_j) : s;
    } catch (e) {
        if (e.then) throw new Error('Use "renderToStringAsync" for suspenseful rendering.');
        throw e;
    } finally{
        preact_module_l.__c && preact_module_l.__c(r, index_module_L), preact_module_l.__s = a, index_module_L.length = 0;
    }
}
function index_module_P(e, t) {
    var n, r = e.type, o = !0;
    return e.__c ? (o = !1, (n = e.__c).state = n.__s) : n = new r(e.props, t), e.__c = n, n.__v = e, n.props = e.props, n.context = t, n.__d = !0, null == n.state && (n.state = index_module_A), null == n.__s && (n.__s = n.state), r.getDerivedStateFromProps ? n.state = index_module_T({}, n.state, r.getDerivedStateFromProps(n.props, n.state)) : o && n.componentWillMount ? (n.componentWillMount(), n.state = n.__s !== n.state ? n.__s : n.state) : !o && n.componentWillUpdate && n.componentWillUpdate(), index_module_x && index_module_x(e), n.render(n.props, n.state, t);
}
function U(t, s, u, f, p, d, v) {
    if (null == t || !0 === t || !1 === t || t === index_module_j) return index_module_j;
    var m = typeof t;
    if ("object" != m) return "function" == m ? index_module_j : "string" == m ? l(t) : t + index_module_j;
    if (index_module_E(t)) {
        var y, g = index_module_j;
        p.__k = t;
        for(var b = 0; b < t.length; b++){
            var S = t[b];
            if (null != S && "boolean" != typeof S) {
                var L, D = U(S, s, u, f, p, d, v);
                "string" == typeof D ? g += D : (y || (y = []), g && y.push(g), g = index_module_j, index_module_E(D) ? (L = y).push.apply(L, D) : y.push(D));
            }
        }
        return y ? (g && y.push(g), y) : g;
    }
    if (void 0 !== t.constructor) return index_module_j;
    t.__ = p, index_module_k && index_module_k(t);
    var F = t.type, M = t.props;
    if ("function" == typeof F) {
        var W, $, z, H = s;
        if (F === preact_module_b) {
            if ("tpl" in M) {
                for(var N = index_module_j, q = 0; q < M.tpl.length; q++)if (N += M.tpl[q], M.exprs && q < M.exprs.length) {
                    var B = M.exprs[q];
                    if (null == B) continue;
                    "object" != typeof B || void 0 !== B.constructor && !index_module_E(B) ? N += B : N += U(B, s, u, f, t, d, v);
                }
                return N;
            }
            if ("UNSTABLE_comment" in M) return "<!--" + l(M.UNSTABLE_comment) + "-->";
            $ = M.children;
        } else {
            if (null != (W = F.contextType)) {
                var I = s[W.__c];
                H = I ? I.props.value : W.__;
            }
            var O = F.prototype && "function" == typeof F.prototype.render;
            if (O) $ = index_module_P(t, H), z = t.__c;
            else {
                t.__c = z = index_module_(t, H);
                for(var R = 0; z.__d && R++ < 25;)z.__d = !1, index_module_x && index_module_x(t), $ = F.call(z, M, H);
                z.__d = !0;
            }
            if (null != z.getChildContext && (s = index_module_T({}, s, z.getChildContext())), O && preact_module_l.errorBoundaries && (F.getDerivedStateFromError || z.componentDidCatch)) {
                $ = null != $ && $.type === preact_module_b && null == $.key && null == $.props.tpl ? $.props.children : $;
                try {
                    return U($, s, u, f, t, d, v);
                } catch (e) {
                    return F.getDerivedStateFromError && (z.__s = F.getDerivedStateFromError(e)), z.componentDidCatch && z.componentDidCatch(e, index_module_A), z.__d ? ($ = index_module_P(t, s), null != (z = t.__c).getChildContext && (s = index_module_T({}, s, z.getChildContext())), U($ = null != $ && $.type === preact_module_b && null == $.key && null == $.props.tpl ? $.props.children : $, s, u, f, t, d, v)) : index_module_j;
                } finally{
                    index_module_w && index_module_w(t), t.__ = null, index_module_C && index_module_C(t);
                }
            }
        }
        $ = null != $ && $.type === preact_module_b && null == $.key && null == $.props.tpl ? $.props.children : $;
        try {
            var V = U($, s, u, f, t, d, v);
            return index_module_w && index_module_w(t), t.__ = null, preact_module_l.unmount && preact_module_l.unmount(t), V;
        } catch (n) {
            if (!d && v && v.onError) {
                var K = v.onError(n, t, function(e) {
                    return U(e, s, u, f, t, d, v);
                });
                if (void 0 !== K) return K;
                var G = preact_module_l.__e;
                return G && G(n, t), index_module_j;
            }
            if (!d) throw n;
            if (!n || "function" != typeof n.then) throw n;
            return n.then(function e() {
                try {
                    return U($, s, u, f, t, d, v);
                } catch (n) {
                    if (!n || "function" != typeof n.then) throw n;
                    return n.then(function() {
                        return U($, s, u, f, t, d, v);
                    }, e);
                }
            });
        }
    }
    var J, Q = "<" + F, X = index_module_j;
    for(var Y in M){
        var ee = M[Y];
        if ("function" != typeof ee || "class" === Y || "className" === Y) {
            switch(Y){
                case "children":
                    J = ee;
                    continue;
                case "key":
                case "ref":
                case "__self":
                case "__source":
                    continue;
                case "htmlFor":
                    if ("for" in M) continue;
                    Y = "for";
                    break;
                case "className":
                    if ("class" in M) continue;
                    Y = "class";
                    break;
                case "defaultChecked":
                    Y = "checked";
                    break;
                case "defaultSelected":
                    Y = "selected";
                    break;
                case "defaultValue":
                case "value":
                    switch(Y = "value", F){
                        case "textarea":
                            J = ee;
                            continue;
                        case "select":
                            f = ee;
                            continue;
                        case "option":
                            f != ee || "selected" in M || (Q += " selected");
                    }
                    break;
                case "dangerouslySetInnerHTML":
                    X = ee && ee.__html;
                    continue;
                case "style":
                    "object" == typeof ee && (ee = index_module_h(ee));
                    break;
                case "acceptCharset":
                    Y = "accept-charset";
                    break;
                case "httpEquiv":
                    Y = "http-equiv";
                    break;
                default:
                    if (index_module_o.test(Y)) Y = Y.replace(index_module_o, "$1:$2").toLowerCase();
                    else {
                        if (index_module_r.test(Y)) continue;
                        "-" !== Y[4] && !index_module_c.has(Y) || null == ee ? u ? index_module_a.test(Y) && (Y = "panose1" === Y ? "panose-1" : Y.replace(/([A-Z])/g, "-$1").toLowerCase()) : index_module_i.test(Y) && (Y = Y.toLowerCase()) : ee += index_module_j;
                    }
            }
            null != ee && !1 !== ee && (Q = !0 === ee || ee === index_module_j ? Q + " " + Y : Q + " " + Y + '="' + ("string" == typeof ee ? l(ee) : ee + index_module_j) + '"');
        }
    }
    if (index_module_r.test(F)) throw new Error(F + " is not a valid HTML tag name in " + Q + ">");
    if (X || ("string" == typeof J ? X = l(J) : null != J && !1 !== J && !0 !== J && (X = U(J, s, "svg" === F || "foreignObject" !== F && u, f, t, d, v))), index_module_w && index_module_w(t), t.__ = null, index_module_C && index_module_C(t), !X && Z.has(F)) return Q + "/>";
    var te = "</" + F + ">", ne = Q + ">";
    return index_module_E(X) ? [
        ne
    ].concat(X, [
        te
    ]) : "string" != typeof X ? [
        ne,
        X,
        te
    ] : ne + X + te;
}
var Z = new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]), index_module_F = (/* unused pure expression or super */ null && (index_module_D)), index_module_M = (/* unused pure expression or super */ null && (index_module_D));
/* harmony default export */ const index_module = ((/* unused pure expression or super */ null && (index_module_D)));
 //# sourceMappingURL=index.module.js.map

;// CONCATENATED MODULE: ./node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js


var jsxRuntime_module_t = /["&<]/;
function jsxRuntime_module_n(r) {
    if (0 === r.length || !1 === jsxRuntime_module_t.test(r)) return r;
    for(var e = 0, n = 0, o = "", f = ""; n < r.length; n++){
        switch(r.charCodeAt(n)){
            case 34:
                f = "&quot;";
                break;
            case 38:
                f = "&amp;";
                break;
            case 60:
                f = "&lt;";
                break;
            default:
                continue;
        }
        n !== e && (o += r.slice(e, n)), o += f, e = n + 1;
    }
    return n !== e && (o += r.slice(e, n)), o;
}
var jsxRuntime_module_o = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, jsxRuntime_module_f = 0, jsxRuntime_module_i = Array.isArray;
function jsxRuntime_module_u(e, t, n, o, i, u) {
    t || (t = {});
    var a, c, l = t;
    "ref" in t && (a = t.ref, delete t.ref);
    var p = {
        type: e,
        props: l,
        key: n,
        ref: a,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: --jsxRuntime_module_f,
        __i: -1,
        __u: 0,
        __source: i,
        __self: u
    };
    if ("function" == typeof e && (a = e.defaultProps)) for(c in a)void 0 === l[c] && (l[c] = a[c]);
    return preact_module_l.vnode && preact_module_l.vnode(p), p;
}
function jsxRuntime_module_a(r) {
    var t = jsxRuntime_module_u(e, {
        tpl: r,
        exprs: [].slice.call(arguments, 1)
    });
    return t.key = t.__v, t;
}
var jsxRuntime_module_c = {}, jsxRuntime_module_l = /[A-Z]/g;
function jsxRuntime_module_p(e, t) {
    if (r.attr) {
        var f = r.attr(e, t);
        if ("string" == typeof f) return f;
    }
    if ("ref" === e || "key" === e) return "";
    if ("style" === e && "object" == typeof t) {
        var i = "";
        for(var u in t){
            var a = t[u];
            if (null != a && "" !== a) {
                var p = "-" == u[0] ? u : jsxRuntime_module_c[u] || (jsxRuntime_module_c[u] = u.replace(jsxRuntime_module_l, "-$&").toLowerCase()), _ = ";";
                "number" != typeof a || p.startsWith("--") || jsxRuntime_module_o.test(p) || (_ = "px;"), i = i + p + ":" + a + _;
            }
        }
        return e + '="' + i + '"';
    }
    return null == t || !1 === t || "function" == typeof t || "object" == typeof t ? "" : !0 === t ? e : e + '="' + jsxRuntime_module_n(t) + '"';
}
function jsxRuntime_module_(r) {
    if (null == r || "boolean" == typeof r || "function" == typeof r) return null;
    if ("object" == typeof r) {
        if (void 0 === r.constructor) return r;
        if (jsxRuntime_module_i(r)) {
            for(var e = 0; e < r.length; e++)r[e] = jsxRuntime_module_(r[e]);
            return r;
        }
    }
    return jsxRuntime_module_n("" + r);
}
 //# sourceMappingURL=jsxRuntime.module.js.map

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/pages/error.js

/** Renders an error page. */ function ErrorPage(props) {
    const { url, error = "default", theme } = props;
    const signinPageUrl = `${url}/signin`;
    const errors = {
        default: {
            status: 200,
            heading: "Error",
            message: jsxRuntime_module_u("p", {
                children: jsxRuntime_module_u("a", {
                    className: "site",
                    href: url?.origin,
                    children: url?.host
                })
            })
        },
        Configuration: {
            status: 500,
            heading: "Server error",
            message: jsxRuntime_module_u("div", {
                children: [
                    jsxRuntime_module_u("p", {
                        children: "There is a problem with the server configuration."
                    }),
                    jsxRuntime_module_u("p", {
                        children: "Check the server logs for more information."
                    })
                ]
            })
        },
        AccessDenied: {
            status: 403,
            heading: "Access Denied",
            message: jsxRuntime_module_u("div", {
                children: [
                    jsxRuntime_module_u("p", {
                        children: "You do not have permission to sign in."
                    }),
                    jsxRuntime_module_u("p", {
                        children: jsxRuntime_module_u("a", {
                            className: "button",
                            href: signinPageUrl,
                            children: "Sign in"
                        })
                    })
                ]
            })
        },
        Verification: {
            status: 403,
            heading: "Unable to sign in",
            message: jsxRuntime_module_u("div", {
                children: [
                    jsxRuntime_module_u("p", {
                        children: "The sign in link is no longer valid."
                    }),
                    jsxRuntime_module_u("p", {
                        children: "It may have been used already or it may have expired."
                    })
                ]
            }),
            signin: jsxRuntime_module_u("a", {
                className: "button",
                href: signinPageUrl,
                children: "Sign in"
            })
        }
    };
    const { status, heading, message, signin } = errors[error] ?? errors.default;
    return {
        status,
        html: jsxRuntime_module_u("div", {
            className: "error",
            children: [
                theme?.brandColor && jsxRuntime_module_u("style", {
                    dangerouslySetInnerHTML: {
                        __html: `
        :root {
          --brand-color: ${theme?.brandColor}
        }
      `
                    }
                }),
                jsxRuntime_module_u("div", {
                    className: "card",
                    children: [
                        theme?.logo && jsxRuntime_module_u("img", {
                            src: theme?.logo,
                            alt: "Logo",
                            className: "logo"
                        }),
                        jsxRuntime_module_u("h1", {
                            children: heading
                        }),
                        jsxRuntime_module_u("div", {
                            className: "message",
                            children: message
                        }),
                        signin
                    ]
                })
            ]
        })
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/webauthn-client.js
//@ts-check
// Declare a SimpleWebAuthnBrowser variable as part of "window"
/** @typedef {"authenticate"} WebAuthnAuthenticate */ /** @typedef {"register"} WebAuthnRegister */ /** @typedef {WebAuthnRegister | WebAuthnAuthenticate} WebAuthnOptionsAction */ /**
 * @template {WebAuthnOptionsAction} T
 * @typedef {T extends WebAuthnAuthenticate ?
 *  { options: import("@simplewebauthn/types").PublicKeyCredentialRequestOptionsJSON; action: "authenticate" } :
 *  T extends WebAuthnRegister ?
 *  { options: import("@simplewebauthn/types").PublicKeyCredentialCreationOptionsJSON; action: "register" } :
 * never
 * } WebAuthnOptionsReturn
 */ /**
 * webauthnScript is the client-side script that handles the webauthn form
 *
 * @param {string} authURL is the URL of the auth API
 * @param {string} providerID is the ID of the webauthn provider
 */ async function webauthnScript(authURL, providerID) {
    /** @type {typeof import("@simplewebauthn/browser")} */ // @ts-ignore
    const WebAuthnBrowser = window.SimpleWebAuthnBrowser;
    /**
     * Fetch webauthn options from the server
     *
     * @template {WebAuthnOptionsAction} T
     * @param {T | undefined} action action to fetch options for
     * @returns {Promise<WebAuthnOptionsReturn<T> | undefined>}
     */ async function fetchOptions(action) {
        // Create the options URL with the action and query parameters
        const url = new URL(`${authURL}/webauthn-options/${providerID}`);
        if (action) url.searchParams.append("action", action);
        const formFields = getFormFields();
        formFields.forEach((field)=>{
            url.searchParams.append(field.name, field.value);
        });
        const res = await fetch(url);
        if (!res.ok) {
            console.error("Failed to fetch options", res);
            return;
        }
        return res.json();
    }
    /**
     * Get the webauthn form from the page
     *
     * @returns {HTMLFormElement}
     */ function getForm() {
        const formID = `#${providerID}-form`;
        /** @type {HTMLFormElement | null} */ const form = document.querySelector(formID);
        if (!form) throw new Error(`Form '${formID}' not found`);
        return form;
    }
    /**
     * Get formFields from the form
     *
     * @returns {HTMLInputElement[]}
     */ function getFormFields() {
        const form = getForm();
        /** @type {HTMLInputElement[]} */ const formFields = Array.from(form.querySelectorAll("input[data-form-field]"));
        return formFields;
    }
    /**
     * Passkey form submission handler.
     * Takes the input from the form and a few other parameters and submits it to the server.
     *
     * @param {WebAuthnOptionsAction} action action to submit
     * @param {unknown | undefined} data optional data to submit
     * @returns {Promise<void>}
     */ async function submitForm(action, data) {
        const form = getForm();
        // If a POST request, create hidden fields in the form
        // and submit it so the browser redirects on login
        if (action) {
            const actionInput = document.createElement("input");
            actionInput.type = "hidden";
            actionInput.name = "action";
            actionInput.value = action;
            form.appendChild(actionInput);
        }
        if (data) {
            const dataInput = document.createElement("input");
            dataInput.type = "hidden";
            dataInput.name = "data";
            dataInput.value = JSON.stringify(data);
            form.appendChild(dataInput);
        }
        return form.submit();
    }
    /**
     * Executes the authentication flow by fetching options from the server,
     * starting the authentication, and submitting the response to the server.
     *
     * @param {WebAuthnOptionsReturn<WebAuthnAuthenticate>['options']} options
     * @param {boolean} autofill Whether or not to use the browser's autofill
     * @returns {Promise<void>}
     */ async function authenticationFlow(options, autofill) {
        // Start authentication
        const authResp = await WebAuthnBrowser.startAuthentication(options, autofill);
        // Submit authentication response to server
        return await submitForm("authenticate", authResp);
    }
    /**
     * @param {WebAuthnOptionsReturn<WebAuthnRegister>['options']} options
     */ async function registrationFlow(options) {
        // Check if all required formFields are set
        const formFields = getFormFields();
        formFields.forEach((field)=>{
            if (field.required && !field.value) {
                throw new Error(`Missing required field: ${field.name}`);
            }
        });
        // Start registration
        const regResp = await WebAuthnBrowser.startRegistration(options);
        // Submit registration response to server
        return await submitForm("register", regResp);
    }
    /**
     * Attempts to authenticate the user when the page loads
     * using the browser's autofill popup.
     *
     * @returns {Promise<void>}
     */ async function autofillAuthentication() {
        // if the browser can't handle autofill, don't try
        if (!WebAuthnBrowser.browserSupportsWebAuthnAutofill()) return;
        const res = await fetchOptions("authenticate");
        if (!res) {
            console.error("Failed to fetch option for autofill authentication");
            return;
        }
        try {
            await authenticationFlow(res.options, true);
        } catch (e) {
            console.error(e);
        }
    }
    /**
     * Sets up the passkey form by overriding the form submission handler
     * so that it attempts to authenticate the user when the form is submitted.
     * If the user is not registered, it will attempt to register them instead.
     */ async function setupForm() {
        const form = getForm();
        // If the browser can't do WebAuthn, hide the form
        if (!WebAuthnBrowser.browserSupportsWebAuthn()) {
            form.style.display = "none";
            return;
        }
        if (form) {
            form.addEventListener("submit", async (e)=>{
                e.preventDefault();
                // Fetch options from the server without assuming that
                // the user is registered
                const res = await fetchOptions(undefined);
                if (!res) {
                    console.error("Failed to fetch options for form submission");
                    return;
                }
                // Then execute the appropriate flow
                if (res.action === "authenticate") {
                    try {
                        await authenticationFlow(res.options, false);
                    } catch (e) {
                        console.error(e);
                    }
                } else if (res.action === "register") {
                    try {
                        await registrationFlow(res.options);
                    } catch (e) {
                        console.error(e);
                    }
                }
            });
        }
    }
    // On page load, setup the form and attempt to authenticate the user.
    setupForm();
    autofillAuthentication();
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/pages/signin.js


const signinErrors = {
    default: "Unable to sign in.",
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallbackError: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page."
};
function ConditionalUIScript(providerID) {
    const startConditionalUIScript = `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${webauthnScript})(authURL, "${providerID}");
`;
    return jsxRuntime_module_u(preact_module_b, {
        children: jsxRuntime_module_u("script", {
            dangerouslySetInnerHTML: {
                __html: startConditionalUIScript
            }
        })
    });
}
function SigninPage(props) {
    const { csrfToken, providers = [], callbackUrl, theme, email, error: errorType } = props;
    if (typeof document !== "undefined" && theme?.brandColor) {
        document.documentElement.style.setProperty("--brand-color", theme.brandColor);
    }
    if (typeof document !== "undefined" && theme?.buttonText) {
        document.documentElement.style.setProperty("--button-text-color", theme.buttonText);
    }
    const error = errorType && (signinErrors[errorType] ?? signinErrors.default);
    const providerLogoPath = "https://authjs.dev/img/providers";
    const conditionalUIProviderID = providers.find((provider)=>provider.type === "webauthn" && provider.enableConditionalUI)?.id;
    return jsxRuntime_module_u("div", {
        className: "signin",
        children: [
            theme?.brandColor && jsxRuntime_module_u("style", {
                dangerouslySetInnerHTML: {
                    __html: `:root {--brand-color: ${theme.brandColor}}`
                }
            }),
            theme?.buttonText && jsxRuntime_module_u("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
                }
            }),
            jsxRuntime_module_u("div", {
                className: "card",
                children: [
                    error && jsxRuntime_module_u("div", {
                        className: "error",
                        children: jsxRuntime_module_u("p", {
                            children: error
                        })
                    }),
                    theme?.logo && jsxRuntime_module_u("img", {
                        src: theme.logo,
                        alt: "Logo",
                        className: "logo"
                    }),
                    providers.map((provider, i)=>{
                        let bg, brandColor, logo;
                        if (provider.type === "oauth" || provider.type === "oidc") {
                            ;
                            ({ bg = "#fff", brandColor, logo = `${providerLogoPath}/${provider.id}.svg` } = provider.style ?? {});
                        }
                        const color = brandColor ?? bg ?? "#fff";
                        return jsxRuntime_module_u("div", {
                            className: "provider",
                            children: [
                                provider.type === "oauth" || provider.type === "oidc" ? jsxRuntime_module_u("form", {
                                    action: provider.signinUrl,
                                    method: "POST",
                                    children: [
                                        jsxRuntime_module_u("input", {
                                            type: "hidden",
                                            name: "csrfToken",
                                            value: csrfToken
                                        }),
                                        callbackUrl && jsxRuntime_module_u("input", {
                                            type: "hidden",
                                            name: "callbackUrl",
                                            value: callbackUrl
                                        }),
                                        jsxRuntime_module_u("button", {
                                            type: "submit",
                                            className: "button",
                                            style: {
                                                "--provider-brand-color": color
                                            },
                                            tabIndex: 0,
                                            children: [
                                                jsxRuntime_module_u("span", {
                                                    style: {
                                                        filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)",
                                                        "mix-blend-mode": "luminosity",
                                                        opacity: 0.95
                                                    },
                                                    children: [
                                                        "Sign in with ",
                                                        provider.name
                                                    ]
                                                }),
                                                logo && jsxRuntime_module_u("img", {
                                                    loading: "lazy",
                                                    height: 24,
                                                    src: logo
                                                })
                                            ]
                                        })
                                    ]
                                }) : null,
                                (provider.type === "email" || provider.type === "credentials" || provider.type === "webauthn") && i > 0 && providers[i - 1].type !== "email" && providers[i - 1].type !== "credentials" && providers[i - 1].type !== "webauthn" && jsxRuntime_module_u("hr", {}),
                                provider.type === "email" && jsxRuntime_module_u("form", {
                                    action: provider.signinUrl,
                                    method: "POST",
                                    children: [
                                        jsxRuntime_module_u("input", {
                                            type: "hidden",
                                            name: "csrfToken",
                                            value: csrfToken
                                        }),
                                        jsxRuntime_module_u("label", {
                                            className: "section-header",
                                            htmlFor: `input-email-for-${provider.id}-provider`,
                                            children: "Email"
                                        }),
                                        jsxRuntime_module_u("input", {
                                            id: `input-email-for-${provider.id}-provider`,
                                            autoFocus: true,
                                            type: "email",
                                            name: "email",
                                            value: email,
                                            placeholder: "email@example.com",
                                            required: true
                                        }),
                                        jsxRuntime_module_u("button", {
                                            id: "submitButton",
                                            type: "submit",
                                            tabIndex: 0,
                                            children: [
                                                "Sign in with ",
                                                provider.name
                                            ]
                                        })
                                    ]
                                }),
                                provider.type === "credentials" && jsxRuntime_module_u("form", {
                                    action: provider.callbackUrl,
                                    method: "POST",
                                    children: [
                                        jsxRuntime_module_u("input", {
                                            type: "hidden",
                                            name: "csrfToken",
                                            value: csrfToken
                                        }),
                                        Object.keys(provider.credentials).map((credential)=>{
                                            return jsxRuntime_module_u("div", {
                                                children: [
                                                    jsxRuntime_module_u("label", {
                                                        className: "section-header",
                                                        htmlFor: `input-${credential}-for-${provider.id}-provider`,
                                                        children: provider.credentials[credential].label ?? credential
                                                    }),
                                                    jsxRuntime_module_u("input", {
                                                        name: credential,
                                                        id: `input-${credential}-for-${provider.id}-provider`,
                                                        type: provider.credentials[credential].type ?? "text",
                                                        placeholder: provider.credentials[credential].placeholder ?? "",
                                                        ...provider.credentials[credential]
                                                    })
                                                ]
                                            }, `input-group-${provider.id}`);
                                        }),
                                        jsxRuntime_module_u("button", {
                                            id: "submitButton",
                                            type: "submit",
                                            tabIndex: 0,
                                            children: [
                                                "Sign in with ",
                                                provider.name
                                            ]
                                        })
                                    ]
                                }),
                                provider.type === "webauthn" && jsxRuntime_module_u("form", {
                                    action: provider.callbackUrl,
                                    method: "POST",
                                    id: `${provider.id}-form`,
                                    children: [
                                        jsxRuntime_module_u("input", {
                                            type: "hidden",
                                            name: "csrfToken",
                                            value: csrfToken
                                        }),
                                        Object.keys(provider.formFields).map((field)=>{
                                            return jsxRuntime_module_u("div", {
                                                children: [
                                                    jsxRuntime_module_u("label", {
                                                        className: "section-header",
                                                        htmlFor: `input-${field}-for-${provider.id}-provider`,
                                                        children: provider.formFields[field].label ?? field
                                                    }),
                                                    jsxRuntime_module_u("input", {
                                                        name: field,
                                                        "data-form-field": true,
                                                        id: `input-${field}-for-${provider.id}-provider`,
                                                        type: provider.formFields[field].type ?? "text",
                                                        placeholder: provider.formFields[field].placeholder ?? "",
                                                        ...provider.formFields[field]
                                                    })
                                                ]
                                            }, `input-group-${provider.id}`);
                                        }),
                                        jsxRuntime_module_u("button", {
                                            id: `submitButton-${provider.id}`,
                                            type: "submit",
                                            tabIndex: 0,
                                            children: [
                                                "Sign in with ",
                                                provider.name
                                            ]
                                        })
                                    ]
                                }),
                                (provider.type === "email" || provider.type === "credentials" || provider.type === "webauthn") && i + 1 < providers.length && jsxRuntime_module_u("hr", {})
                            ]
                        }, provider.id);
                    })
                ]
            }),
            conditionalUIProviderID && ConditionalUIScript(conditionalUIProviderID)
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/pages/signout.js

function SignoutPage(props) {
    const { url, csrfToken, theme } = props;
    return jsxRuntime_module_u("div", {
        className: "signout",
        children: [
            theme?.brandColor && jsxRuntime_module_u("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
                }
            }),
            theme?.buttonText && jsxRuntime_module_u("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
                }
            }),
            jsxRuntime_module_u("div", {
                className: "card",
                children: [
                    theme?.logo && jsxRuntime_module_u("img", {
                        src: theme.logo,
                        alt: "Logo",
                        className: "logo"
                    }),
                    jsxRuntime_module_u("h1", {
                        children: "Signout"
                    }),
                    jsxRuntime_module_u("p", {
                        children: "Are you sure you want to sign out?"
                    }),
                    jsxRuntime_module_u("form", {
                        action: url?.toString(),
                        method: "POST",
                        children: [
                            jsxRuntime_module_u("input", {
                                type: "hidden",
                                name: "csrfToken",
                                value: csrfToken
                            }),
                            jsxRuntime_module_u("button", {
                                id: "submitButton",
                                type: "submit",
                                children: "Sign out"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/pages/styles.js
// Generated by `pnpm css`
/* harmony default export */ const styles = (`:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
  --provider-bg: #fff;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #fff
  );
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
  --provider-bg: #161b22;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #000
  );
}

.__next-auth-theme-dark img[src$="42-school.svg"],
  .__next-auth-theme-dark img[src$="apple.svg"],
  .__next-auth-theme-dark img[src$="boxyhq-saml.svg"],
  .__next-auth-theme-dark img[src$="eveonline.svg"],
  .__next-auth-theme-dark img[src$="github.svg"],
  .__next-auth-theme-dark img[src$="mailchimp.svg"],
  .__next-auth-theme-dark img[src$="medium.svg"],
  .__next-auth-theme-dark img[src$="okta.svg"],
  .__next-auth-theme-dark img[src$="patreon.svg"],
  .__next-auth-theme-dark img[src$="ping-id.svg"],
  .__next-auth-theme-dark img[src$="roblox.svg"],
  .__next-auth-theme-dark img[src$="threads.svg"],
  .__next-auth-theme-dark img[src$="wikimedia.svg"] {
    filter: invert(1);
  }

.__next-auth-theme-dark #submitButton {
    background-color: var(--provider-bg, var(--color-info));
  }

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
    --provider-bg: #161b22;
    --provider-bg-hover: color-mix(
      in srgb,
      var(--provider-brand-color) 30%,
      #000
    );
  }
    .__next-auth-theme-auto img[src$="42-school.svg"],
    .__next-auth-theme-auto img[src$="apple.svg"],
    .__next-auth-theme-auto img[src$="boxyhq-saml.svg"],
    .__next-auth-theme-auto img[src$="eveonline.svg"],
    .__next-auth-theme-auto img[src$="github.svg"],
    .__next-auth-theme-auto img[src$="mailchimp.svg"],
    .__next-auth-theme-auto img[src$="medium.svg"],
    .__next-auth-theme-auto img[src$="okta.svg"],
    .__next-auth-theme-auto img[src$="patreon.svg"],
    .__next-auth-theme-auto img[src$="ping-id.svg"],
    .__next-auth-theme-auto img[src$="roblox.svg"],
    .__next-auth-theme-auto img[src$="threads.svg"],
    .__next-auth-theme-auto img[src$="wikimedia.svg"] {
      filter: invert(1);
    }
    .__next-auth-theme-auto #submitButton {
      background-color: var(--provider-bg, var(--color-info));
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: var(--provider-bg);
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`);

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/pages/verify-request.js

function VerifyRequestPage(props) {
    const { url, theme } = props;
    return jsxRuntime_module_u("div", {
        className: "verify-request",
        children: [
            theme.brandColor && jsxRuntime_module_u("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
                }
            }),
            jsxRuntime_module_u("div", {
                className: "card",
                children: [
                    theme.logo && jsxRuntime_module_u("img", {
                        src: theme.logo,
                        alt: "Logo",
                        className: "logo"
                    }),
                    jsxRuntime_module_u("h1", {
                        children: "Check your email"
                    }),
                    jsxRuntime_module_u("p", {
                        children: "A sign in link has been sent to your email address."
                    }),
                    jsxRuntime_module_u("p", {
                        children: jsxRuntime_module_u("a", {
                            className: "site",
                            href: url.origin,
                            children: url.host
                        })
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/pages/index.js







function send({ html, title, status, cookies, theme, headTags }) {
    return {
        cookies,
        status,
        headers: {
            "Content-Type": "text/html"
        },
        body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${styles}</style><title>${title}</title>${headTags ?? ""}</head><body class="__next-auth-theme-${theme?.colorScheme ?? "auto"}"><div class="page">${index_module_D(html)}</div></body></html>`
    };
}
/**
 * Unless the user defines their [own pages](https://authjs.dev/reference/core#pages),
 * we render a set of default ones, using Preact SSR.
 */ function renderPage(params) {
    const { url, theme, query, cookies, pages, providers } = params;
    return {
        csrf (skip, options, cookies) {
            if (!skip) {
                return {
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "private, no-cache, no-store",
                        Expires: "0",
                        Pragma: "no-cache"
                    },
                    body: {
                        csrfToken: options.csrfToken
                    },
                    cookies
                };
            }
            options.logger.warn("csrf-disabled");
            cookies.push({
                name: options.cookies.csrfToken.name,
                value: "",
                options: {
                    ...options.cookies.csrfToken.options,
                    maxAge: 0
                }
            });
            return {
                status: 404,
                cookies
            };
        },
        providers (providers) {
            return {
                headers: {
                    "Content-Type": "application/json"
                },
                body: providers.reduce((acc, { id, name, type, signinUrl, callbackUrl })=>{
                    acc[id] = {
                        id,
                        name,
                        type,
                        signinUrl,
                        callbackUrl
                    };
                    return acc;
                }, {})
            };
        },
        signin (providerId, error) {
            if (providerId) throw new UnknownAction("Unsupported action");
            if (pages?.signIn) {
                let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({
                    callbackUrl: params.callbackUrl ?? "/"
                })}`;
                if (error) signinUrl = `${signinUrl}&${new URLSearchParams({
                    error
                })}`;
                return {
                    redirect: signinUrl,
                    cookies
                };
            }
            // If we have a webauthn provider with conditional UI and
            // a simpleWebAuthnBrowserScript is defined, we need to
            // render the script in the page.
            const webauthnProvider = providers?.find((p)=>p.type === "webauthn" && p.enableConditionalUI && !!p.simpleWebAuthnBrowserVersion);
            let simpleWebAuthnBrowserScript = "";
            if (webauthnProvider) {
                const { simpleWebAuthnBrowserVersion } = webauthnProvider;
                simpleWebAuthnBrowserScript = `<script src="https://unpkg.com/@simplewebauthn/browser@${simpleWebAuthnBrowserVersion}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
            }
            return send({
                cookies,
                theme,
                html: SigninPage({
                    csrfToken: params.csrfToken,
                    // We only want to render providers
                    providers: params.providers?.filter((provider)=>// Always render oauth and email type providers
                        [
                            "email",
                            "oauth",
                            "oidc"
                        ].includes(provider.type) || // Only render credentials type provider if credentials are defined
                        provider.type === "credentials" && provider.credentials || // Only render webauthn type provider if formFields are defined
                        provider.type === "webauthn" && provider.formFields || // Don't render other provider types
                        false),
                    callbackUrl: params.callbackUrl,
                    theme: params.theme,
                    error,
                    ...query
                }),
                title: "Sign In",
                headTags: simpleWebAuthnBrowserScript
            });
        },
        signout () {
            if (pages?.signOut) return {
                redirect: pages.signOut,
                cookies
            };
            return send({
                cookies,
                theme,
                html: SignoutPage({
                    csrfToken: params.csrfToken,
                    url,
                    theme
                }),
                title: "Sign Out"
            });
        },
        verifyRequest (props) {
            if (pages?.verifyRequest) return {
                redirect: `${pages.verifyRequest}${url?.search ?? ""}`,
                cookies
            };
            return send({
                cookies,
                theme,
                html: VerifyRequestPage({
                    url,
                    theme,
                    ...props
                }),
                title: "Verify Request"
            });
        },
        error (error) {
            if (pages?.error) {
                return {
                    redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
                    cookies
                };
            }
            return send({
                cookies,
                theme,
                // @ts-expect-error fix error type
                ...ErrorPage({
                    url,
                    theme,
                    error
                }),
                title: "Error"
            });
        }
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/date.js
/**
 * Takes a number in seconds and returns the date in the future.
 * Optionally takes a second date parameter. In that case
 * the date in the future will be calculated from that date instead of now.
 */ function fromDate(time, date = Date.now()) {
    return new Date(date + time * 1000);
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/callback/handle-login.js


/**
 * This function handles the complex flow of signing users in, and either creating,
 * linking (or not linking) accounts depending on if the user is currently logged
 * in, if they have account already and the authentication mechanism they are using.
 *
 * It prevents insecure behaviour, such as linking OAuth accounts unless a user is
 * signed in and authenticated with an existing valid account.
 *
 * All verification (e.g. OAuth flows or email address verification flows) are
 * done prior to this handler being called to avoid additional complexity in this
 * handler.
 */ async function handleLoginOrRegister(sessionToken, _profile, _account, options) {
    // Input validation
    if (!_account?.providerAccountId || !_account.type) throw new Error("Missing or invalid provider account");
    if (![
        "email",
        "oauth",
        "oidc",
        "webauthn"
    ].includes(_account.type)) throw new Error("Provider not supported");
    const { adapter, jwt, events, session: { strategy: sessionStrategy, generateSessionToken } } = options;
    // If no adapter is configured then we don't have a database and cannot
    // persist data; in this mode we just return a dummy session object.
    if (!adapter) {
        return {
            user: _profile,
            account: _account
        };
    }
    const profile = _profile;
    let account = _account;
    const { createUser, updateUser, getUser, getUserByAccount, getUserByEmail, linkAccount, createSession, getSessionAndUser, deleteSession } = adapter;
    let session = null;
    let user = null;
    let isNewUser = false;
    const useJwtSession = sessionStrategy === "jwt";
    if (sessionToken) {
        if (useJwtSession) {
            try {
                const salt = options.cookies.sessionToken.name;
                session = await jwt.decode({
                    ...jwt,
                    token: sessionToken,
                    salt
                });
                if (session && "sub" in session && session.sub) {
                    user = await getUser(session.sub);
                }
            } catch  {
            // If session can't be verified, treat as no session
            }
        } else {
            const userAndSession = await getSessionAndUser(sessionToken);
            if (userAndSession) {
                session = userAndSession.session;
                user = userAndSession.user;
            }
        }
    }
    if (account.type === "email") {
        // If signing in with an email, check if an account with the same email address exists already
        const userByEmail = await getUserByEmail(profile.email);
        if (userByEmail) {
            // If they are not already signed in as the same user, this flow will
            // sign them out of the current session and sign them in as the new user
            if (user?.id !== userByEmail.id && !useJwtSession && sessionToken) {
                // Delete existing session if they are currently signed in as another user.
                // This will switch user accounts for the session in cases where the user was
                // already logged in with a different account.
                await deleteSession(sessionToken);
            }
            // Update emailVerified property on the user object
            user = await updateUser({
                id: userByEmail.id,
                emailVerified: new Date()
            });
            await events.updateUser?.({
                user
            });
        } else {
            // Create user account if there isn't one for the email address already
            user = await createUser({
                ...profile,
                emailVerified: new Date()
            });
            await events.createUser?.({
                user
            });
            isNewUser = true;
        }
        // Create new session
        session = useJwtSession ? {} : await createSession({
            sessionToken: generateSessionToken(),
            userId: user.id,
            expires: fromDate(options.session.maxAge)
        });
        return {
            session,
            user,
            isNewUser
        };
    } else if (account.type === "webauthn") {
        // Check if the account exists
        const userByAccount = await getUserByAccount({
            providerAccountId: account.providerAccountId,
            provider: account.provider
        });
        if (userByAccount) {
            if (user) {
                // If the user is already signed in with this account, we don't need to do anything
                if (userByAccount.id === user.id) {
                    const currentAccount = {
                        ...account,
                        userId: user.id
                    };
                    return {
                        session,
                        user,
                        isNewUser,
                        account: currentAccount
                    };
                }
                // If the user is currently signed in, but the new account they are signing in
                // with is already associated with another user, then we cannot link them
                // and need to return an error.
                throw new AccountNotLinked("The account is already associated with another user", {
                    provider: account.provider
                });
            }
            // If there is no active session, but the account being signed in with is already
            // associated with a valid user then create session to sign the user in.
            session = useJwtSession ? {} : await createSession({
                sessionToken: generateSessionToken(),
                userId: userByAccount.id,
                expires: fromDate(options.session.maxAge)
            });
            const currentAccount = {
                ...account,
                userId: userByAccount.id
            };
            return {
                session,
                user: userByAccount,
                isNewUser,
                account: currentAccount
            };
        } else {
            // If the account doesn't exist, we'll create it
            if (user) {
                // If the user is already signed in and the account isn't already associated
                // with another user account then we can go ahead and link the accounts safely.
                await linkAccount({
                    ...account,
                    userId: user.id
                });
                await events.linkAccount?.({
                    user,
                    account,
                    profile
                });
                // As they are already signed in, we don't need to do anything after linking them
                const currentAccount = {
                    ...account,
                    userId: user.id
                };
                return {
                    session,
                    user,
                    isNewUser,
                    account: currentAccount
                };
            }
            // If the user is not signed in and it looks like a new account then we
            // check there also isn't an user account already associated with the same
            // email address as the one in the request.
            const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
            if (userByEmail) {
                // We don't trust user-provided email addresses, so we don't want to link accounts
                // if the email address associated with the new account is already associated with
                // an existing account.
                throw new AccountNotLinked("Another account already exists with the same e-mail address", {
                    provider: account.provider
                });
            } else {
                // If the current user is not logged in and the profile isn't linked to any user
                // accounts (by email or provider account id)...
                //
                // If no account matching the same [provider].id or .email exists, we can
                // create a new account for the user, link it to the OAuth account and
                // create a new session for them so they are signed in with it.
                user = await createUser({
                    ...profile
                });
            }
            await events.createUser?.({
                user
            });
            await linkAccount({
                ...account,
                userId: user.id
            });
            await events.linkAccount?.({
                user,
                account,
                profile
            });
            session = useJwtSession ? {} : await createSession({
                sessionToken: generateSessionToken(),
                userId: user.id,
                expires: fromDate(options.session.maxAge)
            });
            const currentAccount = {
                ...account,
                userId: user.id
            };
            return {
                session,
                user,
                isNewUser: true,
                account: currentAccount
            };
        }
    }
    // If signing in with OAuth account, check to see if the account exists already
    const userByAccount = await getUserByAccount({
        providerAccountId: account.providerAccountId,
        provider: account.provider
    });
    if (userByAccount) {
        if (user) {
            // If the user is already signed in with this account, we don't need to do anything
            if (userByAccount.id === user.id) {
                return {
                    session,
                    user,
                    isNewUser
                };
            }
            // If the user is currently signed in, but the new account they are signing in
            // with is already associated with another user, then we cannot link them
            // and need to return an error.
            throw new OAuthAccountNotLinked("The account is already associated with another user", {
                provider: account.provider
            });
        }
        // If there is no active session, but the account being signed in with is already
        // associated with a valid user then create session to sign the user in.
        session = useJwtSession ? {} : await createSession({
            sessionToken: generateSessionToken(),
            userId: userByAccount.id,
            expires: fromDate(options.session.maxAge)
        });
        return {
            session,
            user: userByAccount,
            isNewUser
        };
    } else {
        const { provider: p } = options;
        const { type, provider, providerAccountId, userId, ...tokenSet } = account;
        const defaults = {
            providerAccountId,
            provider,
            type,
            userId
        };
        account = Object.assign(p.account(tokenSet) ?? {}, defaults);
        if (user) {
            // If the user is already signed in and the OAuth account isn't already associated
            // with another user account then we can go ahead and link the accounts safely.
            await linkAccount({
                ...account,
                userId: user.id
            });
            await events.linkAccount?.({
                user,
                account,
                profile
            });
            // As they are already signed in, we don't need to do anything after linking them
            return {
                session,
                user,
                isNewUser
            };
        }
        // If the user is not signed in and it looks like a new OAuth account then we
        // check there also isn't an user account already associated with the same
        // email address as the one in the OAuth profile.
        //
        // This step is often overlooked in OAuth implementations, but covers the following cases:
        //
        // 1. It makes it harder for someone to accidentally create two accounts.
        //    e.g. by signin in with email, then again with an oauth account connected to the same email.
        // 2. It makes it harder to hijack a user account using a 3rd party OAuth account.
        //    e.g. by creating an oauth account then changing the email address associated with it.
        //
        // It's quite common for services to automatically link accounts in this case, but it's
        // better practice to require the user to sign in *then* link accounts to be sure
        // someone is not exploiting a problem with a third party OAuth service.
        //
        // OAuth providers should require email address verification to prevent this, but in
        // practice that is not always the case; this helps protect against that.
        const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
        if (userByEmail) {
            const provider = options.provider;
            if (provider?.allowDangerousEmailAccountLinking) {
                // If you trust the oauth provider to correctly verify email addresses, you can opt-in to
                // account linking even when the user is not signed-in.
                user = userByEmail;
                isNewUser = false;
            } else {
                // We end up here when we don't have an account with the same [provider].id *BUT*
                // we do already have an account with the same email address as the one in the
                // OAuth profile the user has just tried to sign in with.
                //
                // We don't want to have two accounts with the same email address, and we don't
                // want to link them in case it's not safe to do so, so instead we prompt the user
                // to sign in via email to verify their identity and then link the accounts.
                throw new OAuthAccountNotLinked("Another account already exists with the same e-mail address", {
                    provider: account.provider
                });
            }
        } else {
            // If the current user is not logged in and the profile isn't linked to any user
            // accounts (by email or provider account id)...
            //
            // If no account matching the same [provider].id or .email exists, we can
            // create a new account for the user, link it to the OAuth account and
            // create a new session for them so they are signed in with it.
            user = await createUser({
                ...profile,
                emailVerified: null
            });
            isNewUser = true;
        }
        await events.createUser?.({
            user
        });
        await linkAccount({
            ...account,
            userId: user.id
        });
        await events.linkAccount?.({
            user,
            account,
            profile
        });
        session = useJwtSession ? {} : await createSession({
            sessionToken: generateSessionToken(),
            userId: user.id,
            expires: fromDate(options.session.maxAge)
        });
        return {
            session,
            user,
            isNewUser
        };
    }
}

;// CONCATENATED MODULE: ./node_modules/oauth4webapi/build/index.js
let USER_AGENT;
if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) {
    const NAME = "oauth4webapi";
    const VERSION = "v3.8.3";
    USER_AGENT = `${NAME}/${VERSION}`;
}
function looseInstanceOf(input, expected) {
    if (input == null) {
        return false;
    }
    try {
        return input instanceof expected || Object.getPrototypeOf(input)[Symbol.toStringTag] === expected.prototype[Symbol.toStringTag];
    } catch  {
        return false;
    }
}
const ERR_INVALID_ARG_VALUE = "ERR_INVALID_ARG_VALUE";
const ERR_INVALID_ARG_TYPE = "ERR_INVALID_ARG_TYPE";
function CodedTypeError(message, code, cause) {
    const err = new TypeError(message, {
        cause
    });
    Object.assign(err, {
        code
    });
    return err;
}
const allowInsecureRequests = Symbol();
const clockSkew = Symbol();
const clockTolerance = Symbol();
const build_customFetch = Symbol();
const modifyAssertion = Symbol();
const jweDecrypt = Symbol();
const jwksCache = Symbol();
const build_encoder = new TextEncoder();
const build_decoder = new TextDecoder();
function buf(input) {
    if (typeof input === "string") {
        return build_encoder.encode(input);
    }
    return build_decoder.decode(input);
}
let encodeBase64Url;
if (Uint8Array.prototype.toBase64) {
    encodeBase64Url = (input)=>{
        if (input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        }
        return input.toBase64({
            alphabet: "base64url",
            omitPadding: true
        });
    };
} else {
    const CHUNK_SIZE = 0x8000;
    encodeBase64Url = (input)=>{
        if (input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        }
        const arr = [];
        for(let i = 0; i < input.byteLength; i += CHUNK_SIZE){
            arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
        }
        return btoa(arr.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    };
}
let decodeBase64Url;
if (Uint8Array.fromBase64) {
    decodeBase64Url = (input)=>{
        try {
            return Uint8Array.fromBase64(input, {
                alphabet: "base64url"
            });
        } catch (cause) {
            throw CodedTypeError("The input to be decoded is not correctly encoded.", ERR_INVALID_ARG_VALUE, cause);
        }
    };
} else {
    decodeBase64Url = (input)=>{
        try {
            const binary = atob(input.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, ""));
            const bytes = new Uint8Array(binary.length);
            for(let i = 0; i < binary.length; i++){
                bytes[i] = binary.charCodeAt(i);
            }
            return bytes;
        } catch (cause) {
            throw CodedTypeError("The input to be decoded is not correctly encoded.", ERR_INVALID_ARG_VALUE, cause);
        }
    };
}
function b64u(input) {
    if (typeof input === "string") {
        return decodeBase64Url(input);
    }
    return encodeBase64Url(input);
}
class UnsupportedOperationError extends Error {
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = UNSUPPORTED_OPERATION;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class OperationProcessingError extends Error {
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        if (options?.code) {
            this.code = options?.code;
        }
        Error.captureStackTrace?.(this, this.constructor);
    }
}
function OPE(message, code, cause) {
    return new OperationProcessingError(message, {
        code,
        cause
    });
}
async function build_calculateJwkThumbprint(jwk) {
    let components;
    switch(jwk.kty){
        case "EC":
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x,
                y: jwk.y
            };
            break;
        case "OKP":
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x
            };
            break;
        case "AKP":
            components = {
                alg: jwk.alg,
                kty: jwk.kty,
                pub: jwk.pub
            };
            break;
        case "RSA":
            components = {
                e: jwk.e,
                kty: jwk.kty,
                n: jwk.n
            };
            break;
        default:
            throw new UnsupportedOperationError("unsupported JWK key type", {
                cause: jwk
            });
    }
    return b64u(await crypto.subtle.digest("SHA-256", buf(JSON.stringify(components))));
}
function build_assertCryptoKey(key, it) {
    if (!(key instanceof CryptoKey)) {
        throw CodedTypeError(`${it} must be a CryptoKey`, ERR_INVALID_ARG_TYPE);
    }
}
function assertPrivateKey(key, it) {
    build_assertCryptoKey(key, it);
    if (key.type !== "private") {
        throw CodedTypeError(`${it} must be a private CryptoKey`, ERR_INVALID_ARG_VALUE);
    }
}
function assertPublicKey(key, it) {
    build_assertCryptoKey(key, it);
    if (key.type !== "public") {
        throw CodedTypeError(`${it} must be a public CryptoKey`, ERR_INVALID_ARG_VALUE);
    }
}
function build_normalizeTyp(value) {
    return value.toLowerCase().replace(/^application\//, "");
}
function isJsonObject(input) {
    if (input === null || typeof input !== "object" || Array.isArray(input)) {
        return false;
    }
    return true;
}
function prepareHeaders(input) {
    if (looseInstanceOf(input, Headers)) {
        input = Object.fromEntries(input.entries());
    }
    const headers = new Headers(input ?? {});
    if (USER_AGENT && !headers.has("user-agent")) {
        headers.set("user-agent", USER_AGENT);
    }
    if (headers.has("authorization")) {
        throw CodedTypeError('"options.headers" must not include the "authorization" header name', ERR_INVALID_ARG_VALUE);
    }
    return headers;
}
function signal(url, value) {
    if (value !== undefined) {
        if (typeof value === "function") {
            value = value(url.href);
        }
        if (!(value instanceof AbortSignal)) {
            throw CodedTypeError('"options.signal" must return or be an instance of AbortSignal', ERR_INVALID_ARG_TYPE);
        }
        return value;
    }
    return undefined;
}
function replaceDoubleSlash(pathname) {
    if (pathname.includes("//")) {
        return pathname.replace("//", "/");
    }
    return pathname;
}
function prependWellKnown(url, wellKnown, allowTerminatingSlash = false) {
    if (url.pathname === "/") {
        url.pathname = wellKnown;
    } else {
        url.pathname = replaceDoubleSlash(`${wellKnown}/${allowTerminatingSlash ? url.pathname : url.pathname.replace(/(\/)$/, "")}`);
    }
    return url;
}
function appendWellKnown(url, wellKnown) {
    url.pathname = replaceDoubleSlash(`${url.pathname}/${wellKnown}`);
    return url;
}
async function performDiscovery(input, urlName, transform, options) {
    if (!(input instanceof URL)) {
        throw CodedTypeError(`"${urlName}" must be an instance of URL`, ERR_INVALID_ARG_TYPE);
    }
    checkProtocol(input, options?.[allowInsecureRequests] !== true);
    const url = transform(new URL(input.href));
    const headers = prepareHeaders(options?.headers);
    headers.set("accept", "application/json");
    return (options?.[build_customFetch] || fetch)(url.href, {
        body: undefined,
        headers: Object.fromEntries(headers.entries()),
        method: "GET",
        redirect: "manual",
        signal: signal(url, options?.signal)
    });
}
async function discoveryRequest(issuerIdentifier, options) {
    return performDiscovery(issuerIdentifier, "issuerIdentifier", (url)=>{
        switch(options?.algorithm){
            case undefined:
            case "oidc":
                appendWellKnown(url, ".well-known/openid-configuration");
                break;
            case "oauth2":
                prependWellKnown(url, ".well-known/oauth-authorization-server");
                break;
            default:
                throw CodedTypeError('"options.algorithm" must be "oidc" (default), or "oauth2"', ERR_INVALID_ARG_VALUE);
        }
        return url;
    }, options);
}
function assertNumber(input, allow0, it, code, cause) {
    try {
        if (typeof input !== "number" || !Number.isFinite(input)) {
            throw CodedTypeError(`${it} must be a number`, ERR_INVALID_ARG_TYPE, cause);
        }
        if (input > 0) return;
        if (allow0) {
            if (input !== 0) {
                throw CodedTypeError(`${it} must be a non-negative number`, ERR_INVALID_ARG_VALUE, cause);
            }
            return;
        }
        throw CodedTypeError(`${it} must be a positive number`, ERR_INVALID_ARG_VALUE, cause);
    } catch (err) {
        if (code) {
            throw OPE(err.message, code, cause);
        }
        throw err;
    }
}
function assertString(input, it, code, cause) {
    try {
        if (typeof input !== "string") {
            throw CodedTypeError(`${it} must be a string`, ERR_INVALID_ARG_TYPE, cause);
        }
        if (input.length === 0) {
            throw CodedTypeError(`${it} must not be empty`, ERR_INVALID_ARG_VALUE, cause);
        }
    } catch (err) {
        if (code) {
            throw OPE(err.message, code, cause);
        }
        throw err;
    }
}
async function processDiscoveryResponse(expectedIssuerIdentifier, response) {
    const expected = expectedIssuerIdentifier;
    if (!(expected instanceof URL) && expected !== _nodiscoverycheck) {
        throw CodedTypeError('"expectedIssuerIdentifier" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.issuer, '"response" body "issuer" property', INVALID_RESPONSE, {
        body: json
    });
    if (expected !== _nodiscoverycheck && new URL(json.issuer).href !== expected.href) {
        throw OPE('"response" body "issuer" property does not match the expected value', JSON_ATTRIBUTE_COMPARISON, {
            expected: expected.href,
            body: json,
            attribute: "issuer"
        });
    }
    return json;
}
function assertApplicationJson(response) {
    assertContentType(response, "application/json");
}
function notJson(response, ...types) {
    let msg = '"response" content-type must be ';
    if (types.length > 2) {
        const last = types.pop();
        msg += `${types.join(", ")}, or ${last}`;
    } else if (types.length === 2) {
        msg += `${types[0]} or ${types[1]}`;
    } else {
        msg += types[0];
    }
    return OPE(msg, RESPONSE_IS_NOT_JSON, response);
}
function assertContentTypes(response, ...types) {
    if (!types.includes(getContentType(response))) {
        throw notJson(response, ...types);
    }
}
function assertContentType(response, contentType) {
    if (getContentType(response) !== contentType) {
        throw notJson(response, contentType);
    }
}
function randomBytes() {
    return b64u(crypto.getRandomValues(new Uint8Array(32)));
}
function generateRandomCodeVerifier() {
    return randomBytes();
}
function generateRandomState() {
    return randomBytes();
}
function generateRandomNonce() {
    return randomBytes();
}
async function calculatePKCECodeChallenge(codeVerifier) {
    assertString(codeVerifier, "codeVerifier");
    return b64u(await crypto.subtle.digest("SHA-256", buf(codeVerifier)));
}
function getKeyAndKid(input) {
    if (input instanceof CryptoKey) {
        return {
            key: input
        };
    }
    if (!(input?.key instanceof CryptoKey)) {
        return {};
    }
    if (input.kid !== undefined) {
        assertString(input.kid, '"kid"');
    }
    return {
        key: input.key,
        kid: input.kid
    };
}
function psAlg(key) {
    switch(key.algorithm.hash.name){
        case "SHA-256":
            return "PS256";
        case "SHA-384":
            return "PS384";
        case "SHA-512":
            return "PS512";
        default:
            throw new UnsupportedOperationError("unsupported RsaHashedKeyAlgorithm hash name", {
                cause: key
            });
    }
}
function rsAlg(key) {
    switch(key.algorithm.hash.name){
        case "SHA-256":
            return "RS256";
        case "SHA-384":
            return "RS384";
        case "SHA-512":
            return "RS512";
        default:
            throw new UnsupportedOperationError("unsupported RsaHashedKeyAlgorithm hash name", {
                cause: key
            });
    }
}
function esAlg(key) {
    switch(key.algorithm.namedCurve){
        case "P-256":
            return "ES256";
        case "P-384":
            return "ES384";
        case "P-521":
            return "ES512";
        default:
            throw new UnsupportedOperationError("unsupported EcKeyAlgorithm namedCurve", {
                cause: key
            });
    }
}
function keyToJws(key) {
    switch(key.algorithm.name){
        case "RSA-PSS":
            return psAlg(key);
        case "RSASSA-PKCS1-v1_5":
            return rsAlg(key);
        case "ECDSA":
            return esAlg(key);
        case "Ed25519":
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
            return key.algorithm.name;
        case "EdDSA":
            return "Ed25519";
        default:
            throw new UnsupportedOperationError("unsupported CryptoKey algorithm name", {
                cause: key
            });
    }
}
function getClockSkew(client) {
    const skew = client?.[clockSkew];
    return typeof skew === "number" && Number.isFinite(skew) ? skew : 0;
}
function getClockTolerance(client) {
    const tolerance = client?.[clockTolerance];
    return typeof tolerance === "number" && Number.isFinite(tolerance) && Math.sign(tolerance) !== -1 ? tolerance : 30;
}
function epochTime() {
    return Math.floor(Date.now() / 1000);
}
function assertAs(as) {
    if (typeof as !== "object" || as === null) {
        throw CodedTypeError('"as" must be an object', ERR_INVALID_ARG_TYPE);
    }
    assertString(as.issuer, '"as.issuer"');
}
function assertClient(client) {
    if (typeof client !== "object" || client === null) {
        throw CodedTypeError('"client" must be an object', ERR_INVALID_ARG_TYPE);
    }
    assertString(client.client_id, '"client.client_id"');
}
function formUrlEncode(token) {
    return encodeURIComponent(token).replace(/(?:[-_.!~*'()]|%20)/g, (substring)=>{
        switch(substring){
            case "-":
            case "_":
            case ".":
            case "!":
            case "~":
            case "*":
            case "'":
            case "(":
            case ")":
                return `%${substring.charCodeAt(0).toString(16).toUpperCase()}`;
            case "%20":
                return "+";
            default:
                throw new Error();
        }
    });
}
function ClientSecretPost(clientSecret) {
    assertString(clientSecret, '"clientSecret"');
    return (_as, client, body, _headers)=>{
        body.set("client_id", client.client_id);
        body.set("client_secret", clientSecret);
    };
}
function ClientSecretBasic(clientSecret) {
    assertString(clientSecret, '"clientSecret"');
    return (_as, client, _body, headers)=>{
        const username = formUrlEncode(client.client_id);
        const password = formUrlEncode(clientSecret);
        const credentials = btoa(`${username}:${password}`);
        headers.set("authorization", `Basic ${credentials}`);
    };
}
function clientAssertionPayload(as, client) {
    const now = epochTime() + getClockSkew(client);
    return {
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id,
        sub: client.client_id
    };
}
function PrivateKeyJwt(clientPrivateKey, options) {
    const { key, kid } = getKeyAndKid(clientPrivateKey);
    assertPrivateKey(key, '"clientPrivateKey.key"');
    return async (as, client, body, _headers)=>{
        const header = {
            alg: keyToJws(key),
            kid
        };
        const payload = clientAssertionPayload(as, client);
        options?.[modifyAssertion]?.(header, payload);
        body.set("client_id", client.client_id);
        body.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
        body.set("client_assertion", await signJwt(header, payload, key));
    };
}
function ClientSecretJwt(clientSecret, options) {
    assertString(clientSecret, '"clientSecret"');
    const modify = options?.[modifyAssertion];
    let key;
    return async (as, client, body, _headers)=>{
        key ||= await crypto.subtle.importKey("raw", buf(clientSecret), {
            hash: "SHA-256",
            name: "HMAC"
        }, false, [
            "sign"
        ]);
        const header = {
            alg: "HS256"
        };
        const payload = clientAssertionPayload(as, client);
        modify?.(header, payload);
        const data = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
        const hmac = await crypto.subtle.sign(key.algorithm, key, buf(data));
        body.set("client_id", client.client_id);
        body.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
        body.set("client_assertion", `${data}.${b64u(new Uint8Array(hmac))}`);
    };
}
function None() {
    return (_as, client, body, _headers)=>{
        body.set("client_id", client.client_id);
    };
}
function TlsClientAuth() {
    return None();
}
async function signJwt(header, payload, key) {
    if (!key.usages.includes("sign")) {
        throw CodedTypeError('CryptoKey instances used for signing assertions must include "sign" in their "usages"', ERR_INVALID_ARG_VALUE);
    }
    const input = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
    const signature = b64u(await crypto.subtle.sign(keyToSubtle(key), key, buf(input)));
    return `${input}.${signature}`;
}
async function issueRequestObject(as, client, parameters, privateKey, options) {
    assertAs(as);
    assertClient(client);
    parameters = new URLSearchParams(parameters);
    const { key, kid } = getKeyAndKid(privateKey);
    assertPrivateKey(key, '"privateKey.key"');
    parameters.set("client_id", client.client_id);
    const now = epochTime() + getClockSkew(client);
    const claims = {
        ...Object.fromEntries(parameters.entries()),
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id
    };
    let resource;
    if (parameters.has("resource") && (resource = parameters.getAll("resource")) && resource.length > 1) {
        claims.resource = resource;
    }
    {
        let value = parameters.get("max_age");
        if (value !== null) {
            claims.max_age = parseInt(value, 10);
            assertNumber(claims.max_age, true, '"max_age" parameter');
        }
    }
    {
        let value = parameters.get("claims");
        if (value !== null) {
            try {
                claims.claims = JSON.parse(value);
            } catch (cause) {
                throw OPE('failed to parse the "claims" parameter as JSON', PARSE_ERROR, cause);
            }
            if (!isJsonObject(claims.claims)) {
                throw CodedTypeError('"claims" parameter must be a JSON with a top level object', ERR_INVALID_ARG_VALUE);
            }
        }
    }
    {
        let value = parameters.get("authorization_details");
        if (value !== null) {
            try {
                claims.authorization_details = JSON.parse(value);
            } catch (cause) {
                throw OPE('failed to parse the "authorization_details" parameter as JSON', PARSE_ERROR, cause);
            }
            if (!Array.isArray(claims.authorization_details)) {
                throw CodedTypeError('"authorization_details" parameter must be a JSON with a top level array', ERR_INVALID_ARG_VALUE);
            }
        }
    }
    const header = {
        alg: keyToJws(key),
        typ: "oauth-authz-req+jwt",
        kid
    };
    options?.[modifyAssertion]?.(header, claims);
    return signJwt(header, claims, key);
}
let jwkCache;
async function getSetPublicJwkCache(key, alg) {
    const { kty, e, n, x, y, crv, pub } = await crypto.subtle.exportKey("jwk", key);
    const jwk = {
        kty,
        e,
        n,
        x,
        y,
        crv,
        pub
    };
    if (kty === "AKP") jwk.alg = alg;
    jwkCache.set(key, jwk);
    return jwk;
}
async function publicJwk(key, alg) {
    jwkCache ||= new WeakMap();
    return jwkCache.get(key) || getSetPublicJwkCache(key, alg);
}
const URLParse = URL.parse ? (url, base)=>URL.parse(url, base) : (url, base)=>{
    try {
        return new URL(url, base);
    } catch  {
        return null;
    }
};
function checkProtocol(url, enforceHttps) {
    if (enforceHttps && url.protocol !== "https:") {
        throw OPE("only requests to HTTPS are allowed", HTTP_REQUEST_FORBIDDEN, url);
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") {
        throw OPE("only HTTP and HTTPS requests are allowed", REQUEST_PROTOCOL_FORBIDDEN, url);
    }
}
function validateEndpoint(value, endpoint, useMtlsAlias, enforceHttps) {
    let url;
    if (typeof value !== "string" || !(url = URLParse(value))) {
        throw OPE(`authorization server metadata does not contain a valid ${useMtlsAlias ? `"as.mtls_endpoint_aliases.${endpoint}"` : `"as.${endpoint}"`}`, value === undefined ? MISSING_SERVER_METADATA : INVALID_SERVER_METADATA, {
            attribute: useMtlsAlias ? `mtls_endpoint_aliases.${endpoint}` : endpoint
        });
    }
    checkProtocol(url, enforceHttps);
    return url;
}
function resolveEndpoint(as, endpoint, useMtlsAlias, enforceHttps) {
    if (useMtlsAlias && as.mtls_endpoint_aliases && endpoint in as.mtls_endpoint_aliases) {
        return validateEndpoint(as.mtls_endpoint_aliases[endpoint], endpoint, useMtlsAlias, enforceHttps);
    }
    return validateEndpoint(as[endpoint], endpoint, useMtlsAlias, enforceHttps);
}
async function pushedAuthorizationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, "pushed_authorization_request_endpoint", client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set("client_id", client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set("accept", "application/json");
    if (options?.DPoP !== undefined) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, "POST");
    }
    const response = await authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
class DPoPHandler {
    #header;
    #privateKey;
    #publicKey;
    #clockSkew;
    #modifyAssertion;
    #map;
    #jkt;
    constructor(client, keyPair, options){
        assertPrivateKey(keyPair?.privateKey, '"DPoP.privateKey"');
        assertPublicKey(keyPair?.publicKey, '"DPoP.publicKey"');
        if (!keyPair.publicKey.extractable) {
            throw CodedTypeError('"DPoP.publicKey.extractable" must be true', ERR_INVALID_ARG_VALUE);
        }
        this.#modifyAssertion = options?.[modifyAssertion];
        this.#clockSkew = getClockSkew(client);
        this.#privateKey = keyPair.privateKey;
        this.#publicKey = keyPair.publicKey;
        branded.add(this);
    }
    #get(key) {
        this.#map ||= new Map();
        let item = this.#map.get(key);
        if (item) {
            this.#map.delete(key);
            this.#map.set(key, item);
        }
        return item;
    }
    #set(key, val) {
        this.#map ||= new Map();
        this.#map.delete(key);
        if (this.#map.size === 100) {
            this.#map.delete(this.#map.keys().next().value);
        }
        this.#map.set(key, val);
    }
    async calculateThumbprint() {
        if (!this.#jkt) {
            const jwk = await crypto.subtle.exportKey("jwk", this.#publicKey);
            this.#jkt ||= await build_calculateJwkThumbprint(jwk);
        }
        return this.#jkt;
    }
    async addProof(url, headers, htm, accessToken) {
        const alg = keyToJws(this.#privateKey);
        this.#header ||= {
            alg,
            typ: "dpop+jwt",
            jwk: await publicJwk(this.#publicKey, alg)
        };
        const nonce = this.#get(url.origin);
        const now = epochTime() + this.#clockSkew;
        const payload = {
            iat: now,
            jti: randomBytes(),
            htm,
            nonce,
            htu: `${url.origin}${url.pathname}`,
            ath: accessToken ? b64u(await crypto.subtle.digest("SHA-256", buf(accessToken))) : undefined
        };
        this.#modifyAssertion?.(this.#header, payload);
        headers.set("dpop", await signJwt(this.#header, payload, this.#privateKey));
    }
    cacheNonce(response, url) {
        try {
            const nonce = response.headers.get("dpop-nonce");
            if (nonce) {
                this.#set(url.origin, nonce);
            }
        } catch  {}
    }
}
function isDPoPNonceError(err) {
    if (err instanceof WWWAuthenticateChallengeError) {
        const { 0: challenge, length } = err.cause;
        return length === 1 && challenge.scheme === "dpop" && challenge.parameters.error === "use_dpop_nonce";
    }
    if (err instanceof ResponseBodyError) {
        return err.error === "use_dpop_nonce";
    }
    return false;
}
function DPoP(client, keyPair, options) {
    return new DPoPHandler(client, keyPair, options);
}
class ResponseBodyError extends Error {
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = RESPONSE_BODY_ERROR;
        this.cause = options.cause;
        this.error = options.cause.error;
        this.status = options.response.status;
        this.error_description = options.cause.error_description;
        Object.defineProperty(this, "response", {
            enumerable: false,
            value: options.response
        });
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class AuthorizationResponseError extends Error {
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = AUTHORIZATION_RESPONSE_ERROR;
        this.cause = options.cause;
        this.error = options.cause.get("error");
        this.error_description = options.cause.get("error_description") ?? undefined;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class WWWAuthenticateChallengeError extends Error {
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = WWW_AUTHENTICATE_CHALLENGE;
        this.cause = options.cause;
        this.status = options.response.status;
        this.response = options.response;
        Object.defineProperty(this, "response", {
            enumerable: false
        });
        Error.captureStackTrace?.(this, this.constructor);
    }
}
const tokenMatch = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+";
const token68Match = "[a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2}";
const quotedMatch = '"((?:[^"\\\\]|\\\\[\\s\\S])*)"';
const quotedParamMatcher = "(" + tokenMatch + ")\\s*=\\s*" + quotedMatch;
const paramMatcher = "(" + tokenMatch + ")\\s*=\\s*(" + tokenMatch + ")";
const schemeRE = new RegExp("^[,\\s]*(" + tokenMatch + ")");
const quotedParamRE = new RegExp("^[,\\s]*" + quotedParamMatcher + "[,\\s]*(.*)");
const unquotedParamRE = new RegExp("^[,\\s]*" + paramMatcher + "[,\\s]*(.*)");
const token68ParamRE = new RegExp("^(" + token68Match + ")(?:$|[,\\s])(.*)");
function parseWwwAuthenticateChallenges(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    const header = response.headers.get("www-authenticate");
    if (header === null) {
        return undefined;
    }
    const challenges = [];
    let rest = header;
    while(rest){
        let match = rest.match(schemeRE);
        const scheme = match?.["1"].toLowerCase();
        if (!scheme) {
            return undefined;
        }
        const afterScheme = rest.substring(match[0].length);
        if (afterScheme && !afterScheme.match(/^[\s,]/)) {
            return undefined;
        }
        const spaceMatch = afterScheme.match(/^\s+(.*)$/);
        const hasParameters = !!spaceMatch;
        rest = spaceMatch ? spaceMatch[1] : undefined;
        const parameters = {};
        let token68;
        if (hasParameters) {
            while(rest){
                let key;
                let value;
                if (match = rest.match(quotedParamRE)) {
                    ;
                    [, key, value, rest] = match;
                    if (value.includes("\\")) {
                        try {
                            value = JSON.parse(`"${value}"`);
                        } catch  {}
                    }
                    parameters[key.toLowerCase()] = value;
                    continue;
                }
                if (match = rest.match(unquotedParamRE)) {
                    ;
                    [, key, value, rest] = match;
                    parameters[key.toLowerCase()] = value;
                    continue;
                }
                if (match = rest.match(token68ParamRE)) {
                    if (Object.keys(parameters).length) {
                        break;
                    }
                    ;
                    [, token68, rest] = match;
                    break;
                }
                return undefined;
            }
        } else {
            rest = afterScheme || undefined;
        }
        const challenge = {
            scheme,
            parameters
        };
        if (token68) {
            challenge.token68 = token68;
        }
        challenges.push(challenge);
    }
    if (!challenges.length) {
        return undefined;
    }
    return challenges;
}
async function processPushedAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 201, "Pushed Authorization Request Endpoint");
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.request_uri, '"response" body "request_uri" property', INVALID_RESPONSE, {
        body: json
    });
    let expiresIn = typeof json.expires_in !== "number" ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json
    });
    json.expires_in = expiresIn;
    return json;
}
async function parseOAuthResponseErrorBody(response) {
    if (response.status > 399 && response.status < 500) {
        assertReadableResponse(response);
        assertApplicationJson(response);
        try {
            const json = await response.clone().json();
            if (isJsonObject(json) && typeof json.error === "string" && json.error.length) {
                return json;
            }
        } catch  {}
    }
    return undefined;
}
async function checkOAuthBodyError(response, expected, label) {
    if (response.status !== expected) {
        checkAuthenticationChallenges(response);
        let err;
        if (err = await parseOAuthResponseErrorBody(response)) {
            await response.body?.cancel();
            throw new ResponseBodyError("server responded with an error in the response body", {
                cause: err,
                response
            });
        }
        throw OPE(`"response" is not a conform ${label} response (unexpected HTTP status code)`, RESPONSE_IS_NOT_CONFORM, response);
    }
}
function assertDPoP(option) {
    if (!branded.has(option)) {
        throw CodedTypeError('"options.DPoP" is not a valid DPoPHandle', ERR_INVALID_ARG_VALUE);
    }
}
async function resourceRequest(accessToken, method, url, headers, body, options) {
    assertString(accessToken, '"accessToken"');
    if (!(url instanceof URL)) {
        throw CodedTypeError('"url" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    checkProtocol(url, options?.[allowInsecureRequests] !== true);
    headers = prepareHeaders(headers);
    if (options?.DPoP) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, method.toUpperCase(), accessToken);
    }
    headers.set("authorization", `${headers.has("dpop") ? "DPoP" : "Bearer"} ${accessToken}`);
    const response = await (options?.[build_customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: "manual",
        signal: signal(url, options?.signal)
    });
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function protectedResourceRequest(accessToken, method, url, headers, body, options) {
    const response = await resourceRequest(accessToken, method, url, headers, body, options);
    checkAuthenticationChallenges(response);
    return response;
}
async function userInfoRequest(as, client, accessToken, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, "userinfo_endpoint", client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    if (client.userinfo_signed_response_alg) {
        headers.set("accept", "application/jwt");
    } else {
        headers.set("accept", "application/json");
        headers.append("accept", "application/jwt");
    }
    return resourceRequest(accessToken, "GET", url, headers, null, {
        ...options,
        [clockSkew]: getClockSkew(client)
    });
}
let jwksMap;
function setJwksCache(as, jwks, uat, cache) {
    jwksMap ||= new WeakMap();
    jwksMap.set(as, {
        jwks,
        uat,
        get age () {
            return epochTime() - this.uat;
        }
    });
    if (cache) {
        Object.assign(cache, {
            jwks: structuredClone(jwks),
            uat
        });
    }
}
function isFreshJwksCache(input) {
    if (typeof input !== "object" || input === null) {
        return false;
    }
    if (!("uat" in input) || typeof input.uat !== "number" || epochTime() - input.uat >= 300) {
        return false;
    }
    if (!("jwks" in input) || !isJsonObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isJsonObject)) {
        return false;
    }
    return true;
}
function clearJwksCache(as, cache) {
    jwksMap?.delete(as);
    delete cache?.jwks;
    delete cache?.uat;
}
async function getPublicSigKeyFromIssuerJwksUri(as, options, header) {
    const { alg, kid } = header;
    checkSupportedJwsAlg(header);
    if (!jwksMap?.has(as) && isFreshJwksCache(options?.[jwksCache])) {
        setJwksCache(as, options?.[jwksCache].jwks, options?.[jwksCache].uat);
    }
    let jwks;
    let age;
    if (jwksMap?.has(as)) {
        ;
        ({ jwks, age } = jwksMap.get(as));
        if (age >= 300) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
    } else {
        jwks = await jwksRequest(as, options).then(processJwksResponse);
        age = 0;
        setJwksCache(as, jwks, epochTime(), options?.[jwksCache]);
    }
    let kty;
    switch(alg.slice(0, 2)){
        case "RS":
        case "PS":
            kty = "RSA";
            break;
        case "ES":
            kty = "EC";
            break;
        case "Ed":
            kty = "OKP";
            break;
        case "ML":
            kty = "AKP";
            break;
        default:
            throw new UnsupportedOperationError("unsupported JWS algorithm", {
                cause: {
                    alg
                }
            });
    }
    const candidates = jwks.keys.filter((jwk)=>{
        if (jwk.kty !== kty) {
            return false;
        }
        if (kid !== undefined && kid !== jwk.kid) {
            return false;
        }
        if (jwk.alg !== undefined && alg !== jwk.alg) {
            return false;
        }
        if (jwk.use !== undefined && jwk.use !== "sig") {
            return false;
        }
        if (jwk.key_ops?.includes("verify") === false) {
            return false;
        }
        switch(true){
            case alg === "ES256" && jwk.crv !== "P-256":
            case alg === "ES384" && jwk.crv !== "P-384":
            case alg === "ES512" && jwk.crv !== "P-521":
            case alg === "Ed25519" && jwk.crv !== "Ed25519":
            case alg === "EdDSA" && jwk.crv !== "Ed25519":
                return false;
        }
        return true;
    });
    const { 0: jwk, length } = candidates;
    if (!length) {
        if (age >= 60) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
        throw OPE("error when selecting a JWT verification key, no applicable keys found", KEY_SELECTION, {
            header,
            candidates,
            jwks_uri: new URL(as.jwks_uri)
        });
    }
    if (length !== 1) {
        throw OPE('error when selecting a JWT verification key, multiple applicable keys found, a "kid" JWT Header Parameter is required', KEY_SELECTION, {
            header,
            candidates,
            jwks_uri: new URL(as.jwks_uri)
        });
    }
    return importJwk(alg, jwk);
}
const skipSubjectCheck = Symbol();
function getContentType(input) {
    return input.headers.get("content-type")?.split(";")[0];
}
async function processUserInfoResponse(as, client, expectedSubject, response, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    checkAuthenticationChallenges(response);
    if (response.status !== 200) {
        throw OPE('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    let json;
    if (getContentType(response) === "application/jwt") {
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.userinfo_signed_response_alg, as.userinfo_signing_alg_values_supported, undefined), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validateOptionalAudience.bind(undefined, client.client_id)).then(validateOptionalIssuer.bind(undefined, as));
        jwtRefs.set(response, jwt);
        json = claims;
    } else {
        if (client.userinfo_signed_response_alg) {
            throw OPE("JWT UserInfo Response expected", JWT_USERINFO_EXPECTED, response);
        }
        json = await getResponseJsonBody(response);
    }
    assertString(json.sub, '"response" body "sub" property', INVALID_RESPONSE, {
        body: json
    });
    switch(expectedSubject){
        case skipSubjectCheck:
            break;
        default:
            assertString(expectedSubject, '"expectedSubject"');
            if (json.sub !== expectedSubject) {
                throw OPE('unexpected "response" body "sub" property value', JSON_ATTRIBUTE_COMPARISON, {
                    expected: expectedSubject,
                    body: json,
                    attribute: "sub"
                });
            }
    }
    return json;
}
async function authenticatedRequest(as, client, clientAuthentication, url, body, headers, options) {
    await clientAuthentication(as, client, body, headers);
    headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
    return (options?.[build_customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method: "POST",
        redirect: "manual",
        signal: signal(url, options?.signal)
    });
}
async function tokenEndpointRequest(as, client, clientAuthentication, grantType, parameters, options) {
    const url = resolveEndpoint(as, "token_endpoint", client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    parameters.set("grant_type", grantType);
    const headers = prepareHeaders(options?.headers);
    headers.set("accept", "application/json");
    if (options?.DPoP !== undefined) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, "POST");
    }
    const response = await authenticatedRequest(as, client, clientAuthentication, url, parameters, headers, options);
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function refreshTokenGrantRequest(as, client, clientAuthentication, refreshToken, options) {
    assertAs(as);
    assertClient(client);
    assertString(refreshToken, '"refreshToken"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set("refresh_token", refreshToken);
    return tokenEndpointRequest(as, client, clientAuthentication, "refresh_token", parameters, options);
}
const idTokenClaims = new WeakMap();
const jwtRefs = new WeakMap();
function getValidatedIdTokenClaims(ref) {
    if (!ref.id_token) {
        return undefined;
    }
    const claims = idTokenClaims.get(ref);
    if (!claims) {
        throw CodedTypeError('"ref" was already garbage collected or did not resolve from the proper sources', ERR_INVALID_ARG_VALUE);
    }
    return claims;
}
async function validateApplicationLevelSignature(as, ref, options) {
    assertAs(as);
    if (!jwtRefs.has(ref)) {
        throw CodedTypeError('"ref" does not contain a processed JWT Response to verify the signature of', ERR_INVALID_ARG_VALUE);
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwtRefs.get(ref).split(".");
    const header = JSON.parse(buf(b64u(protectedHeader)));
    if (header.alg.startsWith("HS")) {
        throw new UnsupportedOperationError("unsupported JWS algorithm", {
            cause: {
                alg: header.alg
            }
        });
    }
    let key;
    key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, b64u(encodedSignature));
}
async function processGenericAccessTokenResponse(as, client, response, additionalRequiredIdTokenClaims, decryptFn, recognizedTokenTypes) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, "Token Endpoint");
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.access_token, '"response" body "access_token" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.token_type, '"response" body "token_type" property', INVALID_RESPONSE, {
        body: json
    });
    json.token_type = json.token_type.toLowerCase();
    if (json.expires_in !== undefined) {
        let expiresIn = typeof json.expires_in !== "number" ? parseFloat(json.expires_in) : json.expires_in;
        assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
            body: json
        });
        json.expires_in = expiresIn;
    }
    if (json.refresh_token !== undefined) {
        assertString(json.refresh_token, '"response" body "refresh_token" property', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.scope !== undefined && typeof json.scope !== "string") {
        throw OPE('"response" body "scope" property must be a string', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.id_token !== undefined) {
        assertString(json.id_token, '"response" body "id_token" property', INVALID_RESPONSE, {
            body: json
        });
        const requiredClaims = [
            "aud",
            "exp",
            "iat",
            "iss",
            "sub"
        ];
        if (client.require_auth_time === true) {
            requiredClaims.push("auth_time");
        }
        if (client.default_max_age !== undefined) {
            assertNumber(client.default_max_age, true, '"client.default_max_age"');
            requiredClaims.push("auth_time");
        }
        if (additionalRequiredIdTokenClaims?.length) {
            requiredClaims.push(...additionalRequiredIdTokenClaims);
        }
        const { claims, jwt } = await validateJwt(json.id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported, "RS256"), getClockSkew(client), getClockTolerance(client), decryptFn).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
        if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
            if (claims.azp === undefined) {
                throw OPE('ID Token "aud" (audience) claim includes additional untrusted audiences', JWT_CLAIM_COMPARISON, {
                    claims,
                    claim: "aud"
                });
            }
            if (claims.azp !== client.client_id) {
                throw OPE('unexpected ID Token "azp" (authorized party) claim value', JWT_CLAIM_COMPARISON, {
                    expected: client.client_id,
                    claims,
                    claim: "azp"
                });
            }
        }
        if (claims.auth_time !== undefined) {
            assertNumber(claims.auth_time, true, 'ID Token "auth_time" (authentication time)', INVALID_RESPONSE, {
                claims
            });
        }
        jwtRefs.set(response, jwt);
        idTokenClaims.set(json, claims);
    }
    if (recognizedTokenTypes?.[json.token_type] !== undefined) {
        recognizedTokenTypes[json.token_type](response, json);
    } else if (json.token_type !== "dpop" && json.token_type !== "bearer") {
        throw new UnsupportedOperationError("unsupported `token_type` value", {
            cause: {
                body: json
            }
        });
    }
    return json;
}
function checkAuthenticationChallenges(response) {
    let challenges;
    if (challenges = parseWwwAuthenticateChallenges(response)) {
        throw new WWWAuthenticateChallengeError("server responded with a challenge in the WWW-Authenticate HTTP Header", {
            cause: challenges,
            response
        });
    }
}
async function processRefreshTokenResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
function validateOptionalAudience(expected, result) {
    if (result.claims.aud !== undefined) {
        return validateAudience(expected, result);
    }
    return result;
}
function validateAudience(expected, result) {
    if (Array.isArray(result.claims.aud)) {
        if (!result.claims.aud.includes(expected)) {
            throw OPE('unexpected JWT "aud" (audience) claim value', JWT_CLAIM_COMPARISON, {
                expected,
                claims: result.claims,
                claim: "aud"
            });
        }
    } else if (result.claims.aud !== expected) {
        throw OPE('unexpected JWT "aud" (audience) claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims: result.claims,
            claim: "aud"
        });
    }
    return result;
}
function validateOptionalIssuer(as, result) {
    if (result.claims.iss !== undefined) {
        return validateIssuer(as, result);
    }
    return result;
}
function validateIssuer(as, result) {
    const expected = as[_expectedIssuer]?.(result) ?? as.issuer;
    if (result.claims.iss !== expected) {
        throw OPE('unexpected JWT "iss" (issuer) claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims: result.claims,
            claim: "iss"
        });
    }
    return result;
}
const branded = new WeakSet();
function brand(searchParams) {
    branded.add(searchParams);
    return searchParams;
}
const nopkce = Symbol();
async function authorizationCodeGrantRequest(as, client, clientAuthentication, callbackParameters, redirectUri, codeVerifier, options) {
    assertAs(as);
    assertClient(client);
    if (!branded.has(callbackParameters)) {
        throw CodedTypeError('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', ERR_INVALID_ARG_VALUE);
    }
    assertString(redirectUri, '"redirectUri"');
    const code = getURLSearchParameter(callbackParameters, "code");
    if (!code) {
        throw OPE('no authorization code in "callbackParameters"', INVALID_RESPONSE);
    }
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set("redirect_uri", redirectUri);
    parameters.set("code", code);
    if (codeVerifier !== nopkce) {
        assertString(codeVerifier, '"codeVerifier"');
        parameters.set("code_verifier", codeVerifier);
    }
    return tokenEndpointRequest(as, client, clientAuthentication, "authorization_code", parameters, options);
}
const jwtClaimNames = {
    aud: "audience",
    c_hash: "code hash",
    client_id: "client id",
    exp: "expiration time",
    iat: "issued at",
    iss: "issuer",
    jti: "jwt id",
    nonce: "nonce",
    s_hash: "state hash",
    sub: "subject",
    ath: "access token hash",
    htm: "http method",
    htu: "http uri",
    cnf: "confirmation",
    auth_time: "authentication time"
};
function validatePresence(required, result) {
    for (const claim of required){
        if (result.claims[claim] === undefined) {
            throw OPE(`JWT "${claim}" (${jwtClaimNames[claim]}) claim missing`, INVALID_RESPONSE, {
                claims: result.claims
            });
        }
    }
    return result;
}
const expectNoNonce = Symbol();
const skipAuthTimeCheck = Symbol();
async function processAuthorizationCodeResponse(as, client, response, options) {
    if (typeof options?.expectedNonce === "string" || typeof options?.maxAge === "number" || options?.requireIdToken) {
        return processAuthorizationCodeOpenIDResponse(as, client, response, options.expectedNonce, options.maxAge, options[jweDecrypt], options.recognizedTokenTypes);
    }
    return processAuthorizationCodeOAuth2Response(as, client, response, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function processAuthorizationCodeOpenIDResponse(as, client, response, expectedNonce, maxAge, decryptFn, recognizedTokenTypes) {
    const additionalRequiredClaims = [];
    switch(expectedNonce){
        case undefined:
            expectedNonce = expectNoNonce;
            break;
        case expectNoNonce:
            break;
        default:
            assertString(expectedNonce, '"expectedNonce" argument');
            additionalRequiredClaims.push("nonce");
    }
    maxAge ??= client.default_max_age;
    switch(maxAge){
        case undefined:
            maxAge = skipAuthTimeCheck;
            break;
        case skipAuthTimeCheck:
            break;
        default:
            assertNumber(maxAge, true, '"maxAge" argument');
            additionalRequiredClaims.push("auth_time");
    }
    const result = await processGenericAccessTokenResponse(as, client, response, additionalRequiredClaims, decryptFn, recognizedTokenTypes);
    assertString(result.id_token, '"response" body "id_token" property', INVALID_RESPONSE, {
        body: result
    });
    const claims = getValidatedIdTokenClaims(result);
    if (maxAge !== skipAuthTimeCheck) {
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw OPE("too much time has elapsed since the last End-User authentication", JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance,
                claim: "auth_time"
            });
        }
    }
    if (expectedNonce === expectNoNonce) {
        if (claims.nonce !== undefined) {
            throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
                expected: undefined,
                claims,
                claim: "nonce"
            });
        }
    } else if (claims.nonce !== expectedNonce) {
        throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
            expected: expectedNonce,
            claims,
            claim: "nonce"
        });
    }
    return result;
}
async function processAuthorizationCodeOAuth2Response(as, client, response, decryptFn, recognizedTokenTypes) {
    const result = await processGenericAccessTokenResponse(as, client, response, undefined, decryptFn, recognizedTokenTypes);
    const claims = getValidatedIdTokenClaims(result);
    if (claims) {
        if (client.default_max_age !== undefined) {
            assertNumber(client.default_max_age, true, '"client.default_max_age"');
            const now = epochTime() + getClockSkew(client);
            const tolerance = getClockTolerance(client);
            if (claims.auth_time + client.default_max_age < now - tolerance) {
                throw OPE("too much time has elapsed since the last End-User authentication", JWT_TIMESTAMP_CHECK, {
                    claims,
                    now,
                    tolerance,
                    claim: "auth_time"
                });
            }
        }
        if (claims.nonce !== undefined) {
            throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
                expected: undefined,
                claims,
                claim: "nonce"
            });
        }
    }
    return result;
}
const WWW_AUTHENTICATE_CHALLENGE = "OAUTH_WWW_AUTHENTICATE_CHALLENGE";
const RESPONSE_BODY_ERROR = "OAUTH_RESPONSE_BODY_ERROR";
const UNSUPPORTED_OPERATION = "OAUTH_UNSUPPORTED_OPERATION";
const AUTHORIZATION_RESPONSE_ERROR = "OAUTH_AUTHORIZATION_RESPONSE_ERROR";
const JWT_USERINFO_EXPECTED = "OAUTH_JWT_USERINFO_EXPECTED";
const PARSE_ERROR = "OAUTH_PARSE_ERROR";
const INVALID_RESPONSE = "OAUTH_INVALID_RESPONSE";
const INVALID_REQUEST = "OAUTH_INVALID_REQUEST";
const RESPONSE_IS_NOT_JSON = "OAUTH_RESPONSE_IS_NOT_JSON";
const RESPONSE_IS_NOT_CONFORM = "OAUTH_RESPONSE_IS_NOT_CONFORM";
const HTTP_REQUEST_FORBIDDEN = "OAUTH_HTTP_REQUEST_FORBIDDEN";
const REQUEST_PROTOCOL_FORBIDDEN = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN";
const JWT_TIMESTAMP_CHECK = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED";
const JWT_CLAIM_COMPARISON = "OAUTH_JWT_CLAIM_COMPARISON_FAILED";
const JSON_ATTRIBUTE_COMPARISON = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED";
const KEY_SELECTION = "OAUTH_KEY_SELECTION_FAILED";
const MISSING_SERVER_METADATA = "OAUTH_MISSING_SERVER_METADATA";
const INVALID_SERVER_METADATA = "OAUTH_INVALID_SERVER_METADATA";
function checkJwtType(expected, result) {
    if (typeof result.header.typ !== "string" || build_normalizeTyp(result.header.typ) !== expected) {
        throw OPE('unexpected JWT "typ" header parameter value', INVALID_RESPONSE, {
            header: result.header
        });
    }
    return result;
}
async function clientCredentialsGrantRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    return tokenEndpointRequest(as, client, clientAuthentication, "client_credentials", new URLSearchParams(parameters), options);
}
async function genericTokenEndpointRequest(as, client, clientAuthentication, grantType, parameters, options) {
    assertAs(as);
    assertClient(client);
    assertString(grantType, '"grantType"');
    return tokenEndpointRequest(as, client, clientAuthentication, grantType, new URLSearchParams(parameters), options);
}
async function processGenericTokenEndpointResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function processClientCredentialsResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function revocationRequest(as, client, clientAuthentication, token, options) {
    assertAs(as);
    assertClient(client);
    assertString(token, '"token"');
    const url = resolveEndpoint(as, "revocation_endpoint", client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(options?.additionalParameters);
    body.set("token", token);
    const headers = prepareHeaders(options?.headers);
    headers.delete("accept");
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processRevocationResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, "Revocation Endpoint");
    return undefined;
}
function assertReadableResponse(response) {
    if (response.bodyUsed) {
        throw CodedTypeError('"response" body has been used already', ERR_INVALID_ARG_VALUE);
    }
}
async function introspectionRequest(as, client, clientAuthentication, token, options) {
    assertAs(as);
    assertClient(client);
    assertString(token, '"token"');
    const url = resolveEndpoint(as, "introspection_endpoint", client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(options?.additionalParameters);
    body.set("token", token);
    const headers = prepareHeaders(options?.headers);
    if (options?.requestJwtResponse ?? client.introspection_signed_response_alg) {
        headers.set("accept", "application/token-introspection+jwt");
    } else {
        headers.set("accept", "application/json");
    }
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processIntrospectionResponse(as, client, response, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, "Introspection Endpoint");
    let json;
    if (getContentType(response) === "application/token-introspection+jwt") {
        assertReadableResponse(response);
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.introspection_signed_response_alg, as.introspection_signing_alg_values_supported, "RS256"), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(checkJwtType.bind(undefined, "token-introspection+jwt")).then(validatePresence.bind(undefined, [
            "aud",
            "iat",
            "iss"
        ])).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
        jwtRefs.set(response, jwt);
        if (!isJsonObject(claims.token_introspection)) {
            throw OPE('JWT "token_introspection" claim must be a JSON object', INVALID_RESPONSE, {
                claims
            });
        }
        json = claims.token_introspection;
    } else {
        assertReadableResponse(response);
        json = await getResponseJsonBody(response);
    }
    if (typeof json.active !== "boolean") {
        throw OPE('"response" body "active" property must be a boolean', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function jwksRequest(as, options) {
    assertAs(as);
    const url = resolveEndpoint(as, "jwks_uri", false, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    headers.set("accept", "application/json");
    headers.append("accept", "application/jwk-set+json");
    return (options?.[build_customFetch] || fetch)(url.href, {
        body: undefined,
        headers: Object.fromEntries(headers.entries()),
        method: "GET",
        redirect: "manual",
        signal: signal(url, options?.signal)
    });
}
async function processJwksResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform JSON Web Key Set response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response, (response)=>assertContentTypes(response, "application/json", "application/jwk-set+json"));
    if (!Array.isArray(json.keys)) {
        throw OPE('"response" body "keys" property must be an array', INVALID_RESPONSE, {
            body: json
        });
    }
    if (!Array.prototype.every.call(json.keys, isJsonObject)) {
        throw OPE('"response" body "keys" property members must be JWK formatted objects', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
function supported(alg) {
    switch(alg){
        case "PS256":
        case "ES256":
        case "RS256":
        case "PS384":
        case "ES384":
        case "RS384":
        case "PS512":
        case "ES512":
        case "RS512":
        case "Ed25519":
        case "EdDSA":
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
            return true;
        default:
            return false;
    }
}
function checkSupportedJwsAlg(header) {
    if (!supported(header.alg)) {
        throw new UnsupportedOperationError('unsupported JWS "alg" identifier', {
            cause: {
                alg: header.alg
            }
        });
    }
}
function checkRsaKeyAlgorithm(key) {
    const { algorithm } = key;
    if (typeof algorithm.modulusLength !== "number" || algorithm.modulusLength < 2048) {
        throw new UnsupportedOperationError(`unsupported ${algorithm.name} modulusLength`, {
            cause: key
        });
    }
}
function ecdsaHashName(key) {
    const { algorithm } = key;
    switch(algorithm.namedCurve){
        case "P-256":
            return "SHA-256";
        case "P-384":
            return "SHA-384";
        case "P-521":
            return "SHA-512";
        default:
            throw new UnsupportedOperationError("unsupported ECDSA namedCurve", {
                cause: key
            });
    }
}
function keyToSubtle(key) {
    switch(key.algorithm.name){
        case "ECDSA":
            return {
                name: key.algorithm.name,
                hash: ecdsaHashName(key)
            };
        case "RSA-PSS":
            {
                checkRsaKeyAlgorithm(key);
                switch(key.algorithm.hash.name){
                    case "SHA-256":
                    case "SHA-384":
                    case "SHA-512":
                        return {
                            name: key.algorithm.name,
                            saltLength: parseInt(key.algorithm.hash.name.slice(-3), 10) >> 3
                        };
                    default:
                        throw new UnsupportedOperationError("unsupported RSA-PSS hash name", {
                            cause: key
                        });
                }
            }
        case "RSASSA-PKCS1-v1_5":
            checkRsaKeyAlgorithm(key);
            return key.algorithm.name;
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
        case "Ed25519":
            return key.algorithm.name;
    }
    throw new UnsupportedOperationError("unsupported CryptoKey algorithm name", {
        cause: key
    });
}
async function validateJwsSignature(protectedHeader, payload, key, signature) {
    const data = buf(`${protectedHeader}.${payload}`);
    const algorithm = keyToSubtle(key);
    const verified = await crypto.subtle.verify(algorithm, key, signature, data);
    if (!verified) {
        throw OPE("JWT signature verification failed", INVALID_RESPONSE, {
            key,
            data,
            signature,
            algorithm
        });
    }
}
async function validateJwt(jws, checkAlg, clockSkew, clockTolerance, decryptJwt) {
    let { 0: protectedHeader, 1: payload, length } = jws.split(".");
    if (length === 5) {
        if (decryptJwt !== undefined) {
            jws = await decryptJwt(jws);
            ({ 0: protectedHeader, 1: payload, length } = jws.split("."));
        } else {
            throw new UnsupportedOperationError("JWE decryption is not configured", {
                cause: jws
            });
        }
    }
    if (length !== 3) {
        throw OPE("Invalid JWT", INVALID_RESPONSE, jws);
    }
    let header;
    try {
        header = JSON.parse(buf(b64u(protectedHeader)));
    } catch (cause) {
        throw OPE("failed to parse JWT Header body as base64url encoded JSON", PARSE_ERROR, cause);
    }
    if (!isJsonObject(header)) {
        throw OPE("JWT Header must be a top level object", INVALID_RESPONSE, jws);
    }
    checkAlg(header);
    if (header.crit !== undefined) {
        throw new UnsupportedOperationError('no JWT "crit" header parameter extensions are supported', {
            cause: {
                header
            }
        });
    }
    let claims;
    try {
        claims = JSON.parse(buf(b64u(payload)));
    } catch (cause) {
        throw OPE("failed to parse JWT Payload body as base64url encoded JSON", PARSE_ERROR, cause);
    }
    if (!isJsonObject(claims)) {
        throw OPE("JWT Payload must be a top level object", INVALID_RESPONSE, jws);
    }
    const now = epochTime() + clockSkew;
    if (claims.exp !== undefined) {
        if (typeof claims.exp !== "number") {
            throw OPE('unexpected JWT "exp" (expiration time) claim type', INVALID_RESPONSE, {
                claims
            });
        }
        if (claims.exp <= now - clockTolerance) {
            throw OPE('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance: clockTolerance,
                claim: "exp"
            });
        }
    }
    if (claims.iat !== undefined) {
        if (typeof claims.iat !== "number") {
            throw OPE('unexpected JWT "iat" (issued at) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    if (claims.iss !== undefined) {
        if (typeof claims.iss !== "string") {
            throw OPE('unexpected JWT "iss" (issuer) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    if (claims.nbf !== undefined) {
        if (typeof claims.nbf !== "number") {
            throw OPE('unexpected JWT "nbf" (not before) claim type', INVALID_RESPONSE, {
                claims
            });
        }
        if (claims.nbf > now + clockTolerance) {
            throw OPE('unexpected JWT "nbf" (not before) claim value', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance: clockTolerance,
                claim: "nbf"
            });
        }
    }
    if (claims.aud !== undefined) {
        if (typeof claims.aud !== "string" && !Array.isArray(claims.aud)) {
            throw OPE('unexpected JWT "aud" (audience) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    return {
        header,
        claims,
        jwt: jws
    };
}
async function validateJwtAuthResponse(as, client, parameters, expectedState, options) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, or URL', ERR_INVALID_ARG_TYPE);
    }
    const response = getURLSearchParameter(parameters, "response");
    if (!response) {
        throw OPE('"parameters" does not contain a JARM response', INVALID_RESPONSE);
    }
    const { claims, header, jwt } = await validateJwt(response, checkSigningAlgorithm.bind(undefined, client.authorization_signed_response_alg, as.authorization_signing_alg_values_supported, "RS256"), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validatePresence.bind(undefined, [
        "aud",
        "exp",
        "iss"
    ])).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwt.split(".");
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    const result = new URLSearchParams();
    for (const [key, value] of Object.entries(claims)){
        if (typeof value === "string" && key !== "aud") {
            result.set(key, value);
        }
    }
    return validateAuthResponse(as, client, result, expectedState);
}
async function idTokenHash(data, header, claimName) {
    let algorithm;
    switch(header.alg){
        case "RS256":
        case "PS256":
        case "ES256":
            algorithm = "SHA-256";
            break;
        case "RS384":
        case "PS384":
        case "ES384":
            algorithm = "SHA-384";
            break;
        case "RS512":
        case "PS512":
        case "ES512":
        case "Ed25519":
        case "EdDSA":
            algorithm = "SHA-512";
            break;
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
            algorithm = {
                name: "cSHAKE256",
                length: 512
            };
            break;
        default:
            throw new UnsupportedOperationError(`unsupported JWS algorithm for ${claimName} calculation`, {
                cause: {
                    alg: header.alg
                }
            });
    }
    const digest = await crypto.subtle.digest(algorithm, buf(data));
    return b64u(digest.slice(0, digest.byteLength / 2));
}
async function idTokenHashMatches(data, actual, header, claimName) {
    const expected = await idTokenHash(data, header, claimName);
    return actual === expected;
}
async function validateDetachedSignatureResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    return validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, true);
}
async function validateCodeIdTokenResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    return validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, false);
}
async function consumeStream(request) {
    if (request.bodyUsed) {
        throw CodedTypeError("form_post Request instances must contain a readable body", ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    return request.text();
}
async function formPostResponse(request) {
    if (request.method !== "POST") {
        throw CodedTypeError("form_post responses are expected to use the POST method", ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    if (getContentType(request) !== "application/x-www-form-urlencoded") {
        throw CodedTypeError("form_post responses are expected to use the application/x-www-form-urlencoded content-type", ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    return consumeStream(request);
}
async function validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, fapi) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        if (!parameters.hash.length) {
            throw CodedTypeError('"parameters" as an instance of URL must contain a hash (fragment) with the Authorization Response parameters', ERR_INVALID_ARG_VALUE);
        }
        parameters = new URLSearchParams(parameters.hash.slice(1));
    } else if (looseInstanceOf(parameters, Request)) {
        parameters = new URLSearchParams(await formPostResponse(parameters));
    } else if (parameters instanceof URLSearchParams) {
        parameters = new URLSearchParams(parameters);
    } else {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, URL, or Response', ERR_INVALID_ARG_TYPE);
    }
    const id_token = getURLSearchParameter(parameters, "id_token");
    parameters.delete("id_token");
    switch(expectedState){
        case undefined:
        case expectNoState:
            break;
        default:
            assertString(expectedState, '"expectedState" argument');
    }
    const result = validateAuthResponse({
        ...as,
        authorization_response_iss_parameter_supported: false
    }, client, parameters, expectedState);
    if (!id_token) {
        throw OPE('"parameters" does not contain an ID Token', INVALID_RESPONSE);
    }
    const code = getURLSearchParameter(parameters, "code");
    if (!code) {
        throw OPE('"parameters" does not contain an Authorization Code', INVALID_RESPONSE);
    }
    const requiredClaims = [
        "aud",
        "exp",
        "iat",
        "iss",
        "sub",
        "nonce",
        "c_hash"
    ];
    const state = parameters.get("state");
    if (fapi && (typeof expectedState === "string" || state !== null)) {
        requiredClaims.push("s_hash");
    }
    if (maxAge !== undefined) {
        assertNumber(maxAge, true, '"maxAge" argument');
    } else if (client.default_max_age !== undefined) {
        assertNumber(client.default_max_age, true, '"client.default_max_age"');
    }
    maxAge ??= client.default_max_age ?? skipAuthTimeCheck;
    if (client.require_auth_time || maxAge !== skipAuthTimeCheck) {
        requiredClaims.push("auth_time");
    }
    const { claims, header, jwt } = await validateJwt(id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported, "RS256"), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
    const clockSkew = getClockSkew(client);
    const now = epochTime() + clockSkew;
    if (claims.iat < now - 3600) {
        throw OPE('unexpected JWT "iat" (issued at) claim value, it is too far in the past', JWT_TIMESTAMP_CHECK, {
            now,
            claims,
            claim: "iat"
        });
    }
    assertString(claims.c_hash, 'ID Token "c_hash" (code hash) claim value', INVALID_RESPONSE, {
        claims
    });
    if (claims.auth_time !== undefined) {
        assertNumber(claims.auth_time, true, 'ID Token "auth_time" (authentication time)', INVALID_RESPONSE, {
            claims
        });
    }
    if (maxAge !== skipAuthTimeCheck) {
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw OPE("too much time has elapsed since the last End-User authentication", JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance,
                claim: "auth_time"
            });
        }
    }
    assertString(expectedNonce, '"expectedNonce" argument');
    if (claims.nonce !== expectedNonce) {
        throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
            expected: expectedNonce,
            claims,
            claim: "nonce"
        });
    }
    if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
        if (claims.azp === undefined) {
            throw OPE('ID Token "aud" (audience) claim includes additional untrusted audiences', JWT_CLAIM_COMPARISON, {
                claims,
                claim: "aud"
            });
        }
        if (claims.azp !== client.client_id) {
            throw OPE('unexpected ID Token "azp" (authorized party) claim value', JWT_CLAIM_COMPARISON, {
                expected: client.client_id,
                claims,
                claim: "azp"
            });
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwt.split(".");
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    if (await idTokenHashMatches(code, claims.c_hash, header, "c_hash") !== true) {
        throw OPE('invalid ID Token "c_hash" (code hash) claim value', JWT_CLAIM_COMPARISON, {
            code,
            alg: header.alg,
            claim: "c_hash",
            claims
        });
    }
    if (fapi && state !== null || claims.s_hash !== undefined) {
        assertString(claims.s_hash, 'ID Token "s_hash" (state hash) claim value', INVALID_RESPONSE, {
            claims
        });
        assertString(state, '"state" response parameter', INVALID_RESPONSE, {
            parameters
        });
        if (await idTokenHashMatches(state, claims.s_hash, header, "s_hash") !== true) {
            throw OPE('invalid ID Token "s_hash" (state hash) claim value', JWT_CLAIM_COMPARISON, {
                state,
                alg: header.alg,
                claim: "s_hash",
                claims
            });
        }
    }
    return result;
}
function checkSigningAlgorithm(client, issuer, fallback, header) {
    if (client !== undefined) {
        if (typeof client === "string" ? header.alg !== client : !client.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: client,
                reason: "client configuration"
            });
        }
        return;
    }
    if (Array.isArray(issuer)) {
        if (!issuer.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: issuer,
                reason: "authorization server metadata"
            });
        }
        return;
    }
    if (fallback !== undefined) {
        if (typeof fallback === "string" ? header.alg !== fallback : typeof fallback === "function" ? !fallback(header.alg) : !fallback.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: fallback,
                reason: "default value"
            });
        }
        return;
    }
    throw OPE('missing client or server configuration to verify used JWT "alg" header parameter', undefined, {
        client,
        issuer,
        fallback
    });
}
function getURLSearchParameter(parameters, name) {
    const { 0: value, length } = parameters.getAll(name);
    if (length > 1) {
        throw OPE(`"${name}" parameter must be provided only once`, INVALID_RESPONSE);
    }
    return value;
}
const skipStateCheck = Symbol();
const expectNoState = Symbol();
function validateAuthResponse(as, client, parameters, expectedState) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, or URL', ERR_INVALID_ARG_TYPE);
    }
    if (getURLSearchParameter(parameters, "response")) {
        throw OPE('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', INVALID_RESPONSE, {
            parameters
        });
    }
    const iss = getURLSearchParameter(parameters, "iss");
    const state = getURLSearchParameter(parameters, "state");
    if (!iss && as.authorization_response_iss_parameter_supported) {
        throw OPE('response parameter "iss" (issuer) missing', INVALID_RESPONSE, {
            parameters
        });
    }
    if (iss && iss !== as.issuer) {
        throw OPE('unexpected "iss" (issuer) response parameter value', INVALID_RESPONSE, {
            expected: as.issuer,
            parameters
        });
    }
    switch(expectedState){
        case undefined:
        case expectNoState:
            if (state !== undefined) {
                throw OPE('unexpected "state" response parameter encountered', INVALID_RESPONSE, {
                    expected: undefined,
                    parameters
                });
            }
            break;
        case skipStateCheck:
            break;
        default:
            assertString(expectedState, '"expectedState" argument');
            if (state !== expectedState) {
                throw OPE(state === undefined ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', INVALID_RESPONSE, {
                    expected: expectedState,
                    parameters
                });
            }
    }
    const error = getURLSearchParameter(parameters, "error");
    if (error) {
        throw new AuthorizationResponseError("authorization response from the server is an error", {
            cause: parameters
        });
    }
    const id_token = getURLSearchParameter(parameters, "id_token");
    const token = getURLSearchParameter(parameters, "token");
    if (id_token !== undefined || token !== undefined) {
        throw new UnsupportedOperationError("implicit and hybrid flows are not supported");
    }
    return brand(new URLSearchParams(parameters));
}
function algToSubtle(alg) {
    switch(alg){
        case "PS256":
        case "PS384":
        case "PS512":
            return {
                name: "RSA-PSS",
                hash: `SHA-${alg.slice(-3)}`
            };
        case "RS256":
        case "RS384":
        case "RS512":
            return {
                name: "RSASSA-PKCS1-v1_5",
                hash: `SHA-${alg.slice(-3)}`
            };
        case "ES256":
        case "ES384":
            return {
                name: "ECDSA",
                namedCurve: `P-${alg.slice(-3)}`
            };
        case "ES512":
            return {
                name: "ECDSA",
                namedCurve: "P-521"
            };
        case "EdDSA":
            return "Ed25519";
        case "Ed25519":
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
            return alg;
        default:
            throw new UnsupportedOperationError("unsupported JWS algorithm", {
                cause: {
                    alg
                }
            });
    }
}
async function importJwk(alg, jwk) {
    const { ext, key_ops, use, ...key } = jwk;
    return crypto.subtle.importKey("jwk", key, algToSubtle(alg), true, [
        "verify"
    ]);
}
async function deviceAuthorizationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, "device_authorization_endpoint", client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set("client_id", client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set("accept", "application/json");
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processDeviceAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, "Device Authorization Endpoint");
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.device_code, '"response" body "device_code" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.user_code, '"response" body "user_code" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.verification_uri, '"response" body "verification_uri" property', INVALID_RESPONSE, {
        body: json
    });
    let expiresIn = typeof json.expires_in !== "number" ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json
    });
    json.expires_in = expiresIn;
    if (json.verification_uri_complete !== undefined) {
        assertString(json.verification_uri_complete, '"response" body "verification_uri_complete" property', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.interval !== undefined) {
        assertNumber(json.interval, false, '"response" body "interval" property', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function deviceCodeGrantRequest(as, client, clientAuthentication, deviceCode, options) {
    assertAs(as);
    assertClient(client);
    assertString(deviceCode, '"deviceCode"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set("device_code", deviceCode);
    return tokenEndpointRequest(as, client, clientAuthentication, "urn:ietf:params:oauth:grant-type:device_code", parameters, options);
}
async function processDeviceCodeResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function generateKeyPair(alg, options) {
    assertString(alg, '"alg"');
    const algorithm = algToSubtle(alg);
    if (alg.startsWith("PS") || alg.startsWith("RS")) {
        Object.assign(algorithm, {
            modulusLength: options?.modulusLength ?? 2048,
            publicExponent: new Uint8Array([
                0x01,
                0x00,
                0x01
            ])
        });
    }
    return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, [
        "sign",
        "verify"
    ]);
}
function normalizeHtu(htu) {
    const url = new URL(htu);
    url.search = "";
    url.hash = "";
    return url.href;
}
async function validateDPoP(request, accessToken, accessTokenClaims, options) {
    const headerValue = request.headers.get("dpop");
    if (headerValue === null) {
        throw OPE("operation indicated DPoP use but the request has no DPoP HTTP Header", INVALID_REQUEST, {
            headers: request.headers
        });
    }
    if (request.headers.get("authorization")?.toLowerCase().startsWith("dpop ") === false) {
        throw OPE(`operation indicated DPoP use but the request's Authorization HTTP Header scheme is not DPoP`, INVALID_REQUEST, {
            headers: request.headers
        });
    }
    if (typeof accessTokenClaims.cnf?.jkt !== "string") {
        throw OPE("operation indicated DPoP use but the JWT Access Token has no jkt confirmation claim", INVALID_REQUEST, {
            claims: accessTokenClaims
        });
    }
    const clockSkew = getClockSkew(options);
    const proof = await validateJwt(headerValue, checkSigningAlgorithm.bind(undefined, options?.signingAlgorithms, undefined, supported), clockSkew, getClockTolerance(options), undefined).then(checkJwtType.bind(undefined, "dpop+jwt")).then(validatePresence.bind(undefined, [
        "iat",
        "jti",
        "ath",
        "htm",
        "htu"
    ]));
    const now = epochTime() + clockSkew;
    const diff = Math.abs(now - proof.claims.iat);
    if (diff > 300) {
        throw OPE("DPoP Proof iat is not recent enough", JWT_TIMESTAMP_CHECK, {
            now,
            claims: proof.claims,
            claim: "iat"
        });
    }
    if (proof.claims.htm !== request.method) {
        throw OPE("DPoP Proof htm mismatch", JWT_CLAIM_COMPARISON, {
            expected: request.method,
            claims: proof.claims,
            claim: "htm"
        });
    }
    if (typeof proof.claims.htu !== "string" || normalizeHtu(proof.claims.htu) !== normalizeHtu(request.url)) {
        throw OPE("DPoP Proof htu mismatch", JWT_CLAIM_COMPARISON, {
            expected: normalizeHtu(request.url),
            claims: proof.claims,
            claim: "htu"
        });
    }
    {
        const expected = b64u(await crypto.subtle.digest("SHA-256", buf(accessToken)));
        if (proof.claims.ath !== expected) {
            throw OPE("DPoP Proof ath mismatch", JWT_CLAIM_COMPARISON, {
                expected,
                claims: proof.claims,
                claim: "ath"
            });
        }
    }
    {
        const expected = await build_calculateJwkThumbprint(proof.header.jwk);
        if (accessTokenClaims.cnf.jkt !== expected) {
            throw OPE("JWT Access Token confirmation mismatch", JWT_CLAIM_COMPARISON, {
                expected,
                claims: accessTokenClaims,
                claim: "cnf.jkt"
            });
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = headerValue.split(".");
    const signature = b64u(encodedSignature);
    const { jwk, alg } = proof.header;
    if (!jwk) {
        throw OPE("DPoP Proof is missing the jwk header parameter", INVALID_REQUEST, {
            header: proof.header
        });
    }
    const key = await importJwk(alg, jwk);
    if (key.type !== "public") {
        throw OPE("DPoP Proof jwk header parameter must contain a public key", INVALID_REQUEST, {
            header: proof.header
        });
    }
    await validateJwsSignature(protectedHeader, payload, key, signature);
}
async function validateJwtAccessToken(as, request, expectedAudience, options) {
    assertAs(as);
    if (!looseInstanceOf(request, Request)) {
        throw CodedTypeError('"request" must be an instance of Request', ERR_INVALID_ARG_TYPE);
    }
    assertString(expectedAudience, '"expectedAudience"');
    const authorization = request.headers.get("authorization");
    if (authorization === null) {
        throw OPE('"request" is missing an Authorization HTTP Header', INVALID_REQUEST, {
            headers: request.headers
        });
    }
    let { 0: scheme, 1: accessToken, length } = authorization.split(" ");
    scheme = scheme.toLowerCase();
    switch(scheme){
        case "dpop":
        case "bearer":
            break;
        default:
            throw new UnsupportedOperationError("unsupported Authorization HTTP Header scheme", {
                cause: {
                    headers: request.headers
                }
            });
    }
    if (length !== 2) {
        throw OPE("invalid Authorization HTTP Header format", INVALID_REQUEST, {
            headers: request.headers
        });
    }
    const requiredClaims = [
        "iss",
        "exp",
        "aud",
        "sub",
        "iat",
        "jti",
        "client_id"
    ];
    if (options?.requireDPoP || scheme === "dpop" || request.headers.has("dpop")) {
        requiredClaims.push("cnf");
    }
    const { claims, header } = await validateJwt(accessToken, checkSigningAlgorithm.bind(undefined, options?.signingAlgorithms, undefined, supported), getClockSkew(options), getClockTolerance(options), undefined).then(checkJwtType.bind(undefined, "at+jwt")).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, expectedAudience)).catch(reassignRSCode);
    for (const claim of [
        "client_id",
        "jti",
        "sub"
    ]){
        if (typeof claims[claim] !== "string") {
            throw OPE(`unexpected JWT "${claim}" claim type`, INVALID_REQUEST, {
                claims
            });
        }
    }
    if ("cnf" in claims) {
        if (!isJsonObject(claims.cnf)) {
            throw OPE('unexpected JWT "cnf" (confirmation) claim value', INVALID_REQUEST, {
                claims
            });
        }
        const { 0: cnf, length } = Object.keys(claims.cnf);
        if (length) {
            if (length !== 1) {
                throw new UnsupportedOperationError("multiple confirmation claims are not supported", {
                    cause: {
                        claims
                    }
                });
            }
            if (cnf !== "jkt") {
                throw new UnsupportedOperationError("unsupported JWT Confirmation method", {
                    cause: {
                        claims
                    }
                });
            }
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = accessToken.split(".");
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    if (options?.requireDPoP || scheme === "dpop" || claims.cnf?.jkt !== undefined || request.headers.has("dpop")) {
        await validateDPoP(request, accessToken, claims, options).catch(reassignRSCode);
    }
    return claims;
}
function reassignRSCode(err) {
    if (err instanceof OperationProcessingError && err?.code === INVALID_REQUEST) {
        err.code = INVALID_RESPONSE;
    }
    throw err;
}
async function backchannelAuthenticationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, "backchannel_authentication_endpoint", client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set("client_id", client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set("accept", "application/json");
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processBackchannelAuthenticationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, "Backchannel Authentication Endpoint");
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.auth_req_id, '"response" body "auth_req_id" property', INVALID_RESPONSE, {
        body: json
    });
    let expiresIn = typeof json.expires_in !== "number" ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json
    });
    json.expires_in = expiresIn;
    if (json.interval !== undefined) {
        assertNumber(json.interval, false, '"response" body "interval" property', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function backchannelAuthenticationGrantRequest(as, client, clientAuthentication, authReqId, options) {
    assertAs(as);
    assertClient(client);
    assertString(authReqId, '"authReqId"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set("auth_req_id", authReqId);
    return tokenEndpointRequest(as, client, clientAuthentication, "urn:openid:params:grant-type:ciba", parameters, options);
}
async function processBackchannelAuthenticationGrantResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function dynamicClientRegistrationRequest(as, metadata, options) {
    assertAs(as);
    const url = resolveEndpoint(as, "registration_endpoint", metadata.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    headers.set("accept", "application/json");
    headers.set("content-type", "application/json");
    const method = "POST";
    if (options?.DPoP) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, method, options.initialAccessToken);
    }
    if (options?.initialAccessToken) {
        headers.set("authorization", `${headers.has("dpop") ? "DPoP" : "Bearer"} ${options.initialAccessToken}`);
    }
    const response = await (options?.[build_customFetch] || fetch)(url.href, {
        body: JSON.stringify(metadata),
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: "manual",
        signal: signal(url, options?.signal)
    });
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function processDynamicClientRegistrationResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 201, "Dynamic Client Registration Endpoint");
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.client_id, '"response" body "client_id" property', INVALID_RESPONSE, {
        body: json
    });
    if (json.client_secret !== undefined) {
        assertString(json.client_secret, '"response" body "client_secret" property', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.client_secret) {
        assertNumber(json.client_secret_expires_at, true, '"response" body "client_secret_expires_at" property', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function resourceDiscoveryRequest(resourceIdentifier, options) {
    return performDiscovery(resourceIdentifier, "resourceIdentifier", (url)=>{
        prependWellKnown(url, ".well-known/oauth-protected-resource", true);
        return url;
    }, options);
}
async function processResourceDiscoveryResponse(expectedResourceIdentifier, response) {
    const expected = expectedResourceIdentifier;
    if (!(expected instanceof URL) && expected !== _nodiscoverycheck) {
        throw CodedTypeError('"expectedResourceIdentifier" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform Resource Server Metadata response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.resource, '"response" body "resource" property', INVALID_RESPONSE, {
        body: json
    });
    if (expected !== _nodiscoverycheck && new URL(json.resource).href !== expected.href) {
        throw OPE('"response" body "resource" property does not match the expected value', JSON_ATTRIBUTE_COMPARISON, {
            expected: expected.href,
            body: json,
            attribute: "resource"
        });
    }
    return json;
}
async function getResponseJsonBody(response, check = assertApplicationJson) {
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        check(response);
        throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
const _nopkce = (/* unused pure expression or super */ null && (nopkce));
const _nodiscoverycheck = Symbol();
const _expectedIssuer = Symbol(); //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/callback/oauth/checks.js


// NOTE: We use the default JWT methods here because they encrypt/decrypt the payload, not just sign it.

const COOKIE_TTL = 60 * 15; // 15 minutes
/** Returns a cookie with a JWT encrypted payload. */ async function sealCookie(name, payload, options) {
    const { cookies, logger } = options;
    const cookie = cookies[name];
    const expires = new Date();
    expires.setTime(expires.getTime() + COOKIE_TTL * 1000);
    logger.debug(`CREATE_${name.toUpperCase()}`, {
        name: cookie.name,
        payload,
        COOKIE_TTL,
        expires
    });
    const encoded = await jwt_encode({
        ...options.jwt,
        maxAge: COOKIE_TTL,
        token: {
            value: payload
        },
        salt: cookie.name
    });
    const cookieOptions = {
        ...cookie.options,
        expires
    };
    return {
        name: cookie.name,
        value: encoded,
        options: cookieOptions
    };
}
async function checks_parseCookie(name, value, options) {
    try {
        const { logger, cookies, jwt } = options;
        logger.debug(`PARSE_${name.toUpperCase()}`, {
            cookie: value
        });
        if (!value) throw new InvalidCheck(`${name} cookie was missing`);
        const parsed = await jwt_decode({
            ...jwt,
            token: value,
            salt: cookies[name].name
        });
        if (parsed?.value) return parsed.value;
        throw new Error("Invalid cookie");
    } catch (error) {
        throw new InvalidCheck(`${name} value could not be parsed`, {
            cause: error
        });
    }
}
function clearCookie(name, options, resCookies) {
    const { logger, cookies } = options;
    const cookie = cookies[name];
    logger.debug(`CLEAR_${name.toUpperCase()}`, {
        cookie
    });
    resCookies.push({
        name: cookie.name,
        value: "",
        options: {
            ...cookies[name].options,
            maxAge: 0
        }
    });
}
function useCookie(check, name) {
    return async function(cookies, resCookies, options) {
        const { provider, logger } = options;
        if (!provider?.checks?.includes(check)) return;
        const cookieValue = cookies?.[options.cookies[name].name];
        logger.debug(`USE_${name.toUpperCase()}`, {
            value: cookieValue
        });
        const parsed = await checks_parseCookie(name, cookieValue, options);
        clearCookie(name, options, resCookies);
        return parsed;
    };
}
/**
 * @see https://www.rfc-editor.org/rfc/rfc7636
 * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#pkce
 */ const pkce = {
    /** Creates a PKCE code challenge and verifier pair. The verifier in stored in the cookie. */ async create (options) {
        const code_verifier = generateRandomCodeVerifier();
        const value = await calculatePKCECodeChallenge(code_verifier);
        const cookie = await sealCookie("pkceCodeVerifier", code_verifier, options);
        return {
            cookie,
            value
        };
    },
    /**
     * Returns code_verifier if the provider is configured to use PKCE,
     * and clears the container cookie afterwards.
     * An error is thrown if the code_verifier is missing or invalid.
     */ use: useCookie("pkce", "pkceCodeVerifier")
};
const STATE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const encodedStateSalt = "encodedState";
/**
 * @see https://www.rfc-editor.org/rfc/rfc6749#section-10.12
 * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
 */ const checks_state = {
    /** Creates a state cookie with an optionally encoded body. */ async create (options, origin) {
        const { provider } = options;
        if (!provider.checks.includes("state")) {
            if (origin) {
                throw new InvalidCheck("State data was provided but the provider is not configured to use state");
            }
            return;
        }
        // IDEA: Allow the user to pass data to be stored in the state
        const payload = {
            origin,
            random: generateRandomState()
        };
        const value = await jwt_encode({
            secret: options.jwt.secret,
            token: payload,
            salt: encodedStateSalt,
            maxAge: STATE_MAX_AGE
        });
        const cookie = await sealCookie("state", value, options);
        return {
            cookie,
            value
        };
    },
    /**
     * Returns state if the provider is configured to use state,
     * and clears the container cookie afterwards.
     * An error is thrown if the state is missing or invalid.
     */ use: useCookie("state", "state"),
    /** Decodes the state. If it could not be decoded, it throws an error. */ async decode (state, options) {
        try {
            options.logger.debug("DECODE_STATE", {
                state
            });
            const payload = await jwt_decode({
                secret: options.jwt.secret,
                token: state,
                salt: encodedStateSalt
            });
            if (payload) return payload;
            throw new Error("Invalid state");
        } catch (error) {
            throw new InvalidCheck("State could not be decoded", {
                cause: error
            });
        }
    }
};
const checks_nonce = {
    async create (options) {
        if (!options.provider.checks.includes("nonce")) return;
        const value = generateRandomNonce();
        const cookie = await sealCookie("nonce", value, options);
        return {
            cookie,
            value
        };
    },
    /**
     * Returns nonce if the provider is configured to use nonce,
     * and clears the container cookie afterwards.
     * An error is thrown if the nonce is missing or invalid.
     * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
     * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
     */ use: useCookie("nonce", "nonce")
};
const WEBAUTHN_CHALLENGE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const webauthnChallengeSalt = "encodedWebauthnChallenge";
const webauthnChallenge = {
    async create (options, challenge, registerData) {
        return {
            cookie: await sealCookie("webauthnChallenge", await jwt_encode({
                secret: options.jwt.secret,
                token: {
                    challenge,
                    registerData
                },
                salt: webauthnChallengeSalt,
                maxAge: WEBAUTHN_CHALLENGE_MAX_AGE
            }), options)
        };
    },
    /** Returns WebAuthn challenge if present. */ async use (options, cookies, resCookies) {
        const cookieValue = cookies?.[options.cookies.webauthnChallenge.name];
        const parsed = await checks_parseCookie("webauthnChallenge", cookieValue, options);
        const payload = await jwt_decode({
            secret: options.jwt.secret,
            token: parsed,
            salt: webauthnChallengeSalt
        });
        // Clear the WebAuthn challenge cookie after use
        clearCookie("webauthnChallenge", options, resCookies);
        if (!payload) throw new InvalidCheck("WebAuthn challenge was missing");
        return payload;
    }
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/webapi/util/decode_jwt.js




function decodeJwt(jwt) {
    if (typeof jwt !== "string") throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
    const { 1: payload, length } = jwt.split(".");
    if (length === 5) throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
    if (length !== 3) throw new JWTInvalid("Invalid JWT");
    if (!payload) throw new JWTInvalid("JWTs must contain a payload");
    let decoded;
    try {
        decoded = decode(payload);
    } catch  {
        throw new JWTInvalid("Failed to base64url decode the payload");
    }
    let result;
    try {
        result = JSON.parse(decoder.decode(decoded));
    } catch  {
        throw new JWTInvalid("Failed to parse the decoded payload as JSON");
    }
    if (!isObject(result)) throw new JWTInvalid("Invalid JWT Claims Set");
    return result;
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/callback/oauth/callback.js






function callback_formUrlEncode(token) {
    return encodeURIComponent(token).replace(/%20/g, "+");
}
/**
 * Formats client_id and client_secret as an HTTP Basic Authentication header as per the OAuth 2.0
 * specified in RFC6749.
 */ function clientSecretBasic(clientId, clientSecret) {
    const username = callback_formUrlEncode(clientId);
    const password = callback_formUrlEncode(clientSecret);
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
}
/**
 * Handles the following OAuth steps.
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.3
 * https://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest
 *
 * @note Although requesting userinfo is not required by the OAuth2.0 spec,
 * we fetch it anyway. This is because we always want a user profile.
 */ async function handleOAuth(params, cookies, options) {
    const { logger, provider } = options;
    let as;
    const { token, userinfo } = provider;
    // Falls back to authjs.dev if the user only passed params
    if ((!token?.url || token.url.host === "authjs.dev") && (!userinfo?.url || userinfo.url.host === "authjs.dev")) {
        // We assume that issuer is always defined as this has been asserted earlier
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await discoveryRequest(issuer, {
            [allowInsecureRequests]: true,
            [build_customFetch]: provider[customFetch]
        });
        as = await processDiscoveryResponse(issuer, discoveryResponse);
        if (!as.token_endpoint) throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
        if (!as.userinfo_endpoint) throw new TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
    } else {
        as = {
            issuer: provider.issuer ?? "https://authjs.dev",
            token_endpoint: token?.url.toString(),
            userinfo_endpoint: userinfo?.url.toString()
        };
    }
    const client = {
        client_id: provider.clientId,
        ...provider.client
    };
    let clientAuth;
    switch(client.token_endpoint_auth_method){
        // TODO: in the next breaking major version have undefined be `client_secret_post`
        case undefined:
        case "client_secret_basic":
            // TODO: in the next breaking major version use o.ClientSecretBasic() here
            clientAuth = (_as, _client, _body, headers)=>{
                headers.set("authorization", clientSecretBasic(provider.clientId, provider.clientSecret));
            };
            break;
        case "client_secret_post":
            clientAuth = ClientSecretPost(provider.clientSecret);
            break;
        case "client_secret_jwt":
            clientAuth = ClientSecretJwt(provider.clientSecret);
            break;
        case "private_key_jwt":
            clientAuth = PrivateKeyJwt(provider.token.clientPrivateKey, {
                // TODO: review in the next breaking change
                [modifyAssertion] (_header, payload) {
                    payload.aud = [
                        as.issuer,
                        as.token_endpoint
                    ];
                }
            });
            break;
        case "none":
            clientAuth = None();
            break;
        default:
            throw new Error("unsupported client authentication method");
    }
    const resCookies = [];
    const state = await checks_state.use(cookies, resCookies, options);
    let codeGrantParams;
    try {
        codeGrantParams = validateAuthResponse(as, client, new URLSearchParams(params), provider.checks.includes("state") ? state : skipStateCheck);
    } catch (err) {
        if (err instanceof AuthorizationResponseError) {
            const cause = {
                providerId: provider.id,
                ...Object.fromEntries(err.cause.entries())
            };
            logger.debug("OAuthCallbackError", cause);
            throw new OAuthCallbackError("OAuth Provider returned an error", cause);
        }
        throw err;
    }
    const codeVerifier = await pkce.use(cookies, resCookies, options);
    let redirect_uri = provider.callbackUrl;
    if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
        redirect_uri = provider.redirectProxyUrl;
    }
    let codeGrantResponse = await authorizationCodeGrantRequest(as, client, clientAuth, codeGrantParams, redirect_uri, codeVerifier ?? "decoy", {
        // TODO: move away from allowing insecure HTTP requests
        [allowInsecureRequests]: true,
        [build_customFetch]: (...args)=>{
            if (!provider.checks.includes("pkce")) {
                args[1].body.delete("code_verifier");
            }
            return (provider[customFetch] ?? fetch)(...args);
        }
    });
    if (provider.token?.conform) {
        codeGrantResponse = await provider.token.conform(codeGrantResponse.clone()) ?? codeGrantResponse;
    }
    let profile = {};
    const requireIdToken = isOIDCProvider(provider);
    if (provider[conformInternal]) {
        switch(provider.id){
            case "microsoft-entra-id":
            case "azure-ad":
                {
                    /**
                 * These providers return errors in the response body and
                 * need the authorization server metadata to be re-processed
                 * based on the `id_token`'s `tid` claim.
                 * @see: https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow#error-response-1
                 */ const responseJson = await codeGrantResponse.clone().json();
                    if (responseJson.error) {
                        const cause = {
                            providerId: provider.id,
                            ...responseJson
                        };
                        throw new OAuthCallbackError(`OAuth Provider returned an error: ${responseJson.error}`, cause);
                    }
                    const { tid } = decodeJwt(responseJson.id_token);
                    if (typeof tid === "string") {
                        const tenantRe = /microsoftonline\.com\/(\w+)\/v2\.0/;
                        const tenantId = as.issuer?.match(tenantRe)?.[1] ?? "common";
                        const issuer = new URL(as.issuer.replace(tenantId, tid));
                        const discoveryResponse = await discoveryRequest(issuer, {
                            [build_customFetch]: provider[customFetch]
                        });
                        as = await processDiscoveryResponse(issuer, discoveryResponse);
                    }
                    break;
                }
            default:
                break;
        }
    }
    const processedCodeResponse = await processAuthorizationCodeResponse(as, client, codeGrantResponse, {
        expectedNonce: await checks_nonce.use(cookies, resCookies, options),
        requireIdToken
    });
    const tokens = processedCodeResponse;
    if (requireIdToken) {
        const idTokenClaims = getValidatedIdTokenClaims(processedCodeResponse);
        profile = idTokenClaims;
        // Apple sends some of the user information in a `user` parameter as a stringified JSON.
        // It also only does so the first time the user consents to share their information.
        if (provider[conformInternal] && provider.id === "apple") {
            try {
                profile.user = JSON.parse(params?.user);
            } catch  {}
        }
        if (provider.idToken === false) {
            const userinfoResponse = await userInfoRequest(as, client, processedCodeResponse.access_token, {
                [build_customFetch]: provider[customFetch],
                // TODO: move away from allowing insecure HTTP requests
                [allowInsecureRequests]: true
            });
            profile = await processUserInfoResponse(as, client, idTokenClaims.sub, userinfoResponse);
        }
    } else {
        if (userinfo?.request) {
            const _profile = await userinfo.request({
                tokens,
                provider
            });
            if (_profile instanceof Object) profile = _profile;
        } else if (userinfo?.url) {
            const userinfoResponse = await userInfoRequest(as, client, processedCodeResponse.access_token, {
                [build_customFetch]: provider[customFetch],
                // TODO: move away from allowing insecure HTTP requests
                [allowInsecureRequests]: true
            });
            profile = await userinfoResponse.json();
        } else {
            throw new TypeError("No userinfo endpoint configured");
        }
    }
    if (tokens.expires_in) {
        tokens.expires_at = Math.floor(Date.now() / 1000) + Number(tokens.expires_in);
    }
    const profileResult = await getUserAndAccount(profile, provider, tokens, logger);
    return {
        ...profileResult,
        profile,
        cookies: resCookies
    };
}
/**
 * Returns the user and account that is going to be created in the database.
 * @internal
 */ async function getUserAndAccount(OAuthProfile, provider, tokens, logger) {
    try {
        const userFromProfile = await provider.profile(OAuthProfile, tokens);
        const user = {
            ...userFromProfile,
            // The user's id is intentionally not set based on the profile id, as
            // the user should remain independent of the provider and the profile id
            // is saved on the Account already, as `providerAccountId`.
            id: crypto.randomUUID(),
            email: userFromProfile.email?.toLowerCase()
        };
        return {
            user,
            account: {
                ...tokens,
                provider: provider.id,
                type: provider.type,
                providerAccountId: userFromProfile.id ?? crypto.randomUUID()
            }
        };
    } catch (e) {
        // If we didn't get a response either there was a problem with the provider
        // response *or* the user cancelled the action with the provider.
        //
        // Unfortunately, we can't tell which - at least not in a way that works for
        // all providers, so we return an empty object; the user should then be
        // redirected back to the sign up page. We log the error to help developers
        // who might be trying to debug this when configuring a new provider.
        logger.debug("getProfile error details", OAuthProfile);
        logger.error(new OAuthProfileParseError(e, {
            provider: provider.id
        }));
    }
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/webauthn-utils.js
/* provided dependency */ var Buffer = __webpack_require__(195)["Buffer"];



/**
 * Infers the WebAuthn options based on the provided parameters.
 *
 * @param action - The WebAuthn action to perform (optional).
 * @param loggedInUser - The logged-in user (optional).
 * @param userInfoResponse - The response containing user information (optional).
 *
 * @returns The WebAuthn action to perform, or null if no inference could be made.
 */ function inferWebAuthnOptions(action, loggedIn, userInfoResponse) {
    const { user, exists = false } = userInfoResponse ?? {};
    switch(action){
        case "authenticate":
            {
                /**
             * Always allow explicit authentication requests.
             */ return "authenticate";
            }
        case "register":
            {
                /**
             * Registration is only allowed if:
             * - The user is logged in, meaning the user wants to register a new authenticator.
             * - The user is not logged in and provided user info that does NOT exist, meaning the user wants to register a new account.
             */ if (user && loggedIn === exists) return "register";
                break;
            }
        case undefined:
            {
                /**
             * When no explicit action is provided, we try to infer it based on the user info provided. These are the possible cases:
             * - Logged in users must always send an explit action, so we bail out in this case.
             * - Otherwise, if no user info is provided, the desired action is authentication without pre-defined authenticators.
             * - Otherwise, if the user info provided is of an existing user, the desired action is authentication with their pre-defined authenticators.
             * - Finally, if the user info provided is of a non-existing user, the desired action is registration.
             */ if (!loggedIn) {
                    if (user) {
                        if (exists) {
                            return "authenticate";
                        } else {
                            return "register";
                        }
                    } else {
                        return "authenticate";
                    }
                }
                break;
            }
    }
    // No decision could be made
    return null;
}
/**
 * Retrieves the registration response for WebAuthn options request.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - The user information.
 * @param resCookies - Optional cookies to be included in the response.
 * @returns A promise that resolves to the WebAuthnOptionsResponse.
 */ async function getRegistrationResponse(options, request, user, resCookies) {
    // Get registration options
    const regOptions = await getRegistrationOptions(options, request, user);
    // Get signed cookie
    const { cookie } = await webauthnChallenge.create(options, regOptions.challenge, user);
    return {
        status: 200,
        cookies: [
            ...resCookies ?? [],
            cookie
        ],
        body: {
            action: "register",
            options: regOptions
        },
        headers: {
            "Content-Type": "application/json"
        }
    };
}
/**
 * Retrieves the authentication response for WebAuthn options request.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - Optional user information.
 * @param resCookies - Optional array of cookies to be included in the response.
 * @returns A promise that resolves to a WebAuthnOptionsResponse object.
 */ async function getAuthenticationResponse(options, request, user, resCookies) {
    // Get authentication options
    const authOptions = await getAuthenticationOptions(options, request, user);
    // Get signed cookie
    const { cookie } = await webauthnChallenge.create(options, authOptions.challenge);
    return {
        status: 200,
        cookies: [
            ...resCookies ?? [],
            cookie
        ],
        body: {
            action: "authenticate",
            options: authOptions
        },
        headers: {
            "Content-Type": "application/json"
        }
    };
}
async function verifyAuthenticate(options, request, resCookies) {
    const { adapter, provider } = options;
    // Get WebAuthn response from request body
    const data = request.body && typeof request.body.data === "string" ? JSON.parse(request.body.data) : undefined;
    if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string") {
        throw new AuthError("Invalid WebAuthn Authentication response");
    }
    // Reset the ID so we smooth out implementation differences
    const credentialID = toBase64(fromBase64(data.id));
    // Get authenticator from database
    const authenticator = await adapter.getAuthenticator(credentialID);
    if (!authenticator) {
        throw new AuthError(`WebAuthn authenticator not found in database: ${JSON.stringify({
            credentialID
        })}`);
    }
    // Get challenge from request cookies
    const { challenge: expectedChallenge } = await webauthnChallenge.use(options, request.cookies, resCookies);
    // Verify the response
    let verification;
    try {
        const relayingParty = provider.getRelayingParty(options, request);
        verification = await provider.simpleWebAuthn.verifyAuthenticationResponse({
            ...provider.verifyAuthenticationOptions,
            expectedChallenge,
            response: data,
            authenticator: fromAdapterAuthenticator(authenticator),
            expectedOrigin: relayingParty.origin,
            expectedRPID: relayingParty.id
        });
    } catch (e) {
        throw new WebAuthnVerificationError(e);
    }
    const { verified, authenticationInfo } = verification;
    // Make sure the response was verified
    if (!verified) {
        throw new WebAuthnVerificationError("WebAuthn authentication response could not be verified");
    }
    // Update authenticator counter
    try {
        const { newCounter } = authenticationInfo;
        await adapter.updateAuthenticatorCounter(authenticator.credentialID, newCounter);
    } catch (e) {
        throw new AdapterError(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({
            credentialID,
            oldCounter: authenticator.counter,
            newCounter: authenticationInfo.newCounter
        })}`, e);
    }
    // Get the account and user
    const account = await adapter.getAccount(authenticator.providerAccountId, provider.id);
    if (!account) {
        throw new AuthError(`WebAuthn account not found in database: ${JSON.stringify({
            credentialID,
            providerAccountId: authenticator.providerAccountId
        })}`);
    }
    const user = await adapter.getUser(account.userId);
    if (!user) {
        throw new AuthError(`WebAuthn user not found in database: ${JSON.stringify({
            credentialID,
            providerAccountId: authenticator.providerAccountId,
            userID: account.userId
        })}`);
    }
    return {
        account,
        user
    };
}
async function verifyRegister(options, request, resCookies) {
    const { provider } = options;
    // Get WebAuthn response from request body
    const data = request.body && typeof request.body.data === "string" ? JSON.parse(request.body.data) : undefined;
    if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string") {
        throw new AuthError("Invalid WebAuthn Registration response");
    }
    // Get challenge from request cookies
    const { challenge: expectedChallenge, registerData: user } = await webauthnChallenge.use(options, request.cookies, resCookies);
    if (!user) {
        throw new AuthError("Missing user registration data in WebAuthn challenge cookie");
    }
    // Verify the response
    let verification;
    try {
        const relayingParty = provider.getRelayingParty(options, request);
        verification = await provider.simpleWebAuthn.verifyRegistrationResponse({
            ...provider.verifyRegistrationOptions,
            expectedChallenge,
            response: data,
            expectedOrigin: relayingParty.origin,
            expectedRPID: relayingParty.id
        });
    } catch (e) {
        throw new WebAuthnVerificationError(e);
    }
    // Make sure the response was verified
    if (!verification.verified || !verification.registrationInfo) {
        throw new WebAuthnVerificationError("WebAuthn registration response could not be verified");
    }
    // Build a new account
    const account = {
        providerAccountId: toBase64(verification.registrationInfo.credentialID),
        provider: options.provider.id,
        type: provider.type
    };
    // Build a new authenticator
    const authenticator = {
        providerAccountId: account.providerAccountId,
        counter: verification.registrationInfo.counter,
        credentialID: toBase64(verification.registrationInfo.credentialID),
        credentialPublicKey: toBase64(verification.registrationInfo.credentialPublicKey),
        credentialBackedUp: verification.registrationInfo.credentialBackedUp,
        credentialDeviceType: verification.registrationInfo.credentialDeviceType,
        transports: transportsToString(data.response.transports)
    };
    // Return created stuff
    return {
        user,
        account,
        authenticator
    };
}
/**
 * Generates WebAuthn authentication options.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - Optional user information.
 * @returns The authentication options.
 */ async function getAuthenticationOptions(options, request, user) {
    const { provider, adapter } = options;
    // Get the user's authenticators.
    const authenticators = user && user["id"] ? await adapter.listAuthenticatorsByUserId(user.id) : null;
    const relayingParty = provider.getRelayingParty(options, request);
    // Return the authentication options.
    return await provider.simpleWebAuthn.generateAuthenticationOptions({
        ...provider.authenticationOptions,
        rpID: relayingParty.id,
        allowCredentials: authenticators?.map((a)=>({
                id: fromBase64(a.credentialID),
                type: "public-key",
                transports: stringToTransports(a.transports)
            }))
    });
}
/**
 * Generates WebAuthn registration options.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - The user information.
 * @returns The registration options.
 */ async function getRegistrationOptions(options, request, user) {
    const { provider, adapter } = options;
    // Get the user's authenticators.
    const authenticators = user["id"] ? await adapter.listAuthenticatorsByUserId(user.id) : null;
    // Generate a random user ID for the credential.
    // We can do this because we don't use this user ID to link the
    // credential to the user. Instead, we store actual userID in the
    // Authenticator object and fetch it via it's credential ID.
    const userID = randomString(32);
    const relayingParty = provider.getRelayingParty(options, request);
    // Return the registration options.
    return await provider.simpleWebAuthn.generateRegistrationOptions({
        ...provider.registrationOptions,
        userID,
        userName: user.email,
        userDisplayName: user.name ?? undefined,
        rpID: relayingParty.id,
        rpName: relayingParty.name,
        excludeCredentials: authenticators?.map((a)=>({
                id: fromBase64(a.credentialID),
                type: "public-key",
                transports: stringToTransports(a.transports)
            }))
    });
}
function assertInternalOptionsWebAuthn(options) {
    const { provider, adapter } = options;
    // Adapter is required for WebAuthn
    if (!adapter) throw new MissingAdapter("An adapter is required for the WebAuthn provider");
    // Provider must be WebAuthn
    if (!provider || provider.type !== "webauthn") {
        throw new InvalidProvider("Provider must be WebAuthn");
    }
    // Narrow the options type for typed usage later
    return {
        ...options,
        provider,
        adapter
    };
}
function fromAdapterAuthenticator(authenticator) {
    return {
        ...authenticator,
        credentialDeviceType: authenticator.credentialDeviceType,
        transports: stringToTransports(authenticator.transports),
        credentialID: fromBase64(authenticator.credentialID),
        credentialPublicKey: fromBase64(authenticator.credentialPublicKey)
    };
}
function fromBase64(base64) {
    return new Uint8Array(Buffer.from(base64, "base64"));
}
function toBase64(bytes) {
    return Buffer.from(bytes).toString("base64");
}
function transportsToString(transports) {
    return transports?.join(",");
}
function stringToTransports(tstring) {
    return tstring ? tstring.split(",") : undefined;
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/callback/index.js
// TODO: Make this file smaller






/** Handle callbacks from login services */ async function callback(request, options, sessionStore, cookies) {
    if (!options.provider) throw new InvalidProvider("Callback route called without provider");
    const { query, body, method, headers } = request;
    const { provider, adapter, url, callbackUrl, pages, jwt, events, callbacks, session: { strategy: sessionStrategy, maxAge: sessionMaxAge }, logger } = options;
    const useJwtSession = sessionStrategy === "jwt";
    try {
        if (provider.type === "oauth" || provider.type === "oidc") {
            // Use body if the response mode is set to form_post. For all other cases, use query
            const params = provider.authorization?.url.searchParams.get("response_mode") === "form_post" ? body : query;
            // If we have a state and we are on a redirect proxy, we try to parse it
            // and see if it contains a valid origin to redirect to. If it does, we
            // redirect the user to that origin with the original state.
            if (options.isOnRedirectProxy && params?.state) {
                // NOTE: We rely on the state being encrypted using a shared secret
                // between the proxy and the original server.
                const parsedState = await checks_state.decode(params.state, options);
                const shouldRedirect = parsedState?.origin && new URL(parsedState.origin).origin !== options.url.origin;
                if (shouldRedirect) {
                    const proxyRedirect = `${parsedState.origin}?${new URLSearchParams(params)}`;
                    logger.debug("Proxy redirecting to", proxyRedirect);
                    return {
                        redirect: proxyRedirect,
                        cookies
                    };
                }
            }
            const authorizationResult = await handleOAuth(params, request.cookies, options);
            if (authorizationResult.cookies.length) {
                cookies.push(...authorizationResult.cookies);
            }
            logger.debug("authorization result", authorizationResult);
            const { user: userFromProvider, account, profile: OAuthProfile } = authorizationResult;
            // If we don't have a profile object then either something went wrong
            // or the user cancelled signing in. We don't know which, so we just
            // direct the user to the signin page for now. We could do something
            // else in future.
            // TODO: Handle user cancelling signin
            if (!userFromProvider || !account || !OAuthProfile) {
                return {
                    redirect: `${url}/signin`,
                    cookies
                };
            }
            // Check if user is allowed to sign in
            // Attempt to get Profile from OAuth provider details before invoking
            // signIn callback - but if no user object is returned, that is fine
            // (that just means it's a new user signing in for the first time).
            let userByAccount;
            if (adapter) {
                const { getUserByAccount } = adapter;
                userByAccount = await getUserByAccount({
                    providerAccountId: account.providerAccountId,
                    provider: provider.id
                });
            }
            const redirect = await handleAuthorized({
                user: userByAccount ?? userFromProvider,
                account,
                profile: OAuthProfile
            }, options);
            if (redirect) return {
                redirect,
                cookies
            };
            const { user, session, isNewUser } = await handleLoginOrRegister(sessionStore.value, userFromProvider, account, options);
            if (useJwtSession) {
                const defaultToken = {
                    name: user.name,
                    email: user.email,
                    picture: user.image,
                    sub: user.id?.toString()
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user,
                    account,
                    profile: OAuthProfile,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn"
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                } else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({
                        ...jwt,
                        token,
                        salt
                    });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires
                    });
                    cookies.push(...sessionCookies);
                }
            } else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires
                    }
                });
            }
            await events.signIn?.({
                user,
                account,
                profile: OAuthProfile,
                isNewUser
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({
                        callbackUrl
                    })}`,
                    cookies
                };
            }
            return {
                redirect: callbackUrl,
                cookies
            };
        } else if (provider.type === "email") {
            const paramToken = query?.token;
            const paramIdentifier = query?.email;
            if (!paramToken) {
                const e = new TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", {
                    cause: {
                        hasToken: !!paramToken
                    }
                });
                e.name = "Configuration";
                throw e;
            }
            const secret = provider.secret ?? options.secret;
            // @ts-expect-error -- Verified in `assertConfig`.
            const invite = await adapter.useVerificationToken({
                // @ts-expect-error User-land adapters might decide to omit the identifier during lookup
                identifier: paramIdentifier,
                token: await createHash(`${paramToken}${secret}`)
            });
            const hasInvite = !!invite;
            const expired = hasInvite && invite.expires.valueOf() < Date.now();
            const invalidInvite = !hasInvite || expired || // The user might have configured the link to not contain the identifier
            // so we only compare if it exists
            paramIdentifier && invite.identifier !== paramIdentifier;
            if (invalidInvite) throw new Verification({
                hasInvite,
                expired
            });
            const { identifier } = invite;
            const user = await adapter.getUserByEmail(identifier) ?? {
                id: crypto.randomUUID(),
                email: identifier,
                emailVerified: null
            };
            const account = {
                providerAccountId: user.email,
                userId: user.id,
                type: "email",
                provider: provider.id
            };
            const redirect = await handleAuthorized({
                user,
                account
            }, options);
            if (redirect) return {
                redirect,
                cookies
            };
            // Sign user in
            const { user: loggedInUser, session, isNewUser } = await handleLoginOrRegister(sessionStore.value, user, account, options);
            if (useJwtSession) {
                const defaultToken = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    picture: loggedInUser.image,
                    sub: loggedInUser.id?.toString()
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user: loggedInUser,
                    account,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn"
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                } else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({
                        ...jwt,
                        token,
                        salt
                    });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires
                    });
                    cookies.push(...sessionCookies);
                }
            } else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires
                    }
                });
            }
            await events.signIn?.({
                user: loggedInUser,
                account,
                isNewUser
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({
                        callbackUrl
                    })}`,
                    cookies
                };
            }
            // Callback URL is already verified at this point, so safe to use if specified
            return {
                redirect: callbackUrl,
                cookies
            };
        } else if (provider.type === "credentials" && method === "POST") {
            const credentials = body ?? {};
            // TODO: Forward the original request as is, instead of reconstructing it
            Object.entries(query ?? {}).forEach(([k, v])=>url.searchParams.set(k, v));
            const userFromAuthorize = await provider.authorize(credentials, // prettier-ignore
            new Request(url, {
                headers,
                method,
                body: JSON.stringify(body)
            }));
            const user = userFromAuthorize;
            if (!user) throw new CredentialsSignin();
            else user.id = user.id?.toString() ?? crypto.randomUUID();
            const account = {
                providerAccountId: user.id,
                type: "credentials",
                provider: provider.id
            };
            const redirect = await handleAuthorized({
                user,
                account,
                credentials
            }, options);
            if (redirect) return {
                redirect,
                cookies
            };
            const defaultToken = {
                name: user.name,
                email: user.email,
                picture: user.image,
                sub: user.id
            };
            const token = await callbacks.jwt({
                token: defaultToken,
                user,
                account,
                isNewUser: false,
                trigger: "signIn"
            });
            // Clear cookies if token is null
            if (token === null) {
                cookies.push(...sessionStore.clean());
            } else {
                const salt = options.cookies.sessionToken.name;
                // Encode token
                const newToken = await jwt.encode({
                    ...jwt,
                    token,
                    salt
                });
                // Set cookie expiry date
                const cookieExpires = new Date();
                cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: cookieExpires
                });
                cookies.push(...sessionCookies);
            }
            await events.signIn?.({
                user,
                account
            });
            return {
                redirect: callbackUrl,
                cookies
            };
        } else if (provider.type === "webauthn" && method === "POST") {
            // Get callback action from request. It should be either "authenticate" or "register"
            const action = request.body?.action;
            if (typeof action !== "string" || action !== "authenticate" && action !== "register") {
                throw new AuthError("Invalid action parameter");
            }
            // Return an error if the adapter is missing or if the provider
            // is not a webauthn provider.
            const localOptions = assertInternalOptionsWebAuthn(options);
            // Verify request to get user, account and authenticator
            let user;
            let account;
            let authenticator;
            switch(action){
                case "authenticate":
                    {
                        const verified = await verifyAuthenticate(localOptions, request, cookies);
                        user = verified.user;
                        account = verified.account;
                        break;
                    }
                case "register":
                    {
                        const verified = await verifyRegister(options, request, cookies);
                        user = verified.user;
                        account = verified.account;
                        authenticator = verified.authenticator;
                        break;
                    }
            }
            // Check if user is allowed to sign in
            await handleAuthorized({
                user,
                account
            }, options);
            // Sign user in, creating them and their account if needed
            const { user: loggedInUser, isNewUser, session, account: currentAccount } = await handleLoginOrRegister(sessionStore.value, user, account, options);
            if (!currentAccount) {
                // This is mostly for type checking. It should never actually happen.
                throw new AuthError("Error creating or finding account");
            }
            // Create new authenticator if needed
            if (authenticator && loggedInUser.id) {
                await localOptions.adapter.createAuthenticator({
                    ...authenticator,
                    userId: loggedInUser.id
                });
            }
            // Do the session registering dance
            if (useJwtSession) {
                const defaultToken = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    picture: loggedInUser.image,
                    sub: loggedInUser.id?.toString()
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user: loggedInUser,
                    account: currentAccount,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn"
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                } else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({
                        ...jwt,
                        token,
                        salt
                    });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires
                    });
                    cookies.push(...sessionCookies);
                }
            } else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires
                    }
                });
            }
            await events.signIn?.({
                user: loggedInUser,
                account: currentAccount,
                isNewUser
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({
                        callbackUrl
                    })}`,
                    cookies
                };
            }
            // Callback URL is already verified at this point, so safe to use if specified
            return {
                redirect: callbackUrl,
                cookies
            };
        }
        throw new InvalidProvider(`Callback for provider type (${provider.type}) is not supported`);
    } catch (e) {
        if (e instanceof AuthError) throw e;
        const error = new CallbackRouteError(e, {
            provider: provider.id
        });
        logger.debug("callback route error details", {
            method,
            query,
            body
        });
        throw error;
    }
}
async function handleAuthorized(params, config) {
    let authorized;
    const { signIn, redirect } = config.callbacks;
    try {
        authorized = await signIn(params);
    } catch (e) {
        if (e instanceof AuthError) throw e;
        throw new AccessDenied(e);
    }
    if (!authorized) throw new AccessDenied("AccessDenied");
    if (typeof authorized !== "string") return;
    return await redirect({
        url: authorized,
        baseUrl: config.url.origin
    });
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/session.js


/** Return a session object filtered via `callbacks.session` */ async function session(options, sessionStore, cookies, isUpdate, newSession) {
    const { adapter, jwt, events, callbacks, logger, session: { strategy: sessionStrategy, maxAge: sessionMaxAge } } = options;
    const response = {
        body: null,
        headers: {
            "Content-Type": "application/json",
            ...!isUpdate && {
                "Cache-Control": "private, no-cache, no-store",
                Expires: "0",
                Pragma: "no-cache"
            }
        },
        cookies
    };
    const sessionToken = sessionStore.value;
    if (!sessionToken) return response;
    if (sessionStrategy === "jwt") {
        try {
            const salt = options.cookies.sessionToken.name;
            const payload = await jwt.decode({
                ...jwt,
                token: sessionToken,
                salt
            });
            if (!payload) throw new Error("Invalid JWT");
            // @ts-expect-error
            const token = await callbacks.jwt({
                token: payload,
                ...isUpdate && {
                    trigger: "update"
                },
                session: newSession
            });
            const newExpires = fromDate(sessionMaxAge);
            if (token !== null) {
                // By default, only exposes a limited subset of information to the client
                // as needed for presentation purposes (e.g. "you are logged in as...").
                const session = {
                    user: {
                        name: token.name,
                        email: token.email,
                        image: token.picture
                    },
                    expires: newExpires.toISOString()
                };
                // @ts-expect-error
                const newSession = await callbacks.session({
                    session,
                    token
                });
                // Return session payload as response
                response.body = newSession;
                // Refresh JWT expiry by re-signing it, with an updated expiry date
                const newToken = await jwt.encode({
                    ...jwt,
                    token,
                    salt
                });
                // Set cookie, to also update expiry date on cookie
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: newExpires
                });
                response.cookies?.push(...sessionCookies);
                await events.session?.({
                    session: newSession,
                    token
                });
            } else {
                response.cookies?.push(...sessionStore.clean());
            }
        } catch (e) {
            logger.error(new JWTSessionError(e));
            // If the JWT is not verifiable remove the broken session cookie(s).
            response.cookies?.push(...sessionStore.clean());
        }
        return response;
    }
    // Retrieve session from database
    try {
        const { getSessionAndUser, deleteSession, updateSession } = adapter;
        let userAndSession = await getSessionAndUser(sessionToken);
        // If session has expired, clean up the database
        if (userAndSession && userAndSession.session.expires.valueOf() < Date.now()) {
            await deleteSession(sessionToken);
            userAndSession = null;
        }
        if (userAndSession) {
            const { user, session } = userAndSession;
            const sessionUpdateAge = options.session.updateAge;
            // Calculate last updated date to throttle write updates to database
            // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
            //     e.g. ({expiry date} - 30 days) + 1 hour
            const sessionIsDueToBeUpdatedDate = session.expires.valueOf() - sessionMaxAge * 1000 + sessionUpdateAge * 1000;
            const newExpires = fromDate(sessionMaxAge);
            // Trigger update of session expiry date and write to database, only
            // if the session was last updated more than {sessionUpdateAge} ago
            if (sessionIsDueToBeUpdatedDate <= Date.now()) {
                await updateSession({
                    sessionToken: sessionToken,
                    expires: newExpires
                });
            }
            // Pass Session through to the session callback
            const sessionPayload = await callbacks.session({
                // TODO: user already passed below,
                // remove from session object in https://github.com/nextauthjs/next-auth/pull/9702
                // @ts-expect-error
                session: {
                    ...session,
                    user
                },
                user,
                newSession,
                ...isUpdate ? {
                    trigger: "update"
                } : {}
            });
            // Return session payload as response
            response.body = sessionPayload;
            // Set cookie again to update expiry
            response.cookies?.push({
                name: options.cookies.sessionToken.name,
                value: sessionToken,
                options: {
                    ...options.cookies.sessionToken.options,
                    expires: newExpires
                }
            });
            // @ts-expect-error
            await events.session?.({
                session: sessionPayload
            });
        } else if (sessionToken) {
            // If `sessionToken` was found set but it's not valid for a session then
            // remove the sessionToken cookie from browser.
            response.cookies?.push(...sessionStore.clean());
        }
    } catch (e) {
        logger.error(new SessionTokenError(e));
    }
    return response;
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/signin/authorization-url.js



/**
 * Generates an authorization/request token URL.
 *
 * [OAuth 2](https://www.oauth.com/oauth2-servers/authorization/the-authorization-request/)
 */ async function getAuthorizationUrl(query, options) {
    const { logger, provider } = options;
    let url = provider.authorization?.url;
    let as;
    // Falls back to authjs.dev if the user only passed params
    if (!url || url.host === "authjs.dev") {
        // If url is undefined, we assume that issuer is always defined
        // We check this in assert.ts
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await discoveryRequest(issuer, {
            [build_customFetch]: provider[customFetch],
            // TODO: move away from allowing insecure HTTP requests
            [allowInsecureRequests]: true
        });
        const as = await processDiscoveryResponse(issuer, discoveryResponse).catch((error)=>{
            if (!(error instanceof TypeError) || error.message !== "Invalid URL") throw error;
            throw new TypeError(`Discovery request responded with an invalid issuer. expected: ${issuer}`);
        });
        if (!as.authorization_endpoint) {
            throw new TypeError("Authorization server did not provide an authorization endpoint.");
        }
        url = new URL(as.authorization_endpoint);
    }
    const authParams = url.searchParams;
    let redirect_uri = provider.callbackUrl;
    let data;
    if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
        redirect_uri = provider.redirectProxyUrl;
        data = provider.callbackUrl;
        logger.debug("using redirect proxy", {
            redirect_uri,
            data
        });
    }
    const params = Object.assign({
        response_type: "code",
        // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
        client_id: provider.clientId,
        redirect_uri,
        // @ts-expect-error TODO:
        ...provider.authorization?.params
    }, Object.fromEntries(provider.authorization?.url.searchParams ?? []), query);
    for(const k in params)authParams.set(k, params[k]);
    const cookies = [];
    if (// Otherwise "POST /redirect_uri" wouldn't include the cookies
    provider.authorization?.url.searchParams.get("response_mode") === "form_post") {
        options.cookies.state.options.sameSite = "none";
        options.cookies.state.options.secure = true;
        options.cookies.nonce.options.sameSite = "none";
        options.cookies.nonce.options.secure = true;
    }
    const state = await checks_state.create(options, data);
    if (state) {
        authParams.set("state", state.value);
        cookies.push(state.cookie);
    }
    if (provider.checks?.includes("pkce")) {
        if (as && !as.code_challenge_methods_supported?.includes("S256")) {
            // We assume S256 PKCE support, if the server does not advertise that,
            // a random `nonce` must be used for CSRF protection.
            if (provider.type === "oidc") provider.checks = [
                "nonce"
            ];
        } else {
            const { value, cookie } = await pkce.create(options);
            authParams.set("code_challenge", value);
            authParams.set("code_challenge_method", "S256");
            cookies.push(cookie);
        }
    }
    const nonce = await checks_nonce.create(options);
    if (nonce) {
        authParams.set("nonce", nonce.value);
        cookies.push(nonce.cookie);
    }
    // TODO: This does not work in normalizeOAuth because authorization endpoint can come from discovery
    // Need to make normalizeOAuth async
    if (provider.type === "oidc" && !url.searchParams.has("scope")) {
        url.searchParams.set("scope", "openid profile email");
    }
    logger.debug("authorization url is ready", {
        url,
        cookies,
        provider
    });
    return {
        redirect: url.toString(),
        cookies
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/signin/send-token.js


/**
 * Starts an e-mail login flow, by generating a token,
 * and sending it to the user's e-mail (with the help of a DB adapter).
 * At the end, it returns a redirect to the `verify-request` page.
 */ async function sendToken(request, options) {
    const { body } = request;
    const { provider, callbacks, adapter } = options;
    const normalizer = provider.normalizeIdentifier ?? defaultNormalizer;
    const email = normalizer(body?.email);
    const defaultUser = {
        id: crypto.randomUUID(),
        email,
        emailVerified: null
    };
    const user = await adapter.getUserByEmail(email) ?? defaultUser;
    const account = {
        providerAccountId: email,
        userId: user.id,
        type: "email",
        provider: provider.id
    };
    let authorized;
    try {
        authorized = await callbacks.signIn({
            user,
            account,
            email: {
                verificationRequest: true
            }
        });
    } catch (e) {
        throw new AccessDenied(e);
    }
    if (!authorized) throw new AccessDenied("AccessDenied");
    if (typeof authorized === "string") {
        return {
            redirect: await callbacks.redirect({
                url: authorized,
                baseUrl: options.url.origin
            })
        };
    }
    const { callbackUrl, theme } = options;
    const token = await provider.generateVerificationToken?.() ?? randomString(32);
    const ONE_DAY_IN_SECONDS = 86400;
    const expires = new Date(Date.now() + (provider.maxAge ?? ONE_DAY_IN_SECONDS) * 1000);
    const secret = provider.secret ?? options.secret;
    const baseUrl = new URL(options.basePath, options.url.origin);
    const sendRequest = provider.sendVerificationRequest({
        identifier: email,
        token,
        expires,
        url: `${baseUrl}/callback/${provider.id}?${new URLSearchParams({
            callbackUrl,
            token,
            email
        })}`,
        provider,
        theme,
        request: toRequest(request)
    });
    const createToken = adapter.createVerificationToken?.({
        identifier: email,
        token: await createHash(`${token}${secret}`),
        expires
    });
    await Promise.all([
        sendRequest,
        createToken
    ]);
    return {
        redirect: `${baseUrl}/verify-request?${new URLSearchParams({
            provider: provider.id,
            type: provider.type
        })}`
    };
}
function defaultNormalizer(email) {
    if (!email) throw new Error("Missing email from request body.");
    // Get the first two elements only,
    // separated by `@` from user input.
    let [local, domain] = email.toLowerCase().trim().split("@");
    // The part before "@" can contain a ","
    // but we remove it on the domain part
    domain = domain.split(",")[0];
    return `${local}@${domain}`;
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/signin/index.js


async function signIn(request, cookies, options) {
    const signInUrl = `${options.url.origin}${options.basePath}/signin`;
    if (!options.provider) return {
        redirect: signInUrl,
        cookies
    };
    switch(options.provider.type){
        case "oauth":
        case "oidc":
            {
                const { redirect, cookies: authCookies } = await getAuthorizationUrl(request.query, options);
                if (authCookies) cookies.push(...authCookies);
                return {
                    redirect,
                    cookies
                };
            }
        case "email":
            {
                const response = await sendToken(request, options);
                return {
                    ...response,
                    cookies
                };
            }
        default:
            return {
                redirect: signInUrl,
                cookies
            };
    }
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/signout.js

/**
 * Destroys the session.
 * If the session strategy is database,
 * The session is also deleted from the database.
 * In any case, the session cookie is cleared and
 * {@link AuthConfig["events"].signOut} is emitted.
 */ async function signOut(cookies, sessionStore, options) {
    const { jwt, events, callbackUrl: redirect, logger, session } = options;
    const sessionToken = sessionStore.value;
    if (!sessionToken) return {
        redirect,
        cookies
    };
    try {
        if (session.strategy === "jwt") {
            const salt = options.cookies.sessionToken.name;
            const token = await jwt.decode({
                ...jwt,
                token: sessionToken,
                salt
            });
            await events.signOut?.({
                token
            });
        } else {
            const session = await options.adapter?.deleteSession(sessionToken);
            await events.signOut?.({
                session
            });
        }
    } catch (e) {
        logger.error(new SignOutError(e));
    }
    cookies.push(...sessionStore.clean());
    return {
        redirect,
        cookies
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/session.js
/**
 * Returns the currently logged in user, if any.
 */ async function getLoggedInUser(options, sessionStore) {
    const { adapter, jwt, session: { strategy: sessionStrategy } } = options;
    const sessionToken = sessionStore.value;
    if (!sessionToken) return null;
    // Try to decode JWT
    if (sessionStrategy === "jwt") {
        const salt = options.cookies.sessionToken.name;
        const payload = await jwt.decode({
            ...jwt,
            token: sessionToken,
            salt
        });
        if (payload && payload.sub) {
            return {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                image: payload.picture
            };
        }
    } else {
        const userAndSession = await adapter?.getSessionAndUser(sessionToken);
        if (userAndSession) {
            return userAndSession.user;
        }
    }
    return null;
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/webauthn-options.js


/**
 * Returns authentication or registration options for a WebAuthn flow
 * depending on the parameters provided.
 */ async function webAuthnOptions(request, options, sessionStore, cookies) {
    // Return an error if the adapter is missing or if the provider
    // is not a webauthn provider.
    const narrowOptions = assertInternalOptionsWebAuthn(options);
    const { provider } = narrowOptions;
    // Extract the action from the query parameters
    const { action } = request.query ?? {};
    // Action must be either "register", "authenticate", or undefined
    if (action !== "register" && action !== "authenticate" && typeof action !== "undefined") {
        return {
            status: 400,
            body: {
                error: "Invalid action"
            },
            cookies,
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
    // Get the user info from the session
    const sessionUser = await getLoggedInUser(options, sessionStore);
    // Extract user info from request
    // If session user exists, we don't need to call getUserInfo
    const getUserInfoResponse = sessionUser ? {
        user: sessionUser,
        exists: true
    } : await provider.getUserInfo(options, request);
    const userInfo = getUserInfoResponse?.user;
    // Make a decision on what kind of webauthn options to return
    const decision = inferWebAuthnOptions(action, !!sessionUser, getUserInfoResponse);
    switch(decision){
        case "authenticate":
            return getAuthenticationResponse(narrowOptions, request, userInfo, cookies);
        case "register":
            if (typeof userInfo?.email === "string") {
                return getRegistrationResponse(narrowOptions, request, userInfo, cookies);
            }
            break;
        default:
            return {
                status: 400,
                body: {
                    error: "Invalid request"
                },
                cookies,
                headers: {
                    "Content-Type": "application/json"
                }
            };
    }
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/actions/index.js






;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/index.js








/** @internal */ async function AuthInternal(request, authOptions) {
    const { action, providerId, error, method } = request;
    const csrfDisabled = authOptions.skipCSRFCheck === skipCSRFCheck;
    const { options, cookies } = await init({
        authOptions,
        action,
        providerId,
        url: request.url,
        callbackUrl: request.body?.callbackUrl ?? request.query?.callbackUrl,
        csrfToken: request.body?.csrfToken,
        cookies: request.cookies,
        isPost: method === "POST",
        csrfDisabled
    });
    const sessionStore = new cookie_SessionStore(options.cookies.sessionToken, request.cookies, options.logger);
    if (method === "GET") {
        const render = renderPage({
            ...options,
            query: request.query,
            cookies
        });
        switch(action){
            case "callback":
                return await callback(request, options, sessionStore, cookies);
            case "csrf":
                return render.csrf(csrfDisabled, options, cookies);
            case "error":
                return render.error(error);
            case "providers":
                return render.providers(options.providers);
            case "session":
                return await session(options, sessionStore, cookies);
            case "signin":
                return render.signin(providerId, error);
            case "signout":
                return render.signout();
            case "verify-request":
                return render.verifyRequest();
            case "webauthn-options":
                return await webAuthnOptions(request, options, sessionStore, cookies);
            default:
        }
    } else {
        const { csrfTokenVerified } = options;
        switch(action){
            case "callback":
                if (options.provider.type === "credentials") // Verified CSRF Token required for credentials providers only
                validateCSRF(action, csrfTokenVerified);
                return await callback(request, options, sessionStore, cookies);
            case "session":
                validateCSRF(action, csrfTokenVerified);
                return await session(options, sessionStore, cookies, true, request.body?.data);
            case "signin":
                validateCSRF(action, csrfTokenVerified);
                return await signIn(request, cookies, options);
            case "signout":
                validateCSRF(action, csrfTokenVerified);
                return await signOut(cookies, sessionStore, options);
            default:
        }
    }
    throw new UnknownAction(`Cannot handle action: ${action}`);
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/lib/utils/env.js

/**
 *  Set default env variables on the config object
 * @param suppressWarnings intended for framework authors.
 */ function setEnvDefaults(envObject, config, suppressBasePathWarning = false) {
    try {
        const url = envObject.AUTH_URL;
        if (url) {
            if (config.basePath) {
                if (!suppressBasePathWarning) {
                    const logger = setLogger(config);
                    logger.warn("env-url-basepath-redundant");
                }
            } else {
                config.basePath = new URL(url).pathname;
            }
        }
    } catch  {
    // Catching and swallowing potential URL parsing errors, we'll fall
    // back to `/auth` below.
    } finally{
        config.basePath ?? (config.basePath = `/auth`);
    }
    if (!config.secret?.length) {
        config.secret = [];
        const secret = envObject.AUTH_SECRET;
        if (secret) config.secret.push(secret);
        for (const i of [
            1,
            2,
            3
        ]){
            const secret = envObject[`AUTH_SECRET_${i}`];
            if (secret) config.secret.unshift(secret);
        }
    }
    config.redirectProxyUrl ?? (config.redirectProxyUrl = envObject.AUTH_REDIRECT_PROXY_URL);
    config.trustHost ?? (config.trustHost = !!(envObject.AUTH_URL ?? envObject.AUTH_TRUST_HOST ?? envObject.VERCEL ?? envObject.CF_PAGES ?? envObject.NODE_ENV !== "production"));
    config.providers = config.providers.map((provider)=>{
        const { id } = typeof provider === "function" ? provider({}) : provider;
        const ID = id.toUpperCase().replace(/-/g, "_");
        const clientId = envObject[`AUTH_${ID}_ID`];
        const clientSecret = envObject[`AUTH_${ID}_SECRET`];
        const issuer = envObject[`AUTH_${ID}_ISSUER`];
        const apiKey = envObject[`AUTH_${ID}_KEY`];
        const finalProvider = typeof provider === "function" ? provider({
            clientId,
            clientSecret,
            issuer,
            apiKey
        }) : provider;
        if (finalProvider.type === "oauth" || finalProvider.type === "oidc") {
            finalProvider.clientId ?? (finalProvider.clientId = clientId);
            finalProvider.clientSecret ?? (finalProvider.clientSecret = clientSecret);
            finalProvider.issuer ?? (finalProvider.issuer = issuer);
        } else if (finalProvider.type === "email") {
            finalProvider.apiKey ?? (finalProvider.apiKey = apiKey);
        }
        return finalProvider;
    });
}
function createActionURL(action, protocol, headers, envObject, config) {
    const basePath = config?.basePath;
    const envUrl = envObject.AUTH_URL ?? envObject.NEXTAUTH_URL;
    let url;
    if (envUrl) {
        url = new URL(envUrl);
        if (basePath && basePath !== "/" && url.pathname !== "/") {
            if (url.pathname !== basePath) {
                const logger = setLogger(config);
                logger.warn("env-url-basepath-mismatch");
            }
            url.pathname = "/";
        }
    } else {
        const detectedHost = headers.get("x-forwarded-host") ?? headers.get("host");
        const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol ?? "https";
        const _protocol = detectedProtocol.endsWith(":") ? detectedProtocol : detectedProtocol + ":";
        url = new URL(`${_protocol}//${detectedHost}`);
    }
    // remove trailing slash
    const sanitizedUrl = url.toString().replace(/\/$/, "");
    if (basePath) {
        // remove leading and trailing slash
        const sanitizedBasePath = basePath?.replace(/(^\/|\/$)/g, "") ?? "";
        return new URL(`${sanitizedUrl}/${sanitizedBasePath}/${action}`);
    }
    return new URL(`${sanitizedUrl}/${action}`);
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/index.js
/**
 *
 * :::warning Experimental
 * `@auth/core` is under active development.
 * :::
 *
 * This is the main entry point to the Auth.js library.
 *
 * Based on the {@link https://developer.mozilla.org/en-US/docs/Web/API/Request Request}
 * and {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response} Web standard APIs.
 * Primarily used to implement [framework](https://authjs.dev/getting-started/integrations)-specific packages,
 * but it can also be used directly.
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/core
 * ```
 *
 * ## Usage
 *
 * ```ts
 * import { Auth } from "@auth/core"
 *
 * const request = new Request("https://example.com")
 * const response = await Auth(request, {...})
 *
 * console.log(response instanceof Response) // true
 * ```
 *
 * ## Resources
 *
 * - [Getting started](https://authjs.dev/getting-started)
 * - [Guides](https://authjs.dev/guides)
 *
 * @module @auth/core
 */ 









/**
 * Core functionality provided by Auth.js.
 *
 * Receives a standard {@link Request} and returns a {@link Response}.
 *
 * @example
 * ```ts
 * import { Auth } from "@auth/core"
 *
 * const request = new Request("https://example.com")
 * const response = await Auth(request, {
 *   providers: [Google],
 *   secret: "...",
 *   trustHost: true,
 * })
 *```
 * @see [Documentation](https://authjs.dev)
 */ async function Auth(request, config) {
    const logger = setLogger(config);
    const internalRequest = await toInternalRequest(request, config);
    // There was an error parsing the request
    if (!internalRequest) return Response.json(`Bad request.`, {
        status: 400
    });
    const warningsOrError = assertConfig(internalRequest, config);
    if (Array.isArray(warningsOrError)) {
        warningsOrError.forEach(logger.warn);
    } else if (warningsOrError) {
        // If there's an error in the user config, bail out early
        logger.error(warningsOrError);
        const htmlPages = new Set([
            "signin",
            "signout",
            "error",
            "verify-request"
        ]);
        if (!htmlPages.has(internalRequest.action) || internalRequest.method !== "GET") {
            const message = "There was a problem with the server configuration. Check the server logs for more information.";
            return Response.json({
                message
            }, {
                status: 500
            });
        }
        const { pages, theme } = config;
        // If this is true, the config required auth on the error page
        // which could cause a redirect loop
        const authOnErrorPage = pages?.error && internalRequest.url.searchParams.get("callbackUrl")?.startsWith(pages.error);
        // Either there was no error page configured or the configured one contains infinite redirects
        if (!pages?.error || authOnErrorPage) {
            if (authOnErrorPage) {
                logger.error(new ErrorPageLoop(`The error page ${pages?.error} should not require authentication`));
            }
            const page = renderPage({
                theme
            }).error("Configuration");
            return toResponse(page);
        }
        const url = `${internalRequest.url.origin}${pages.error}?error=Configuration`;
        return Response.redirect(url);
    }
    const isRedirect = request.headers?.has("X-Auth-Return-Redirect");
    const isRaw = config.raw === raw;
    try {
        const internalResponse = await AuthInternal(internalRequest, config);
        if (isRaw) return internalResponse;
        const response = toResponse(internalResponse);
        const url = response.headers.get("Location");
        if (!isRedirect || !url) return response;
        return Response.json({
            url
        }, {
            headers: response.headers
        });
    } catch (e) {
        const error = e;
        logger.error(error);
        const isAuthError = error instanceof AuthError;
        if (isAuthError && isRaw && !isRedirect) throw error;
        // If the CSRF check failed for POST/session, return a 400 status code.
        // We should not redirect to a page as this is an API route
        if (request.method === "POST" && internalRequest.action === "session") return Response.json(null, {
            status: 400
        });
        const isClientSafeErrorType = isClientError(error);
        const type = isClientSafeErrorType ? error.type : "Configuration";
        const params = new URLSearchParams({
            error: type
        });
        if (error instanceof CredentialsSignin) params.set("code", error.code);
        const pageKind = isAuthError && error.kind || "error";
        const pagePath = config.pages?.[pageKind] ?? `${config.basePath}/${pageKind.toLowerCase()}`;
        const url = `${internalRequest.url.origin}${pagePath}?${params}`;
        if (isRedirect) return Response.json({
            url
        });
        return Response.redirect(url);
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/exports/next-request.js
// This file is for modularized imports for next/server to get fully-treeshaking.
 //# sourceMappingURL=next-request.js.map

;// CONCATENATED MODULE: ./node_modules/next-auth/lib/env.js
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field


/** If `NEXTAUTH_URL` or `AUTH_URL` is defined, override the request's URL. */ function reqWithEnvURL(req) {
    const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
    if (!url) return req;
    const { origin: envOrigin } = new URL(url);
    const { href, origin } = req.nextUrl;
    return new NextRequest(href.replace(origin, envOrigin), req);
}
/**
 * For backwards compatibility, `next-auth` checks for `NEXTAUTH_URL`
 * and the `basePath` by default is `/api/auth` instead of `/auth`
 * (which is the default for all other Auth.js integrations).
 *
 * For the same reason, `NEXTAUTH_SECRET` is also checked.
 */ function env_setEnvDefaults(config) {
    try {
        config.secret ?? (config.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
        const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!url) return;
        const { pathname } = new URL(url);
        if (pathname === "/") return;
        config.basePath || (config.basePath = pathname);
    } catch  {
    // Catching and swallowing potential URL parsing errors, we'll fall
    // back to `/api/auth` below.
    } finally{
        config.basePath || (config.basePath = "/api/auth");
        setEnvDefaults(process.env, config, true);
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/action-async-storage.external.js

const action_async_storage_external_actionAsyncStorage = (0,async_local_storage/* createAsyncLocalStorage */.P)(); //# sourceMappingURL=action-async-storage.external.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/hooks-server-context.js
const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
class DynamicServerError extends Error {
    constructor(description){
        super("Dynamic server usage: " + description);
        this.description = description;
        this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== "object" || err === null || !("digest" in err) || typeof err.digest !== "string") {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
} //# sourceMappingURL=hooks-server-context.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js
var static_generation_async_storage_external = __webpack_require__(285);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/static-generation-bailout.js


const NEXT_STATIC_GEN_BAILOUT = "NEXT_STATIC_GEN_BAILOUT";
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args);
        this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== "object" || error === null || !("code" in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
}
function formatErrorMessage(reason, opts) {
    const { dynamic, link } = opts || {};
    const suffix = link ? " See more info here: " + link : "";
    return "Page" + (dynamic ? ' with `dynamic = "' + dynamic + '"`' : "") + " couldn't be rendered statically because it used `" + reason + "`." + suffix;
}
const static_generation_bailout_staticGenerationBailout = (reason, param)=>{
    let { dynamic, link } = param === void 0 ? {} : param;
    const staticGenerationStore = static_generation_async_storage_external/* staticGenerationAsyncStorage */.A.getStore();
    if (!staticGenerationStore) return false;
    if (staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore.dynamicShouldError) {
        throw new StaticGenBailoutError(formatErrorMessage(reason, {
            link,
            dynamic: dynamic != null ? dynamic : "error"
        }));
    }
    const message = formatErrorMessage(reason, {
        dynamic,
        // this error should be caught by Next to bail out of static generation
        // in case it's uncaught, this link provides some additional context as to why
        link: "https://nextjs.org/docs/messages/dynamic-server-error"
    });
    // If postpone is available, we should postpone the render.
    staticGenerationStore.postpone == null ? void 0 : staticGenerationStore.postpone.call(staticGenerationStore, reason);
    // As this is a bailout, we don't want to revalidate, so set the revalidate
    // to 0.
    staticGenerationStore.revalidate = 0;
    if (staticGenerationStore.isStaticGeneration) {
        const err = new DynamicServerError(message);
        staticGenerationStore.dynamicUsageDescription = reason;
        staticGenerationStore.dynamicUsageStack = err.stack;
        throw err;
    }
    return false;
}; //# sourceMappingURL=static-generation-bailout.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/draft-mode.js

class draft_mode_DraftMode {
    get isEnabled() {
        return this._provider.isEnabled;
    }
    enable() {
        if (staticGenerationBailout("draftMode().enable()")) {
            return;
        }
        return this._provider.enable();
    }
    disable() {
        if (staticGenerationBailout("draftMode().disable()")) {
            return;
        }
        return this._provider.disable();
    }
    constructor(provider){
        this._provider = provider;
    }
} //# sourceMappingURL=draft-mode.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/headers.js







function headers_headers() {
    if (static_generation_bailout_staticGenerationBailout("headers", {
        link: "https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering"
    })) {
        return HeadersAdapter.seal(new Headers({}));
    }
    const requestStore = request_async_storage_external_requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error("Invariant: headers() expects to have requestAsyncStorage, none available.");
    }
    return requestStore.headers;
}
function cookies() {
    if (static_generation_bailout_staticGenerationBailout("cookies", {
        link: "https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering"
    })) {
        return RequestCookiesAdapter.seal(new _edge_runtime_cookies.RequestCookies(new Headers({})));
    }
    const requestStore = request_async_storage_external_requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error("Invariant: cookies() expects to have requestAsyncStorage, none available.");
    }
    const asyncActionStore = action_async_storage_external_actionAsyncStorage.getStore();
    if (asyncActionStore && (asyncActionStore.isAction || asyncActionStore.isAppRoute)) {
        // We can't conditionally return different types here based on the context.
        // To avoid confusion, we always return the readonly type here.
        return requestStore.mutableCookies;
    }
    return requestStore.cookies;
}
function draftMode() {
    const requestStore = requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error("Invariant: draftMode() expects to have requestAsyncStorage, none available.");
    }
    return new DraftMode(requestStore.draftMode);
} //# sourceMappingURL=headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/api/headers.js
 //# sourceMappingURL=headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/exports/next-response.js
// This file is for modularized imports for next/server to get fully-treeshaking.
 //# sourceMappingURL=next-response.js.map

;// CONCATENATED MODULE: ./node_modules/next-auth/lib/index.js

// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field

// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field


async function getSession(headers, config) {
    const url = createActionURL("session", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const request = new Request(url, {
        headers: {
            cookie: headers.get("cookie") ?? ""
        }
    });
    return Auth(request, {
        ...config,
        callbacks: {
            ...config.callbacks,
            // Since we are server-side, we don't need to filter out the session data
            // See https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side
            // TODO: Taint the session data to prevent accidental leakage to the client
            // https://react.dev/reference/react/experimental_taintObjectReference
            async session (...args) {
                const session = // If the user defined a custom session callback, use that instead
                await config.callbacks?.session?.(...args) ?? {
                    ...args[0].session,
                    expires: args[0].session.expires?.toISOString?.() ?? args[0].session.expires
                };
                const user = args[0].user ?? args[0].token;
                return {
                    user,
                    ...session
                };
            }
        }
    });
}
function isReqWrapper(arg) {
    return typeof arg === "function";
}
function initAuth(config, onLazyLoad // To set the default env vars
) {
    if (typeof config === "function") {
        return async (...args)=>{
            if (!args.length) {
                // React Server Components
                const _headers = await headers_headers();
                const _config = await config(undefined); // Review: Should we pass headers() here instead?
                onLazyLoad?.(_config);
                return getSession(_headers, _config).then((r)=>r.json());
            }
            if (args[0] instanceof Request) {
                // middleware.ts inline
                // export { auth as default } from "auth"
                const req = args[0];
                const ev = args[1];
                const _config = await config(req);
                onLazyLoad?.(_config);
                // args[0] is supposed to be NextRequest but the instanceof check is failing.
                return handleAuth([
                    req,
                    ev
                ], _config);
            }
            if (isReqWrapper(args[0])) {
                // middleware.ts wrapper/route.ts
                // import { auth } from "auth"
                // export default auth((req) => { console.log(req.auth) }})
                const userMiddlewareOrRoute = args[0];
                return async (...args)=>{
                    const _config = await config(args[0]);
                    onLazyLoad?.(_config);
                    return handleAuth(args, _config, userMiddlewareOrRoute);
                };
            }
            // API Routes, getServerSideProps
            const request = "req" in args[0] ? args[0].req : args[0];
            const response = "res" in args[0] ? args[0].res : args[1];
            const _config = await config(request);
            onLazyLoad?.(_config);
            // @ts-expect-error -- request is NextRequest
            return getSession(new Headers(request.headers), _config).then(async (authResponse)=>{
                const auth = await authResponse.json();
                for (const cookie of authResponse.headers.getSetCookie())if ("headers" in response) response.headers.append("set-cookie", cookie);
                else response.appendHeader("set-cookie", cookie);
                return auth;
            });
        };
    }
    return (...args)=>{
        if (!args.length) {
            // React Server Components
            return Promise.resolve(headers_headers()).then((h)=>getSession(h, config).then((r)=>r.json()));
        }
        if (args[0] instanceof Request) {
            // middleware.ts inline
            // export { auth as default } from "auth"
            const req = args[0];
            const ev = args[1];
            return handleAuth([
                req,
                ev
            ], config);
        }
        if (isReqWrapper(args[0])) {
            // middleware.ts wrapper/route.ts
            // import { auth } from "auth"
            // export default auth((req) => { console.log(req.auth) }})
            const userMiddlewareOrRoute = args[0];
            return async (...args)=>{
                return handleAuth(args, config, userMiddlewareOrRoute).then((res)=>{
                    return res;
                });
            };
        }
        // API Routes, getServerSideProps
        const request = "req" in args[0] ? args[0].req : args[0];
        const response = "res" in args[0] ? args[0].res : args[1];
        return getSession(// @ts-expect-error
        new Headers(request.headers), config).then(async (authResponse)=>{
            const auth = await authResponse.json();
            for (const cookie of authResponse.headers.getSetCookie())if ("headers" in response) response.headers.append("set-cookie", cookie);
            else response.appendHeader("set-cookie", cookie);
            return auth;
        });
    };
}
async function handleAuth(args, config, userMiddlewareOrRoute) {
    const request = reqWithEnvURL(args[0]);
    const sessionResponse = await getSession(request.headers, config);
    const auth = await sessionResponse.json();
    let authorized = true;
    if (config.callbacks?.authorized) {
        authorized = await config.callbacks.authorized({
            request,
            auth
        });
    }
    let response = NextResponse.next?.();
    if (authorized instanceof Response) {
        // User returned a custom response, like redirecting to a page or 401, respect it
        response = authorized;
        const redirect = authorized.headers.get("Location");
        const { pathname } = request.nextUrl;
        // If the user is redirecting to the same NextAuth.js action path as the current request,
        // don't allow the redirect to prevent an infinite loop
        if (redirect && isSameAuthAction(pathname, new URL(redirect).pathname, config)) {
            authorized = true;
        }
    } else if (userMiddlewareOrRoute) {
        // Execute user's middleware/handler with the augmented request
        const augmentedReq = request;
        augmentedReq.auth = auth;
        response = await userMiddlewareOrRoute(augmentedReq, args[1]) ?? NextResponse.next();
    } else if (!authorized) {
        const signInPage = config.pages?.signIn ?? `${config.basePath}/signin`;
        if (request.nextUrl.pathname !== signInPage) {
            // Redirect to signin page by default if not authorized
            const signInUrl = request.nextUrl.clone();
            signInUrl.pathname = signInPage;
            signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
            response = NextResponse.redirect(signInUrl);
        }
    }
    const finalResponse = new Response(response?.body, response);
    // Preserve cookies from the session response
    for (const cookie of sessionResponse.headers.getSetCookie())finalResponse.headers.append("set-cookie", cookie);
    return finalResponse;
}
function isSameAuthAction(requestPath, redirectPath, config) {
    const action = redirectPath.replace(`${requestPath}/`, "");
    const pages = Object.values(config.pages ?? {});
    return (lib_actions.has(action) || pages.includes(redirectPath)) && redirectPath === requestPath;
}
const lib_actions = new Set([
    "providers",
    "session",
    "csrf",
    "signin",
    "signout",
    "callback",
    "verify-request",
    "error"
]);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(211);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/app-router-context.shared-runtime.js
"use client";

const app_router_context_shared_runtime_AppRouterContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(null)));
const app_router_context_shared_runtime_LayoutRouterContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(null)));
const app_router_context_shared_runtime_GlobalLayoutRouterContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(null)));
const TemplateContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(null)));
if (false) {}
const MissingSlotContext = /*#__PURE__*/ react.createContext(new Set()); //# sourceMappingURL=app-router-context.shared-runtime.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/hooks-client-context.shared-runtime.js
"use client";

const hooks_client_context_shared_runtime_SearchParamsContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (createContext(null)));
const hooks_client_context_shared_runtime_PathnameContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (createContext(null)));
const hooks_client_context_shared_runtime_PathParamsContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (createContext(null)));
if (false) {} //# sourceMappingURL=hooks-client-context.shared-runtime.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/client-hook-in-server-component-error.js

function client_hook_in_server_component_error_clientHookInServerComponentError(hookName) {
    if (false) {}
} //# sourceMappingURL=client-hook-in-server-component-error.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/server-inserted-html.shared-runtime.js
"use client";

// Use `React.createContext` to avoid errors from the RSC checks because
// it can't be imported directly in Server Components:
//
//   import { createContext } from 'react'
//
// More info: https://github.com/vercel/next.js/pull/40686
const ServerInsertedHTMLContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(null)));
function useServerInsertedHTML(callback) {
    const addInsertedServerHTMLCallback = useContext(ServerInsertedHTMLContext);
    // Should have no effects on client where there's no flush effects provider
    if (addInsertedServerHTMLCallback) {
        addInsertedServerHTMLCallback(callback);
    }
} //# sourceMappingURL=server-inserted-html.shared-runtime.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/redirect-status-code.js
var redirect_status_code_RedirectStatusCode;
(function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
})(redirect_status_code_RedirectStatusCode || (redirect_status_code_RedirectStatusCode = {})); //# sourceMappingURL=redirect-status-code.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/redirect.js



const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
var RedirectType;
(function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
})(RedirectType || (RedirectType = {}));
function getRedirectError(url, type, statusCode) {
    if (statusCode === void 0) statusCode = redirect_status_code_RedirectStatusCode.TemporaryRedirect;
    const error = new Error(REDIRECT_ERROR_CODE);
    error.digest = REDIRECT_ERROR_CODE + ";" + type + ";" + url + ";" + statusCode + ";";
    const requestStore = request_async_storage_external_requestAsyncStorage.getStore();
    if (requestStore) {
        error.mutableCookies = requestStore.mutableCookies;
    }
    return error;
}
/**
 * When used in a streaming context, this will insert a meta tag to
 * redirect the user to the target page. When used in a custom app route, it
 * will serve a 307/303 to the caller.
 *
 * @param url the url to redirect to
 */ function redirect_redirect(url, type) {
    if (type === void 0) type = "replace";
    const actionStore = action_async_storage_external_actionAsyncStorage.getStore();
    throw getRedirectError(url, type, // as we don't want the POST request to follow the redirect,
    // as it could result in erroneous re-submissions.
    (actionStore == null ? void 0 : actionStore.isAction) ? redirect_status_code_RedirectStatusCode.SeeOther : redirect_status_code_RedirectStatusCode.TemporaryRedirect);
}
/**
 * When used in a streaming context, this will insert a meta tag to
 * redirect the user to the target page. When used in a custom app route, it
 * will serve a 308/303 to the caller.
 *
 * @param url the url to redirect to
 */ function permanentRedirect(url, type) {
    if (type === void 0) type = "replace";
    const actionStore = actionAsyncStorage.getStore();
    throw getRedirectError(url, type, // as we don't want the POST request to follow the redirect,
    // as it could result in erroneous re-submissions.
    (actionStore == null ? void 0 : actionStore.isAction) ? RedirectStatusCode.SeeOther : RedirectStatusCode.PermanentRedirect);
}
/**
 * Checks an error to determine if it's an error generated by the
 * `redirect(url)` helper.
 *
 * @param error the error that may reference a redirect error
 * @returns true if the error is a redirect error
 */ function isRedirectError(error) {
    if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") {
        return false;
    }
    const [errorCode, type, destination, status] = error.digest.split(";", 4);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string" && !isNaN(statusCode) && statusCode in RedirectStatusCode;
}
function getURLFromRedirectError(error) {
    if (!isRedirectError(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(";", 3)[2];
}
function getRedirectTypeFromError(error) {
    if (!isRedirectError(error)) {
        throw new Error("Not a redirect error");
    }
    return error.digest.split(";", 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!isRedirectError(error)) {
        throw new Error("Not a redirect error");
    }
    return Number(error.digest.split(";", 4)[3]);
} //# sourceMappingURL=redirect.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/navigation.js






const INTERNAL_URLSEARCHPARAMS_INSTANCE = Symbol("internal for urlsearchparams readonly");
function readonlyURLSearchParamsError() {
    return new Error("ReadonlyURLSearchParams cannot be modified");
}
class ReadonlyURLSearchParams {
    [Symbol.iterator]() {
        return this[INTERNAL_URLSEARCHPARAMS_INSTANCE][Symbol.iterator]();
    }
    append() {
        throw readonlyURLSearchParamsError();
    }
    delete() {
        throw readonlyURLSearchParamsError();
    }
    set() {
        throw readonlyURLSearchParamsError();
    }
    sort() {
        throw readonlyURLSearchParamsError();
    }
    constructor(urlSearchParams){
        this[INTERNAL_URLSEARCHPARAMS_INSTANCE] = urlSearchParams;
        this.entries = urlSearchParams.entries.bind(urlSearchParams);
        this.forEach = urlSearchParams.forEach.bind(urlSearchParams);
        this.get = urlSearchParams.get.bind(urlSearchParams);
        this.getAll = urlSearchParams.getAll.bind(urlSearchParams);
        this.has = urlSearchParams.has.bind(urlSearchParams);
        this.keys = urlSearchParams.keys.bind(urlSearchParams);
        this.values = urlSearchParams.values.bind(urlSearchParams);
        this.toString = urlSearchParams.toString.bind(urlSearchParams);
        this.size = urlSearchParams.size;
    }
}
/**
 * Get a read-only URLSearchParams object. For example searchParams.get('foo') would return 'bar' when ?foo=bar
 * Learn more about URLSearchParams here: https://developer.mozilla.org/docs/Web/API/URLSearchParams
 */ function useSearchParams() {
    clientHookInServerComponentError("useSearchParams");
    const searchParams = useContext(SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = useMemo(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    if (true) {
        // AsyncLocalStorage should not be included in the client bundle.
        const { bailoutToClientRendering } = __webpack_require__(686);
        // TODO-APP: handle dynamic = 'force-static' here and on the client
        bailoutToClientRendering("useSearchParams()");
    }
    return readonlySearchParams;
}
/**
 * Get the current pathname. For example usePathname() on /dashboard?foo=bar would return "/dashboard"
 */ function usePathname() {
    clientHookInServerComponentError("usePathname");
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    return useContext(PathnameContext);
}

/**
 * Get the router methods. For example router.push('/dashboard')
 */ function useRouter() {
    clientHookInServerComponentError("useRouter");
    const router = useContext(AppRouterContext);
    if (router === null) {
        throw new Error("invariant expected app router to be mounted");
    }
    return router;
}
// this function performs a depth-first search of the tree to find the selected
// params
function getSelectedParams(tree, params) {
    if (params === void 0) params = {};
    const parallelRoutes = tree[1];
    for (const parallelRoute of Object.values(parallelRoutes)){
        const segment = parallelRoute[0];
        const isDynamicParameter = Array.isArray(segment);
        const segmentValue = isDynamicParameter ? segment[1] : segment;
        if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) continue;
        // Ensure catchAll and optional catchall are turned into an array
        const isCatchAll = isDynamicParameter && (segment[2] === "c" || segment[2] === "oc");
        if (isCatchAll) {
            params[segment[0]] = segment[1].split("/");
        } else if (isDynamicParameter) {
            params[segment[0]] = segment[1];
        }
        params = getSelectedParams(parallelRoute, params);
    }
    return params;
}
/**
 * Get the current parameters. For example useParams() on /dashboard/[team]
 * where pathname is /dashboard/nextjs would return { team: 'nextjs' }
 */ function useParams() {
    clientHookInServerComponentError("useParams");
    const globalLayoutRouter = useContext(GlobalLayoutRouterContext);
    const pathParams = useContext(PathParamsContext);
    return useMemo(()=>{
        // When it's under app router
        if (globalLayoutRouter == null ? void 0 : globalLayoutRouter.tree) {
            return getSelectedParams(globalLayoutRouter.tree);
        }
        // When it's under client side pages router
        return pathParams;
    }, [
        globalLayoutRouter == null ? void 0 : globalLayoutRouter.tree,
        pathParams
    ]);
}
// TODO-APP: handle parallel routes
/**
 * Get the canonical parameters from the current level to the leaf node.
 */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
    if (first === void 0) first = true;
    if (segmentPath === void 0) segmentPath = [];
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        var _parallelRoutes_children;
        node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    const segmentValue = getSegmentValue(segment);
    if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
        return segmentPath;
    }
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
// TODO-APP: Expand description when the docs are written for it.
/**
 * Get the canonical segment path from the current level to the leaf node.
 */ function useSelectedLayoutSegments(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = "children";
    clientHookInServerComponentError("useSelectedLayoutSegments");
    const { tree } = useContext(LayoutRouterContext);
    return getSelectedLayoutSegmentPath(tree, parallelRouteKey);
}
// TODO-APP: Expand description when the docs are written for it.
/**
 * Get the segment below the current level
 */ function useSelectedLayoutSegment(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = "children";
    clientHookInServerComponentError("useSelectedLayoutSegment");
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (selectedLayoutSegments.length === 0) {
        return null;
    }
    return selectedLayoutSegments[0];
}

 //# sourceMappingURL=navigation.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/api/navigation.js
 //# sourceMappingURL=navigation.js.map

;// CONCATENATED MODULE: ./node_modules/next-auth/lib/actions.js

// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field

// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field

async function actions_signIn(provider, options = {}, authorizationParams, config) {
    const headers = new Headers(await headers_headers());
    const { redirect: shouldRedirect = true, redirectTo, ...rest } = options instanceof FormData ? Object.fromEntries(options) : options;
    const callbackUrl = redirectTo?.toString() ?? headers.get("Referer") ?? "/";
    const signInURL = createActionURL("signin", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    if (!provider) {
        signInURL.searchParams.append("callbackUrl", callbackUrl);
        if (shouldRedirect) redirect_redirect(signInURL.toString());
        return signInURL.toString();
    }
    let url = `${signInURL}/${provider}?${new URLSearchParams(authorizationParams)}`;
    let foundProvider = {};
    for (const providerConfig of config.providers){
        const { options, ...defaults } = typeof providerConfig === "function" ? providerConfig() : providerConfig;
        const id = options?.id ?? defaults.id;
        if (id === provider) {
            foundProvider = {
                id,
                type: options?.type ?? defaults.type
            };
            break;
        }
    }
    if (!foundProvider.id) {
        const url = `${signInURL}?${new URLSearchParams({
            callbackUrl
        })}`;
        if (shouldRedirect) redirect_redirect(url);
        return url;
    }
    if (foundProvider.type === "credentials") {
        url = url.replace("signin", "callback");
    }
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams({
        ...rest,
        callbackUrl
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await Auth(req, {
        ...config,
        raw: raw,
        skipCSRFCheck: skipCSRFCheck
    });
    const cookieJar = await cookies();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    const responseUrl = res instanceof Response ? res.headers.get("Location") : res.redirect;
    // NOTE: if for some unexpected reason the responseUrl is not set,
    // we redirect to the original url
    const redirectUrl = responseUrl ?? url;
    if (shouldRedirect) return redirect_redirect(redirectUrl);
    return redirectUrl;
}
async function actions_signOut(options, config) {
    const headers = new Headers(await headers_headers());
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const url = createActionURL("signout", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const callbackUrl = options?.redirectTo ?? headers.get("Referer") ?? "/";
    const body = new URLSearchParams({
        callbackUrl
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await Auth(req, {
        ...config,
        raw: raw,
        skipCSRFCheck: skipCSRFCheck
    });
    const cookieJar = await cookies();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    if (options?.redirect ?? true) return redirect_redirect(res.redirect);
    return res;
}
async function update(data, config) {
    const headers = new Headers(await headers_headers());
    headers.set("Content-Type", "application/json");
    const url = createActionURL("session", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const body = JSON.stringify({
        data
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await Auth(req, {
        ...config,
        raw: raw,
        skipCSRFCheck: skipCSRFCheck
    });
    const cookieJar = await cookies();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    return res.body;
}

;// CONCATENATED MODULE: ./node_modules/next-auth/index.js
/**
 * _If you are looking to migrate from v4, visit the [Upgrade Guide (v5)](https://authjs.dev/getting-started/migrating-to-v5)._
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install next-auth@beta
 * ```
 *
 * ## Environment variable inference
 *
 * `NEXTAUTH_URL` and `NEXTAUTH_SECRET` have been inferred since v4.
 *
 * Since NextAuth.js v5 can also automatically infer environment variables that are prefixed with `AUTH_`.
 *
 * For example `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` will be used as the `clientId` and `clientSecret` options for the GitHub provider.
 *
 * :::tip
 * The environment variable name inferring has the following format for OAuth providers: `AUTH_{PROVIDER}_{ID|SECRET}`.
 *
 * `PROVIDER` is the uppercase snake case version of the provider's id, followed by either `ID` or `SECRET` respectively.
 * :::
 *
 * `AUTH_SECRET` and `AUTH_URL` are also aliased for `NEXTAUTH_SECRET` and `NEXTAUTH_URL` for consistency.
 *
 * To add social login to your app, the configuration becomes:
 *
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "next-auth/providers/github"
 * export const { handlers, auth } = NextAuth({ providers: [ GitHub ] })
 * ```
 *
 * And the `.env.local` file:
 *
 * ```sh title=".env.local"
 * AUTH_GITHUB_ID=...
 * AUTH_GITHUB_SECRET=...
 * AUTH_SECRET=...
 * ```
 *
 * :::tip
 * In production, `AUTH_SECRET` is a required environment variable - if not set, NextAuth.js will throw an error. See [MissingSecretError](https://authjs.dev/reference/core/errors#missingsecret) for more details.
 * :::
 *
 * If you need to override the default values for a provider, you can still call it as a function `GitHub({...})` as before.
 *
 * ## Lazy initialization
 * You can also initialize NextAuth.js lazily (previously known as advanced intialization), which allows you to access the request context in the configuration in some cases, like Route Handlers, Middleware, API Routes or `getServerSideProps`.
 * The above example becomes:
 *
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "next-auth/providers/github"
 * export const { handlers, auth } = NextAuth(req => {
 *  if (req) {
 *   console.log(req) // do something with the request
 *  }
 *  return { providers: [ GitHub ] }
 * })
 * ```
 *
 * :::tip
 * This is useful if you want to customize the configuration based on the request, for example, to add a different provider in staging/dev environments.
 * :::
 *
 * @module next-auth
 */ 





/**
 *  Initialize NextAuth.js.
 *
 *  @example
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "@auth/core/providers/github"
 *
 * export const { handlers, auth } = NextAuth({ providers: [GitHub] })
 * ```
 *
 * Lazy initialization:
 *
 * @example
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "@auth/core/providers/github"
 *
 * export const { handlers, auth } = NextAuth(async (req) => {
 *   console.log(req) // do something with the request
 *   return {
 *     providers: [GitHub],
 *   },
 * })
 * ```
 */ function NextAuth(config) {
    if (typeof config === "function") {
        const httpHandler = async (req)=>{
            const _config = await config(req);
            env_setEnvDefaults(_config);
            return Auth(reqWithEnvURL(req), _config);
        };
        return {
            handlers: {
                GET: httpHandler,
                POST: httpHandler
            },
            // @ts-expect-error
            auth: initAuth(config, (c)=>env_setEnvDefaults(c)),
            signIn: async (provider, options, authorizationParams)=>{
                const _config = await config(undefined);
                env_setEnvDefaults(_config);
                return actions_signIn(provider, options, authorizationParams, _config);
            },
            signOut: async (options)=>{
                const _config = await config(undefined);
                env_setEnvDefaults(_config);
                return actions_signOut(options, _config);
            },
            unstable_update: async (data)=>{
                const _config = await config(undefined);
                env_setEnvDefaults(_config);
                return update(data, _config);
            }
        };
    }
    env_setEnvDefaults(config);
    const httpHandler = (req)=>Auth(reqWithEnvURL(req), config);
    return {
        handlers: {
            GET: httpHandler,
            POST: httpHandler
        },
        // @ts-expect-error
        auth: initAuth(config),
        signIn: (provider, options, authorizationParams)=>{
            return actions_signIn(provider, options, authorizationParams, config);
        },
        signOut: (options)=>{
            return actions_signOut(options, config);
        },
        unstable_update: (data)=>{
            return update(data, config);
        }
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/providers/google.js
/**
 * Add Google login to your page.
 *
 * ### Setup
 *
 * #### Callback URL
 * ```
 * https://example.com/api/auth/callback/google
 * ```
 *
 * #### Configuration
 *```ts
 * import { Auth } from "@auth/core"
 * import Google from "@auth/core/providers/google"
 *
 * const request = new Request(origin)
 * const response = await Auth(request, {
 *   providers: [
 *     Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
 *   ],
 * })
 * ```
 *
 * ### Resources
 *
 *  - [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
 *  - [Google OAuth Configuration](https://console.developers.google.com/apis/credentials)
 *
 * ### Notes
 *
 * By default, Auth.js assumes that the Google provider is
 * based on the [Open ID Connect](https://openid.net/specs/openid-connect-core-1_0.html) specification.
 *
 *
 * The "Authorized redirect URIs" used when creating the credentials must include your full domain and end in the callback path. For example;
 *
 * - For production: `https://{YOUR_DOMAIN}/api/auth/callback/google`
 * - For development: `http://localhost:3000/api/auth/callback/google`
 *
 * :::warning
 * Google only provides Refresh Token to an application the first time a user signs in.
 *
 * To force Google to re-issue a Refresh Token, the user needs to remove the application from their account and sign in again:
 * https://myaccount.google.com/permissions
 *
 * Alternatively, you can also pass options in the `params` object of `authorization` which will force the Refresh Token to always be provided on sign in, however this will ask all users to confirm if they wish to grant your application access every time they sign in.
 *
 * If you need access to the RefreshToken or AccessToken for a Google account and you are not using a database to persist user accounts, this may be something you need to do.
 *
 * ```ts
 * const options = {
 *   providers: [
 *     Google({
 *       clientId: process.env.GOOGLE_ID,
 *       clientSecret: process.env.GOOGLE_SECRET,
 *       authorization: {
 *         params: {
 *           prompt: "consent",
 *           access_type: "offline",
 *           response_type: "code"
 *         }
 *       }
 *     })
 *   ],
 * }
 * ```
 *
 * :::
 *
 * :::tip
 * Google also returns a `email_verified` boolean property in the OAuth profile.
 *
 * You can use this property to restrict access to people with verified accounts at a particular domain.
 *
 * ```ts
 * const options = {
 *   ...
 *   callbacks: {
 *     async signIn({ account, profile }) {
 *       if (account.provider === "google") {
 *         return profile.email_verified && profile.email.endsWith("@example.com")
 *       }
 *       return true // Do different verification for other providers that don't have `email_verified`
 *     },
 *   }
 *   ...
 * }
 * ```
 *
 * :::
 * :::tip
 *
 * The Google provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/google.ts).
 * To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/configuring-oauth-providers).
 *
 * :::
 *
 * :::info **Disclaimer**
 *
 * If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).
 *
 * Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
 * the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
 * we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).
 *
 * :::
 */ function Google(options) {
    return {
        id: "google",
        name: "Google",
        type: "oidc",
        issuer: "https://accounts.google.com",
        style: {
            brandColor: "#1a73e8"
        },
        options
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/core/providers/github.js
/**
 * <div class="provider" style={{backgroundColor: "#24292f", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
 * <span>Built-in <b>GitHub</b> integration.</span>
 * <a href="https://github.com">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/providers/github.svg" height="48" width="48"/>
 * </a>
 * </div>
 *
 * @module providers/github
 */ /**
 * Add GitHub login to your page and make requests to [GitHub APIs](https://docs.github.com/en/rest).
 *
 * ### Setup
 *
 * #### Callback URL
 * ```
 * https://example.com/api/auth/callback/github
 * ```
 *
 * #### Configuration
 * ```ts
 * import { Auth } from "@auth/core"
 * import GitHub from "@auth/core/providers/github"
 *
 * const request = new Request(origin)
 * const response = await Auth(request, {
 *   providers: [
 *     GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET }),
 *   ],
 * })
 * ```
 *
 * ### Resources
 *
 * - [GitHub - Creating an OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
 * - [GitHub - Authorizing OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
 * - [GitHub - Configure your GitHub OAuth Apps](https://github.com/settings/developers)
 * - [Learn more about OAuth](https://authjs.dev/concepts/oauth)
 * - [Source code](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/github.ts)
 *
 * ### Notes
 *
 * By default, Auth.js assumes that the GitHub provider is
 * based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.
 *
 * :::tip
 *
 * The GitHub provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/github.ts).
 * To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/configuring-oauth-providers).
 *
 * :::
 *
 * :::info **Disclaimer**
 *
 * If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).
 *
 * Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
 * the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
 * we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).
 *
 * :::
 */ function GitHub(config) {
    const baseUrl = config?.enterprise?.baseUrl ?? "https://github.com";
    const apiBaseUrl = config?.enterprise?.baseUrl ? `${config?.enterprise?.baseUrl}/api/v3` : "https://api.github.com";
    return {
        id: "github",
        name: "GitHub",
        type: "oauth",
        authorization: {
            url: `${baseUrl}/login/oauth/authorize`,
            params: {
                scope: "read:user user:email"
            }
        },
        token: `${baseUrl}/login/oauth/access_token`,
        userinfo: {
            url: `${apiBaseUrl}/user`,
            async request ({ tokens, provider }) {
                const profile = await fetch(provider.userinfo?.url, {
                    headers: {
                        Authorization: `Bearer ${tokens.access_token}`,
                        "User-Agent": "authjs"
                    }
                }).then(async (res)=>await res.json());
                if (!profile.email) {
                    // If the user does not have a public email, get another via the GitHub API
                    // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
                    const res = await fetch(`${apiBaseUrl}/user/emails`, {
                        headers: {
                            Authorization: `Bearer ${tokens.access_token}`,
                            "User-Agent": "authjs"
                        }
                    });
                    if (res.ok) {
                        const emails = await res.json();
                        profile.email = (emails.find((e)=>e.primary) ?? emails[0]).email;
                    }
                }
                return profile;
            }
        },
        profile (profile) {
            return {
                id: profile.id.toString(),
                name: profile.name ?? profile.login,
                email: profile.email,
                image: profile.avatar_url
            };
        },
        style: {
            bg: "#24292f",
            text: "#fff"
        },
        options: config
    };
}

;// CONCATENATED MODULE: ./node_modules/@auth/prisma-adapter/index.js
function PrismaAdapter(prisma) {
    const p = prisma;
    return {
        // We need to let Prisma generate the ID because our default UUID is incompatible with MongoDB
        createUser: ({ id, ...data })=>p.user.create(prisma_adapter_stripUndefined(data)),
        getUser: (id)=>p.user.findUnique({
                where: {
                    id
                }
            }),
        getUserByEmail: (email)=>p.user.findUnique({
                where: {
                    email
                }
            }),
        async getUserByAccount (provider_providerAccountId) {
            const account = await p.account.findUnique({
                where: {
                    provider_providerAccountId
                },
                include: {
                    user: true
                }
            });
            return account?.user ?? null;
        },
        updateUser: ({ id, ...data })=>p.user.update({
                where: {
                    id
                },
                ...prisma_adapter_stripUndefined(data)
            }),
        deleteUser: (id)=>p.user.delete({
                where: {
                    id
                }
            }),
        linkAccount: (data)=>p.account.create({
                data
            }),
        unlinkAccount: (provider_providerAccountId)=>p.account.delete({
                where: {
                    provider_providerAccountId
                }
            }),
        async getSessionAndUser (sessionToken) {
            const userAndSession = await p.session.findUnique({
                where: {
                    sessionToken
                },
                include: {
                    user: true
                }
            });
            if (!userAndSession) return null;
            const { user, ...session } = userAndSession;
            return {
                user,
                session
            };
        },
        createSession: (data)=>p.session.create(prisma_adapter_stripUndefined(data)),
        updateSession: (data)=>p.session.update({
                where: {
                    sessionToken: data.sessionToken
                },
                ...prisma_adapter_stripUndefined(data)
            }),
        deleteSession: (sessionToken)=>p.session.delete({
                where: {
                    sessionToken
                }
            }),
        async createVerificationToken (data) {
            const verificationToken = await p.verificationToken.create(prisma_adapter_stripUndefined(data));
            if ("id" in verificationToken && verificationToken.id) delete verificationToken.id;
            return verificationToken;
        },
        async useVerificationToken (identifier_token) {
            try {
                const verificationToken = await p.verificationToken.delete({
                    where: {
                        identifier_token
                    }
                });
                if ("id" in verificationToken && verificationToken.id) delete verificationToken.id;
                return verificationToken;
            } catch (error) {
                // If token already used/deleted, just return null
                // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
                if (error && typeof error === "object" && "code" in error && error.code === "P2025") return null;
                throw error;
            }
        },
        async getAccount (providerAccountId, provider) {
            return p.account.findFirst({
                where: {
                    providerAccountId,
                    provider
                }
            });
        },
        async createAuthenticator (data) {
            return p.authenticator.create(prisma_adapter_stripUndefined(data));
        },
        async getAuthenticator (credentialID) {
            return p.authenticator.findUnique({
                where: {
                    credentialID
                }
            });
        },
        async listAuthenticatorsByUserId (userId) {
            return p.authenticator.findMany({
                where: {
                    userId
                }
            });
        },
        async updateAuthenticatorCounter (credentialID, counter) {
            return p.authenticator.update({
                where: {
                    credentialID
                },
                data: {
                    counter
                }
            });
        }
    };
}
/** @see https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined */ function prisma_adapter_stripUndefined(obj) {
    const data = {};
    for(const key in obj)if (obj[key] !== undefined) data[key] = obj[key];
    return {
        data
    };
}

// EXTERNAL MODULE: ./node_modules/@prisma/client/default.js
var client_default = __webpack_require__(366);
;// CONCATENATED MODULE: ./src/lib/prisma.ts

const globalForPrisma = __webpack_require__.g;
const prisma = __webpack_require__.g.prisma || new client_default.PrismaClient();
if (false) {}
/* harmony default export */ const lib_prisma = ((/* unused pure expression or super */ null && (prisma)));

;// CONCATENATED MODULE: ./src/auth.ts





const { handlers, signIn: auth_signIn, signOut: auth_signOut, auth } = NextAuth({
    providers: [
        Google,
        GitHub
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        async session ({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt ({ token }) {
            if (!token.sub) return token;
            const dbUser = await prisma.user.findUnique({
                where: {
                    id: token.sub
                }
            });
            if (!dbUser) return token;
            token.role = dbUser.role;
            return token;
        },
        authorized ({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            return true;
        }
    }
});

;// CONCATENATED MODULE: ./src/middleware.ts

const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ]
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=private-next-root-dir%2Fsrc%2Fmiddleware.ts&page=%2Fsrc%2Fmiddleware&rootDir=C%3A%5CUsers%5Ccamo1%5CDocuments%5Cflagship-agency%5Csrc%5Cmultiverse%5Cpigmentostkts-web&matchers=W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyFhcGl8X25leHRcXC9zdGF0aWN8X25leHRcXC9pbWFnZXxmYXZpY29uLmljbykuKikpKC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLygoPyFhcGl8X25leHQvc3RhdGljfF9uZXh0L2ltYWdlfGZhdmljb24uaWNvKS4qKSJ9XQ%3D%3D&preferredRegion=&middlewareConfig=eyJtYXRjaGVycyI6W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyFhcGl8X25leHRcXC9zdGF0aWN8X25leHRcXC9pbWFnZXxmYXZpY29uLmljbykuKikpKC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLygoPyFhcGl8X25leHQvc3RhdGljfF9uZXh0L2ltYWdlfGZhdmljb24uaWNvKS4qKSJ9XX0%3D!


// Import the userland code.

const mod = {
    ...middleware_namespaceObject
};
const handler = mod.middleware || mod.default;
const page = "/src/middleware";
if (typeof handler !== "function") {
    throw new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`);
}
function nHandler(opts) {
    return adapter({
        ...opts,
        page,
        handler
    });
}

//# sourceMappingURL=middleware.js.map

/***/ }),

/***/ 938:
/***/ ((module) => {

module.exports = wasm_232a8c068638351d8b9a286185310c89c43ec967;

/***/ }),

/***/ 660:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */ // biome-ignore-all lint: generated file

module.exports = {
    ...__webpack_require__(455)
};


/***/ }),

/***/ 290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);

var F = Object.defineProperty;
var B = Object.getOwnPropertyDescriptor;
var R = Object.getOwnPropertyNames;
var U = Object.prototype.hasOwnProperty;
var L = (e, t)=>{
    for(var n in t)F(e, n, {
        get: t[n],
        enumerable: !0
    });
}, N = (e, t, n, _)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let o of R(t))!U.call(e, o) && o !== n && F(e, o, {
        get: ()=>t[o],
        enumerable: !(_ = B(t, o)) || _.enumerable
    });
    return e;
};
var C = (e)=>N(F({}, "__esModule", {
        value: !0
    }), e);
var qt = {};
L(qt, {
    QueryEngine: ()=>E,
    __wbg_Error_e83987f665cf5504: ()=>J,
    __wbg_Number_bb48ca12f395cd08: ()=>X,
    __wbg_String_8f0eb39a4a4c2f66: ()=>Y,
    __wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd: ()=>K,
    __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: ()=>Z,
    __wbg___wbindgen_debug_string_df47ffb5e35e6763: ()=>ee,
    __wbg___wbindgen_in_bb933bd9e1b3bc0f: ()=>te,
    __wbg___wbindgen_is_bigint_cb320707dcd35f0b: ()=>ne,
    __wbg___wbindgen_is_function_ee8a6c5833c90377: ()=>re,
    __wbg___wbindgen_is_object_c818261d21f283a4: ()=>_e,
    __wbg___wbindgen_is_string_fbb76cb2940daafd: ()=>oe,
    __wbg___wbindgen_is_undefined_2d472862bd29a478: ()=>ce,
    __wbg___wbindgen_jsval_eq_6b13ab83478b1c50: ()=>ie,
    __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: ()=>se,
    __wbg___wbindgen_number_get_a20bf9b85341449d: ()=>ue,
    __wbg___wbindgen_string_get_e4f06c90489ad01b: ()=>be,
    __wbg___wbindgen_throw_b855445ff6a94295: ()=>fe,
    __wbg__wbg_cb_unref_2454a539ea5790d9: ()=>ae,
    __wbg_call_525440f72fbfc0ea: ()=>ge,
    __wbg_call_e762c39fa8ea36bf: ()=>le,
    __wbg_crypto_805be4ce92f1e370: ()=>de,
    __wbg_done_2042aa2670fb1db1: ()=>we,
    __wbg_entries_e171b586f8f6bdbf: ()=>pe,
    __wbg_getRandomValues_f6a868620c8bab49: ()=>xe,
    __wbg_getTime_14776bfb48a1bff9: ()=>ye,
    __wbg_get_7bed016f185add81: ()=>me,
    __wbg_get_ece95cf6585650d9: ()=>he,
    __wbg_get_efcb449f58ec27c2: ()=>Te,
    __wbg_get_with_ref_key_1dc361bd10053bfe: ()=>Ae,
    __wbg_has_787fafc980c3ccdb: ()=>Se,
    __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: ()=>Fe,
    __wbg_instanceof_Map_8579b5e2ab5437c7: ()=>Ie,
    __wbg_instanceof_Promise_001fdd42afa1b7ef: ()=>qe,
    __wbg_instanceof_Uint8Array_20c8e73002f7af98: ()=>ke,
    __wbg_isArray_96e0af9891d0945d: ()=>Ee,
    __wbg_isSafeInteger_d216eda7911dde36: ()=>Oe,
    __wbg_iterator_e5822695327a3c39: ()=>Me,
    __wbg_keys_b4d27b02ad14f4be: ()=>ve,
    __wbg_length_69bca3cb64fc8748: ()=>De,
    __wbg_length_cdd215e10d9dd507: ()=>je,
    __wbg_msCrypto_2ac4d17c4748234a: ()=>Be,
    __wbg_new_0_f9740686d739025c: ()=>Re,
    __wbg_new_1acc0b6eea89d040: ()=>Ue,
    __wbg_new_3c3d849046688a66: ()=>Le,
    __wbg_new_5a79be3ab53b8aa5: ()=>Ne,
    __wbg_new_68651c719dcda04e: ()=>Ce,
    __wbg_new_e17d9f43105b08be: ()=>$e,
    __wbg_new_from_slice_92f4d78ca282a2d2: ()=>Ve,
    __wbg_new_no_args_ee98eee5275000a4: ()=>We,
    __wbg_new_with_length_01aa0dc35aa13543: ()=>ze,
    __wbg_next_020810e0ae8ebcb0: ()=>Pe,
    __wbg_next_2c826fe5dfec6b6a: ()=>Ge,
    __wbg_node_ecc8306b9857f33d: ()=>Qe,
    __wbg_now_793306c526e2e3b6: ()=>He,
    __wbg_now_7fd00a794a07d388: ()=>Je,
    __wbg_now_b3f7572f6ef3d3a9: ()=>Xe,
    __wbg_process_5cff2739921be718: ()=>Ye,
    __wbg_prototypesetcall_2a6620b6922694b2: ()=>Ke,
    __wbg_push_df81a39d04db858c: ()=>Ze,
    __wbg_queueMicrotask_5a8a9131f3f0b37b: ()=>et,
    __wbg_queueMicrotask_6d79674585219521: ()=>tt,
    __wbg_randomFillSync_d3c85af7e31cf1f8: ()=>nt,
    __wbg_require_0c566c6f2eef6c79: ()=>rt,
    __wbg_resolve_caf97c30b83f7053: ()=>_t,
    __wbg_setTimeout_5d6a1d4fc51ea450: ()=>ot,
    __wbg_set_3f1d0b984ed272ed: ()=>ct,
    __wbg_set_907fb406c34a251d: ()=>it,
    __wbg_set_c213c871859d6500: ()=>st,
    __wbg_set_c2abbebe8b9ebee1: ()=>ut,
    __wbg_set_wasm: ()=>$,
    __wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e: ()=>bt,
    __wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac: ()=>ft,
    __wbg_static_accessor_SELF_6fdf4b64710cc91b: ()=>at,
    __wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2: ()=>gt,
    __wbg_subarray_480600f3d6a9f26c: ()=>lt,
    __wbg_then_4f46f6544e6b4a28: ()=>dt,
    __wbg_then_70d05cf780a18d77: ()=>wt,
    __wbg_valueOf_9eee4828c11458ca: ()=>pt,
    __wbg_value_692627309814bb8c: ()=>xt,
    __wbg_versions_a8e5a362e1f16442: ()=>yt,
    __wbindgen_cast_126e48f66237b479: ()=>mt,
    __wbindgen_cast_2241b6af4c4b2941: ()=>ht,
    __wbindgen_cast_4625c577ab2ec9ee: ()=>Tt,
    __wbindgen_cast_9ae0607507abb057: ()=>At,
    __wbindgen_cast_cb9088102bce6b30: ()=>St,
    __wbindgen_cast_d6cd19b81560fd6e: ()=>Ft,
    __wbindgen_init_externref_table: ()=>It,
    debug_panic: ()=>P,
    getBuildTimeInfo: ()=>G
});
module.exports = C(qt);
var h = ()=>{};
h.prototype = h;
let r;
function $(e) {
    r = e;
}
let T = null;
function p() {
    return (T === null || T.byteLength === 0) && (T = new Uint8Array(r.memory.buffer)), T;
}
let A = new TextDecoder("utf-8", {
    ignoreBOM: !0,
    fatal: !0
});
A.decode();
const V = 2146435072;
let I = 0;
function W(e, t) {
    return I += t, I >= V && (A = new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }), A.decode(), I = t), A.decode(p().subarray(e, e + t));
}
function S(e, t) {
    return e = e >>> 0, W(e, t);
}
let u = 0;
const x = new TextEncoder;
"encodeInto" in x || (x.encodeInto = function(e, t) {
    const n = x.encode(e);
    return t.set(n), {
        read: e.length,
        written: n.length
    };
});
function b(e, t, n) {
    if (n === void 0) {
        const s = x.encode(e), f = t(s.length, 1) >>> 0;
        return p().subarray(f, f + s.length).set(s), u = s.length, f;
    }
    let _ = e.length, o = t(_, 1) >>> 0;
    const i = p();
    let c = 0;
    for(; c < _; c++){
        const s = e.charCodeAt(c);
        if (s > 127) break;
        i[o + c] = s;
    }
    if (c !== _) {
        c !== 0 && (e = e.slice(c)), o = n(o, _, _ = c + e.length * 3, 1) >>> 0;
        const s = p().subarray(o + c, o + _), f = x.encodeInto(e, s);
        c += f.written, o = n(o, _, c, 1) >>> 0;
    }
    return u = c, o;
}
let w = null;
function l() {
    return (w === null || w.buffer.detached === !0 || w.buffer.detached === void 0 && w.buffer !== r.memory.buffer) && (w = new DataView(r.memory.buffer)), w;
}
function a(e) {
    return e == null;
}
function q(e) {
    const t = typeof e;
    if (t == "number" || t == "boolean" || e == null) return `${e}`;
    if (t == "string") return `"${e}"`;
    if (t == "symbol") {
        const o = e.description;
        return o == null ? "Symbol" : `Symbol(${o})`;
    }
    if (t == "function") {
        const o = e.name;
        return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
    }
    if (Array.isArray(e)) {
        const o = e.length;
        let i = "[";
        o > 0 && (i += q(e[0]));
        for(let c = 1; c < o; c++)i += ", " + q(e[c]);
        return i += "]", i;
    }
    const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
    let _;
    if (n && n.length > 1) _ = n[1];
    else return toString.call(e);
    if (_ == "Object") try {
        return "Object(" + JSON.stringify(e) + ")";
    } catch  {
        return "Object";
    }
    return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : _;
}
function y(e) {
    const t = r.__externref_table_alloc();
    return r.__wbindgen_externrefs.set(t, e), t;
}
function g(e, t) {
    try {
        return e.apply(this, t);
    } catch (n) {
        const _ = y(n);
        r.__wbindgen_exn_store(_);
    }
}
function k(e, t) {
    return e = e >>> 0, p().subarray(e / 1, e / 1 + t);
}
const O = typeof FinalizationRegistry > "u" ? {
    register: ()=>{},
    unregister: ()=>{}
} : new FinalizationRegistry((e)=>e.dtor(e.a, e.b));
function z(e, t, n, _) {
    const o = {
        a: e,
        b: t,
        cnt: 1,
        dtor: n
    }, i = (...c)=>{
        o.cnt++;
        const s = o.a;
        o.a = 0;
        try {
            return _(s, o.b, ...c);
        } finally{
            o.a = s, i._wbg_cb_unref();
        }
    };
    return i._wbg_cb_unref = ()=>{
        --o.cnt === 0 && (o.dtor(o.a, o.b), o.a = 0, O.unregister(o));
    }, O.register(i, o, o), i;
}
function M(e) {
    const t = r.__wbindgen_externrefs.get(e);
    return r.__externref_table_dealloc(e), t;
}
function P(e) {
    var t = a(e) ? 0 : b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), n = u;
    const _ = r.debug_panic(t, n);
    if (_[1]) throw M(_[0]);
}
function G() {
    return r.getBuildTimeInfo();
}
function Q(e, t, n) {
    r.wasm_bindgen__convert__closures_____invoke__ha235f3ea55a06a09(e, t, n);
}
function H(e, t, n, _) {
    r.wasm_bindgen__convert__closures_____invoke__h1a2f20be69ab8911(e, t, n, _);
}
const v = typeof FinalizationRegistry > "u" ? {
    register: ()=>{},
    unregister: ()=>{}
} : new FinalizationRegistry((e)=>r.__wbg_queryengine_free(e >>> 0, 1));
class E {
    __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, v.unregister(this), t;
    }
    free() {
        const t = this.__destroy_into_raw();
        r.__wbg_queryengine_free(t, 0);
    }
    disconnect(t, n) {
        const _ = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), o = u, i = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), c = u;
        return r.queryengine_disconnect(this.__wbg_ptr, _, o, i, c);
    }
    startTransaction(t, n, _) {
        const o = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = u, c = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), s = u, f = b(_, r.__wbindgen_malloc, r.__wbindgen_realloc), d = u;
        return r.queryengine_startTransaction(this.__wbg_ptr, o, i, c, s, f, d);
    }
    commitTransaction(t, n, _) {
        const o = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = u, c = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), s = u, f = b(_, r.__wbindgen_malloc, r.__wbindgen_realloc), d = u;
        return r.queryengine_commitTransaction(this.__wbg_ptr, o, i, c, s, f, d);
    }
    rollbackTransaction(t, n, _) {
        const o = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = u, c = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), s = u, f = b(_, r.__wbindgen_malloc, r.__wbindgen_realloc), d = u;
        return r.queryengine_rollbackTransaction(this.__wbg_ptr, o, i, c, s, f, d);
    }
    constructor(t, n, _){
        const o = r.queryengine_new(t, n, _);
        if (o[2]) throw M(o[1]);
        return this.__wbg_ptr = o[0] >>> 0, v.register(this, this.__wbg_ptr, this), this;
    }
    query(t, n, _, o) {
        const i = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), c = u, s = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), f = u;
        var d = a(_) ? 0 : b(_, r.__wbindgen_malloc, r.__wbindgen_realloc), m = u;
        const D = b(o, r.__wbindgen_malloc, r.__wbindgen_realloc), j = u;
        return r.queryengine_query(this.__wbg_ptr, i, c, s, f, d, m, D, j);
    }
    trace(t) {
        const n = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), _ = u;
        return r.queryengine_trace(this.__wbg_ptr, n, _);
    }
    connect(t, n) {
        const _ = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), o = u, i = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), c = u;
        return r.queryengine_connect(this.__wbg_ptr, _, o, i, c);
    }
    metrics(t) {
        const n = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), _ = u;
        return r.queryengine_metrics(this.__wbg_ptr, n, _);
    }
}
Symbol.dispose && (E.prototype[Symbol.dispose] = E.prototype.free);
function J(e, t) {
    return Error(S(e, t));
}
function X(e) {
    return Number(e);
}
function Y(e, t) {
    const n = String(t), _ = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), o = u;
    l().setInt32(e + 4 * 1, o, !0), l().setInt32(e + 4 * 0, _, !0);
}
function K(e, t) {
    const n = t, _ = typeof n == "bigint" ? n : void 0;
    l().setBigInt64(e + 8 * 1, a(_) ? BigInt(0) : _, !0), l().setInt32(e + 4 * 0, !a(_), !0);
}
function Z(e) {
    const t = e, n = typeof t == "boolean" ? t : void 0;
    return a(n) ? 16777215 : n ? 1 : 0;
}
function ee(e, t) {
    const n = q(t), _ = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), o = u;
    l().setInt32(e + 4 * 1, o, !0), l().setInt32(e + 4 * 0, _, !0);
}
function te(e, t) {
    return e in t;
}
function ne(e) {
    return typeof e == "bigint";
}
function re(e) {
    return typeof e == "function";
}
function _e(e) {
    const t = e;
    return typeof t == "object" && t !== null;
}
function oe(e) {
    return typeof e == "string";
}
function ce(e) {
    return e === void 0;
}
function ie(e, t) {
    return e === t;
}
function se(e, t) {
    return e == t;
}
function ue(e, t) {
    const n = t, _ = typeof n == "number" ? n : void 0;
    l().setFloat64(e + 8 * 1, a(_) ? 0 : _, !0), l().setInt32(e + 4 * 0, !a(_), !0);
}
function be(e, t) {
    const n = t, _ = typeof n == "string" ? n : void 0;
    var o = a(_) ? 0 : b(_, r.__wbindgen_malloc, r.__wbindgen_realloc), i = u;
    l().setInt32(e + 4 * 1, i, !0), l().setInt32(e + 4 * 0, o, !0);
}
function fe(e, t) {
    throw new Error(S(e, t));
}
function ae(e) {
    e._wbg_cb_unref();
}
function ge() {
    return g(function(e, t, n) {
        return e.call(t, n);
    }, arguments);
}
function le() {
    return g(function(e, t) {
        return e.call(t);
    }, arguments);
}
function de(e) {
    return e.crypto;
}
function we(e) {
    return e.done;
}
function pe(e) {
    return Object.entries(e);
}
function xe() {
    return g(function(e, t) {
        e.getRandomValues(t);
    }, arguments);
}
function ye(e) {
    return e.getTime();
}
function me(e, t) {
    return e[t >>> 0];
}
function he() {
    return g(function(e, t) {
        return e[t];
    }, arguments);
}
function Te() {
    return g(function(e, t) {
        return Reflect.get(e, t);
    }, arguments);
}
function Ae(e, t) {
    return e[t];
}
function Se() {
    return g(function(e, t) {
        return Reflect.has(e, t);
    }, arguments);
}
function Fe(e) {
    let t;
    try {
        t = e instanceof ArrayBuffer;
    } catch  {
        t = !1;
    }
    return t;
}
function Ie(e) {
    let t;
    try {
        t = e instanceof Map;
    } catch  {
        t = !1;
    }
    return t;
}
function qe(e) {
    let t;
    try {
        t = e instanceof Promise;
    } catch  {
        t = !1;
    }
    return t;
}
function ke(e) {
    let t;
    try {
        t = e instanceof Uint8Array;
    } catch  {
        t = !1;
    }
    return t;
}
function Ee(e) {
    return Array.isArray(e);
}
function Oe(e) {
    return Number.isSafeInteger(e);
}
function Me() {
    return Symbol.iterator;
}
function ve(e) {
    return Object.keys(e);
}
function De(e) {
    return e.length;
}
function je(e) {
    return e.length;
}
function Be(e) {
    return e.msCrypto;
}
function Re() {
    return new Date;
}
function Ue() {
    return new Object;
}
function Le(e, t) {
    try {
        var n = {
            a: e,
            b: t
        }, _ = (i, c)=>{
            const s = n.a;
            n.a = 0;
            try {
                return H(s, n.b, i, c);
            } finally{
                n.a = s;
            }
        };
        return new Promise(_);
    } finally{
        n.a = n.b = 0;
    }
}
function Ne(e) {
    return new Uint8Array(e);
}
function Ce() {
    return new Map;
}
function $e() {
    return new Array;
}
function Ve(e, t) {
    return new Uint8Array(k(e, t));
}
function We(e, t) {
    return new h(S(e, t));
}
function ze(e) {
    return new Uint8Array(e >>> 0);
}
function Pe() {
    return g(function(e) {
        return e.next();
    }, arguments);
}
function Ge(e) {
    return e.next;
}
function Qe(e) {
    return e.node;
}
function He() {
    return Date.now();
}
function Je(e) {
    return e.now();
}
function Xe() {
    return g(function() {
        return Date.now();
    }, arguments);
}
function Ye(e) {
    return e.process;
}
function Ke(e, t, n) {
    Uint8Array.prototype.set.call(k(e, t), n);
}
function Ze(e, t) {
    return e.push(t);
}
function et(e) {
    return e.queueMicrotask;
}
function tt(e) {
    queueMicrotask(e);
}
function nt() {
    return g(function(e, t) {
        e.randomFillSync(t);
    }, arguments);
}
function rt() {
    return g(function() {
        return module.require;
    }, arguments);
}
function _t(e) {
    return Promise.resolve(e);
}
function ot(e, t) {
    return setTimeout(e, t >>> 0);
}
function ct(e, t, n) {
    e[t] = n;
}
function it(e, t, n) {
    return e.set(t, n);
}
function st(e, t, n) {
    e[t >>> 0] = n;
}
function ut() {
    return g(function(e, t, n) {
        return Reflect.set(e, t, n);
    }, arguments);
}
function bt() {
    const e = typeof __webpack_require__.g > "u" ? null : __webpack_require__.g;
    return a(e) ? 0 : y(e);
}
function ft() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return a(e) ? 0 : y(e);
}
function at() {
    const e = typeof self > "u" ? null : self;
    return a(e) ? 0 : y(e);
}
function gt() {
    const e =  true ? null : 0;
    return a(e) ? 0 : y(e);
}
function lt(e, t, n) {
    return e.subarray(t >>> 0, n >>> 0);
}
function dt(e, t) {
    return e.then(t);
}
function wt(e, t, n) {
    return e.then(t, n);
}
function pt(e) {
    return e.valueOf();
}
function xt(e) {
    return e.value;
}
function yt(e) {
    return e.versions;
}
function mt(e, t) {
    return z(e, t, r.wasm_bindgen__closure__destroy__hf9ae564cf31e91c2, Q);
}
function ht(e, t) {
    return S(e, t);
}
function Tt(e) {
    return BigInt.asUintN(64, e);
}
function At(e) {
    return e;
}
function St(e, t) {
    return k(e, t);
}
function Ft(e) {
    return e;
}
function It() {
    const e = r.__wbindgen_externrefs, t = e.grow(4);
    e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
}
0 && (0);


/***/ }),

/***/ 455:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */ // biome-ignore-all lint: generated file

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, PrismaClientInitializationError, PrismaClientValidationError, getPrismaClient, sqltag, empty, join, raw, skip, Decimal, Debug, objectEnumValues, makeStrictEnum, Extensions, warnOnce, defineDmmfProperty, Public, getRuntime, createParam } = __webpack_require__(248);
const Prisma = {};
exports.Prisma = Prisma;
exports.$Enums = {};
/**
 * Prisma Client JS version: 6.19.0
 * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
 */ Prisma.prismaVersion = {
    client: "6.19.0",
    engine: "2ba551f319ab1df4bc874a89965d8b3641056773"
};
Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.Decimal = Decimal;
/**
 * Re-export of sql-template-tag
 */ Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;
/**
* Extensions
*/ Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;
/**
 * Shorthand utilities for JSON filtering
 */ Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;
Prisma.NullTypes = {
    DbNull: objectEnumValues.classes.DbNull,
    JsonNull: objectEnumValues.classes.JsonNull,
    AnyNull: objectEnumValues.classes.AnyNull
};
/**
 * Enums
 */ exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
    Serializable: "Serializable"
});
exports.Prisma.AccountScalarFieldEnum = {
    id: "id",
    userId: "userId",
    type: "type",
    provider: "provider",
    providerAccountId: "providerAccountId",
    refresh_token: "refresh_token",
    access_token: "access_token",
    expires_at: "expires_at",
    token_type: "token_type",
    scope: "scope",
    id_token: "id_token",
    session_state: "session_state"
};
exports.Prisma.SessionScalarFieldEnum = {
    id: "id",
    sessionToken: "sessionToken",
    userId: "userId",
    expires: "expires"
};
exports.Prisma.UserScalarFieldEnum = {
    id: "id",
    name: "name",
    email: "email",
    emailVerified: "emailVerified",
    image: "image",
    role: "role"
};
exports.Prisma.VerificationTokenScalarFieldEnum = {
    identifier: "identifier",
    token: "token",
    expires: "expires"
};
exports.Prisma.ProductScalarFieldEnum = {
    id: "id",
    name: "name",
    description: "description",
    price: "price",
    image: "image",
    category: "category",
    features: "features",
    stock: "stock",
    createdAt: "createdAt",
    updatedAt: "updatedAt"
};
exports.Prisma.OrderScalarFieldEnum = {
    id: "id",
    userId: "userId",
    amount: "amount",
    status: "status",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    stripePaymentId: "stripePaymentId",
    shippingName: "shippingName",
    shippingAddress: "shippingAddress",
    shippingCity: "shippingCity",
    shippingZip: "shippingZip"
};
exports.Prisma.OrderItemScalarFieldEnum = {
    id: "id",
    orderId: "orderId",
    productId: "productId",
    quantity: "quantity",
    price: "price",
    metadata: "metadata",
    fileUrl: "fileUrl"
};
exports.Prisma.SortOrder = {
    asc: "asc",
    desc: "desc"
};
exports.Prisma.NullsOrder = {
    first: "first",
    last: "last"
};
exports.Role = exports.$Enums.Role = {
    USER: "USER",
    ADMIN: "ADMIN"
};
exports.Prisma.ModelName = {
    Account: "Account",
    Session: "Session",
    User: "User",
    VerificationToken: "VerificationToken",
    Product: "Product",
    Order: "Order",
    OrderItem: "OrderItem"
};
/**
 * Create the Client
 */ const config = {
    "generator": {
        "name": "client",
        "provider": {
            "fromEnvVar": null,
            "value": "prisma-client-js"
        },
        "output": {
            "value": "C:\\Users\\camo1\\Documents\\flagship-agency\\src\\multiverse\\pigmentostkts-web\\node_modules\\@prisma\\client",
            "fromEnvVar": null
        },
        "config": {
            "engineType": "library"
        },
        "binaryTargets": [
            {
                "fromEnvVar": null,
                "value": "windows",
                "native": true
            }
        ],
        "previewFeatures": [],
        "sourceFilePath": "C:\\Users\\camo1\\Documents\\flagship-agency\\src\\multiverse\\pigmentostkts-web\\prisma\\schema.prisma"
    },
    "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../../.env"
    },
    "relativePath": "../../../prisma",
    "clientVersion": "6.19.0",
    "engineVersion": "2ba551f319ab1df4bc874a89965d8b3641056773",
    "datasourceNames": [
        "db"
    ],
    "activeProvider": "sqlite",
    "postinstall": false,
    "inlineDatasources": {
        "db": {
            "url": {
                "fromEnvVar": "DATABASE_URL",
                "value": null
            }
        }
    },
    "inlineSchema": 'datasource db {\n  provider = "sqlite"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\n// Modelos para NextAuth (Auth.js)\nmodel Account {\n  id                String  @id @default(cuid())\n  userId            String\n  type              String\n  provider          String\n  providerAccountId String\n  refresh_token     String?\n  access_token      String?\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String?\n  session_state     String?\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([provider, providerAccountId])\n}\n\nmodel Session {\n  id           String   @id @default(cuid())\n  sessionToken String   @unique\n  userId       String\n  expires      DateTime\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nenum Role {\n  USER\n  ADMIN\n}\n\nmodel User {\n  id            String    @id @default(cuid())\n  name          String?\n  email         String?   @unique\n  emailVerified DateTime?\n  image         String?\n  role          String    @default("USER") // SQLite no soporta enums nativos, usamos String\n  accounts      Account[]\n  sessions      Session[]\n  orders        Order[]\n}\n\nmodel VerificationToken {\n  identifier String\n  token      String   @unique\n  expires    DateTime\n\n  @@unique([identifier, token])\n}\n\n// Modelos de E-commerce\n\nmodel Product {\n  id          Int         @id @default(autoincrement())\n  name        String\n  description String\n  price       Int // En centavos\n  image       String\n  category    String\n  features    String\n  // SQLite no soporta arrays escalares (String[]), lo simularemos con string separado por comas o JSON string\n  // Simplificaci\xf3n: features ser\xe1 un string \xfanico por ahora para SQLite\n  stock       Int         @default(100)\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n  orderItems  OrderItem[]\n}\n\n// SQLite no soporta enums, usamos String\nmodel Order {\n  id              String   @id @default(cuid())\n  userId          String?\n  user            User?    @relation(fields: [userId], references: [id])\n  amount          Int\n  status          String   @default("PENDING")\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n  stripePaymentId String? // ID del PaymentIntent\n\n  // Datos de env\xedo denormalizados para el historial\n  shippingName    String?\n  shippingAddress String?\n  shippingCity    String?\n  shippingZip     String?\n\n  items OrderItem[]\n}\n\nmodel OrderItem {\n  id        String   @id @default(cuid())\n  orderId   String\n  order     Order    @relation(fields: [orderId], references: [id])\n  productId Int?\n  product   Product? @relation(fields: [productId], references: [id])\n  quantity  Int\n  price     Int // Precio en el momento de la compra\n\n  // Metadata para stickers personalizados\n  metadata String? // JSON string con configuraci\xf3n (material, corte, medidas)\n  fileUrl  String? // Link al archivo de dise\xf1o\n}\n',
    "inlineSchemaHash": "4099171a22c47b93e3e7b73041c689d0e4f19379f3bb8fb86d73e0e44b9a4810",
    "copyEngine": true
};
config.dirname = "/";
config.runtimeDataModel = JSON.parse('{"models":{"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"provider","kind":"scalar","type":"String"},{"name":"providerAccountId","kind":"scalar","type":"String"},{"name":"refresh_token","kind":"scalar","type":"String"},{"name":"access_token","kind":"scalar","type":"String"},{"name":"expires_at","kind":"scalar","type":"Int"},{"name":"token_type","kind":"scalar","type":"String"},{"name":"scope","kind":"scalar","type":"String"},{"name":"id_token","kind":"scalar","type":"String"},{"name":"session_state","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sessionToken","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"expires","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"}],"dbName":null},"VerificationToken":{"fields":[{"name":"identifier","kind":"scalar","type":"String"},{"name":"token","kind":"scalar","type":"String"},{"name":"expires","kind":"scalar","type":"DateTime"}],"dbName":null},"Product":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"features","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"amount","kind":"scalar","type":"Int"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"stripePaymentId","kind":"scalar","type":"String"},{"name":"shippingName","kind":"scalar","type":"String"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"shippingCity","kind":"scalar","type":"String"},{"name":"shippingZip","kind":"scalar","type":"String"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"Int"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"},{"name":"metadata","kind":"scalar","type":"String"},{"name":"fileUrl","kind":"scalar","type":"String"}],"dbName":null}},"enums":{},"types":{}}');
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = {
    getRuntime: async ()=>__webpack_require__(290),
    getQueryEngineWasmModule: async ()=>{
        const loader = (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 843))).default;
        const engine = (await loader).default;
        return engine;
    }
};
config.compilerWasm = undefined;
config.injectableEdgeEnv = ()=>({
        parsed: {
            DATABASE_URL: typeof globalThis !== "undefined" && globalThis["DATABASE_URL"] || typeof process !== "undefined" && process.env && process.env.DATABASE_URL || undefined
        }
    });
if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || undefined) {
    Debug.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || undefined);
}
const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);


/***/ }),

/***/ 366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = {
    ...__webpack_require__(660)
};


/***/ }),

/***/ 248:
/***/ ((module) => {

"use strict";

var zo = Object.create;
var St = Object.defineProperty;
var Yo = Object.getOwnPropertyDescriptor;
var Xo = Object.getOwnPropertyNames;
var Zo = Object.getPrototypeOf, es = Object.prototype.hasOwnProperty;
var ie = (t, e)=>()=>(t && (e = t(t = 0)), e);
var Ot = (t, e)=>()=>(e || t((e = {
            exports: {}
        }).exports, e), e.exports), rt = (t, e)=>{
    for(var r in e)St(t, r, {
        get: e[r],
        enumerable: !0
    });
}, dn = (t, e, r, n)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let i of Xo(e))!es.call(t, i) && i !== r && St(t, i, {
        get: ()=>e[i],
        enumerable: !(n = Yo(e, i)) || n.enumerable
    });
    return t;
};
var kt = (t, e, r)=>(r = t != null ? zo(Zo(t)) : {}, dn(e || !t || !t.__esModule ? St(r, "default", {
        value: t,
        enumerable: !0
    }) : r, t)), ts = (t)=>dn(St({}, "__esModule", {
        value: !0
    }), t);
function xr(t, e) {
    if (e = e.toLowerCase(), e === "utf8" || e === "utf-8") return new y(os.encode(t));
    if (e === "base64" || e === "base64url") return t = t.replace(/-/g, "+").replace(/_/g, "/"), t = t.replace(/[^A-Za-z0-9+/]/g, ""), new y([
        ...atob(t)
    ].map((r)=>r.charCodeAt(0)));
    if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return new y([
        ...t
    ].map((r)=>r.charCodeAt(0)));
    if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
        let r = new y(t.length * 2), n = new DataView(r.buffer);
        for(let i = 0; i < t.length; i++)n.setUint16(i * 2, t.charCodeAt(i), !0);
        return r;
    }
    if (e === "hex") {
        let r = new y(t.length / 2);
        for(let n = 0, i = 0; i < t.length; i += 2, n++)r[n] = parseInt(t.slice(i, i + 2), 16);
        return r;
    }
    gn(`encoding "${e}"`);
}
function rs(t) {
    let r = Object.getOwnPropertyNames(DataView.prototype).filter((a)=>a.startsWith("get") || a.startsWith("set")), n = r.map((a)=>a.replace("get", "read").replace("set", "write")), i = (a, f)=>function(h = 0) {
            return V(h, "offset"), X(h, "offset"), $(h, "offset", this.length - 1), new DataView(this.buffer)[r[a]](h, f);
        }, o = (a, f)=>function(h, C = 0) {
            let A = r[a].match(/set(\w+\d+)/)[1].toLowerCase(), k = is[A];
            return V(C, "offset"), X(C, "offset"), $(C, "offset", this.length - 1), ns(h, "value", k[0], k[1]), new DataView(this.buffer)[r[a]](C, h, f), C + parseInt(r[a].match(/\d+/)[0]) / 8;
        }, s = (a)=>{
        a.forEach((f)=>{
            f.includes("Uint") && (t[f.replace("Uint", "UInt")] = t[f]), f.includes("Float64") && (t[f.replace("Float64", "Double")] = t[f]), f.includes("Float32") && (t[f.replace("Float32", "Float")] = t[f]);
        });
    };
    n.forEach((a, f)=>{
        a.startsWith("read") && (t[a] = i(f, !1), t[a + "LE"] = i(f, !0), t[a + "BE"] = i(f, !1)), a.startsWith("write") && (t[a] = o(f, !1), t[a + "LE"] = o(f, !0), t[a + "BE"] = o(f, !1)), s([
            a,
            a + "LE",
            a + "BE"
        ]);
    });
}
function gn(t) {
    throw new Error(`Buffer polyfill does not implement "${t}"`);
}
function Dt(t, e) {
    if (!(t instanceof Uint8Array)) throw new TypeError(`The "${e}" argument must be an instance of Buffer or Uint8Array`);
}
function $(t, e, r = ls + 1) {
    if (t < 0 || t > r) {
        let n = new RangeError(`The value of "${e}" is out of range. It must be >= 0 && <= ${r}. Received ${t}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
    }
}
function V(t, e) {
    if (typeof t != "number") {
        let r = new TypeError(`The "${e}" argument must be of type number. Received type ${typeof t}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
    }
}
function X(t, e) {
    if (!Number.isInteger(t) || Number.isNaN(t)) {
        let r = new RangeError(`The value of "${e}" is out of range. It must be an integer. Received ${t}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
    }
}
function ns(t, e, r, n) {
    if (t < r || t > n) {
        let i = new RangeError(`The value of "${e}" is out of range. It must be >= ${r} and <= ${n}. Received ${t}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
    }
}
function fn(t, e) {
    if (typeof t != "string") {
        let r = new TypeError(`The "${e}" argument must be of type string. Received type ${typeof t}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
    }
}
function us(t, e = "utf8") {
    return y.from(t, e);
}
var y, is, os, ss, as, ls, b, Er, u = ie(()=>{
    "use strict";
    y = class t extends Uint8Array {
        get offset() {
            return this.byteOffset;
        }
        static alloc(e, r = 0, n = "utf8") {
            return fn(n, "encoding"), t.allocUnsafe(e).fill(r, n);
        }
        static allocUnsafe(e) {
            return t.from(e);
        }
        static allocUnsafeSlow(e) {
            return t.from(e);
        }
        static isBuffer(e) {
            return e && !!e._isBuffer;
        }
        static byteLength(e, r = "utf8") {
            if (typeof e == "string") return xr(e, r).byteLength;
            if (e && e.byteLength) return e.byteLength;
            let n = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
            throw n.code = "ERR_INVALID_ARG_TYPE", n;
        }
        static isEncoding(e) {
            return as.includes(e);
        }
        static compare(e, r) {
            Dt(e, "buff1"), Dt(r, "buff2");
            for(let n = 0; n < e.length; n++){
                if (e[n] < r[n]) return -1;
                if (e[n] > r[n]) return 1;
            }
            return e.length === r.length ? 0 : e.length > r.length ? 1 : -1;
        }
        static from(e, r = "utf8") {
            if (e && typeof e == "object" && e.type === "Buffer") return new t(e.data);
            if (typeof e == "number") return new t(new Uint8Array(e));
            if (typeof e == "string") return xr(e, r);
            if (ArrayBuffer.isView(e)) {
                let { byteOffset: n, byteLength: i, buffer: o } = e;
                return "map" in e && typeof e.map == "function" ? new t(e.map((s)=>s % 256), n, i) : new t(o, n, i);
            }
            if (e && typeof e == "object" && ("length" in e || "byteLength" in e || "buffer" in e)) return new t(e);
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(e, r) {
            if (e.length === 0) return t.alloc(0);
            let n = [].concat(...e.map((o)=>[
                    ...o
                ])), i = t.alloc(r !== void 0 ? r : n.length);
            return i.set(r !== void 0 ? n.slice(0, r) : n), i;
        }
        slice(e = 0, r = this.length) {
            return this.subarray(e, r);
        }
        subarray(e = 0, r = this.length) {
            return Object.setPrototypeOf(super.subarray(e, r), t.prototype);
        }
        reverse() {
            return super.reverse(), this;
        }
        readIntBE(e, r) {
            V(e, "offset"), X(e, "offset"), $(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
            let n = new DataView(this.buffer, e, r), i = 0;
            for(let o = 0; o < r; o++)i = i * 256 + n.getUint8(o);
            return n.getUint8(0) & 128 && (i -= Math.pow(256, r)), i;
        }
        readIntLE(e, r) {
            V(e, "offset"), X(e, "offset"), $(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
            let n = new DataView(this.buffer, e, r), i = 0;
            for(let o = 0; o < r; o++)i += n.getUint8(o) * Math.pow(256, o);
            return n.getUint8(r - 1) & 128 && (i -= Math.pow(256, r)), i;
        }
        readUIntBE(e, r) {
            V(e, "offset"), X(e, "offset"), $(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
            let n = new DataView(this.buffer, e, r), i = 0;
            for(let o = 0; o < r; o++)i = i * 256 + n.getUint8(o);
            return i;
        }
        readUintBE(e, r) {
            return this.readUIntBE(e, r);
        }
        readUIntLE(e, r) {
            V(e, "offset"), X(e, "offset"), $(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
            let n = new DataView(this.buffer, e, r), i = 0;
            for(let o = 0; o < r; o++)i += n.getUint8(o) * Math.pow(256, o);
            return i;
        }
        readUintLE(e, r) {
            return this.readUIntLE(e, r);
        }
        writeIntBE(e, r, n) {
            return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntBE(e, r, n);
        }
        writeIntLE(e, r, n) {
            return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntLE(e, r, n);
        }
        writeUIntBE(e, r, n) {
            V(r, "offset"), X(r, "offset"), $(r, "offset", this.length - 1), V(n, "byteLength"), X(n, "byteLength");
            let i = new DataView(this.buffer, r, n);
            for(let o = n - 1; o >= 0; o--)i.setUint8(o, e & 255), e = e / 256;
            return r + n;
        }
        writeUintBE(e, r, n) {
            return this.writeUIntBE(e, r, n);
        }
        writeUIntLE(e, r, n) {
            V(r, "offset"), X(r, "offset"), $(r, "offset", this.length - 1), V(n, "byteLength"), X(n, "byteLength");
            let i = new DataView(this.buffer, r, n);
            for(let o = 0; o < n; o++)i.setUint8(o, e & 255), e = e / 256;
            return r + n;
        }
        writeUintLE(e, r, n) {
            return this.writeUIntLE(e, r, n);
        }
        toJSON() {
            return {
                type: "Buffer",
                data: Array.from(this)
            };
        }
        swap16() {
            let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for(let r = 0; r < this.length; r += 2)e.setUint16(r, e.getUint16(r, !0), !1);
            return this;
        }
        swap32() {
            let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for(let r = 0; r < this.length; r += 4)e.setUint32(r, e.getUint32(r, !0), !1);
            return this;
        }
        swap64() {
            let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for(let r = 0; r < this.length; r += 8)e.setBigUint64(r, e.getBigUint64(r, !0), !1);
            return this;
        }
        compare(e, r = 0, n = e.length, i = 0, o = this.length) {
            return Dt(e, "target"), V(r, "targetStart"), V(n, "targetEnd"), V(i, "sourceStart"), V(o, "sourceEnd"), $(r, "targetStart"), $(n, "targetEnd", e.length), $(i, "sourceStart"), $(o, "sourceEnd", this.length), t.compare(this.slice(i, o), e.slice(r, n));
        }
        equals(e) {
            return Dt(e, "otherBuffer"), this.length === e.length && this.every((r, n)=>r === e[n]);
        }
        copy(e, r = 0, n = 0, i = this.length) {
            $(r, "targetStart"), $(n, "sourceStart", this.length), $(i, "sourceEnd"), r >>>= 0, n >>>= 0, i >>>= 0;
            let o = 0;
            for(; n < i && !(this[n] === void 0 || e[r] === void 0);)e[r] = this[n], o++, n++, r++;
            return o;
        }
        write(e, r, n, i = "utf8") {
            let o = typeof r == "string" ? 0 : r ?? 0, s = typeof n == "string" ? this.length - o : n ?? this.length - o;
            return i = typeof r == "string" ? r : typeof n == "string" ? n : i, V(o, "offset"), V(s, "length"), $(o, "offset", this.length), $(s, "length", this.length), (i === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le") && (s = s - s % 2), xr(e, i).copy(this, o, 0, s);
        }
        fill(e = 0, r = 0, n = this.length, i = "utf-8") {
            let o = typeof r == "string" ? 0 : r, s = typeof n == "string" ? this.length : n;
            if (i = typeof r == "string" ? r : typeof n == "string" ? n : i, e = t.from(typeof e == "number" ? [
                e
            ] : e ?? [], i), fn(i, "encoding"), $(o, "offset", this.length), $(s, "end", this.length), e.length !== 0) for(let a = o; a < s; a += e.length)super.set(e.slice(0, e.length + a >= this.length ? this.length - a : e.length), a);
            return this;
        }
        includes(e, r = null, n = "utf-8") {
            return this.indexOf(e, r, n) !== -1;
        }
        lastIndexOf(e, r = null, n = "utf-8") {
            return this.indexOf(e, r, n, !0);
        }
        indexOf(e, r = null, n = "utf-8", i = !1) {
            let o = i ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
            n = typeof r == "string" ? r : n;
            let s = t.from(typeof e == "number" ? [
                e
            ] : e, n), a = typeof r == "string" ? 0 : r;
            return a = typeof r == "number" ? a : null, a = Number.isNaN(a) ? null : a, a ??= i ? this.length : 0, a = a < 0 ? this.length + a : a, s.length === 0 && i === !1 ? a >= this.length ? this.length : a : s.length === 0 && i === !0 ? (a >= this.length ? this.length : a) || this.length : o((f, h)=>(i ? h <= a : h >= a) && this[h] === s[0] && s.every((A, k)=>this[h + k] === A));
        }
        toString(e = "utf8", r = 0, n = this.length) {
            if (r = r < 0 ? 0 : r, e = e.toString().toLowerCase(), n <= 0) return "";
            if (e === "utf8" || e === "utf-8") return ss.decode(this.slice(r, n));
            if (e === "base64" || e === "base64url") {
                let i = btoa(this.reduce((o, s)=>o + Er(s), ""));
                return e === "base64url" ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : i;
            }
            if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return this.slice(r, n).reduce((i, o)=>i + Er(o & (e === "ascii" ? 127 : 255)), "");
            if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
                let i = new DataView(this.buffer.slice(r, n));
                return Array.from({
                    length: i.byteLength / 2
                }, (o, s)=>s * 2 + 1 < i.byteLength ? Er(i.getUint16(s * 2, !0)) : "").join("");
            }
            if (e === "hex") return this.slice(r, n).reduce((i, o)=>i + o.toString(16).padStart(2, "0"), "");
            gn(`encoding "${e}"`);
        }
        toLocaleString() {
            return this.toString();
        }
        inspect() {
            return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
        constructor(...args){
            super(...args);
            this._isBuffer = !0;
        }
    };
    is = {
        int8: [
            -128,
            127
        ],
        int16: [
            -32768,
            32767
        ],
        int32: [
            -2147483648,
            2147483647
        ],
        uint8: [
            0,
            255
        ],
        uint16: [
            0,
            65535
        ],
        uint32: [
            0,
            4294967295
        ],
        float32: [
            -1 / 0,
            1 / 0
        ],
        float64: [
            -1 / 0,
            1 / 0
        ],
        bigint64: [
            -0x8000000000000000n,
            0x7fffffffffffffffn
        ],
        biguint64: [
            0n,
            0xffffffffffffffffn
        ]
    }, os = new TextEncoder, ss = new TextDecoder, as = [
        "utf8",
        "utf-8",
        "hex",
        "base64",
        "ascii",
        "binary",
        "base64url",
        "ucs2",
        "ucs-2",
        "utf16le",
        "utf-16le",
        "latin1",
        "latin-1"
    ], ls = 4294967295;
    rs(y.prototype);
    b = new Proxy(us, {
        construct (t, [e, r]) {
            return y.from(e, r);
        },
        get (t, e) {
            return y[e];
        }
    }), Er = String.fromCodePoint;
});
var g, E, c = ie(()=>{
    "use strict";
    g = {
        nextTick: (t, ...e)=>{
            setTimeout(()=>{
                t(...e);
            }, 0);
        },
        env: {},
        version: "",
        cwd: ()=>"/",
        stderr: {},
        argv: [
            "/bin/node"
        ],
        pid: 1e4
    }, { cwd: E } = g;
});
var P, m = ie(()=>{
    "use strict";
    P = globalThis.performance ?? (()=>{
        let t = Date.now();
        return {
            now: ()=>Date.now() - t
        };
    })();
});
var x, p = ie(()=>{
    "use strict";
    x = ()=>{};
    x.prototype = x;
});
var w, d = ie(()=>{
    "use strict";
    w = class {
        constructor(e){
            this.value = e;
        }
        deref() {
            return this.value;
        }
    };
});
function wn(t, e) {
    var r, n, i, o, s, a, f, h, C = t.constructor, A = C.precision;
    if (!t.s || !e.s) return e.s || (e = new C(t)), q ? L(e, A) : e;
    if (f = t.d, h = e.d, s = t.e, i = e.e, f = f.slice(), o = s - i, o) {
        for(o < 0 ? (n = f, o = -o, a = h.length) : (n = h, i = s, a = f.length), s = Math.ceil(A / N), a = s > a ? s + 1 : a + 1, o > a && (o = a, n.length = 1), n.reverse(); o--;)n.push(0);
        n.reverse();
    }
    for(a = f.length, o = h.length, a - o < 0 && (o = a, n = h, h = f, f = n), r = 0; o;)r = (f[--o] = f[o] + h[o] + r) / J | 0, f[o] %= J;
    for(r && (f.unshift(r), ++i), a = f.length; f[--a] == 0;)f.pop();
    return e.d = f, e.e = i, q ? L(e, A) : e;
}
function ce(t, e, r) {
    if (t !== ~~t || t < e || t > r) throw Error(Oe + t);
}
function ue(t) {
    var e, r, n, i = t.length - 1, o = "", s = t[0];
    if (i > 0) {
        for(o += s, e = 1; e < i; e++)n = t[e] + "", r = N - n.length, r && (o += Pe(r)), o += n;
        s = t[e], n = s + "", r = N - n.length, r && (o += Pe(r));
    } else if (s === 0) return "0";
    for(; s % 10 === 0;)s /= 10;
    return o + s;
}
function xn(t, e) {
    var r, n, i, o, s, a, f = 0, h = 0, C = t.constructor, A = C.precision;
    if (j(t) > 16) throw Error(vr + j(t));
    if (!t.s) return new C(te);
    for(e == null ? (q = !1, a = A) : a = e, s = new C(.03125); t.abs().gte(.1);)t = t.times(s), h += 5;
    for(n = Math.log(Se(2, h)) / Math.LN10 * 2 + 5 | 0, a += n, r = i = o = new C(te), C.precision = a;;){
        if (i = L(i.times(t), a), r = r.times(++f), s = o.plus(he(i, r, a)), ue(s.d).slice(0, a) === ue(o.d).slice(0, a)) {
            for(; h--;)o = L(o.times(o), a);
            return C.precision = A, e == null ? (q = !0, L(o, A)) : o;
        }
        o = s;
    }
}
function j(t) {
    for(var e = t.e * N, r = t.d[0]; r >= 10; r /= 10)e++;
    return e;
}
function Pr(t, e, r) {
    if (e > t.LN10.sd()) throw q = !0, r && (t.precision = r), Error(oe + "LN10 precision limit exceeded");
    return L(new t(t.LN10), e);
}
function Pe(t) {
    for(var e = ""; t--;)e += "0";
    return e;
}
function nt(t, e) {
    var r, n, i, o, s, a, f, h, C, A = 1, k = 10, R = t, _ = R.d, O = R.constructor, D = O.precision;
    if (R.s < 1) throw Error(oe + (R.s ? "NaN" : "-Infinity"));
    if (R.eq(te)) return new O(0);
    if (e == null ? (q = !1, h = D) : h = e, R.eq(10)) return e == null && (q = !0), Pr(O, h);
    if (h += k, O.precision = h, r = ue(_), n = r.charAt(0), o = j(R), Math.abs(o) < 15e14) {
        for(; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3;)R = R.times(t), r = ue(R.d), n = r.charAt(0), A++;
        o = j(R), n > 1 ? (R = new O("0." + r), o++) : R = new O(n + "." + r.slice(1));
    } else return f = Pr(O, h + 2, D).times(o + ""), R = nt(new O(n + "." + r.slice(1)), h - k).plus(f), O.precision = D, e == null ? (q = !0, L(R, D)) : R;
    for(a = s = R = he(R.minus(te), R.plus(te), h), C = L(R.times(R), h), i = 3;;){
        if (s = L(s.times(C), h), f = a.plus(he(s, new O(i), h)), ue(f.d).slice(0, h) === ue(a.d).slice(0, h)) return a = a.times(2), o !== 0 && (a = a.plus(Pr(O, h + 2, D).times(o + ""))), a = he(a, new O(A), h), O.precision = D, e == null ? (q = !0, L(a, D)) : a;
        a = f, i += 2;
    }
}
function yn(t, e) {
    var r, n, i;
    for((r = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (n = e.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +e.slice(n + 1), e = e.substring(0, n)) : r < 0 && (r = e.length), n = 0; e.charCodeAt(n) === 48;)++n;
    for(i = e.length; e.charCodeAt(i - 1) === 48;)--i;
    if (e = e.slice(n, i), e) {
        if (i -= n, r = r - n - 1, t.e = Fe(r / N), t.d = [], n = (r + 1) % N, r < 0 && (n += N), n < i) {
            for(n && t.d.push(+e.slice(0, n)), i -= N; n < i;)t.d.push(+e.slice(n, n += N));
            e = e.slice(n), n = N - e.length;
        } else n -= i;
        for(; n--;)e += "0";
        if (t.d.push(+e), q && (t.e > It || t.e < -It)) throw Error(vr + r);
    } else t.s = 0, t.e = 0, t.d = [
        0
    ];
    return t;
}
function L(t, e, r) {
    var n, i, o, s, a, f, h, C, A = t.d;
    for(s = 1, o = A[0]; o >= 10; o /= 10)s++;
    if (n = e - s, n < 0) n += N, i = e, h = A[C = 0];
    else {
        if (C = Math.ceil((n + 1) / N), o = A.length, C >= o) return t;
        for(h = o = A[C], s = 1; o >= 10; o /= 10)s++;
        n %= N, i = n - N + s;
    }
    if (r !== void 0 && (o = Se(10, s - i - 1), a = h / o % 10 | 0, f = e < 0 || A[C + 1] !== void 0 || h % o, f = r < 4 ? (a || f) && (r == 0 || r == (t.s < 0 ? 3 : 2)) : a > 5 || a == 5 && (r == 4 || f || r == 6 && (n > 0 ? i > 0 ? h / Se(10, s - i) : 0 : A[C - 1]) % 10 & 1 || r == (t.s < 0 ? 8 : 7))), e < 1 || !A[0]) return f ? (o = j(t), A.length = 1, e = e - o - 1, A[0] = Se(10, (N - e % N) % N), t.e = Fe(-e / N) || 0) : (A.length = 1, A[0] = t.e = t.s = 0), t;
    if (n == 0 ? (A.length = C, o = 1, C--) : (A.length = C + 1, o = Se(10, N - n), A[C] = i > 0 ? (h / Se(10, s - i) % Se(10, i) | 0) * o : 0), f) for(;;)if (C == 0) {
        (A[0] += o) == J && (A[0] = 1, ++t.e);
        break;
    } else {
        if (A[C] += o, A[C] != J) break;
        A[C--] = 0, o = 1;
    }
    for(n = A.length; A[--n] === 0;)A.pop();
    if (q && (t.e > It || t.e < -It)) throw Error(vr + j(t));
    return t;
}
function En(t, e) {
    var r, n, i, o, s, a, f, h, C, A, k = t.constructor, R = k.precision;
    if (!t.s || !e.s) return e.s ? e.s = -e.s : e = new k(t), q ? L(e, R) : e;
    if (f = t.d, A = e.d, n = e.e, h = t.e, f = f.slice(), s = h - n, s) {
        for(C = s < 0, C ? (r = f, s = -s, a = A.length) : (r = A, n = h, a = f.length), i = Math.max(Math.ceil(R / N), a) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--;)r.push(0);
        r.reverse();
    } else {
        for(i = f.length, a = A.length, C = i < a, C && (a = i), i = 0; i < a; i++)if (f[i] != A[i]) {
            C = f[i] < A[i];
            break;
        }
        s = 0;
    }
    for(C && (r = f, f = A, A = r, e.s = -e.s), a = f.length, i = A.length - a; i > 0; --i)f[a++] = 0;
    for(i = A.length; i > s;){
        if (f[--i] < A[i]) {
            for(o = i; o && f[--o] === 0;)f[o] = J - 1;
            --f[o], f[i] += J;
        }
        f[i] -= A[i];
    }
    for(; f[--a] === 0;)f.pop();
    for(; f[0] === 0; f.shift())--n;
    return f[0] ? (e.d = f, e.e = n, q ? L(e, R) : e) : new k(0);
}
function ke(t, e, r) {
    var n, i = j(t), o = ue(t.d), s = o.length;
    return e ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Pe(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Pe(-i - 1) + o, r && (n = r - s) > 0 && (o += Pe(n))) : i >= s ? (o += Pe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Pe(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Pe(n))), t.s < 0 ? "-" + o : o;
}
function hn(t, e) {
    if (t.length > e) return t.length = e, !0;
}
function Pn(t) {
    var e, r, n;
    function i(o) {
        var s = this;
        if (!(s instanceof i)) return new i(o);
        if (s.constructor = i, o instanceof i) {
            s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
            return;
        }
        if (typeof o == "number") {
            if (o * 0 !== 0) throw Error(Oe + o);
            if (o > 0) s.s = 1;
            else if (o < 0) o = -o, s.s = -1;
            else {
                s.s = 0, s.e = 0, s.d = [
                    0
                ];
                return;
            }
            if (o === ~~o && o < 1e7) {
                s.e = 0, s.d = [
                    o
                ];
                return;
            }
            return yn(s, o.toString());
        } else if (typeof o != "string") throw Error(Oe + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, ms.test(o)) yn(s, o);
        else throw Error(Oe + o);
    }
    if (i.prototype = S, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = Pn, i.config = i.set = ps, t === void 0 && (t = {}), t) for(n = [
        "precision",
        "rounding",
        "toExpNeg",
        "toExpPos",
        "LN10"
    ], e = 0; e < n.length;)t.hasOwnProperty(r = n[e++]) || (t[r] = this[r]);
    return i.config(t), i;
}
function ps(t) {
    if (!t || typeof t != "object") throw Error(oe + "Object expected");
    var e, r, n, i = [
        "precision",
        1,
        Le,
        "rounding",
        0,
        8,
        "toExpNeg",
        -1 / 0,
        0,
        "toExpPos",
        0,
        1 / 0
    ];
    for(e = 0; e < i.length; e += 3)if ((n = t[r = i[e]]) !== void 0) if (Fe(n) === n && n >= i[e + 1] && n <= i[e + 2]) this[r] = n;
    else throw Error(Oe + r + ": " + n);
    if ((n = t[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
    else throw Error(Oe + r + ": " + n);
    return this;
}
var Le, cs, Tr, q, oe, Oe, vr, Fe, Se, ms, te, J, N, bn, It, S, he, Tr, Mt, vn = ie(()=>{
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    Le = 1e9, cs = {
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
    }, q = !0, oe = "[DecimalError] ", Oe = oe + "Invalid argument: ", vr = oe + "Exponent out of range: ", Fe = Math.floor, Se = Math.pow, ms = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, J = 1e7, N = 7, bn = 9007199254740991, It = Fe(bn / N), S = {};
    S.absoluteValue = S.abs = function() {
        var t = new this.constructor(this);
        return t.s && (t.s = 1), t;
    };
    S.comparedTo = S.cmp = function(t) {
        var e, r, n, i, o = this;
        if (t = new o.constructor(t), o.s !== t.s) return o.s || -t.s;
        if (o.e !== t.e) return o.e > t.e ^ o.s < 0 ? 1 : -1;
        for(n = o.d.length, i = t.d.length, e = 0, r = n < i ? n : i; e < r; ++e)if (o.d[e] !== t.d[e]) return o.d[e] > t.d[e] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
    };
    S.decimalPlaces = S.dp = function() {
        var t = this, e = t.d.length - 1, r = (e - t.e) * N;
        if (e = t.d[e], e) for(; e % 10 == 0; e /= 10)r--;
        return r < 0 ? 0 : r;
    };
    S.dividedBy = S.div = function(t) {
        return he(this, new this.constructor(t));
    };
    S.dividedToIntegerBy = S.idiv = function(t) {
        var e = this, r = e.constructor;
        return L(he(e, new r(t), 0, 1), r.precision);
    };
    S.equals = S.eq = function(t) {
        return !this.cmp(t);
    };
    S.exponent = function() {
        return j(this);
    };
    S.greaterThan = S.gt = function(t) {
        return this.cmp(t) > 0;
    };
    S.greaterThanOrEqualTo = S.gte = function(t) {
        return this.cmp(t) >= 0;
    };
    S.isInteger = S.isint = function() {
        return this.e > this.d.length - 2;
    };
    S.isNegative = S.isneg = function() {
        return this.s < 0;
    };
    S.isPositive = S.ispos = function() {
        return this.s > 0;
    };
    S.isZero = function() {
        return this.s === 0;
    };
    S.lessThan = S.lt = function(t) {
        return this.cmp(t) < 0;
    };
    S.lessThanOrEqualTo = S.lte = function(t) {
        return this.cmp(t) < 1;
    };
    S.logarithm = S.log = function(t) {
        var e, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (t === void 0) t = new n(10);
        else if (t = new n(t), t.s < 1 || t.eq(te)) throw Error(oe + "NaN");
        if (r.s < 1) throw Error(oe + (r.s ? "NaN" : "-Infinity"));
        return r.eq(te) ? new n(0) : (q = !1, e = he(nt(r, o), nt(t, o), o), q = !0, L(e, i));
    };
    S.minus = S.sub = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? En(e, t) : wn(e, (t.s = -t.s, t));
    };
    S.modulo = S.mod = function(t) {
        var e, r = this, n = r.constructor, i = n.precision;
        if (t = new n(t), !t.s) throw Error(oe + "NaN");
        return r.s ? (q = !1, e = he(r, t, 0, 1).times(t), q = !0, r.minus(e)) : L(new n(r), i);
    };
    S.naturalExponential = S.exp = function() {
        return xn(this);
    };
    S.naturalLogarithm = S.ln = function() {
        return nt(this);
    };
    S.negated = S.neg = function() {
        var t = new this.constructor(this);
        return t.s = -t.s || 0, t;
    };
    S.plus = S.add = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? wn(e, t) : En(e, (t.s = -t.s, t));
    };
    S.precision = S.sd = function(t) {
        var e, r, n, i = this;
        if (t !== void 0 && t !== !!t && t !== 1 && t !== 0) throw Error(Oe + t);
        if (e = j(i) + 1, n = i.d.length - 1, r = n * N + 1, n = i.d[n], n) {
            for(; n % 10 == 0; n /= 10)r--;
            for(n = i.d[0]; n >= 10; n /= 10)r++;
        }
        return t && e > r ? e : r;
    };
    S.squareRoot = S.sqrt = function() {
        var t, e, r, n, i, o, s, a = this, f = a.constructor;
        if (a.s < 1) {
            if (!a.s) return new f(0);
            throw Error(oe + "NaN");
        }
        for(t = j(a), q = !1, i = Math.sqrt(+a), i == 0 || i == 1 / 0 ? (e = ue(a.d), (e.length + t) % 2 == 0 && (e += "0"), i = Math.sqrt(e), t = Fe((t + 1) / 2) - (t < 0 || t % 2), i == 1 / 0 ? e = "5e" + t : (e = i.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + t), n = new f(e)) : n = new f(i.toString()), r = f.precision, i = s = r + 3;;)if (o = n, n = o.plus(he(a, o, s + 2)).times(.5), ue(o.d).slice(0, s) === (e = ue(n.d)).slice(0, s)) {
            if (e = e.slice(s - 3, s + 1), i == s && e == "4999") {
                if (L(o, r + 1, 0), o.times(o).eq(a)) {
                    n = o;
                    break;
                }
            } else if (e != "9999") break;
            s += 4;
        }
        return q = !0, L(n, r);
    };
    S.times = S.mul = function(t) {
        var e, r, n, i, o, s, a, f, h, C = this, A = C.constructor, k = C.d, R = (t = new A(t)).d;
        if (!C.s || !t.s) return new A(0);
        for(t.s *= C.s, r = C.e + t.e, f = k.length, h = R.length, f < h && (o = k, k = R, R = o, s = f, f = h, h = s), o = [], s = f + h, n = s; n--;)o.push(0);
        for(n = h; --n >= 0;){
            for(e = 0, i = f + n; i > n;)a = o[i] + R[n] * k[i - n - 1] + e, o[i--] = a % J | 0, e = a / J | 0;
            o[i] = (o[i] + e) % J | 0;
        }
        for(; !o[--s];)o.pop();
        return e ? ++r : o.shift(), t.d = o, t.e = r, q ? L(t, A.precision) : t;
    };
    S.toDecimalPlaces = S.todp = function(t, e) {
        var r = this, n = r.constructor;
        return r = new n(r), t === void 0 ? r : (ce(t, 0, Le), e === void 0 ? e = n.rounding : ce(e, 0, 8), L(r, t + j(r) + 1, e));
    };
    S.toExponential = function(t, e) {
        var r, n = this, i = n.constructor;
        return t === void 0 ? r = ke(n, !0) : (ce(t, 0, Le), e === void 0 ? e = i.rounding : ce(e, 0, 8), n = L(new i(n), t + 1, e), r = ke(n, !0, t + 1)), r;
    };
    S.toFixed = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? ke(i) : (ce(t, 0, Le), e === void 0 ? e = o.rounding : ce(e, 0, 8), n = L(new o(i), t + j(i) + 1, e), r = ke(n.abs(), !1, t + j(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
    };
    S.toInteger = S.toint = function() {
        var t = this, e = t.constructor;
        return L(new e(t), j(t) + 1, e.rounding);
    };
    S.toNumber = function() {
        return +this;
    };
    S.toPower = S.pow = function(t) {
        var e, r, n, i, o, s, a = this, f = a.constructor, h = 12, C = +(t = new f(t));
        if (!t.s) return new f(te);
        if (a = new f(a), !a.s) {
            if (t.s < 1) throw Error(oe + "Infinity");
            return a;
        }
        if (a.eq(te)) return a;
        if (n = f.precision, t.eq(te)) return L(a, n);
        if (e = t.e, r = t.d.length - 1, s = e >= r, o = a.s, s) {
            if ((r = C < 0 ? -C : C) <= bn) {
                for(i = new f(te), e = Math.ceil(n / N + 4), q = !1; r % 2 && (i = i.times(a), hn(i.d, e)), r = Fe(r / 2), r !== 0;)a = a.times(a), hn(a.d, e);
                return q = !0, t.s < 0 ? new f(te).div(i) : L(i, n);
            }
        } else if (o < 0) throw Error(oe + "NaN");
        return o = o < 0 && t.d[Math.max(e, r)] & 1 ? -1 : 1, a.s = 1, q = !1, i = t.times(nt(a, n + h)), q = !0, i = xn(i), i.s = o, i;
    };
    S.toPrecision = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? (r = j(i), n = ke(i, r <= o.toExpNeg || r >= o.toExpPos)) : (ce(t, 1, Le), e === void 0 ? e = o.rounding : ce(e, 0, 8), i = L(new o(i), t, e), r = j(i), n = ke(i, t <= r || r <= o.toExpNeg, t)), n;
    };
    S.toSignificantDigits = S.tosd = function(t, e) {
        var r = this, n = r.constructor;
        return t === void 0 ? (t = n.precision, e = n.rounding) : (ce(t, 1, Le), e === void 0 ? e = n.rounding : ce(e, 0, 8)), L(new n(r), t, e);
    };
    S.toString = S.valueOf = S.val = S.toJSON = S[Symbol.for("nodejs.util.inspect.custom")] = function() {
        var t = this, e = j(t), r = t.constructor;
        return ke(t, e <= r.toExpNeg || e >= r.toExpPos);
    };
    he = function() {
        function t(n, i) {
            var o, s = 0, a = n.length;
            for(n = n.slice(); a--;)o = n[a] * i + s, n[a] = o % J | 0, s = o / J | 0;
            return s && n.unshift(s), n;
        }
        function e(n, i, o, s) {
            var a, f;
            if (o != s) f = o > s ? 1 : -1;
            else for(a = f = 0; a < o; a++)if (n[a] != i[a]) {
                f = n[a] > i[a] ? 1 : -1;
                break;
            }
            return f;
        }
        function r(n, i, o) {
            for(var s = 0; o--;)n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * J + n[o] - i[o];
            for(; !n[0] && n.length > 1;)n.shift();
        }
        return function(n, i, o, s) {
            var a, f, h, C, A, k, R, _, O, D, ye, z, F, Y, Re, wr, se, At, Rt = n.constructor, Ho = n.s == i.s ? 1 : -1, le = n.d, B = i.d;
            if (!n.s) return new Rt(n);
            if (!i.s) throw Error(oe + "Division by zero");
            for(f = n.e - i.e, se = B.length, Re = le.length, R = new Rt(Ho), _ = R.d = [], h = 0; B[h] == (le[h] || 0);)++h;
            if (B[h] > (le[h] || 0) && --f, o == null ? z = o = Rt.precision : s ? z = o + (j(n) - j(i)) + 1 : z = o, z < 0) return new Rt(0);
            if (z = z / N + 2 | 0, h = 0, se == 1) for(C = 0, B = B[0], z++; (h < Re || C) && z--; h++)F = C * J + (le[h] || 0), _[h] = F / B | 0, C = F % B | 0;
            else {
                for(C = J / (B[0] + 1) | 0, C > 1 && (B = t(B, C), le = t(le, C), se = B.length, Re = le.length), Y = se, O = le.slice(0, se), D = O.length; D < se;)O[D++] = 0;
                At = B.slice(), At.unshift(0), wr = B[0], B[1] >= J / 2 && ++wr;
                do C = 0, a = e(B, O, se, D), a < 0 ? (ye = O[0], se != D && (ye = ye * J + (O[1] || 0)), C = ye / wr | 0, C > 1 ? (C >= J && (C = J - 1), A = t(B, C), k = A.length, D = O.length, a = e(A, O, k, D), a == 1 && (C--, r(A, se < k ? At : B, k))) : (C == 0 && (a = C = 1), A = B.slice()), k = A.length, k < D && A.unshift(0), r(O, A, D), a == -1 && (D = O.length, a = e(B, O, se, D), a < 1 && (C++, r(O, se < D ? At : B, D))), D = O.length) : a === 0 && (C++, O = [
                    0
                ]), _[h++] = C, a && O[0] ? O[D++] = le[Y] || 0 : (O = [
                    le[Y]
                ], D = 1);
                while ((Y++ < Re || O[0] !== void 0) && z--);
            }
            return _[0] || _.shift(), R.e = f, L(R, s ? o + j(R) + 1 : o);
        };
    }();
    Tr = Pn(cs);
    te = new Tr(1);
    Mt = Tr;
});
var v, be, l = ie(()=>{
    "use strict";
    vn();
    v = class extends Mt {
        static isDecimal(e) {
            return e instanceof Mt;
        }
        static random(e = 20) {
            {
                let n = globalThis.crypto.getRandomValues(new Uint8Array(e)).reduce((i, o)=>i + o, "");
                return new Mt(`0.${n.slice(0, e)}`);
            }
        }
    }, be = v;
});
function bs() {
    return !1;
}
function Or() {
    return {
        dev: 0,
        ino: 0,
        mode: 0,
        nlink: 0,
        uid: 0,
        gid: 0,
        rdev: 0,
        size: 0,
        blksize: 0,
        blocks: 0,
        atimeMs: 0,
        mtimeMs: 0,
        ctimeMs: 0,
        birthtimeMs: 0,
        atime: new Date,
        mtime: new Date,
        ctime: new Date,
        birthtime: new Date
    };
}
function ws() {
    return Or();
}
function xs() {
    return [];
}
function Es(t) {
    t(null, []);
}
function Ps() {
    return "";
}
function vs() {
    return "";
}
function Ts() {}
function Cs() {}
function As() {}
function Rs() {}
function Ss() {}
function Os() {}
function ks() {}
function Ds() {}
function Is() {
    return {
        close: ()=>{},
        on: ()=>{},
        removeAllListeners: ()=>{}
    };
}
function Ms(t, e) {
    e(null, Or());
}
var _s, Ls, Bn, Vn = ie(()=>{
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    _s = {}, Ls = {
        existsSync: bs,
        lstatSync: Or,
        stat: Ms,
        statSync: ws,
        readdirSync: xs,
        readdir: Es,
        readlinkSync: Ps,
        realpathSync: vs,
        chmodSync: Ts,
        renameSync: Cs,
        mkdirSync: As,
        rmdirSync: Rs,
        rmSync: Ss,
        unlinkSync: Os,
        watchFile: ks,
        unwatchFile: Ds,
        watch: Is,
        promises: _s
    }, Bn = Ls;
});
var jn = Ot((Zc, Fs)=>{
    Fs.exports = {
        name: "@prisma/internals",
        version: "6.19.0",
        description: "This package is intended for Prisma's internal use",
        main: "dist/index.js",
        types: "dist/index.d.ts",
        repository: {
            type: "git",
            url: "https://github.com/prisma/prisma.git",
            directory: "packages/internals"
        },
        homepage: "https://www.prisma.io",
        author: "Tim Suchanek <suchanek@prisma.io>",
        bugs: "https://github.com/prisma/prisma/issues",
        license: "Apache-2.0",
        scripts: {
            dev: "DEV=true tsx helpers/build.ts",
            build: "tsx helpers/build.ts",
            test: "dotenv -e ../../.db.env -- jest --silent",
            prepublishOnly: "pnpm run build"
        },
        files: [
            "README.md",
            "dist",
            "!**/libquery_engine*",
            "!dist/get-generators/engines/*",
            "scripts"
        ],
        devDependencies: {
            "@babel/helper-validator-identifier": "7.25.9",
            "@opentelemetry/api": "1.9.0",
            "@swc/core": "1.11.5",
            "@swc/jest": "0.2.37",
            "@types/babel__helper-validator-identifier": "7.15.2",
            "@types/jest": "29.5.14",
            "@types/node": "18.19.76",
            "@types/resolve": "1.20.6",
            archiver: "6.0.2",
            "checkpoint-client": "1.1.33",
            "cli-truncate": "4.0.0",
            dotenv: "16.5.0",
            empathic: "2.0.0",
            "escape-string-regexp": "5.0.0",
            execa: "8.0.1",
            "fast-glob": "3.3.3",
            "find-up": "7.0.0",
            "fp-ts": "2.16.9",
            "fs-extra": "11.3.0",
            "global-directory": "4.0.0",
            globby: "11.1.0",
            "identifier-regex": "1.0.0",
            "indent-string": "4.0.0",
            "is-windows": "1.0.2",
            "is-wsl": "3.1.0",
            jest: "29.7.0",
            "jest-junit": "16.0.0",
            kleur: "4.1.5",
            "mock-stdin": "1.0.0",
            "new-github-issue-url": "0.2.1",
            "node-fetch": "3.3.2",
            "npm-packlist": "5.1.3",
            open: "7.4.2",
            "p-map": "4.0.0",
            resolve: "1.22.10",
            "string-width": "7.2.0",
            "strip-indent": "4.0.0",
            "temp-dir": "2.0.0",
            tempy: "1.0.1",
            "terminal-link": "4.0.0",
            tmp: "0.2.3",
            "ts-pattern": "5.6.2",
            "ts-toolbelt": "9.6.0",
            typescript: "5.4.5",
            yarn: "1.22.22"
        },
        dependencies: {
            "@prisma/config": "workspace:*",
            "@prisma/debug": "workspace:*",
            "@prisma/dmmf": "workspace:*",
            "@prisma/driver-adapter-utils": "workspace:*",
            "@prisma/engines": "workspace:*",
            "@prisma/fetch-engine": "workspace:*",
            "@prisma/generator": "workspace:*",
            "@prisma/generator-helper": "workspace:*",
            "@prisma/get-platform": "workspace:*",
            "@prisma/prisma-schema-wasm": "6.19.0-26.2ba551f319ab1df4bc874a89965d8b3641056773",
            "@prisma/schema-engine-wasm": "6.19.0-26.2ba551f319ab1df4bc874a89965d8b3641056773",
            "@prisma/schema-files-loader": "workspace:*",
            arg: "5.0.2",
            prompts: "2.4.2"
        },
        peerDependencies: {
            typescript: ">=5.1.0"
        },
        peerDependenciesMeta: {
            typescript: {
                optional: !0
            }
        },
        sideEffects: !1
    };
});
function Ns(...t) {
    return t.join("/");
}
function qs(...t) {
    return t.join("/");
}
function Bs(t) {
    let e = $n(t), r = Qn(t), [n, i] = e.split(".");
    return {
        root: "/",
        dir: r,
        base: e,
        ext: i,
        name: n
    };
}
function $n(t) {
    let e = t.split("/");
    return e[e.length - 1];
}
function Qn(t) {
    return t.split("/").slice(0, -1).join("/");
}
function js(t) {
    let e = t.split("/").filter((i)=>i !== "" && i !== "."), r = [];
    for (let i of e)i === ".." ? r.pop() : r.push(i);
    let n = r.join("/");
    return t.startsWith("/") ? "/" + n : n;
}
var Jn, Vs, $s, Qs, Ut, Gn = ie(()=>{
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    Jn = "/", Vs = ":";
    $s = {
        sep: Jn
    }, Qs = {
        basename: $n,
        delimiter: Vs,
        dirname: Qn,
        join: qs,
        normalize: js,
        parse: Bs,
        posix: $s,
        resolve: Ns,
        sep: Jn
    }, Ut = Qs;
});
var Yn = Ot((bp, zn)=>{
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    zn.exports = (t, e = 1, r)=>{
        if (r = {
            indent: " ",
            includeEmptyLines: !1,
            ...r
        }, typeof t != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof t}\``);
        if (typeof e != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof e}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (e === 0) return t;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return t.replace(n, r.indent.repeat(e));
    };
});
var Vr = Ot((Hy, ni)=>{
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    ni.exports = function() {
        function t(e, r, n, i, o) {
            return e < r || n < r ? e > n ? n + 1 : e + 1 : i === o ? r : r + 1;
        }
        return function(e, r) {
            if (e === r) return 0;
            if (e.length > r.length) {
                var n = e;
                e = r, r = n;
            }
            for(var i = e.length, o = r.length; i > 0 && e.charCodeAt(i - 1) === r.charCodeAt(o - 1);)i--, o--;
            for(var s = 0; s < i && e.charCodeAt(s) === r.charCodeAt(s);)s++;
            if (i -= s, o -= s, i === 0 || o < 3) return o;
            var a = 0, f, h, C, A, k, R, _, O, D, ye, z, F, Y = [];
            for(f = 0; f < i; f++)Y.push(f + 1), Y.push(e.charCodeAt(s + f));
            for(var Re = Y.length - 1; a < o - 3;)for(D = r.charCodeAt(s + (h = a)), ye = r.charCodeAt(s + (C = a + 1)), z = r.charCodeAt(s + (A = a + 2)), F = r.charCodeAt(s + (k = a + 3)), R = a += 4, f = 0; f < Re; f += 2)_ = Y[f], O = Y[f + 1], h = t(_, h, C, D, O), C = t(h, C, A, ye, O), A = t(C, A, k, z, O), R = t(A, k, R, F, O), Y[f] = R, k = A, A = C, C = h, h = _;
            for(; a < o;)for(D = r.charCodeAt(s + (h = a)), R = ++a, f = 0; f < Re; f += 2)_ = Y[f], Y[f] = R = t(_, h, R, D, Y[f + 1]), h = _;
            return R;
        };
    }();
});
var li = ie(()=>{
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
});
var ui = ie(()=>{
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
});
var Mi = Ot((zP, Qa)=>{
    Qa.exports = {
        name: "@prisma/engines-version",
        version: "6.19.0-26.2ba551f319ab1df4bc874a89965d8b3641056773",
        main: "index.js",
        types: "index.d.ts",
        license: "Apache-2.0",
        author: "Tim Suchanek <suchanek@prisma.io>",
        prisma: {
            enginesVersion: "2ba551f319ab1df4bc874a89965d8b3641056773"
        },
        repository: {
            type: "git",
            url: "https://github.com/prisma/engines-wrapper.git",
            directory: "packages/engines-version"
        },
        devDependencies: {
            "@types/node": "18.19.76",
            typescript: "4.9.5"
        },
        files: [
            "index.js",
            "index.d.ts"
        ],
        scripts: {
            build: "tsc -d"
        }
    };
});
var sr, _i = ie(()=>{
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    sr = class {
        on(e, r) {
            return this.events[e] || (this.events[e] = []), this.events[e].push(r), this;
        }
        emit(e, ...r) {
            return this.events[e] ? (this.events[e].forEach((n)=>{
                n(...r);
            }), !0) : !1;
        }
        constructor(){
            this.events = {};
        }
    };
});
var Xl = {};
rt(Xl, {
    DMMF: ()=>ct,
    Debug: ()=>G,
    Decimal: ()=>be,
    Extensions: ()=>Cr,
    MetricsClient: ()=>He,
    PrismaClientInitializationError: ()=>I,
    PrismaClientKnownRequestError: ()=>Z,
    PrismaClientRustPanicError: ()=>xe,
    PrismaClientUnknownRequestError: ()=>Q,
    PrismaClientValidationError: ()=>K,
    Public: ()=>Ar,
    Sql: ()=>ee,
    createParam: ()=>Ci,
    defineDmmfProperty: ()=>Di,
    deserializeJsonResponse: ()=>Xe,
    deserializeRawResult: ()=>hr,
    dmmfToRuntimeDataModel: ()=>ri,
    empty: ()=>Fi,
    getPrismaClient: ()=>Go,
    getRuntime: ()=>Ze,
    join: ()=>Li,
    makeStrictEnum: ()=>Wo,
    makeTypedQueryFactory: ()=>Ii,
    objectEnumValues: ()=>zt,
    raw: ()=>zr,
    serializeJsonQuery: ()=>nr,
    skip: ()=>rr,
    sqltag: ()=>Yr,
    warnEnvConflicts: ()=>void 0,
    warnOnce: ()=>at
});
module.exports = ts(Xl);
u();
c();
m();
p();
d();
l();
var Cr = {};
rt(Cr, {
    defineExtension: ()=>Tn,
    getExtensionContext: ()=>Cn
});
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Tn(t) {
    return typeof t == "function" ? t : (e)=>e.$extends(t);
}
u();
c();
m();
p();
d();
l();
function Cn(t) {
    return t;
}
var Ar = {};
rt(Ar, {
    validator: ()=>An
});
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function An(...t) {
    return (e)=>e;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Rr, Rn, Sn, On, kn = !0;
typeof g < "u" && ({ FORCE_COLOR: Rr, NODE_DISABLE_COLORS: Rn, NO_COLOR: Sn, TERM: On } = g.env || {}, kn = g.stdout && g.stdout.isTTY);
var ds = {
    enabled: !Rn && Sn == null && On !== "dumb" && (Rr != null && Rr !== "0" || kn)
};
function U(t, e) {
    let r = new RegExp(`\\x1b\\[${e}m`, "g"), n = `\x1B[${t}m`, i = `\x1B[${e}m`;
    return function(o) {
        return !ds.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
    };
}
var zu = U(0, 0), _t = U(1, 22), Lt = U(2, 22), Yu = U(3, 23), Dn = U(4, 24), Xu = U(7, 27), Zu = U(8, 28), ec = U(9, 29), tc = U(30, 39), Ue = U(31, 39), In = U(32, 39), Mn = U(33, 39), _n = U(34, 39), rc = U(35, 39), Ln = U(36, 39), nc = U(37, 39), Fn = U(90, 39), ic = U(90, 39), oc = U(40, 49), sc = U(41, 49), ac = U(42, 49), lc = U(43, 49), uc = U(44, 49), cc = U(45, 49), mc = U(46, 49), pc = U(47, 49);
u();
c();
m();
p();
d();
l();
var fs = 100, Un = [
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "red"
], Ft = [], Nn = Date.now(), gs = 0, Sr = typeof g < "u" ? g.env : {};
globalThis.DEBUG ??= Sr.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= Sr.DEBUG_COLORS ? Sr.DEBUG_COLORS === "true" : !0;
var it = {
    enable (t) {
        typeof t == "string" && (globalThis.DEBUG = t);
    },
    disable () {
        let t = globalThis.DEBUG;
        return globalThis.DEBUG = "", t;
    },
    enabled (t) {
        let e = globalThis.DEBUG.split(",").map((i)=>i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = e.some((i)=>i === "" || i[0] === "-" ? !1 : t.match(RegExp(i.split("*").join(".*") + "$"))), n = e.some((i)=>i === "" || i[0] !== "-" ? !1 : t.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
        return r && !n;
    },
    log: (...t)=>{
        let [e, r, ...n] = t;
        (console.warn ?? console.log)(`${e} ${r}`, ...n);
    },
    formatters: {}
};
function ys(t) {
    let e = {
        color: Un[gs++ % Un.length],
        enabled: it.enabled(t),
        namespace: t,
        log: it.log,
        extend: ()=>{}
    }, r = (...n)=>{
        let { enabled: i, namespace: o, color: s, log: a } = e;
        if (n.length !== 0 && Ft.push([
            o,
            ...n
        ]), Ft.length > fs && Ft.shift(), it.enabled(o) || i) {
            let f = n.map((C)=>typeof C == "string" ? C : hs(C)), h = `+${Date.now() - Nn}ms`;
            Nn = Date.now(), a(o, ...f, h);
        }
    };
    return new Proxy(r, {
        get: (n, i)=>e[i],
        set: (n, i, o)=>e[i] = o
    });
}
var G = new Proxy(ys, {
    get: (t, e)=>it[e],
    set: (t, e, r)=>it[e] = r
});
function hs(t, e = 2) {
    let r = new Set;
    return JSON.stringify(t, (n, i)=>{
        if (typeof i == "object" && i !== null) {
            if (r.has(i)) return "[Circular *]";
            r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
    }, e);
}
function qn() {
    Ft.length = 0;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var kr = [
    "darwin",
    "darwin-arm64",
    "debian-openssl-1.0.x",
    "debian-openssl-1.1.x",
    "debian-openssl-3.0.x",
    "rhel-openssl-1.0.x",
    "rhel-openssl-1.1.x",
    "rhel-openssl-3.0.x",
    "linux-arm64-openssl-1.1.x",
    "linux-arm64-openssl-1.0.x",
    "linux-arm64-openssl-3.0.x",
    "linux-arm-openssl-1.1.x",
    "linux-arm-openssl-1.0.x",
    "linux-arm-openssl-3.0.x",
    "linux-musl",
    "linux-musl-openssl-3.0.x",
    "linux-musl-arm64-openssl-1.1.x",
    "linux-musl-arm64-openssl-3.0.x",
    "linux-nixos",
    "linux-static-x64",
    "linux-static-arm64",
    "windows",
    "freebsd11",
    "freebsd12",
    "freebsd13",
    "freebsd14",
    "freebsd15",
    "openbsd",
    "netbsd",
    "arm"
];
u();
c();
m();
p();
d();
l();
var Us = jn(), Dr = Us.version;
u();
c();
m();
p();
d();
l();
function Ne(t) {
    let e = Js();
    return e || (t?.config.engineType === "library" ? "library" : t?.config.engineType === "binary" ? "binary" : t?.config.engineType === "client" ? "client" : Gs());
}
function Js() {
    let t = g.env.PRISMA_CLIENT_ENGINE_TYPE;
    return t === "library" ? "library" : t === "binary" ? "binary" : t === "client" ? "client" : void 0;
}
function Gs() {
    return "library";
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Ir(t) {
    return t.name === "DriverAdapterError" && typeof t.cause == "object";
}
u();
c();
m();
p();
d();
l();
function Nt(t) {
    return {
        ok: !0,
        value: t,
        map (e) {
            return Nt(e(t));
        },
        flatMap (e) {
            return e(t);
        }
    };
}
function De(t) {
    return {
        ok: !1,
        error: t,
        map () {
            return De(t);
        },
        flatMap () {
            return De(t);
        }
    };
}
var Wn = G("driver-adapter-utils"), Mr = class {
    consumeError(e) {
        return this.registeredErrors[e];
    }
    registerNewError(e) {
        let r = 0;
        for(; this.registeredErrors[r] !== void 0;)r++;
        return this.registeredErrors[r] = {
            error: e
        }, r;
    }
    constructor(){
        this.registeredErrors = [];
    }
};
var qt = (t, e = new Mr)=>{
    let r = {
        adapterName: t.adapterName,
        errorRegistry: e,
        queryRaw: we(e, t.queryRaw.bind(t)),
        executeRaw: we(e, t.executeRaw.bind(t)),
        executeScript: we(e, t.executeScript.bind(t)),
        dispose: we(e, t.dispose.bind(t)),
        provider: t.provider,
        startTransaction: async (...n)=>(await we(e, t.startTransaction.bind(t))(...n)).map((o)=>Ws(e, o))
    };
    return t.getConnectionInfo && (r.getConnectionInfo = Ks(e, t.getConnectionInfo.bind(t))), r;
}, Ws = (t, e)=>({
        adapterName: e.adapterName,
        provider: e.provider,
        options: e.options,
        queryRaw: we(t, e.queryRaw.bind(e)),
        executeRaw: we(t, e.executeRaw.bind(e)),
        commit: we(t, e.commit.bind(e)),
        rollback: we(t, e.rollback.bind(e))
    });
function we(t, e) {
    return async (...r)=>{
        try {
            return Nt(await e(...r));
        } catch (n) {
            if (Wn("[error@wrapAsync]", n), Ir(n)) return De(n.cause);
            let i = t.registerNewError(n);
            return De({
                kind: "GenericJs",
                id: i
            });
        }
    };
}
function Ks(t, e) {
    return (...r)=>{
        try {
            return Nt(e(...r));
        } catch (n) {
            if (Wn("[error@wrapSync]", n), Ir(n)) return De(n.cause);
            let i = t.registerNewError(n);
            return De({
                kind: "GenericJs",
                id: i
            });
        }
    };
}
u();
c();
m();
p();
d();
l();
var Kn = "prisma+postgres", Hn = `${Kn}:`;
function _r(t) {
    return t?.toString().startsWith(`${Hn}//`) ?? !1;
}
var st = {};
rt(st, {
    error: ()=>Ys,
    info: ()=>zs,
    log: ()=>Hs,
    query: ()=>Xs,
    should: ()=>Xn,
    tags: ()=>ot,
    warn: ()=>Lr
});
u();
c();
m();
p();
d();
l();
var ot = {
    error: Ue("prisma:error"),
    warn: Mn("prisma:warn"),
    info: Ln("prisma:info"),
    query: _n("prisma:query")
}, Xn = {
    warn: ()=>!g.env.PRISMA_DISABLE_WARNINGS
};
function Hs(...t) {
    console.log(...t);
}
function Lr(t, ...e) {
    Xn.warn() && console.warn(`${ot.warn} ${t}`, ...e);
}
function zs(t, ...e) {
    console.info(`${ot.info} ${t}`, ...e);
}
function Ys(t, ...e) {
    console.error(`${ot.error} ${t}`, ...e);
}
function Xs(t, ...e) {
    console.log(`${ot.query} ${t}`, ...e);
}
u();
c();
m();
p();
d();
l();
function Bt(t, e) {
    if (!t) throw new Error(`${e}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
}
u();
c();
m();
p();
d();
l();
function Ie(t, e) {
    throw new Error(e);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Fr({ onlyFirst: t = !1 } = {}) {
    let r = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
    ].join("|");
    return new RegExp(r, t ? void 0 : "g");
}
var Zs = Fr();
function Ur(t) {
    if (typeof t != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);
    return t.replace(Zs, "");
}
u();
c();
m();
p();
d();
l();
function Nr(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
}
u();
c();
m();
p();
d();
l();
function Vt(t, e) {
    let r = {};
    for (let n of Object.keys(t))r[n] = e(t[n], n);
    return r;
}
u();
c();
m();
p();
d();
l();
function qr(t, e) {
    if (t.length === 0) return;
    let r = t[0];
    for(let n = 1; n < t.length; n++)e(r, t[n]) < 0 && (r = t[n]);
    return r;
}
u();
c();
m();
p();
d();
l();
function re(t, e) {
    Object.defineProperty(t, "name", {
        value: e,
        configurable: !0
    });
}
u();
c();
m();
p();
d();
l();
var Zn = new Set, at = (t, e, ...r)=>{
    Zn.has(t) || (Zn.add(t), Lr(e, ...r));
};
var I = class t extends Error {
    constructor(e, r, n){
        super(e), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(t);
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
    }
};
re(I, "PrismaClientInitializationError");
u();
c();
m();
p();
d();
l();
var Z = class extends Error {
    constructor(e, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }){
        super(e), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", {
            value: o,
            enumerable: !1,
            writable: !0
        });
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
    }
};
re(Z, "PrismaClientKnownRequestError");
u();
c();
m();
p();
d();
l();
var xe = class extends Error {
    constructor(e, r){
        super(e), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
    }
};
re(xe, "PrismaClientRustPanicError");
u();
c();
m();
p();
d();
l();
var Q = class extends Error {
    constructor(e, { clientVersion: r, batchRequestIdx: n }){
        super(e), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", {
            value: n,
            writable: !0,
            enumerable: !1
        });
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
    }
};
re(Q, "PrismaClientUnknownRequestError");
u();
c();
m();
p();
d();
l();
var K = class extends Error {
    constructor(e, { clientVersion: r }){
        var _temp;
        _temp = super(e), this.name = "PrismaClientValidationError", _temp, this.clientVersion = r;
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
    }
};
re(K, "PrismaClientValidationError");
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var me = class {
    get(e) {
        return this._map.get(e)?.value;
    }
    set(e, r) {
        this._map.set(e, {
            value: r
        });
    }
    getOrCreate(e, r) {
        let n = this._map.get(e);
        if (n) return n.value;
        let i = r();
        return this.set(e, i), i;
    }
    constructor(){
        this._map = new Map;
    }
};
u();
c();
m();
p();
d();
l();
function ve(t) {
    return t.substring(0, 1).toLowerCase() + t.substring(1);
}
u();
c();
m();
p();
d();
l();
function ti(t, e) {
    let r = {};
    for (let n of t){
        let i = n[e];
        r[i] = n;
    }
    return r;
}
u();
c();
m();
p();
d();
l();
function lt(t) {
    let e;
    return {
        get () {
            return e || (e = {
                value: t()
            }), e.value;
        }
    };
}
u();
c();
m();
p();
d();
l();
function ri(t) {
    return {
        models: Br(t.models),
        enums: Br(t.enums),
        types: Br(t.types)
    };
}
function Br(t) {
    let e = {};
    for (let { name: r, ...n } of t)e[r] = n;
    return e;
}
u();
c();
m();
p();
d();
l();
function qe(t) {
    return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
}
function jt(t) {
    return t.toString() !== "Invalid Date";
}
u();
c();
m();
p();
d();
l();
l();
function Be(t) {
    return v.isDecimal(t) ? !0 : t !== null && typeof t == "object" && typeof t.s == "number" && typeof t.e == "number" && typeof t.toFixed == "function" && Array.isArray(t.d);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var ct = {};
rt(ct, {
    ModelAction: ()=>ut,
    datamodelEnumToSchemaEnum: ()=>ea
});
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function ea(t) {
    return {
        name: t.name,
        values: t.values.map((e)=>e.name)
    };
}
u();
c();
m();
p();
d();
l();
var ut = ((F)=>(F.findUnique = "findUnique", F.findUniqueOrThrow = "findUniqueOrThrow", F.findFirst = "findFirst", F.findFirstOrThrow = "findFirstOrThrow", F.findMany = "findMany", F.create = "create", F.createMany = "createMany", F.createManyAndReturn = "createManyAndReturn", F.update = "update", F.updateMany = "updateMany", F.updateManyAndReturn = "updateManyAndReturn", F.upsert = "upsert", F.delete = "delete", F.deleteMany = "deleteMany", F.groupBy = "groupBy", F.count = "count", F.aggregate = "aggregate", F.findRaw = "findRaw", F.aggregateRaw = "aggregateRaw", F))(ut || {});
var ta = kt(Yn());
var ra = {
    red: Ue,
    gray: Fn,
    dim: Lt,
    bold: _t,
    underline: Dn,
    highlightSource: (t)=>t.highlight()
}, na = {
    red: (t)=>t,
    gray: (t)=>t,
    dim: (t)=>t,
    bold: (t)=>t,
    underline: (t)=>t,
    highlightSource: (t)=>t
};
function ia({ message: t, originalMethod: e, isPanic: r, callArguments: n }) {
    return {
        functionName: `prisma.${e}()`,
        message: t,
        isPanic: r ?? !1,
        callArguments: n
    };
}
function oa({ functionName: t, location: e, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
    let a = [
        ""
    ], f = e ? " in" : ":";
    if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${t}\``)} invocation${f}`))) : a.push(s.red(`Invalid ${s.bold(`\`${t}\``)} invocation${f}`)), e && a.push(s.underline(sa(e))), i) {
        a.push("");
        let h = [
            i.toString()
        ];
        o && (h.push(o), h.push(s.dim(")"))), a.push(h.join("")), o && a.push("");
    } else a.push(""), o && a.push(o), a.push("");
    return a.push(r), a.join(`
`);
}
function sa(t) {
    let e = [
        t.fileName
    ];
    return t.lineNumber && e.push(String(t.lineNumber)), t.columnNumber && e.push(String(t.columnNumber)), e.join(":");
}
function $t(t) {
    let e = t.showColors ? ra : na, r;
    return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(t, e) : r = ia(t), oa(r, e);
}
u();
c();
m();
p();
d();
l();
var mi = kt(Vr());
u();
c();
m();
p();
d();
l();
function si(t, e, r) {
    let n = ai(t), i = aa(n), o = ua(i);
    o ? Qt(o, e, r) : e.addErrorMessage(()=>"Unknown error");
}
function ai(t) {
    return t.errors.flatMap((e)=>e.kind === "Union" ? ai(e) : [
            e
        ]);
}
function aa(t) {
    let e = new Map, r = [];
    for (let n of t){
        if (n.kind !== "InvalidArgumentType") {
            r.push(n);
            continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = e.get(i);
        o ? e.set(i, {
            ...n,
            argument: {
                ...n.argument,
                typeNames: la(o.argument.typeNames, n.argument.typeNames)
            }
        }) : e.set(i, n);
    }
    return r.push(...e.values()), r;
}
function la(t, e) {
    return [
        ...new Set(t.concat(e))
    ];
}
function ua(t) {
    return qr(t, (e, r)=>{
        let n = ii(e), i = ii(r);
        return n !== i ? n - i : oi(e) - oi(r);
    });
}
function ii(t) {
    let e = 0;
    return Array.isArray(t.selectionPath) && (e += t.selectionPath.length), Array.isArray(t.argumentPath) && (e += t.argumentPath.length), e;
}
function oi(t) {
    switch(t.kind){
        case "InvalidArgumentValue":
        case "ValueTooLarge":
            return 20;
        case "InvalidArgumentType":
            return 10;
        case "RequiredArgumentMissing":
            return -10;
        default:
            return 0;
    }
}
u();
c();
m();
p();
d();
l();
var ne = class {
    constructor(e, r){
        this.isRequired = !1;
        this.name = e;
        this.value = r;
    }
    makeRequired() {
        return this.isRequired = !0, this;
    }
    write(e) {
        let { colors: { green: r } } = e.context;
        e.addMarginSymbol(r(this.isRequired ? "+" : "?")), e.write(r(this.name)), this.isRequired || e.write(r("?")), e.write(r(": ")), typeof this.value == "string" ? e.write(r(this.value)) : e.write(this.value);
    }
};
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
ui();
u();
c();
m();
p();
d();
l();
var Ve = class {
    constructor(e = 0, r){
        this.lines = [];
        this.currentLine = "";
        this.currentIndent = 0;
        this.context = r;
        this.currentIndent = e;
    }
    write(e) {
        return typeof e == "string" ? this.currentLine += e : e.write(this), this;
    }
    writeJoined(e, r, n = (i, o)=>o.write(i)) {
        let i = r.length - 1;
        for(let o = 0; o < r.length; o++)n(r[o], this), o !== i && this.write(e);
        return this;
    }
    writeLine(e) {
        return this.write(e).newLine();
    }
    newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let e = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, e?.(), this;
    }
    withIndent(e) {
        return this.indent(), e(this), this.unindent(), this;
    }
    afterNextNewline(e) {
        return this.afterNextNewLineCallback = e, this;
    }
    indent() {
        return this.currentIndent++, this;
    }
    unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
    }
    addMarginSymbol(e) {
        return this.marginSymbol = e, this;
    }
    toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
    }
    getCurrentLineLength() {
        return this.currentLine.length;
    }
    indentedCurrentLine() {
        let e = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + e.slice(1) : e;
    }
};
li();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Jt = class {
    constructor(e){
        this.value = e;
    }
    write(e) {
        e.write(this.value);
    }
    markAsError() {
        this.value.markAsError();
    }
};
u();
c();
m();
p();
d();
l();
var Gt = (t)=>t, Wt = {
    bold: Gt,
    red: Gt,
    green: Gt,
    dim: Gt,
    enabled: !1
}, ci = {
    bold: _t,
    red: Ue,
    green: In,
    dim: Lt,
    enabled: !0
}, je = {
    write (t) {
        t.writeLine(",");
    }
};
u();
c();
m();
p();
d();
l();
var pe = class {
    constructor(e){
        this.isUnderlined = !1;
        this.color = (e)=>e;
        this.contents = e;
    }
    underline() {
        return this.isUnderlined = !0, this;
    }
    setColor(e) {
        return this.color = e, this;
    }
    write(e) {
        let r = e.getCurrentLineLength();
        e.write(this.color(this.contents)), this.isUnderlined && e.afterNextNewline(()=>{
            e.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
    }
};
u();
c();
m();
p();
d();
l();
var Te = class {
    markAsError() {
        return this.hasError = !0, this;
    }
    constructor(){
        this.hasError = !1;
    }
};
var $e = class extends Te {
    addItem(e) {
        return this.items.push(new Jt(e)), this;
    }
    getField(e) {
        return this.items[e];
    }
    getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((r)=>r.value.getPrintWidth())) + 2;
    }
    write(e) {
        if (this.items.length === 0) {
            this.writeEmpty(e);
            return;
        }
        this.writeWithItems(e);
    }
    writeEmpty(e) {
        let r = new pe("[]");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
    }
    writeWithItems(e) {
        let { colors: r } = e.context;
        e.writeLine("[").withIndent(()=>e.writeJoined(je, this.items).newLine()).write("]"), this.hasError && e.afterNextNewline(()=>{
            e.writeLine(r.red("~".repeat(this.getPrintWidth())));
        });
    }
    asObject() {}
    constructor(...args){
        super(...args);
        this.items = [];
    }
};
var Qe = class t extends Te {
    addField(e) {
        this.fields[e.name] = e;
    }
    addSuggestion(e) {
        this.suggestions.push(e);
    }
    getField(e) {
        return this.fields[e];
    }
    getDeepField(e) {
        let [r, ...n] = e, i = this.getField(r);
        if (!i) return;
        let o = i;
        for (let s of n){
            let a;
            if (o.value instanceof t ? a = o.value.getField(s) : o.value instanceof $e && (a = o.value.getField(Number(s))), !a) return;
            o = a;
        }
        return o;
    }
    getDeepFieldValue(e) {
        return e.length === 0 ? this : this.getDeepField(e)?.value;
    }
    hasField(e) {
        return !!this.getField(e);
    }
    removeAllFields() {
        this.fields = {};
    }
    removeField(e) {
        delete this.fields[e];
    }
    getFields() {
        return this.fields;
    }
    isEmpty() {
        return Object.keys(this.fields).length === 0;
    }
    getFieldValue(e) {
        return this.getField(e)?.value;
    }
    getDeepSubSelectionValue(e) {
        let r = this;
        for (let n of e){
            if (!(r instanceof t)) return;
            let i = r.getSubSelectionValue(n);
            if (!i) return;
            r = i;
        }
        return r;
    }
    getDeepSelectionParent(e) {
        let r = this.getSelectionParent();
        if (!r) return;
        let n = r;
        for (let i of e){
            let o = n.value.getFieldValue(i);
            if (!o || !(o instanceof t)) return;
            let s = o.getSelectionParent();
            if (!s) return;
            n = s;
        }
        return n;
    }
    getSelectionParent() {
        let e = this.getField("select")?.value.asObject();
        if (e) return {
            kind: "select",
            value: e
        };
        let r = this.getField("include")?.value.asObject();
        if (r) return {
            kind: "include",
            value: r
        };
    }
    getSubSelectionValue(e) {
        return this.getSelectionParent()?.value.fields[e].value;
    }
    getPrintWidth() {
        let e = Object.values(this.fields);
        return e.length == 0 ? 2 : Math.max(...e.map((n)=>n.getPrintWidth())) + 2;
    }
    write(e) {
        let r = Object.values(this.fields);
        if (r.length === 0 && this.suggestions.length === 0) {
            this.writeEmpty(e);
            return;
        }
        this.writeWithContents(e, r);
    }
    asObject() {
        return this;
    }
    writeEmpty(e) {
        let r = new pe("{}");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
    }
    writeWithContents(e, r) {
        e.writeLine("{").withIndent(()=>{
            e.writeJoined(je, [
                ...r,
                ...this.suggestions
            ]).newLine();
        }), e.write("}"), this.hasError && e.afterNextNewline(()=>{
            e.writeLine(e.context.colors.red("~".repeat(this.getPrintWidth())));
        });
    }
    constructor(...args){
        super(...args);
        this.fields = {};
        this.suggestions = [];
    }
};
u();
c();
m();
p();
d();
l();
var W = class extends Te {
    constructor(r){
        super();
        this.text = r;
    }
    getPrintWidth() {
        return this.text.length;
    }
    write(r) {
        let n = new pe(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
    }
    asObject() {}
};
u();
c();
m();
p();
d();
l();
var mt = class {
    addField(e, r) {
        return this.fields.push({
            write (n) {
                let { green: i, dim: o } = n.context.colors;
                n.write(i(o(`${e}: ${r}`))).addMarginSymbol(i(o("+")));
            }
        }), this;
    }
    write(e) {
        let { colors: { green: r } } = e.context;
        e.writeLine(r("{")).withIndent(()=>{
            e.writeJoined(je, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
    }
    constructor(){
        this.fields = [];
    }
};
function Qt(t, e, r) {
    switch(t.kind){
        case "MutuallyExclusiveFields":
            ca(t, e);
            break;
        case "IncludeOnScalar":
            ma(t, e);
            break;
        case "EmptySelection":
            pa(t, e, r);
            break;
        case "UnknownSelectionField":
            ya(t, e);
            break;
        case "InvalidSelectionValue":
            ha(t, e);
            break;
        case "UnknownArgument":
            ba(t, e);
            break;
        case "UnknownInputField":
            wa(t, e);
            break;
        case "RequiredArgumentMissing":
            xa(t, e);
            break;
        case "InvalidArgumentType":
            Ea(t, e);
            break;
        case "InvalidArgumentValue":
            Pa(t, e);
            break;
        case "ValueTooLarge":
            va(t, e);
            break;
        case "SomeFieldsMissing":
            Ta(t, e);
            break;
        case "TooManyFieldsGiven":
            Ca(t, e);
            break;
        case "Union":
            si(t, e, r);
            break;
        default:
            throw new Error("not implemented: " + t.kind);
    }
}
function ca(t, e) {
    let r = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
    r && (r.getField(t.firstField)?.markAsError(), r.getField(t.secondField)?.markAsError()), e.addErrorMessage((n)=>`Please ${n.bold("either")} use ${n.green(`\`${t.firstField}\``)} or ${n.green(`\`${t.secondField}\``)}, but ${n.red("not both")} at the same time.`);
}
function ma(t, e) {
    let [r, n] = Je(t.selectionPath), i = t.outputType, o = e.arguments.getDeepSelectionParent(r)?.value;
    if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields)s.isRelation && o.addSuggestion(new ne(s.name, "true"));
    e.addErrorMessage((s)=>{
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${pt(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
    });
}
function pa(t, e, r) {
    let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
    if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
            da(t, e, i);
            return;
        }
        if (n.hasField("select")) {
            fa(t, e);
            return;
        }
    }
    if (r?.[ve(t.outputType.name)]) {
        ga(t, e);
        return;
    }
    e.addErrorMessage(()=>`Unknown field at "${t.selectionPath.join(".")} selection"`);
}
function da(t, e, r) {
    r.removeAllFields();
    for (let n of t.outputType.fields)r.addSuggestion(new ne(n.name, "false"));
    e.addErrorMessage((n)=>`The ${n.red("omit")} statement includes every field of the model ${n.bold(t.outputType.name)}. At least one field must be included in the result`);
}
function fa(t, e) {
    let r = t.outputType, n = e.arguments.getDeepSelectionParent(t.selectionPath)?.value, i = n?.isEmpty() ?? !1;
    n && (n.removeAllFields(), fi(n, r)), e.addErrorMessage((o)=>i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${pt(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
}
function ga(t, e) {
    let r = new mt;
    for (let i of t.outputType.fields)i.isRelation || r.addField(i.name, "false");
    let n = new ne("omit", r).makeRequired();
    if (t.selectionPath.length === 0) e.arguments.addSuggestion(n);
    else {
        let [i, o] = Je(t.selectionPath), a = e.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
            let f = a?.value.asObject() ?? new Qe;
            f.addSuggestion(n), a.value = f;
        }
    }
    e.addErrorMessage((i)=>`The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(t.outputType.name)}. At least one field must be included in the result`);
}
function ya(t, e) {
    let r = gi(t.selectionPath, e);
    if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch(r.parentKind){
            case "select":
                fi(n, t.outputType);
                break;
            case "include":
                Aa(n, t.outputType);
                break;
            case "omit":
                Ra(n, t.outputType);
                break;
        }
    }
    e.addErrorMessage((n)=>{
        let i = [
            `Unknown field ${n.red(`\`${r.fieldName}\``)}`
        ];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${t.outputType.name}\``)}.`), i.push(pt(n)), i.join(" ");
    });
}
function ha(t, e) {
    let r = gi(t.selectionPath, e);
    r.parentKind !== "unknown" && r.field.value.markAsError(), e.addErrorMessage((n)=>`Invalid value for selection field \`${n.red(r.fieldName)}\`: ${t.underlyingError}`);
}
function ba(t, e) {
    let r = t.argumentPath[0], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
    n && (n.getField(r)?.markAsError(), Sa(n, t.arguments)), e.addErrorMessage((i)=>pi(i, r, t.arguments.map((o)=>o.name)));
}
function wa(t, e) {
    let [r, n] = Je(t.argumentPath), i = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
    if (i) {
        i.getDeepField(t.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && yi(o, t.inputType);
    }
    e.addErrorMessage((o)=>pi(o, n, t.inputType.fields.map((s)=>s.name)));
}
function pi(t, e, r) {
    let n = [
        `Unknown argument \`${t.red(e)}\`.`
    ], i = ka(e, r);
    return i && n.push(`Did you mean \`${t.green(i)}\`?`), r.length > 0 && n.push(pt(t)), n.join(" ");
}
function xa(t, e) {
    let r;
    e.addErrorMessage((f)=>r?.value instanceof W && r.value.text === "null" ? `Argument \`${f.green(o)}\` must not be ${f.red("null")}.` : `Argument \`${f.green(o)}\` is missing.`);
    let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
    if (!n) return;
    let [i, o] = Je(t.argumentPath), s = new mt, a = n.getDeepFieldValue(i)?.asObject();
    if (a) {
        if (r = a.getField(o), r && a.removeField(o), t.inputTypes.length === 1 && t.inputTypes[0].kind === "object") {
            for (let f of t.inputTypes[0].fields)s.addField(f.name, f.typeNames.join(" | "));
            a.addSuggestion(new ne(o, s).makeRequired());
        } else {
            let f = t.inputTypes.map(di).join(" | ");
            a.addSuggestion(new ne(o, f).makeRequired());
        }
        if (t.dependentArgumentPath) {
            n.getDeepField(t.dependentArgumentPath)?.markAsError();
            let [, f] = Je(t.dependentArgumentPath);
            e.addErrorMessage((h)=>`Argument \`${h.green(o)}\` is required because argument \`${h.green(f)}\` was provided.`);
        }
    }
}
function di(t) {
    return t.kind === "list" ? `${di(t.elementType)}[]` : t.name;
}
function Ea(t, e) {
    let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
    n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i)=>{
        let o = Kt("or", t.argument.typeNames.map((s)=>i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(t.inferredType)}.`;
    });
}
function Pa(t, e) {
    let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
    n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i)=>{
        let o = [
            `Invalid value for argument \`${i.bold(r)}\``
        ];
        if (t.underlyingError && o.push(`: ${t.underlyingError}`), o.push("."), t.argument.typeNames.length > 0) {
            let s = Kt("or", t.argument.typeNames.map((a)=>i.green(a)));
            o.push(` Expected ${s}.`);
        }
        return o.join("");
    });
}
function va(t, e) {
    let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i;
    if (n) {
        let s = n.getDeepField(t.argumentPath)?.value;
        s?.markAsError(), s instanceof W && (i = s.text);
    }
    e.addErrorMessage((o)=>{
        let s = [
            "Unable to fit value"
        ];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
    });
}
function Ta(t, e) {
    let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
    if (n) {
        let i = n.getDeepFieldValue(t.argumentPath)?.asObject();
        i && yi(i, t.inputType);
    }
    e.addErrorMessage((i)=>{
        let o = [
            `Argument \`${i.bold(r)}\` of type ${i.bold(t.inputType.name)} needs`
        ];
        return t.constraints.minFieldCount === 1 ? t.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Kt("or", t.constraints.requiredFields.map((s)=>`\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${t.constraints.minFieldCount}`)} arguments.`), o.push(pt(i)), o.join(" ");
    });
}
function Ca(t, e) {
    let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i = [];
    if (n) {
        let o = n.getDeepFieldValue(t.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
    }
    e.addErrorMessage((o)=>{
        let s = [
            `Argument \`${o.bold(r)}\` of type ${o.bold(t.inputType.name)} needs`
        ];
        return t.constraints.minFieldCount === 1 && t.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : t.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${t.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Kt("and", i.map((a)=>o.red(a)))}. Please choose`), t.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${t.constraints.maxFieldCount}.`), s.join(" ");
    });
}
function fi(t, e) {
    for (let r of e.fields)t.hasField(r.name) || t.addSuggestion(new ne(r.name, "true"));
}
function Aa(t, e) {
    for (let r of e.fields)r.isRelation && !t.hasField(r.name) && t.addSuggestion(new ne(r.name, "true"));
}
function Ra(t, e) {
    for (let r of e.fields)!t.hasField(r.name) && !r.isRelation && t.addSuggestion(new ne(r.name, "true"));
}
function Sa(t, e) {
    for (let r of e)t.hasField(r.name) || t.addSuggestion(new ne(r.name, r.typeNames.join(" | ")));
}
function gi(t, e) {
    let [r, n] = Je(t), i = e.arguments.getDeepSubSelectionValue(r)?.asObject();
    if (!i) return {
        parentKind: "unknown",
        fieldName: n
    };
    let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), f = o?.getField(n);
    return o && f ? {
        parentKind: "select",
        parent: o,
        field: f,
        fieldName: n
    } : (f = s?.getField(n), s && f ? {
        parentKind: "include",
        field: f,
        parent: s,
        fieldName: n
    } : (f = a?.getField(n), a && f ? {
        parentKind: "omit",
        field: f,
        parent: a,
        fieldName: n
    } : {
        parentKind: "unknown",
        fieldName: n
    }));
}
function yi(t, e) {
    if (e.kind === "object") for (let r of e.fields)t.hasField(r.name) || t.addSuggestion(new ne(r.name, r.typeNames.join(" | ")));
}
function Je(t) {
    let e = [
        ...t
    ], r = e.pop();
    if (!r) throw new Error("unexpected empty path");
    return [
        e,
        r
    ];
}
function pt({ green: t, enabled: e }) {
    return "Available options are " + (e ? `listed in ${t("green")}` : "marked with ?") + ".";
}
function Kt(t, e) {
    if (e.length === 1) return e[0];
    let r = [
        ...e
    ], n = r.pop();
    return `${r.join(", ")} ${t} ${n}`;
}
var Oa = 3;
function ka(t, e) {
    let r = 1 / 0, n;
    for (let i of e){
        let o = (0, mi.default)(t, i);
        o > Oa || o < r && (r = o, n = i);
    }
    return n;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var dt = class {
    constructor(e, r, n, i, o){
        this.modelName = e, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
    }
    _toGraphQLInputType() {
        let e = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${e}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
    }
};
function Ge(t) {
    return t instanceof dt;
}
u();
c();
m();
p();
d();
l();
var Ht = Symbol(), $r = new WeakMap, Ee = class {
    constructor(e){
        e === Ht ? $r.set(this, `Prisma.${this._getName()}`) : $r.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
    }
    _getName() {
        return this.constructor.name;
    }
    toString() {
        return $r.get(this);
    }
}, ft = class extends Ee {
    _getNamespace() {
        return "NullTypes";
    }
}, gt = class extends ft {
    #e;
};
Qr(gt, "DbNull");
var yt = class extends ft {
    #e;
};
Qr(yt, "JsonNull");
var ht = class extends ft {
    #e;
};
Qr(ht, "AnyNull");
var zt = {
    classes: {
        DbNull: gt,
        JsonNull: yt,
        AnyNull: ht
    },
    instances: {
        DbNull: new gt(Ht),
        JsonNull: new yt(Ht),
        AnyNull: new ht(Ht)
    }
};
function Qr(t, e) {
    Object.defineProperty(t, "name", {
        value: e,
        configurable: !0
    });
}
u();
c();
m();
p();
d();
l();
var hi = ": ", Yt = class {
    constructor(e, r){
        this.hasError = !1;
        this.name = e;
        this.value = r;
    }
    markAsError() {
        this.hasError = !0;
    }
    getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + hi.length;
    }
    write(e) {
        let r = new pe(this.name);
        this.hasError && r.underline().setColor(e.context.colors.red), e.write(r).write(hi).write(this.value);
    }
};
var Jr = class {
    constructor(e){
        this.errorMessages = [];
        this.arguments = e;
    }
    write(e) {
        e.write(this.arguments);
    }
    addErrorMessage(e) {
        this.errorMessages.push(e);
    }
    renderAllMessages(e) {
        return this.errorMessages.map((r)=>r(e)).join(`
`);
    }
};
function We(t) {
    return new Jr(bi(t));
}
function bi(t) {
    let e = new Qe;
    for (let [r, n] of Object.entries(t)){
        let i = new Yt(r, wi(n));
        e.addField(i);
    }
    return e;
}
function wi(t) {
    if (typeof t == "string") return new W(JSON.stringify(t));
    if (typeof t == "number" || typeof t == "boolean") return new W(String(t));
    if (typeof t == "bigint") return new W(`${t}n`);
    if (t === null) return new W("null");
    if (t === void 0) return new W("undefined");
    if (Be(t)) return new W(`new Prisma.Decimal("${t.toFixed()}")`);
    if (t instanceof Uint8Array) return b.isBuffer(t) ? new W(`Buffer.alloc(${t.byteLength})`) : new W(`new Uint8Array(${t.byteLength})`);
    if (t instanceof Date) {
        let e = jt(t) ? t.toISOString() : "Invalid Date";
        return new W(`new Date("${e}")`);
    }
    return t instanceof Ee ? new W(`Prisma.${t._getName()}`) : Ge(t) ? new W(`prisma.${ve(t.modelName)}.$fields.${t.name}`) : Array.isArray(t) ? Da(t) : typeof t == "object" ? bi(t) : new W(Object.prototype.toString.call(t));
}
function Da(t) {
    let e = new $e;
    for (let r of t)e.addItem(wi(r));
    return e;
}
function Xt(t, e) {
    let r = e === "pretty" ? ci : Wt, n = t.renderAllMessages(r), i = new Ve(0, {
        colors: r
    }).write(t).toString();
    return {
        message: n,
        args: i
    };
}
function Zt({ args: t, errors: e, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
    let a = We(t);
    for (let A of e)Qt(A, a, s);
    let { message: f, args: h } = Xt(a, r), C = $t({
        message: f,
        callsite: n,
        originalMethod: i,
        showColors: r === "pretty",
        callArguments: h
    });
    throw new K(C, {
        clientVersion: o
    });
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function de(t) {
    return t.replace(/^./, (e)=>e.toLowerCase());
}
u();
c();
m();
p();
d();
l();
function Ei(t, e, r) {
    let n = de(r);
    return !e.result || !(e.result.$allModels || e.result[n]) ? t : Ia({
        ...t,
        ...xi(e.name, t, e.result.$allModels),
        ...xi(e.name, t, e.result[n])
    });
}
function Ia(t) {
    let e = new me, r = (n, i)=>e.getOrCreate(n, ()=>i.has(n) ? [
                n
            ] : (i.add(n), t[n] ? t[n].needs.flatMap((o)=>r(o, i)) : [
                n
            ]));
    return Vt(t, (n)=>({
            ...n,
            needs: r(n.name, new Set)
        }));
}
function xi(t, e, r) {
    return r ? Vt(r, ({ needs: n, compute: i }, o)=>({
            name: o,
            needs: n ? Object.keys(n).filter((s)=>n[s]) : [],
            compute: Ma(e, o, i)
        })) : {};
}
function Ma(t, e, r) {
    let n = t?.[e]?.compute;
    return n ? (i)=>r({
            ...i,
            [e]: n(i)
        }) : r;
}
function Pi(t, e) {
    if (!e) return t;
    let r = {
        ...t
    };
    for (let n of Object.values(e))if (t[n.name]) for (let i of n.needs)r[i] = !0;
    return r;
}
function vi(t, e) {
    if (!e) return t;
    let r = {
        ...t
    };
    for (let n of Object.values(e))if (!t[n.name]) for (let i of n.needs)delete r[i];
    return r;
}
var er = class {
    constructor(e, r){
        this.computedFieldsCache = new me;
        this.modelExtensionsCache = new me;
        this.queryCallbacksCache = new me;
        this.clientExtensions = lt(()=>this.extension.client ? {
                ...this.previous?.getAllClientExtensions(),
                ...this.extension.client
            } : this.previous?.getAllClientExtensions());
        this.batchCallbacks = lt(()=>{
            let e = this.previous?.getAllBatchQueryCallbacks() ?? [], r = this.extension.query?.$__internalBatch;
            return r ? e.concat(r) : e;
        });
        this.extension = e;
        this.previous = r;
    }
    getAllComputedFields(e) {
        return this.computedFieldsCache.getOrCreate(e, ()=>Ei(this.previous?.getAllComputedFields(e), this.extension, e));
    }
    getAllClientExtensions() {
        return this.clientExtensions.get();
    }
    getAllModelExtensions(e) {
        return this.modelExtensionsCache.getOrCreate(e, ()=>{
            let r = de(e);
            return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(e) : {
                ...this.previous?.getAllModelExtensions(e),
                ...this.extension.model.$allModels,
                ...this.extension.model[r]
            };
        });
    }
    getAllQueryCallbacks(e, r) {
        return this.queryCallbacksCache.getOrCreate(`${e}:${r}`, ()=>{
            let n = this.previous?.getAllQueryCallbacks(e, r) ?? [], i = [], o = this.extension.query;
            return !o || !(o[e] || o.$allModels || o[r] || o.$allOperations) ? n : (o[e] !== void 0 && (o[e][r] !== void 0 && i.push(o[e][r]), o[e].$allOperations !== void 0 && i.push(o[e].$allOperations)), e !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
    }
    getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
    }
}, Ke = class t {
    constructor(e){
        this.head = e;
    }
    static empty() {
        return new t;
    }
    static single(e) {
        return new t(new er(e));
    }
    isEmpty() {
        return this.head === void 0;
    }
    append(e) {
        return new t(new er(e, this.head));
    }
    getAllComputedFields(e) {
        return this.head?.getAllComputedFields(e);
    }
    getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
    }
    getAllModelExtensions(e) {
        return this.head?.getAllModelExtensions(e);
    }
    getAllQueryCallbacks(e, r) {
        return this.head?.getAllQueryCallbacks(e, r) ?? [];
    }
    getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
    }
};
u();
c();
m();
p();
d();
l();
var tr = class {
    constructor(e){
        this.name = e;
    }
};
function Ti(t) {
    return t instanceof tr;
}
function Ci(t) {
    return new tr(t);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Ai = Symbol(), bt = class {
    constructor(e){
        if (e !== Ai) throw new Error("Skip instance can not be constructed directly");
    }
    ifUndefined(e) {
        return e === void 0 ? rr : e;
    }
}, rr = new bt(Ai);
function fe(t) {
    return t instanceof bt;
}
var _a = {
    findUnique: "findUnique",
    findUniqueOrThrow: "findUniqueOrThrow",
    findFirst: "findFirst",
    findFirstOrThrow: "findFirstOrThrow",
    findMany: "findMany",
    count: "aggregate",
    create: "createOne",
    createMany: "createMany",
    createManyAndReturn: "createManyAndReturn",
    update: "updateOne",
    updateMany: "updateMany",
    updateManyAndReturn: "updateManyAndReturn",
    upsert: "upsertOne",
    delete: "deleteOne",
    deleteMany: "deleteMany",
    executeRaw: "executeRaw",
    queryRaw: "queryRaw",
    aggregate: "aggregate",
    groupBy: "groupBy",
    runCommandRaw: "runCommandRaw",
    findRaw: "findRaw",
    aggregateRaw: "aggregateRaw"
}, Ri = "explicitly `undefined` values are not allowed";
function nr({ modelName: t, action: e, args: r, runtimeDataModel: n, extensions: i = Ke.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: f, previewFeatures: h, globalOmit: C }) {
    let A = new Gr({
        runtimeDataModel: n,
        modelName: t,
        action: e,
        rootArgs: r,
        callsite: o,
        extensions: i,
        selectionPath: [],
        argumentPath: [],
        originalMethod: s,
        errorFormat: a,
        clientVersion: f,
        previewFeatures: h,
        globalOmit: C
    });
    return {
        modelName: t,
        action: _a[e],
        query: wt(r, A)
    };
}
function wt({ select: t, include: e, ...r } = {}, n) {
    let i = r.omit;
    return delete r.omit, {
        arguments: Oi(r, n),
        selection: La(t, e, i, n)
    };
}
function La(t, e, r, n) {
    return t ? (e ? n.throwValidationError({
        kind: "MutuallyExclusiveFields",
        firstField: "include",
        secondField: "select",
        selectionPath: n.getSelectionPath()
    }) : r && n.throwValidationError({
        kind: "MutuallyExclusiveFields",
        firstField: "omit",
        secondField: "select",
        selectionPath: n.getSelectionPath()
    }), qa(t, n)) : Fa(n, e, r);
}
function Fa(t, e, r) {
    let n = {};
    return t.modelOrType && !t.isRawAction() && (n.$composites = !0, n.$scalars = !0), e && Ua(n, e, t), Na(n, r, t), n;
}
function Ua(t, e, r) {
    for (let [n, i] of Object.entries(e)){
        if (fe(i)) continue;
        let o = r.nestSelection(n);
        if (Wr(i, o), i === !1 || i === void 0) {
            t[n] = !1;
            continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({
            kind: "IncludeOnScalar",
            selectionPath: r.getSelectionPath().concat(n),
            outputType: r.getOutputTypeDescription()
        }), s) {
            t[n] = wt(i === !0 ? {} : i, o);
            continue;
        }
        if (i === !0) {
            t[n] = !0;
            continue;
        }
        t[n] = wt(i, o);
    }
}
function Na(t, e, r) {
    let n = r.getComputedFields(), i = {
        ...r.getGlobalOmit(),
        ...e
    }, o = vi(i, n);
    for (let [s, a] of Object.entries(o)){
        if (fe(a)) continue;
        Wr(a, r.nestSelection(s));
        let f = r.findField(s);
        n?.[s] && !f || (t[s] = !a);
    }
}
function qa(t, e) {
    let r = {}, n = e.getComputedFields(), i = Pi(t, n);
    for (let [o, s] of Object.entries(i)){
        if (fe(s)) continue;
        let a = e.nestSelection(o);
        Wr(s, a);
        let f = e.findField(o);
        if (!(n?.[o] && !f)) {
            if (s === !1 || s === void 0 || fe(s)) {
                r[o] = !1;
                continue;
            }
            if (s === !0) {
                f?.kind === "object" ? r[o] = wt({}, a) : r[o] = !0;
                continue;
            }
            r[o] = wt(s, a);
        }
    }
    return r;
}
function Si(t, e) {
    if (t === null) return null;
    if (typeof t == "string" || typeof t == "number" || typeof t == "boolean") return t;
    if (typeof t == "bigint") return {
        $type: "BigInt",
        value: String(t)
    };
    if (qe(t)) {
        if (jt(t)) return {
            $type: "DateTime",
            value: t.toISOString()
        };
        e.throwValidationError({
            kind: "InvalidArgumentValue",
            selectionPath: e.getSelectionPath(),
            argumentPath: e.getArgumentPath(),
            argument: {
                name: e.getArgumentName(),
                typeNames: [
                    "Date"
                ]
            },
            underlyingError: "Provided Date object is invalid"
        });
    }
    if (Ti(t)) return {
        $type: "Param",
        value: t.name
    };
    if (Ge(t)) return {
        $type: "FieldRef",
        value: {
            _ref: t.name,
            _container: t.modelName
        }
    };
    if (Array.isArray(t)) return Ba(t, e);
    if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return {
            $type: "Bytes",
            value: b.from(r, n, i).toString("base64")
        };
    }
    if (Va(t)) return t.values;
    if (Be(t)) return {
        $type: "Decimal",
        value: t.toFixed()
    };
    if (t instanceof Ee) {
        if (t !== zt.instances[t._getName()]) throw new Error("Invalid ObjectEnumValue");
        return {
            $type: "Enum",
            value: t._getName()
        };
    }
    if (ja(t)) return t.toJSON();
    if (typeof t == "object") return Oi(t, e);
    e.throwValidationError({
        kind: "InvalidArgumentValue",
        selectionPath: e.getSelectionPath(),
        argumentPath: e.getArgumentPath(),
        argument: {
            name: e.getArgumentName(),
            typeNames: []
        },
        underlyingError: `We could not serialize ${Object.prototype.toString.call(t)} value. Serialize the object to JSON or implement a ".toJSON()" method on it`
    });
}
function Oi(t, e) {
    if (t.$type) return {
        $type: "Raw",
        value: t
    };
    let r = {};
    for(let n in t){
        let i = t[n], o = e.nestArgument(n);
        fe(i) || (i !== void 0 ? r[n] = Si(i, o) : e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({
            kind: "InvalidArgumentValue",
            argumentPath: o.getArgumentPath(),
            selectionPath: e.getSelectionPath(),
            argument: {
                name: e.getArgumentName(),
                typeNames: []
            },
            underlyingError: Ri
        }));
    }
    return r;
}
function Ba(t, e) {
    let r = [];
    for(let n = 0; n < t.length; n++){
        let i = e.nestArgument(String(n)), o = t[n];
        if (o === void 0 || fe(o)) {
            let s = o === void 0 ? "undefined" : "Prisma.skip";
            e.throwValidationError({
                kind: "InvalidArgumentValue",
                selectionPath: i.getSelectionPath(),
                argumentPath: i.getArgumentPath(),
                argument: {
                    name: `${e.getArgumentName()}[${n}]`,
                    typeNames: []
                },
                underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values`
            });
        }
        r.push(Si(o, i));
    }
    return r;
}
function Va(t) {
    return typeof t == "object" && t !== null && t.__prismaRawParameters__ === !0;
}
function ja(t) {
    return typeof t == "object" && t !== null && typeof t.toJSON == "function";
}
function Wr(t, e) {
    t === void 0 && e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({
        kind: "InvalidSelectionValue",
        selectionPath: e.getSelectionPath(),
        underlyingError: Ri
    });
}
var Gr = class t {
    constructor(e){
        this.params = e;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
    }
    throwValidationError(e) {
        Zt({
            errors: [
                e
            ],
            originalMethod: this.params.originalMethod,
            args: this.params.rootArgs ?? {},
            callsite: this.params.callsite,
            errorFormat: this.params.errorFormat,
            clientVersion: this.params.clientVersion,
            globalOmit: this.params.globalOmit
        });
    }
    getSelectionPath() {
        return this.params.selectionPath;
    }
    getArgumentPath() {
        return this.params.argumentPath;
    }
    getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
    }
    getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return {
            name: this.params.modelName,
            fields: this.modelOrType.fields.map((e)=>({
                    name: e.name,
                    typeName: "boolean",
                    isRelation: e.kind === "object"
                }))
        };
    }
    isRawAction() {
        return [
            "executeRaw",
            "queryRaw",
            "runCommandRaw",
            "findRaw",
            "aggregateRaw"
        ].includes(this.params.action);
    }
    isPreviewFeatureOn(e) {
        return this.params.previewFeatures.includes(e);
    }
    getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
    }
    findField(e) {
        return this.modelOrType?.fields.find((r)=>r.name === e);
    }
    nestSelection(e) {
        let r = this.findField(e), n = r?.kind === "object" ? r.type : void 0;
        return new t({
            ...this.params,
            modelName: n,
            selectionPath: this.params.selectionPath.concat(e)
        });
    }
    getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[ve(this.params.modelName)] ?? {} : {};
    }
    shouldApplyGlobalOmit() {
        switch(this.params.action){
            case "findFirst":
            case "findFirstOrThrow":
            case "findUniqueOrThrow":
            case "findMany":
            case "upsert":
            case "findUnique":
            case "createManyAndReturn":
            case "create":
            case "update":
            case "updateManyAndReturn":
            case "delete":
                return !0;
            case "executeRaw":
            case "aggregateRaw":
            case "runCommandRaw":
            case "findRaw":
            case "createMany":
            case "deleteMany":
            case "groupBy":
            case "updateMany":
            case "count":
            case "aggregate":
            case "queryRaw":
                return !1;
            default:
                Ie(this.params.action, "Unknown action");
        }
    }
    nestArgument(e) {
        return new t({
            ...this.params,
            argumentPath: this.params.argumentPath.concat(e)
        });
    }
};
u();
c();
m();
p();
d();
l();
function ki(t) {
    if (!t._hasPreviewFlag("metrics")) throw new K("`metrics` preview feature must be enabled in order to access metrics API", {
        clientVersion: t._clientVersion
    });
}
var He = class {
    constructor(e){
        this._client = e;
    }
    prometheus(e) {
        return ki(this._client), this._client._engine.metrics({
            format: "prometheus",
            ...e
        });
    }
    json(e) {
        return ki(this._client), this._client._engine.metrics({
            format: "json",
            ...e
        });
    }
};
u();
c();
m();
p();
d();
l();
function Di(t, e) {
    let r = lt(()=>$a(e));
    Object.defineProperty(t, "dmmf", {
        get: ()=>r.get()
    });
}
function $a(t) {
    throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
}
function Kr(t) {
    return Object.entries(t).map(([e, r])=>({
            name: e,
            ...r
        }));
}
u();
c();
m();
p();
d();
l();
var Hr = new WeakMap, ir = "$$PrismaTypedSql", xt = class {
    constructor(e, r){
        Hr.set(this, {
            sql: e,
            values: r
        }), Object.defineProperty(this, ir, {
            value: ir
        });
    }
    get sql() {
        return Hr.get(this).sql;
    }
    get values() {
        return Hr.get(this).values;
    }
};
function Ii(t) {
    return (...e)=>new xt(t, e);
}
function or(t) {
    return t != null && t[ir] === ir;
}
u();
c();
m();
p();
d();
l();
var Jo = kt(Mi());
u();
c();
m();
p();
d();
l();
_i();
Vn();
Gn();
u();
c();
m();
p();
d();
l();
var ee = class t {
    constructor(e, r){
        if (e.length - 1 !== r.length) throw e.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${e.length} strings to have ${e.length - 1} values`);
        let n = r.reduce((s, a)=>s + (a instanceof t ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = e[0];
        let i = 0, o = 0;
        for(; i < r.length;){
            let s = r[i++], a = e[i];
            if (s instanceof t) {
                this.strings[o] += s.strings[0];
                let f = 0;
                for(; f < s.values.length;)this.values[o++] = s.values[f++], this.strings[o] = s.strings[f];
                this.strings[o] += a;
            } else this.values[o++] = s, this.strings[o] = a;
        }
    }
    get sql() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for(; r < e;)n += `?${this.strings[r++]}`;
        return n;
    }
    get statement() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for(; r < e;)n += `:${r}${this.strings[r++]}`;
        return n;
    }
    get text() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for(; r < e;)n += `$${r}${this.strings[r++]}`;
        return n;
    }
    inspect() {
        return {
            sql: this.sql,
            statement: this.statement,
            text: this.text,
            values: this.values
        };
    }
};
function Li(t, e = ",", r = "", n = "") {
    if (t.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
    return new ee([
        r,
        ...Array(t.length - 1).fill(e),
        n
    ], t);
}
function zr(t) {
    return new ee([
        t
    ], []);
}
var Fi = zr("");
function Yr(t, ...e) {
    return new ee(t, e);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Et(t) {
    return {
        getKeys () {
            return Object.keys(t);
        },
        getPropertyValue (e) {
            return t[e];
        }
    };
}
u();
c();
m();
p();
d();
l();
function H(t, e) {
    return {
        getKeys () {
            return [
                t
            ];
        },
        getPropertyValue () {
            return e();
        }
    };
}
u();
c();
m();
p();
d();
l();
function Me(t) {
    let e = new me;
    return {
        getKeys () {
            return t.getKeys();
        },
        getPropertyValue (r) {
            return e.getOrCreate(r, ()=>t.getPropertyValue(r));
        },
        getPropertyDescriptor (r) {
            return t.getPropertyDescriptor?.(r);
        }
    };
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var ar = {
    enumerable: !0,
    configurable: !0,
    writable: !0
};
function lr(t) {
    let e = new Set(t);
    return {
        getPrototypeOf: ()=>Object.prototype,
        getOwnPropertyDescriptor: ()=>ar,
        has: (r, n)=>e.has(n),
        set: (r, n, i)=>e.add(n) && Reflect.set(r, n, i),
        ownKeys: ()=>[
                ...e
            ]
    };
}
var Ui = Symbol.for("nodejs.util.inspect.custom");
function ae(t, e) {
    let r = Ja(e), n = new Set, i = new Proxy(t, {
        get (o, s) {
            if (n.has(s)) return o[s];
            let a = r.get(s);
            return a ? a.getPropertyValue(s) : o[s];
        },
        has (o, s) {
            if (n.has(s)) return !0;
            let a = r.get(s);
            return a ? a.has?.(s) ?? !0 : Reflect.has(o, s);
        },
        ownKeys (o) {
            let s = Ni(Reflect.ownKeys(o), r), a = Ni(Array.from(r.keys()), r);
            return [
                ...new Set([
                    ...s,
                    ...a,
                    ...n
                ])
            ];
        },
        set (o, s, a) {
            return r.get(s)?.getPropertyDescriptor?.(s)?.writable === !1 ? !1 : (n.add(s), Reflect.set(o, s, a));
        },
        getOwnPropertyDescriptor (o, s) {
            let a = Reflect.getOwnPropertyDescriptor(o, s);
            if (a && !a.configurable) return a;
            let f = r.get(s);
            return f ? f.getPropertyDescriptor ? {
                ...ar,
                ...f?.getPropertyDescriptor(s)
            } : ar : a;
        },
        defineProperty (o, s, a) {
            return n.add(s), Reflect.defineProperty(o, s, a);
        },
        getPrototypeOf: ()=>Object.prototype
    });
    return i[Ui] = function() {
        let o = {
            ...this
        };
        return delete o[Ui], o;
    }, i;
}
function Ja(t) {
    let e = new Map;
    for (let r of t){
        let n = r.getKeys();
        for (let i of n)e.set(i, r);
    }
    return e;
}
function Ni(t, e) {
    return t.filter((r)=>e.get(r)?.has?.(r) ?? !0);
}
u();
c();
m();
p();
d();
l();
function ze(t) {
    return {
        getKeys () {
            return t;
        },
        has () {
            return !1;
        },
        getPropertyValue () {}
    };
}
u();
c();
m();
p();
d();
l();
function ur(t, e) {
    return {
        batch: t,
        transaction: e?.kind === "batch" ? {
            isolationLevel: e.options.isolationLevel
        } : void 0
    };
}
u();
c();
m();
p();
d();
l();
function qi(t) {
    if (t === void 0) return "";
    let e = We(t);
    return new Ve(0, {
        colors: Wt
    }).write(e).toString();
}
u();
c();
m();
p();
d();
l();
var Ga = "P2037";
function cr({ error: t, user_facing_error: e }, r, n) {
    return e.error_code ? new Z(Wa(e, n), {
        code: e.error_code,
        clientVersion: r,
        meta: e.meta,
        batchRequestIdx: e.batch_request_idx
    }) : new Q(t, {
        clientVersion: r,
        batchRequestIdx: e.batch_request_idx
    });
}
function Wa(t, e) {
    let r = t.message;
    return (e === "postgresql" || e === "postgres" || e === "mysql") && t.error_code === Ga && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Xr = class {
    getLocation() {
        return null;
    }
};
function Ce(t) {
    return typeof $EnabledCallSite == "function" && t !== "minimal" ? new $EnabledCallSite : new Xr;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Bi = {
    _avg: !0,
    _count: !0,
    _sum: !0,
    _min: !0,
    _max: !0
};
function Ye(t = {}) {
    let e = Ha(t);
    return Object.entries(e).reduce((n, [i, o])=>(Bi[i] !== void 0 ? n.select[i] = {
            select: o
        } : n[i] = o, n), {
        select: {}
    });
}
function Ha(t = {}) {
    return typeof t._count == "boolean" ? {
        ...t,
        _count: {
            _all: t._count
        }
    } : t;
}
function mr(t = {}) {
    return (e)=>(typeof t._count == "boolean" && (e._count = e._count._all), e);
}
function Vi(t, e) {
    let r = mr(t);
    return e({
        action: "aggregate",
        unpacker: r,
        argsMapper: Ye
    })(t);
}
u();
c();
m();
p();
d();
l();
function za(t = {}) {
    let { select: e, ...r } = t;
    return typeof e == "object" ? Ye({
        ...r,
        _count: e
    }) : Ye({
        ...r,
        _count: {
            _all: !0
        }
    });
}
function Ya(t = {}) {
    return typeof t.select == "object" ? (e)=>mr(t)(e)._count : (e)=>mr(t)(e)._count._all;
}
function ji(t, e) {
    return e({
        action: "count",
        unpacker: Ya(t),
        argsMapper: za
    })(t);
}
u();
c();
m();
p();
d();
l();
function Xa(t = {}) {
    let e = Ye(t);
    if (Array.isArray(e.by)) for (let r of e.by)typeof r == "string" && (e.select[r] = !0);
    else typeof e.by == "string" && (e.select[e.by] = !0);
    return e;
}
function Za(t = {}) {
    return (e)=>(typeof t?._count == "boolean" && e.forEach((r)=>{
            r._count = r._count._all;
        }), e);
}
function $i(t, e) {
    return e({
        action: "groupBy",
        unpacker: Za(t),
        argsMapper: Xa
    })(t);
}
function Qi(t, e, r) {
    if (e === "aggregate") return (n)=>Vi(n, r);
    if (e === "count") return (n)=>ji(n, r);
    if (e === "groupBy") return (n)=>$i(n, r);
}
u();
c();
m();
p();
d();
l();
function Ji(t, e) {
    let r = e.fields.filter((i)=>!i.relationName), n = ti(r, "name");
    return new Proxy({}, {
        get (i, o) {
            if (o in i || typeof o == "symbol") return i[o];
            let s = n[o];
            if (s) return new dt(t, o, s.type, s.isList, s.kind === "enum");
        },
        ...lr(Object.keys(n))
    });
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Gi = (t)=>Array.isArray(t) ? t : t.split("."), Zr = (t, e)=>Gi(e).reduce((r, n)=>r && r[n], t), Wi = (t, e, r)=>Gi(e).reduceRight((n, i, o, s)=>Object.assign({}, Zr(t, s.slice(0, o)), {
            [i]: n
        }), r);
function el(t, e) {
    return t === void 0 || e === void 0 ? [] : [
        ...e,
        "select",
        t
    ];
}
function tl(t, e, r) {
    return e === void 0 ? t ?? {} : Wi(e, r, t || !0);
}
function en(t, e, r, n, i, o) {
    let a = t._runtimeDataModel.models[e].fields.reduce((f, h)=>({
            ...f,
            [h.name]: h
        }), {});
    return (f)=>{
        let h = Ce(t._errorFormat), C = el(n, i), A = tl(f, o, C), k = r({
            dataPath: C,
            callsite: h
        })(A), R = rl(t, e);
        return new Proxy(k, {
            get (_, O) {
                if (!R.includes(O)) return _[O];
                let ye = [
                    a[O].type,
                    r,
                    O
                ], z = [
                    C,
                    A
                ];
                return en(t, ...ye, ...z);
            },
            ...lr([
                ...R,
                ...Object.getOwnPropertyNames(k)
            ])
        });
    };
}
function rl(t, e) {
    return t._runtimeDataModel.models[e].fields.filter((r)=>r.kind === "object").map((r)=>r.name);
}
var nl = [
    "findUnique",
    "findUniqueOrThrow",
    "findFirst",
    "findFirstOrThrow",
    "create",
    "update",
    "upsert",
    "delete"
], il = [
    "aggregate",
    "count",
    "groupBy"
];
function tn(t, e) {
    let r = t._extensions.getAllModelExtensions(e) ?? {}, n = [
        ol(t, e),
        al(t, e),
        Et(r),
        H("name", ()=>e),
        H("$name", ()=>e),
        H("$parent", ()=>t._appliedParent)
    ];
    return ae({}, n);
}
function ol(t, e) {
    let r = de(e), n = Object.keys(ut).concat("count");
    return {
        getKeys () {
            return n;
        },
        getPropertyValue (i) {
            let o = i, s = (a)=>(f)=>{
                    let h = Ce(t._errorFormat);
                    return t._createPrismaPromise((C)=>{
                        let A = {
                            args: f,
                            dataPath: [],
                            action: o,
                            model: e,
                            clientMethod: `${r}.${i}`,
                            jsModelName: r,
                            transaction: C,
                            callsite: h
                        };
                        return t._request({
                            ...A,
                            ...a
                        });
                    }, {
                        action: o,
                        args: f,
                        model: e
                    });
                };
            return nl.includes(o) ? en(t, e, s) : sl(i) ? Qi(t, i, s) : s({});
        }
    };
}
function sl(t) {
    return il.includes(t);
}
function al(t, e) {
    return Me(H("fields", ()=>{
        let r = t._runtimeDataModel.models[e];
        return Ji(e, r);
    }));
}
u();
c();
m();
p();
d();
l();
function Ki(t) {
    return t.replace(/^./, (e)=>e.toUpperCase());
}
var rn = Symbol();
function Pt(t) {
    let e = [
        ll(t),
        ul(t),
        H(rn, ()=>t),
        H("$parent", ()=>t._appliedParent)
    ], r = t._extensions.getAllClientExtensions();
    return r && e.push(Et(r)), ae(t, e);
}
function ll(t) {
    let e = Object.getPrototypeOf(t._originalClient), r = [
        ...new Set(Object.getOwnPropertyNames(e))
    ];
    return {
        getKeys () {
            return r;
        },
        getPropertyValue (n) {
            return t[n];
        }
    };
}
function ul(t) {
    let e = Object.keys(t._runtimeDataModel.models), r = e.map(de), n = [
        ...new Set(e.concat(r))
    ];
    return Me({
        getKeys () {
            return n;
        },
        getPropertyValue (i) {
            let o = Ki(i);
            if (t._runtimeDataModel.models[o] !== void 0) return tn(t, o);
            if (t._runtimeDataModel.models[i] !== void 0) return tn(t, i);
        },
        getPropertyDescriptor (i) {
            if (!r.includes(i)) return {
                enumerable: !1
            };
        }
    });
}
function Hi(t) {
    return t[rn] ? t[rn] : t;
}
function zi(t) {
    if (typeof t == "function") return t(this);
    if (t.client?.__AccelerateEngine) {
        let r = t.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
    }
    let e = Object.create(this._originalClient, {
        _extensions: {
            value: this._extensions.append(t)
        },
        _appliedParent: {
            value: this,
            configurable: !0
        },
        $on: {
            value: void 0
        }
    });
    return Pt(e);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Yi({ result: t, modelName: e, select: r, omit: n, extensions: i }) {
    let o = i.getAllComputedFields(e);
    if (!o) return t;
    let s = [], a = [];
    for (let f of Object.values(o)){
        if (n) {
            if (n[f.name]) continue;
            let h = f.needs.filter((C)=>n[C]);
            h.length > 0 && a.push(ze(h));
        } else if (r) {
            if (!r[f.name]) continue;
            let h = f.needs.filter((C)=>!r[C]);
            h.length > 0 && a.push(ze(h));
        }
        cl(t, f.needs) && s.push(ml(f, ae(t, s)));
    }
    return s.length > 0 || a.length > 0 ? ae(t, [
        ...s,
        ...a
    ]) : t;
}
function cl(t, e) {
    return e.every((r)=>Nr(t, r));
}
function ml(t, e) {
    return Me(H(t.name, ()=>t.compute(e)));
}
u();
c();
m();
p();
d();
l();
function pr({ visitor: t, result: e, args: r, runtimeDataModel: n, modelName: i }) {
    if (Array.isArray(e)) {
        for(let s = 0; s < e.length; s++)e[s] = pr({
            result: e[s],
            args: r,
            modelName: i,
            runtimeDataModel: n,
            visitor: t
        });
        return e;
    }
    let o = t(e, i, r) ?? e;
    return r.include && Xi({
        includeOrSelect: r.include,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: t
    }), r.select && Xi({
        includeOrSelect: r.select,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: t
    }), o;
}
function Xi({ includeOrSelect: t, result: e, parentModelName: r, runtimeDataModel: n, visitor: i }) {
    for (let [o, s] of Object.entries(t)){
        if (!s || e[o] == null || fe(s)) continue;
        let f = n.models[r].fields.find((C)=>C.name === o);
        if (!f || f.kind !== "object" || !f.relationName) continue;
        let h = typeof s == "object" ? s : {};
        e[o] = pr({
            visitor: i,
            result: e[o],
            args: h,
            modelName: f.type,
            runtimeDataModel: n
        });
    }
}
function Zi({ result: t, modelName: e, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
    return n.isEmpty() || t == null || typeof t != "object" || !i.models[e] ? t : pr({
        result: t,
        args: r ?? {},
        modelName: e,
        runtimeDataModel: i,
        visitor: (a, f, h)=>{
            let C = de(f);
            return Yi({
                result: a,
                modelName: C,
                select: h.select,
                omit: h.select ? void 0 : {
                    ...o?.[C],
                    ...h.omit
                },
                extensions: n
            });
        }
    });
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
l();
u();
c();
m();
p();
d();
l();
var pl = [
    "$connect",
    "$disconnect",
    "$on",
    "$transaction",
    "$extends"
], eo = pl;
function to(t) {
    if (t instanceof ee) return dl(t);
    if (or(t)) return fl(t);
    if (Array.isArray(t)) {
        let r = [
            t[0]
        ];
        for(let n = 1; n < t.length; n++)r[n] = vt(t[n]);
        return r;
    }
    let e = {};
    for(let r in t)e[r] = vt(t[r]);
    return e;
}
function dl(t) {
    return new ee(t.strings, t.values);
}
function fl(t) {
    return new xt(t.sql, t.values);
}
function vt(t) {
    if (typeof t != "object" || t == null || t instanceof Ee || Ge(t)) return t;
    if (Be(t)) return new be(t.toFixed());
    if (qe(t)) return new Date(+t);
    if (ArrayBuffer.isView(t)) return t.slice(0);
    if (Array.isArray(t)) {
        let e = t.length, r;
        for(r = Array(e); e--;)r[e] = vt(t[e]);
        return r;
    }
    if (typeof t == "object") {
        let e = {};
        for(let r in t)r === "__proto__" ? Object.defineProperty(e, r, {
            value: vt(t[r]),
            configurable: !0,
            enumerable: !0,
            writable: !0
        }) : e[r] = vt(t[r]);
        return e;
    }
    Ie(t, "Unknown value");
}
function no(t, e, r, n = 0) {
    return t._createPrismaPromise((i)=>{
        let o = e.customDataProxyFetch;
        return "transaction" in e && i !== void 0 && (e.transaction?.kind === "batch" && e.transaction.lock.then(), e.transaction = i), n === r.length ? t._executeRequest(e) : r[n]({
            model: e.model,
            operation: e.model ? e.action : e.clientMethod,
            args: to(e.args ?? {}),
            __internalParams: e,
            query: (s, a = e)=>{
                let f = a.customDataProxyFetch;
                return a.customDataProxyFetch = ao(o, f), a.args = s, no(t, a, r, n + 1);
            }
        });
    });
}
function io(t, e) {
    let { jsModelName: r, action: n, clientMethod: i } = e, o = r ? n : i;
    if (t._extensions.isEmpty()) return t._executeRequest(e);
    let s = t._extensions.getAllQueryCallbacks(r ?? "$none", o);
    return no(t, e, s);
}
function oo(t) {
    return (e)=>{
        let r = {
            requests: e
        }, n = e[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? so(r, n, 0, t) : t(r);
    };
}
function so(t, e, r, n) {
    if (r === e.length) return n(t);
    let i = t.customDataProxyFetch, o = t.requests[0].transaction;
    return e[r]({
        args: {
            queries: t.requests.map((s)=>({
                    model: s.modelName,
                    operation: s.action,
                    args: s.args
                })),
            transaction: o ? {
                isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0
            } : void 0
        },
        __internalParams: t,
        query (s, a = t) {
            let f = a.customDataProxyFetch;
            return a.customDataProxyFetch = ao(i, f), so(a, e, r + 1, n);
        }
    });
}
var ro = (t)=>t;
function ao(t = ro, e = ro) {
    return (r)=>t(e(r));
}
u();
c();
m();
p();
d();
l();
var lo = G("prisma:client"), uo = {
    Vercel: "vercel",
    "Netlify CI": "netlify"
};
function co({ postinstall: t, ciName: e, clientVersion: r, generator: n }) {
    if (lo("checkPlatformCaching:postinstall", t), lo("checkPlatformCaching:ciName", e), t === !0 && !(n?.output && typeof (n.output.fromEnvVar ?? n.output.value) == "string") && e && e in uo) {
        let i = `Prisma has detected that this project was built on ${e}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${uo[e]}-build`;
        throw console.error(i), new I(i, r);
    }
}
u();
c();
m();
p();
d();
l();
function mo(t, e) {
    return t ? t.datasources ? t.datasources : t.datasourceUrl ? {
        [e[0]]: {
            url: t.datasourceUrl
        }
    } : {} : {};
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
l();
u();
c();
m();
p();
d();
l();
l();
function po(t, e) {
    throw new Error(e);
}
function gl(t) {
    return t !== null && typeof t == "object" && typeof t.$type == "string";
}
function yl(t, e) {
    let r = {};
    for (let n of Object.keys(t))r[n] = e(t[n], n);
    return r;
}
function Xe(t) {
    return t === null ? t : Array.isArray(t) ? t.map(Xe) : typeof t == "object" ? gl(t) ? hl(t) : t.constructor !== null && t.constructor.name !== "Object" ? t : yl(t, Xe) : t;
}
function hl({ $type: t, value: e }) {
    switch(t){
        case "BigInt":
            return BigInt(e);
        case "Bytes":
            {
                let { buffer: r, byteOffset: n, byteLength: i } = b.from(e, "base64");
                return new Uint8Array(r, n, i);
            }
        case "DateTime":
            return new Date(e);
        case "Decimal":
            return new v(e);
        case "Json":
            return JSON.parse(e);
        default:
            po(e, "Unknown tagged value");
    }
}
var fo = "6.19.0";
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var wl = ()=>globalThis.process?.release?.name === "node", xl = ()=>!!globalThis.Bun || !!globalThis.process?.versions?.bun, El = ()=>!!globalThis.Deno, Pl = ()=>typeof globalThis.Netlify == "object", vl = ()=>typeof globalThis.EdgeRuntime == "object", Tl = ()=>globalThis.navigator?.userAgent === "Cloudflare-Workers";
function Cl() {
    return [
        [
            Pl,
            "netlify"
        ],
        [
            vl,
            "edge-light"
        ],
        [
            Tl,
            "workerd"
        ],
        [
            El,
            "deno"
        ],
        [
            xl,
            "bun"
        ],
        [
            wl,
            "node"
        ]
    ].flatMap((r)=>r[0]() ? [
            r[1]
        ] : []).at(0) ?? "";
}
var Al = {
    node: "Node.js",
    workerd: "Cloudflare Workers",
    deno: "Deno and Deno Deploy",
    netlify: "Netlify Edge Functions",
    "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)"
};
function Ze() {
    let t = Cl();
    return {
        id: t,
        prettyName: Al[t] || t,
        isEdge: [
            "workerd",
            "deno",
            "netlify",
            "edge-light"
        ].includes(t)
    };
}
function dr({ inlineDatasources: t, overrideDatasources: e, env: r, clientVersion: n }) {
    let i, o = Object.keys(t)[0], s = t[o]?.url, a = e[o]?.url;
    if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw Ze().id === "workerd" ? new I(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new I(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
    if (i === void 0) throw new I("error: Missing URL environment variable, value, or override.", n);
    return i;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function go(t) {
    if (t?.kind === "itx") return t.options.id;
}
u();
c();
m();
p();
d();
l();
var nn, yo = {
    async loadLibrary (t) {
        let { clientVersion: e, adapter: r, engineWasm: n } = t;
        if (r === void 0) throw new I(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Ze().prettyName})`, e);
        if (n === void 0) throw new I("WASM engine was unexpectedly `undefined`", e);
        nn === void 0 && (nn = (async ()=>{
            let o = await n.getRuntime(), s = await n.getQueryEngineWasmModule();
            if (s == null) throw new I("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", e);
            let a = {
                "./query_engine_bg.js": o
            }, f = new WebAssembly.Instance(s, a), h = f.exports.__wbindgen_start;
            return o.__wbg_set_wasm(f.exports), h(), o.QueryEngine;
        })());
        let i = await nn;
        return {
            debugPanic () {
                return Promise.reject("{}");
            },
            dmmf () {
                return Promise.resolve("{}");
            },
            version () {
                return {
                    commit: "unknown",
                    version: "unknown"
                };
            },
            QueryEngine: i
        };
    }
};
var Rl = "P2036", ge = G("prisma:client:libraryEngine");
function Sl(t) {
    return t.item_type === "query" && "query" in t;
}
function Ol(t) {
    return "level" in t ? t.level === "error" && t.message === "PANIC" : !1;
}
var oO = [
    ...kr,
    "native"
], kl = 0xffffffffffffffffn, on = 1n;
function Dl() {
    let t = on++;
    return on > kl && (on = 1n), t;
}
var Tt = class {
    constructor(e, r){
        this.name = "LibraryEngine";
        this.libraryLoader = r ?? yo, this.config = e, this.libraryStarted = !1, this.logQueries = e.logQueries ?? !1, this.logLevel = e.logLevel ?? "error", this.logEmitter = e.logEmitter, this.datamodel = e.inlineSchema, this.tracingHelper = e.tracingHelper, e.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(e.overrideDatasources)[0], i = e.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = {
            [n]: i
        }), this.libraryInstantiationPromise = this.instantiateLibrary();
    }
    wrapEngine(e) {
        return {
            applyPendingMigrations: e.applyPendingMigrations?.bind(e),
            commitTransaction: this.withRequestId(e.commitTransaction.bind(e)),
            connect: this.withRequestId(e.connect.bind(e)),
            disconnect: this.withRequestId(e.disconnect.bind(e)),
            metrics: e.metrics?.bind(e),
            query: this.withRequestId(e.query.bind(e)),
            rollbackTransaction: this.withRequestId(e.rollbackTransaction.bind(e)),
            sdlSchema: e.sdlSchema?.bind(e),
            startTransaction: this.withRequestId(e.startTransaction.bind(e)),
            trace: e.trace.bind(e),
            free: e.free?.bind(e)
        };
    }
    withRequestId(e) {
        return async (...r)=>{
            let n = Dl().toString();
            try {
                return await e(...r, n);
            } finally{
                if (this.tracingHelper.isEnabled()) {
                    let i = await this.engine?.trace(n);
                    if (i) {
                        let o = JSON.parse(i);
                        this.tracingHelper.dispatchEngineSpans(o.spans);
                    }
                }
            }
        };
    }
    async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
    }
    async transaction(e, r, n) {
        await this.start();
        let i = await this.adapterPromise, o = JSON.stringify(r), s;
        if (e === "start") {
            let f = JSON.stringify({
                max_wait: n.maxWait,
                timeout: n.timeout,
                isolation_level: n.isolationLevel
            });
            s = await this.engine?.startTransaction(f, o);
        } else e === "commit" ? s = await this.engine?.commitTransaction(n.id, o) : e === "rollback" && (s = await this.engine?.rollbackTransaction(n.id, o));
        let a = this.parseEngineResponse(s);
        if (Il(a)) {
            let f = this.getExternalAdapterError(a, i?.errorRegistry);
            throw f ? f.error : new Z(a.message, {
                code: a.error_code,
                clientVersion: this.config.clientVersion,
                meta: a.meta
            });
        } else if (typeof a.message == "string") throw new Q(a.message, {
            clientVersion: this.config.clientVersion
        });
        return a;
    }
    async instantiateLibrary() {
        if (ge("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", ()=>this.loadEngine()), this.version();
    }
    async getCurrentBinaryTarget() {}
    parseEngineResponse(e) {
        if (!e) throw new Q("Response from the Engine was empty", {
            clientVersion: this.config.clientVersion
        });
        try {
            return JSON.parse(e);
        } catch  {
            throw new Q("Unable to JSON.parse response from engine", {
                clientVersion: this.config.clientVersion
            });
        }
    }
    async loadEngine() {
        if (!this.engine) {
            this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
            try {
                let e = new w(this);
                this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(qt));
                let r = await this.adapterPromise;
                r && ge("Using driver adapter: %O", r), this.engine = this.wrapEngine(new this.QueryEngineConstructor({
                    datamodel: this.datamodel,
                    env: g.env,
                    logQueries: this.config.logQueries ?? !1,
                    ignoreEnvVarErrors: !0,
                    datasourceOverrides: this.datasourceOverrides ?? {},
                    logLevel: this.logLevel,
                    configDir: this.config.cwd,
                    engineProtocol: "json",
                    enableTracing: this.tracingHelper.isEnabled()
                }, (n)=>{
                    e.deref()?.logger(n);
                }, r));
            } catch (e) {
                let r = e, n = this.parseInitError(r.message);
                throw typeof n == "string" ? r : new I(n.message, this.config.clientVersion, n.error_code);
            }
        }
    }
    logger(e) {
        let r = this.parseEngineResponse(e);
        r && (r.level = r?.level.toLowerCase() ?? "unknown", Sl(r) ? this.logEmitter.emit("query", {
            timestamp: new Date,
            query: r.query,
            params: r.params,
            duration: Number(r.duration_ms),
            target: r.module_path
        }) : (Ol(r), this.logEmitter.emit(r.level, {
            timestamp: new Date,
            message: r.message,
            target: r.module_path
        })));
    }
    parseInitError(e) {
        try {
            return JSON.parse(e);
        } catch  {}
        return e;
    }
    parseRequestError(e) {
        try {
            return JSON.parse(e);
        } catch  {}
        return e;
    }
    onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
    }
    async start() {
        if (this.libraryInstantiationPromise || (this.libraryInstantiationPromise = this.instantiateLibrary()), await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return ge(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let e = async ()=>{
            ge("library starting");
            try {
                let r = {
                    traceparent: this.tracingHelper.getTraceParent()
                };
                await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = !0, this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(qt)), await this.adapterPromise, ge("library started");
            } catch (r) {
                let n = this.parseInitError(r.message);
                throw typeof n == "string" ? r : new I(n.message, this.config.clientVersion, n.error_code);
            } finally{
                this.libraryStartingPromise = void 0;
            }
        };
        return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", e), this.libraryStartingPromise;
    }
    async stop() {
        if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return ge("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) {
            await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0;
            return;
        }
        let e = async ()=>{
            await new Promise((n)=>setImmediate(n)), ge("library stopping");
            let r = {
                traceparent: this.tracingHelper.getTraceParent()
            };
            await this.engine?.disconnect(JSON.stringify(r)), this.engine?.free && this.engine.free(), this.engine = void 0, this.libraryStarted = !1, this.libraryStoppingPromise = void 0, this.libraryInstantiationPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, ge("library stopped");
        };
        return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", e), this.libraryStoppingPromise;
    }
    version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
    }
    debugPanic(e) {
        return this.library?.debugPanic(e);
    }
    async request(e, { traceparent: r, interactiveTransaction: n }) {
        ge(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({
            traceparent: r
        }), o = JSON.stringify(e);
        try {
            await this.start();
            let s = await this.adapterPromise;
            this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
            let a = this.parseEngineResponse(await this.executingQueryPromise);
            if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], s?.errorRegistry) : new Q(JSON.stringify(a.errors), {
                clientVersion: this.config.clientVersion
            });
            if (this.loggerRustPanic) throw this.loggerRustPanic;
            return {
                data: a
            };
        } catch (s) {
            if (s instanceof I) throw s;
            s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
            let a = this.parseRequestError(s.message);
            throw typeof a == "string" ? s : new Q(`${a.message}
${a.backtrace}`, {
                clientVersion: this.config.clientVersion
            });
        }
    }
    async requestBatch(e, { transaction: r, traceparent: n }) {
        ge("requestBatch");
        let i = ur(e, r);
        await this.start();
        let o = await this.adapterPromise;
        this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine?.query(this.lastQuery, JSON.stringify({
            traceparent: n
        }), go(r));
        let s = await this.executingQueryPromise, a = this.parseEngineResponse(s);
        if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], o?.errorRegistry) : new Q(JSON.stringify(a.errors), {
            clientVersion: this.config.clientVersion
        });
        let { batchResult: f, errors: h } = a;
        if (Array.isArray(f)) return f.map((C)=>C.errors && C.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(C.errors[0], o?.errorRegistry) : {
                data: C
            });
        throw h && h.length === 1 ? new Error(h[0].error) : new Error(JSON.stringify(a));
    }
    buildQueryError(e, r) {
        e.user_facing_error.is_panic;
        let n = this.getExternalAdapterError(e.user_facing_error, r);
        return n ? n.error : cr(e, this.config.clientVersion, this.config.activeProvider);
    }
    getExternalAdapterError(e, r) {
        if (e.error_code === Rl && r) {
            let n = e.meta?.id;
            Bt(typeof n == "number", "Malformed external JS error received from the engine");
            let i = r.consumeError(n);
            return Bt(i, "External error with reported id was not registered"), i;
        }
    }
    async metrics(e) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(e));
        return e.format === "prometheus" ? r : this.parseEngineResponse(r);
    }
};
function Il(t) {
    return typeof t == "object" && t !== null && t.error_code !== void 0;
}
u();
c();
m();
p();
d();
l();
var Ct = "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started", fr = class {
    constructor(e){
        this.name = "AccelerateEngine";
        this.config = e;
        this.resolveDatasourceUrl = this.config.accelerateUtils?.resolveDatasourceUrl, this.getBatchRequestPayload = this.config.accelerateUtils?.getBatchRequestPayload, this.prismaGraphQLToJSError = this.config.accelerateUtils?.prismaGraphQLToJSError, this.PrismaClientUnknownRequestError = this.config.accelerateUtils?.PrismaClientUnknownRequestError, this.PrismaClientInitializationError = this.config.accelerateUtils?.PrismaClientInitializationError, this.PrismaClientKnownRequestError = this.config.accelerateUtils?.PrismaClientKnownRequestError, this.debug = this.config.accelerateUtils?.debug, this.engineVersion = this.config.accelerateUtils?.engineVersion, this.clientVersion = this.config.accelerateUtils?.clientVersion;
    }
    onBeforeExit(e) {}
    async start() {}
    async stop() {}
    version(e) {
        return "unknown";
    }
    transaction(e, r, n) {
        throw new I(Ct, this.config.clientVersion);
    }
    metrics(e) {
        throw new I(Ct, this.config.clientVersion);
    }
    request(e, r) {
        throw new I(Ct, this.config.clientVersion);
    }
    requestBatch(e, r) {
        throw new I(Ct, this.config.clientVersion);
    }
    applyPendingMigrations() {
        throw new I(Ct, this.config.clientVersion);
    }
};
u();
c();
m();
p();
d();
l();
function ho({ url: t, adapter: e, copyEngine: r, targetBuildType: n }) {
    let i = [], o = [], s = (O)=>{
        i.push({
            _tag: "warning",
            value: O
        });
    }, a = (O)=>{
        let D = O.join(`
`);
        o.push({
            _tag: "error",
            value: D
        });
    }, f = !!t?.startsWith("prisma://"), h = _r(t), C = !!e, A = f || h;
    !C && r && A && n !== "client" && n !== "wasm-compiler-edge" && s([
        "recommend--no-engine",
        "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"
    ]);
    let k = A || !r;
    C && (k || n === "edge") && (n === "edge" ? a([
        "Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.",
        "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."
    ]) : A ? a([
        "You've provided both a driver adapter and an Accelerate database URL. Driver adapters currently cannot connect to Accelerate.",
        "Please provide either a driver adapter with a direct database URL or an Accelerate URL and no driver adapter."
    ]) : r || a([
        "Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.",
        "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."
    ]));
    let R = {
        accelerate: k,
        ppg: h,
        driverAdapters: C
    };
    function _(O) {
        return O.length > 0;
    }
    return _(o) ? {
        ok: !1,
        diagnostics: {
            warnings: i,
            errors: o
        },
        isUsing: R
    } : {
        ok: !0,
        diagnostics: {
            warnings: i
        },
        isUsing: R
    };
}
function bo({ copyEngine: t = !0 }, e) {
    let r;
    try {
        r = dr({
            inlineDatasources: e.inlineDatasources,
            overrideDatasources: e.overrideDatasources,
            env: {
                ...e.env,
                ...g.env
            },
            clientVersion: e.clientVersion
        });
    } catch  {}
    let { ok: n, isUsing: i, diagnostics: o } = ho({
        url: r,
        adapter: e.adapter,
        copyEngine: t,
        targetBuildType: "wasm-engine-edge"
    });
    for (let A of o.warnings)at(...A.value);
    if (!n) {
        let A = o.errors[0];
        throw new K(A.value, {
            clientVersion: e.clientVersion
        });
    }
    let s = Ne(e.generator), a = s === "library", f = s === "binary", h = s === "client", C = (i.accelerate || i.ppg) && !i.driverAdapters;
    return i.accelerate, i.driverAdapters ? new Tt(e) : i.accelerate ? new fr(e) : new sn({
        clientVersion: e.clientVersion
    });
}
var sn = class {
    constructor(e){
        return new Proxy(this, {
            get (r, n) {
                let i = `In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters`;
                throw new K(i, e);
            }
        });
    }
};
u();
c();
m();
p();
d();
l();
function wo({ generator: t }) {
    return t?.previewFeatures ?? [];
}
u();
c();
m();
p();
d();
l();
var xo = (t)=>({
        command: t
    });
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Eo = (t)=>t.strings.reduce((e, r, n)=>`${e}@P${n}${r}`);
u();
c();
m();
p();
d();
l();
l();
function et(t) {
    try {
        return Po(t, "fast");
    } catch  {
        return Po(t, "slow");
    }
}
function Po(t, e) {
    return JSON.stringify(t.map((r)=>To(r, e)));
}
function To(t, e) {
    if (Array.isArray(t)) return t.map((r)=>To(r, e));
    if (typeof t == "bigint") return {
        prisma__type: "bigint",
        prisma__value: t.toString()
    };
    if (qe(t)) return {
        prisma__type: "date",
        prisma__value: t.toJSON()
    };
    if (be.isDecimal(t)) return {
        prisma__type: "decimal",
        prisma__value: t.toJSON()
    };
    if (b.isBuffer(t)) return {
        prisma__type: "bytes",
        prisma__value: t.toString("base64")
    };
    if (Ml(t)) return {
        prisma__type: "bytes",
        prisma__value: b.from(t).toString("base64")
    };
    if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return {
            prisma__type: "bytes",
            prisma__value: b.from(r, n, i).toString("base64")
        };
    }
    return typeof t == "object" && e === "slow" ? Co(t) : t;
}
function Ml(t) {
    return t instanceof ArrayBuffer || t instanceof SharedArrayBuffer ? !0 : typeof t == "object" && t !== null ? t[Symbol.toStringTag] === "ArrayBuffer" || t[Symbol.toStringTag] === "SharedArrayBuffer" : !1;
}
function Co(t) {
    if (typeof t != "object" || t === null) return t;
    if (typeof t.toJSON == "function") return t.toJSON();
    if (Array.isArray(t)) return t.map(vo);
    let e = {};
    for (let r of Object.keys(t))e[r] = vo(t[r]);
    return e;
}
function vo(t) {
    return typeof t == "bigint" ? t.toString() : Co(t);
}
var _l = /^(\s*alter\s)/i, Ao = G("prisma:client");
function an(t, e, r, n) {
    if (!(t !== "postgresql" && t !== "cockroachdb") && r.length > 0 && _l.exec(e)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
}
var ln = ({ clientMethod: t, activeProvider: e })=>(r)=>{
        let n = "", i;
        if (or(r)) n = r.sql, i = {
            values: et(r.values),
            __prismaRawParameters__: !0
        };
        else if (Array.isArray(r)) {
            let [o, ...s] = r;
            n = o, i = {
                values: et(s || []),
                __prismaRawParameters__: !0
            };
        } else switch(e){
            case "sqlite":
            case "mysql":
                {
                    n = r.sql, i = {
                        values: et(r.values),
                        __prismaRawParameters__: !0
                    };
                    break;
                }
            case "cockroachdb":
            case "postgresql":
            case "postgres":
                {
                    n = r.text, i = {
                        values: et(r.values),
                        __prismaRawParameters__: !0
                    };
                    break;
                }
            case "sqlserver":
                {
                    n = Eo(r), i = {
                        values: et(r.values),
                        __prismaRawParameters__: !0
                    };
                    break;
                }
            default:
                throw new Error(`The ${e} provider does not support ${t}`);
        }
        return i?.values ? Ao(`prisma.${t}(${n}, ${i.values})`) : Ao(`prisma.${t}(${n})`), {
            query: n,
            parameters: i
        };
    }, Ro = {
    requestArgsToMiddlewareArgs (t) {
        return [
            t.strings,
            ...t.values
        ];
    },
    middlewareArgsToRequestArgs (t) {
        let [e, ...r] = t;
        return new ee(e, r);
    }
}, So = {
    requestArgsToMiddlewareArgs (t) {
        return [
            t
        ];
    },
    middlewareArgsToRequestArgs (t) {
        return t[0];
    }
};
u();
c();
m();
p();
d();
l();
function un(t) {
    return function(r, n) {
        let i, o = (s = t)=>{
            try {
                return s === void 0 || s?.kind === "itx" ? i ??= Oo(r(s)) : Oo(r(s));
            } catch (a) {
                return Promise.reject(a);
            }
        };
        return {
            get spec () {
                return n;
            },
            then (s, a) {
                return o().then(s, a);
            },
            catch (s) {
                return o().catch(s);
            },
            finally (s) {
                return o().finally(s);
            },
            requestTransaction (s) {
                let a = o(s);
                return a.requestTransaction ? a.requestTransaction(s) : a;
            },
            [Symbol.toStringTag]: "PrismaPromise"
        };
    };
}
function Oo(t) {
    return typeof t.then == "function" ? t : Promise.resolve(t);
}
u();
c();
m();
p();
d();
l();
var Ll = Dr.split(".")[0], Fl = {
    isEnabled () {
        return !1;
    },
    getTraceParent () {
        return "00-10-10-00";
    },
    dispatchEngineSpans () {},
    getActiveContext () {},
    runInChildSpan (t, e) {
        return e();
    }
}, cn = class {
    isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
    }
    getTraceParent(e) {
        return this.getGlobalTracingHelper().getTraceParent(e);
    }
    dispatchEngineSpans(e) {
        return this.getGlobalTracingHelper().dispatchEngineSpans(e);
    }
    getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
    }
    runInChildSpan(e, r) {
        return this.getGlobalTracingHelper().runInChildSpan(e, r);
    }
    getGlobalTracingHelper() {
        let e = globalThis[`V${Ll}_PRISMA_INSTRUMENTATION`], r = globalThis.PRISMA_INSTRUMENTATION;
        return e?.helper ?? r?.helper ?? Fl;
    }
};
function ko() {
    return new cn;
}
u();
c();
m();
p();
d();
l();
function Do(t, e = ()=>{}) {
    let r, n = new Promise((i)=>r = i);
    return {
        then (i) {
            return --t === 0 && r(e()), i?.(n);
        }
    };
}
u();
c();
m();
p();
d();
l();
function Io(t) {
    return typeof t == "string" ? t : t.reduce((e, r)=>{
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? e : e && (r === "info" || e === "info") ? "info" : n;
    }, void 0);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function gr(t) {
    return typeof t.batchRequestIdx == "number";
}
u();
c();
m();
p();
d();
l();
function Mo(t) {
    if (t.action !== "findUnique" && t.action !== "findUniqueOrThrow") return;
    let e = [];
    return t.modelName && e.push(t.modelName), t.query.arguments && e.push(mn(t.query.arguments)), e.push(mn(t.query.selection)), e.join("");
}
function mn(t) {
    return `(${Object.keys(t).sort().map((r)=>{
        let n = t[r];
        return typeof n == "object" && n !== null ? `(${r} ${mn(n)})` : r;
    }).join(" ")})`;
}
u();
c();
m();
p();
d();
l();
var Ul = {
    aggregate: !1,
    aggregateRaw: !1,
    createMany: !0,
    createManyAndReturn: !0,
    createOne: !0,
    deleteMany: !0,
    deleteOne: !0,
    executeRaw: !0,
    findFirst: !1,
    findFirstOrThrow: !1,
    findMany: !1,
    findRaw: !1,
    findUnique: !1,
    findUniqueOrThrow: !1,
    groupBy: !1,
    queryRaw: !1,
    runCommandRaw: !0,
    updateMany: !0,
    updateManyAndReturn: !0,
    updateOne: !0,
    upsertOne: !0
};
function pn(t) {
    return Ul[t];
}
u();
c();
m();
p();
d();
l();
var yr = class {
    constructor(e){
        this.tickActive = !1;
        this.options = e;
        this.batches = {};
    }
    request(e) {
        let r = this.options.batchBy(e);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = !0, g.nextTick(()=>{
            this.dispatchBatches(), this.tickActive = !1;
        }))), new Promise((n, i)=>{
            this.batches[r].push({
                request: e,
                resolve: n,
                reject: i
            });
        })) : this.options.singleLoader(e);
    }
    dispatchBatches() {
        for(let e in this.batches){
            let r = this.batches[e];
            delete this.batches[e], r.length === 1 ? this.options.singleLoader(r[0].request).then((n)=>{
                n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
            }).catch((n)=>{
                r[0].reject(n);
            }) : (r.sort((n, i)=>this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n)=>n.request)).then((n)=>{
                if (n instanceof Error) for(let i = 0; i < r.length; i++)r[i].reject(n);
                else for(let i = 0; i < r.length; i++){
                    let o = n[i];
                    o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
                }
            }).catch((n)=>{
                for(let i = 0; i < r.length; i++)r[i].reject(n);
            }));
        }
    }
    get [Symbol.toStringTag]() {
        return "DataLoader";
    }
};
u();
c();
m();
p();
d();
l();
l();
function _e(t, e) {
    if (e === null) return e;
    switch(t){
        case "bigint":
            return BigInt(e);
        case "bytes":
            {
                let { buffer: r, byteOffset: n, byteLength: i } = b.from(e, "base64");
                return new Uint8Array(r, n, i);
            }
        case "decimal":
            return new be(e);
        case "datetime":
        case "date":
            return new Date(e);
        case "time":
            return new Date(`1970-01-01T${e}Z`);
        case "bigint-array":
            return e.map((r)=>_e("bigint", r));
        case "bytes-array":
            return e.map((r)=>_e("bytes", r));
        case "decimal-array":
            return e.map((r)=>_e("decimal", r));
        case "datetime-array":
            return e.map((r)=>_e("datetime", r));
        case "date-array":
            return e.map((r)=>_e("date", r));
        case "time-array":
            return e.map((r)=>_e("time", r));
        default:
            return e;
    }
}
function hr(t) {
    let e = [], r = Nl(t);
    for(let n = 0; n < t.rows.length; n++){
        let i = t.rows[n], o = {
            ...r
        };
        for(let s = 0; s < i.length; s++)o[t.columns[s]] = _e(t.types[s], i[s]);
        e.push(o);
    }
    return e;
}
function Nl(t) {
    let e = {};
    for(let r = 0; r < t.columns.length; r++)e[t.columns[r]] = null;
    return e;
}
var ql = G("prisma:client:request_handler"), br = class {
    constructor(e, r){
        this.logEmitter = r, this.client = e, this.dataloader = new yr({
            batchLoader: oo(async ({ requests: n, customDataProxyFetch: i })=>{
                let { transaction: o, otelParentCtx: s } = n[0], a = n.map((A)=>A.protocolQuery), f = this.client._tracingHelper.getTraceParent(s), h = n.some((A)=>pn(A.protocolQuery.action));
                return (await this.client._engine.requestBatch(a, {
                    traceparent: f,
                    transaction: Bl(o),
                    containsWrite: h,
                    customDataProxyFetch: i
                })).map((A, k)=>{
                    if (A instanceof Error) return A;
                    try {
                        return this.mapQueryEngineResult(n[k], A);
                    } catch (R) {
                        return R;
                    }
                });
            }),
            singleLoader: async (n)=>{
                let i = n.transaction?.kind === "itx" ? _o(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, {
                    traceparent: this.client._tracingHelper.getTraceParent(),
                    interactiveTransaction: i,
                    isWrite: pn(n.protocolQuery.action),
                    customDataProxyFetch: n.customDataProxyFetch
                });
                return this.mapQueryEngineResult(n, o);
            },
            batchBy: (n)=>n.transaction?.id ? `transaction-${n.transaction.id}` : Mo(n.protocolQuery),
            batchOrder (n, i) {
                return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
            }
        });
    }
    async request(e) {
        try {
            return await this.dataloader.request(e);
        } catch (r) {
            let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = e;
            this.handleAndLogRequestError({
                error: r,
                clientMethod: n,
                callsite: i,
                transaction: o,
                args: s,
                modelName: a,
                globalOmit: e.globalOmit
            });
        }
    }
    mapQueryEngineResult({ dataPath: e, unpacker: r }, n) {
        let i = n?.data, o = this.unpack(i, e, r);
        return g.env.PRISMA_CLIENT_GET_TIME ? {
            data: o
        } : o;
    }
    handleAndLogRequestError(e) {
        try {
            this.handleRequestError(e);
        } catch (r) {
            throw this.logEmitter && this.logEmitter.emit("error", {
                message: r.message,
                target: e.clientMethod,
                timestamp: new Date
            }), r;
        }
    }
    handleRequestError({ error: e, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
        if (ql(e), Vl(e, i)) throw e;
        if (e instanceof Z && jl(e)) {
            let h = Lo(e.meta);
            Zt({
                args: o,
                errors: [
                    h
                ],
                callsite: n,
                errorFormat: this.client._errorFormat,
                originalMethod: r,
                clientVersion: this.client._clientVersion,
                globalOmit: a
            });
        }
        let f = e.message;
        if (n && (f = $t({
            callsite: n,
            originalMethod: r,
            isPanic: e.isPanic,
            showColors: this.client._errorFormat === "pretty",
            message: f
        })), f = this.sanitizeMessage(f), e.code) {
            let h = s ? {
                modelName: s,
                ...e.meta
            } : e.meta;
            throw new Z(f, {
                code: e.code,
                clientVersion: this.client._clientVersion,
                meta: h,
                batchRequestIdx: e.batchRequestIdx
            });
        } else {
            if (e.isPanic) throw new xe(f, this.client._clientVersion);
            if (e instanceof Q) throw new Q(f, {
                clientVersion: this.client._clientVersion,
                batchRequestIdx: e.batchRequestIdx
            });
            if (e instanceof I) throw new I(f, this.client._clientVersion);
            if (e instanceof xe) throw new xe(f, this.client._clientVersion);
        }
        throw e.clientVersion = this.client._clientVersion, e;
    }
    sanitizeMessage(e) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? Ur(e) : e;
    }
    unpack(e, r, n) {
        if (!e || (e.data && (e = e.data), !e)) return e;
        let i = Object.keys(e)[0], o = Object.values(e)[0], s = r.filter((h)=>h !== "select" && h !== "include"), a = Zr(o, s), f = i === "queryRaw" ? hr(a) : Xe(a);
        return n ? n(f) : f;
    }
    get [Symbol.toStringTag]() {
        return "RequestHandler";
    }
};
function Bl(t) {
    if (t) {
        if (t.kind === "batch") return {
            kind: "batch",
            options: {
                isolationLevel: t.isolationLevel
            }
        };
        if (t.kind === "itx") return {
            kind: "itx",
            options: _o(t)
        };
        Ie(t, "Unknown transaction kind");
    }
}
function _o(t) {
    return {
        id: t.id,
        payload: t.payload
    };
}
function Vl(t, e) {
    return gr(t) && e?.kind === "batch" && t.batchRequestIdx !== e.index;
}
function jl(t) {
    return t.code === "P2009" || t.code === "P2012";
}
function Lo(t) {
    if (t.kind === "Union") return {
        kind: "Union",
        errors: t.errors.map(Lo)
    };
    if (Array.isArray(t.selectionPath)) {
        let [, ...e] = t.selectionPath;
        return {
            ...t,
            selectionPath: e
        };
    }
    return t;
}
u();
c();
m();
p();
d();
l();
var Fo = fo;
u();
c();
m();
p();
d();
l();
var Vo = kt(Vr());
u();
c();
m();
p();
d();
l();
var M = class extends Error {
    constructor(e){
        super(e + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
    }
};
re(M, "PrismaClientConstructorValidationError");
var Uo = [
    "datasources",
    "datasourceUrl",
    "errorFormat",
    "adapter",
    "log",
    "transactionOptions",
    "omit",
    "__internal"
], No = [
    "pretty",
    "colorless",
    "minimal"
], qo = [
    "info",
    "query",
    "warn",
    "error"
], $l = {
    datasources: (t, { datasourceNames: e })=>{
        if (t) {
            if (typeof t != "object" || Array.isArray(t)) throw new M(`Invalid value ${JSON.stringify(t)} for "datasources" provided to PrismaClient constructor`);
            for (let [r, n] of Object.entries(t)){
                if (!e.includes(r)) {
                    let i = tt(r, e) || ` Available datasources: ${e.join(", ")}`;
                    throw new M(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
                }
                if (typeof n != "object" || Array.isArray(n)) throw new M(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
                if (n && typeof n == "object") for (let [i, o] of Object.entries(n)){
                    if (i !== "url") throw new M(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
                    if (typeof o != "string") throw new M(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
                }
            }
        }
    },
    adapter: (t, e)=>{
        if (!t && Ne(e.generator) === "client") throw new M('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
        if (t !== null) {
            if (t === void 0) throw new M('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
            if (Ne(e.generator) === "binary") throw new M('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
        }
    },
    datasourceUrl: (t)=>{
        if (typeof t < "u" && typeof t != "string") throw new M(`Invalid value ${JSON.stringify(t)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    },
    errorFormat: (t)=>{
        if (t) {
            if (typeof t != "string") throw new M(`Invalid value ${JSON.stringify(t)} for "errorFormat" provided to PrismaClient constructor.`);
            if (!No.includes(t)) {
                let e = tt(t, No);
                throw new M(`Invalid errorFormat ${t} provided to PrismaClient constructor.${e}`);
            }
        }
    },
    log: (t)=>{
        if (!t) return;
        if (!Array.isArray(t)) throw new M(`Invalid value ${JSON.stringify(t)} for "log" provided to PrismaClient constructor.`);
        function e(r) {
            if (typeof r == "string" && !qo.includes(r)) {
                let n = tt(r, qo);
                throw new M(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
            }
        }
        for (let r of t){
            e(r);
            let n = {
                level: e,
                emit: (i)=>{
                    let o = [
                        "stdout",
                        "event"
                    ];
                    if (!o.includes(i)) {
                        let s = tt(i, o);
                        throw new M(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
                    }
                }
            };
            if (r && typeof r == "object") for (let [i, o] of Object.entries(r))if (n[i]) n[i](o);
            else throw new M(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
        }
    },
    transactionOptions: (t)=>{
        if (!t) return;
        let e = t.maxWait;
        if (e != null && e <= 0) throw new M(`Invalid value ${e} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
        let r = t.timeout;
        if (r != null && r <= 0) throw new M(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    },
    omit: (t, e)=>{
        if (typeof t != "object") throw new M('"omit" option is expected to be an object.');
        if (t === null) throw new M('"omit" option can not be `null`');
        let r = [];
        for (let [n, i] of Object.entries(t)){
            let o = Jl(n, e.runtimeDataModel);
            if (!o) {
                r.push({
                    kind: "UnknownModel",
                    modelKey: n
                });
                continue;
            }
            for (let [s, a] of Object.entries(i)){
                let f = o.fields.find((h)=>h.name === s);
                if (!f) {
                    r.push({
                        kind: "UnknownField",
                        modelKey: n,
                        fieldName: s
                    });
                    continue;
                }
                if (f.relationName) {
                    r.push({
                        kind: "RelationInOmit",
                        modelKey: n,
                        fieldName: s
                    });
                    continue;
                }
                typeof a != "boolean" && r.push({
                    kind: "InvalidFieldValue",
                    modelKey: n,
                    fieldName: s
                });
            }
        }
        if (r.length > 0) throw new M(Gl(t, r));
    },
    __internal: (t)=>{
        if (!t) return;
        let e = [
            "debug",
            "engine",
            "configOverride"
        ];
        if (typeof t != "object") throw new M(`Invalid value ${JSON.stringify(t)} for "__internal" to PrismaClient constructor`);
        for (let [r] of Object.entries(t))if (!e.includes(r)) {
            let n = tt(r, e);
            throw new M(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
        }
    }
};
function jo(t, e) {
    for (let [r, n] of Object.entries(t)){
        if (!Uo.includes(r)) {
            let i = tt(r, Uo);
            throw new M(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        $l[r](n, e);
    }
    if (t.datasourceUrl && t.datasources) throw new M('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
}
function tt(t, e) {
    if (e.length === 0 || typeof t != "string") return "";
    let r = Ql(t, e);
    return r ? ` Did you mean "${r}"?` : "";
}
function Ql(t, e) {
    if (e.length === 0) return null;
    let r = e.map((i)=>({
            value: i,
            distance: (0, Vo.default)(t, i)
        }));
    r.sort((i, o)=>i.distance < o.distance ? -1 : 1);
    let n = r[0];
    return n.distance < 3 ? n.value : null;
}
function Jl(t, e) {
    return Bo(e.models, t) ?? Bo(e.types, t);
}
function Bo(t, e) {
    let r = Object.keys(t).find((n)=>ve(n) === e);
    if (r) return t[r];
}
function Gl(t, e) {
    let r = We(t);
    for (let o of e)switch(o.kind){
        case "UnknownModel":
            r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(()=>`Unknown model name: ${o.modelKey}.`);
            break;
        case "UnknownField":
            r.arguments.getDeepField([
                o.modelKey,
                o.fieldName
            ])?.markAsError(), r.addErrorMessage(()=>`Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
            break;
        case "RelationInOmit":
            r.arguments.getDeepField([
                o.modelKey,
                o.fieldName
            ])?.markAsError(), r.addErrorMessage(()=>'Relations are already excluded by default and can not be specified in "omit".');
            break;
        case "InvalidFieldValue":
            r.arguments.getDeepFieldValue([
                o.modelKey,
                o.fieldName
            ])?.markAsError(), r.addErrorMessage(()=>"Omit field option value must be a boolean.");
            break;
    }
    let { message: n, args: i } = Xt(r, "colorless");
    return `Error validating "omit" option:

${i}

${n}`;
}
u();
c();
m();
p();
d();
l();
function $o(t) {
    return t.length === 0 ? Promise.resolve([]) : new Promise((e, r)=>{
        let n = new Array(t.length), i = null, o = !1, s = 0, a = ()=>{
            o || (s++, s === t.length && (o = !0, i ? r(i) : e(n)));
        }, f = (h)=>{
            o || (o = !0, r(h));
        };
        for(let h = 0; h < t.length; h++)t[h].then((C)=>{
            n[h] = C, a();
        }, (C)=>{
            if (!gr(C)) {
                f(C);
                return;
            }
            C.batchRequestIdx === h ? f(C) : (i || (i = C), a());
        });
    });
}
var Ae = G("prisma:client");
typeof globalThis == "object" && (globalThis.NODE_CLIENT = !0);
var Wl = {
    requestArgsToMiddlewareArgs: (t)=>t,
    middlewareArgsToRequestArgs: (t)=>t
}, Kl = Symbol.for("prisma.client.transaction.id"), Hl = {
    id: 0,
    nextId () {
        return ++this.id;
    }
};
function Go(t) {
    class e {
        constructor(n){
            this._originalClient = this;
            this._createPrismaPromise = un();
            this.$metrics = new He(this);
            this.$extends = zi;
            t = n?.__internal?.configOverride?.(t) ?? t, co(t), n && jo(n, t);
            let i = new sr().on("error", ()=>{});
            this._extensions = Ke.empty(), this._previewFeatures = wo(t), this._clientVersion = t.clientVersion ?? Fo, this._activeProvider = t.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = ko();
            let o = t.relativeEnvPaths && {
                rootEnvPath: t.relativeEnvPaths.rootEnvPath && Ut.resolve(t.dirname, t.relativeEnvPaths.rootEnvPath),
                schemaEnvPath: t.relativeEnvPaths.schemaEnvPath && Ut.resolve(t.dirname, t.relativeEnvPaths.schemaEnvPath)
            }, s;
            if (n?.adapter) {
                s = n.adapter;
                let f = t.activeProvider === "postgresql" || t.activeProvider === "cockroachdb" ? "postgres" : t.activeProvider;
                if (s.provider !== f) throw new I(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${f}\` specified in the Prisma schema.`, this._clientVersion);
                if (n.datasources || n.datasourceUrl !== void 0) throw new I("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
            }
            let a = t.injectableEdgeEnv?.();
            try {
                let f = n ?? {}, h = f.__internal ?? {}, C = h.debug === !0;
                C && G.enable("prisma:client");
                let A = Ut.resolve(t.dirname, t.relativePath);
                Bn.existsSync(A) || (A = t.dirname), Ae("dirname", t.dirname), Ae("relativePath", t.relativePath), Ae("cwd", A);
                let k = h.engine || {};
                if (f.errorFormat ? this._errorFormat = f.errorFormat : g.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : g.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = t.runtimeDataModel, this._engineConfig = {
                    cwd: A,
                    dirname: t.dirname,
                    enableDebugLogs: C,
                    allowTriggerPanic: k.allowTriggerPanic,
                    prismaPath: k.binaryPath ?? void 0,
                    engineEndpoint: k.endpoint,
                    generator: t.generator,
                    showColors: this._errorFormat === "pretty",
                    logLevel: f.log && Io(f.log),
                    logQueries: f.log && !!(typeof f.log == "string" ? f.log === "query" : f.log.find((R)=>typeof R == "string" ? R === "query" : R.level === "query")),
                    env: a?.parsed ?? {},
                    flags: [],
                    engineWasm: t.engineWasm,
                    compilerWasm: t.compilerWasm,
                    clientVersion: t.clientVersion,
                    engineVersion: t.engineVersion,
                    previewFeatures: this._previewFeatures,
                    activeProvider: t.activeProvider,
                    inlineSchema: t.inlineSchema,
                    overrideDatasources: mo(f, t.datasourceNames),
                    inlineDatasources: t.inlineDatasources,
                    inlineSchemaHash: t.inlineSchemaHash,
                    tracingHelper: this._tracingHelper,
                    transactionOptions: {
                        maxWait: f.transactionOptions?.maxWait ?? 2e3,
                        timeout: f.transactionOptions?.timeout ?? 5e3,
                        isolationLevel: f.transactionOptions?.isolationLevel
                    },
                    logEmitter: i,
                    isBundled: t.isBundled,
                    adapter: s
                }, this._accelerateEngineConfig = {
                    ...this._engineConfig,
                    accelerateUtils: {
                        resolveDatasourceUrl: dr,
                        getBatchRequestPayload: ur,
                        prismaGraphQLToJSError: cr,
                        PrismaClientUnknownRequestError: Q,
                        PrismaClientInitializationError: I,
                        PrismaClientKnownRequestError: Z,
                        debug: G("prisma:client:accelerateEngine"),
                        engineVersion: Jo.version,
                        clientVersion: t.clientVersion
                    }
                }, Ae("clientVersion", t.clientVersion), this._engine = bo(t, this._engineConfig), this._requestHandler = new br(this, i), f.log) for (let R of f.log){
                    let _ = typeof R == "string" ? R : R.emit === "stdout" ? R.level : null;
                    _ && this.$on(_, (O)=>{
                        st.log(`${st.tags[_] ?? ""}`, O.message || O.query);
                    });
                }
            } catch (f) {
                throw f.clientVersion = this._clientVersion, f;
            }
            return this._appliedParent = Pt(this);
        }
        get [Symbol.toStringTag]() {
            return "PrismaClient";
        }
        $on(n, i) {
            return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
        }
        $connect() {
            try {
                return this._engine.start();
            } catch (n) {
                throw n.clientVersion = this._clientVersion, n;
            }
        }
        async $disconnect() {
            try {
                await this._engine.stop();
            } catch (n) {
                throw n.clientVersion = this._clientVersion, n;
            } finally{
                qn();
            }
        }
        $executeRawInternal(n, i, o, s) {
            let a = this._activeProvider;
            return this._request({
                action: "executeRaw",
                args: o,
                transaction: n,
                clientMethod: i,
                argsMapper: ln({
                    clientMethod: i,
                    activeProvider: a
                }),
                callsite: Ce(this._errorFormat),
                dataPath: [],
                middlewareArgsMapper: s
            });
        }
        $executeRaw(n, ...i) {
            return this._createPrismaPromise((o)=>{
                if (n.raw !== void 0 || n.sql !== void 0) {
                    let [s, a] = Qo(n, i);
                    return an(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
                }
                throw new K("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", {
                    clientVersion: this._clientVersion
                });
            });
        }
        $executeRawUnsafe(n, ...i) {
            return this._createPrismaPromise((o)=>(an(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [
                    n,
                    ...i
                ])));
        }
        $runCommandRaw(n) {
            if (t.activeProvider !== "mongodb") throw new K(`The ${t.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, {
                clientVersion: this._clientVersion
            });
            return this._createPrismaPromise((i)=>this._request({
                    args: n,
                    clientMethod: "$runCommandRaw",
                    dataPath: [],
                    action: "runCommandRaw",
                    argsMapper: xo,
                    callsite: Ce(this._errorFormat),
                    transaction: i
                }));
        }
        async $queryRawInternal(n, i, o, s) {
            let a = this._activeProvider;
            return this._request({
                action: "queryRaw",
                args: o,
                transaction: n,
                clientMethod: i,
                argsMapper: ln({
                    clientMethod: i,
                    activeProvider: a
                }),
                callsite: Ce(this._errorFormat),
                dataPath: [],
                middlewareArgsMapper: s
            });
        }
        $queryRaw(n, ...i) {
            return this._createPrismaPromise((o)=>{
                if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Qo(n, i));
                throw new K("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", {
                    clientVersion: this._clientVersion
                });
            });
        }
        $queryRawTyped(n) {
            return this._createPrismaPromise((i)=>{
                if (!this._hasPreviewFlag("typedSql")) throw new K("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", {
                    clientVersion: this._clientVersion
                });
                return this.$queryRawInternal(i, "$queryRawTyped", n);
            });
        }
        $queryRawUnsafe(n, ...i) {
            return this._createPrismaPromise((o)=>this.$queryRawInternal(o, "$queryRawUnsafe", [
                    n,
                    ...i
                ]));
        }
        _transactionWithArray({ promises: n, options: i }) {
            let o = Hl.nextId(), s = Do(n.length), a = n.map((f, h)=>{
                if (f?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
                let C = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, A = {
                    kind: "batch",
                    id: o,
                    index: h,
                    isolationLevel: C,
                    lock: s
                };
                return f.requestTransaction?.(A) ?? f;
            });
            return $o(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
            let o = {
                traceparent: this._tracingHelper.getTraceParent()
            }, s = {
                maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait,
                timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout,
                isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel
            }, a = await this._engine.transaction("start", o, s), f;
            try {
                let h = {
                    kind: "itx",
                    ...a
                };
                f = await n(this._createItxClient(h)), await this._engine.transaction("commit", o, a);
            } catch (h) {
                throw await this._engine.transaction("rollback", o, a).catch(()=>{}), h;
            }
            return f;
        }
        _createItxClient(n) {
            return ae(Pt(ae(Hi(this), [
                H("_appliedParent", ()=>this._appliedParent._createItxClient(n)),
                H("_createPrismaPromise", ()=>un(n)),
                H(Kl, ()=>n.id)
            ])), [
                ze(eo)
            ]);
        }
        $transaction(n, i) {
            let o;
            typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = ()=>{
                throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
            } : o = ()=>this._transactionWithCallback({
                    callback: n,
                    options: i
                }) : o = ()=>this._transactionWithArray({
                    promises: n,
                    options: i
                });
            let s = {
                name: "transaction",
                attributes: {
                    method: "$transaction"
                }
            };
            return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
            n.otelParentCtx = this._tracingHelper.getActiveContext();
            let i = n.middlewareArgsMapper ?? Wl, o = {
                args: i.requestArgsToMiddlewareArgs(n.args),
                dataPath: n.dataPath,
                runInTransaction: !!n.transaction,
                action: n.action,
                model: n.model
            }, s = {
                operation: {
                    name: "operation",
                    attributes: {
                        method: o.action,
                        model: o.model,
                        name: o.model ? `${o.model}.${o.action}` : o.action
                    }
                }
            }, a = async (f)=>{
                let { runInTransaction: h, args: C, ...A } = f, k = {
                    ...n,
                    ...A
                };
                C && (k.args = i.middlewareArgsToRequestArgs(C)), n.transaction !== void 0 && h === !1 && delete k.transaction;
                let R = await io(this, k);
                return k.model ? Zi({
                    result: R,
                    modelName: k.model,
                    args: k.args,
                    extensions: this._extensions,
                    runtimeDataModel: this._runtimeDataModel,
                    globalOmit: this._globalOmit
                }) : R;
            };
            return this._tracingHelper.runInChildSpan(s.operation, ()=>a(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: f, argsMapper: h, transaction: C, unpacker: A, otelParentCtx: k, customDataProxyFetch: R }) {
            try {
                n = h ? h(n) : n;
                let _ = {
                    name: "serialize"
                }, O = this._tracingHelper.runInChildSpan(_, ()=>nr({
                        modelName: f,
                        runtimeDataModel: this._runtimeDataModel,
                        action: a,
                        args: n,
                        clientMethod: i,
                        callsite: s,
                        extensions: this._extensions,
                        errorFormat: this._errorFormat,
                        clientVersion: this._clientVersion,
                        previewFeatures: this._previewFeatures,
                        globalOmit: this._globalOmit
                    }));
                return G.enabled("prisma:client") && (Ae("Prisma Client call:"), Ae(`prisma.${i}(${qi(n)})`), Ae("Generated request:"), Ae(JSON.stringify(O, null, 2) + `
`)), C?.kind === "batch" && await C.lock, this._requestHandler.request({
                    protocolQuery: O,
                    modelName: f,
                    action: a,
                    clientMethod: i,
                    dataPath: o,
                    callsite: s,
                    args: n,
                    extensions: this._extensions,
                    transaction: C,
                    unpacker: A,
                    otelParentCtx: k,
                    otelChildCtx: this._tracingHelper.getActiveContext(),
                    globalOmit: this._globalOmit,
                    customDataProxyFetch: R
                });
            } catch (_) {
                throw _.clientVersion = this._clientVersion, _;
            }
        }
        _hasPreviewFlag(n) {
            return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
            return this._engine.applyPendingMigrations();
        }
    }
    return e;
}
function Qo(t, e) {
    return zl(t) ? [
        new ee(t, e),
        Ro
    ] : [
        t,
        So
    ];
}
function zl(t) {
    return Array.isArray(t) && Array.isArray(t.raw);
}
u();
c();
m();
p();
d();
l();
var Yl = new Set([
    "toJSON",
    "$$typeof",
    "asymmetricMatch",
    Symbol.iterator,
    Symbol.toStringTag,
    Symbol.isConcatSpreadable,
    Symbol.toPrimitive
]);
function Wo(t) {
    return new Proxy(t, {
        get (e, r) {
            if (r in e) return e[r];
            if (!Yl.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
        }
    });
}
u();
c();
m();
p();
d();
l();
l();
0 && (0); //# sourceMappingURL=wasm-engine-edge.js.map


/***/ }),

/***/ 283:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies,
    parseCookie: ()=>parseCookie,
    parseSetCookie: ()=>parseSetCookie,
    stringifyCookie: ()=>stringifyCookie
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function stringifyCookie(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
        "priority" in c && c.priority && `Priority=${c.priority}`
    ].filter(Boolean);
    return `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookie(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookie(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure, priority } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase(),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        },
        ...priority && {
            priority: parsePriority(priority)
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = [
    "low",
    "medium",
    "high"
];
function parsePriority(string) {
    string = string.toLowerCase();
    return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>stringifyCookie(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>stringifyCookie(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookie(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    has(name) {
        return this._parsed.has(name);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const [name, path, domain] = typeof args[0] === "string" ? [
            args[0]
        ] : [
            args[0].name,
            args[0].path,
            args[0].domain
        ];
        return this.set({
            name,
            path,
            domain,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(stringifyCookie).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = stringifyCookie(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 38:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
var __dirname = "/";

(()=>{
    "use strict";
    var e = {
        491: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ContextAPI = void 0;
            const n = r(223);
            const a = r(172);
            const o = r(930);
            const i = "context";
            const c = new n.NoopContextManager;
            class ContextAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new ContextAPI;
                    }
                    return this._instance;
                }
                setGlobalContextManager(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                active() {
                    return this._getContextManager().active();
                }
                with(e, t, r, ...n) {
                    return this._getContextManager().with(e, t, r, ...n);
                }
                bind(e, t) {
                    return this._getContextManager().bind(e, t);
                }
                _getContextManager() {
                    return (0, a.getGlobal)(i) || c;
                }
                disable() {
                    this._getContextManager().disable();
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.ContextAPI = ContextAPI;
        },
        930: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagAPI = void 0;
            const n = r(56);
            const a = r(912);
            const o = r(957);
            const i = r(172);
            const c = "diag";
            class DiagAPI {
                constructor(){
                    function _logProxy(e) {
                        return function(...t) {
                            const r = (0, i.getGlobal)("diag");
                            if (!r) return;
                            return r[e](...t);
                        };
                    }
                    const e = this;
                    const setLogger = (t, r = {
                        logLevel: o.DiagLogLevel.INFO
                    })=>{
                        var n, c, s;
                        if (t === e) {
                            const t = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                            e.error((n = t.stack) !== null && n !== void 0 ? n : t.message);
                            return false;
                        }
                        if (typeof r === "number") {
                            r = {
                                logLevel: r
                            };
                        }
                        const u = (0, i.getGlobal)("diag");
                        const l = (0, a.createLogLevelDiagLogger)((c = r.logLevel) !== null && c !== void 0 ? c : o.DiagLogLevel.INFO, t);
                        if (u && !r.suppressOverrideMessage) {
                            const e = (s = (new Error).stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                            u.warn(`Current logger will be overwritten from ${e}`);
                            l.warn(`Current logger will overwrite one already registered from ${e}`);
                        }
                        return (0, i.registerGlobal)("diag", l, e, true);
                    };
                    e.setLogger = setLogger;
                    e.disable = ()=>{
                        (0, i.unregisterGlobal)(c, e);
                    };
                    e.createComponentLogger = (e)=>new n.DiagComponentLogger(e);
                    e.verbose = _logProxy("verbose");
                    e.debug = _logProxy("debug");
                    e.info = _logProxy("info");
                    e.warn = _logProxy("warn");
                    e.error = _logProxy("error");
                }
                static instance() {
                    if (!this._instance) {
                        this._instance = new DiagAPI;
                    }
                    return this._instance;
                }
            }
            t.DiagAPI = DiagAPI;
        },
        653: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.MetricsAPI = void 0;
            const n = r(660);
            const a = r(172);
            const o = r(930);
            const i = "metrics";
            class MetricsAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new MetricsAPI;
                    }
                    return this._instance;
                }
                setGlobalMeterProvider(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                getMeterProvider() {
                    return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
                }
                getMeter(e, t, r) {
                    return this.getMeterProvider().getMeter(e, t, r);
                }
                disable() {
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.MetricsAPI = MetricsAPI;
        },
        181: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.PropagationAPI = void 0;
            const n = r(172);
            const a = r(874);
            const o = r(194);
            const i = r(277);
            const c = r(369);
            const s = r(930);
            const u = "propagation";
            const l = new a.NoopTextMapPropagator;
            class PropagationAPI {
                constructor(){
                    this.createBaggage = c.createBaggage;
                    this.getBaggage = i.getBaggage;
                    this.getActiveBaggage = i.getActiveBaggage;
                    this.setBaggage = i.setBaggage;
                    this.deleteBaggage = i.deleteBaggage;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new PropagationAPI;
                    }
                    return this._instance;
                }
                setGlobalPropagator(e) {
                    return (0, n.registerGlobal)(u, e, s.DiagAPI.instance());
                }
                inject(e, t, r = o.defaultTextMapSetter) {
                    return this._getGlobalPropagator().inject(e, t, r);
                }
                extract(e, t, r = o.defaultTextMapGetter) {
                    return this._getGlobalPropagator().extract(e, t, r);
                }
                fields() {
                    return this._getGlobalPropagator().fields();
                }
                disable() {
                    (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
                }
                _getGlobalPropagator() {
                    return (0, n.getGlobal)(u) || l;
                }
            }
            t.PropagationAPI = PropagationAPI;
        },
        997: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceAPI = void 0;
            const n = r(172);
            const a = r(846);
            const o = r(139);
            const i = r(607);
            const c = r(930);
            const s = "trace";
            class TraceAPI {
                constructor(){
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                    this.wrapSpanContext = o.wrapSpanContext;
                    this.isSpanContextValid = o.isSpanContextValid;
                    this.deleteSpan = i.deleteSpan;
                    this.getSpan = i.getSpan;
                    this.getActiveSpan = i.getActiveSpan;
                    this.getSpanContext = i.getSpanContext;
                    this.setSpan = i.setSpan;
                    this.setSpanContext = i.setSpanContext;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new TraceAPI;
                    }
                    return this._instance;
                }
                setGlobalTracerProvider(e) {
                    const t = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
                    if (t) {
                        this._proxyTracerProvider.setDelegate(e);
                    }
                    return t;
                }
                getTracerProvider() {
                    return (0, n.getGlobal)(s) || this._proxyTracerProvider;
                }
                getTracer(e, t) {
                    return this.getTracerProvider().getTracer(e, t);
                }
                disable() {
                    (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                }
            }
            t.TraceAPI = TraceAPI;
        },
        277: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.deleteBaggage = t.setBaggage = t.getActiveBaggage = t.getBaggage = void 0;
            const n = r(491);
            const a = r(780);
            const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
            function getBaggage(e) {
                return e.getValue(o) || undefined;
            }
            t.getBaggage = getBaggage;
            function getActiveBaggage() {
                return getBaggage(n.ContextAPI.getInstance().active());
            }
            t.getActiveBaggage = getActiveBaggage;
            function setBaggage(e, t) {
                return e.setValue(o, t);
            }
            t.setBaggage = setBaggage;
            function deleteBaggage(e) {
                return e.deleteValue(o);
            }
            t.deleteBaggage = deleteBaggage;
        },
        993: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.BaggageImpl = void 0;
            class BaggageImpl {
                constructor(e){
                    this._entries = e ? new Map(e) : new Map;
                }
                getEntry(e) {
                    const t = this._entries.get(e);
                    if (!t) {
                        return undefined;
                    }
                    return Object.assign({}, t);
                }
                getAllEntries() {
                    return Array.from(this._entries.entries()).map(([e, t])=>[
                            e,
                            t
                        ]);
                }
                setEntry(e, t) {
                    const r = new BaggageImpl(this._entries);
                    r._entries.set(e, t);
                    return r;
                }
                removeEntry(e) {
                    const t = new BaggageImpl(this._entries);
                    t._entries.delete(e);
                    return t;
                }
                removeEntries(...e) {
                    const t = new BaggageImpl(this._entries);
                    for (const r of e){
                        t._entries.delete(r);
                    }
                    return t;
                }
                clear() {
                    return new BaggageImpl;
                }
            }
            t.BaggageImpl = BaggageImpl;
        },
        830: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataSymbol = void 0;
            t.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        },
        369: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataFromString = t.createBaggage = void 0;
            const n = r(930);
            const a = r(993);
            const o = r(830);
            const i = n.DiagAPI.instance();
            function createBaggage(e = {}) {
                return new a.BaggageImpl(new Map(Object.entries(e)));
            }
            t.createBaggage = createBaggage;
            function baggageEntryMetadataFromString(e) {
                if (typeof e !== "string") {
                    i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);
                    e = "";
                }
                return {
                    __TYPE__: o.baggageEntryMetadataSymbol,
                    toString () {
                        return e;
                    }
                };
            }
            t.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
        },
        67: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.context = void 0;
            const n = r(491);
            t.context = n.ContextAPI.getInstance();
        },
        223: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopContextManager = void 0;
            const n = r(780);
            class NoopContextManager {
                active() {
                    return n.ROOT_CONTEXT;
                }
                with(e, t, r, ...n) {
                    return t.call(r, ...n);
                }
                bind(e, t) {
                    return t;
                }
                enable() {
                    return this;
                }
                disable() {
                    return this;
                }
            }
            t.NoopContextManager = NoopContextManager;
        },
        780: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ROOT_CONTEXT = t.createContextKey = void 0;
            function createContextKey(e) {
                return Symbol.for(e);
            }
            t.createContextKey = createContextKey;
            class BaseContext {
                constructor(e){
                    const t = this;
                    t._currentContext = e ? new Map(e) : new Map;
                    t.getValue = (e)=>t._currentContext.get(e);
                    t.setValue = (e, r)=>{
                        const n = new BaseContext(t._currentContext);
                        n._currentContext.set(e, r);
                        return n;
                    };
                    t.deleteValue = (e)=>{
                        const r = new BaseContext(t._currentContext);
                        r._currentContext.delete(e);
                        return r;
                    };
                }
            }
            t.ROOT_CONTEXT = new BaseContext;
        },
        506: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.diag = void 0;
            const n = r(930);
            t.diag = n.DiagAPI.instance();
        },
        56: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagComponentLogger = void 0;
            const n = r(172);
            class DiagComponentLogger {
                constructor(e){
                    this._namespace = e.namespace || "DiagComponentLogger";
                }
                debug(...e) {
                    return logProxy("debug", this._namespace, e);
                }
                error(...e) {
                    return logProxy("error", this._namespace, e);
                }
                info(...e) {
                    return logProxy("info", this._namespace, e);
                }
                warn(...e) {
                    return logProxy("warn", this._namespace, e);
                }
                verbose(...e) {
                    return logProxy("verbose", this._namespace, e);
                }
            }
            t.DiagComponentLogger = DiagComponentLogger;
            function logProxy(e, t, r) {
                const a = (0, n.getGlobal)("diag");
                if (!a) {
                    return;
                }
                r.unshift(t);
                return a[e](...r);
            }
        },
        972: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagConsoleLogger = void 0;
            const r = [
                {
                    n: "error",
                    c: "error"
                },
                {
                    n: "warn",
                    c: "warn"
                },
                {
                    n: "info",
                    c: "info"
                },
                {
                    n: "debug",
                    c: "debug"
                },
                {
                    n: "verbose",
                    c: "trace"
                }
            ];
            class DiagConsoleLogger {
                constructor(){
                    function _consoleFunc(e) {
                        return function(...t) {
                            if (console) {
                                let r = console[e];
                                if (typeof r !== "function") {
                                    r = console.log;
                                }
                                if (typeof r === "function") {
                                    return r.apply(console, t);
                                }
                            }
                        };
                    }
                    for(let e = 0; e < r.length; e++){
                        this[r[e].n] = _consoleFunc(r[e].c);
                    }
                }
            }
            t.DiagConsoleLogger = DiagConsoleLogger;
        },
        912: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createLogLevelDiagLogger = void 0;
            const n = r(957);
            function createLogLevelDiagLogger(e, t) {
                if (e < n.DiagLogLevel.NONE) {
                    e = n.DiagLogLevel.NONE;
                } else if (e > n.DiagLogLevel.ALL) {
                    e = n.DiagLogLevel.ALL;
                }
                t = t || {};
                function _filterFunc(r, n) {
                    const a = t[r];
                    if (typeof a === "function" && e >= n) {
                        return a.bind(t);
                    }
                    return function() {};
                }
                return {
                    error: _filterFunc("error", n.DiagLogLevel.ERROR),
                    warn: _filterFunc("warn", n.DiagLogLevel.WARN),
                    info: _filterFunc("info", n.DiagLogLevel.INFO),
                    debug: _filterFunc("debug", n.DiagLogLevel.DEBUG),
                    verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE)
                };
            }
            t.createLogLevelDiagLogger = createLogLevelDiagLogger;
        },
        957: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagLogLevel = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["ERROR"] = 30] = "ERROR";
                e[e["WARN"] = 50] = "WARN";
                e[e["INFO"] = 60] = "INFO";
                e[e["DEBUG"] = 70] = "DEBUG";
                e[e["VERBOSE"] = 80] = "VERBOSE";
                e[e["ALL"] = 9999] = "ALL";
            })(r = t.DiagLogLevel || (t.DiagLogLevel = {}));
        },
        172: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0;
            const n = r(200);
            const a = r(521);
            const o = r(130);
            const i = a.VERSION.split(".")[0];
            const c = Symbol.for(`opentelemetry.js.api.${i}`);
            const s = n._globalThis;
            function registerGlobal(e, t, r, n = false) {
                var o;
                const i = s[c] = (o = s[c]) !== null && o !== void 0 ? o : {
                    version: a.VERSION
                };
                if (!n && i[e]) {
                    const t = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                if (i.version !== a.VERSION) {
                    const t = new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                i[e] = t;
                r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);
                return true;
            }
            t.registerGlobal = registerGlobal;
            function getGlobal(e) {
                var t, r;
                const n = (t = s[c]) === null || t === void 0 ? void 0 : t.version;
                if (!n || !(0, o.isCompatible)(n)) {
                    return;
                }
                return (r = s[c]) === null || r === void 0 ? void 0 : r[e];
            }
            t.getGlobal = getGlobal;
            function unregisterGlobal(e, t) {
                t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);
                const r = s[c];
                if (r) {
                    delete r[e];
                }
            }
            t.unregisterGlobal = unregisterGlobal;
        },
        130: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.isCompatible = t._makeCompatibilityCheck = void 0;
            const n = r(521);
            const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            function _makeCompatibilityCheck(e) {
                const t = new Set([
                    e
                ]);
                const r = new Set;
                const n = e.match(a);
                if (!n) {
                    return ()=>false;
                }
                const o = {
                    major: +n[1],
                    minor: +n[2],
                    patch: +n[3],
                    prerelease: n[4]
                };
                if (o.prerelease != null) {
                    return function isExactmatch(t) {
                        return t === e;
                    };
                }
                function _reject(e) {
                    r.add(e);
                    return false;
                }
                function _accept(e) {
                    t.add(e);
                    return true;
                }
                return function isCompatible(e) {
                    if (t.has(e)) {
                        return true;
                    }
                    if (r.has(e)) {
                        return false;
                    }
                    const n = e.match(a);
                    if (!n) {
                        return _reject(e);
                    }
                    const i = {
                        major: +n[1],
                        minor: +n[2],
                        patch: +n[3],
                        prerelease: n[4]
                    };
                    if (i.prerelease != null) {
                        return _reject(e);
                    }
                    if (o.major !== i.major) {
                        return _reject(e);
                    }
                    if (o.major === 0) {
                        if (o.minor === i.minor && o.patch <= i.patch) {
                            return _accept(e);
                        }
                        return _reject(e);
                    }
                    if (o.minor <= i.minor) {
                        return _accept(e);
                    }
                    return _reject(e);
                };
            }
            t._makeCompatibilityCheck = _makeCompatibilityCheck;
            t.isCompatible = _makeCompatibilityCheck(n.VERSION);
        },
        886: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.metrics = void 0;
            const n = r(653);
            t.metrics = n.MetricsAPI.getInstance();
        },
        901: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ValueType = void 0;
            var r;
            (function(e) {
                e[e["INT"] = 0] = "INT";
                e[e["DOUBLE"] = 1] = "DOUBLE";
            })(r = t.ValueType || (t.ValueType = {}));
        },
        102: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createNoopMeter = t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t.NOOP_OBSERVABLE_GAUGE_METRIC = t.NOOP_OBSERVABLE_COUNTER_METRIC = t.NOOP_UP_DOWN_COUNTER_METRIC = t.NOOP_HISTOGRAM_METRIC = t.NOOP_COUNTER_METRIC = t.NOOP_METER = t.NoopObservableUpDownCounterMetric = t.NoopObservableGaugeMetric = t.NoopObservableCounterMetric = t.NoopObservableMetric = t.NoopHistogramMetric = t.NoopUpDownCounterMetric = t.NoopCounterMetric = t.NoopMetric = t.NoopMeter = void 0;
            class NoopMeter {
                constructor(){}
                createHistogram(e, r) {
                    return t.NOOP_HISTOGRAM_METRIC;
                }
                createCounter(e, r) {
                    return t.NOOP_COUNTER_METRIC;
                }
                createUpDownCounter(e, r) {
                    return t.NOOP_UP_DOWN_COUNTER_METRIC;
                }
                createObservableGauge(e, r) {
                    return t.NOOP_OBSERVABLE_GAUGE_METRIC;
                }
                createObservableCounter(e, r) {
                    return t.NOOP_OBSERVABLE_COUNTER_METRIC;
                }
                createObservableUpDownCounter(e, r) {
                    return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                }
                addBatchObservableCallback(e, t) {}
                removeBatchObservableCallback(e) {}
            }
            t.NoopMeter = NoopMeter;
            class NoopMetric {
            }
            t.NoopMetric = NoopMetric;
            class NoopCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopCounterMetric = NoopCounterMetric;
            class NoopUpDownCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
            class NoopHistogramMetric extends NoopMetric {
                record(e, t) {}
            }
            t.NoopHistogramMetric = NoopHistogramMetric;
            class NoopObservableMetric {
                addCallback(e) {}
                removeCallback(e) {}
            }
            t.NoopObservableMetric = NoopObservableMetric;
            class NoopObservableCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableCounterMetric = NoopObservableCounterMetric;
            class NoopObservableGaugeMetric extends NoopObservableMetric {
            }
            t.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
            class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
            t.NOOP_METER = new NoopMeter;
            t.NOOP_COUNTER_METRIC = new NoopCounterMetric;
            t.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric;
            t.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric;
            t.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric;
            t.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric;
            t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric;
            function createNoopMeter() {
                return t.NOOP_METER;
            }
            t.createNoopMeter = createNoopMeter;
        },
        660: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0;
            const n = r(102);
            class NoopMeterProvider {
                getMeter(e, t, r) {
                    return n.NOOP_METER;
                }
            }
            t.NoopMeterProvider = NoopMeterProvider;
            t.NOOP_METER_PROVIDER = new NoopMeterProvider;
        },
        200: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(46), t);
        },
        651: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t._globalThis = void 0;
            t._globalThis = typeof globalThis === "object" ? globalThis : __webpack_require__.g;
        },
        46: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(651), t);
        },
        939: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.propagation = void 0;
            const n = r(181);
            t.propagation = n.PropagationAPI.getInstance();
        },
        874: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTextMapPropagator = void 0;
            class NoopTextMapPropagator {
                inject(e, t) {}
                extract(e, t) {
                    return e;
                }
                fields() {
                    return [];
                }
            }
            t.NoopTextMapPropagator = NoopTextMapPropagator;
        },
        194: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.defaultTextMapSetter = t.defaultTextMapGetter = void 0;
            t.defaultTextMapGetter = {
                get (e, t) {
                    if (e == null) {
                        return undefined;
                    }
                    return e[t];
                },
                keys (e) {
                    if (e == null) {
                        return [];
                    }
                    return Object.keys(e);
                }
            };
            t.defaultTextMapSetter = {
                set (e, t, r) {
                    if (e == null) {
                        return;
                    }
                    e[t] = r;
                }
            };
        },
        845: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.trace = void 0;
            const n = r(997);
            t.trace = n.TraceAPI.getInstance();
        },
        403: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NonRecordingSpan = void 0;
            const n = r(476);
            class NonRecordingSpan {
                constructor(e = n.INVALID_SPAN_CONTEXT){
                    this._spanContext = e;
                }
                spanContext() {
                    return this._spanContext;
                }
                setAttribute(e, t) {
                    return this;
                }
                setAttributes(e) {
                    return this;
                }
                addEvent(e, t) {
                    return this;
                }
                setStatus(e) {
                    return this;
                }
                updateName(e) {
                    return this;
                }
                end(e) {}
                isRecording() {
                    return false;
                }
                recordException(e, t) {}
            }
            t.NonRecordingSpan = NonRecordingSpan;
        },
        614: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracer = void 0;
            const n = r(491);
            const a = r(607);
            const o = r(403);
            const i = r(139);
            const c = n.ContextAPI.getInstance();
            class NoopTracer {
                startSpan(e, t, r = c.active()) {
                    const n = Boolean(t === null || t === void 0 ? void 0 : t.root);
                    if (n) {
                        return new o.NonRecordingSpan;
                    }
                    const s = r && (0, a.getSpanContext)(r);
                    if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
                        return new o.NonRecordingSpan(s);
                    } else {
                        return new o.NonRecordingSpan;
                    }
                }
                startActiveSpan(e, t, r, n) {
                    let o;
                    let i;
                    let s;
                    if (arguments.length < 2) {
                        return;
                    } else if (arguments.length === 2) {
                        s = t;
                    } else if (arguments.length === 3) {
                        o = t;
                        s = r;
                    } else {
                        o = t;
                        i = r;
                        s = n;
                    }
                    const u = i !== null && i !== void 0 ? i : c.active();
                    const l = this.startSpan(e, o, u);
                    const g = (0, a.setSpan)(u, l);
                    return c.with(g, s, undefined, l);
                }
            }
            t.NoopTracer = NoopTracer;
            function isSpanContext(e) {
                return typeof e === "object" && typeof e["spanId"] === "string" && typeof e["traceId"] === "string" && typeof e["traceFlags"] === "number";
            }
        },
        124: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracerProvider = void 0;
            const n = r(614);
            class NoopTracerProvider {
                getTracer(e, t, r) {
                    return new n.NoopTracer;
                }
            }
            t.NoopTracerProvider = NoopTracerProvider;
        },
        125: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracer = void 0;
            const n = r(614);
            const a = new n.NoopTracer;
            class ProxyTracer {
                constructor(e, t, r, n){
                    this._provider = e;
                    this.name = t;
                    this.version = r;
                    this.options = n;
                }
                startSpan(e, t, r) {
                    return this._getTracer().startSpan(e, t, r);
                }
                startActiveSpan(e, t, r, n) {
                    const a = this._getTracer();
                    return Reflect.apply(a.startActiveSpan, a, arguments);
                }
                _getTracer() {
                    if (this._delegate) {
                        return this._delegate;
                    }
                    const e = this._provider.getDelegateTracer(this.name, this.version, this.options);
                    if (!e) {
                        return a;
                    }
                    this._delegate = e;
                    return this._delegate;
                }
            }
            t.ProxyTracer = ProxyTracer;
        },
        846: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracerProvider = void 0;
            const n = r(125);
            const a = r(124);
            const o = new a.NoopTracerProvider;
            class ProxyTracerProvider {
                getTracer(e, t, r) {
                    var a;
                    return (a = this.getDelegateTracer(e, t, r)) !== null && a !== void 0 ? a : new n.ProxyTracer(this, e, t, r);
                }
                getDelegate() {
                    var e;
                    return (e = this._delegate) !== null && e !== void 0 ? e : o;
                }
                setDelegate(e) {
                    this._delegate = e;
                }
                getDelegateTracer(e, t, r) {
                    var n;
                    return (n = this._delegate) === null || n === void 0 ? void 0 : n.getTracer(e, t, r);
                }
            }
            t.ProxyTracerProvider = ProxyTracerProvider;
        },
        996: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SamplingDecision = void 0;
            var r;
            (function(e) {
                e[e["NOT_RECORD"] = 0] = "NOT_RECORD";
                e[e["RECORD"] = 1] = "RECORD";
                e[e["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
            })(r = t.SamplingDecision || (t.SamplingDecision = {}));
        },
        607: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.getSpanContext = t.setSpanContext = t.deleteSpan = t.setSpan = t.getActiveSpan = t.getSpan = void 0;
            const n = r(780);
            const a = r(403);
            const o = r(491);
            const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
            function getSpan(e) {
                return e.getValue(i) || undefined;
            }
            t.getSpan = getSpan;
            function getActiveSpan() {
                return getSpan(o.ContextAPI.getInstance().active());
            }
            t.getActiveSpan = getActiveSpan;
            function setSpan(e, t) {
                return e.setValue(i, t);
            }
            t.setSpan = setSpan;
            function deleteSpan(e) {
                return e.deleteValue(i);
            }
            t.deleteSpan = deleteSpan;
            function setSpanContext(e, t) {
                return setSpan(e, new a.NonRecordingSpan(t));
            }
            t.setSpanContext = setSpanContext;
            function getSpanContext(e) {
                var t;
                return (t = getSpan(e)) === null || t === void 0 ? void 0 : t.spanContext();
            }
            t.getSpanContext = getSpanContext;
        },
        325: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceStateImpl = void 0;
            const n = r(564);
            const a = 32;
            const o = 512;
            const i = ",";
            const c = "=";
            class TraceStateImpl {
                constructor(e){
                    this._internalState = new Map;
                    if (e) this._parse(e);
                }
                set(e, t) {
                    const r = this._clone();
                    if (r._internalState.has(e)) {
                        r._internalState.delete(e);
                    }
                    r._internalState.set(e, t);
                    return r;
                }
                unset(e) {
                    const t = this._clone();
                    t._internalState.delete(e);
                    return t;
                }
                get(e) {
                    return this._internalState.get(e);
                }
                serialize() {
                    return this._keys().reduce((e, t)=>{
                        e.push(t + c + this.get(t));
                        return e;
                    }, []).join(i);
                }
                _parse(e) {
                    if (e.length > o) return;
                    this._internalState = e.split(i).reverse().reduce((e, t)=>{
                        const r = t.trim();
                        const a = r.indexOf(c);
                        if (a !== -1) {
                            const o = r.slice(0, a);
                            const i = r.slice(a + 1, t.length);
                            if ((0, n.validateKey)(o) && (0, n.validateValue)(i)) {
                                e.set(o, i);
                            } else {}
                        }
                        return e;
                    }, new Map);
                    if (this._internalState.size > a) {
                        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
                    }
                }
                _keys() {
                    return Array.from(this._internalState.keys()).reverse();
                }
                _clone() {
                    const e = new TraceStateImpl;
                    e._internalState = new Map(this._internalState);
                    return e;
                }
            }
            t.TraceStateImpl = TraceStateImpl;
        },
        564: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.validateValue = t.validateKey = void 0;
            const r = "[_0-9a-z-*/]";
            const n = `[a-z]${r}{0,255}`;
            const a = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;
            const o = new RegExp(`^(?:${n}|${a})$`);
            const i = /^[ -~]{0,255}[!-~]$/;
            const c = /,|=/;
            function validateKey(e) {
                return o.test(e);
            }
            t.validateKey = validateKey;
            function validateValue(e) {
                return i.test(e) && !c.test(e);
            }
            t.validateValue = validateValue;
        },
        98: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createTraceState = void 0;
            const n = r(325);
            function createTraceState(e) {
                return new n.TraceStateImpl(e);
            }
            t.createTraceState = createTraceState;
        },
        476: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0;
            const n = r(475);
            t.INVALID_SPANID = "0000000000000000";
            t.INVALID_TRACEID = "00000000000000000000000000000000";
            t.INVALID_SPAN_CONTEXT = {
                traceId: t.INVALID_TRACEID,
                spanId: t.INVALID_SPANID,
                traceFlags: n.TraceFlags.NONE
            };
        },
        357: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanKind = void 0;
            var r;
            (function(e) {
                e[e["INTERNAL"] = 0] = "INTERNAL";
                e[e["SERVER"] = 1] = "SERVER";
                e[e["CLIENT"] = 2] = "CLIENT";
                e[e["PRODUCER"] = 3] = "PRODUCER";
                e[e["CONSUMER"] = 4] = "CONSUMER";
            })(r = t.SpanKind || (t.SpanKind = {}));
        },
        139: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.wrapSpanContext = t.isSpanContextValid = t.isValidSpanId = t.isValidTraceId = void 0;
            const n = r(476);
            const a = r(403);
            const o = /^([0-9a-f]{32})$/i;
            const i = /^[0-9a-f]{16}$/i;
            function isValidTraceId(e) {
                return o.test(e) && e !== n.INVALID_TRACEID;
            }
            t.isValidTraceId = isValidTraceId;
            function isValidSpanId(e) {
                return i.test(e) && e !== n.INVALID_SPANID;
            }
            t.isValidSpanId = isValidSpanId;
            function isSpanContextValid(e) {
                return isValidTraceId(e.traceId) && isValidSpanId(e.spanId);
            }
            t.isSpanContextValid = isSpanContextValid;
            function wrapSpanContext(e) {
                return new a.NonRecordingSpan(e);
            }
            t.wrapSpanContext = wrapSpanContext;
        },
        847: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanStatusCode = void 0;
            var r;
            (function(e) {
                e[e["UNSET"] = 0] = "UNSET";
                e[e["OK"] = 1] = "OK";
                e[e["ERROR"] = 2] = "ERROR";
            })(r = t.SpanStatusCode || (t.SpanStatusCode = {}));
        },
        475: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceFlags = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["SAMPLED"] = 1] = "SAMPLED";
            })(r = t.TraceFlags || (t.TraceFlags = {}));
        },
        521: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.VERSION = void 0;
            t.VERSION = "1.6.0";
        }
    };
    var t = {};
    function __nccwpck_require__(r) {
        var n = t[r];
        if (n !== undefined) {
            return n.exports;
        }
        var a = t[r] = {
            exports: {}
        };
        var o = true;
        try {
            e[r].call(a.exports, a, a.exports, __nccwpck_require__);
            o = false;
        } finally{
            if (o) delete t[r];
        }
        return a.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var r = {};
    (()=>{
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        e.trace = e.propagation = e.metrics = e.diag = e.context = e.INVALID_SPAN_CONTEXT = e.INVALID_TRACEID = e.INVALID_SPANID = e.isValidSpanId = e.isValidTraceId = e.isSpanContextValid = e.createTraceState = e.TraceFlags = e.SpanStatusCode = e.SpanKind = e.SamplingDecision = e.ProxyTracerProvider = e.ProxyTracer = e.defaultTextMapSetter = e.defaultTextMapGetter = e.ValueType = e.createNoopMeter = e.DiagLogLevel = e.DiagConsoleLogger = e.ROOT_CONTEXT = e.createContextKey = e.baggageEntryMetadataFromString = void 0;
        var t = __nccwpck_require__(369);
        Object.defineProperty(e, "baggageEntryMetadataFromString", {
            enumerable: true,
            get: function() {
                return t.baggageEntryMetadataFromString;
            }
        });
        var n = __nccwpck_require__(780);
        Object.defineProperty(e, "createContextKey", {
            enumerable: true,
            get: function() {
                return n.createContextKey;
            }
        });
        Object.defineProperty(e, "ROOT_CONTEXT", {
            enumerable: true,
            get: function() {
                return n.ROOT_CONTEXT;
            }
        });
        var a = __nccwpck_require__(972);
        Object.defineProperty(e, "DiagConsoleLogger", {
            enumerable: true,
            get: function() {
                return a.DiagConsoleLogger;
            }
        });
        var o = __nccwpck_require__(957);
        Object.defineProperty(e, "DiagLogLevel", {
            enumerable: true,
            get: function() {
                return o.DiagLogLevel;
            }
        });
        var i = __nccwpck_require__(102);
        Object.defineProperty(e, "createNoopMeter", {
            enumerable: true,
            get: function() {
                return i.createNoopMeter;
            }
        });
        var c = __nccwpck_require__(901);
        Object.defineProperty(e, "ValueType", {
            enumerable: true,
            get: function() {
                return c.ValueType;
            }
        });
        var s = __nccwpck_require__(194);
        Object.defineProperty(e, "defaultTextMapGetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapGetter;
            }
        });
        Object.defineProperty(e, "defaultTextMapSetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapSetter;
            }
        });
        var u = __nccwpck_require__(125);
        Object.defineProperty(e, "ProxyTracer", {
            enumerable: true,
            get: function() {
                return u.ProxyTracer;
            }
        });
        var l = __nccwpck_require__(846);
        Object.defineProperty(e, "ProxyTracerProvider", {
            enumerable: true,
            get: function() {
                return l.ProxyTracerProvider;
            }
        });
        var g = __nccwpck_require__(996);
        Object.defineProperty(e, "SamplingDecision", {
            enumerable: true,
            get: function() {
                return g.SamplingDecision;
            }
        });
        var p = __nccwpck_require__(357);
        Object.defineProperty(e, "SpanKind", {
            enumerable: true,
            get: function() {
                return p.SpanKind;
            }
        });
        var d = __nccwpck_require__(847);
        Object.defineProperty(e, "SpanStatusCode", {
            enumerable: true,
            get: function() {
                return d.SpanStatusCode;
            }
        });
        var _ = __nccwpck_require__(475);
        Object.defineProperty(e, "TraceFlags", {
            enumerable: true,
            get: function() {
                return _.TraceFlags;
            }
        });
        var f = __nccwpck_require__(98);
        Object.defineProperty(e, "createTraceState", {
            enumerable: true,
            get: function() {
                return f.createTraceState;
            }
        });
        var b = __nccwpck_require__(139);
        Object.defineProperty(e, "isSpanContextValid", {
            enumerable: true,
            get: function() {
                return b.isSpanContextValid;
            }
        });
        Object.defineProperty(e, "isValidTraceId", {
            enumerable: true,
            get: function() {
                return b.isValidTraceId;
            }
        });
        Object.defineProperty(e, "isValidSpanId", {
            enumerable: true,
            get: function() {
                return b.isValidSpanId;
            }
        });
        var v = __nccwpck_require__(476);
        Object.defineProperty(e, "INVALID_SPANID", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPANID;
            }
        });
        Object.defineProperty(e, "INVALID_TRACEID", {
            enumerable: true,
            get: function() {
                return v.INVALID_TRACEID;
            }
        });
        Object.defineProperty(e, "INVALID_SPAN_CONTEXT", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPAN_CONTEXT;
            }
        });
        const O = __nccwpck_require__(67);
        Object.defineProperty(e, "context", {
            enumerable: true,
            get: function() {
                return O.context;
            }
        });
        const P = __nccwpck_require__(506);
        Object.defineProperty(e, "diag", {
            enumerable: true,
            get: function() {
                return P.diag;
            }
        });
        const N = __nccwpck_require__(886);
        Object.defineProperty(e, "metrics", {
            enumerable: true,
            get: function() {
                return N.metrics;
            }
        });
        const S = __nccwpck_require__(939);
        Object.defineProperty(e, "propagation", {
            enumerable: true,
            get: function() {
                return S.propagation;
            }
        });
        const C = __nccwpck_require__(845);
        Object.defineProperty(e, "trace", {
            enumerable: true,
            get: function() {
                return C.trace;
            }
        });
        e["default"] = {
            context: O.context,
            diag: P.diag,
            metrics: N.metrics,
            propagation: S.propagation,
            trace: C.trace
        };
    })();
    module.exports = r;
})();


/***/ }),

/***/ 578:
/***/ ((module) => {

"use strict";
var __dirname = "/";

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();


/***/ }),

/***/ 686:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  bailoutToClientRendering: () => (/* binding */ bailoutToClientRendering)
});

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/lazy-dynamic/bailout-to-csr.js
// This has to be a shared module which is shared between client component error boundary and dynamic component
const BAILOUT_TO_CSR = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
/** An error that should be thrown when we want to bail out to client-side rendering. */ class BailoutToCSRError extends Error {
    constructor(reason){
        super("Bail out to client-side rendering: " + reason);
        this.reason = reason;
        this.digest = BAILOUT_TO_CSR;
    }
}
/** Checks if a passed argument is an error that is thrown if we want to bail out to client-side rendering. */ function isBailoutToCSRError(err) {
    if (typeof err !== "object" || err === null || !("digest" in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js
var static_generation_async_storage_external = __webpack_require__(285);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/bailout-to-client-rendering.js


function bailoutToClientRendering(reason) {
    const staticGenerationStore = static_generation_async_storage_external/* staticGenerationAsyncStorage */.A.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) return;
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) throw new BailoutToCSRError(reason);
} //# sourceMappingURL=bailout-to-client-rendering.js.map


/***/ }),

/***/ 285:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ staticGenerationAsyncStorage)
/* harmony export */ });
/* harmony import */ var _async_local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(151);

const staticGenerationAsyncStorage = (0,_async_local_storage__WEBPACK_IMPORTED_MODULE_0__/* .createAsyncLocalStorage */ .P)(); //# sourceMappingURL=static-generation-async-storage.external.js.map


/***/ }),

/***/ 253:
/***/ ((module) => {

"use strict";
// Note: This file is JS because it's used by the taskfile-swc.js file, which is JS.
// Keep file changes in sync with the corresponding `.d.ts` files.
/**
 * These are the browser versions that support all of the following:
 * static import: https://caniuse.com/es6-module
 * dynamic import: https://caniuse.com/es6-module-dynamic-import
 * import.meta: https://caniuse.com/mdn-javascript_operators_import_meta
 */ 
const MODERN_BROWSERSLIST_TARGET = [
    "chrome 64",
    "edge 79",
    "firefox 67",
    "opera 51",
    "safari 12"
];
module.exports = MODERN_BROWSERSLIST_TARGET; //# sourceMappingURL=modern-browserslist-target.js.map


/***/ }),

/***/ 122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    withRequest: function() {
        return withRequest;
    },
    getTestReqInfo: function() {
        return getTestReqInfo;
    }
});
const _nodeasync_hooks = __webpack_require__(67);
const testStorage = new _nodeasync_hooks.AsyncLocalStorage();
function extractTestInfoFromRequest(req, reader) {
    const proxyPortHeader = reader.header(req, "next-test-proxy-port");
    if (!proxyPortHeader) {
        return undefined;
    }
    const url = reader.url(req);
    const proxyPort = Number(proxyPortHeader);
    const testData = reader.header(req, "next-test-data") || "";
    return {
        url,
        proxyPort,
        testData
    };
}
function withRequest(req, reader, fn) {
    const testReqInfo = extractTestInfoFromRequest(req, reader);
    if (!testReqInfo) {
        return fn();
    }
    return testStorage.run(testReqInfo, fn);
}
function getTestReqInfo(req, reader) {
    const testReqInfo = testStorage.getStore();
    if (testReqInfo) {
        return testReqInfo;
    }
    if (req && reader) {
        return extractTestInfoFromRequest(req, reader);
    }
    return undefined;
} //# sourceMappingURL=context.js.map


/***/ }),

/***/ 131:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(195)["Buffer"];

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    reader: function() {
        return reader;
    },
    handleFetch: function() {
        return handleFetch;
    },
    interceptFetch: function() {
        return interceptFetch;
    }
});
const _context = __webpack_require__(122);
const reader = {
    url (req) {
        return req.url;
    },
    header (req, name) {
        return req.headers.get(name);
    }
};
function getTestStack() {
    let stack = (new Error().stack ?? "").split("\n");
    // Skip the first line and find first non-empty line.
    for(let i = 1; i < stack.length; i++){
        if (stack[i].length > 0) {
            stack = stack.slice(i);
            break;
        }
    }
    // Filter out franmework lines.
    stack = stack.filter((f)=>!f.includes("/next/dist/"));
    // At most 5 lines.
    stack = stack.slice(0, 5);
    // Cleanup some internal info and trim.
    stack = stack.map((s)=>s.replace("webpack-internal:///(rsc)/", "").trim());
    return stack.join("    ");
}
async function buildProxyRequest(testData, request) {
    const { url, method, headers, body, cache, credentials, integrity, mode, redirect, referrer, referrerPolicy } = request;
    return {
        testData,
        api: "fetch",
        request: {
            url,
            method,
            headers: [
                ...Array.from(headers),
                [
                    "next-test-stack",
                    getTestStack()
                ]
            ],
            body: body ? Buffer.from(await request.arrayBuffer()).toString("base64") : null,
            cache,
            credentials,
            integrity,
            mode,
            redirect,
            referrer,
            referrerPolicy
        }
    };
}
function buildResponse(proxyResponse) {
    const { status, headers, body } = proxyResponse.response;
    return new Response(body ? Buffer.from(body, "base64") : null, {
        status,
        headers: new Headers(headers)
    });
}
async function handleFetch(originalFetch, request) {
    const testInfo = (0, _context.getTestReqInfo)(request, reader);
    if (!testInfo) {
        throw new Error(`No test info for ${request.method} ${request.url}`);
    }
    const { testData, proxyPort } = testInfo;
    const proxyRequest = await buildProxyRequest(testData, request);
    const resp = await originalFetch(`http://localhost:${proxyPort}`, {
        method: "POST",
        body: JSON.stringify(proxyRequest),
        next: {
            // @ts-ignore
            internal: true
        }
    });
    if (!resp.ok) {
        throw new Error(`Proxy request failed: ${resp.status}`);
    }
    const proxyResponse = await resp.json();
    const { api } = proxyResponse;
    switch(api){
        case "continue":
            return originalFetch(request);
        case "abort":
        case "unhandled":
            throw new Error(`Proxy request aborted [${request.method} ${request.url}]`);
        default:
            break;
    }
    return buildResponse(proxyResponse);
}
function interceptFetch(originalFetch) {
    __webpack_require__.g.fetch = function testFetch(input, init) {
        var _init_next;
        // Passthrough internal requests.
        // @ts-ignore
        if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
            return originalFetch(input, init);
        }
        return handleFetch(originalFetch, new Request(input, init));
    };
    return ()=>{
        __webpack_require__.g.fetch = originalFetch;
    };
} //# sourceMappingURL=fetch.js.map


/***/ }),

/***/ 895:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandler: function() {
        return wrapRequestHandler;
    }
});
const _context = __webpack_require__(122);
const _fetch = __webpack_require__(131);
function interceptTestApis() {
    return (0, _fetch.interceptFetch)(__webpack_require__.g.fetch);
}
function wrapRequestHandler(handler) {
    return (req, fn)=>(0, _context.withRequest)(req, _fetch.reader, ()=>handler(req, fn));
} //# sourceMappingURL=server-edge.js.map


/***/ }),

/***/ 255:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
function A(a) {
    if (null === a || "object" !== typeof a) return null;
    a = z && a[z] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
var B = {
    isMounted: function() {
        return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}, C = Object.assign, D = {};
function E(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D;
    this.updater = e || B;
}
E.prototype.isReactComponent = {};
E.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b, "setState");
};
E.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {}
F.prototype = E.prototype;
function G(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D;
    this.updater = e || B;
}
var H = G.prototype = new F;
H.constructor = G;
C(H, E.prototype);
H.isPureReactComponent = !0;
var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = {
    current: null
}, L = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function M(a, b, e) {
    var d, c = {}, k = null, h = null;
    if (null != b) for(d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
        for(var f = Array(g), m = 0; m < g; m++)f[m] = arguments[m + 2];
        c.children = f;
    }
    if (a && a.defaultProps) for(d in g = a.defaultProps, g)void 0 === c[d] && (c[d] = g[d]);
    return {
        $$typeof: l,
        type: a,
        key: k,
        ref: h,
        props: c,
        _owner: K.current
    };
}
function N(a, b) {
    return {
        $$typeof: l,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner
    };
}
function O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === l;
}
function escape(a) {
    var b = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + a.replace(/[=:]/g, function(a) {
        return b[a];
    });
}
var P = /\/+/g;
function Q(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R(a, b, e, d, c) {
    var k = typeof a;
    if ("undefined" === k || "boolean" === k) a = null;
    var h = !1;
    if (null === a) h = !0;
    else switch(k){
        case "string":
        case "number":
            h = !0;
            break;
        case "object":
            switch(a.$$typeof){
                case l:
                case n:
                    h = !0;
            }
    }
    if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a) {
        return a;
    })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I(a)) for(var g = 0; g < a.length; g++){
        k = a[g];
        var f = d + Q(k, g);
        h += R(k, b, e, f, c);
    }
    else if (f = A(a), "function" === typeof f) for(a = f.call(a), g = 0; !(k = a.next()).done;)k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
    else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
}
function S(a, b, e) {
    if (null == a) return a;
    var d = [], c = 0;
    R(a, d, "", "", function(a) {
        return b.call(e, a, c++);
    });
    return d;
}
function T(a) {
    if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
        }, function(b) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
        });
        -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
}
var U = {
    current: null
}, V = {
    transition: null
}, W = {
    ReactCurrentDispatcher: U,
    ReactCurrentBatchConfig: V,
    ReactCurrentOwner: K
};
function X() {
    throw Error("act(...) is not supported in production builds of React.");
}
exports.Children = {
    map: S,
    forEach: function(a, b, e) {
        S(a, function() {
            b.apply(this, arguments);
        }, e);
    },
    count: function(a) {
        var b = 0;
        S(a, function() {
            b++;
        });
        return b;
    },
    toArray: function(a) {
        return S(a, function(a) {
            return a;
        }) || [];
    },
    only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
    }
};
exports.Component = E;
exports.Fragment = p;
exports.Profiler = r;
exports.PureComponent = G;
exports.StrictMode = q;
exports.Suspense = w;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
exports.act = X;
exports.cloneElement = function(a, b, e) {
    if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
    if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for(f in b)J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (1 === f) d.children = e;
    else if (1 < f) {
        g = Array(f);
        for(var m = 0; m < f; m++)g[m] = arguments[m + 2];
        d.children = g;
    }
    return {
        $$typeof: l,
        type: a.type,
        key: c,
        ref: k,
        props: d,
        _owner: h
    };
};
exports.createContext = function(a) {
    a = {
        $$typeof: u,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    };
    a.Provider = {
        $$typeof: t,
        _context: a
    };
    return a.Consumer = a;
};
exports.createElement = M;
exports.createFactory = function(a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
};
exports.createRef = function() {
    return {
        current: null
    };
};
exports.forwardRef = function(a) {
    return {
        $$typeof: v,
        render: a
    };
};
exports.isValidElement = O;
exports.lazy = function(a) {
    return {
        $$typeof: y,
        _payload: {
            _status: -1,
            _result: a
        },
        _init: T
    };
};
exports.memo = function(a, b) {
    return {
        $$typeof: x,
        type: a,
        compare: void 0 === b ? null : b
    };
};
exports.startTransition = function(a) {
    var b = V.transition;
    V.transition = {};
    try {
        a();
    } finally{
        V.transition = b;
    }
};
exports.unstable_act = X;
exports.useCallback = function(a, b) {
    return U.current.useCallback(a, b);
};
exports.useContext = function(a) {
    return U.current.useContext(a);
};
exports.useDebugValue = function() {};
exports.useDeferredValue = function(a) {
    return U.current.useDeferredValue(a);
};
exports.useEffect = function(a, b) {
    return U.current.useEffect(a, b);
};
exports.useId = function() {
    return U.current.useId();
};
exports.useImperativeHandle = function(a, b, e) {
    return U.current.useImperativeHandle(a, b, e);
};
exports.useInsertionEffect = function(a, b) {
    return U.current.useInsertionEffect(a, b);
};
exports.useLayoutEffect = function(a, b) {
    return U.current.useLayoutEffect(a, b);
};
exports.useMemo = function(a, b) {
    return U.current.useMemo(a, b);
};
exports.useReducer = function(a, b, e) {
    return U.current.useReducer(a, b, e);
};
exports.useRef = function(a) {
    return U.current.useRef(a);
};
exports.useState = function(a) {
    return U.current.useState(a);
};
exports.useSyncExternalStore = function(a, b, e) {
    return U.current.useSyncExternalStore(a, b, e);
};
exports.useTransition = function() {
    return U.current.useTransition();
};
exports.version = "18.3.1";


/***/ }),

/***/ 211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (true) {
    module.exports = __webpack_require__(255);
} else {}


/***/ }),

/***/ 151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ createAsyncLocalStorage)
/* harmony export */ });
const sharedAsyncLocalStorageNotAvailableError = new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
}
const maybeGlobalAsyncLocalStorage = globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
} //# sourceMappingURL=async-local-storage.js.map


/***/ }),

/***/ 843:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */ // biome-ignore-all lint: generated file
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 938, 19)));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(259));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES)["middleware_src/middleware"] = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=middleware.js.map