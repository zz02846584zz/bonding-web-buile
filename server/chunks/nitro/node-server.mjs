globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, getHeaders, useBody, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
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

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"naiveUI":{}}};
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

const script = "const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"\",t=\"\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"\",t=\"\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _LwqkV87CRh = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _LwqkV87CRh
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
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery("/__nuxt_error", errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.res.statusMessage = res.statusText;
  }
  event.res.end(await res.text());
});

const assets = {
  "/alert.png": {
    "type": "image/png",
    "etag": "\"e59-u8F3WhkCqZ5q0QozS6HqSS5+kZY\"",
    "mtime": "2022-11-17T08:15:40.458Z",
    "size": 3673,
    "path": "../public/alert.png"
  },
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"150b4-Z1s9FVistDIgtbxgpdZ5q8fc7zo\"",
    "mtime": "2022-11-17T08:15:40.458Z",
    "size": 86196,
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"7c336-hy6OuYRKnR+XVILfJr2mTitg/tY\"",
    "mtime": "2022-11-17T08:15:40.456Z",
    "size": 508726,
    "path": "../public/android-chrome-512x512.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"12e85-P4MIcw35j1vJ1xxDiLRSUX6J3Vk\"",
    "mtime": "2022-11-17T08:15:40.454Z",
    "size": 77445,
    "path": "../public/apple-touch-icon.png"
  },
  "/check.png": {
    "type": "image/png",
    "etag": "\"1760-M/vvzqiL9wj0QCydFZ2TgyxpMxs\"",
    "mtime": "2022-11-17T08:15:40.446Z",
    "size": 5984,
    "path": "../public/check.png"
  },
  "/delete.png": {
    "type": "image/png",
    "etag": "\"1694-sWT+0R3lGg58+lRofgj/JiAhDpo\"",
    "mtime": "2022-11-17T08:15:40.445Z",
    "size": 5780,
    "path": "../public/delete.png"
  },
  "/favicon copy.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-C55WuIAyh7hKQVer/LFA+m9aKYY\"",
    "mtime": "2022-11-17T08:15:40.445Z",
    "size": 4286,
    "path": "../public/favicon copy.ico"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"388-9rEytqBUh8Jc2qGFJ1f440Z2yyk\"",
    "mtime": "2022-11-17T08:15:40.444Z",
    "size": 904,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"be9-b/w9kvRg5FfS8zpTrqiVZCDu2TM\"",
    "mtime": "2022-11-17T08:15:40.442Z",
    "size": 3049,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-9hQshhZ7awi382foIg55xj3Or90\"",
    "mtime": "2022-11-17T08:15:40.441Z",
    "size": 15406,
    "path": "../public/favicon.ico"
  },
  "/idea.png": {
    "type": "image/png",
    "etag": "\"fb9-BLDaO/q3GSU5wcRYZVcNFGtev3E\"",
    "mtime": "2022-11-17T08:15:40.441Z",
    "size": 4025,
    "path": "../public/idea.png"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"4f52-gxOib78RrRRu8ABV4I+eEa11Ios\"",
    "mtime": "2022-11-17T08:15:40.440Z",
    "size": 20306,
    "path": "../public/logo.png"
  },
  "/user.png": {
    "type": "image/png",
    "etag": "\"2064-ctE0Mb3jVvODWHvo10XwJm+FCZA\"",
    "mtime": "2022-11-17T08:15:40.439Z",
    "size": 8292,
    "path": "../public/user.png"
  },
  "/_nuxt/404.9b1bd98c.js": {
    "type": "application/javascript",
    "etag": "\"af3-mOIbD/VwC+QsQPxY8eE48TL/hxc\"",
    "mtime": "2022-11-17T08:15:40.438Z",
    "size": 2803,
    "path": "../public/_nuxt/404.9b1bd98c.js"
  },
  "/_nuxt/Alert.17d057d1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d-JG+DdH/N3fFssAMzzY0CcM+Ckw0\"",
    "mtime": "2022-11-17T08:15:40.437Z",
    "size": 61,
    "path": "../public/_nuxt/Alert.17d057d1.css"
  },
  "/_nuxt/Alert.72eb1335.js": {
    "type": "application/javascript",
    "etag": "\"735-3Iu6UqdFFuttXnAf1uyLxXXrf04\"",
    "mtime": "2022-11-17T08:15:40.436Z",
    "size": 1845,
    "path": "../public/_nuxt/Alert.72eb1335.js"
  },
  "/_nuxt/Editor.cceed817.js": {
    "type": "application/javascript",
    "etag": "\"816-2obTlstLfVf9xN2zJNWB6xo/HBE\"",
    "mtime": "2022-11-17T08:15:40.436Z",
    "size": 2070,
    "path": "../public/_nuxt/Editor.cceed817.js"
  },
  "/_nuxt/Editor.d72468c1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"57f0-sNDjU/1QEPazVmenEuDOKpo2WTU\"",
    "mtime": "2022-11-17T08:15:40.435Z",
    "size": 22512,
    "path": "../public/_nuxt/Editor.d72468c1.css"
  },
  "/_nuxt/Filter.vue_vue_type_script_setup_true_lang.6d51b3ce.js": {
    "type": "application/javascript",
    "etag": "\"230-wGAp47az24DM1rbO1a5wimXUbCI\"",
    "mtime": "2022-11-17T08:15:40.434Z",
    "size": 560,
    "path": "../public/_nuxt/Filter.vue_vue_type_script_setup_true_lang.6d51b3ce.js"
  },
  "/_nuxt/Header.73f78474.js": {
    "type": "application/javascript",
    "etag": "\"c6-Tdn3YFMvur8RX776rreOne+OyCU\"",
    "mtime": "2022-11-17T08:15:40.434Z",
    "size": 198,
    "path": "../public/_nuxt/Header.73f78474.js"
  },
  "/_nuxt/Loading.3aa882a9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d-LX8fqpVz4AB91vf0Ie5h9uybtK8\"",
    "mtime": "2022-11-17T08:15:40.433Z",
    "size": 61,
    "path": "../public/_nuxt/Loading.3aa882a9.css"
  },
  "/_nuxt/Loading.a2f9359f.js": {
    "type": "application/javascript",
    "etag": "\"3e5-lr5k3VZtatbRS3i42Ayu+VQNoTk\"",
    "mtime": "2022-11-17T08:15:40.431Z",
    "size": 997,
    "path": "../public/_nuxt/Loading.a2f9359f.js"
  },
  "/_nuxt/Message.019921e9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d-z4oLKrmudp8Yy+5LM+i5WBkoTII\"",
    "mtime": "2022-11-17T08:15:40.429Z",
    "size": 61,
    "path": "../public/_nuxt/Message.019921e9.css"
  },
  "/_nuxt/Message.41954165.js": {
    "type": "application/javascript",
    "etag": "\"499-4+HJSCalKiTtYD8Fk6GMVWbwBkU\"",
    "mtime": "2022-11-17T08:15:40.428Z",
    "size": 1177,
    "path": "../public/_nuxt/Message.41954165.js"
  },
  "/_nuxt/Row.aa1c0de0.js": {
    "type": "application/javascript",
    "etag": "\"778-XYXdluKrEF5tCAXMFuXMnCQKNy0\"",
    "mtime": "2022-11-17T08:15:40.428Z",
    "size": 1912,
    "path": "../public/_nuxt/Row.aa1c0de0.js"
  },
  "/_nuxt/Row.e3b90b88.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"38-bIDmhznIQizlUVkFLCW9aU9DEo0\"",
    "mtime": "2022-11-17T08:15:40.427Z",
    "size": 56,
    "path": "../public/_nuxt/Row.e3b90b88.css"
  },
  "/_nuxt/Row.vue_vue_type_script_setup_true_lang.3d7096ab.js": {
    "type": "application/javascript",
    "etag": "\"b12-EFaKiANsJhOe6yJzRx1DEZ8on08\"",
    "mtime": "2022-11-17T08:15:40.426Z",
    "size": 2834,
    "path": "../public/_nuxt/Row.vue_vue_type_script_setup_true_lang.3d7096ab.js"
  },
  "/_nuxt/RowLoading.26efd085.js": {
    "type": "application/javascript",
    "etag": "\"570-XNyhYSpLm3X3UPF77tqRIZ/58xk\"",
    "mtime": "2022-11-17T08:15:40.425Z",
    "size": 1392,
    "path": "../public/_nuxt/RowLoading.26efd085.js"
  },
  "/_nuxt/RowLoading.814d0167.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"18e-FB00mqCR99KEJDmpdlfEaTHvMrY\"",
    "mtime": "2022-11-17T08:15:40.424Z",
    "size": 398,
    "path": "../public/_nuxt/RowLoading.814d0167.css"
  },
  "/_nuxt/Wrapper.e33d1023.js": {
    "type": "application/javascript",
    "etag": "\"58b-tk3cjrGMm3EO+PLhm7NLSZvQU0k\"",
    "mtime": "2022-11-17T08:15:40.424Z",
    "size": 1419,
    "path": "../public/_nuxt/Wrapper.e33d1023.js"
  },
  "/_nuxt/_articleSlug_.1f14dbe5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"163-rxfHDyxJnx3T+fPZJ5Mdm9pBD54\"",
    "mtime": "2022-11-17T08:15:40.423Z",
    "size": 355,
    "path": "../public/_nuxt/_articleSlug_.1f14dbe5.css"
  },
  "/_nuxt/_articleSlug_.ba652e5e.js": {
    "type": "application/javascript",
    "etag": "\"d158-uJK8zH+6a+AG0GLTpPMBdvBJKc4\"",
    "mtime": "2022-11-17T08:15:40.421Z",
    "size": 53592,
    "path": "../public/_nuxt/_articleSlug_.ba652e5e.js"
  },
  "/_nuxt/_categorySlug_.4c6904ee.js": {
    "type": "application/javascript",
    "etag": "\"c93-YQRQtgUdG1a+eKXkVvOOC3LRdS0\"",
    "mtime": "2022-11-17T08:15:40.418Z",
    "size": 3219,
    "path": "../public/_nuxt/_categorySlug_.4c6904ee.js"
  },
  "/_nuxt/_categorySlug_.87a3ba2e.js": {
    "type": "application/javascript",
    "etag": "\"8ae-3zpAJwFH/RVJulbtaKOB9/3CIoU\"",
    "mtime": "2022-11-17T08:15:40.416Z",
    "size": 2222,
    "path": "../public/_nuxt/_categorySlug_.87a3ba2e.js"
  },
  "/_nuxt/auth.80db5c82.js": {
    "type": "application/javascript",
    "etag": "\"e0-1xjnjndl08irg4p7PCuA5Rq5hTg\"",
    "mtime": "2022-11-17T08:15:40.414Z",
    "size": 224,
    "path": "../public/_nuxt/auth.80db5c82.js"
  },
  "/_nuxt/blog.6fe8dcd2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"60-c30FKhBqojcbkNE+vZpye02iHPU\"",
    "mtime": "2022-11-17T08:15:40.412Z",
    "size": 96,
    "path": "../public/_nuxt/blog.6fe8dcd2.css"
  },
  "/_nuxt/blog.f30eb5da.js": {
    "type": "application/javascript",
    "etag": "\"aa7-gqF6BhZyocRhRb+wWoz0RHP9D5E\"",
    "mtime": "2022-11-17T08:15:40.411Z",
    "size": 2727,
    "path": "../public/_nuxt/blog.f30eb5da.js"
  },
  "/_nuxt/change-phone.96f2e15a.js": {
    "type": "application/javascript",
    "etag": "\"885-YDls04HEgiHsw6bn9hI+n3CRKTU\"",
    "mtime": "2022-11-17T08:15:40.409Z",
    "size": 2181,
    "path": "../public/_nuxt/change-phone.96f2e15a.js"
  },
  "/_nuxt/collections.ebd9a756.js": {
    "type": "application/javascript",
    "etag": "\"a57-HLGDq6g4TBsHC/gQHn7qh1z2T/U\"",
    "mtime": "2022-11-17T08:15:40.408Z",
    "size": 2647,
    "path": "../public/_nuxt/collections.ebd9a756.js"
  },
  "/_nuxt/default.554c36f5.js": {
    "type": "application/javascript",
    "etag": "\"b6-nEcCGun2/vmt/MbIjukDr5Q0Esg\"",
    "mtime": "2022-11-17T08:15:40.407Z",
    "size": 182,
    "path": "../public/_nuxt/default.554c36f5.js"
  },
  "/_nuxt/email-binding.d993015b.js": {
    "type": "application/javascript",
    "etag": "\"6c8-AlS4ER5e/q/gfsvmhMLUDxzvza8\"",
    "mtime": "2022-11-17T08:15:40.406Z",
    "size": 1736,
    "path": "../public/_nuxt/email-binding.d993015b.js"
  },
  "/_nuxt/email-verify.f896b88e.js": {
    "type": "application/javascript",
    "etag": "\"308-ItYuGERdlZWyG+ye7zoaqOK7qRc\"",
    "mtime": "2022-11-17T08:15:40.405Z",
    "size": 776,
    "path": "../public/_nuxt/email-verify.f896b88e.js"
  },
  "/_nuxt/en-US.5829c3d6.js": {
    "type": "application/javascript",
    "etag": "\"c1-mFamTCl7WNL49gcRn4s5iBCgEHA\"",
    "mtime": "2022-11-17T08:15:40.404Z",
    "size": 193,
    "path": "../public/_nuxt/en-US.5829c3d6.js"
  },
  "/_nuxt/entry.10d5690a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2535d-shF9h5Os8CJgkuszZadOpFXOU3s\"",
    "mtime": "2022-11-17T08:15:40.402Z",
    "size": 152413,
    "path": "../public/_nuxt/entry.10d5690a.css"
  },
  "/_nuxt/entry.47b02695.js": {
    "type": "application/javascript",
    "etag": "\"61ff5-xYFfdy5Ahwlc2czUCWaknbK85Lg\"",
    "mtime": "2022-11-17T08:15:40.398Z",
    "size": 401397,
    "path": "../public/_nuxt/entry.47b02695.js"
  },
  "/_nuxt/error-404.9466bba3.js": {
    "type": "application/javascript",
    "etag": "\"8a8-hBbA0haXMIaE6IC0TaK4UukgXlU\"",
    "mtime": "2022-11-17T08:15:40.393Z",
    "size": 2216,
    "path": "../public/_nuxt/error-404.9466bba3.js"
  },
  "/_nuxt/error-404.dfdebc1f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-TySzBJMzcOOue3FcAGXOsPB/jtI\"",
    "mtime": "2022-11-17T08:15:40.392Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.dfdebc1f.css"
  },
  "/_nuxt/error-500.3e50ac36.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-zW53+6jUfsJkZINkhx/9SNadPR8\"",
    "mtime": "2022-11-17T08:15:40.392Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.3e50ac36.css"
  },
  "/_nuxt/error-500.e110ab5e.js": {
    "type": "application/javascript",
    "etag": "\"756-yI0eXVo9OzazMmapozFtOa7uCv0\"",
    "mtime": "2022-11-17T08:15:40.391Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.e110ab5e.js"
  },
  "/_nuxt/error-component.e83b9dfa.js": {
    "type": "application/javascript",
    "etag": "\"475-P+FdC3Xfn6i8MW4smCQnfgO/zKY\"",
    "mtime": "2022-11-17T08:15:40.390Z",
    "size": 1141,
    "path": "../public/_nuxt/error-component.e83b9dfa.js"
  },
  "/_nuxt/history.0ca72cc8.js": {
    "type": "application/javascript",
    "etag": "\"a47-tB32pMYqmJUquW0pg7ueLpIZ0ME\"",
    "mtime": "2022-11-17T08:15:40.390Z",
    "size": 2631,
    "path": "../public/_nuxt/history.0ca72cc8.js"
  },
  "/_nuxt/identify-verify.e0e969bf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c-RHzcpbA1+c3YKjSgwf+UjEIZgEU\"",
    "mtime": "2022-11-17T08:15:40.389Z",
    "size": 44,
    "path": "../public/_nuxt/identify-verify.e0e969bf.css"
  },
  "/_nuxt/identify-verify.f2bacfb1.js": {
    "type": "application/javascript",
    "etag": "\"f56-Ju4bChLgESeudFSVcUZXW8zVqUU\"",
    "mtime": "2022-11-17T08:15:40.388Z",
    "size": 3926,
    "path": "../public/_nuxt/identify-verify.f2bacfb1.js"
  },
  "/_nuxt/index.1e245cf9.js": {
    "type": "application/javascript",
    "etag": "\"645-cvrWijyENxMh8U2AcybD1FY/PzI\"",
    "mtime": "2022-11-17T08:15:40.388Z",
    "size": 1605,
    "path": "../public/_nuxt/index.1e245cf9.js"
  },
  "/_nuxt/index.531cdf13.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b9d-bR7o1LielS4g1c+A883QqfqWOsU\"",
    "mtime": "2022-11-17T08:15:40.387Z",
    "size": 11165,
    "path": "../public/_nuxt/index.531cdf13.css"
  },
  "/_nuxt/index.64e1fa5f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e-GTf/kaWBn7SygMGB+SjPv0/PabM\"",
    "mtime": "2022-11-17T08:15:40.386Z",
    "size": 46,
    "path": "../public/_nuxt/index.64e1fa5f.css"
  },
  "/_nuxt/index.c424f55a.js": {
    "type": "application/javascript",
    "etag": "\"17a65-PA+6GqRT+X473/uxFKIKPnpzT6s\"",
    "mtime": "2022-11-17T08:15:40.384Z",
    "size": 96869,
    "path": "../public/_nuxt/index.c424f55a.js"
  },
  "/_nuxt/index.c70c1a7a.js": {
    "type": "application/javascript",
    "etag": "\"7ac-PVhIAE7F8P2620noJIkKPGJ1jVw\"",
    "mtime": "2022-11-17T08:15:40.382Z",
    "size": 1964,
    "path": "../public/_nuxt/index.c70c1a7a.js"
  },
  "/_nuxt/index.fa1e12f0.js": {
    "type": "application/javascript",
    "etag": "\"162d-gUnOCyKGfnupiztVtvvznuZfq1M\"",
    "mtime": "2022-11-17T08:15:40.380Z",
    "size": 5677,
    "path": "../public/_nuxt/index.fa1e12f0.js"
  },
  "/_nuxt/member-rule.70b3f07f.js": {
    "type": "application/javascript",
    "etag": "\"4806-GAS8489bMOZc1+qoj47/Y46zTXs\"",
    "mtime": "2022-11-17T08:15:40.378Z",
    "size": 18438,
    "path": "../public/_nuxt/member-rule.70b3f07f.js"
  },
  "/_nuxt/my.1b38eee1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bd-TgvpHxw+/vSKI1b2iFJBXdlDvXU\"",
    "mtime": "2022-11-17T08:15:40.377Z",
    "size": 189,
    "path": "../public/_nuxt/my.1b38eee1.css"
  },
  "/_nuxt/my.ba567f36.js": {
    "type": "application/javascript",
    "etag": "\"75f-omdR1kAL/sGFNx4enEv3hCSqIPc\"",
    "mtime": "2022-11-17T08:15:40.376Z",
    "size": 1887,
    "path": "../public/_nuxt/my.ba567f36.js"
  },
  "/_nuxt/reset-password.6b71f693.js": {
    "type": "application/javascript",
    "etag": "\"928-oMQ3pT04eI9t4iVkIC1Q/e8Mlug\"",
    "mtime": "2022-11-17T08:15:40.373Z",
    "size": 2344,
    "path": "../public/_nuxt/reset-password.6b71f693.js"
  },
  "/_nuxt/tips.93820f4f.js": {
    "type": "application/javascript",
    "etag": "\"67d-nW7oKPMJprqIm7iwOPhQn3OZg/s\"",
    "mtime": "2022-11-17T08:15:40.372Z",
    "size": 1661,
    "path": "../public/_nuxt/tips.93820f4f.js"
  },
  "/_nuxt/vue-quill.esm-bundler.92d10c24.js": {
    "type": "application/javascript",
    "etag": "\"3e8a7-9QbV4liG4MzqdQ9WvHsYUAsA7S0\"",
    "mtime": "2022-11-17T08:15:40.371Z",
    "size": 256167,
    "path": "../public/_nuxt/vue-quill.esm-bundler.92d10c24.js"
  },
  "/assets/gem/gem.gltf": {
    "type": "model/gltf+json",
    "etag": "\"110749-1GN9iIUMOjMyfvoL74c4OkTP8W8\"",
    "mtime": "2022-11-17T08:15:40.453Z",
    "size": 1115977,
    "path": "../public/assets/gem/gem.gltf"
  },
  "/assets/gem/roughness.jpeg": {
    "type": "image/jpeg",
    "etag": "\"8da04-G+tH2LcY/L0u0+bny8RdV9AZ54Q\"",
    "mtime": "2022-11-17T08:15:40.449Z",
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
  baseURL: "https://admin.bondingtechs.com/api/app",
  timeout: 5e3
});
request.interceptors.request.use(
  (req) => {
    return req;
  }
);
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

const _x8cLMe = defineEventHandler(async (event) => {
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

const _lazy_nOcS8A = () => import('../update.post.mjs');
const _lazy_sP3Hc0 = () => import('../reset-password.post.mjs');
const _lazy_UFPSid = () => import('../person.post.mjs');
const _lazy_vDzw9n = () => import('../logout.post.mjs');
const _lazy_UMqI63 = () => import('../identify-verify.post.mjs');
const _lazy_HazRPF = () => import('../email-verify.post.mjs');
const _lazy_N95XET = () => import('../email-binding.post.mjs');
const _lazy_lAFmDV = () => import('../change-phone.post.mjs');
const _lazy_NfrQHk = () => import('../today.post.mjs');
const _lazy_V19AmA = () => import('../info.post.mjs');
const _lazy_KrvP3M = () => import('../collection.post.mjs');
const _lazy_acVXER = () => import('../page.post.mjs');
const _lazy_Obrh3K = () => import('../list.post.mjs');
const _lazy_lpvAND = () => import('../like.post.mjs');
const _lazy_HYqV1u = () => import('../collection.post2.mjs');
const _lazy_ljwdlF = () => import('../categories.post.mjs');
const _lazy_6FT65M = () => import('../article.post.mjs');
const _lazy_kk36dO = () => import('../tips.post.mjs');
const _lazy_k2pRUW = () => import('../history.post.mjs');
const _lazy_ggHcRP = () => import('../collections.post.mjs');
const _lazy_mOUFHq = () => import('../page.post2.mjs');
const _lazy_Nbbeum = () => import('../like.post2.mjs');
const _lazy_c4ao0T = () => import('../create.post.mjs');
const _lazy_kUoqwr = () => import('../upload.post.mjs');
const _lazy_Op0SYz = () => import('../info.post2.mjs');
const _lazy_1657kk = () => import('../register.post.mjs');
const _lazy_7FgqUB = () => import('../refresh.post.mjs');
const _lazy_siN26N = () => import('../login.post.mjs');
const _lazy_fvhXku = () => import('../forgot.post.mjs');
const _lazy_uaVl0R = () => import('../_type_-captcha.post.mjs');
const _lazy_xlRZxJ = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _x8cLMe, lazy: false, middleware: true, method: undefined },
  { route: '/api/user/update', handler: _lazy_nOcS8A, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/reset-password', handler: _lazy_sP3Hc0, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/person', handler: _lazy_UFPSid, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/logout', handler: _lazy_vDzw9n, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/identify-verify', handler: _lazy_UMqI63, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/email-verify', handler: _lazy_HazRPF, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/email-binding', handler: _lazy_N95XET, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/change-phone', handler: _lazy_lAFmDV, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/today', handler: _lazy_NfrQHk, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/info', handler: _lazy_V19AmA, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/collection', handler: _lazy_KrvP3M, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/page', handler: _lazy_acVXER, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/list', handler: _lazy_Obrh3K, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/like', handler: _lazy_lpvAND, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/collection', handler: _lazy_HYqV1u, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/categories', handler: _lazy_ljwdlF, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/article', handler: _lazy_6FT65M, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/tips', handler: _lazy_kk36dO, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/history', handler: _lazy_k2pRUW, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/collections', handler: _lazy_ggHcRP, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/page', handler: _lazy_mOUFHq, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/like', handler: _lazy_Nbbeum, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/create', handler: _lazy_c4ao0T, lazy: true, middleware: false, method: "post" },
  { route: '/api/comm/upload', handler: _lazy_kUoqwr, lazy: true, middleware: false, method: "post" },
  { route: '/api/category/info', handler: _lazy_Op0SYz, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/register', handler: _lazy_1657kk, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/refresh', handler: _lazy_7FgqUB, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_siN26N, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/forgot', handler: _lazy_fvhXku, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/:type-captcha', handler: _lazy_uaVl0R, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_xlRZxJ, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_xlRZxJ, lazy: true, middleware: false, method: undefined }
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
