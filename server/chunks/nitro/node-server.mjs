globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, createError, getHeaders, useBody, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash, joinURL } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import axios from 'axios';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.req.url?.startsWith("/__nuxt_error");
  let html = !isErrorPage ? await $fetch(withQuery("/__nuxt_error", errorObject), {
    headers: getRequestHeaders(event)
  }).catch(() => null) : null;
  if (!html) {
    const { template } = await import('../error-500.mjs');
    html = template(errorObject);
  }
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/alert.png": {
    "type": "image/png",
    "etag": "\"e59-u8F3WhkCqZ5q0QozS6HqSS5+kZY\"",
    "mtime": "2022-11-08T08:38:27.668Z",
    "size": 3673,
    "path": "../public/alert.png"
  },
  "/check.png": {
    "type": "image/png",
    "etag": "\"1760-M/vvzqiL9wj0QCydFZ2TgyxpMxs\"",
    "mtime": "2022-11-08T08:38:27.642Z",
    "size": 5984,
    "path": "../public/check.png"
  },
  "/delete.png": {
    "type": "image/png",
    "etag": "\"1694-sWT+0R3lGg58+lRofgj/JiAhDpo\"",
    "mtime": "2022-11-08T08:38:27.641Z",
    "size": 5780,
    "path": "../public/delete.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-C55WuIAyh7hKQVer/LFA+m9aKYY\"",
    "mtime": "2022-11-08T08:38:27.640Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/idea.png": {
    "type": "image/png",
    "etag": "\"fb9-BLDaO/q3GSU5wcRYZVcNFGtev3E\"",
    "mtime": "2022-11-08T08:38:27.639Z",
    "size": 4025,
    "path": "../public/idea.png"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"4f52-gxOib78RrRRu8ABV4I+eEa11Ios\"",
    "mtime": "2022-11-08T08:38:27.638Z",
    "size": 20306,
    "path": "../public/logo.png"
  },
  "/user.png": {
    "type": "image/png",
    "etag": "\"2064-ctE0Mb3jVvODWHvo10XwJm+FCZA\"",
    "mtime": "2022-11-08T08:38:27.637Z",
    "size": 8292,
    "path": "../public/user.png"
  },
  "/_nuxt/404.0690029b.js": {
    "type": "application/javascript",
    "etag": "\"ae9-HGnHzUEaSH37B+MzxMsZ09EIqVw\"",
    "mtime": "2022-11-08T08:38:27.635Z",
    "size": 2793,
    "path": "../public/_nuxt/404.0690029b.js"
  },
  "/_nuxt/Alert.d30f8558.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d-cmzJcoXvDo4BXREaq9h2JlaRtjs\"",
    "mtime": "2022-11-08T08:38:27.634Z",
    "size": 61,
    "path": "../public/_nuxt/Alert.d30f8558.css"
  },
  "/_nuxt/Alert.fe427bf3.js": {
    "type": "application/javascript",
    "etag": "\"729-bL+wEDbe0XfAIEaiRgwStDPxLmk\"",
    "mtime": "2022-11-08T08:38:27.633Z",
    "size": 1833,
    "path": "../public/_nuxt/Alert.fe427bf3.js"
  },
  "/_nuxt/Editor.32669da8.js": {
    "type": "application/javascript",
    "etag": "\"7e1-fIXUsq5kukZZ9hIQGL52jfz/myo\"",
    "mtime": "2022-11-08T08:38:27.632Z",
    "size": 2017,
    "path": "../public/_nuxt/Editor.32669da8.js"
  },
  "/_nuxt/Filter.vue_vue_type_script_setup_true_lang.4630c468.js": {
    "type": "application/javascript",
    "etag": "\"230-ZRXdQf/5zSQD24mQm0hwV5Uh2Is\"",
    "mtime": "2022-11-08T08:38:27.631Z",
    "size": 560,
    "path": "../public/_nuxt/Filter.vue_vue_type_script_setup_true_lang.4630c468.js"
  },
  "/_nuxt/Header.d7c2b674.js": {
    "type": "application/javascript",
    "etag": "\"cb-cQJaUr5xZ+xc4hJfOGgBEDZ0kGA\"",
    "mtime": "2022-11-08T08:38:27.630Z",
    "size": 203,
    "path": "../public/_nuxt/Header.d7c2b674.js"
  },
  "/_nuxt/Loading.7caf782e.js": {
    "type": "application/javascript",
    "etag": "\"3cc-LJSFt5x9QHxr6Aa6NelQGycA9xE\"",
    "mtime": "2022-11-08T08:38:27.629Z",
    "size": 972,
    "path": "../public/_nuxt/Loading.7caf782e.js"
  },
  "/_nuxt/Loading.af361d3a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d-bCckDI11QuLsuUXWKzD2gTqkvKE\"",
    "mtime": "2022-11-08T08:38:27.627Z",
    "size": 61,
    "path": "../public/_nuxt/Loading.af361d3a.css"
  },
  "/_nuxt/Message.43f7e391.js": {
    "type": "application/javascript",
    "etag": "\"47a-1hhvmqmRp3w9COsNnJOHMM5w4yc\"",
    "mtime": "2022-11-08T08:38:27.626Z",
    "size": 1146,
    "path": "../public/_nuxt/Message.43f7e391.js"
  },
  "/_nuxt/Message.669cb7fd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d-2nHw8OqSrqD6b4eYWLv1HR84JEg\"",
    "mtime": "2022-11-08T08:38:27.624Z",
    "size": 61,
    "path": "../public/_nuxt/Message.669cb7fd.css"
  },
  "/_nuxt/Row.40fcbaff.js": {
    "type": "application/javascript",
    "etag": "\"710-oArFbKlneUvIWXaxA9TirN5Ovgo\"",
    "mtime": "2022-11-08T08:38:27.623Z",
    "size": 1808,
    "path": "../public/_nuxt/Row.40fcbaff.js"
  },
  "/_nuxt/Row.vue_vue_type_script_setup_true_lang.4c0e436b.js": {
    "type": "application/javascript",
    "etag": "\"ad6-rskQB4A7AXaAmCs0DsbSn2+I6RA\"",
    "mtime": "2022-11-08T08:38:27.622Z",
    "size": 2774,
    "path": "../public/_nuxt/Row.vue_vue_type_script_setup_true_lang.4c0e436b.js"
  },
  "/_nuxt/RowLoading.ed54ba8f.js": {
    "type": "application/javascript",
    "etag": "\"993-nIIe03uV0SLr+pI3fWgJeYlbXpQ\"",
    "mtime": "2022-11-08T08:38:27.621Z",
    "size": 2451,
    "path": "../public/_nuxt/RowLoading.ed54ba8f.js"
  },
  "/_nuxt/Wrapper.1079b3c3.js": {
    "type": "application/javascript",
    "etag": "\"6f6-yuL0iAN+zPlJYCQzYMwA7jjX2ko\"",
    "mtime": "2022-11-08T08:38:27.620Z",
    "size": 1782,
    "path": "../public/_nuxt/Wrapper.1079b3c3.js"
  },
  "/_nuxt/_articleSlug_.0b5ec6fd.js": {
    "type": "application/javascript",
    "etag": "\"4bc3-KOVAv1utrGiCGv6fwRu1nj20Knc\"",
    "mtime": "2022-11-08T08:38:27.618Z",
    "size": 19395,
    "path": "../public/_nuxt/_articleSlug_.0b5ec6fd.js"
  },
  "/_nuxt/_categorySlug_.7597fa49.js": {
    "type": "application/javascript",
    "etag": "\"bea-Wkk4ogvIzQBELZN2QQwqPVMmNdU\"",
    "mtime": "2022-11-08T08:38:27.617Z",
    "size": 3050,
    "path": "../public/_nuxt/_categorySlug_.7597fa49.js"
  },
  "/_nuxt/arrow-right-thin.688ae360.js": {
    "type": "application/javascript",
    "etag": "\"2a9-4oJ5A0IZAM3VFMqZbhsgncUPcFM\"",
    "mtime": "2022-11-08T08:38:27.615Z",
    "size": 681,
    "path": "../public/_nuxt/arrow-right-thin.688ae360.js"
  },
  "/_nuxt/auth.d3b25e6f.js": {
    "type": "application/javascript",
    "etag": "\"e1-nc26KASygLAw1WsmNgbsARg329k\"",
    "mtime": "2022-11-08T08:38:27.612Z",
    "size": 225,
    "path": "../public/_nuxt/auth.d3b25e6f.js"
  },
  "/_nuxt/blog.00638512.js": {
    "type": "application/javascript",
    "etag": "\"42e-NLUlv+xTVYjR1vGtFT8CZGKXFjs\"",
    "mtime": "2022-11-08T08:38:27.611Z",
    "size": 1070,
    "path": "../public/_nuxt/blog.00638512.js"
  },
  "/_nuxt/blog.6fe8dcd2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"60-c30FKhBqojcbkNE+vZpye02iHPU\"",
    "mtime": "2022-11-08T08:38:27.609Z",
    "size": 96,
    "path": "../public/_nuxt/blog.6fe8dcd2.css"
  },
  "/_nuxt/change-phone.dbccd630.js": {
    "type": "application/javascript",
    "etag": "\"88b-LT662oiiDG9dlcpuRj4iU92n5KI\"",
    "mtime": "2022-11-08T08:38:27.608Z",
    "size": 2187,
    "path": "../public/_nuxt/change-phone.dbccd630.js"
  },
  "/_nuxt/collections.2c3cb905.js": {
    "type": "application/javascript",
    "etag": "\"9a4-qqSt3E0JfvArR9iRxbH2tpDwaw8\"",
    "mtime": "2022-11-08T08:38:27.607Z",
    "size": 2468,
    "path": "../public/_nuxt/collections.2c3cb905.js"
  },
  "/_nuxt/email-binding.a188b21d.js": {
    "type": "application/javascript",
    "etag": "\"6d8-6mqp/mFyLbSlzMZVe7bSbtQtrqE\"",
    "mtime": "2022-11-08T08:38:27.606Z",
    "size": 1752,
    "path": "../public/_nuxt/email-binding.a188b21d.js"
  },
  "/_nuxt/email-verify.a62a1f02.js": {
    "type": "application/javascript",
    "etag": "\"3f0-ys0LiddjmyoOtVhVtB6F7+bru+c\"",
    "mtime": "2022-11-08T08:38:27.605Z",
    "size": 1008,
    "path": "../public/_nuxt/email-verify.a62a1f02.js"
  },
  "/_nuxt/entry.13cd8dda.js": {
    "type": "application/javascript",
    "etag": "\"58c63-Ax8N/n0AIwfkW3xI5iM+skA6Cfw\"",
    "mtime": "2022-11-08T08:38:27.603Z",
    "size": 363619,
    "path": "../public/_nuxt/entry.13cd8dda.js"
  },
  "/_nuxt/entry.25b547d2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11e96-bZ/s5vBlbkyPrrkw8yNXKHSP89Y\"",
    "mtime": "2022-11-08T08:38:27.598Z",
    "size": 73366,
    "path": "../public/_nuxt/entry.25b547d2.css"
  },
  "/_nuxt/error-404.18ced855.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-F8gJ3uSz6Dg2HRyb374Ax3RegKE\"",
    "mtime": "2022-11-08T08:38:27.595Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.18ced855.css"
  },
  "/_nuxt/error-404.35a025b0.js": {
    "type": "application/javascript",
    "etag": "\"8a8-zKydGw41B+ci/D7yRcbEIpyzp9U\"",
    "mtime": "2022-11-08T08:38:27.594Z",
    "size": 2216,
    "path": "../public/_nuxt/error-404.35a025b0.js"
  },
  "/_nuxt/error-500.98d52522.js": {
    "type": "application/javascript",
    "etag": "\"756-CKmJ0kH2AasJrGW/wVWQxVe0C5o\"",
    "mtime": "2022-11-08T08:38:27.592Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.98d52522.js"
  },
  "/_nuxt/error-500.e60962de.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-VhleGjkSRH7z4cQDJV3dxcboMhU\"",
    "mtime": "2022-11-08T08:38:27.591Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.e60962de.css"
  },
  "/_nuxt/error-component.caebbef8.js": {
    "type": "application/javascript",
    "etag": "\"465-spm+1VTgODFQTET82ZpM+T/cAwE\"",
    "mtime": "2022-11-08T08:38:27.590Z",
    "size": 1125,
    "path": "../public/_nuxt/error-component.caebbef8.js"
  },
  "/_nuxt/history.3343da02.js": {
    "type": "application/javascript",
    "etag": "\"98f-rrui6C57nI3c1yk96Jf8lp7UDOA\"",
    "mtime": "2022-11-08T08:38:27.589Z",
    "size": 2447,
    "path": "../public/_nuxt/history.3343da02.js"
  },
  "/_nuxt/identify-verify.19be09c9.js": {
    "type": "application/javascript",
    "etag": "\"f62-OOLLJ2REmePnPfK/pouDu5Ootsc\"",
    "mtime": "2022-11-08T08:38:27.587Z",
    "size": 3938,
    "path": "../public/_nuxt/identify-verify.19be09c9.js"
  },
  "/_nuxt/index.8b079a3b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2f-upd+AMCr7QF8OP0dmkukDGKUgfI\"",
    "mtime": "2022-11-08T08:38:27.586Z",
    "size": 47,
    "path": "../public/_nuxt/index.8b079a3b.css"
  },
  "/_nuxt/index.8ce15e95.js": {
    "type": "application/javascript",
    "etag": "\"1de3-Tp2Ecvqby2cIQtjxRV6kJRYqClk\"",
    "mtime": "2022-11-08T08:38:27.585Z",
    "size": 7651,
    "path": "../public/_nuxt/index.8ce15e95.js"
  },
  "/_nuxt/index.f6d6654e.js": {
    "type": "application/javascript",
    "etag": "\"809d-M0BRmjCySzsvks6QekDHX2pwrfQ\"",
    "mtime": "2022-11-08T08:38:27.584Z",
    "size": 32925,
    "path": "../public/_nuxt/index.f6d6654e.js"
  },
  "/_nuxt/member-rule.8fc54f4b.js": {
    "type": "application/javascript",
    "etag": "\"4806-szNOTMEXWuc6qFdK+Bt5w2quXaQ\"",
    "mtime": "2022-11-08T08:38:27.582Z",
    "size": 18438,
    "path": "../public/_nuxt/member-rule.8fc54f4b.js"
  },
  "/_nuxt/my.97abc048.js": {
    "type": "application/javascript",
    "etag": "\"763-S9Wj0cH6KC25xm1rm62VCjJ9LSo\"",
    "mtime": "2022-11-08T08:38:27.580Z",
    "size": 1891,
    "path": "../public/_nuxt/my.97abc048.js"
  },
  "/_nuxt/my.f3710ac4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"be-iKKCpg3GNqx/3bEfZ0lPJ3rTdYs\"",
    "mtime": "2022-11-08T08:38:27.579Z",
    "size": 190,
    "path": "../public/_nuxt/my.f3710ac4.css"
  },
  "/_nuxt/regex.2eecabee.js": {
    "type": "application/javascript",
    "etag": "\"90-crIcy+8Ypl5zHulgAp9Z76YKL04\"",
    "mtime": "2022-11-08T08:38:27.577Z",
    "size": 144,
    "path": "../public/_nuxt/regex.2eecabee.js"
  },
  "/_nuxt/reset-password.b9256856.js": {
    "type": "application/javascript",
    "etag": "\"86b-RbJuvlqNOeSQKtHNzen57rHFAaY\"",
    "mtime": "2022-11-08T08:38:27.576Z",
    "size": 2155,
    "path": "../public/_nuxt/reset-password.b9256856.js"
  },
  "/_nuxt/tips.fc948a5b.js": {
    "type": "application/javascript",
    "etag": "\"5c5-UdWuoK6ncf09RX4vWkGUcnW8uiE\"",
    "mtime": "2022-11-08T08:38:27.574Z",
    "size": 1477,
    "path": "../public/_nuxt/tips.fc948a5b.js"
  },
  "/_nuxt/video.288b136e.js": {
    "type": "application/javascript",
    "etag": "\"83-C3uWmnZYF+yI22NukpuAHrh3Rok\"",
    "mtime": "2022-11-08T08:38:27.572Z",
    "size": 131,
    "path": "../public/_nuxt/video.288b136e.js"
  },
  "/_nuxt/vue-quill.esm-bundler.4fb7df71.js": {
    "type": "application/javascript",
    "etag": "\"3e8a7-kgcEQ7dZoFPjc7cNRhIOBHs0lb4\"",
    "mtime": "2022-11-08T08:38:27.570Z",
    "size": 256167,
    "path": "../public/_nuxt/vue-quill.esm-bundler.4fb7df71.js"
  },
  "/assets/gem/gem.gltf": {
    "type": "model/gltf+json",
    "etag": "\"110749-1GN9iIUMOjMyfvoL74c4OkTP8W8\"",
    "mtime": "2022-11-08T08:38:27.666Z",
    "size": 1115977,
    "path": "../public/assets/gem/gem.gltf"
  },
  "/assets/gem/roughness.jpeg": {
    "type": "image/jpeg",
    "etag": "\"8da04-G+tH2LcY/L0u0+bny8RdV9AZ54Q\"",
    "mtime": "2022-11-08T08:38:27.651Z",
    "size": 580100,
    "path": "../public/assets/gem/roughness.jpeg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const request = axios.create({
  baseURL: "http://admin.webdemo-tw.com/api/app",
  timeout: 5e3
});
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    var _a, _b;
    return Promise.reject((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) != null ? _b : error);
  }
);
const request$1 = request;

const _JCIY1Q = defineEventHandler(async (event) => {
  var _a, _b;
  const headers = getHeaders(event);
  const { authorization } = headers;
  const method = event.req.method;
  const isMultipart = ((_a = headers["content-type"]) == null ? void 0 : _a.split("/").shift()) === "multipart";
  if (method === "POST" && !isMultipart) {
    const body = await useBody(event);
    if (body == null ? void 0 : body.server)
      request$1.server = true;
    else
      (_b = request$1) == null ? true : delete _b.server;
  }
  if (authorization)
    request$1.defaults.headers.Authorization = authorization;
  else
    request$1.defaults.headers.Authorization = "";
});

const _lazy_SWmi3z = () => import('../update.post.mjs');
const _lazy_Kr7Hbn = () => import('../reset-password.post.mjs');
const _lazy_Mbo1R9 = () => import('../person.post.mjs');
const _lazy_NISALt = () => import('../logout.post.mjs');
const _lazy_vYRXIO = () => import('../identify-verify.post.mjs');
const _lazy_YPvuV0 = () => import('../email-verify.post.mjs');
const _lazy_NcIYX5 = () => import('../email-binding.post.mjs');
const _lazy_LWmtdJ = () => import('../change-phone.post.mjs');
const _lazy_gkSs7Q = () => import('../today.post.mjs');
const _lazy_XkScKh = () => import('../info.post.mjs');
const _lazy_Ey2k5F = () => import('../collection.post.mjs');
const _lazy_TAfe6e = () => import('../page.post.mjs');
const _lazy_wpkAIy = () => import('../list.post.mjs');
const _lazy_2kNQxW = () => import('../like.post.mjs');
const _lazy_W6htaU = () => import('../collection.post2.mjs');
const _lazy_gBmhXW = () => import('../categories.post.mjs');
const _lazy_44Xket = () => import('../article.post.mjs');
const _lazy_HaP09Y = () => import('../tips.post.mjs');
const _lazy_eNG2QJ = () => import('../history.post.mjs');
const _lazy_XcuUnw = () => import('../collections.post.mjs');
const _lazy_zT2efe = () => import('../page.post2.mjs');
const _lazy_w3oC3r = () => import('../like.post2.mjs');
const _lazy_BgLOq3 = () => import('../create.post.mjs');
const _lazy_h0Y4o3 = () => import('../upload.post.mjs');
const _lazy_Emf08N = () => import('../info.post2.mjs');
const _lazy_6ZtkZM = () => import('../register.post.mjs');
const _lazy_8HuguE = () => import('../refresh.post.mjs');
const _lazy_tILfxB = () => import('../login.post.mjs');
const _lazy_WhvMck = () => import('../forgot.post.mjs');
const _lazy_EWh5HV = () => import('../_type_-captcha.post.mjs');
const _lazy_Z8Ea61 = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _JCIY1Q, lazy: false, middleware: true, method: undefined },
  { route: '/api/user/update', handler: _lazy_SWmi3z, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/reset-password', handler: _lazy_Kr7Hbn, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/person', handler: _lazy_Mbo1R9, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/logout', handler: _lazy_NISALt, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/identify-verify', handler: _lazy_vYRXIO, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/email-verify', handler: _lazy_YPvuV0, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/email-binding', handler: _lazy_NcIYX5, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/change-phone', handler: _lazy_LWmtdJ, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/today', handler: _lazy_gkSs7Q, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/info', handler: _lazy_XkScKh, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/collection', handler: _lazy_Ey2k5F, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/page', handler: _lazy_TAfe6e, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/list', handler: _lazy_wpkAIy, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/like', handler: _lazy_2kNQxW, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/collection', handler: _lazy_W6htaU, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/categories', handler: _lazy_gBmhXW, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/article', handler: _lazy_44Xket, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/tips', handler: _lazy_HaP09Y, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/history', handler: _lazy_eNG2QJ, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/collections', handler: _lazy_XcuUnw, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/page', handler: _lazy_zT2efe, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/like', handler: _lazy_w3oC3r, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/create', handler: _lazy_BgLOq3, lazy: true, middleware: false, method: "post" },
  { route: '/api/comm/upload', handler: _lazy_h0Y4o3, lazy: true, middleware: false, method: "post" },
  { route: '/api/category/info', handler: _lazy_Emf08N, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/register', handler: _lazy_6ZtkZM, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/refresh', handler: _lazy_8HuguE, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_tILfxB, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/forgot', handler: _lazy_WhvMck, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/:type-captcha', handler: _lazy_EWh5HV, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_Z8Ea61, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_Z8Ea61, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, request$1 as r, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
