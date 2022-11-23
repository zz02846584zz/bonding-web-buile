import { toRef, isRef, getCurrentInstance, inject, reactive, defineAsyncComponent, version, h as h$1, onUnmounted, toRaw, isReactive, defineComponent, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString, useSSRContext, cloneVNode, Fragment as Fragment$1, provide, ref, computed, onMounted, watch, watchEffect, nextTick, unref, Suspense, Transition, createElementBlock, resolveComponent, shallowRef, createVNode, openBlock, createBlock, renderList, createCommentVNode, createApp, onServerPrefetch, effectScope, markRaw, onErrorCaptured, Text, toRefs } from 'vue';
import { $fetch as $fetch$1 } from 'ohmyfetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import destr from 'destr';
import { hasProtocol, isEqual, joinURL, parseURL } from 'ufo';
import { createError as createError$1, sendRedirect, appendHeader } from 'h3';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { parse, serialize } from 'cookie-es';
import isHTTPS from 'is-https';
import { CoreWarnCodes, CompileErrorCodes, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain, setDevToolsHook, createCompileError, DEFAULT_LOCALE as DEFAULT_LOCALE$1, updateFallbackLocale, NUMBER_FORMAT_OPTIONS_KEYS, DATETIME_FORMAT_OPTIONS_KEYS, setFallbackContext, createCoreContext, clearDateTimeFormat, clearNumberFormat, setAdditionalMeta, getFallbackContext, NOT_REOSLVED, parseTranslateArgs, translate, MISSING_RESOLVE_VALUE, parseDateTimeArgs, datetime, parseNumberArgs, number } from '@intlify/core-base';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderSuspense } from 'vue/server-renderer';
import { isEqual as isEqual$1 } from 'ohash';
import store from 'store';
import { defu } from 'defu';
import { a as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'axios';

var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter$1(nuxtApp, $name, value);
    defineGetter$1(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter$1(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter$1(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a2;
      if (prop === "public") {
        return target.public;
      }
      return (_a2 = target[prop]) != null ? _a2 : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin2, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin2 of plugins2) {
    await applyPlugin(nuxtApp, plugin2);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin2) => {
    if (typeof plugin2 !== "function") {
      return null;
    }
    if (plugin2.length > 1) {
      return (nuxtApp) => plugin2(nuxtApp, nuxtApp.provide);
    }
    return plugin2;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin2) {
  plugin2[NuxtPluginIndicator] = true;
  return plugin2;
}
function callWithNuxt(nuxt, setup2, args) {
  const fn = () => args ? setup2(...args) : setup2();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter$1(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const getDefault = () => null;
function useAsyncData(...args) {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d2 = (_c2 = options.lazy) != null ? _c2 : options.defer) != null ? _d2 : false;
  options.initialCache = (_e2 = options.initialCache) != null ? _e2 : true;
  options.immediate = (_f2 = options.immediate) != null ? _f2 : true;
  const nuxt = useNuxtApp();
  const useInitialCache = () => (nuxt.isHydrating || options.initialCache) && nuxt.payload.data[key] !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(useInitialCache() ? nuxt.payload.data[key] : (_h2 = (_g2 = options.default) == null ? void 0 : _g2.call(options)) != null ? _h2 : null),
      pending: ref(!useInitialCache()),
      error: ref(nuxt.payload._errors[key] ? createError(nuxt.payload._errors[key]) : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a3, _b3;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref((_b3 = (_a3 = options.default) == null ? void 0 : _a3.call(options)) != null ? _b3 : null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  if (options.global || typeof name === "function") {
    nuxtApp._middleware.global.push(typeof name === "function" ? name : middleware);
  } else {
    nuxtApp._middleware.named[name] = middleware;
  }
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || autoKey;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = "$f" + _key;
  const _request = computed(() => {
    let r2 = request;
    if (typeof r2 === "function") {
      r2 = r2();
    }
    return unref(r2);
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watch2,
    initialCache,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    initialCache,
    immediate,
    watch: [
      _fetchOptions,
      _request,
      ...watch2 || []
    ]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a2;
    (_a2 = controller == null ? void 0 : controller.abort) == null ? void 0 : _a2.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    return $fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function useRequestHeaders(include) {
  var _a2, _b2;
  const headers = (_b2 = (_a2 = useNuxtApp().ssrContext) == null ? void 0 : _a2.event.req.headers) != null ? _b2 : {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a2;
  return (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event;
}
const CookieDefaults = {
  path: "/",
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2, _b2;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref((_b2 = cookies[name]) != null ? _b2 : (_a2 = opts.default) == null ? void 0 : _a2.call(opts));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual$1(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a2;
  {
    return parse(((_a2 = useRequestEvent()) == null ? void 0 : _a2.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a2, _b2, _c2;
        if (!isExternal.value) {
          return h$1(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b2 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b2 : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate2 = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate: navigate2,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h$1("a", { ref: el, href, rel, target }, (_c2 = slots.default) == null ? void 0 : _c2.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = defineNuxtLink({ componentName: "NuxtLink" });
function isObject$2(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults, namespace = ".", merger) {
  if (!isObject$2(defaults)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = val.concat(obj[key]);
    } else if (isObject$2(val) && isObject$2(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function createDefu(merger) {
  return (...args) => args.reduce((p2, c2) => _defu(p2, c2, "", merger), {});
}
const defuFn = createDefu((obj, key, currentValue, _namespace) => {
  if (typeof obj[key] !== "undefined" && typeof currentValue === "function") {
    obj[key] = currentValue(obj[key]);
    return true;
  }
});
const cfg0 = defineAppConfig({
  name: "\u9375\u7D50\u79D1\u6280",
  link: "https://bondingtechs.com"
});
const inlineConfig = {};
const __appConfig = defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = reactive(__appConfig);
  }
  return nuxtApp._appConfig;
}
function useHead(meta) {
  useNuxtApp()._useHead(meta);
}
const components = {
  Alert: defineAsyncComponent(() => import('./_nuxt/Alert.0273167e.mjs').then((c2) => c2.default || c2)),
  Loading: defineAsyncComponent(() => import('./_nuxt/Loading.f214a11b.mjs').then((c2) => c2.default || c2)),
  Message: defineAsyncComponent(() => import('./_nuxt/Message.8bd92afd.mjs').then((c2) => c2.default || c2))
};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
const isVue2 = false;
const isVue3 = true;
function resolveUnref(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
var PROVIDE_KEY = "usehead";
var HEAD_COUNT_KEY = "head:count";
var HEAD_ATTRS_KEY = "data-head-attrs";
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = "data-meta-body";
var propsToString = (props) => {
  const handledAttributes = [];
  for (const [key, value] of Object.entries(props)) {
    if (value === false || value == null)
      continue;
    let attribute = key;
    if (value !== true)
      attribute += `="${String(value).replace(/"/g, "&quot;")}"`;
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? ` ${handledAttributes.join(" ")}` : "";
};
var tagToString = (tag) => {
  const attrs = propsToString(tag.props);
  const openTag = `<${tag.tag}${attrs}>`;
  return SELF_CLOSING_TAGS.includes(tag.tag) ? openTag : `${openTag}${tag.children || ""}</${tag.tag}>`;
};
var resolveHeadEntries = (entries, force) => {
  return entries.map((e2) => {
    if (e2.input && (force || !e2.resolved))
      e2.input = resolveUnrefHeadInput(e2.input);
    return e2;
  });
};
var renderHeadToString = async (head) => {
  var _a2, _b2;
  const headHtml = [];
  const bodyHtml = [];
  let titleHtml = "";
  const attrs = { htmlAttrs: {}, bodyAttrs: {} };
  const resolvedEntries = resolveHeadEntries(head.headEntries);
  for (const h2 in head.hooks["resolved:entries"])
    await head.hooks["resolved:entries"][h2](resolvedEntries);
  const headTags = resolveHeadEntriesToTags(resolvedEntries);
  for (const h2 in head.hooks["resolved:tags"])
    await head.hooks["resolved:tags"][h2](headTags);
  for (const tag of headTags) {
    if ((_a2 = tag.options) == null ? void 0 : _a2.beforeTagRender)
      tag.options.beforeTagRender(tag);
    if (tag.tag === "title")
      titleHtml = tagToString(tag);
    else if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs")
      attrs[tag.tag] = { ...attrs[tag.tag], ...tag.props };
    else if ((_b2 = tag.options) == null ? void 0 : _b2.body)
      bodyHtml.push(tagToString(tag));
    else
      headHtml.push(tagToString(tag));
  }
  headHtml.push(`<meta name="${HEAD_COUNT_KEY}" content="${headHtml.length}">`);
  return {
    get headTags() {
      return titleHtml + headHtml.join("");
    },
    get htmlAttrs() {
      return propsToString({
        ...attrs.htmlAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(attrs.htmlAttrs).join(",")
      });
    },
    get bodyAttrs() {
      return propsToString({
        ...attrs.bodyAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(attrs.bodyAttrs).join(",")
      });
    },
    get bodyTags() {
      return bodyHtml.join("");
    }
  };
};
var sortTags = (aTag, bTag) => {
  const tagWeight = (tag) => {
    var _a2;
    if ((_a2 = tag.options) == null ? void 0 : _a2.renderPriority)
      return tag.options.renderPriority;
    switch (tag.tag) {
      case "base":
        return -1;
      case "meta":
        if (tag.props.charset)
          return -2;
        if (tag.props["http-equiv"] === "content-security-policy")
          return 0;
        return 10;
      default:
        return 10;
    }
  };
  return tagWeight(aTag) - tagWeight(bTag);
};
var tagDedupeKey = (tag) => {
  const { props, tag: tagName, options } = tag;
  if (["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"].includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  if (options == null ? void 0 : options.key)
    return `${tagName}:${options.key}`;
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n2 of name) {
    if (typeof props[n2] !== "undefined") {
      return `${tagName}:${n2}:${props[n2]}`;
    }
  }
  return tag.runtime.position;
};
function resolveUnrefHeadInput(ref2) {
  const root = resolveUnref(ref2);
  if (!ref2 || !root) {
    return root;
  }
  if (Array.isArray(root)) {
    return root.map(resolveUnrefHeadInput);
  }
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([key, value]) => {
        if (key === "titleTemplate")
          return [key, unref(value)];
        return [
          key,
          resolveUnrefHeadInput(value)
        ];
      })
    );
  }
  return root;
}
var resolveTag = (name, input, e2) => {
  var _a2;
  input = { ...input };
  const tag = {
    tag: name,
    props: {},
    runtime: {
      entryId: e2.id
    },
    options: {
      ...e2.options
    }
  };
  ["hid", "vmid", "key"].forEach((key) => {
    if (input[key]) {
      tag.options.key = input[key];
      delete input[key];
    }
  });
  ["children", "innerHTML", "textContent"].forEach((key) => {
    if (typeof input[key] !== "undefined") {
      tag.children = input[key];
      delete input[key];
    }
  });
  ["body", "renderPriority"].forEach((key) => {
    if (typeof input[key] !== "undefined") {
      tag.options[key] = input[key];
      delete input[key];
    }
  });
  if ((_a2 = tag.options) == null ? void 0 : _a2.body)
    input[BODY_TAG_ATTR_NAME] = true;
  tag.props = input;
  return tag;
};
var headInputToTags = (e2) => {
  return Object.entries(e2.input).filter(([, v2]) => typeof v2 !== "undefined").map(([key, value]) => {
    return (Array.isArray(value) ? value : [value]).map((props) => {
      switch (key) {
        case "title":
        case "titleTemplate":
          return {
            tag: key,
            children: props,
            props: {},
            runtime: { entryId: e2.id },
            options: e2.options
          };
        case "base":
        case "meta":
        case "link":
        case "style":
        case "script":
        case "noscript":
        case "htmlAttrs":
        case "bodyAttrs":
          return resolveTag(key, props, e2);
        default:
          return false;
      }
    });
  }).flat().filter((v2) => !!v2);
};
var renderTitleTemplate = (template, title) => {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template.replace("%s", title != null ? title : "");
};
var resolveHeadEntriesToTags = (entries) => {
  const deduping = {};
  const resolvedEntries = resolveHeadEntries(entries);
  resolvedEntries.forEach((entry2, entryIndex) => {
    const tags = headInputToTags(entry2);
    tags.forEach((tag, tagIdx) => {
      tag.runtime = tag.runtime || {};
      tag.runtime.position = entryIndex * 1e4 + tagIdx;
      deduping[tagDedupeKey(tag)] = tag;
    });
  });
  let resolvedTags = Object.values(deduping).sort((a2, b2) => a2.runtime.position - b2.runtime.position).sort(sortTags);
  const titleTemplateIdx = resolvedTags.findIndex((i) => i.tag === "titleTemplate");
  const titleIdx = resolvedTags.findIndex((i) => i.tag === "title");
  if (titleIdx !== -1 && titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      resolvedTags[titleTemplateIdx].children,
      resolvedTags[titleIdx].children
    );
    if (newTitle !== null) {
      resolvedTags[titleIdx].children = newTitle || resolvedTags[titleIdx].children;
    } else {
      resolvedTags = resolvedTags.filter((_, i) => i !== titleIdx);
    }
    resolvedTags = resolvedTags.filter((_, i) => i !== titleTemplateIdx);
  } else if (titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      resolvedTags[titleTemplateIdx].children
    );
    if (newTitle !== null) {
      resolvedTags[titleTemplateIdx].children = newTitle;
      resolvedTags[titleTemplateIdx].tag = "title";
    } else {
      resolvedTags = resolvedTags.filter((_, i) => i !== titleTemplateIdx);
    }
  }
  return resolvedTags;
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs))
        el.removeAttribute(key);
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false)
      el.removeAttribute(key);
    else
      el.setAttribute(key, value);
    keys.push(key);
  }
  if (keys.length)
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  else
    el.removeAttribute(HEAD_ATTRS_KEY);
};
var createElement = (tag, document2) => {
  var _a2;
  const $el = document2.createElement(tag.tag);
  Object.entries(tag.props).forEach(([k2, v2]) => {
    if (v2 !== false) {
      $el.setAttribute(k2, v2 === true ? "" : String(v2));
    }
  });
  if (tag.children) {
    if ((_a2 = tag.options) == null ? void 0 : _a2.safe) {
      if (tag.tag !== "script")
        $el.textContent = tag.children;
    } else {
      $el.innerHTML = tag.children;
    }
  }
  return $el;
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a2, _b2;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a2 = bodyMetaElements[i].tagName) == null ? void 0 : _a2.toLowerCase()) === type)
        oldBodyElements.push(bodyMetaElements[i]);
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b2 = j == null ? void 0 : j.tagName) == null ? void 0 : _b2.toLowerCase()) === type)
        oldHeadElements.push(j);
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a3;
    var _a22;
    return {
      element: createElement(tag, document2),
      body: (_a3 = (_a22 = tag.options) == null ? void 0 : _a22.body) != null ? _a3 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t2) => {
    var _a22;
    return (_a22 = t2.parentNode) == null ? void 0 : _a22.removeChild(t2);
  });
  oldHeadElements.forEach((t2) => {
    var _a22;
    return (_a22 = t2.parentNode) == null ? void 0 : _a22.removeChild(t2);
  });
  newElements.forEach((t2) => {
    if (t2.body)
      body.insertAdjacentElement("beforeend", t2.element);
    else
      head.insertBefore(t2.element, headCountEl);
  });
  headCountEl.setAttribute(
    "content",
    `${headCount - oldHeadElements.length + newElements.filter((t2) => !t2.body).length}`
  );
};
var updateDOM = async (head, previousTags, document2) => {
  var _a2, _b2;
  const tags = {};
  if (!document2)
    document2 = window.document;
  for (const k2 in head.hooks["before:dom"]) {
    if (await head.hooks["before:dom"][k2]() === false)
      return;
  }
  const resolvedEntries = resolveHeadEntries(head.headEntries);
  for (const h2 in head.hooks["resolved:entries"])
    await head.hooks["resolved:entries"][h2](resolvedEntries);
  const headTags = resolveHeadEntriesToTags(resolvedEntries);
  for (const h2 in head.hooks["resolved:tags"])
    await head.hooks["resolved:tags"][h2](headTags);
  for (const tag of headTags) {
    switch (tag.tag) {
      case "title":
        if (typeof tag.children !== "undefined")
          document2.title = tag.children;
        break;
      case "base":
      case "meta":
      case "link":
      case "style":
      case "script":
      case "noscript":
        tags[tag.tag] = tags[tag.tag] || [];
        tags[tag.tag].push(tag);
        break;
    }
  }
  setAttrs(document2.documentElement, ((_a2 = headTags.find((t2) => t2.tag === "htmlAttrs")) == null ? void 0 : _a2.props) || {});
  setAttrs(document2.body, ((_b2 = headTags.find((t2) => t2.tag === "bodyAttrs")) == null ? void 0 : _b2.props) || {});
  const tagKeys = /* @__PURE__ */ new Set([...Object.keys(tags), ...previousTags]);
  for (const tag of tagKeys)
    updateElements(document2, tag, tags[tag] || []);
  previousTags.clear();
  Object.keys(tags).forEach((i) => previousTags.add(i));
};
version.startsWith("2.");
var createHead = (initHeadObject) => {
  let entries = [];
  let entryId = 0;
  const previousTags = /* @__PURE__ */ new Set();
  let domUpdateTick = null;
  const head = {
    install(app2) {
      if (app2.config.globalProperties)
        app2.config.globalProperties.$head = head;
      app2.provide(PROVIDE_KEY, head);
    },
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    },
    get headEntries() {
      return entries;
    },
    get headTags() {
      const resolvedEntries = resolveHeadEntries(head.headEntries);
      return resolveHeadEntriesToTags(resolvedEntries);
    },
    addHeadObjs(input, options) {
      return head.addEntry(input, options);
    },
    addEntry(input, options = {}) {
      let resolved = false;
      if (options == null ? void 0 : options.resolved) {
        resolved = true;
        delete options.resolved;
      }
      const entry2 = {
        id: entryId++,
        options,
        resolved,
        input
      };
      entries.push(entry2);
      return {
        remove() {
          entries = entries.filter((_objs) => _objs.id !== entry2.id);
        },
        update(updatedInput) {
          entries = entries.map((e2) => {
            if (e2.id === entry2.id)
              e2.input = updatedInput;
            return e2;
          });
        }
      };
    },
    async updateDOM(document2, force) {
      const doDomUpdate = () => {
        domUpdateTick = null;
        return updateDOM(head, previousTags, document2);
      };
      if (force)
        return doDomUpdate();
      return domUpdateTick = domUpdateTick || new Promise((resolve) => nextTick(() => resolve(doDomUpdate())));
    },
    addReactiveEntry(input, options = {}) {
      let entrySideEffect = null;
      const cleanUpWatch = watchEffect(() => {
        const resolvedInput = resolveUnrefHeadInput(input);
        if (entrySideEffect === null) {
          entrySideEffect = head.addEntry(
            resolvedInput,
            { ...options, resolved: true }
          );
        } else {
          entrySideEffect.update(resolvedInput);
        }
      });
      return () => {
        cleanUpWatch();
        if (entrySideEffect)
          entrySideEffect.remove();
      };
    }
  };
  if (initHeadObject)
    head.addEntry(initHeadObject);
  return head;
};
const appPageTransition = { "name": "page" };
const appLayoutTransition = { "name": "layout" };
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appKeepalive = false;
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.addEntry(appHead, { resolved: true });
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = (_meta, options) => {
    {
      head.addEntry(_meta, options);
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const meta = await renderHeadToString(head);
      return {
        ...meta,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const metaMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? () => options.head(nuxtApp) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin(metaMixin);
});
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta = {};
const __nuxt_page_meta$6 = {
  layout: "blog"
};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta = {};
const __nuxt_page_meta$5 = {
  middleware: ["auth"]
};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta = {};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta = {};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta = {};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta = {};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta = {};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta = {};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta = {};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta = {};
const __nuxt_page_meta$4 = {
  middleware: ["auth"]
};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta = {};
const __nuxt_page_meta$3 = {
  layout: "blog"
};
const _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta = {};
const __nuxt_page_meta$2 = {
  layout: "blog"
};
const __nuxt_page_meta$1 = {
  layout: "blog"
};
const __nuxt_page_meta = {
  layout: "blog"
};
const _routes = [
  {
    name: (_a = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta.name) != null ? _a : "404___en",
    path: (_b = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta.path) != null ? _b : "/en/:catchAll(.*)*",
    file: "/Users/kurou/project/bonding/project/web/src/pages/404.vue",
    children: [],
    meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta,
    alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta.alias) || [],
    redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/404.5e97f7f5.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_c = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta.name) != null ? _c : "404___tr",
    path: (_d = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta.path) != null ? _d : "/:catchAll(.*)*",
    file: "/Users/kurou/project/bonding/project/web/src/pages/404.vue",
    children: [],
    meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta,
    alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta.alias) || [],
    redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47404_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/404.5e97f7f5.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_e = __nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.name) != null ? _e : "index___en",
    path: (_f = __nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.path) != null ? _f : "/en",
    file: "/Users/kurou/project/bonding/project/web/src/pages/index.vue",
    children: [],
    meta: __nuxt_page_meta$6,
    alias: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.alias) || [],
    redirect: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.redirect) || void 0,
    component: () => import('./_nuxt/index.f6a70c80.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_g = __nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.name) != null ? _g : "index___tr",
    path: (_h = __nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.path) != null ? _h : "/",
    file: "/Users/kurou/project/bonding/project/web/src/pages/index.vue",
    children: [],
    meta: __nuxt_page_meta$6,
    alias: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.alias) || [],
    redirect: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.redirect) || void 0,
    component: () => import('./_nuxt/index.f6a70c80.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_i = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta.name) != null ? _i : "member-rule___en",
    path: (_j = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta.path) != null ? _j : "/en/member-rule",
    file: "/Users/kurou/project/bonding/project/web/src/pages/member-rule.vue",
    children: [],
    meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta,
    alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta.alias) || [],
    redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/member-rule.7c576c07.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_k = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta.name) != null ? _k : "member-rule___tr",
    path: (_l = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta.path) != null ? _l : "/member-rule",
    file: "/Users/kurou/project/bonding/project/web/src/pages/member-rule.vue",
    children: [],
    meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta,
    alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta.alias) || [],
    redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47member_45rule_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/member-rule.7c576c07.mjs').then((m2) => m2.default || m2)
  },
  {
    path: (_m = __nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.path) != null ? _m : "/en/my",
    file: "/Users/kurou/project/bonding/project/web/src/pages/my.vue",
    children: [
      {
        name: (_n = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta.name) != null ? _n : "my-account-change-phone___en",
        path: (_o = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta.path) != null ? _o : "account/change-phone",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/change-phone.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/change-phone.feae0868.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_p = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta.name) != null ? _p : "my-account-email-binding___en",
        path: (_q = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta.path) != null ? _q : "account/email-binding",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/email-binding.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/email-binding.bb741c42.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_r = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta.name) != null ? _r : "my-account-email-verify___en",
        path: (_s = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta.path) != null ? _s : "account/email-verify",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/email-verify.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/email-verify.c6850a2f.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_t = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta.name) != null ? _t : "my-account-identify-verify___en",
        path: (_u = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta.path) != null ? _u : "account/identify-verify",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/identify-verify.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/identify-verify.cfbdd6e2.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_v = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta.name) != null ? _v : "my-account___en",
        path: (_w = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta.path) != null ? _w : "account",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/index.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/index.4594d773.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_x = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta.name) != null ? _x : "my-account-reset-password___en",
        path: (_y = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta.path) != null ? _y : "account/reset-password",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/reset-password.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/reset-password.3b445a0e.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_z = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta.name) != null ? _z : "my-collections___en",
        path: (_A = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta.path) != null ? _A : "collections",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/collections.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/collections.add13dfe.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_B = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta.name) != null ? _B : "my-history___en",
        path: (_C = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta.path) != null ? _C : "history",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/history.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/history.eaf4e333.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_D = __nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.name) != null ? _D : "my___en",
        path: (_E = __nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.path) != null ? _E : "",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/index.vue",
        children: [],
        meta: __nuxt_page_meta$4,
        alias: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.alias) || [],
        redirect: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.redirect) || void 0,
        component: () => import('./_nuxt/index.dd0b4960.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_F = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta.name) != null ? _F : "my-tips___en",
        path: (_G = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta.path) != null ? _G : "tips",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/tips.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/tips.1d2f5960.mjs').then((m2) => m2.default || m2)
      }
    ],
    name: (_H = __nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.name) != null ? _H : void 0,
    meta: __nuxt_page_meta$5,
    alias: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.alias) || [],
    redirect: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.redirect) || void 0,
    component: () => import('./_nuxt/my.9d289afc.mjs').then((m2) => m2.default || m2)
  },
  {
    path: (_I = __nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.path) != null ? _I : "/my",
    file: "/Users/kurou/project/bonding/project/web/src/pages/my.vue",
    children: [
      {
        name: (_J = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta.name) != null ? _J : "my-account-change-phone___tr",
        path: (_K = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta.path) != null ? _K : "account/change-phone",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/change-phone.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47change_45phone_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/change-phone.feae0868.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_L = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta.name) != null ? _L : "my-account-email-binding___tr",
        path: (_M = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta.path) != null ? _M : "account/email-binding",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/email-binding.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45binding_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/email-binding.bb741c42.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_N = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta.name) != null ? _N : "my-account-email-verify___tr",
        path: (_O = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta.path) != null ? _O : "account/email-verify",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/email-verify.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47email_45verify_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/email-verify.c6850a2f.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_P = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta.name) != null ? _P : "my-account-identify-verify___tr",
        path: (_Q = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta.path) != null ? _Q : "account/identify-verify",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/identify-verify.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47identify_45verify_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/identify-verify.cfbdd6e2.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_R = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta.name) != null ? _R : "my-account___tr",
        path: (_S = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta.path) != null ? _S : "account",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/index.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47index_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/index.4594d773.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_T = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta.name) != null ? _T : "my-account-reset-password___tr",
        path: (_U = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta.path) != null ? _U : "account/reset-password",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/account/reset-password.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47account_47reset_45password_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/reset-password.3b445a0e.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_V = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta.name) != null ? _V : "my-collections___tr",
        path: (_W = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta.path) != null ? _W : "collections",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/collections.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47collections_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/collections.add13dfe.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_X = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta.name) != null ? _X : "my-history___tr",
        path: (_Y = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta.path) != null ? _Y : "history",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/history.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47history_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/history.eaf4e333.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_Z = __nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.name) != null ? _Z : "my___tr",
        path: (__ = __nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.path) != null ? __ : "",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/index.vue",
        children: [],
        meta: __nuxt_page_meta$4,
        alias: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.alias) || [],
        redirect: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.redirect) || void 0,
        component: () => import('./_nuxt/index.dd0b4960.mjs').then((m2) => m2.default || m2)
      },
      {
        name: (_$ = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta.name) != null ? _$ : "my-tips___tr",
        path: (_aa = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta.path) != null ? _aa : "tips",
        file: "/Users/kurou/project/bonding/project/web/src/pages/my/tips.vue",
        children: [],
        meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta,
        alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta.alias) || [],
        redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47my_47tips_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/tips.1d2f5960.mjs').then((m2) => m2.default || m2)
      }
    ],
    name: (_ba = __nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.name) != null ? _ba : void 0,
    meta: __nuxt_page_meta$5,
    alias: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.alias) || [],
    redirect: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.redirect) || void 0,
    component: () => import('./_nuxt/my.9d289afc.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_ca = __nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) != null ? _ca : "news-article-articleSlug___en",
    path: (_da = __nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) != null ? _da : "/en/news/article/:articleSlug",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/article/[articleSlug].vue",
    children: [],
    meta: __nuxt_page_meta$3,
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect) || void 0,
    component: () => import('./_nuxt/_articleSlug_.4afad2f6.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_ea = __nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) != null ? _ea : "news-article-articleSlug___tr",
    path: (_fa = __nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) != null ? _fa : "/news/article/:articleSlug",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/article/[articleSlug].vue",
    children: [],
    meta: __nuxt_page_meta$3,
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect) || void 0,
    component: () => import('./_nuxt/_articleSlug_.4afad2f6.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_ga = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta.name) != null ? _ga : "news-categories___en",
    path: (_ha = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta.path) != null ? _ha : "/en/news/categories",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/categories.vue",
    children: [],
    meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta,
    alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta.alias) || [],
    redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/categories.29cdf3bb.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_ia = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta.name) != null ? _ia : "news-categories___tr",
    path: (_ja = _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta.path) != null ? _ja : "/news/categories",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/categories.vue",
    children: [],
    meta: _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta,
    alias: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta.alias) || [],
    redirect: (_47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta == null ? void 0 : _47Users_47kurou_47project_47bonding_47project_47web_47src_47pages_47news_47categories_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/categories.29cdf3bb.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_ka = __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) != null ? _ka : "news-category-categorySlug___en",
    path: (_la = __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) != null ? _la : "/en/news/category/:categorySlug",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/category/[categorySlug].vue",
    children: [],
    meta: __nuxt_page_meta$2,
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./_nuxt/_categorySlug_.9dc6c867.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_ma = __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) != null ? _ma : "news-category-categorySlug___tr",
    path: (_na = __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) != null ? _na : "/news/category/:categorySlug",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/category/[categorySlug].vue",
    children: [],
    meta: __nuxt_page_meta$2,
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./_nuxt/_categorySlug_.9dc6c867.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_oa = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) != null ? _oa : "news-video-categorySlug___en",
    path: (_pa = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) != null ? _pa : "/en/news/video/:categorySlug",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/video/[categorySlug].vue",
    children: [],
    meta: __nuxt_page_meta$1,
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./_nuxt/_categorySlug_.7a2b39b8.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_qa = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) != null ? _qa : "news-video-categorySlug___tr",
    path: (_ra = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) != null ? _ra : "/news/video/:categorySlug",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/video/[categorySlug].vue",
    children: [],
    meta: __nuxt_page_meta$1,
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./_nuxt/_categorySlug_.7a2b39b8.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_sa = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) != null ? _sa : "news-video___en",
    path: (_ta = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) != null ? _ta : "/en/news/video",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/video/index.vue",
    children: [],
    meta: __nuxt_page_meta,
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/index.291891de.mjs').then((m2) => m2.default || m2)
  },
  {
    name: (_ua = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) != null ? _ua : "news-video___tr",
    path: (_va = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) != null ? _va : "/news/video",
    file: "/Users/kurou/project/bonding/project/web/src/pages/news/video/index.vue",
    children: [],
    meta: __nuxt_page_meta,
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/index.291891de.mjs').then((m2) => m2.default || m2)
  }
];
const routerOptions0 = {
  scrollBehavior: (to, from, savedPosition) => {
    const nuxtApp = useNuxtApp();
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce("page:finish", async () => {
        await nextTick();
        setTimeout(() => {
          if (savedPosition)
            resolve(savedPosition);
          resolve({ top: 0 });
        }, 150);
      });
    });
  }
};
const routerOptions1 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = to.meta.pageTransition !== false && from.meta.pageTransition !== false;
    const hookToWait = hasTransition ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  const elem = document.querySelector(selector);
  if (elem) {
    return parseFloat(getComputedStyle(elem).scrollMarginTop);
  }
  return 0;
}
function _isDifferentRoute(a2, b2) {
  const samePageComponent = a2.matched[0] === b2.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a2.params) !== JSON.stringify(b2.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions1,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (typeof result === "boolean") {
    return result;
  }
  return createError(result);
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {
  auth: () => import('./_nuxt/auth.5c7562da.mjs')
};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a2, _b2, _c2, _d2;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b2 = (_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) != null ? _b2 : createMemoryHistory(routerBase);
  const routes = (_d2 = (_c2 = routerOptions.routes) == null ? void 0 : _c2.call(routerOptions, _routes)) != null ? _d2 : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a3, _b3, _c3, _d3;
    if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d3 = (_c3 = from.matched[0]) == null ? void 0 : _c3.components) == null ? void 0 : _d3.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a3, _b3;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a3 = initialLayout.value) != null ? _a3 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r2) => r2.default || r2)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.event.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const plugin = {
  install: (app2, options) => {
    app2.provide("n-config-provider", {
      mergedThemeHashRef: computed(() => ""),
      mergedBreakpointsRef: computed(() => void 0),
      mergedRtlRef: computed(() => void 0),
      mergedIconsRef: computed(() => void 0),
      mergedComponentPropsRef: computed(() => void 0),
      mergedBorderedRef: computed(() => void 0),
      mergedNamespaceRef: computed(() => void 0),
      mergedClsPrefixRef: computed(() => void 0),
      mergedLocaleRef: computed(() => void 0),
      mergedDateLocaleRef: computed(() => void 0),
      mergedHljsRef: computed(() => void 0),
      mergedThemeRef: computed(() => void 0),
      mergedThemeOverridesRef: computed(() => options.themeOverrides),
      inlineThemeDisabled: false,
      preflightStyleDisabled: false
    });
  }
};
const node_modules__64huntersofbook_naive_ui_nuxt_dist_runtime_config_mjs_hyx03WSFRE = defineNuxtPlugin((nuxtApp) => {
  var _a2, _b2;
  const config = (_b2 = (_a2 = useRuntimeConfig()) == null ? void 0 : _a2.public) == null ? void 0 : _b2.naiveUI;
  if (config)
    nuxtApp.vueApp.use(plugin, config);
});
const ssrContextKey = Symbol("@css-render/vue3-ssr");
function setup(app2) {
  const styles = [];
  const ssrContext = {
    styles,
    ids: /* @__PURE__ */ new Set()
  };
  app2.provide(ssrContextKey, ssrContext);
  return {
    collect() {
      const res = styles.join("\n");
      styles.length = 0;
      return res;
    }
  };
}
const node_modules__64huntersofbook_naive_ui_nuxt_dist_runtime_plugin_mjs_dUrdF0P1fL = defineNuxtPlugin((nuxtApp) => {
  setup(nuxtApp.vueApp);
  nuxtApp.hook("app:beforeMount", () => {
    const meta = document.createElement("meta");
    meta.name = "naive-ui-style";
    document.head.appendChild(meta);
  });
});
const preference = "system";
const node_modules__64nuxtjs_color_mode_dist_runtime_plugin_server_mjs_XNCxeHyTuP = defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
/*!
  * shared v9.3.0-beta.6
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = false;
const hasSymbol$1 = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol$1 = (name) => hasSymbol$1 ? Symbol(name) : name;
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject$1(val) && Object.keys(val).length === 0;
const assign$2 = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {});
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray$1 = Array.isArray;
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isBoolean$1 = (val) => typeof val === "boolean";
const isObject$1 = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
/*!
  * vue-i18n v9.3.0-beta.6
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.3.0-beta.6";
function initFeatureFlags() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
CoreWarnCodes.__EXTEND_POINT__;
let code = CompileErrorCodes.__EXTEND_POINT__;
const inc = () => ++code;
const I18nErrorCodes = {
  UNEXPECTED_RETURN_TYPE: code,
  INVALID_ARGUMENT: inc(),
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSLALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSLALLED_WITH_PROVIDE: inc(),
  UNEXPECTED_ERROR: inc(),
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  __EXTEND_POINT__: inc()
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TransrateVNodeSymbol = /* @__PURE__ */ makeSymbol$1("__transrateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol$1("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol$1("__numberParts");
const SetPluralRulesSymbol = makeSymbol$1("__setPluralRules");
const InejctWithOption = /* @__PURE__ */ makeSymbol$1("__injectWithOption");
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject$1(messages) ? messages : isArray$1(__i18n) ? {} : { [locale]: {} };
  if (isArray$1(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString$1(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray$1(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(global2, options, componentOptions) {
  let messages = isObject$1(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(globalThis.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      global2.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean$1(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE$1
  );
  const _fallbackLocale = ref(
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject$1(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean$1(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean$1(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean$1(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction$1(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction$1(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean$1(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject$1(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject$1(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject$1(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction$1(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    if (__INTLIFY_PROD_DEVTOOLS__) {
      try {
        setAdditionalMeta(getMetaInfo());
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
    } else {
      ret = fn(_context);
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t2(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t2(...[arg1, arg2, assign$2({ resolvedMessage: true }, arg3 || {})]);
  }
  function d2(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function n2(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber(val) || isBoolean$1(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      (root) => root[TransrateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray$1(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString$1(val) || isArray$1(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString$1(val) || isArray$1(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage2(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage2(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign$2(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign$2(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t: t2,
    getLocaleMessage,
    setLocaleMessage: setLocaleMessage2,
    mergeLocaleMessage: mergeLocaleMessage2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d2;
    composer.n = n2;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOption] = options.__injectWithOption;
    composer[TransrateVNodeSymbol] = transrateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        ...current.type === Fragment$1 ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment$1;
}
const Translation = {
  name: "i18n-t",
  props: assign$2({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString$1(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign$2({}, attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h$1(tag, assignedAttrs, children);
    };
  }
};
function isVNode(target) {
  return isArray$1(target) && !isString$1(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString$1(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign$2({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray$1(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString$1(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign$2({}, attrs);
    const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h$1(tag, assignedAttrs, children);
  };
}
const NumberFormat = {
  name: "i18n-n",
  props: assign$2({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n[NumberPartsSymbol](...args));
  }
};
const DatetimeFormat = {
  name: "i18n-d",
  props: assign$2({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n[DatetimePartsSymbol](...args));
  }
};
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString$1(value)) {
    return { path: value };
  } else if (isPlainObject$1(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString$1(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app2, i18n, ...options) {
  const pluginOptions = isPlainObject$1(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean$1(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    app2.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app2.component(NumberFormat.name, NumberFormat);
    app2.component(DatetimeFormat.name, DatetimeFormat);
  }
  {
    app2.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol$1("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean$1(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = makeSymbol$1("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n = {
      get mode() {
        return "composition";
      },
      get allowComposition() {
        return __allowComposition;
      },
      async install(app2, ...options2) {
        app2.__VUE_I18N_SYMBOL__ = symbol;
        app2.provide(app2.__VUE_I18N_SYMBOL__, i18n);
        if (__globalInjection) {
          injectGlobalFields(app2, i18n.global);
        }
        {
          apply(app2, i18n, ...options2);
        }
        const unmountApp = app2.unmount;
        app2.unmount = () => {
          i18n.dispose();
          unmountApp();
        };
      },
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      __instances,
      __getInstance,
      __setInstance,
      __deleteInstance
    };
    return i18n;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSLALLED);
  }
  const i18n = getI18nInstance(instance);
  const global2 = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(global2, options, componentOptions);
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer$3(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = global2;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign$2({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSLALLED_WITH_PROVIDE);
    }
    return i18n;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer$3(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n, target, composer) {
  {
    onUnmounted(() => {
      i18n.__deleteInstance(target);
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm"];
function injectGlobalFields(app2, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app2.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app2.config.globalProperties, `$${method}`, desc);
  });
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  initFeatureFlags();
}
if (__INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const STRATEGIES = {
  PREFIX: "prefix",
  PREFIX_EXCEPT_DEFAULT: "prefix_except_default",
  PREFIX_AND_DEFAULT: "prefix_and_default",
  NO_PREFIX: "no_prefix"
};
const DEFAULT_LOCALE = "";
const DEFAULT_STRATEGY = STRATEGIES.PREFIX_EXCEPT_DEFAULT;
const DEFAULT_TRAILING_SLASH = false;
const DEFAULT_ROUTES_NAME_SEPARATOR = "___";
const DEFAULT_LOCALE_ROUTE_NAME_SUFFIX = "default";
const DEFAULT_DETECTION_DIRECTION = "ltr";
const DEFAULT_BASE_URL = "";
const DEFAULT_DYNAMIC_PARAMS_KEY = "";
/*!
  * shared v9.3.0-beta.6
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
const assign$1 = Object.assign;
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const TRAILING_SLASH_RE = /\/$|\/\?/;
function hasTrailingSlash(input = "", queryParams = false) {
  if (!queryParams) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", queryParams = false) {
  if (!queryParams) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s2] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s2.length ? `?${s2.join("?")}` : "");
}
function withTrailingSlash(input = "", queryParams = false) {
  if (!queryParams) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s2] = input.split("?");
  return s0 + "/" + (s2.length ? `?${s2.join("?")}` : "");
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[vue-i18n-routing] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function getNormalizedLocales(locales) {
  locales = locales || [];
  const normalized = [];
  for (const locale of locales) {
    if (isString(locale)) {
      normalized.push({ code: locale });
    } else {
      normalized.push(locale);
    }
  }
  return normalized;
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function isComposer(target) {
  return target != null && !("__composer" in target) && isRef(target.locale);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function isExportedGlobalComposer(target) {
  return target != null && !("__composer" in target) && !isRef(target.locale);
}
function isLegacyVueI18n$1(target) {
  return target != null && ("__VUE_I18N_BRIDGE__" in target || "_sync" in target);
}
function getComposer(i18n) {
  return isI18nInstance(i18n) ? isComposer(i18n.global) ? i18n.global : i18n.global.__composer : isVueI18n(i18n) ? i18n.__composer : i18n;
}
function getLocale(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.locale.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.locale : target.locale;
}
function getLocales(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.locales.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.locales : target.locales;
}
function getLocaleCodes(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.localeCodes.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.localeCodes : target.localeCodes;
}
function setLocale(i18n, locale) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  if (isComposer(target)) {
    {
      target.locale.value = locale;
    }
  } else if (isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target)) {
    target.locale = locale;
  } else {
    throw new Error("TODO:");
  }
}
function getRouteName(routeName) {
  return isString(routeName) ? routeName : isSymbol(routeName) ? routeName.toString() : "(null)";
}
function getLocaleRouteName(routeName, locale, {
  defaultLocale,
  strategy,
  routesNameSeparator,
  defaultLocaleRouteNameSuffix
}) {
  let name = getRouteName(routeName) + (strategy === "no_prefix" ? "" : routesNameSeparator + locale);
  if (locale === defaultLocale && strategy === "prefix_and_default") {
    name += routesNameSeparator + defaultLocaleRouteNameSuffix;
  }
  return name;
}
function resolveBaseUrl(baseUrl, context) {
  if (isFunction(baseUrl)) {
    return baseUrl(context);
  }
  return baseUrl;
}
function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l2) => l2.iso.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l2) => l2.iso.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
const DefaultBrowserLocaleMatcher = matchBrowserLocale;
function compareBrowserLocale(a2, b2) {
  if (a2.score === b2.score) {
    return b2.code.length - a2.code.length;
  }
  return b2.score - a2.score;
}
const DefaultBrowerLocaleComparer = compareBrowserLocale;
function findBrowserLocale(locales, browserLocales, { matcher = DefaultBrowserLocaleMatcher, comparer = DefaultBrowerLocaleComparer } = {}) {
  const normalizedLocales = [];
  for (const l2 of locales) {
    const { code: code2 } = l2;
    const iso = l2.iso || code2;
    normalizedLocales.push({ code: code2, iso });
  }
  const matchedLocales = matcher(normalizedLocales, browserLocales);
  if (matchedLocales.length > 1) {
    matchedLocales.sort(comparer);
  }
  return matchedLocales.length ? matchedLocales[0].code : "";
}
function proxyVueInstance(target) {
  return function() {
    return Reflect.apply(
      target,
      {
        getRouteBaseName: this.getRouteBaseName,
        localePath: this.localePath,
        localeRoute: this.localeRoute,
        localeLocation: this.localeLocation,
        resolveRoute: this.resolveRoute,
        switchLocalePath: this.switchLocalePath,
        localeHead: this.localeHead,
        i18n: this.$i18n,
        route: this.$route,
        router: this.$router
      },
      arguments
    );
  };
}
function extendI18n(i18n, {
  locales = [],
  localeCodes: localeCodes2 = [],
  baseUrl = DEFAULT_BASE_URL,
  hooks = {},
  context = {}
} = {}) {
  const scope = effectScope();
  const orgInstall = i18n.install;
  i18n.install = (vue, ...options) => {
    Reflect.apply(orgInstall, i18n, [vue, ...options]);
    const composer = getComposer(i18n);
    scope.run(() => extendComposer(composer, { locales, localeCodes: localeCodes2, baseUrl, hooks, context }));
    if (isVueI18n(i18n.global)) {
      extendVueI18n(i18n.global, hooks.onExtendVueI18n);
    }
    const app2 = vue;
    const exported = i18n.mode === "composition" ? app2.config.globalProperties.$i18n : null;
    if (exported) {
      extendExportedGlobal(exported, composer, hooks.onExtendExportedGlobal);
    }
    const pluginOptions = isPluginOptions(options[0]) ? options[0] : { inject: true };
    if (pluginOptions.inject) {
      vue.mixin({
        methods: {
          resolveRoute: proxyVueInstance(resolveRoute),
          localePath: proxyVueInstance(localePath),
          localeRoute: proxyVueInstance(localeRoute),
          localeLocation: proxyVueInstance(localeLocation),
          switchLocalePath: proxyVueInstance(switchLocalePath),
          getRouteBaseName: proxyVueInstance(getRouteBaseName),
          localeHead: proxyVueInstance(localeHead)
        }
      });
    }
    if (app2.unmount) {
      const unmountApp = app2.unmount;
      app2.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
  return scope;
}
function extendComposer(composer, options) {
  const { locales, localeCodes: localeCodes2, baseUrl, context } = options;
  const _locales = ref(locales);
  const _localeCodes = ref(localeCodes2);
  const _baseUrl = ref("");
  composer.locales = computed(() => _locales.value);
  composer.localeCodes = computed(() => _localeCodes.value);
  composer.baseUrl = computed(() => _baseUrl.value);
  watch(
    composer.locale,
    () => {
      _baseUrl.value = resolveBaseUrl(baseUrl, context);
    },
    { immediate: true }
  );
  if (options.hooks && options.hooks.onExtendComposer) {
    options.hooks.onExtendComposer(composer);
  }
}
function extendExportedGlobal(exported, g2, hook) {
  const properties = [
    {
      locales: {
        get() {
          return g2.locales.value;
        }
      },
      localeCodes: {
        get() {
          return g2.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return g2.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(g2));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(exported, key, descriptor);
    }
  }
}
function extendVueI18n(vueI18n, hook) {
  const composer = getComposer(vueI18n);
  const properties = [
    {
      locales: {
        get() {
          return composer.locales.value;
        }
      },
      localeCodes: {
        get() {
          return composer.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return composer.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(composer));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(vueI18n, key, descriptor);
    }
  }
}
function isPluginOptions(options) {
  return isObject(options) && "inject" in options && isBoolean(options.inject);
}
const GlobalOptionsRegistory = makeSymbol("vue-i18n-routing-gor");
function registerGlobalOptions(router, options) {
  const _options = router[GlobalOptionsRegistory];
  if (_options) {
    warn("already registered global options");
  } else {
    router[GlobalOptionsRegistory] = options;
  }
}
function getGlobalOptions(router) {
  var _a2;
  return (_a2 = router[GlobalOptionsRegistory]) != null ? _a2 : {};
}
function getLocalesRegex(localeCodes2) {
  return new RegExp(`^/(${localeCodes2.join("|")})(?:/|$)`, "i");
}
function createLocaleFromRouteGetter(localeCodes2, routesNameSeparator, defaultLocaleRouteNameSuffix) {
  const localesPattern = `(${localeCodes2.join("|")})`;
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`;
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, "i");
  const regexpPath = getLocalesRegex(localeCodes2);
  const getLocaleFromRoute = (route) => {
    if (isObject(route)) {
      if (route.name) {
        const name = isString(route.name) ? route.name : route.name.toString();
        const matches = name.match(regexpName);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      } else if (route.path) {
        const matches = route.path.match(regexpPath);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      }
    } else if (isString(route)) {
      const matches = route.match(regexpPath);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }
    return "";
  };
  return getLocaleFromRoute;
}
function getI18nRoutingOptions(router, proxy, {
  defaultLocale = DEFAULT_LOCALE,
  defaultDirection = DEFAULT_DETECTION_DIRECTION,
  defaultLocaleRouteNameSuffix = DEFAULT_LOCALE_ROUTE_NAME_SUFFIX,
  routesNameSeparator = DEFAULT_ROUTES_NAME_SEPARATOR,
  strategy = DEFAULT_STRATEGY,
  trailingSlash = DEFAULT_TRAILING_SLASH,
  localeCodes: localeCodes2 = [],
  prefixable: prefixable2 = DefaultPrefixable,
  switchLocalePathIntercepter = DefaultSwitchLocalePathIntercepter,
  dynamicRouteParamsKey = DEFAULT_DYNAMIC_PARAMS_KEY
} = {}) {
  const options = getGlobalOptions(router);
  return {
    defaultLocale: proxy.defaultLocale || options.defaultLocale || defaultLocale,
    defaultDirection: proxy.defaultDirection || options.defaultDirection || defaultDirection,
    defaultLocaleRouteNameSuffix: proxy.defaultLocaleRouteNameSuffix || options.defaultLocaleRouteNameSuffix || defaultLocaleRouteNameSuffix,
    routesNameSeparator: proxy.routesNameSeparator || options.routesNameSeparator || routesNameSeparator,
    strategy: proxy.strategy || options.strategy || strategy,
    trailingSlash: proxy.trailingSlash || options.trailingSlash || trailingSlash,
    localeCodes: proxy.localeCodes || options.localeCodes || localeCodes2,
    prefixable: proxy.prefixable || options.prefixable || prefixable2,
    switchLocalePathIntercepter: proxy.switchLocalePathIntercepter || options.switchLocalePathIntercepter || switchLocalePathIntercepter,
    dynamicRouteParamsKey: proxy.dynamicRouteParamsKey || options.dynamicRouteParamsKey || dynamicRouteParamsKey
  };
}
const RESOLVED_PREFIXED = /* @__PURE__ */ new Set(["prefix_and_default", "prefix_except_default"]);
function prefixable(optons) {
  const { currentLocale, defaultLocale, strategy } = optons;
  const isDefaultLocale = currentLocale === defaultLocale;
  return !(isDefaultLocale && RESOLVED_PREFIXED.has(strategy)) && !(strategy === "no_prefix");
}
const DefaultPrefixable = prefixable;
function getRouteBaseName(givenRoute) {
  const router = this.router;
  const { routesNameSeparator } = getI18nRoutingOptions(router, this);
  const route = givenRoute != null ? isRef(givenRoute) ? unref(givenRoute) : givenRoute : this.route;
  if (route == null || !route.name) {
    return;
  }
  const name = getRouteName(route.name);
  return name.split(routesNameSeparator)[0];
}
function localePath(route, locale) {
  const localizedRoute = resolveRoute.call(this, route, locale);
  return localizedRoute == null ? "" : localizedRoute.redirectedFrom || localizedRoute.fullPath;
}
function localeRoute(route, locale) {
  const resolved = resolveRoute.call(this, route, locale);
  return resolved == null ? void 0 : resolved;
}
function localeLocation(route, locale) {
  const resolved = resolveRoute.call(this, route, locale);
  return resolved == null ? void 0 : resolved;
}
function resolveRoute(route, locale) {
  const router = this.router;
  const i18n = this.i18n;
  const _locale = locale || getLocale(i18n);
  const { routesNameSeparator, defaultLocale, defaultLocaleRouteNameSuffix, strategy, trailingSlash, prefixable: prefixable2 } = getI18nRoutingOptions(router, this);
  let _route = route;
  if (isString(route)) {
    if (_route[0] === "/") {
      _route = { path: route };
    } else {
      _route = { name: route };
    }
  }
  let localizedRoute = assign$1({}, _route);
  if (localizedRoute.path && !localizedRoute.name) {
    let _resolvedRoute = null;
    try {
      _resolvedRoute = router.resolve(localizedRoute);
    } catch {
    }
    const resolvedRoute = _resolvedRoute;
    const resolvedRouteName = getRouteBaseName.call(this, resolvedRoute);
    if (isString(resolvedRouteName)) {
      localizedRoute = {
        name: getLocaleRouteName(resolvedRouteName, _locale, {
          defaultLocale,
          strategy,
          routesNameSeparator,
          defaultLocaleRouteNameSuffix
        }),
        params: resolvedRoute.params,
        query: resolvedRoute.query,
        hash: resolvedRoute.hash
      };
      {
        localizedRoute.state = resolvedRoute.state;
      }
    } else {
      if (prefixable2({ currentLocale: _locale, defaultLocale, strategy })) {
        localizedRoute.path = `/${_locale}${localizedRoute.path}`;
      }
      localizedRoute.path = trailingSlash ? withTrailingSlash(localizedRoute.path, true) : withoutTrailingSlash(localizedRoute.path, true);
    }
  } else {
    if (!localizedRoute.name && !localizedRoute.path) {
      localizedRoute.name = getRouteBaseName.call(this, this.route);
    }
    localizedRoute.name = getLocaleRouteName(localizedRoute.name, _locale, {
      defaultLocale,
      strategy,
      routesNameSeparator,
      defaultLocaleRouteNameSuffix
    });
  }
  try {
    const resolvedRoute = router.resolve(localizedRoute);
    if (isVue3 ? resolvedRoute.name : resolvedRoute.route.name) {
      return resolvedRoute;
    }
    return router.resolve(route);
  } catch (e2) {
    if (e2.type === 1) {
      return null;
    }
  }
}
const DefaultSwitchLocalePathIntercepter = (path) => path;
function getLocalizableMetaFromDynamicParams(route, key) {
  const metaDefault = {};
  if (key === DEFAULT_DYNAMIC_PARAMS_KEY) {
    return metaDefault;
  }
  const meta = route.meta;
  if (isRef(meta)) {
    return meta.value[key] || metaDefault;
  } else {
    return meta[key] || metaDefault;
  }
}
function switchLocalePath(locale) {
  const route = this.route;
  const name = getRouteBaseName.call(this, route);
  if (!name) {
    return "";
  }
  const { switchLocalePathIntercepter, dynamicRouteParamsKey } = getI18nRoutingOptions(this.router, this);
  const { params, ...routeCopy } = route;
  const langSwitchParams = getLocalizableMetaFromDynamicParams(route, dynamicRouteParamsKey)[locale] || {};
  const _baseRoute = {
    name,
    params: {
      ...params,
      ...langSwitchParams
    }
  };
  const baseRoute = assign$1({}, routeCopy, _baseRoute);
  let path = localePath.call(this, baseRoute, locale);
  path = switchLocalePathIntercepter(path, locale);
  return path;
}
function localeHead({ addDirAttribute = false, addSeoAttributes = false, identifierAttribute = "hid" } = {}) {
  const router = this.router;
  const i18n = this.i18n;
  const { defaultDirection } = getI18nRoutingOptions(router, this);
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (i18n.locales == null || i18n.baseUrl == null) {
    return metaObject;
  }
  const locale = getLocale(i18n);
  const locales = getLocales(i18n);
  const currentLocale = getNormalizedLocales(locales).find((l2) => l2.code === locale) || {
    code: locale
  };
  const currentLocaleIso = currentLocale.iso;
  const currentLocaleDir = currentLocale.dir || defaultDirection;
  if (addDirAttribute) {
    metaObject.htmlAttrs.dir = currentLocaleDir;
  }
  if (addSeoAttributes && locale && i18n.locales) {
    if (currentLocaleIso) {
      metaObject.htmlAttrs.lang = currentLocaleIso;
    }
    addHreflangLinks.call(this, locales, unref(i18n.baseUrl), metaObject.link, identifierAttribute);
    addCanonicalLinks.call(this, unref(i18n.baseUrl), metaObject.link, identifierAttribute, addSeoAttributes);
    addCurrentOgLocale(currentLocale, currentLocaleIso, metaObject.meta, identifierAttribute);
    addAlternateOgLocales(locales, currentLocaleIso, metaObject.meta, identifierAttribute);
  }
  return metaObject;
}
function addHreflangLinks(locales, baseUrl, link, identifierAttribute) {
  const router = this.router;
  const { defaultLocale, strategy } = getI18nRoutingOptions(router, this);
  if (strategy === STRATEGIES.NO_PREFIX) {
    return;
  }
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    const localeIso = locale.iso;
    if (!localeIso) {
      warn("Locale ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = localeIso.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(localeIso, locale);
  }
  for (const [iso, mapLocale] of localeMap.entries()) {
    const localePath2 = switchLocalePath.call(this, mapLocale.code);
    if (localePath2) {
      link.push({
        [identifierAttribute]: `i18n-alt-${iso}`,
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: iso
      });
    }
  }
  if (defaultLocale) {
    const localePath2 = switchLocalePath.call(this, defaultLocale);
    if (localePath2) {
      link.push({
        [identifierAttribute]: "i18n-xd",
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: "x-default"
      });
    }
  }
}
function addCanonicalLinks(baseUrl, link, identifierAttribute, seoAttributesOptions) {
  const route = this.route;
  const currentRoute = localeRoute.call(this, {
    ...route,
    name: getRouteBaseName.call(this, route)
  });
  if (currentRoute) {
    let href = toAbsoluteUrl(currentRoute.path, baseUrl);
    const canonicalQueries = isObject(seoAttributesOptions) && seoAttributesOptions.canonicalQueries || [];
    if (canonicalQueries.length) {
      const currentRouteQueryParams = currentRoute.query;
      const params = new URLSearchParams();
      for (const queryParamName of canonicalQueries) {
        if (queryParamName in currentRouteQueryParams) {
          const queryParamValue = currentRouteQueryParams[queryParamName];
          if (isArray(queryParamValue)) {
            queryParamValue.forEach((v2) => params.append(queryParamName, v2 || ""));
          } else {
            params.append(queryParamName, queryParamValue || "");
          }
        }
      }
      const queryString = params.toString();
      if (queryString) {
        href = `${href}?${queryString}`;
      }
    }
    link.push({
      [identifierAttribute]: "i18n-can",
      rel: "canonical",
      href
    });
  }
}
function addCurrentOgLocale(currentLocale, currentLocaleIso, meta, identifierAttribute) {
  const hasCurrentLocaleAndIso = currentLocale && currentLocaleIso;
  if (!hasCurrentLocaleAndIso) {
    return;
  }
  meta.push({
    [identifierAttribute]: "i18n-og",
    property: "og:locale",
    content: hypenToUnderscore(currentLocaleIso)
  });
}
function addAlternateOgLocales(locales, currentLocaleIso, meta, identifierAttribute) {
  const localesWithoutCurrent = locales.filter((locale) => {
    const localeIso = locale.iso;
    return localeIso && localeIso !== currentLocaleIso;
  });
  if (localesWithoutCurrent.length) {
    const alternateLocales = localesWithoutCurrent.map((locale) => ({
      [identifierAttribute]: `i18n-og-alt-${locale.iso}`,
      property: "og:locale:alternate",
      content: hypenToUnderscore(locale.iso)
    }));
    meta.push(...alternateLocales);
  }
}
function hypenToUnderscore(str) {
  return (str || "").replace(/-/g, "_");
}
function toAbsoluteUrl(urlOrPath, baseUrl) {
  if (urlOrPath.match(/^https?:\/\//)) {
    return urlOrPath;
  }
  return baseUrl + urlOrPath;
}
const locale_tr = {
  "hello": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["merhaba"]);
  },
  "follow": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Takip Et"]);
  },
  "modal": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Ekran"]);
  }
};
const localeCodes = ["en", "tr"];
const localeMessages = {
  "tr": () => Promise.resolve(locale_tr),
  "en": () => import('./_nuxt/en-US.5829c3d6.mjs')
};
const additionalMessages = Object({ "en": [], "tr": [] });
const resolveNuxtI18nOptions = async (context) => {
  const nuxtI18nOptions = Object({});
  const vueI18nOptionsLoader = async (context2) => Object({ "legacy": false, "locale": "tr", "fallbackLocale": "tr", "availableLocales": ["en", "tr"] });
  nuxtI18nOptions.vueI18n = await vueI18nOptionsLoader();
  nuxtI18nOptions.locales = [Object({ "code": "en", "file": "en-US.json" }), Object({ "code": "tr", "file": "tr-TR.json" })];
  nuxtI18nOptions.defaultLocale = "tr";
  nuxtI18nOptions.defaultDirection = "ltr";
  nuxtI18nOptions.routesNameSeparator = "___";
  nuxtI18nOptions.trailingSlash = false;
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default";
  nuxtI18nOptions.strategy = "prefix_except_default";
  nuxtI18nOptions.lazy = true;
  nuxtI18nOptions.langDir = "locales/";
  nuxtI18nOptions.rootRedirect = null;
  nuxtI18nOptions.detectBrowserLanguage = Object({ "alwaysRedirect": false, "cookieCrossOrigin": false, "cookieDomain": null, "cookieKey": "i18n_redirected", "cookieSecure": false, "fallbackLocale": "", "redirectOn": "root", "useCookie": true });
  nuxtI18nOptions.differentDomains = false;
  nuxtI18nOptions.baseUrl = "";
  nuxtI18nOptions.dynamicRouteParams = false;
  nuxtI18nOptions.parsePages = true;
  nuxtI18nOptions.pages = Object({});
  nuxtI18nOptions.skipSettingLocaleOnNavigate = false;
  nuxtI18nOptions.onBeforeLanguageSwitch = () => "";
  nuxtI18nOptions.onLanguageSwitched = () => null;
  nuxtI18nOptions.types = void 0;
  nuxtI18nOptions.debug = false;
  return nuxtI18nOptions;
};
const nuxtI18nOptionsDefault = Object({ vueI18n: void 0, locales: [], defaultLocale: "", defaultDirection: "ltr", routesNameSeparator: "___", trailingSlash: false, defaultLocaleRouteNameSuffix: "default", strategy: "prefix_except_default", lazy: false, langDir: null, rootRedirect: null, detectBrowserLanguage: Object({ "alwaysRedirect": false, "cookieCrossOrigin": false, "cookieDomain": null, "cookieKey": "i18n_redirected", "cookieSecure": false, "fallbackLocale": "", "redirectOn": "root", "useCookie": true }), differentDomains: false, baseUrl: "", dynamicRouteParams: false, parsePages: true, pages: Object({}), skipSettingLocaleOnNavigate: false, onBeforeLanguageSwitch: () => "", onLanguageSwitched: () => null, types: void 0, debug: false });
const nuxtI18nInternalOptions = Object({ __normalizedLocales: [Object({ "code": "en", "file": "en-US.json" }), Object({ "code": "tr", "file": "tr-TR.json" })] });
function formatMessage(message) {
  return "[@nuxtjs/i18n] " + message;
}
function isLegacyVueI18n(target) {
  return target != null && ("__VUE_I18N_BRIDGE__" in target || "_sync" in target);
}
function callVueI18nInterfaces(i18n, name, ...args) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  const [obj, method] = [target, target[name]];
  return Reflect.apply(method, obj, [...args]);
}
function getVueI18nPropertyValue(i18n, name) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  const ret = isComposer(target) ? target[name].value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n(target) ? target[name] : target[name];
  return ret;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function proxyNuxt(nuxt, target) {
  return function() {
    return Reflect.apply(
      target,
      {
        i18n: nuxt.$i18n,
        getRouteBaseName: nuxt.$getRouteBaseName,
        localePath: nuxt.$localePath,
        localeRoute: nuxt.$localeRoute,
        switchLocalePath: nuxt.$switchLocalePath,
        localeHead: nuxt.$localeHead,
        route: nuxt.$router.currentRoute.value,
        router: nuxt.$router,
        store: void 0
      },
      arguments
    );
  };
}
function parseAcceptLanguage(input) {
  return input.split(",").map((tag) => tag.split(";")[0]);
}
async function loadMessage(context, loader) {
  let message = null;
  try {
    const getter = await loader().then((r2) => r2.default || r2);
    if (isFunction$1(getter)) {
      console.error(formatMessage("Not support executable file (e.g. js, cjs, mjs)"));
    } else {
      message = getter;
    }
  } catch (e2) {
    console.error(formatMessage("Failed locale loading: " + e2.message));
  }
  return message;
}
async function loadLocale(context, locale, setter) {
  {
    const loader = localeMessages[locale];
    if (loader != null) {
      const message = await loadMessage(context, loader);
      if (message != null) {
        setter(locale, message);
      }
    } else {
      console.warn(formatMessage("Could not find " + locale + " locale in localeMessages"));
    }
  }
}
async function loadAdditionalLocale(context, locale, merger) {
  {
    const additionalLoaders = additionalMessages[locale] || [];
    for (const additionalLoader of additionalLoaders) {
      const message = await loadMessage(context, additionalLoader);
      if (message != null) {
        merger(locale, message);
      }
    }
  }
}
function getBrowserLocale(options, context) {
  let ret;
  {
    const header = useRequestHeaders(["accept-language"]);
    const accept = header["accept-language"];
    if (accept) {
      ret = findBrowserLocale(options.__normalizedLocales, parseAcceptLanguage(accept));
    }
  }
  return ret;
}
function getLocaleCookie(context, {
  useCookie: useCookie2 = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  localeCodes: localeCodes2 = []
} = {}) {
  if (useCookie2) {
    let localeCode;
    {
      const cookie = useRequestHeaders(["cookie"]);
      if ("cookie" in cookie) {
        const parsedCookie = parse(cookie["cookie"]);
        localeCode = parsedCookie[cookieKey];
      }
    }
    if (localeCode && localeCodes2.includes(localeCode)) {
      return localeCode;
    }
  }
}
function setLocaleCookie(locale, context, {
  useCookie: useCookie2 = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  cookieDomain = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieDomain,
  cookieSecure = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieSecure,
  cookieCrossOrigin = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieCrossOrigin
} = {}) {
  if (!useCookie2) {
    return;
  }
  const date = new Date();
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: "/",
    sameSite: cookieCrossOrigin ? "none" : "lax",
    secure: cookieCrossOrigin || cookieSecure
  };
  if (cookieDomain) {
    cookieOptions.domain = cookieDomain;
  }
  {
    if (context.res) {
      const { res } = context;
      let headers = res.getHeader("Set-Cookie") || [];
      if (!isArray$1(headers)) {
        headers = [String(headers)];
      }
      const redirectCookie = serialize(cookieKey, locale, cookieOptions);
      headers.push(redirectCookie);
      res.setHeader("Set-Cookie", headers);
    }
  }
}
function detectBrowserLanguage(route, context, nuxtI18nOptions, nuxtI18nInternalOptions2, localeCodes2 = [], locale = "") {
  const { strategy } = nuxtI18nOptions;
  const { redirectOn, alwaysRedirect, useCookie: useCookie2, fallbackLocale } = nuxtI18nOptions.detectBrowserLanguage;
  const path = isString$1(route) ? route : route.path;
  if (strategy !== "no_prefix") {
    if (redirectOn === "root") {
      if (path !== "/") {
        return "";
      }
    } else if (redirectOn === "no prefix") {
      if (!alwaysRedirect && path.match(getLocalesRegex(localeCodes2))) {
        return "";
      }
    }
  }
  const cookieLocale = getLocaleCookie(context, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes: localeCodes2 });
  let matchedLocale;
  if (useCookie2 && (matchedLocale = cookieLocale))
    ;
  else {
    matchedLocale = getBrowserLocale(nuxtI18nInternalOptions2);
  }
  const finalLocale = matchedLocale || fallbackLocale;
  const vueI18nLocale = locale || nuxtI18nOptions.vueI18n.locale;
  if (finalLocale && (!useCookie2 || alwaysRedirect || !cookieLocale)) {
    if (strategy === "no_prefix") {
      return finalLocale;
    } else {
      if (finalLocale !== vueI18nLocale && path !== "/") {
        return finalLocale;
      }
    }
  }
  return "";
}
function getHost() {
  let host;
  {
    const header = useRequestHeaders(["x-forwarded-host", "host"]);
    let detectedHost;
    if ("x-forwarded-host" in header) {
      detectedHost = header["x-forwarded-host"];
    } else if ("host" in header) {
      detectedHost = header["host"];
    }
    host = isArray$1(detectedHost) ? detectedHost[0] : detectedHost;
  }
  return host;
}
function getLocaleDomain(locales) {
  let host = getHost() || "";
  if (host) {
    const matchingLocale = locales.find((locale) => locale.domain === host);
    if (matchingLocale) {
      return matchingLocale.code;
    } else {
      host = "";
    }
  }
  return host;
}
function getDomainFromLocale(localeCode, locales, nuxt) {
  const lang = locales.find((locale) => locale.code === localeCode);
  if (lang && lang.domain) {
    if (hasProtocol(lang.domain)) {
      return lang.domain;
    }
    let protocol;
    {
      const { req } = useRequestEvent(nuxt);
      protocol = req && isHTTPS(req) ? "https" : "http";
    }
    return protocol + "://" + lang.domain;
  }
  console.warn(formatMessage("Could not find domain name for locale " + localeCode));
}
function setCookieLocale(i18n, locale) {
  return callVueI18nInterfaces(i18n, "setLocaleCookie", locale);
}
function setLocaleMessage(i18n, locale, messages) {
  return callVueI18nInterfaces(i18n, "setLocaleMessage", locale, messages);
}
function mergeLocaleMessage(i18n, locale, messages) {
  return callVueI18nInterfaces(i18n, "mergeLocaleMessage", locale, messages);
}
function onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context) {
  return callVueI18nInterfaces(i18n, "onBeforeLanguageSwitch", oldLocale, newLocale, initial, context);
}
function onLanguageSwitched(i18n, oldLocale, newLocale) {
  return callVueI18nInterfaces(i18n, "onLanguageSwitched", oldLocale, newLocale);
}
function makeFallbackLocaleCodes(fallback, locales) {
  let fallbackLocales = [];
  if (isArray$1(fallback)) {
    fallbackLocales = fallback;
  } else if (isObject$1(fallback)) {
    const targets = [...locales, "default"];
    for (const locale of targets) {
      if (fallback[locale]) {
        fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
      }
    }
  } else if (isString$1(fallback) && locales.every((locale) => locale !== fallback)) {
    fallbackLocales.push(fallback);
  }
  return fallbackLocales;
}
async function loadInitialMessages(context, messages, options) {
  const { defaultLocale, initialLocale, localeCodes: localeCodes2, fallbackLocale, langDir, lazy } = options;
  const setter = (locale, message) => messages[locale] = message;
  if (langDir) {
    if (lazy && fallbackLocale) {
      const fallbackLocales = makeFallbackLocaleCodes(fallbackLocale, [defaultLocale, initialLocale]);
      await Promise.all(fallbackLocales.map((locale) => loadLocale(context, locale, setter)));
    }
    const locales = lazy ? [...(/* @__PURE__ */ new Set()).add(defaultLocale).add(initialLocale)] : localeCodes2;
    await Promise.all(locales.map((locale) => loadLocale(context, locale, setter)));
  }
  return messages;
}
async function mergeAdditionalMessages(context, i18n, locale) {
  await loadAdditionalLocale(
    context,
    locale,
    (locale2, message) => mergeLocaleMessage(i18n, locale2, message)
  );
}
async function loadAndSetLocale(newLocale, context, i18n, {
  useCookie: useCookie2 = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  skipSettingLocaleOnNavigate = nuxtI18nOptionsDefault.skipSettingLocaleOnNavigate,
  differentDomains = nuxtI18nOptionsDefault.differentDomains,
  initial = false,
  lazy = false,
  langDir = null
} = {}) {
  let ret = false;
  const oldLocale = getLocale(i18n);
  if (!newLocale) {
    return [ret, oldLocale];
  }
  if (!initial && differentDomains) {
    return [ret, oldLocale];
  }
  if (oldLocale === newLocale) {
    return [ret, oldLocale];
  }
  const localeOverride = onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context);
  const localeCodes2 = getLocaleCodes(i18n);
  if (localeOverride && localeCodes2 && localeCodes2.includes(localeOverride)) {
    if (localeOverride === oldLocale) {
      return [ret, oldLocale];
    }
    newLocale = localeOverride;
  }
  if (langDir) {
    const i18nFallbackLocales = getVueI18nPropertyValue(i18n, "fallbackLocale");
    if (lazy) {
      const setter = (locale, message) => setLocaleMessage(i18n, locale, message);
      if (i18nFallbackLocales) {
        const fallbackLocales = makeFallbackLocaleCodes(i18nFallbackLocales, [newLocale]);
        await Promise.all(fallbackLocales.map((locale) => loadLocale(context, locale, setter)));
      }
      await loadLocale(context, newLocale, setter);
    }
  }
  await mergeAdditionalMessages(context, i18n, newLocale);
  if (skipSettingLocaleOnNavigate) {
    return [ret, oldLocale];
  }
  if (useCookie2) {
    setCookieLocale(i18n, newLocale);
  }
  setLocale(i18n, newLocale);
  onLanguageSwitched(i18n, oldLocale, newLocale);
  ret = true;
  return [ret, oldLocale];
}
function detectLocale(route, context, routeLocaleGetter, nuxtI18nOptions, initialLocaleLoader, normalizedLocales, localeCodes2 = []) {
  const { strategy, defaultLocale, differentDomains } = nuxtI18nOptions;
  const initialLocale = isFunction$1(initialLocaleLoader) ? initialLocaleLoader() : initialLocaleLoader;
  const browserLocale = nuxtI18nOptions.detectBrowserLanguage ? detectBrowserLanguage(route, context, nuxtI18nOptions, nuxtI18nInternalOptions, localeCodes2, initialLocale) : "";
  let finalLocale = browserLocale;
  if (!finalLocale) {
    if (differentDomains) {
      finalLocale = getLocaleDomain(normalizedLocales);
    } else if (strategy !== "no_prefix") {
      finalLocale = routeLocaleGetter(route);
    }
  }
  if (!finalLocale && nuxtI18nOptions.detectBrowserLanguage && nuxtI18nOptions.detectBrowserLanguage.useCookie) {
    finalLocale = getLocaleCookie(context, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes: localeCodes2 });
  }
  if (!finalLocale) {
    finalLocale = defaultLocale || "";
  }
  return finalLocale;
}
function detectRedirect(route, context, targetLocale, routeLocaleGetter, nuxtI18nOptions) {
  const { strategy, defaultLocale, differentDomains } = nuxtI18nOptions;
  let redirectPath = "";
  if (!differentDomains && strategy !== "no_prefix" && (routeLocaleGetter(route) !== targetLocale || strategy === "prefix_and_default" && targetLocale === defaultLocale)) {
    const { fullPath } = route;
    const routePath = context.$switchLocalePath(targetLocale) || context.$localePath(fullPath, targetLocale);
    if (isString$1(routePath) && routePath && routePath !== fullPath && !routePath.startsWith("//")) {
      redirectPath = routePath;
    }
  }
  if (differentDomains) {
    const routePath = context.$switchLocalePath(targetLocale) || context.$localePath(route.fullPath, targetLocale);
    if (isString$1(routePath)) {
      redirectPath = routePath;
    }
  }
  return redirectPath;
}
function isRootRedirectOptions(rootRedirect) {
  return isObject$1(rootRedirect) && "path" in rootRedirect && "statusCode" in rootRedirect;
}
async function navigate(i18n, redirectPath, locale, route, {
  status = 302,
  rootRedirect = nuxtI18nOptionsDefault.rootRedirect,
  differentDomains = nuxtI18nOptionsDefault.differentDomains,
  skipSettingLocaleOnNavigate = nuxtI18nOptionsDefault.skipSettingLocaleOnNavigate
} = {}) {
  if (route.path === "/" && rootRedirect) {
    if (isString$1(rootRedirect)) {
      redirectPath = rootRedirect;
    } else if (isRootRedirectOptions(rootRedirect)) {
      redirectPath = "/" + rootRedirect.path;
      status = rootRedirect.statusCode;
    }
    return navigateTo(redirectPath, { redirectCode: status });
  }
  if (!differentDomains) {
    if (redirectPath) {
      return navigateTo(redirectPath, { redirectCode: status });
    }
  }
}
function inejctNuxtHelpers(nuxt, i18n) {
  defineGetter(nuxt, "$i18n", i18n.global);
  for (const pair of [
    ["getRouteBaseName", getRouteBaseName],
    ["localePath", localePath],
    ["localeRoute", localeRoute],
    ["switchLocalePath", switchLocalePath],
    ["localeHead", localeHead]
  ]) {
    defineGetter(nuxt, "$" + pair[0], proxyNuxt(nuxt, pair[1]));
  }
}
function extendPrefixable(differentDomains) {
  return (opts) => {
    return DefaultPrefixable(opts) && !differentDomains;
  };
}
function extendSwitchLocalePathIntercepter(differentDomains, normalizedLocales, nuxt) {
  return (path, locale) => {
    if (differentDomains) {
      const domain = getDomainFromLocale(locale, normalizedLocales, nuxt);
      if (domain) {
        return joinURL(domain, path);
      } else {
        return path;
      }
    } else {
      return DefaultSwitchLocalePathIntercepter(path);
    }
  };
}
function extendBaseUrl(baseUrl, options) {
  return (context) => {
    if (isFunction$1(baseUrl)) {
      return baseUrl(context);
    }
    const { differentDomains, localeCodeLoader, normalizedLocales } = options;
    const localeCode = isFunction$1(localeCodeLoader) ? localeCodeLoader() : localeCodeLoader;
    if (differentDomains && localeCode) {
      const domain = getDomainFromLocale(localeCode, normalizedLocales, options.nuxt);
      if (domain) {
        return domain;
      }
    }
    return baseUrl;
  };
}
const node_modules__64nuxtjs_i18n_dist_runtime_plugin_mjs_vyNBGOI7EC = defineNuxtPlugin(async (nuxt) => {
  var _a2;
  let __temp, __restore;
  const router = useRouter();
  const route = useRoute();
  const { vueApp: app2 } = nuxt;
  const nuxtContext = nuxt;
  const nuxtI18nOptions = ([__temp, __restore] = executeAsync(() => resolveNuxtI18nOptions()), __temp = await __temp, __restore(), __temp);
  const useCookie2 = nuxtI18nOptions.detectBrowserLanguage && nuxtI18nOptions.detectBrowserLanguage.useCookie;
  const { __normalizedLocales: normalizedLocales } = nuxtI18nInternalOptions;
  const {
    defaultLocale,
    differentDomains,
    skipSettingLocaleOnNavigate,
    lazy,
    langDir,
    routesNameSeparator,
    defaultLocaleRouteNameSuffix,
    rootRedirect
  } = nuxtI18nOptions;
  nuxtI18nOptions.baseUrl = extendBaseUrl(nuxtI18nOptions.baseUrl, {
    differentDomains,
    nuxt: nuxtContext,
    localeCodeLoader: defaultLocale,
    normalizedLocales
  });
  const getLocaleFromRoute = createLocaleFromRouteGetter(localeCodes, routesNameSeparator, defaultLocaleRouteNameSuffix);
  const vueI18nOptions = nuxtI18nOptions.vueI18n;
  vueI18nOptions.messages = vueI18nOptions.messages || {};
  vueI18nOptions.fallbackLocale = (_a2 = vueI18nOptions.fallbackLocale) != null ? _a2 : false;
  registerGlobalOptions(router, {
    ...nuxtI18nOptions,
    dynamicRouteParamsKey: isBoolean$1(nuxtI18nOptions.dynamicRouteParams) ? "nuxtI18n" : nuxtI18nOptions.dynamicRouteParams,
    switchLocalePathIntercepter: extendSwitchLocalePathIntercepter(differentDomains, normalizedLocales, nuxtContext),
    prefixable: extendPrefixable(differentDomains)
  });
  let initialLocale = detectLocale(
    route,
    nuxt.ssrContext,
    getLocaleFromRoute,
    nuxtI18nOptions,
    defaultLocale || vueI18nOptions.locale || "en-US",
    normalizedLocales,
    localeCodes
  );
  vueI18nOptions.messages = ([__temp, __restore] = executeAsync(() => loadInitialMessages(nuxtContext, vueI18nOptions.messages, {
    ...nuxtI18nOptions,
    initialLocale,
    fallbackLocale: vueI18nOptions.fallbackLocale,
    localeCodes
  })), __temp = await __temp, __restore(), __temp);
  initialLocale = initialLocale || vueI18nOptions.locale || "en-US";
  const i18n = createI18n({
    ...vueI18nOptions,
    locale: initialLocale
  });
  let notInitialSetup = true;
  function isInitialLocaleSetup(locale) {
    return initialLocale !== locale && notInitialSetup;
  }
  extendI18n(i18n, {
    locales: nuxtI18nOptions.locales,
    localeCodes,
    baseUrl: nuxtI18nOptions.baseUrl,
    context: nuxtContext,
    hooks: {
      onExtendComposer(composer) {
        composer.strategy = nuxtI18nOptions.strategy;
        composer.localeProperties = computed(() => {
          return normalizedLocales.find((l2) => l2.code === composer.locale.value) || {
            code: composer.locale.value
          };
        });
        composer.setLocale = async (locale) => {
          const localeSetup = isInitialLocaleSetup(locale);
          const [modified] = await loadAndSetLocale(locale, nuxtContext, i18n, {
            useCookie: useCookie2,
            differentDomains,
            initial: localeSetup,
            skipSettingLocaleOnNavigate,
            lazy,
            langDir
          });
          if (modified && localeSetup) {
            notInitialSetup = false;
          }
          const redirectPath = detectRedirect(route, nuxtContext, locale, getLocaleFromRoute, nuxtI18nOptions);
          navigate(i18n, redirectPath, locale, route, {
            differentDomains,
            skipSettingLocaleOnNavigate,
            rootRedirect
          });
        };
        composer.differentDomains = differentDomains;
        composer.getBrowserLocale = () => getBrowserLocale(nuxtI18nInternalOptions, nuxt.ssrContext);
        composer.getLocaleCookie = () => getLocaleCookie(nuxt.ssrContext, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes });
        composer.setLocaleCookie = (locale) => setLocaleCookie(locale, nuxt.ssrContext, nuxtI18nOptions.detectBrowserLanguage || void 0);
        composer.onBeforeLanguageSwitch = nuxtI18nOptions.onBeforeLanguageSwitch;
        composer.onLanguageSwitched = nuxtI18nOptions.onLanguageSwitched;
        composer.finalizePendingLocaleChange = async () => {
          if (!i18n.__pendingLocale) {
            return;
          }
          setLocale(i18n, i18n.__pendingLocale);
          if (i18n.__resolvePendingLocalePromise) {
            await i18n.__resolvePendingLocalePromise();
          }
          i18n.__pendingLocale = void 0;
        };
        composer.waitForPendingLocaleChange = async () => {
          if (i18n.__pendingLocale && i18n.__pendingLocalePromise) {
            await i18n.__pendingLocalePromise;
          }
        };
      },
      onExtendExportedGlobal(g2) {
        return {
          strategy: {
            get() {
              return g2.strategy;
            }
          },
          localeProperties: {
            get() {
              return g2.localeProperties.value;
            }
          },
          setLocale: {
            get() {
              return async (locale) => Reflect.apply(g2.setLocale, g2, [locale]);
            }
          },
          differentDomains: {
            get() {
              return g2.differentDomains;
            }
          },
          getBrowserLocale: {
            get() {
              return () => Reflect.apply(g2.getBrowserLocale, g2, []);
            }
          },
          getLocaleCookie: {
            get() {
              return () => Reflect.apply(g2.getLocaleCookie, g2, []);
            }
          },
          setLocaleCookie: {
            get() {
              return (locale) => Reflect.apply(g2.setLocaleCookie, g2, [locale]);
            }
          },
          onBeforeLanguageSwitch: {
            get() {
              return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(g2.onBeforeLanguageSwitch, g2, [oldLocale, newLocale, initialSetup, context]);
            }
          },
          onLanguageSwitched: {
            get() {
              return (oldLocale, newLocale) => Reflect.apply(g2.onLanguageSwitched, g2, [oldLocale, newLocale]);
            }
          },
          finalizePendingLocaleChange: {
            get() {
              return () => Reflect.apply(g2.finalizePendingLocaleChange, g2, []);
            }
          },
          waitForPendingLocaleChange: {
            get() {
              return () => Reflect.apply(g2.waitForPendingLocaleChange, g2, []);
            }
          }
        };
      },
      onExtendVueI18n(composer) {
        return {
          strategy: {
            get() {
              return composer.strategy;
            }
          },
          localeProperties: {
            get() {
              return composer.localeProperties.value;
            }
          },
          setLocale: {
            get() {
              return async (locale) => Reflect.apply(composer.setLocale, composer, [locale]);
            }
          },
          differentDomains: {
            get() {
              return composer.differentDomains;
            }
          },
          getBrowserLocale: {
            get() {
              return () => Reflect.apply(composer.getBrowserLocale, composer, []);
            }
          },
          getLocaleCookie: {
            get() {
              return () => Reflect.apply(composer.getLocaleCookie, composer, []);
            }
          },
          setLocaleCookie: {
            get() {
              return (locale) => Reflect.apply(composer.setLocaleCookie, composer, [locale]);
            }
          },
          onBeforeLanguageSwitch: {
            get() {
              return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(composer.onBeforeLanguageSwitch, composer, [oldLocale, newLocale, initialSetup, context]);
            }
          },
          onLanguageSwitched: {
            get() {
              return (oldLocale, newLocale) => Reflect.apply(composer.onLanguageSwitched, composer, [oldLocale, newLocale]);
            }
          },
          finalizePendingLocaleChange: {
            get() {
              return () => Reflect.apply(composer.finalizePendingLocaleChange, composer, []);
            }
          },
          waitForPendingLocaleChange: {
            get() {
              return () => Reflect.apply(composer.waitForPendingLocaleChange, composer, []);
            }
          }
        };
      }
    }
  });
  app2.use(i18n);
  inejctNuxtHelpers(nuxtContext, i18n);
  [__temp, __restore] = executeAsync(() => mergeAdditionalMessages(nuxtContext, i18n, initialLocale)), await __temp, __restore();
  addRouteMiddleware(
    "locale-changing",
    defineNuxtRouteMiddleware(async (to, from) => {
      let __temp2, __restore2;
      const locale = detectLocale(
        to,
        nuxt.ssrContext,
        getLocaleFromRoute,
        nuxtI18nOptions,
        () => {
          return getLocale(i18n) || defaultLocale || vueI18nOptions.locale || "en-US";
        },
        normalizedLocales,
        localeCodes
      );
      const localeSetup = isInitialLocaleSetup(locale);
      const [modified] = ([__temp2, __restore2] = executeAsync(() => loadAndSetLocale(locale, nuxtContext, i18n, {
        useCookie: useCookie2,
        differentDomains,
        initial: localeSetup,
        skipSettingLocaleOnNavigate,
        lazy,
        langDir
      })), __temp2 = await __temp2, __restore2(), __temp2);
      if (modified && localeSetup) {
        notInitialSetup = false;
      }
      const redirectPath = detectRedirect(to, nuxtContext, locale, getLocaleFromRoute, nuxtI18nOptions);
      navigate(i18n, redirectPath, locale, to, {
        differentDomains,
        skipSettingLocaleOnNavigate,
        rootRedirect
      });
    }),
    { global: true }
  );
});
const _nuxt_unocss_mjs_MzCDxu9LMj = defineNuxtPlugin(() => {
});
/*!
  * pinia v2.0.23
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol();
function isPlainObject(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p2 = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app2) {
      setActivePinia(pinia);
      {
        pinia._a = app2;
        app2.provide(piniaSymbol, pinia);
        app2.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p2.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p2.push(plugin2);
      }
      return this;
    },
    _p: _p2,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentInstance()) {
    onUnmounted(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol();
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o2) {
  return !!(isRef(o2) && o2.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store2;
  function setup2() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store3 = pinia._s.get(id);
        return getters[name].call(store3, store3);
      }));
      return computedGetters;
    }, {}));
  }
  store2 = createSetupStore(id, setup2, options, pinia, hot, true);
  store2.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  };
  return store2;
}
function createSetupStore($id, setup2, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
  };
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = noop;
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store: store2,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store2, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store2 = reactive(partialStore);
  pinia._s.set($id, store2);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup2());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store2, setupStore);
    assign(toRaw(store2), setupStore);
  }
  Object.defineProperty(store2, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store2, scope.run(() => extender({
        store: store2,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store2.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store2;
}
function defineStore(idOrOptions, setup2, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup2 === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup2;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance();
    pinia = (pinia) || currentInstance && inject(piniaSymbol);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup2, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store2 = pinia._s.get(id);
    return store2;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store2) {
  {
    store2 = toRaw(store2);
    const refs = {};
    for (const key in store2) {
      const value = store2[key];
      if (isRef(value) || isReactive(value)) {
        refs[key] = toRef(store2, key);
      }
    }
    return refs;
  }
}
const node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq = defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64huntersofbook_naive_ui_nuxt_dist_runtime_config_mjs_hyx03WSFRE,
  node_modules__64huntersofbook_naive_ui_nuxt_dist_runtime_plugin_mjs_dUrdF0P1fL,
  node_modules__64nuxtjs_color_mode_dist_runtime_plugin_server_mjs_XNCxeHyTuP,
  node_modules__64nuxtjs_i18n_dist_runtime_plugin_mjs_vyNBGOI7EC,
  _nuxt_unocss_mjs_MzCDxu9LMj,
  node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq
];
const _sfc_main$9 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.4be8bd35.mjs').then((r2) => r2.default || r2));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = resolveComponent("App");
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a2, _b2;
    return renderChild ? (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    fetchpriority: String,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a2;
    const script = { ...props };
    const textContent = (((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      script.children = textContent;
    }
    return {
      script: [script]
    };
  })
});
defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a2;
    const noscript = { ...props };
    const textContent = (((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a2, _b2, _c2;
    const title = ((_c2 = (_b2 = (_a2 = slots.default) == null ? void 0 : _a2.call(slots)) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.children) || null;
    return {
      title
    };
  })
});
defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props) => {
    const meta = { ...props };
    if (meta.httpEquiv) {
      meta["http-equiv"] = meta.httpEquiv;
      delete meta.httpEquiv;
    }
    return {
      meta: [meta]
    };
  })
});
defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    },
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a2, _b2, _c2;
    const style = { ...props };
    const textContent = (_c2 = (_b2 = (_a2 = slots.default) == null ? void 0 : _a2.call(slots)) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a2, _b2;
    return (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2);
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: {
    ...globalProps,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Anchor",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      default: ""
    },
    to: {
      type: [String, Object],
      default: void 0
    },
    href: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (__props.to) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          tag: "a",
          to: __props.to,
          class: "transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                _push2(`${ssrInterpolate(__props.text)}`);
              }, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(__props.text), 1)
                ])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<a${ssrRenderAttrs(mergeProps({
          class: "transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline",
          href: __props.href
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(__props.text)}`);
        }, _push, _parent);
        _push(`</a>`);
      }
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Anchor.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "md"
    },
    to: {
      type: [String, Object],
      default: void 0
    },
    href: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const defaultStyle = `
  cursor-pointer
  border transition-color duration-300
  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:dark:ring-offset-gray-50 focus:dark:ring-gray-400 focus:ring-gray-600/[0.6] focus:ring-offset-gray-800/[0.6]
  flex items-center justify-center
`;
    const styles = reactive({
      primary: "text-white bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-900 dark:text-gray-800 dark:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:border-white",
      secondary: "text-gray-800 bg-white hover:border-gray-900  dark:border-gray-900 dark:text-white dark:bg-gray-800 dark:hover:border-white"
    });
    const sizes = reactive({
      lg: "h-12 px-8 text-lg rounded-lg",
      md: "h-10 px-6 text-base rounded",
      sm: "h-8 px-4 text-sm rounded",
      xs: "h-6 px-3 text-xs rounded"
    });
    const selectedStyle = computed(() => styles[props.type] || styles.primary);
    const selectedSize = computed(() => sizes[props.size] || sizes.lg);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (__props.to) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          tag: "a",
          to: __props.to,
          class: `${defaultStyle} ${unref(selectedStyle)} ${unref(selectedSize)}`
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                _push2(`${ssrInterpolate(__props.text)}`);
              }, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(__props.text), 1)
                ])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<a${ssrRenderAttrs(mergeProps({
          class: `${defaultStyle} ${unref(selectedStyle)} ${unref(selectedSize)}`,
          href: __props.href
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(__props.text)}`);
        }, _push, _parent);
        _push(`</a>`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Button.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@unocss/nuxt/runtime/UnoIcon.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]);
function u(r2, n2, ...a2) {
  if (r2 in n2) {
    let e2 = n2[r2];
    return typeof e2 == "function" ? e2(...a2) : e2;
  }
  let t2 = new Error(`Tried to handle "${r2}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t2, u), t2;
}
var R = ((o2) => (o2[o2.None = 0] = "None", o2[o2.RenderStrategy = 1] = "RenderStrategy", o2[o2.Static = 2] = "Static", o2))(R || {}), O$1 = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(O$1 || {});
function P({ visible: r2 = true, features: t2 = 0, ourProps: e2, theirProps: o2, ...i }) {
  var a2;
  let n2 = k(o2, e2), s2 = Object.assign(i, { props: n2 });
  if (r2 || t2 & 2 && n2.static)
    return p$1(s2);
  if (t2 & 1) {
    let l2 = (a2 = n2.unmount) == null || a2 ? 0 : 1;
    return u(l2, { [0]() {
      return null;
    }, [1]() {
      return p$1({ ...i, props: { ...n2, hidden: true, style: { display: "none" } } });
    } });
  }
  return p$1(s2);
}
function p$1({ props: r2, attrs: t2, slots: e2, slot: o2, name: i }) {
  var y2;
  let { as: n2, ...s2 } = w(r2, ["unmount", "static"]), a2 = (y2 = e2.default) == null ? void 0 : y2.call(e2, o2), l2 = {};
  if (o2) {
    let d2 = false, u2 = [];
    for (let [f2, c2] of Object.entries(o2))
      typeof c2 == "boolean" && (d2 = true), c2 === true && u2.push(f2);
    d2 && (l2["data-headlessui-state"] = u2.join(" "));
  }
  if (n2 === "template") {
    if (a2 = g(a2 != null ? a2 : []), Object.keys(s2).length > 0 || Object.keys(t2).length > 0) {
      let [d2, ...u2] = a2 != null ? a2 : [];
      if (!x$1(d2) || u2.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${i} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(s2).concat(Object.keys(t2)).sort((f2, c2) => f2.localeCompare(c2)).map((f2) => `  - ${f2}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((f2) => `  - ${f2}`).join(`
`)].join(`
`));
      return cloneVNode(d2, Object.assign({}, s2, l2));
    }
    return Array.isArray(a2) && a2.length === 1 ? a2[0] : a2;
  }
  return h$1(n2, Object.assign({}, s2, l2), { default: () => a2 });
}
function g(r2) {
  return r2.flatMap((t2) => t2.type === Fragment$1 ? g(t2.children) : [t2]);
}
function k(...r2) {
  if (r2.length === 0)
    return {};
  if (r2.length === 1)
    return r2[0];
  let t2 = {}, e2 = {};
  for (let i of r2)
    for (let n2 in i)
      n2.startsWith("on") && typeof i[n2] == "function" ? (e2[n2] != null || (e2[n2] = []), e2[n2].push(i[n2])) : t2[n2] = i[n2];
  if (t2.disabled || t2["aria-disabled"])
    return Object.assign(t2, Object.fromEntries(Object.keys(e2).map((i) => [i, void 0])));
  for (let i in e2)
    Object.assign(t2, { [i](n2, ...s2) {
      let a2 = e2[i];
      for (let l2 of a2) {
        if (n2 instanceof Event && n2.defaultPrevented)
          return;
        l2(n2, ...s2);
      }
    } });
  return t2;
}
function V$1(r2) {
  let t2 = Object.assign({}, r2);
  for (let e2 in t2)
    t2[e2] === void 0 && delete t2[e2];
  return t2;
}
function w(r2, t2 = []) {
  let e2 = Object.assign({}, r2);
  for (let o2 of t2)
    o2 in e2 && delete e2[o2];
  return e2;
}
function x$1(r2) {
  return r2 == null ? false : typeof r2.type == "string" || typeof r2.type == "object" || typeof r2.type == "function";
}
let e$2 = 0;
function n$1() {
  return ++e$2;
}
function t() {
  return n$1();
}
var o$1 = ((r2) => (r2.Space = " ", r2.Enter = "Enter", r2.Escape = "Escape", r2.Backspace = "Backspace", r2.Delete = "Delete", r2.ArrowLeft = "ArrowLeft", r2.ArrowUp = "ArrowUp", r2.ArrowRight = "ArrowRight", r2.ArrowDown = "ArrowDown", r2.Home = "Home", r2.End = "End", r2.PageUp = "PageUp", r2.PageDown = "PageDown", r2.Tab = "Tab", r2))(o$1 || {});
function f$3(r2) {
  throw new Error("Unexpected object: " + r2);
}
var a$1 = ((e2) => (e2[e2.First = 0] = "First", e2[e2.Previous = 1] = "Previous", e2[e2.Next = 2] = "Next", e2[e2.Last = 3] = "Last", e2[e2.Specific = 4] = "Specific", e2[e2.Nothing = 5] = "Nothing", e2))(a$1 || {});
function x(r2, n2) {
  let t2 = n2.resolveItems();
  if (t2.length <= 0)
    return null;
  let l2 = n2.resolveActiveIndex(), s2 = l2 != null ? l2 : -1, d2 = (() => {
    switch (r2.focus) {
      case 0:
        return t2.findIndex((e2) => !n2.resolveDisabled(e2));
      case 1: {
        let e2 = t2.slice().reverse().findIndex((i, c2, u2) => s2 !== -1 && u2.length - c2 - 1 >= s2 ? false : !n2.resolveDisabled(i));
        return e2 === -1 ? e2 : t2.length - 1 - e2;
      }
      case 2:
        return t2.findIndex((e2, i) => i <= s2 ? false : !n2.resolveDisabled(e2));
      case 3: {
        let e2 = t2.slice().reverse().findIndex((i) => !n2.resolveDisabled(i));
        return e2 === -1 ? e2 : t2.length - 1 - e2;
      }
      case 4:
        return t2.findIndex((e2) => n2.resolveId(e2) === r2.id);
      case 5:
        return null;
      default:
        f$3(r2);
    }
  })();
  return d2 === -1 ? l2 : d2;
}
function o(n2) {
  var l2;
  return n2 == null || n2.value == null ? null : (l2 = n2.value.$el) != null ? l2 : n2.value;
}
let n = Symbol("Context");
var l = ((e2) => (e2[e2.Open = 0] = "Open", e2[e2.Closed = 1] = "Closed", e2))(l || {});
function f$2() {
  return p() !== null;
}
function p() {
  return inject(n, null);
}
function c(o2) {
  provide(n, o2);
}
function r(t2, e2) {
  if (t2)
    return t2;
  let n2 = e2 != null ? e2 : "button";
  if (typeof n2 == "string" && n2.toLowerCase() === "button")
    return "button";
}
function b$1(t2, e2) {
  let n2 = ref(r(t2.value.type, t2.value.as));
  return onMounted(() => {
    n2.value = r(t2.value.type, t2.value.as);
  }), watchEffect(() => {
    var o$12;
    n2.value || !o(e2) || o(e2) instanceof HTMLButtonElement && !((o$12 = o(e2)) != null && o$12.hasAttribute("type")) && (n2.value = "button");
  }), n2;
}
function m$1(r2) {
  return null;
}
let m = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var M = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(M || {}), N = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(N || {}), b = ((r2) => (r2[r2.Previous = -1] = "Previous", r2[r2.Next = 1] = "Next", r2))(b || {});
var F = ((r2) => (r2[r2.Strict = 0] = "Strict", r2[r2.Loose = 1] = "Loose", r2))(F || {});
function h(e2, t2 = 0) {
  var r2;
  return e2 === ((r2 = m$1()) == null ? void 0 : r2.body) ? false : u(t2, { [0]() {
    return e2.matches(m);
  }, [1]() {
    let l2 = e2;
    for (; l2 !== null; ) {
      if (l2.matches(m))
        return true;
      l2 = l2.parentElement;
    }
    return false;
  } });
}
function O(e2, t2 = (r2) => r2) {
  return e2.slice().sort((r2, l2) => {
    let o2 = t2(r2), s2 = t2(l2);
    if (o2 === null || s2 === null)
      return 0;
    let n2 = o2.compareDocumentPosition(s2);
    return n2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function y(f2, m2, i = computed(() => true)) {
  ref(null);
}
var a = ((e2) => (e2[e2.None = 1] = "None", e2[e2.Focusable = 2] = "Focusable", e2[e2.Hidden = 4] = "Hidden", e2))(a || {});
let f$1 = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(r2, { slots: t2, attrs: d2 }) {
  return () => {
    let { features: e2, ...o2 } = r2, n2 = { "aria-hidden": (e2 & 2) === 2 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(e2 & 4) === 4 && (e2 & 2) !== 2 && { display: "none" } } };
    return P({ ourProps: n2, theirProps: o2, slot: {}, attrs: d2, slots: t2, name: "Hidden" });
  };
} });
function e(n2 = {}, r2 = null, t2 = []) {
  for (let [i, o2] of Object.entries(n2))
    f(t2, s(r2, i), o2);
  return t2;
}
function s(n2, r2) {
  return n2 ? n2 + "[" + r2 + "]" : r2;
}
function f(n2, r2, t2) {
  if (Array.isArray(t2))
    for (let [i, o2] of t2.entries())
      f(n2, s(r2, i.toString()), o2);
  else
    t2 instanceof Date ? n2.push([r2, t2.toISOString()]) : typeof t2 == "boolean" ? n2.push([r2, t2 ? "1" : "0"]) : typeof t2 == "string" ? n2.push([r2, t2]) : typeof t2 == "number" ? n2.push([r2, `${t2}`]) : t2 == null ? n2.push([r2, ""]) : e(t2, r2, n2);
}
function d(u2, e2, r2) {
  let i = ref(r2 == null ? void 0 : r2.value), f2 = computed(() => u2.value !== void 0);
  return [computed(() => f2.value ? u2.value : i.value), function(t2) {
    return f2.value || (i.value = t2), e2 == null ? void 0 : e2(t2);
  }];
}
function ue(o2, m2) {
  return o2 === m2;
}
var re = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(re || {}), se = ((l2) => (l2[l2.Single = 0] = "Single", l2[l2.Multi = 1] = "Multi", l2))(se || {}), de = ((l2) => (l2[l2.Pointer = 0] = "Pointer", l2[l2.Other = 1] = "Other", l2))(de || {});
function fe(o2) {
  requestAnimationFrame(() => requestAnimationFrame(o2));
}
let H = Symbol("ListboxContext");
function V(o2) {
  let m2 = inject(H, null);
  if (m2 === null) {
    let l2 = new Error(`<${o2} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, V), l2;
  }
  return m2;
}
let Me = defineComponent({ name: "Listbox", emits: { "update:modelValue": (o2) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => ue }, horizontal: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, name: { type: String, optional: true }, multiple: { type: [Boolean], default: false } }, inheritAttrs: false, setup(o$12, { slots: m2, attrs: l$1, emit: L }) {
  let e$12 = ref(1), p2 = ref(null), s2 = ref(null), O$12 = ref(null), d$1 = ref([]), S = ref(""), t2 = ref(null), i = ref(1);
  function k2(a2 = (n2) => n2) {
    let n2 = t2.value !== null ? d$1.value[t2.value] : null, u2 = O(a2(d$1.value.slice()), (y2) => o(y2.dataRef.domRef)), c2 = n2 ? u2.indexOf(n2) : null;
    return c2 === -1 && (c2 = null), { options: u2, activeOptionIndex: c2 };
  }
  let h$2 = computed(() => o$12.multiple ? 1 : 0), [w$1, r2] = d(computed(() => o$12.modelValue), (a2) => L("update:modelValue", a2), computed(() => o$12.defaultValue)), f2 = { listboxState: e$12, value: w$1, mode: h$2, compare(a2, n2) {
    if (typeof o$12.by == "string") {
      let u2 = o$12.by;
      return (a2 == null ? void 0 : a2[u2]) === (n2 == null ? void 0 : n2[u2]);
    }
    return o$12.by(a2, n2);
  }, orientation: computed(() => o$12.horizontal ? "horizontal" : "vertical"), labelRef: p2, buttonRef: s2, optionsRef: O$12, disabled: computed(() => o$12.disabled), options: d$1, searchQuery: S, activeOptionIndex: t2, activationTrigger: i, closeListbox() {
    o$12.disabled || e$12.value !== 1 && (e$12.value = 1, t2.value = null);
  }, openListbox() {
    o$12.disabled || e$12.value !== 0 && (e$12.value = 0);
  }, goToOption(a2, n2, u2) {
    if (o$12.disabled || e$12.value === 1)
      return;
    let c2 = k2(), y2 = x(a2 === a$1.Specific ? { focus: a$1.Specific, id: n2 } : { focus: a2 }, { resolveItems: () => c2.options, resolveActiveIndex: () => c2.activeOptionIndex, resolveId: (T) => T.id, resolveDisabled: (T) => T.dataRef.disabled });
    S.value = "", t2.value = y2, i.value = u2 != null ? u2 : 1, d$1.value = c2.options;
  }, search(a2) {
    if (o$12.disabled || e$12.value === 1)
      return;
    let u2 = S.value !== "" ? 0 : 1;
    S.value += a2.toLowerCase();
    let y2 = (t2.value !== null ? d$1.value.slice(t2.value + u2).concat(d$1.value.slice(0, t2.value + u2)) : d$1.value).find((A) => A.dataRef.textValue.startsWith(S.value) && !A.dataRef.disabled), T = y2 ? d$1.value.indexOf(y2) : -1;
    T === -1 || T === t2.value || (t2.value = T, i.value = 1);
  }, clearSearch() {
    o$12.disabled || e$12.value !== 1 && S.value !== "" && (S.value = "");
  }, registerOption(a2, n2) {
    let u2 = k2((c2) => [...c2, { id: a2, dataRef: n2 }]);
    d$1.value = u2.options, t2.value = u2.activeOptionIndex;
  }, unregisterOption(a2) {
    let n2 = k2((u2) => {
      let c2 = u2.findIndex((y2) => y2.id === a2);
      return c2 !== -1 && u2.splice(c2, 1), u2;
    });
    d$1.value = n2.options, t2.value = n2.activeOptionIndex, i.value = 1;
  }, select(a2) {
    o$12.disabled || r2(u(h$2.value, { [0]: () => a2, [1]: () => {
      let n2 = toRaw(f2.value.value).slice(), u2 = toRaw(a2), c2 = n2.findIndex((y2) => f2.compare(u2, toRaw(y2)));
      return c2 === -1 ? n2.push(u2) : n2.splice(c2, 1), n2;
    } }));
  } };
  return y([s2, O$12], (a2, n2) => {
    var u2;
    f2.closeListbox(), h(n2, F.Loose) || (a2.preventDefault(), (u2 = o(s2)) == null || u2.focus());
  }, computed(() => e$12.value === 0)), provide(H, f2), c(computed(() => u(e$12.value, { [0]: l.Open, [1]: l.Closed }))), () => {
    let { name: a$12, modelValue: n2, disabled: u2, ...c2 } = o$12, y2 = { open: e$12.value === 0, disabled: u2, value: w$1.value };
    return h$1(Fragment$1, [...a$12 != null && w$1.value != null ? e({ [a$12]: w$1.value }).map(([T, A]) => h$1(f$1, V$1({ features: a.Hidden, key: T, as: "input", type: "hidden", hidden: true, readOnly: true, name: T, value: A }))) : [], P({ ourProps: {}, theirProps: { ...l$1, ...w(c2, ["defaultValue", "onUpdate:modelValue", "horizontal", "multiple", "by"]) }, slot: y2, slots: m2, attrs: l$1, name: "Listbox" })]);
  };
} }), Pe = defineComponent({ name: "ListboxLabel", props: { as: { type: [Object, String], default: "label" } }, setup(o$12, { attrs: m2, slots: l2 }) {
  let L = V("ListboxLabel"), e2 = `headlessui-listbox-label-${t()}`;
  function p2() {
    var s2;
    (s2 = o(L.buttonRef)) == null || s2.focus({ preventScroll: true });
  }
  return () => {
    let s2 = { open: L.listboxState.value === 0, disabled: L.disabled.value }, O2 = { id: e2, ref: L.labelRef, onClick: p2 };
    return P({ ourProps: O2, theirProps: o$12, slot: s2, attrs: m2, slots: l2, name: "ListboxLabel" });
  };
} }), Ie = defineComponent({ name: "ListboxButton", props: { as: { type: [Object, String], default: "button" } }, setup(o$2, { attrs: m2, slots: l2, expose: L }) {
  let e2 = V("ListboxButton"), p2 = `headlessui-listbox-button-${t()}`;
  L({ el: e2.buttonRef, $el: e2.buttonRef });
  function s2(t2) {
    switch (t2.key) {
      case o$1.Space:
      case o$1.Enter:
      case o$1.ArrowDown:
        t2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i;
          (i = o(e2.optionsRef)) == null || i.focus({ preventScroll: true }), e2.value.value || e2.goToOption(a$1.First);
        });
        break;
      case o$1.ArrowUp:
        t2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i;
          (i = o(e2.optionsRef)) == null || i.focus({ preventScroll: true }), e2.value.value || e2.goToOption(a$1.Last);
        });
        break;
    }
  }
  function O2(t2) {
    switch (t2.key) {
      case o$1.Space:
        t2.preventDefault();
        break;
    }
  }
  function d2(t2) {
    e2.disabled.value || (e2.listboxState.value === 0 ? (e2.closeListbox(), nextTick(() => {
      var i;
      return (i = o(e2.buttonRef)) == null ? void 0 : i.focus({ preventScroll: true });
    })) : (t2.preventDefault(), e2.openListbox(), fe(() => {
      var i;
      return (i = o(e2.optionsRef)) == null ? void 0 : i.focus({ preventScroll: true });
    })));
  }
  let S = b$1(computed(() => ({ as: o$2.as, type: m2.type })), e2.buttonRef);
  return () => {
    var k2, h2;
    let t2 = { open: e2.listboxState.value === 0, disabled: e2.disabled.value, value: e2.value.value }, i = { ref: e2.buttonRef, id: p2, type: S.value, "aria-haspopup": true, "aria-controls": (k2 = o(e2.optionsRef)) == null ? void 0 : k2.id, "aria-expanded": e2.disabled.value ? void 0 : e2.listboxState.value === 0, "aria-labelledby": e2.labelRef.value ? [(h2 = o(e2.labelRef)) == null ? void 0 : h2.id, p2].join(" ") : void 0, disabled: e2.disabled.value === true ? true : void 0, onKeydown: s2, onKeyup: O2, onClick: d2 };
    return P({ ourProps: i, theirProps: o$2, slot: t2, attrs: m2, slots: l2, name: "ListboxButton" });
  };
} }), Ve = defineComponent({ name: "ListboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(o$2, { attrs: m2, slots: l$1, expose: L }) {
  let e2 = V("ListboxOptions"), p$12 = `headlessui-listbox-options-${t()}`, s2 = ref(null);
  L({ el: e2.optionsRef, $el: e2.optionsRef });
  function O2(t2) {
    switch (s2.value && clearTimeout(s2.value), t2.key) {
      case o$1.Space:
        if (e2.searchQuery.value !== "")
          return t2.preventDefault(), t2.stopPropagation(), e2.search(t2.key);
      case o$1.Enter:
        if (t2.preventDefault(), t2.stopPropagation(), e2.activeOptionIndex.value !== null) {
          let i = e2.options.value[e2.activeOptionIndex.value];
          e2.select(i.dataRef.value);
        }
        e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
          var i;
          return (i = o(e2.buttonRef)) == null ? void 0 : i.focus({ preventScroll: true });
        }));
        break;
      case u(e2.orientation.value, { vertical: o$1.ArrowDown, horizontal: o$1.ArrowRight }):
        return t2.preventDefault(), t2.stopPropagation(), e2.goToOption(a$1.Next);
      case u(e2.orientation.value, { vertical: o$1.ArrowUp, horizontal: o$1.ArrowLeft }):
        return t2.preventDefault(), t2.stopPropagation(), e2.goToOption(a$1.Previous);
      case o$1.Home:
      case o$1.PageUp:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToOption(a$1.First);
      case o$1.End:
      case o$1.PageDown:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToOption(a$1.Last);
      case o$1.Escape:
        t2.preventDefault(), t2.stopPropagation(), e2.closeListbox(), nextTick(() => {
          var i;
          return (i = o(e2.buttonRef)) == null ? void 0 : i.focus({ preventScroll: true });
        });
        break;
      case o$1.Tab:
        t2.preventDefault(), t2.stopPropagation();
        break;
      default:
        t2.key.length === 1 && (e2.search(t2.key), s2.value = setTimeout(() => e2.clearSearch(), 350));
        break;
    }
  }
  let d2 = p(), S = computed(() => d2 !== null ? d2.value === l.Open : e2.listboxState.value === 0);
  return () => {
    var h2, w2, r2, f2;
    let t2 = { open: e2.listboxState.value === 0 }, i = { "aria-activedescendant": e2.activeOptionIndex.value === null || (h2 = e2.options.value[e2.activeOptionIndex.value]) == null ? void 0 : h2.id, "aria-multiselectable": e2.mode.value === 1 ? true : void 0, "aria-labelledby": (f2 = (w2 = o(e2.labelRef)) == null ? void 0 : w2.id) != null ? f2 : (r2 = o(e2.buttonRef)) == null ? void 0 : r2.id, "aria-orientation": e2.orientation.value, id: p$12, onKeydown: O2, role: "listbox", tabIndex: 0, ref: e2.optionsRef };
    return P({ ourProps: i, theirProps: o$2, slot: t2, attrs: m2, slots: l$1, features: R.RenderStrategy | R.Static, visible: S.value, name: "ListboxOptions" });
  };
} }), Ae = defineComponent({ name: "ListboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false } }, setup(o$12, { slots: m2, attrs: l2, expose: L }) {
  let e2 = V("ListboxOption"), p2 = `headlessui-listbox-option-${t()}`, s2 = ref(null);
  L({ el: s2, $el: s2 });
  let O2 = computed(() => e2.activeOptionIndex.value !== null ? e2.options.value[e2.activeOptionIndex.value].id === p2 : false), d2 = computed(() => u(e2.mode.value, { [0]: () => e2.compare(toRaw(e2.value.value), toRaw(o$12.value)), [1]: () => toRaw(e2.value.value).some((r2) => e2.compare(toRaw(r2), toRaw(o$12.value))) })), S = computed(() => u(e2.mode.value, { [1]: () => {
    var f2;
    let r2 = toRaw(e2.value.value);
    return ((f2 = e2.options.value.find((a2) => r2.some((n2) => e2.compare(toRaw(n2), toRaw(a2.dataRef.value))))) == null ? void 0 : f2.id) === p2;
  }, [0]: () => d2.value })), t$1 = computed(() => ({ disabled: o$12.disabled, value: o$12.value, textValue: "", domRef: s2 }));
  onMounted(() => {
    var f2, a2;
    let r2 = (a2 = (f2 = o(s2)) == null ? void 0 : f2.textContent) == null ? void 0 : a2.toLowerCase().trim();
    r2 !== void 0 && (t$1.value.textValue = r2);
  }), onMounted(() => e2.registerOption(p2, t$1)), onUnmounted(() => e2.unregisterOption(p2)), onMounted(() => {
    watch([e2.listboxState, d2], () => {
      e2.listboxState.value === 0 && (!d2.value || u(e2.mode.value, { [1]: () => {
        S.value && e2.goToOption(a$1.Specific, p2);
      }, [0]: () => {
        e2.goToOption(a$1.Specific, p2);
      } }));
    }, { immediate: true });
  }), watchEffect(() => {
    e2.listboxState.value === 0 && (!O2.value || e2.activationTrigger.value !== 0 && nextTick(() => {
      var r2, f2;
      return (f2 = (r2 = o(s2)) == null ? void 0 : r2.scrollIntoView) == null ? void 0 : f2.call(r2, { block: "nearest" });
    }));
  });
  function i(r2) {
    if (o$12.disabled)
      return r2.preventDefault();
    e2.select(o$12.value), e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
      var f2;
      return (f2 = o(e2.buttonRef)) == null ? void 0 : f2.focus({ preventScroll: true });
    }));
  }
  function k2() {
    if (o$12.disabled)
      return e2.goToOption(a$1.Nothing);
    e2.goToOption(a$1.Specific, p2);
  }
  function h2() {
    o$12.disabled || O2.value || e2.goToOption(a$1.Specific, p2, 0);
  }
  function w$1() {
    o$12.disabled || !O2.value || e2.goToOption(a$1.Nothing);
  }
  return () => {
    let { disabled: r2 } = o$12, f2 = { active: O2.value, selected: d2.value, disabled: r2 }, a2 = { id: p2, ref: s2, role: "option", tabIndex: r2 === true ? void 0 : -1, "aria-disabled": r2 === true ? true : void 0, "aria-selected": d2.value, disabled: void 0, onClick: i, onFocus: k2, onPointermove: h2, onMousemove: h2, onPointerleave: w$1, onMouseleave: w$1 };
    return P({ ourProps: a2, theirProps: w(o$12, ["value", "disabled"]), slot: f2, attrs: l2, slots: m2, name: "ListboxOption" });
  };
} });
const availableSizes = {
  sm: {
    name: "\u5C0F",
    iso: "14px"
  },
  md: {
    name: "\u4E2D",
    iso: "16px"
  },
  lg: {
    name: "\u5927",
    iso: "18px"
  },
  xl: {
    name: "\u8D85\u5927",
    iso: "20px"
  }
};
function sizeController() {
  const sizeUserSetting = useCookie("size");
  if (!sizeUserSetting.value)
    sizeUserSetting.value = "16px";
  const getUserSize = () => sizeUserSetting.value;
  const sizeSetting = useState("size.setting", () => getUserSize());
  watch(sizeSetting, (val) => {
    sizeUserSetting.value = val;
    document.documentElement.style.fontSize = sizeSetting.value;
  });
  const init = () => {
    sizeSetting.value = getUserSize();
    if (sizeSetting.value)
      document.documentElement.style.fontSize = sizeSetting.value;
  };
  return {
    sizeSetting,
    init
  };
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SizeChange",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "dropdown-right-top"
    }
  },
  setup(__props) {
    const props = __props;
    const currentStyle = toRef(props, "type");
    const sizeSetting = useState("size.setting");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center" }, _attrs))}>`);
      if (unref(currentStyle) === "dropdown-right-top") {
        _push(ssrRenderComponent(unref(Me), {
          modelValue: unref(sizeSetting),
          "onUpdate:modelValue": ($event) => isRef(sizeSetting) ? sizeSetting.value = $event : null,
          as: "div",
          class: "relative flex items-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Pe), { class: "sr-only" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Theme `);
                  } else {
                    return [
                      createTextVNode(" Theme ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Ie), {
                type: "button",
                class: "flex w-7 h-7 items-center justify-center",
                title: "\u66F4\u6539\u6587\u5B57\u5927\u5C0F"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="flex items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-octicon-text-size" }, null, _parent3, _scopeId2));
                    _push3(`</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "flex items-center justify-center" }, [
                        createVNode(_component_UnoIcon, { class: "i-octicon-text-size" })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Ve), { class: "absolute mt-3 ring-1 ring-black ring-opacity-5 top-full right-0 z-20 mt-2 w-40 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(availableSizes), (size) => {
                      _push3(ssrRenderComponent(unref(Ae), {
                        key: size.iso,
                        value: size.iso,
                        class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                          "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(sizeSetting) === size.iso,
                          "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(sizeSetting) !== size.iso
                        }]
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="flex-1 truncate flex w-full items-center justify-between"${_scopeId3}><p${_scopeId3}>${ssrInterpolate(size.name)}</p><span class="text-xs"${_scopeId3}>(${ssrInterpolate(size.iso)})</span></span>`);
                          } else {
                            return [
                              createVNode("span", { class: "flex-1 truncate flex w-full items-center justify-between" }, [
                                createVNode("p", null, toDisplayString(size.name), 1),
                                createVNode("span", { class: "text-xs" }, "(" + toDisplayString(size.iso) + ")", 1)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment$1, null, renderList(unref(availableSizes), (size) => {
                        return openBlock(), createBlock(unref(Ae), {
                          key: size.iso,
                          value: size.iso,
                          class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                            "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(sizeSetting) === size.iso,
                            "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(sizeSetting) !== size.iso
                          }]
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "flex-1 truncate flex w-full items-center justify-between" }, [
                              createVNode("p", null, toDisplayString(size.name), 1),
                              createVNode("span", { class: "text-xs" }, "(" + toDisplayString(size.iso) + ")", 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["value", "class"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Pe), { class: "sr-only" }, {
                  default: withCtx(() => [
                    createTextVNode(" Theme ")
                  ]),
                  _: 1
                }),
                createVNode(unref(Ie), {
                  type: "button",
                  class: "flex w-7 h-7 items-center justify-center",
                  title: "\u66F4\u6539\u6587\u5B57\u5927\u5C0F"
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "flex items-center justify-center" }, [
                      createVNode(_component_UnoIcon, { class: "i-octicon-text-size" })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(unref(Ve), { class: "absolute mt-3 ring-1 ring-black ring-opacity-5 top-full right-0 z-20 mt-2 w-40 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment$1, null, renderList(unref(availableSizes), (size) => {
                      return openBlock(), createBlock(unref(Ae), {
                        key: size.iso,
                        value: size.iso,
                        class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                          "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(sizeSetting) === size.iso,
                          "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(sizeSetting) !== size.iso
                        }]
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "flex-1 truncate flex w-full items-center justify-between" }, [
                            createVNode("p", null, toDisplayString(size.name), 1),
                            createVNode("span", { class: "text-xs" }, "(" + toDisplayString(size.iso) + ")", 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["value", "class"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(currentStyle) === "select-box") {
        _push(`<select class="w-full px-2 pr-3 py-1 outline-none rounded border bg-transparent text-gray-700 dark:text-gray-300 border-gray-900/10 dark:border-gray-50/[0.2]"><!--[-->`);
        ssrRenderList(unref(availableSizes), (size) => {
          _push(`<option${ssrRenderAttr("value", size.iso)} class="flex items-center space-x-2">${ssrInterpolate(size.name)} (${ssrInterpolate(size.iso)}) </option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tem/SizeChange.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ThemeChange",
  __ssrInlineRender: true,
  setup(__props) {
    useColorMode();
    const availableColor = ref([
      {
        id: 1,
        name: "dark",
        text: "\u6DF1\u8272\u6A21\u5F0F",
        icon: "i-ph-moon-stars-duotone"
      },
      {
        id: 2,
        name: "light",
        text: "\u6DFA\u8272\u6A21\u5F0F",
        icon: "i-ph-sun-dim-duotone"
      },
      {
        id: 4,
        name: "system",
        text: "\u6839\u64DA\u7CFB\u7D71\u8A2D\u5B9A",
        icon: "i-ph-laptop-duotone"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Me), {
        modelValue: _ctx.$colorMode.preference,
        "onUpdate:modelValue": ($event) => _ctx.$colorMode.preference = $event,
        as: "div",
        class: "relative flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Pe), { class: "sr-only" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Theme `);
                } else {
                  return [
                    createTextVNode(" Theme ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Ie), {
              type: "button",
              title: "Change Color"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex w-7 h-7 items-center justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ph-palette-duotone text-lg dark:text-white" }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex w-7 h-7 items-center justify-center" }, [
                      createVNode(_component_UnoIcon, { class: "i-ph-palette-duotone text-lg dark:text-white" })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Ve), { class: "absolute mt-3 ring-1 ring-black ring-opacity-5 top-full right-0 z-20 mt-2 w-40 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(availableColor.value, (color) => {
                    _push3(ssrRenderComponent(unref(Ae), {
                      key: color.id,
                      value: color.name,
                      class: "flex w-full cursor-pointer items-center justify-between py-2 px-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(color.text)}</span><span class="flex items-center justify-center text-sm"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UnoIcon, {
                            class: [color.icon, "text-base"]
                          }, null, _parent4, _scopeId3));
                          _push4(`</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "truncate" }, toDisplayString(color.text), 1),
                            createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                              createVNode(_component_UnoIcon, {
                                class: [color.icon, "text-base"]
                              }, null, 8, ["class"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment$1, null, renderList(availableColor.value, (color) => {
                      return openBlock(), createBlock(unref(Ae), {
                        key: color.id,
                        value: color.name,
                        class: "flex w-full cursor-pointer items-center justify-between py-2 px-3"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "truncate" }, toDisplayString(color.text), 1),
                          createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                            createVNode(_component_UnoIcon, {
                              class: [color.icon, "text-base"]
                            }, null, 8, ["class"])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Pe), { class: "sr-only" }, {
                default: withCtx(() => [
                  createTextVNode(" Theme ")
                ]),
                _: 1
              }),
              createVNode(unref(Ie), {
                type: "button",
                title: "Change Color"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex w-7 h-7 items-center justify-center" }, [
                    createVNode(_component_UnoIcon, { class: "i-ph-palette-duotone text-lg dark:text-white" })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Ve), { class: "absolute mt-3 ring-1 ring-black ring-opacity-5 top-full right-0 z-20 mt-2 w-40 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment$1, null, renderList(availableColor.value, (color) => {
                    return openBlock(), createBlock(unref(Ae), {
                      key: color.id,
                      value: color.name,
                      class: "flex w-full cursor-pointer items-center justify-between py-2 px-3"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "truncate" }, toDisplayString(color.text), 1),
                        createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                          createVNode(_component_UnoIcon, {
                            class: [color.icon, "text-base"]
                          }, null, 8, ["class"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tem/ThemeChange.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _imports_0$1 = "" + globalThis.__publicAssetsURL("user.png");
const phoneRegex = /^09\d{8}$/;
const emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const idCardRegex = /^[A-Z]+[0-9]{9}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const storage = {
  suffix: "_deadtime",
  get(key) {
    return store.get(key);
  },
  info() {
    const d2 = {};
    store.each((value, key) => {
      d2[key] = value;
    });
    return d2;
  },
  set(key, value, expires) {
    store.set(key, value);
    if (expires) {
      store.set(
        `${key}${this.suffix}`,
        Date.parse(String(new Date())) + expires * 1e3
      );
    }
  },
  isExpired(key) {
    return (this.getExpiration(key) || 0) - Date.parse(String(new Date())) <= 2e3;
  },
  getExpiration(key) {
    return this.get(key + this.suffix);
  },
  remove(key) {
    store.remove(key);
    this.removeExpiration(key);
  },
  removeExpiration(key) {
    store.remove(key + this.suffix);
  },
  clearAll() {
    store.clearAll();
  }
};
const fetchConfig = {
  baseURL: "/api"
};
function useGetFetchOptions(options = {}) {
  var _a2, _b2, _c2, _d2, _e2;
  options.baseURL = (_a2 = options.baseURL) != null ? _a2 : fetchConfig.baseURL;
  options.headers = (_b2 = options.headers) != null ? _b2 : {};
  options.initialCache = (_c2 = options.initialCache) != null ? _c2 : false;
  options.lazy = (_d2 = options.lazy) != null ? _d2 : false;
  options.async = (_e2 = options.async) != null ? _e2 : false;
  options.body = { ...options.body, server: true };
  if (options.multipart) {
    options.headers = {
      ...options.headers,
      "Accept": "*/*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "origin,X-Requested-With,content-type,accept",
      "Access-Control-Allow-Credentials": "true"
    };
    delete options.headers["Content-Type"];
  }
  const { user } = useBaseStore();
  const { token: tokenStore } = storeToRefs(user);
  const token = tokenStore.value || storage.get("token");
  if (token)
    options.headers.Authorization = token;
  else
    delete options.headers.Authorization;
  return options;
}
async function useHttp(key, url, options = {}) {
  options = useGetFetchOptions(options);
  options.key = key;
  if (options.async) {
    const res2 = await useAsyncData(
      key,
      () => $fetch(fetchConfig.baseURL + url, { ...options }),
      "$8HXlY3lqR9"
    );
    return { ...res2 };
  }
  if (options.$) {
    const data = ref(null);
    const error = ref(null);
    return await $fetch(url, options).then((res2) => {
      data.value = res2.data;
      return {
        data,
        error
      };
    }).catch((err) => {
      var _a2;
      const msg = (_a2 = err == null ? void 0 : err.data) == null ? void 0 : _a2.data;
      error.value = msg;
      return {
        data,
        error
      };
    });
  }
  const res = await useFetch(url, {
    ...options,
    onRequest({ options: options2 }) {
      return useGetFetchOptions(options2);
    },
    transform: (res2) => {
      return res2.data;
    }
  }, "$Nbwy13v9tA");
  return res;
}
function useHttpPost(key, url, options = {}) {
  options.method = "POST";
  return useHttp(key, url, options);
}
async function useHttpFetch(url, options = {}) {
  options = useGetFetchOptions(options);
  const {
    error,
    code: code2,
    message = "",
    data = null
  } = await $fetch(fetchConfig.baseURL + url, { ...options });
  if (error && code2 === 1005) {
    const router = useRouter();
    router.push("/");
  }
  return {
    code: code2,
    error,
    message,
    data
  };
}
function useHttpFetchPost(url, options = {}) {
  options.method = "POST";
  return useHttpFetch(url, options);
}
const useUserStore = defineStore("user", () => {
  const token = ref("");
  function setToken(data) {
    token.value = data.token;
    storage.set("token", data.token, data.expire);
    storage.set("refreshToken", data.refreshToken, data.refreshExpire);
  }
  const isLogin = ref(false);
  async function refreshToken(token2) {
    try {
      const { data, error } = await useHttpFetchPost("/auth/refresh", {
        body: { refreshToken: token2 }
      });
      if (!error) {
        setToken(data);
        await get();
        set2(data);
      }
    } catch (e2) {
      logout();
    }
  }
  const info = ref(null);
  async function get() {
    const { code: code2, error, data } = await useHttpFetchPost("/user/person");
    if (error && code2 === 1005) {
      const storeRefreshToken = storage.get("refreshToken");
      await refreshToken(storeRefreshToken);
    } else if (!error) {
      set2(data);
    }
    return data;
  }
  function set2(value) {
    isLogin.value = true;
    info.value = value;
    storage.set("userInfo", value);
  }
  async function update(form) {
    const $alert = useState("alert");
    const updatePick = (({ firstName, lastName, birthday, gender, intro }) => ({
      firstName,
      lastName,
      birthday,
      gender,
      intro
    }))(info.value);
    console.log(updatePick);
    console.log(form);
    if (JSON.stringify(form) === JSON.stringify(updatePick)) {
      return $alert.value = {
        type: "info",
        text: "\u672A\u4FEE\u6539\u500B\u4EBA\u8CC7\u6599",
        center: true
      };
    }
    const $loading = useState("loading");
    $loading.value = true;
    const { error, message } = await useHttpFetchPost("/user/update", {
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        birthday: form.birthday,
        gender: form.gender,
        intro: form.intro
      }
    });
    $loading.value = false;
    if (error)
      return $alert.value = { type: "error", text: message, center: true };
    updateField({
      firstName: form.firstName,
      lastName: form.lastName,
      birthday: form.birthday,
      gender: form.gender,
      intro: form.intro
    });
    $alert.value = { type: "success", text: "\u500B\u4EBA\u8CC7\u6599\u5DF2\u66F4\u65B0", center: true };
  }
  function updateField(obj) {
    for (const key in obj)
      info.value[key] = obj[key];
    storage.set("userInfo", info.value);
  }
  async function login(loginForm) {
    const { data, error, message } = await useHttpFetchPost(
      "/auth/login",
      {
        body: {
          phone: loginForm.phone,
          password: loginForm.password
        }
      }
    );
    const $alert = useState("alert");
    const $auth = useState("showAuth", () => false);
    if (error && message) {
      $alert.value = { type: "error", text: message, center: true };
    } else {
      $auth.value = false;
      await setToken(data);
      await get();
      $alert.value = { type: "success", title: "\u767B\u5165\u6210\u529F" };
      if (loginForm.rememberMe)
        storage.set("loginData", loginForm);
      else
        storage.remove("loginData");
    }
  }
  async function register(registerForm) {
    const $alert = useState("alert");
    if (!passwordRegex.test(registerForm.password)) {
      return $alert.value = {
        type: "error",
        text: "\u5BC6\u78BC\u9808\u70BA\u82F1\u6578\u6DF7\u54088\u4F4D\u6578\u4EE5\u4E0A",
        center: true
      };
    }
    const { error, message, data } = await useHttpFetchPost("/auth/register", {
      body: {
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        birthday: registerForm.birthday,
        phone: registerForm.phone,
        password: registerForm.password,
        gender: registerForm.gender,
        passwordConfirm: registerForm.passwordConfirm,
        verifyCode: registerForm.verifyCode
      }
    });
    const $auth = useState("showAuth", () => false);
    if (error && message) {
      $alert.value = { type: "error", text: message, center: true };
    } else {
      $auth.value = false;
      await setToken(data);
      await get();
      $alert.value = { type: "success", title: "\u767B\u5165\u6210\u529F" };
      if (data.rememberMe)
        storage.set("loginData", data);
      else
        storage.remove("loginData");
    }
    if (error) {
      const $alert2 = useState("alert");
      $alert2.value = {
        type: "error",
        title: "\u9A57\u8B49\u932F\u8AA4",
        text: message,
        center: true
      };
    }
    return { error, message, data };
  }
  async function forgot(forgotForm) {
    const $alert = useState("alert");
    if (!passwordRegex.test(forgotForm.password)) {
      return $alert.value = {
        type: "error",
        text: "\u5BC6\u78BC\u9808\u70BA\u82F1\u6578\u6DF7\u54088\u4F4D\u6578\u4EE5\u4E0A",
        center: true
      };
    }
    const { error, message, data } = await useHttpFetchPost("/auth/forgot", {
      body: {
        phone: forgotForm.phone,
        password: forgotForm.password,
        passwordConfirm: forgotForm.passwordConfirm,
        verifyCode: forgotForm.verifyCode
      }
    });
    const $auth = useState("showAuth", () => false);
    if (error && message) {
      $alert.value = { type: "error", text: message, center: true };
    } else {
      $auth.value = false;
      await setToken(data);
      await get();
      $alert.value = { type: "success", title: "\u4FEE\u6539\u6210\u529F\uFF0C\u5DF2\u767B\u5165" };
      if (data.rememberMe)
        storage.set("loginData", forgotForm);
      else
        storage.remove("loginData");
    }
    if (error) {
      const $alert2 = useState("alert");
      $alert2.value = {
        type: "error",
        title: "\u9A57\u8B49\u932F\u8AA4",
        text: message,
        center: true
      };
    }
    return { error, message, data };
  }
  async function logout() {
    const $alert = useState("alert");
    await useHttpFetchPost("/user/logout");
    $alert.value = {
      type: "success",
      title: "\u767B\u51FA\u6210\u529F"
    };
    clear();
  }
  async function clear() {
    return await new Promise((resolve) => {
      var _a2;
      storage.remove("userInfo");
      storage.remove("token");
      const isLoginState = useState("isLogin");
      isLoginState.value = false;
      isLogin.value = false;
      info.value = null;
      token.value = "";
      const route = useRoute();
      const router = useRouter();
      const middleware = (_a2 = route.meta.middleware) != null ? _a2 : [];
      if (middleware && middleware.includes("auth"))
        router.push("/");
      resolve("");
    });
  }
  return {
    token,
    info,
    isLogin,
    get,
    set: set2,
    update,
    updateField,
    login,
    register,
    forgot,
    logout,
    clear,
    setToken,
    refreshToken
  };
});
function getTodayExpired() {
  const current = new Date();
  const full = 24 * 60 * 60;
  const hours = current.getHours();
  const minutes = current.getMinutes();
  const seconds = current.getSeconds();
  const total = hours * 60 + minutes * 60 + seconds;
  return full - total;
}
const useTipStore = defineStore("tip", () => {
  const info = ref(null);
  const storageName = "tip";
  function detect() {
    const todayTip = storage.get(storageName);
    return !todayTip || storage.isExpired(storageName);
  }
  async function get() {
    if (!detect())
      return;
    try {
      const tip = await useHttpFetchPost("/tip/today");
      const { data, error } = tip;
      if (!error) {
        const $show = useState("tip.show", () => false);
        const $tip = useState("tip.data");
        $show.value = true;
        $tip.value = {
          id: data.id,
          title: data.title,
          content: data.content,
          publishDate: data.publishDate
        };
        set2(data);
        return data;
      }
    } catch (e2) {
    }
  }
  function set2(value) {
    info.value = value;
    storage.set(storageName, 1, getTodayExpired());
  }
  function clear() {
    storage.remove("today_tip");
    info.value = {};
  }
  return {
    info,
    get,
    set: set2,
    clear
  };
});
function useBaseStore() {
  const user = useUserStore();
  const tip = useTipStore();
  return {
    user,
    tip
  };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "User",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "dropdown-right-top"
    }
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const { user } = useBaseStore();
    const { info, isLogin } = storeToRefs(user);
    const showAuth = useState("showAuth", () => false);
    const userMenu = ref([
      { id: 1, icon: "i-uil-user", label: "\u500B\u4EBA\u8CC7\u6599", path: "/my/account" },
      { id: 2, icon: "i-uil-file-alt", label: "\u700F\u89BD\u7D00\u9304", path: "/my/history" },
      { id: 3, icon: "i-ion-heart-outline", label: "\u6211\u7684\u6536\u85CF", path: "/my/collections" },
      { id: 4, icon: "i-uil-lightbulb-alt", label: "\u5C0F\u77E5\u8B58", path: "/my/tips" },
      { id: 5, icon: "i-uil-sign-out-alt", label: "\u767B\u51FA", action: () => user.logout() }
    ]);
    const clickNav = (id) => {
      const item = userMenu.value.find((item2) => item2.id === id);
      if (item == null ? void 0 : item.path)
        router.push(item.path);
      else if (item == null ? void 0 : item.action)
        item.action();
    };
    const currentStyle = toRef(props, "type");
    const sizeSetting = useState("size.setting");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center relative" }, _attrs))}>`);
      if (unref(currentStyle) === "dropdown-right-top") {
        _push(ssrRenderComponent(unref(Me), {
          modelValue: unref(sizeSetting),
          "onUpdate:modelValue": ($event) => isRef(sizeSetting) ? sizeSetting.value = $event : null,
          as: "div",
          class: "flex items-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Pe), { class: "sr-only" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u7528\u6236 `);
                  } else {
                    return [
                      createTextVNode(" \u7528\u6236 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Ie), {
                class: "block",
                type: "button",
                title: "\u7528\u6236\u4E2D\u5FC3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c2, _d2;
                  if (_push3) {
                    if (unref(isLogin)) {
                      _push3(`<div class="flex items-center justify-center cursor-pointer"${_scopeId2}><img class="w-6 h-6 rounded-full"${ssrRenderAttr("src", _imports_0$1)}${_scopeId2}><span class="ml-2 text-sm font-semibold"${_scopeId2}>${ssrInterpolate(`${((_a2 = unref(info)) == null ? void 0 : _a2.firstName) || ""}${((_b2 = unref(info)) == null ? void 0 : _b2.lastName) || ""}`)}</span>`);
                      _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-uil-angle-down" }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="flex items-center justify-center h-full cursor-pointer"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ph-user-circle w-6 h-6" }, null, _parent3, _scopeId2));
                      _push3(`<span class="ml-2 text-sm font-semibold"${_scopeId2}>\u672A\u767B\u5165</span>`);
                      _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-uil-angle-down" }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    }
                  } else {
                    return [
                      unref(isLogin) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-center cursor-pointer"
                      }, [
                        createVNode("img", {
                          class: "w-6 h-6 rounded-full",
                          src: _imports_0$1
                        }),
                        createVNode("span", { class: "ml-2 text-sm font-semibold" }, toDisplayString(`${((_c2 = unref(info)) == null ? void 0 : _c2.firstName) || ""}${((_d2 = unref(info)) == null ? void 0 : _d2.lastName) || ""}`), 1),
                        createVNode(_component_UnoIcon, { class: "i-uil-angle-down" })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-center h-full cursor-pointer",
                        onClick: ($event) => showAuth.value = true
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ph-user-circle w-6 h-6" }),
                        createVNode("span", { class: "ml-2 text-sm font-semibold" }, "\u672A\u767B\u5165"),
                        createVNode(_component_UnoIcon, { class: "i-uil-angle-down" })
                      ], 8, ["onClick"]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(isLogin)) {
                _push2(ssrRenderComponent(unref(Ve), { class: "absolute ring-1 ring-black mt-3 ring-opacity-5 top-full right-0 z-[999] mt-2 w-32 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(userMenu.value, (menu, index) => {
                        _push3(ssrRenderComponent(unref(Ae), { key: index }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="flex items-center w-full cursor-pointer items-center py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700/30"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_UnoIcon, {
                                class: [menu.icon, "mr-3"]
                              }, null, _parent4, _scopeId3));
                              _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(menu.label)}</span></div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  class: "flex items-center w-full cursor-pointer items-center py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700/30",
                                  onClick: ($event) => clickNav(menu.id)
                                }, [
                                  createVNode(_component_UnoIcon, {
                                    class: [menu.icon, "mr-3"]
                                  }, null, 8, ["class"]),
                                  createVNode("span", { class: "truncate" }, toDisplayString(menu.label), 1)
                                ], 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment$1, null, renderList(userMenu.value, (menu, index) => {
                          return openBlock(), createBlock(unref(Ae), { key: index }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: "flex items-center w-full cursor-pointer items-center py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700/30",
                                onClick: ($event) => clickNav(menu.id)
                              }, [
                                createVNode(_component_UnoIcon, {
                                  class: [menu.icon, "mr-3"]
                                }, null, 8, ["class"]),
                                createVNode("span", { class: "truncate" }, toDisplayString(menu.label), 1)
                              ], 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(unref(Pe), { class: "sr-only" }, {
                  default: withCtx(() => [
                    createTextVNode(" \u7528\u6236 ")
                  ]),
                  _: 1
                }),
                createVNode(unref(Ie), {
                  class: "block",
                  type: "button",
                  title: "\u7528\u6236\u4E2D\u5FC3"
                }, {
                  default: withCtx(() => {
                    var _a2, _b2;
                    return [
                      unref(isLogin) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-center cursor-pointer"
                      }, [
                        createVNode("img", {
                          class: "w-6 h-6 rounded-full",
                          src: _imports_0$1
                        }),
                        createVNode("span", { class: "ml-2 text-sm font-semibold" }, toDisplayString(`${((_a2 = unref(info)) == null ? void 0 : _a2.firstName) || ""}${((_b2 = unref(info)) == null ? void 0 : _b2.lastName) || ""}`), 1),
                        createVNode(_component_UnoIcon, { class: "i-uil-angle-down" })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-center h-full cursor-pointer",
                        onClick: ($event) => showAuth.value = true
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ph-user-circle w-6 h-6" }),
                        createVNode("span", { class: "ml-2 text-sm font-semibold" }, "\u672A\u767B\u5165"),
                        createVNode(_component_UnoIcon, { class: "i-uil-angle-down" })
                      ], 8, ["onClick"]))
                    ];
                  }),
                  _: 1
                }),
                unref(isLogin) ? (openBlock(), createBlock(unref(Ve), {
                  key: 0,
                  class: "absolute ring-1 ring-black mt-3 ring-opacity-5 top-full right-0 z-[999] mt-2 w-32 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment$1, null, renderList(userMenu.value, (menu, index) => {
                      return openBlock(), createBlock(unref(Ae), { key: index }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: "flex items-center w-full cursor-pointer items-center py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700/30",
                            onClick: ($event) => clickNav(menu.id)
                          }, [
                            createVNode(_component_UnoIcon, {
                              class: [menu.icon, "mr-3"]
                            }, null, 8, ["class"]),
                            createVNode("span", { class: "truncate" }, toDisplayString(menu.label), 1)
                          ], 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Navbar/User.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_0 = "" + globalThis.__publicAssetsURL("logo.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const app2 = useState("app");
    const menus = ref([
      { type: "link", text: "\u65B0\u805E", route: "/" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIAnchor = _sfc_main$8;
      const _component_UIButton = _sfc_main$7;
      const _component_TemSizeChange = _sfc_main$5;
      const _component_TemThemeChange = _sfc_main$4;
      const _component_LayoutNavbarUser = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-12" }, _attrs))}><div class="h-12 fixed flex items-center w-screen top-0 left-0 backdrop-filter backdrop-blur top-0 flex-none transition-colors duration-300 z-20 border-b border-gray-900/10 dark:border-gray-50/[0.2] bg-white dark:bg-slate-900/[0.7]"><div class="cma"><div class="lg:px-8 lg:mx-0"><div class="relative flex items-center">`);
      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          tag: "a",
          class: "flex-none mr-3 overflow-hidden font-bold text-gray-900 md:w-auto text-md dark:text-gray-200",
          to: "/"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="sr-only"${_scopeId}>home</span><span class="flex items-center"${_scopeId}><img class="w-20 mr-2"${ssrRenderAttr("src", _imports_0)}${_scopeId}><span class="leading-7 mt-[1px]"${_scopeId}>${ssrInterpolate(unref(app2).name)}</span></span>`);
            } else {
              return [
                createVNode("span", { class: "sr-only" }, "home"),
                createVNode("span", { class: "flex items-center" }, [
                  createVNode("img", {
                    class: "w-20 mr-2",
                    src: _imports_0
                  }),
                  createVNode("span", { class: "leading-7 mt-[1px]" }, toDisplayString(unref(app2).name), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      }, _push, _parent);
      _push(`<div class="relative ml-auto flex lt-lg:hidden"><nav class="flex items-center text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300" role="navigation"><ul class="flex items-center space-x-8"><!--[-->`);
      ssrRenderList(menus.value, (item, i) => {
        _push(`<li>`);
        if (item.type === "link") {
          _push(ssrRenderComponent(_component_UIAnchor, {
            to: item.route ? item.route : void 0,
            href: item.href ? item.href : void 0,
            class: "capitalize hover:no-underline hover:text-slate-900 hover:dark:text-white"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.text)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.text), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else if (item.type === "button") {
          _push(ssrRenderComponent(_component_UIButton, {
            text: item.text,
            size: "xs",
            class: "font-extrabold capitalize",
            to: item.route ? item.route : void 0,
            href: item.href ? item.href : void 0
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav><div class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]">`);
      _push(ssrRenderComponent(_component_TemSizeChange, null, null, _parent));
      _push(ssrRenderComponent(_component_TemThemeChange, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutNavbarUser, null, null, _parent));
      _push(`</div></div><div class="lg:hidden ml-auto"><div class="text-sm md:text-base flex space-x-2 md:space-x-4 border-l pl-4 md:pl-6 border-gray-900/10 dark:border-gray-50/[0.2]">`);
      _push(ssrRenderComponent(_component_TemSizeChange, null, null, _parent));
      _push(ssrRenderComponent(_component_TemThemeChange, null, null, _parent));
      _push(`</div></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h$1(component, props === true ? {} : props, slots) : h$1(Fragment, {}, slots) };
};
const layouts = {
  blog: () => import('./_nuxt/blog.b600b748.mjs').then((m2) => m2.default || m2),
  default: () => import('./_nuxt/default.5da8bb43.mjs').then((m2) => m2.default || m2)
};
const LayoutLoader = defineComponent({
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r2) => r2.default || r2);
    return () => {
      return h$1(LayoutComponent, {}, context.slots);
    };
  }
});
const __nuxt_component_3 = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = unref(props.name)) != null ? _a2 : route.meta.layout) != null ? _b2 : "default";
    });
    return () => {
      var _a2;
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (_a2 = route.meta.layoutTransition) != null ? _a2 : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && { key: layout.value, name: layout.value, hasTransition: void 0 }, context.slots).default()
      }).default();
    };
  }
});
const __nuxt_component_4 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    }
  },
  setup(props, { slots }) {
    const indicator = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle
    });
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", indicator.start);
    nuxtApp.hook("page:finish", indicator.finish);
    return () => h$1("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: `${indicator.progress.value}%`,
        height: `${props.height}px`,
        opacity: indicator.isLoading.value ? 1 : 0,
        background: props.color,
        backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
        transition: "width 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
function useLoadingIndicator(opts) {
  const progress = ref(0);
  const isLoading = ref(false);
  computed(() => 1e4 / opts.duration);
  let _timer = null;
  let _throttle = null;
  function start() {
    clear();
    progress.value = 0;
    isLoading.value = true;
    if (opts.throttle)
      ;
  }
  function finish() {
    progress.value = 100;
    _hide();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  function _hide() {
    clear();
  }
  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  };
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r2) => {
    var _a2;
    return ((_a2 = route.params[r2.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a2;
  const matchedRoute = routeProps.route.matched.find((m2) => {
    var _a3;
    return ((_a3 = m2.components) == null ? void 0 : _a3.default) === routeProps.Component.type;
  });
  const source = (_a2 = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a2 : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h$1(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a2, _b2, _c2, _d2;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!((_b2 = (_a2 = props.transition) != null ? _a2 : routeProps.route.meta.pageTransition) != null ? _b2 : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              (_d2 = (_c2 = props.keepalive) != null ? _c2 : routeProps.route.meta.keepalive) != null ? _d2 : appKeepalive,
              h$1(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h$1(Component, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h$1(props.routeProps.Component);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NavbarMobile",
  __ssrInlineRender: true,
  setup(__props) {
    useState("app");
    const menus = ref([
      { type: "link", text: "\u9996\u9801", icon: "i-uil-home-alt", route: "/" },
      { type: "link", text: "\u5206\u985E", icon: "i-uil-create-dashboard", route: "/news/categories" },
      { type: "link", text: "\u6536\u85CF", icon: "i-uil-heart", route: "/my/collections" },
      { type: "link", text: "\u500B\u4EBA", icon: "i-uil-user", route: "/my" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UnoIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:hidden h-15 fixed flex items-center w-screen bottom-0 left-0 flex-none transition-colors duration-300 z-20 bg-white border-t border-gray-900/10 dark:bg-gray-900 dark:border-gray-700" }, _attrs))}><div class="flex justify-around w-full"><!--[-->`);
      ssrRenderList(menus.value, (menu, index) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: index,
          class: "text-center px-2",
          to: menu.route
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UnoIcon, {
                class: ["mx-auto text-xl", menu.icon]
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-xs -mt-1 transform scale-90"${_scopeId}>${ssrInterpolate(menu.text)}</p>`);
            } else {
              return [
                createVNode(_component_UnoIcon, {
                  class: ["mx-auto text-xl", menu.icon]
                }, null, 8, ["class"]),
                createVNode("p", { class: "text-xs -mt-1 transform scale-90" }, toDisplayString(menu.text), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/NavbarMobile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots }) {
    const mounted = ref(false);
    return (props) => {
      var _a2;
      if (mounted.value) {
        return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, null, fallbackStr);
    };
  }
});
async function userController() {
  const isLogin = useState("isLogin", () => false);
  const route = useRoute();
  const router = useRouter();
  isLogin.value = false;
  const token = storage.get("token");
  if (token) {
    const { user, tip } = useBaseStore();
    const { token: userToken } = storeToRefs(user);
    userToken.value = token;
    const userInfo = await user.get();
    isLogin.value = true;
    tip.get();
    return {
      token,
      info: userInfo
    };
  }
  const $alert = useState("alert");
  if (route.meta.middleware && route.meta.middleware.includes("auth") && !isLogin.value) {
    setTimeout(() => {
      $alert.value = {
        type: "info",
        title: "\u8ACB\u91CD\u65B0\u767B\u5165",
        action: () => {
          router.push("/");
        }
      };
    }, 500);
  }
  return { token };
}
function InitApp() {
  const app2 = {
    name: "Bonding Tech.",
    author: {
      name: "\u9375\u7D50\u79D1\u6280",
      link: "https://bondingtech.co"
    }
  };
  useState("app", () => app2);
  const size = sizeController();
  const user = userController();
  return {
    app: app2,
    size,
    user
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    InitApp();
    const locale = useState("locale.i18n");
    const app2 = useAppConfig();
    useHead({
      title: app2.name,
      titleTemplate: "%s",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Nuxt 3 Awesome Starter"
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Html = Html;
      const _component_Body = Body;
      const _component_LayoutNavbar = _sfc_main$2;
      const _component_NuxtLayout = __nuxt_component_3;
      const _component_NuxtLoadingIndicator = __nuxt_component_4;
      const _component_NuxtPage = __nuxt_component_2;
      const _component_LayoutNavbarMobile = _sfc_main$1;
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_Html, mergeProps({ lang: unref(locale) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Body, { class: "bg-white text-gray-800 antialiased transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutNavbar, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtLayout, { class: "lt-lg:pb-14" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent4, _scopeId3));
                        _push4(`<div class="relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_NuxtPage, null, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(_component_NuxtLoadingIndicator),
                          createVNode("div", { class: "relative" }, [
                            createVNode(_component_NuxtPage)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LayoutNavbarMobile, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ClientOnly, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutNavbar),
                    createVNode(_component_NuxtLayout, { class: "lt-lg:pb-14" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLoadingIndicator),
                        createVNode("div", { class: "relative" }, [
                          createVNode(_component_NuxtPage)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_LayoutNavbarMobile),
                    createVNode(_component_ClientOnly)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Body, { class: "bg-white text-gray-800 antialiased transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200" }, {
                default: withCtx(() => [
                  createVNode(_component_LayoutNavbar),
                  createVNode(_component_NuxtLayout, { class: "lt-lg:pb-14" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLoadingIndicator),
                      createVNode("div", { class: "relative" }, [
                        createVNode(_component_NuxtPage)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LayoutNavbarMobile),
                  createVNode(_component_ClientOnly)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main$9);
    vueApp.component("App", _sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { defineNuxtRouteMiddleware as A, useAppConfig as B, O$1 as O, P, R, _export_sfc as _, u as a, __nuxt_component_1 as b, c, __nuxt_component_0$1 as d, entry$1 as default, useHead as e, f$2 as f, useHttpPost as g, useRouter as h, phoneRegex as i, useHttpFetchPost as j, useBaseStore as k, l, emailRegex as m, useRoute as n, o, p, idCardRegex as q, __nuxt_component_0 as r, storeToRefs as s, t, useState as u, passwordRegex as v, w, __nuxt_component_2 as x, _imports_0$1 as y, _sfc_main$8 as z };
//# sourceMappingURL=server.mjs.map
