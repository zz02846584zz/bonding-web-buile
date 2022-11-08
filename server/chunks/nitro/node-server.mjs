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

const _y3cOwHe2an = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _y3cOwHe2an
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
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"150b4-Z1s9FVistDIgtbxgpdZ5q8fc7zo\"",
    "mtime": "2022-11-08T09:35:43.355Z",
    "size": 86196,
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"7c336-hy6OuYRKnR+XVILfJr2mTitg/tY\"",
    "mtime": "2022-11-08T09:35:43.353Z",
    "size": 508726,
    "path": "../public/android-chrome-512x512.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"12e85-P4MIcw35j1vJ1xxDiLRSUX6J3Vk\"",
    "mtime": "2022-11-08T09:35:43.347Z",
    "size": 77445,
    "path": "../public/apple-touch-icon.png"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"388-9rEytqBUh8Jc2qGFJ1f440Z2yyk\"",
    "mtime": "2022-11-08T09:35:43.345Z",
    "size": 904,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"be9-b/w9kvRg5FfS8zpTrqiVZCDu2TM\"",
    "mtime": "2022-11-08T09:35:43.344Z",
    "size": 3049,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-9hQshhZ7awi382foIg55xj3Or90\"",
    "mtime": "2022-11-08T09:35:43.343Z",
    "size": 15406,
    "path": "../public/favicon.ico"
  },
  "/_nuxt/ColorChange.vue_vue_type_script_setup_true_lang.2df978b7.js": {
    "type": "application/javascript",
    "etag": "\"373b-nLt5+0g/bv0T5wDCVKtHcadX/Ic\"",
    "mtime": "2022-11-08T09:35:43.341Z",
    "size": 14139,
    "path": "../public/_nuxt/ColorChange.vue_vue_type_script_setup_true_lang.2df978b7.js"
  },
  "/_nuxt/_plugin-vue_export-helper.a1a6add7.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2022-11-08T09:35:43.339Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.a1a6add7.js"
  },
  "/_nuxt/default.7d2574a0.js": {
    "type": "application/javascript",
    "etag": "\"f0-9f5rctkq3S9j4b0sdEQrXXdOgD8\"",
    "mtime": "2022-11-08T09:35:43.339Z",
    "size": 240,
    "path": "../public/_nuxt/default.7d2574a0.js"
  },
  "/_nuxt/en-US.5829c3d6.js": {
    "type": "application/javascript",
    "etag": "\"c1-mFamTCl7WNL49gcRn4s5iBCgEHA\"",
    "mtime": "2022-11-08T09:35:43.337Z",
    "size": 193,
    "path": "../public/_nuxt/en-US.5829c3d6.js"
  },
  "/_nuxt/entry.4feee01f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9a7e-1gmS1Ws816gm7+yY97ugkE3cV84\"",
    "mtime": "2022-11-08T09:35:43.336Z",
    "size": 39550,
    "path": "../public/_nuxt/entry.4feee01f.css"
  },
  "/_nuxt/entry.51df2e06.js": {
    "type": "application/javascript",
    "etag": "\"43f7d-wl/cWIIBMseNvpmLS+2Ak4ESUlw\"",
    "mtime": "2022-11-08T09:35:43.335Z",
    "size": 278397,
    "path": "../public/_nuxt/entry.51df2e06.js"
  },
  "/_nuxt/error-404.607b90a8.js": {
    "type": "application/javascript",
    "etag": "\"8e5-eBvMaEoTrYUpMYIxxhW9JhFgf/A\"",
    "mtime": "2022-11-08T09:35:43.330Z",
    "size": 2277,
    "path": "../public/_nuxt/error-404.607b90a8.js"
  },
  "/_nuxt/error-404.dfdebc1f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-TySzBJMzcOOue3FcAGXOsPB/jtI\"",
    "mtime": "2022-11-08T09:35:43.329Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.dfdebc1f.css"
  },
  "/_nuxt/error-500.25d91ab7.js": {
    "type": "application/javascript",
    "etag": "\"78e-hvoyDLfv8HJCgsMoZTemRiSs14Y\"",
    "mtime": "2022-11-08T09:35:43.328Z",
    "size": 1934,
    "path": "../public/_nuxt/error-500.25d91ab7.js"
  },
  "/_nuxt/error-500.3e50ac36.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-zW53+6jUfsJkZINkhx/9SNadPR8\"",
    "mtime": "2022-11-08T09:35:43.328Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.3e50ac36.css"
  },
  "/_nuxt/error-component.20a54184.js": {
    "type": "application/javascript",
    "etag": "\"4c9-GFhfmjlr2hmjj4Pk7hyPChFN1Jg\"",
    "mtime": "2022-11-08T09:35:43.327Z",
    "size": 1225,
    "path": "../public/_nuxt/error-component.20a54184.js"
  },
  "/_nuxt/hidden.f41bf667.js": {
    "type": "application/javascript",
    "etag": "\"2a2-FXbU6apFs3A01LyobxIyHv0ATXk\"",
    "mtime": "2022-11-08T09:35:43.325Z",
    "size": 674,
    "path": "../public/_nuxt/hidden.f41bf667.js"
  },
  "/_nuxt/index.6afab7b5.js": {
    "type": "application/javascript",
    "etag": "\"bb9-b4eYd3VNWYv3UybEKAJY4m7M4lk\"",
    "mtime": "2022-11-08T09:35:43.324Z",
    "size": 3001,
    "path": "../public/_nuxt/index.6afab7b5.js"
  },
  "/_nuxt/menu.49f7e423.js": {
    "type": "application/javascript",
    "etag": "\"2837-gyEDHICojMcJ6JP32j1kdN+V6vw\"",
    "mtime": "2022-11-08T09:35:43.323Z",
    "size": 10295,
    "path": "../public/_nuxt/menu.49f7e423.js"
  },
  "/_nuxt/modal.99fad2a9.js": {
    "type": "application/javascript",
    "etag": "\"5265-4kW93HHRVRl84SjBEaNewffI+Ng\"",
    "mtime": "2022-11-08T09:35:43.322Z",
    "size": 21093,
    "path": "../public/_nuxt/modal.99fad2a9.js"
  },
  "/_nuxt/naive.5c3f0ed8.js": {
    "type": "application/javascript",
    "etag": "\"9fd13-c9LlJz450YMDbIl34wgGTrK1EFg\"",
    "mtime": "2022-11-08T09:35:43.320Z",
    "size": 654611,
    "path": "../public/_nuxt/naive.5c3f0ed8.js"
  },
  "/_nuxt/pinia.3674bd4e.js": {
    "type": "application/javascript",
    "etag": "\"340-NUMrPORZi+PX0NTcZZkb4a3Uo24\"",
    "mtime": "2022-11-08T09:35:43.312Z",
    "size": 832,
    "path": "../public/_nuxt/pinia.3674bd4e.js"
  },
  "/_nuxt/use-outside-click.0582e426.js": {
    "type": "application/javascript",
    "etag": "\"1b7e-PS0g1ioN3dIEPS+4ea5L8+QuGfE\"",
    "mtime": "2022-11-08T09:35:43.311Z",
    "size": 7038,
    "path": "../public/_nuxt/use-outside-click.0582e426.js"
  },
  "/_nuxt/use-resolve-button-type.a880b2df.js": {
    "type": "application/javascript",
    "etag": "\"506-zqMxM6pdctmsDzWFwl0BNEOHerM\"",
    "mtime": "2022-11-08T09:35:43.310Z",
    "size": 1286,
    "path": "../public/_nuxt/use-resolve-button-type.a880b2df.js"
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

const _qRpjr3 = defineEventHandler(async (event) => {
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

const _lazy_h3Go2j = () => import('../update.post.mjs');
const _lazy_3A54zS = () => import('../reset-password.post.mjs');
const _lazy_Tb4sV4 = () => import('../person.post.mjs');
const _lazy_S0S8tl = () => import('../logout.post.mjs');
const _lazy_SBx0zW = () => import('../identify-verify.post.mjs');
const _lazy_4oV6Of = () => import('../email-verify.post.mjs');
const _lazy_royEh9 = () => import('../email-binding.post.mjs');
const _lazy_6f6AJ3 = () => import('../change-phone.post.mjs');
const _lazy_UD2DJG = () => import('../today.post.mjs');
const _lazy_peBWT9 = () => import('../info.post.mjs');
const _lazy_XXeWRp = () => import('../collection.post.mjs');
const _lazy_MO82dk = () => import('../page.post.mjs');
const _lazy_pnh2ea = () => import('../list.post.mjs');
const _lazy_a6esrz = () => import('../like.post.mjs');
const _lazy_1hYzMG = () => import('../collection.post2.mjs');
const _lazy_xClN9C = () => import('../categories.post.mjs');
const _lazy_uKpA1t = () => import('../article.post.mjs');
const _lazy_OxQNHr = () => import('../tips.post.mjs');
const _lazy_yjQoF0 = () => import('../history.post.mjs');
const _lazy_YAI1Ly = () => import('../collections.post.mjs');
const _lazy_BcjT5c = () => import('../page.post2.mjs');
const _lazy_60pzeR = () => import('../like.post2.mjs');
const _lazy_neFO7H = () => import('../create.post.mjs');
const _lazy_8FGnZ4 = () => import('../upload.post.mjs');
const _lazy_JGNIEB = () => import('../info.post2.mjs');
const _lazy_ot7mIY = () => import('../register.post.mjs');
const _lazy_iSDjla = () => import('../refresh.post.mjs');
const _lazy_vxO4Az = () => import('../login.post.mjs');
const _lazy_aWtfoA = () => import('../forgot.post.mjs');
const _lazy_lvh1oX = () => import('../_type_-captcha.post.mjs');
const _lazy_aewWVZ = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _qRpjr3, lazy: false, middleware: true, method: undefined },
  { route: '/api/user/update', handler: _lazy_h3Go2j, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/reset-password', handler: _lazy_3A54zS, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/person', handler: _lazy_Tb4sV4, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/logout', handler: _lazy_S0S8tl, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/identify-verify', handler: _lazy_SBx0zW, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/email-verify', handler: _lazy_4oV6Of, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/email-binding', handler: _lazy_royEh9, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/change-phone', handler: _lazy_6f6AJ3, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/today', handler: _lazy_UD2DJG, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/info', handler: _lazy_peBWT9, lazy: true, middleware: false, method: "post" },
  { route: '/api/tip/collection', handler: _lazy_XXeWRp, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/page', handler: _lazy_MO82dk, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/list', handler: _lazy_pnh2ea, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/like', handler: _lazy_a6esrz, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/collection', handler: _lazy_1hYzMG, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/categories', handler: _lazy_xClN9C, lazy: true, middleware: false, method: "post" },
  { route: '/api/news/article', handler: _lazy_uKpA1t, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/tips', handler: _lazy_OxQNHr, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/history', handler: _lazy_yjQoF0, lazy: true, middleware: false, method: "post" },
  { route: '/api/my/collections', handler: _lazy_YAI1Ly, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/page', handler: _lazy_BcjT5c, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/like', handler: _lazy_60pzeR, lazy: true, middleware: false, method: "post" },
  { route: '/api/comment/create', handler: _lazy_neFO7H, lazy: true, middleware: false, method: "post" },
  { route: '/api/comm/upload', handler: _lazy_8FGnZ4, lazy: true, middleware: false, method: "post" },
  { route: '/api/category/info', handler: _lazy_JGNIEB, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/register', handler: _lazy_ot7mIY, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/refresh', handler: _lazy_iSDjla, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_vxO4Az, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/forgot', handler: _lazy_aWtfoA, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/:type-captcha', handler: _lazy_lvh1oX, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_aewWVZ, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_aewWVZ, lazy: true, middleware: false, method: undefined }
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
