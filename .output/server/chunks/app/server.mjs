import { toRef, isRef, getCurrentInstance, inject, defineAsyncComponent, version, useSSRContext, defineComponent, computed, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, toDisplayString, createTextVNode, ref, provide, h as h$1, Fragment as Fragment$1, onMounted, onUnmounted, watch, watchEffect, nextTick, toRaw, isReactive, Suspense, Transition, reactive, createElementBlock, openBlock, createBlock, createCommentVNode, withDirectives, vShow, renderSlot, resolveComponent, renderList, cloneVNode, shallowRef, createApp, onServerPrefetch, effectScope, markRaw, onErrorCaptured, createElementVNode, toRefs } from 'vue';
import { $fetch as $fetch$1 } from 'ohmyfetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import destr from 'destr';
import { hasProtocol, isEqual, parseURL, joinURL } from 'ufo';
import { createError as createError$1, sendRedirect, appendHeader } from 'h3';
import { defuFn, defu } from 'defu';
import { RouterView, useRoute as useRoute$1, createMemoryHistory, createRouter } from 'vue-router';
import { ssrRenderVNode, ssrInterpolate, ssrRenderComponent, ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderTeleport, ssrRenderSuspense } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import store from 'store';
import { ref as ref$1 } from '@vue/runtime-core';
import { parse, serialize } from 'cookie-es';
import { isEqual as isEqual$1 } from 'ohash';
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
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
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
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
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
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
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
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
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
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d = (_c = options.lazy) != null ? _c : options.defer) != null ? _d : false;
  options.initialCache = (_e = options.initialCache) != null ? _e : true;
  options.immediate = (_f = options.immediate) != null ? _f : true;
  const nuxt = useNuxtApp();
  const useInitialCache = () => (nuxt.isHydrating || options.initialCache) && nuxt.payload.data[key] !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(useInitialCache() ? nuxt.payload.data[key] : (_h = (_g = options.default) == null ? void 0 : _g.call(options)) != null ? _h : null),
      pending: ref(!useInitialCache()),
      error: ref((_i = nuxt.payload._errors[key]) != null ? _i : null)
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
      var _a2, _b2;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref((_b2 = (_a2 = options.default) == null ? void 0 : _a2.call(options)) != null ? _b2 : null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
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
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
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
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    return $fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a, _b;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref((_b = cookies[name]) != null ? _b : (_a = opts.default) == null ? void 0 : _a.call(opts));
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
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.req.headers.cookie) || "", opts);
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
        var _a, _b, _c;
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
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h$1("a", { ref: el, href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = defineNuxtLink({ componentName: "NuxtLink" });
const cfg0 = defineAppConfig({
  name: "Nuxt 3 Awesome Starter",
  author: {
    name: "viandwi24",
    link: "https://github.com/viandwi24"
  }
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
function useHead(meta2) {
  useNuxtApp()._useHead(meta2);
}
function useMeta(meta2) {
  return useHead(meta2);
}
const components = {
  Alert: defineAsyncComponent(() => import('./_nuxt/Alert.bbc9676d.mjs').then((c2) => c2.default || c2)),
  Loading: defineAsyncComponent(() => import('./_nuxt/Loading.1e0ed97a.mjs').then((c2) => c2.default || c2)),
  Message: defineAsyncComponent(() => import('./_nuxt/Message.ba84afff.mjs').then((c2) => c2.default || c2))
};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
const isVue2 = false;
function resolveUnref(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
function identity(arg) {
  return arg;
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
  var _a, _b;
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
    if ((_a = tag.options) == null ? void 0 : _a.beforeTagRender)
      tag.options.beforeTagRender(tag);
    if (tag.tag === "title")
      titleHtml = tagToString(tag);
    else if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs")
      attrs[tag.tag] = { ...attrs[tag.tag], ...tag.props };
    else if ((_b = tag.options) == null ? void 0 : _b.body)
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
    var _a;
    if ((_a = tag.options) == null ? void 0 : _a.renderPriority)
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
  var _a;
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
  if ((_a = tag.options) == null ? void 0 : _a.body)
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
      resolvedTags = resolvedTags.filter((_2, i) => i !== titleIdx);
    }
    resolvedTags = resolvedTags.filter((_2, i) => i !== titleTemplateIdx);
  } else if (titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      resolvedTags[titleTemplateIdx].children
    );
    if (newTitle !== null) {
      resolvedTags[titleTemplateIdx].children = newTitle;
      resolvedTags[titleTemplateIdx].tag = "title";
    } else {
      resolvedTags = resolvedTags.filter((_2, i) => i !== titleTemplateIdx);
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
  var _a;
  const $el = document2.createElement(tag.tag);
  Object.entries(tag.props).forEach(([k2, v2]) => {
    if (v2 !== false) {
      $el.setAttribute(k2, v2 === true ? "" : String(v2));
    }
  });
  if (tag.children) {
    if ((_a = tag.options) == null ? void 0 : _a.safe) {
      if (tag.tag !== "script")
        $el.textContent = tag.children;
    } else {
      $el.innerHTML = tag.children;
    }
  }
  return $el;
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a, _b;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type)
        oldBodyElements.push(bodyMetaElements[i]);
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type)
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
    var _a2;
    return {
      element: createElement(tag, document2),
      body: (_a3 = (_a2 = tag.options) == null ? void 0 : _a2.body) != null ? _a3 : false
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
    var _a2;
    return (_a2 = t2.parentNode) == null ? void 0 : _a2.removeChild(t2);
  });
  oldHeadElements.forEach((t2) => {
    var _a2;
    return (_a2 = t2.parentNode) == null ? void 0 : _a2.removeChild(t2);
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
  var _a, _b;
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
  setAttrs(document2.documentElement, ((_a = headTags.find((t2) => t2.tag === "htmlAttrs")) == null ? void 0 : _a.props) || {});
  setAttrs(document2.body, ((_b = headTags.find((t2) => t2.tag === "bodyAttrs")) == null ? void 0 : _b.props) || {});
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
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appLayoutTransition = { "name": "layout", "mode": "out-in" };
const appPageTransition = { "name": "page", "mode": "out-in" };
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
      const meta2 = await renderHeadToString(head);
      return {
        ...meta2,
        bodyScripts: meta2.bodyTags
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
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$D = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-1 relative py-8" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Wrapper.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$C = /* @__PURE__ */ defineComponent({
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
      default: void 0
    }
  },
  setup(__props) {
    const props = __props;
    const defaultStyle = `
  cursor-pointer
  border transition-color duration-300
  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:dark:ring-offset-gray-50 focus:dark:ring-gray-400 focus:ring-gray-600/[0.6] focus:ring-offset-gray-800/[0.6]
  flex items-center justify-center font-semibold
`;
    const styles = reactive({
      none: "",
      primary: "text-white bg-primary-500 hover:bg-primary-400 border-primary-500",
      secondary: "text-slate-800 bg-gray-200 border-gray-200 hover:bg-gray-300 dark:text-white dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700",
      opposite: "text-white bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-900 dark:text-gray-800 dark:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:border-white"
    });
    const sizes = reactive({
      lg: "h-13 px-8 text-lg rounded-lg",
      md: "h-10 px-6 text-base rounded",
      sm: "h-9 px-4 text-sm rounded",
      xs: "h-6 px-3 text-xs rounded"
    });
    const selectedStyle = computed(() => styles[props.type] || styles.primary);
    const selectedSize = computed(() => sizes[props.size] || sizes.lg);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      if (__props.to) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          tag: "a",
          to: __props.to,
          class: `${defaultStyle} ${unref(selectedStyle)} ${unref(selectedSize)}`
        }, _attrs), {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
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
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Button.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    code: {
      type: Number,
      default: 400
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const PageWrapper = __nuxt_component_0$1;
    const errorsMap = {
      "400": "Bad Request",
      "401": "Unauthorized",
      "403": "Forbidden",
      "404": "Not Found"
    };
    const error = computed(() => {
      const { code } = props;
      return {
        code,
        message: errorsMap[code.toString()] || "Unknown Error"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$C;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(props.wrap ? unref(PageWrapper) : "div"), mergeProps({
        class: props.wrap ? "flex flex-col items-center justify-center" : ""
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-center mb-6 leading-3"${_scopeId}><span class="font-bold text-8xl block"${_scopeId}>${ssrInterpolate(unref(error).code)}</span><span class="block italic"${_scopeId}>${ssrInterpolate(unref(error).message)}</span></h1>`);
            _push2(ssrRenderComponent(_component_Button, {
              text: "Home",
              to: "/",
              size: "sm"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", { class: "text-center mb-6 leading-3" }, [
                createVNode("span", { class: "font-bold text-8xl block" }, toDisplayString(unref(error).code), 1),
                createVNode("span", { class: "block italic" }, toDisplayString(unref(error).message), 1)
              ]),
              createVNode(_component_Button, {
                text: "Home",
                to: "/",
                size: "sm"
              })
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Error.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const meta$f = void 0;
const _sfc_main$A = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex-1" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Wrapper.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$z = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-4" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Body.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const __nuxt_component_4$2 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$y = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "lg:px-8 px-4 mb-4 last-mb-0 overflow-hidden" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Section/index.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const __nuxt_component_5$2 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["ssrRender", _sfc_ssrRender$3]]);
const _hoisted_1$r = {
  viewBox: "0 0 12 12",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$r = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M10.5 6a.75.75 0 0 0-.75-.75H3.81l1.97-1.97a.75.75 0 0 0-1.06-1.06L1.47 5.47a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 0 0 1.06-1.06L3.81 6.75h5.94A.75.75 0 0 0 10.5 6Z"
}, null, -1);
const _hoisted_3$r = [
  _hoisted_2$r
];
function render$r(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$r, _hoisted_3$r);
}
const __unplugin_components_0$7 = { name: "fluent-arrow-left12-filled", render: render$r };
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "Title",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "xl"
    },
    color: {
      type: String,
      default: ""
    },
    darkColor: {
      type: String,
      default: ""
    },
    tag: {
      type: String,
      default: "h2"
    },
    previous: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconFluent58arrow_left_12_filled = __unplugin_components_0$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-center justify-between py-3" }, _attrs))}><div class="flex items-center flex-1 space-x-1 lg:space-x-2">`);
      if (__props.previous) {
        _push(`<div class="flex items-center cursor-pointer">`);
        _push(ssrRenderComponent(_component_IconFluent58arrow_left_12_filled, { class: "text-sm lg:text-base" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.tag), {
        class: [`
          text-${__props.size}
          ${__props.color ? `text-${__props.color}` : ""}
          ${__props.darkColor ? `dark:text-${__props.darkColor}` : ""}
        `, "flex-1 font-bold ellipsis ellipsis-1"]
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.title), 1)
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Title.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const _sfc_main$w = {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      ArticleType: {
        normal: "\u4E00\u822C\u65B0\u805E",
        video: "\u5F71\u97F3\u65B0\u805E"
      },
      pagination: {
        clickable: true
      },
      modules: [Pagination]
    };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Swiper = resolveComponent("Swiper");
  const _component_SwiperSlide = resolveComponent("SwiperSlide");
  const _component_nuxt_link = __nuxt_component_0$2;
  if ($props.list.length) {
    _push(ssrRenderComponent(_component_Swiper, mergeProps({
      "space-between": 20,
      pagination: $setup.pagination,
      modules: $setup.modules,
      class: "news-swiper pb-[1.7em]"
    }, _attrs), {
      default: withCtx((_2, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<!--[-->`);
          ssrRenderList($props.list, (slide) => {
            _push2(ssrRenderComponent(_component_SwiperSlide, {
              key: slide.id,
              class: "rounded-md overflow-hidden"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="absolute top-0 left-0 w-full h-full"${_scopeId2}><img${ssrRenderAttr("src", slide.thumbnail)} class="object-cover w-full h-full"${_scopeId2}></div><div class="flex flex-wrap content-end absolute bottom-0 left-0 w-full px-4 h-1/3 pb-5 lg:pb-7 lg:px-6 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/95"${_scopeId2}><div class="flex items-center w-full pb-3 text-xs space-x-3 text-white"${_scopeId2}><div class="w-fit h-6 leading-6 px-2 rounded bg-green-500"${_scopeId2}>${ssrInterpolate($setup.ArticleType[slide.type])}</div><!--[-->`);
                  ssrRenderList((_a = slide.categories) == null ? void 0 : _a.split(","), (item, index) => {
                    _push3(`<div class="w-fit h-6 leading-6 px-2 rounded bg-blue-500"${_scopeId2}>${ssrInterpolate(item)}</div>`);
                  });
                  _push3(`<!--]--></div><h3 class="text-xl font-bold tracking-widest text-white text-shadow-lg"${_scopeId2}>${ssrInterpolate(slide.title)}</h3></div>`);
                  _push3(ssrRenderComponent(_component_nuxt_link, {
                    to: `/news/article/${slide.slug}`,
                    class: "absolute top-0 left-0 w-full h-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "absolute top-0 left-0 w-full h-full" }, [
                      createVNode("img", {
                        src: slide.thumbnail,
                        class: "object-cover w-full h-full"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "flex flex-wrap content-end absolute bottom-0 left-0 w-full px-4 h-1/3 pb-5 lg:pb-7 lg:px-6 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/95" }, [
                      createVNode("div", { class: "flex items-center w-full pb-3 text-xs space-x-3 text-white" }, [
                        createVNode("div", { class: "w-fit h-6 leading-6 px-2 rounded bg-green-500" }, toDisplayString($setup.ArticleType[slide.type]), 1),
                        (openBlock(true), createBlock(Fragment$1, null, renderList((_b = slide.categories) == null ? void 0 : _b.split(","), (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "w-fit h-6 leading-6 px-2 rounded bg-blue-500"
                          }, toDisplayString(item), 1);
                        }), 128))
                      ]),
                      createVNode("h3", { class: "text-xl font-bold tracking-widest text-white text-shadow-lg" }, toDisplayString(slide.title), 1)
                    ]),
                    createVNode(_component_nuxt_link, {
                      to: `/news/article/${slide.slug}`,
                      class: "absolute top-0 left-0 w-full h-full"
                    }, null, 8, ["to"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          });
          _push2(`<!--]-->`);
        } else {
          return [
            (openBlock(true), createBlock(Fragment$1, null, renderList($props.list, (slide) => {
              return openBlock(), createBlock(_component_SwiperSlide, {
                key: slide.id,
                class: "rounded-md overflow-hidden"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("div", { class: "absolute top-0 left-0 w-full h-full" }, [
                      createVNode("img", {
                        src: slide.thumbnail,
                        class: "object-cover w-full h-full"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "flex flex-wrap content-end absolute bottom-0 left-0 w-full px-4 h-1/3 pb-5 lg:pb-7 lg:px-6 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/95" }, [
                      createVNode("div", { class: "flex items-center w-full pb-3 text-xs space-x-3 text-white" }, [
                        createVNode("div", { class: "w-fit h-6 leading-6 px-2 rounded bg-green-500" }, toDisplayString($setup.ArticleType[slide.type]), 1),
                        (openBlock(true), createBlock(Fragment$1, null, renderList((_a = slide.categories) == null ? void 0 : _a.split(","), (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "w-fit h-6 leading-6 px-2 rounded bg-blue-500"
                          }, toDisplayString(item), 1);
                        }), 128))
                      ]),
                      createVNode("h3", { class: "text-xl font-bold tracking-widest text-white text-shadow-lg" }, toDisplayString(slide.title), 1)
                    ]),
                    createVNode(_component_nuxt_link, {
                      to: `/news/article/${slide.slug}`,
                      class: "absolute top-0 left-0 w-full h-full"
                    }, null, 8, ["to"])
                  ];
                }),
                _: 2
              }, 1024);
            }), 128))
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/Slider.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const __nuxt_component_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["ssrRender", _sfc_ssrRender$2]]);
const _hoisted_1$q = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$q = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.819 9c-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10a5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6a3 3 0 0 1 0 6z"
}, null, -1);
const _hoisted_3$q = [
  _hoisted_2$q
];
function render$q(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$q, _hoisted_3$q);
}
const __unplugin_components_1$4 = { name: "ri-eye-fill", render: render$q };
const _hoisted_1$p = {
  viewBox: "0 0 16 16",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$p = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M9.58 1.052c-.75-.209-1.336.35-1.545.871c-.24.6-.453 1.021-.706 1.524a44.75 44.75 0 0 0-.533 1.09c-.475 1.01-.948 1.656-1.293 2.045a4.063 4.063 0 0 1-.405.402a1.92 1.92 0 0 1-.101.081l-.016.012L3.109 8.18a2 2 0 0 0-.856 2.426l.52 1.384a2 2 0 0 0 1.273 1.205l5.356 1.682a2.5 2.5 0 0 0 3.148-1.68l1.364-4.647a2 2 0 0 0-1.92-2.563H10.61c.066-.227.133-.479.195-.74c.131-.562.243-1.203.232-1.738c-.009-.497-.06-1.019-.264-1.462c-.219-.475-.602-.832-1.192-.996ZM4.978 7.08l-.002.001Z"
}, null, -1);
const _hoisted_3$p = [
  _hoisted_2$p
];
function render$p(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$p, _hoisted_3$p);
}
const __unplugin_components_0$6 = { name: "fluent-thumb-like16-filled", render: render$p };
const _sfc_main$v = {
  __name: "Hot",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: () => []
    },
    infinite: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_IconFluent58thumb_like_16_filled = __unplugin_components_0$6;
      const _component_IconRi58eye_fill = __unplugin_components_1$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid py-1 grid-rows-3 lg:gap-4 lg:grid-cols-2 2xl:block" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.list, (article, index) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          key: article.id,
          to: `/news/article/${article.slug}`,
          class: [
            "flex border-gray-200 dark:border-gray-700 2xl:mb-4 lt-lg:px-1 last:mb-0 last:border-0 last:pb-0",
            __props.list.length - 2 <= index ? "2xl:pb-4 2xl:border-b-1 lt-lg:mb-3 lt-lg:pb-3 lt-lg:border-b-1 last-pb-0 last-mb-0 last-border-b-0" : "border-b-1 pb-4 lg:pb-3 2xl:pb-4 lt-lg:mb-4"
          ]
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-wrap w-full"${_scopeId}><div class="relative w-20 h-18 mr-4"${_scopeId}><img${ssrRenderAttr("src", article.thumbnail)} class="absolute object-cover w-full h-full rounded-sm"${_scopeId}></div><div class="flex flex-col content-between flex-1"${_scopeId}><h3 class="text-base font-bold ellipsis"${_scopeId}>${ssrInterpolate(article.title)}</h3><div class="flex flex-wrap justify-between w-full pt-1 mt-auto text-xs text-gray-600 dark:text-gray-400"${_scopeId}><div class="flex justify-between w-full mb-1" itemprop="author"${_scopeId}><p${_scopeId}>${ssrInterpolate(article.author)}</p><p${_scopeId}>${ssrInterpolate(article.categories)}</p></div><div class="flex flex-wrap w-full"${_scopeId}><div class="mr-2 tracking-wider" itemprop="create-date"${_scopeId}>${ssrInterpolate(article.publishTime)}</div><div class="ml-auto flex items-center space-x-4"${_scopeId}><div class="flex items-center justify-end ml-auto space-x-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_IconFluent58thumb_like_16_filled, { class: "text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(article.likes)}</span></div><div class="flex items-center ml-auto space-x-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_IconRi58eye_fill, { class: "text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(article.views)}</span></div></div></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-wrap w-full" }, [
                  createVNode("div", { class: "relative w-20 h-18 mr-4" }, [
                    createVNode("img", {
                      src: article.thumbnail,
                      class: "absolute object-cover w-full h-full rounded-sm"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "flex flex-col content-between flex-1" }, [
                    createVNode("h3", { class: "text-base font-bold ellipsis" }, toDisplayString(article.title), 1),
                    createVNode("div", { class: "flex flex-wrap justify-between w-full pt-1 mt-auto text-xs text-gray-600 dark:text-gray-400" }, [
                      createVNode("div", {
                        class: "flex justify-between w-full mb-1",
                        itemprop: "author"
                      }, [
                        createVNode("p", null, toDisplayString(article.author), 1),
                        createVNode("p", null, toDisplayString(article.categories), 1)
                      ]),
                      createVNode("div", { class: "flex flex-wrap w-full" }, [
                        createVNode("div", {
                          class: "mr-2 tracking-wider",
                          itemprop: "create-date"
                        }, toDisplayString(article.publishTime), 1),
                        createVNode("div", { class: "ml-auto flex items-center space-x-4" }, [
                          createVNode("div", { class: "flex items-center justify-end ml-auto space-x-1" }, [
                            createVNode(_component_IconFluent58thumb_like_16_filled, { class: "text-green-400" }),
                            createVNode("span", null, toDisplayString(article.likes), 1)
                          ]),
                          createVNode("div", { class: "flex items-center ml-auto space-x-1" }, [
                            createVNode(_component_IconRi58eye_fill, { class: "text-green-400" }),
                            createVNode("span", null, toDisplayString(article.views), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/Hot.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _sfc_main$u = {
  __name: "RowLoading",
  __ssrInlineRender: true,
  props: {
    row: {
      type: Number,
      default: 4
    },
    column: {
      type: Number,
      default: 2
    },
    gap: {
      type: Number,
      default: 2
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 gap-5 2xl:grid-cols-4 xl:grid-cols-3" }, _attrs))} data-v-445ccf6b><!--[-->`);
      ssrRenderList(4, (n2) => {
        _push(`<div class="${ssrRenderClass([[{ "xl:hidden 2xl:block": n2 > 3 }, { "hidden lg:block": n2 > 2 }], "relative"])}" data-v-445ccf6b><div class="h-0 mb-2 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading thumbnail" data-v-445ccf6b></div><div class="w-full h-12 mb-3 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading" data-v-445ccf6b></div><div class="flex justify-between" data-v-445ccf6b><div class="w-16 h-5 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading" data-v-445ccf6b></div><div class="w-16 h-5 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading" data-v-445ccf6b></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/RowLoading.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-445ccf6b"]]);
const _sfc_main$t = {
  __name: "Row",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: () => []
    },
    infinite: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "h3"
    },
    row: {
      type: Number,
      default: 4
    },
    gap: {
      type: Number,
      default: 2
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_IconFluent58thumb_like_16_filled = __unplugin_components_0$6;
      const _component_IconRi58eye_fill = __unplugin_components_1$4;
      const _component_ArticleLoopRowLoading = __nuxt_component_1$2;
      _push(`<!--[--><div class="grid grid-cols-2 gap-5 2xl:grid-cols-4 xl:grid-cols-3" data-v-26832a25><!--[-->`);
      ssrRenderList(__props.list, (article) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          key: article.id,
          to: `/news/article/${article.slug}`,
          class: "relative"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative h-0 mb-2 overflow-hidden rounded thumbnail" data-v-26832a25${_scopeId}><img${ssrRenderAttr("src", article.thumbnail)} class="absolute top-0 left-0 object-cover w-full h-full" data-v-26832a25${_scopeId}></div><div class="px-2" data-v-26832a25${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.tag), { class: "text-base font-bold ellipsis" }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(article.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(article.title), 1)
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
              _push2(`<div class="flex flex-wrap justify-between w-full py-2 mt-auto text-xs text-gray-600 dark:text-gray-400" data-v-26832a25${_scopeId}><div class="flex justify-between w-full mb-1" itemprop="author" data-v-26832a25${_scopeId}><p data-v-26832a25${_scopeId}>${ssrInterpolate(article.author)}</p><p data-v-26832a25${_scopeId}>${ssrInterpolate(article.categories)}</p></div><div class="flex w-full" data-v-26832a25${_scopeId}><div class="mr-2 tracking-wider" itemprop="create-date" data-v-26832a25${_scopeId}>${ssrInterpolate(article.publishTime)}</div><div class="ml-auto flex items-center space-x-4" data-v-26832a25${_scopeId}><div class="flex items-center justify-end ml-auto space-x-1" data-v-26832a25${_scopeId}>`);
              _push2(ssrRenderComponent(_component_IconFluent58thumb_like_16_filled, { class: "text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span data-v-26832a25${_scopeId}>${ssrInterpolate(article.likes)}</span></div><div class="flex items-center ml-auto space-x-1" data-v-26832a25${_scopeId}>`);
              _push2(ssrRenderComponent(_component_IconRi58eye_fill, { class: "text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span data-v-26832a25${_scopeId}>${ssrInterpolate(article.views)}</span></div></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "relative h-0 mb-2 overflow-hidden rounded thumbnail" }, [
                  createVNode("img", {
                    src: article.thumbnail,
                    class: "absolute top-0 left-0 object-cover w-full h-full"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "px-2" }, [
                  (openBlock(), createBlock(resolveDynamicComponent(__props.tag), { class: "text-base font-bold ellipsis" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(article.title), 1)
                    ]),
                    _: 2
                  }, 1024)),
                  createVNode("div", { class: "flex flex-wrap justify-between w-full py-2 mt-auto text-xs text-gray-600 dark:text-gray-400" }, [
                    createVNode("div", {
                      class: "flex justify-between w-full mb-1",
                      itemprop: "author"
                    }, [
                      createVNode("p", null, toDisplayString(article.author), 1),
                      createVNode("p", null, toDisplayString(article.categories), 1)
                    ]),
                    createVNode("div", { class: "flex w-full" }, [
                      createVNode("div", {
                        class: "mr-2 tracking-wider",
                        itemprop: "create-date"
                      }, toDisplayString(article.publishTime), 1),
                      createVNode("div", { class: "ml-auto flex items-center space-x-4" }, [
                        createVNode("div", { class: "flex items-center justify-end ml-auto space-x-1" }, [
                          createVNode(_component_IconFluent58thumb_like_16_filled, { class: "text-green-400" }),
                          createVNode("span", null, toDisplayString(article.likes), 1)
                        ]),
                        createVNode("div", { class: "flex items-center ml-auto space-x-1" }, [
                          createVNode(_component_IconRi58eye_fill, { class: "text-green-400" }),
                          createVNode("span", null, toDisplayString(article.views), 1)
                        ])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (__props.infinite && __props.loading) {
        _push(ssrRenderComponent(_component_ArticleLoopRowLoading, { class: "mt-2" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/Row.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const __nuxt_component_6$1 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-26832a25"]]);
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
  let { as: n2, ...s2 } = w$1(r2, ["unmount", "static"]), a2 = (y2 = e2.default) == null ? void 0 : y2.call(e2, o2), l2 = {};
  if (o2) {
    let d2 = false, u2 = [];
    for (let [f2, c2] of Object.entries(o2))
      typeof c2 == "boolean" && (d2 = true), c2 === true && u2.push(f2);
    d2 && (l2["data-headlessui-state"] = u2.join(" "));
  }
  if (n2 === "template") {
    if (a2 = g$1(a2 != null ? a2 : []), Object.keys(s2).length > 0 || Object.keys(t2).length > 0) {
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
  return h$1(n2, Object.assign({}, s2, l2), a2);
}
function g$1(r2) {
  return r2.flatMap((t2) => t2.type === Fragment$1 ? g$1(t2.children) : [t2]);
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
function w$1(r2, t2 = []) {
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
var l$1 = ((e2) => (e2[e2.Open = 0] = "Open", e2[e2.Closed = 1] = "Closed", e2))(l$1 || {});
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
function m$2(r2) {
  return null;
}
let m$1 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var M = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(M || {}), N = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(N || {}), b = ((r2) => (r2[r2.Previous = -1] = "Previous", r2[r2.Next = 1] = "Next", r2))(b || {});
var F$2 = ((r2) => (r2[r2.Strict = 0] = "Strict", r2[r2.Loose = 1] = "Loose", r2))(F$2 || {});
function h(e2, t2 = 0) {
  var r2;
  return e2 === ((r2 = m$2()) == null ? void 0 : r2.body) ? false : u(t2, { [0]() {
    return e2.matches(m$1);
  }, [1]() {
    let l2 = e2;
    for (; l2 !== null; ) {
      if (l2.matches(m$1))
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
    f(t2, s$1(r2, i), o2);
  return t2;
}
function s$1(n2, r2) {
  return n2 ? n2 + "[" + r2 + "]" : r2;
}
function f(n2, r2, t2) {
  if (Array.isArray(t2))
    for (let [i, o2] of t2.entries())
      f(n2, s$1(r2, i.toString()), o2);
  else
    t2 instanceof Date ? n2.push([r2, t2.toISOString()]) : typeof t2 == "boolean" ? n2.push([r2, t2 ? "1" : "0"]) : typeof t2 == "string" ? n2.push([r2, t2]) : typeof t2 == "number" ? n2.push([r2, `${t2}`]) : t2 == null ? n2.push([r2, ""]) : e(t2, r2, n2);
}
function d$2(u2, e2, r2) {
  let i = ref(r2 == null ? void 0 : r2.value), f2 = computed(() => u2.value !== void 0);
  return [computed(() => f2.value ? u2.value : i.value), function(t2) {
    return f2.value || (i.value = t2), e2 == null ? void 0 : e2(t2);
  }];
}
function s() {
  let a2 = [], i = [], t2 = { enqueue(e2) {
    i.push(e2);
  }, addEventListener(e2, n2, o2, r2) {
    return e2.addEventListener(n2, o2, r2), t2.add(() => e2.removeEventListener(n2, o2, r2));
  }, requestAnimationFrame(...e2) {
    let n2 = requestAnimationFrame(...e2);
    t2.add(() => cancelAnimationFrame(n2));
  }, nextFrame(...e2) {
    t2.requestAnimationFrame(() => {
      t2.requestAnimationFrame(...e2);
    });
  }, setTimeout(...e2) {
    let n2 = setTimeout(...e2);
    t2.add(() => clearTimeout(n2));
  }, add(e2) {
    a2.push(e2);
  }, dispose() {
    for (let e2 of a2.splice(0))
      e2();
  }, async workQueue() {
    for (let e2 of i.splice(0))
      await e2();
  } };
  return t2;
}
function ue$1(o2, m2) {
  return o2 === m2;
}
var re = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(re || {}), se$1 = ((l2) => (l2[l2.Single = 0] = "Single", l2[l2.Multi = 1] = "Multi", l2))(se$1 || {}), de = ((l2) => (l2[l2.Pointer = 0] = "Pointer", l2[l2.Other = 1] = "Other", l2))(de || {});
function fe$1(o2) {
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
let Me = defineComponent({ name: "Listbox", emits: { "update:modelValue": (o2) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => ue$1 }, horizontal: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, name: { type: String, optional: true }, multiple: { type: [Boolean], default: false } }, inheritAttrs: false, setup(o$12, { slots: m2, attrs: l2, emit: L2 }) {
  let e$12 = ref(1), p2 = ref(null), s2 = ref(null), O$12 = ref(null), d2 = ref([]), S = ref(""), t2 = ref(null), i = ref(1);
  function k2(a2 = (n2) => n2) {
    let n2 = t2.value !== null ? d2.value[t2.value] : null, u2 = O(a2(d2.value.slice()), (y2) => o(y2.dataRef.domRef)), c2 = n2 ? u2.indexOf(n2) : null;
    return c2 === -1 && (c2 = null), { options: u2, activeOptionIndex: c2 };
  }
  let h$2 = computed(() => o$12.multiple ? 1 : 0), [w2, r2] = d$2(computed(() => o$12.modelValue), (a2) => L2("update:modelValue", a2), computed(() => o$12.defaultValue)), f2 = { listboxState: e$12, value: w2, mode: h$2, compare(a2, n2) {
    if (typeof o$12.by == "string") {
      let u2 = o$12.by;
      return (a2 == null ? void 0 : a2[u2]) === (n2 == null ? void 0 : n2[u2]);
    }
    return o$12.by(a2, n2);
  }, orientation: computed(() => o$12.horizontal ? "horizontal" : "vertical"), labelRef: p2, buttonRef: s2, optionsRef: O$12, disabled: computed(() => o$12.disabled), options: d2, searchQuery: S, activeOptionIndex: t2, activationTrigger: i, closeListbox() {
    o$12.disabled || e$12.value !== 1 && (e$12.value = 1, t2.value = null);
  }, openListbox() {
    o$12.disabled || e$12.value !== 0 && (e$12.value = 0);
  }, goToOption(a2, n2, u2) {
    if (o$12.disabled || e$12.value === 1)
      return;
    let c2 = k2(), y2 = x(a2 === a$1.Specific ? { focus: a$1.Specific, id: n2 } : { focus: a2 }, { resolveItems: () => c2.options, resolveActiveIndex: () => c2.activeOptionIndex, resolveId: (T) => T.id, resolveDisabled: (T) => T.dataRef.disabled });
    S.value = "", t2.value = y2, i.value = u2 != null ? u2 : 1, d2.value = c2.options;
  }, search(a2) {
    if (o$12.disabled || e$12.value === 1)
      return;
    let u2 = S.value !== "" ? 0 : 1;
    S.value += a2.toLowerCase();
    let y2 = (t2.value !== null ? d2.value.slice(t2.value + u2).concat(d2.value.slice(0, t2.value + u2)) : d2.value).find((A) => A.dataRef.textValue.startsWith(S.value) && !A.dataRef.disabled), T = y2 ? d2.value.indexOf(y2) : -1;
    T === -1 || T === t2.value || (t2.value = T, i.value = 1);
  }, clearSearch() {
    o$12.disabled || e$12.value !== 1 && S.value !== "" && (S.value = "");
  }, registerOption(a2, n2) {
    let u2 = k2((c2) => [...c2, { id: a2, dataRef: n2 }]);
    d2.value = u2.options, t2.value = u2.activeOptionIndex;
  }, unregisterOption(a2) {
    let n2 = k2((u2) => {
      let c2 = u2.findIndex((y2) => y2.id === a2);
      return c2 !== -1 && u2.splice(c2, 1), u2;
    });
    d2.value = n2.options, t2.value = n2.activeOptionIndex, i.value = 1;
  }, select(a2) {
    o$12.disabled || r2(u(h$2.value, { [0]: () => a2, [1]: () => {
      let n2 = toRaw(f2.value.value).slice(), u2 = toRaw(a2), c2 = n2.findIndex((y2) => f2.compare(u2, toRaw(y2)));
      return c2 === -1 ? n2.push(u2) : n2.splice(c2, 1), n2;
    } }));
  } };
  return y([s2, O$12], (a2, n2) => {
    var u2;
    f2.closeListbox(), h(n2, F$2.Loose) || (a2.preventDefault(), (u2 = o(s2)) == null || u2.focus());
  }, computed(() => e$12.value === 0)), provide(H, f2), c(computed(() => u(e$12.value, { [0]: l$1.Open, [1]: l$1.Closed }))), () => {
    let { name: a$12, modelValue: n2, disabled: u2, ...c2 } = o$12, y2 = { open: e$12.value === 0, disabled: u2, value: w2.value };
    return h$1(Fragment$1, [...a$12 != null && w2.value != null ? e({ [a$12]: w2.value }).map(([T, A]) => h$1(f$1, V$1({ features: a.Hidden, key: T, as: "input", type: "hidden", hidden: true, readOnly: true, name: T, value: A }))) : [], P({ ourProps: {}, theirProps: { ...l2, ...w$1(c2, ["defaultValue", "onUpdate:modelValue", "horizontal", "multiple", "by"]) }, slot: y2, slots: m2, attrs: l2, name: "Listbox" })]);
  };
} }), Pe = defineComponent({ name: "ListboxLabel", props: { as: { type: [Object, String], default: "label" } }, setup(o$12, { attrs: m2, slots: l2 }) {
  let L2 = V("ListboxLabel"), e2 = `headlessui-listbox-label-${t()}`;
  function p2() {
    var s2;
    (s2 = o(L2.buttonRef)) == null || s2.focus({ preventScroll: true });
  }
  return () => {
    let s2 = { open: L2.listboxState.value === 0, disabled: L2.disabled.value }, O2 = { id: e2, ref: L2.labelRef, onClick: p2 };
    return P({ ourProps: O2, theirProps: o$12, slot: s2, attrs: m2, slots: l2, name: "ListboxLabel" });
  };
} }), Ie = defineComponent({ name: "ListboxButton", props: { as: { type: [Object, String], default: "button" } }, setup(o$2, { attrs: m2, slots: l2, expose: L2 }) {
  let e2 = V("ListboxButton"), p2 = `headlessui-listbox-button-${t()}`;
  L2({ el: e2.buttonRef, $el: e2.buttonRef });
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
    })) : (t2.preventDefault(), e2.openListbox(), fe$1(() => {
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
} }), Ve = defineComponent({ name: "ListboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(o$2, { attrs: m2, slots: l2, expose: L2 }) {
  let e2 = V("ListboxOptions"), p$12 = `headlessui-listbox-options-${t()}`, s2 = ref(null);
  L2({ el: e2.optionsRef, $el: e2.optionsRef });
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
  let d2 = p(), S = computed(() => d2 !== null ? d2.value === l$1.Open : e2.listboxState.value === 0);
  return () => {
    var h2, w2, r2, f2;
    let t2 = { open: e2.listboxState.value === 0 }, i = { "aria-activedescendant": e2.activeOptionIndex.value === null || (h2 = e2.options.value[e2.activeOptionIndex.value]) == null ? void 0 : h2.id, "aria-multiselectable": e2.mode.value === 1 ? true : void 0, "aria-labelledby": (f2 = (w2 = o(e2.labelRef)) == null ? void 0 : w2.id) != null ? f2 : (r2 = o(e2.buttonRef)) == null ? void 0 : r2.id, "aria-orientation": e2.orientation.value, id: p$12, onKeydown: O2, role: "listbox", tabIndex: 0, ref: e2.optionsRef };
    return P({ ourProps: i, theirProps: o$2, slot: t2, attrs: m2, slots: l2, features: R.RenderStrategy | R.Static, visible: S.value, name: "ListboxOptions" });
  };
} }), Ae = defineComponent({ name: "ListboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false } }, setup(o$12, { slots: m2, attrs: l2, expose: L2 }) {
  let e2 = V("ListboxOption"), p2 = `headlessui-listbox-option-${t()}`, s2 = ref(null);
  L2({ el: s2, $el: s2 });
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
  function w2() {
    o$12.disabled || !O2.value || e2.goToOption(a$1.Nothing);
  }
  return () => {
    let { disabled: r2 } = o$12, f2 = { active: O2.value, selected: d2.value, disabled: r2 }, a2 = { id: p2, ref: s2, role: "option", tabIndex: r2 === true ? void 0 : -1, "aria-disabled": r2 === true ? true : void 0, "aria-selected": d2.value, disabled: void 0, onClick: i, onFocus: k2, onPointermove: h2, onMousemove: h2, onPointerleave: w2, onMouseleave: w2 };
    return P({ ourProps: a2, theirProps: w$1(o$12, ["value", "disabled"]), slot: f2, attrs: l2, slots: m2, name: "ListboxOption" });
  };
} });
function l(r2) {
  let e2 = { called: false };
  return (...t2) => {
    if (!e2.called)
      return e2.called = true, r2(...t2);
  };
}
function m(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.add(...t2);
}
function d$1(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.remove(...t2);
}
var g = ((i) => (i.Finished = "finished", i.Cancelled = "cancelled", i))(g || {});
function F$1(e2, t2) {
  let i = s();
  if (!e2)
    return i.dispose;
  let { transitionDuration: n2, transitionDelay: a2 } = getComputedStyle(e2), [l2, s$12] = [n2, a2].map((o2) => {
    let [u2 = 0] = o2.split(",").filter(Boolean).map((r2) => r2.includes("ms") ? parseFloat(r2) : parseFloat(r2) * 1e3).sort((r2, c2) => c2 - r2);
    return u2;
  });
  return l2 !== 0 ? i.setTimeout(() => t2("finished"), l2 + s$12) : t2("finished"), i.add(() => t2("cancelled")), i.dispose;
}
function L(e2, t2, i, n2, a2, l$12) {
  let s$12 = s(), o2 = l$12 !== void 0 ? l(l$12) : () => {
  };
  return d$1(e2, ...a2), m(e2, ...t2, ...i), s$12.nextFrame(() => {
    d$1(e2, ...i), m(e2, ...n2), s$12.add(F$1(e2, (u2) => (d$1(e2, ...n2, ...t2), m(e2, ...a2), o2(u2))));
  }), s$12.add(() => d$1(e2, ...t2, ...i, ...n2, ...a2)), s$12.add(() => o2("cancelled")), s$12.dispose;
}
function d(e2 = "") {
  return e2.split(" ").filter((t2) => t2.trim().length > 1);
}
let B = Symbol("TransitionContext");
var ae = ((a2) => (a2.Visible = "visible", a2.Hidden = "hidden", a2))(ae || {});
function le() {
  return inject(B, null) !== null;
}
function ie() {
  let e2 = inject(B, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
function se() {
  let e2 = inject(F, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
let F = Symbol("NestingContext");
function w(e2) {
  return "children" in e2 ? w(e2.children) : e2.value.filter(({ state: t2 }) => t2 === "visible").length > 0;
}
function K(e2) {
  let t2 = ref([]), a2 = ref(false);
  onMounted(() => a2.value = true), onUnmounted(() => a2.value = false);
  function s2(r2, n2 = O$1.Hidden) {
    let l2 = t2.value.findIndex(({ id: i }) => i === r2);
    l2 !== -1 && (u(n2, { [O$1.Unmount]() {
      t2.value.splice(l2, 1);
    }, [O$1.Hidden]() {
      t2.value[l2].state = "hidden";
    } }), !w(t2) && a2.value && (e2 == null || e2()));
  }
  function v2(r2) {
    let n2 = t2.value.find(({ id: l2 }) => l2 === r2);
    return n2 ? n2.state !== "visible" && (n2.state = "visible") : t2.value.push({ id: r2, state: "visible" }), () => s2(r2, O$1.Unmount);
  }
  return { children: t2, register: v2, unregister: s2 };
}
let _ = R.RenderStrategy, oe = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t$1, attrs: a2, slots: s2, expose: v2 }) {
  if (!le() && f$2())
    return () => h$1(fe, { ...e2, onBeforeEnter: () => t$1("beforeEnter"), onAfterEnter: () => t$1("afterEnter"), onBeforeLeave: () => t$1("beforeLeave"), onAfterLeave: () => t$1("afterLeave") }, s2);
  let r2 = ref(null), n2 = ref("visible"), l2 = computed(() => e2.unmount ? O$1.Unmount : O$1.Hidden);
  v2({ el: r2, $el: r2 });
  let { show: i, appear: x2 } = ie(), { register: g$12, unregister: p2 } = se(), R2 = { value: true }, m2 = t(), S = { value: false }, N2 = K(() => {
    S.value || (n2.value = "hidden", p2(m2), t$1("afterLeave"));
  });
  onMounted(() => {
    let o2 = g$12(m2);
    onUnmounted(o2);
  }), watchEffect(() => {
    if (l2.value === O$1.Hidden && !!m2) {
      if (i && n2.value !== "visible") {
        n2.value = "visible";
        return;
      }
      u(n2.value, { ["hidden"]: () => p2(m2), ["visible"]: () => g$12(m2) });
    }
  });
  let k2 = d(e2.enter), $ = d(e2.enterFrom), q = d(e2.enterTo), O2 = d(e2.entered), z = d(e2.leave), G = d(e2.leaveFrom), J = d(e2.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (n2.value === "visible") {
        let o$12 = o(r2);
        if (o$12 instanceof Comment && o$12.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function Q(o$12) {
    let c2 = R2.value && !x2.value, u2 = o(r2);
    !u2 || !(u2 instanceof HTMLElement) || c2 || (S.value = true, i.value && t$1("beforeEnter"), i.value || t$1("beforeLeave"), o$12(i.value ? L(u2, k2, $, q, O2, (C) => {
      S.value = false, C === g.Finished && t$1("afterEnter");
    }) : L(u2, z, G, J, O2, (C) => {
      S.value = false, C === g.Finished && (w(N2) || (n2.value = "hidden", p2(m2), t$1("afterLeave")));
    })));
  }
  return onMounted(() => {
    watch([i], (o2, c2, u2) => {
      Q(u2), R2.value = false;
    }, { immediate: true });
  }), provide(F, N2), c(computed(() => u(n2.value, { ["visible"]: l$1.Open, ["hidden"]: l$1.Closed }))), () => {
    let { appear: o2, show: c2, enter: u2, enterFrom: C, enterTo: de2, entered: ve, leave: pe, leaveFrom: me, leaveTo: Te, ...W } = e2;
    return P({ theirProps: W, ourProps: { ref: r2 }, slot: {}, slots: s2, attrs: a2, features: _, visible: n2.value === "visible", name: "TransitionChild" });
  };
} }), ue = oe, fe = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s2 }) {
  let v2 = p(), r2 = computed(() => e2.show === null && v2 !== null ? u(v2.value, { [l$1.Open]: true, [l$1.Closed]: false }) : e2.show);
  watchEffect(() => {
    if (![true, false].includes(r2.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let n2 = ref(r2.value ? "visible" : "hidden"), l2 = K(() => {
    n2.value = "hidden";
  }), i = ref(true), x2 = { show: r2, appear: computed(() => e2.appear || !i.value) };
  return onMounted(() => {
    watchEffect(() => {
      i.value = false, r2.value ? n2.value = "visible" : w(l2) || (n2.value = "hidden");
    });
  }), provide(F, l2), provide(B, x2), () => {
    let g2 = w$1(e2, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), p2 = { unmount: e2.unmount };
    return P({ ourProps: { ...p2, as: "template" }, theirProps: {}, slot: {}, slots: { ...s2, default: () => [h$1(ue, { onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave"), ...a2, ...p2, ...g2 }, s2.default)] }, attrs: {}, features: _, visible: n2.value === "visible", name: "Transition" });
  };
} });
const _sfc_main$s = {
  __name: "SortDropdown",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ["select"],
  setup(__props, { emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SortDropdown.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "Filter",
  __ssrInlineRender: true,
  setup(__props) {
    const filterOptions = ref([
      { text: "\u89C0\u770B\u6B21\u6578", value: "" },
      { text: "\u6536\u85CF\u6B21\u6578", value: "" },
      { text: "\u4E0A\u50B3\u65E5\u671F(\u6700\u65B0)", value: "" },
      { text: "\u4E0A\u50B3\u65E5\u671F(\u6700\u820A)", value: "" }
    ]);
    const filterSelect = (select) => {
      return select;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SortDropdown = _sfc_main$s;
      _push(ssrRenderComponent(_component_SortDropdown, mergeProps({
        options: filterOptions.value,
        onSelect: filterSelect
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Filter.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
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
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app2) {
      setActivePinia(pinia);
      {
        pinia._a = app2;
        app2.provide(piniaSymbol, pinia);
        app2.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
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
  function setup() {
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
  store2 = createSetupStore(id, setup, options, pinia, hot, true);
  store2.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  };
  return store2;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
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
    return scope.run(() => setup());
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
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
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
        createSetupStore(id, setup, options, pinia);
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
    if (expires)
      store.set(
        `${key}${this.suffix}`,
        Date.parse(String(new Date())) + expires * 1e3
      );
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
    const { code, error, data } = await useHttpFetchPost("/user/person");
    if (error && code === 1005) {
      const storeRefreshToken = storage.get("refreshToken");
      await refreshToken(storeRefreshToken);
    } else {
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
    }))(form);
    if (JSON.stringify(form) === JSON.stringify(updatePick))
      return $alert.value = {
        type: "info",
        text: "\u672A\u4FEE\u6539\u500B\u4EBA\u8CC7\u6599",
        center: true
      };
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
    if (error) {
      return $alert.value = { type: "error", text: message, center: true };
    }
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
    for (const key in obj) {
      info.value[key] = obj[key];
    }
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
    const $alert = useState("alert");
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
    const { error, message, data } = await useHttpFetchPost("/auth/forgot", {
      body: {
        phone: forgotForm.phone,
        password: forgotForm.password,
        passwordConfirm: forgotForm.passwordConfirm,
        verifyCode: forgotForm.verifyCode
      }
    });
    const $alert = useState("alert");
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
      var _a;
      storage.remove("userInfo");
      storage.remove("token");
      const isLoginState = useState("isLogin");
      isLoginState.value = false;
      isLogin.value = false;
      info.value = null;
      token.value = "";
      const route = useRoute();
      const router = useRouter();
      const middleware = (_a = route.meta.middleware) != null ? _a : [];
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
const fetchConfig = {
  baseURL: "/api"
};
function useGetFetchOptions(options = {}) {
  var _a, _b, _c, _d, _e;
  options.baseURL = (_a = options.baseURL) != null ? _a : fetchConfig.baseURL;
  options.headers = (_b = options.headers) != null ? _b : {};
  options.initialCache = (_c = options.initialCache) != null ? _c : false;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.async = (_e = options.async) != null ? _e : false;
  options.body = { ...options.body, server: true };
  if (options.multipart) {
    options.headers = {
      ...options.headers,
      Accept: "*/*",
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
      "$8vqA66Og8F"
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
      var _a;
      const msg = (_a = err == null ? void 0 : err.data) == null ? void 0 : _a.data;
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
  }, "$GUC9qGhG6d");
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
    code,
    message = "",
    data = null
  } = await $fetch(fetchConfig.baseURL + url, { ...options });
  if (error && code === 1005) {
    const router = useRouter();
    router.push("/");
  }
  return {
    code,
    error,
    message,
    data
  };
}
function useHttpFetchPost(url, options = {}) {
  options.method = "POST";
  return useHttpFetch(url, options);
}
const meta$e = {
  layout: "blog"
};
const meta$d = void 0;
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r2) => {
    var _a;
    return ((_a = route.params[r2.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m2) => {
    var _a2;
    return ((_a2 = m2.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h$1(component, props === true ? {} : props, slots) : h$1(Fragment, {}, slots) };
};
const __nuxt_component_1$1 = defineComponent({
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
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!((_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition);
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
              (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive,
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
const _hoisted_1$o = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$o = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4Z"
}, null, -1);
const _hoisted_3$o = [
  _hoisted_2$o
];
function render$o(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$o, _hoisted_3$o);
}
const UilUser = { name: "uil-user", render: render$o };
const _hoisted_1$n = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$n = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M9 10h1a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm11-3.06a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19a.32.32 0 0 0-.09 0a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"
}, null, -1);
const _hoisted_3$n = [
  _hoisted_2$n
];
function render$n(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$n, _hoisted_3$n);
}
const UilFileAlt = { name: "uil-file-alt", render: render$n };
const _hoisted_1$m = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$m = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84Zm-1.41 7.46l-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6a4.27 4.27 0 0 1 6 0a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 0a4.29 4.29 0 0 1 .08 6Z"
}, null, -1);
const _hoisted_3$m = [
  _hoisted_2$m
];
function render$m(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$m, _hoisted_3$m);
}
const UilHeart = { name: "uil-heart", render: render$m };
const _hoisted_1$l = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$l = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M17.09 2.82a8 8 0 0 0-6.68-1.66a8 8 0 0 0-6.27 6.32a8.07 8.07 0 0 0 1.72 6.65A4.54 4.54 0 0 1 7 17v3a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-2.81A5.17 5.17 0 0 1 18.22 14a8 8 0 0 0-1.13-11.2ZM15 20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1h6Zm1.67-7.24A7.13 7.13 0 0 0 15 17h-2v-3a1 1 0 0 0-2 0v3H9a6.5 6.5 0 0 0-1.6-4.16a6 6 0 0 1 3.39-9.72A6 6 0 0 1 18 9a5.89 5.89 0 0 1-1.33 3.76Z"
}, null, -1);
const _hoisted_3$l = [
  _hoisted_2$l
];
function render$l(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$l, _hoisted_3$l);
}
const UilLightbulbAlt = { name: "uil-lightbulb-alt", render: render$l };
const _hoisted_1$k = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$k = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m12.59 13l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H3a1 1 0 0 0 0 2ZM12 2a10 10 0 0 0-9 5.55a1 1 0 0 0 1.8.9A8 8 0 1 1 12 20a7.93 7.93 0 0 1-7.16-4.45a1 1 0 0 0-1.8.9A10 10 0 1 0 12 2Z"
}, null, -1);
const _hoisted_3$k = [
  _hoisted_2$k
];
function render$k(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$k, _hoisted_3$k);
}
const UilSignOutAlt = { name: "uil-sign-out-alt", render: render$k };
const meta$c = {
  middleware: ["auth"]
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "Form",
  __ssrInlineRender: true,
  emits: ["submit"],
  setup(__props, { emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<button type="submit" hidden></button></form>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = {
  __name: "Text",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    center: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "md"
    },
    id: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const defaultStyle = computed(
      () => props.disabled ? `
  block w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  text-opacity-50
  dark:border-gray-50/[0.2] dark:bg-gray-800` : `
  block w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
    );
    const labelSizeStyles = reactive({
      lg: "text-base",
      md: "text-sm",
      sm: "text-xs",
      xs: "text-xs"
    });
    const inputSizeStyles = reactive({
      lg: "h-12 px-4 text-lg rounded-lg",
      md: "h-10 px-4 text-base rounded",
      sm: "h-8 px-4 text-sm rounded",
      xs: "h-7 px-4 text-xs rounded"
    });
    const labelSize = computed(
      () => labelSizeStyles[props.size] || labelSizeStyles.md
    );
    const inputSize = computed(
      () => inputSizeStyles[props.size] || inputSizeStyles.md
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass([unref(labelSize), "flex items-center mb-2"])}"><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}">${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="relative model"><input${ssrRenderAttr("id", __props.id)} type="text" class="${ssrRenderClass([{ "text-center": __props.center }, unref(defaultStyle), unref(inputSize)])}"${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("value", props.modelValue || __props.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}><div class="absolute transform -translate-y-1/2 right-2 top-1/2">`);
      ssrRenderSlot(_ctx.$slots, "symbol", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Text.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = {
  __name: "Captcha",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    length: {
      type: Number,
      default: 6
    },
    getCaptcha: {
      type: Function,
      default: () => {
      }
    }
  },
  emits: ["update:modelValue", "captcha"],
  setup(__props, { emit }) {
    const defaultStyle = `
  block w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800
`;
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-1 form-group form-group__captcha" }, _attrs))}><label${ssrRenderAttr("for", __props.id)} class="block mb-2 font-bold tracking-wide cursor-pointer text-sm">${ssrInterpolate(__props.label)}</label><div class="flex"><input${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass([defaultStyle, "h-10 px-4 text-base rounded mr-4"])}" type="text"${ssrRenderAttr("value", __props.modelValue)}><div class="flex cursor-pointer items-center justify-center rounded bg-blue-500 text-white ml-auto text-sm truncate w-20"> \u767C\u9001 </div></div></div>`);
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Captcha.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const meta$b = void 0;
const meta$a = void 0;
const meta$9 = void 0;
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "Image",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const imageData = ref("");
    const labelSizeStyles = reactive({
      lg: "text-base",
      md: "text-sm",
      sm: "text-xs",
      xs: "text-xs"
    });
    const labelSize = computed(() => labelSizeStyles.md);
    useState("message");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-cd586c4d><div class="${ssrRenderClass([unref(labelSize), "flex items-center mb-2"])}" data-v-cd586c4d><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}" data-v-cd586c4d>${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="${ssrRenderClass([{ model: !imageData.value }, "relative border border-gray-300 border-opacity-40 rounded dark:bg-white/[0.05] bg-gray-100"])}" data-v-cd586c4d>`);
      if (imageData.value.length > 0) {
        _push(`<div data-v-cd586c4d><img class="preview w-full h-full"${ssrRenderAttr("src", imageData.value)} data-v-cd586c4d></div>`);
      } else {
        _push(`<div class="p-c text-xs" data-v-cd586c4d>\u9EDE\u64CA\u4E0A\u50B3\u5716\u7247</div>`);
      }
      _push(`<input${ssrRenderAttr("id", __props.id)} type="file" accept="image/*" class="absolute w-full h-full cursor-pointer opacity-0 top-0 left-0"${ssrIncludeBooleanAttr(__props.required) ? " required" : ""} data-v-cd586c4d></div></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Image.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-cd586c4d"]]);
const meta$8 = void 0;
const _sfc_main$m = {
  __name: "Date",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    },
    id: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const defaultStyle = computed(
      () => props.disabled ? `
  block w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  text-opacity-50
  dark:border-gray-50/[0.2] dark:bg-gray-800` : `
  block w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
    );
    const labelSizeStyles = reactive({
      lg: "text-base",
      md: "text-sm",
      sm: "text-xs",
      xs: "text-xs"
    });
    const inputSizeStyles = reactive({
      lg: "h-12 px-4 text-lg rounded-lg",
      md: "h-10 px-4 text-base rounded",
      sm: "h-8 px-4 text-sm rounded",
      xs: "h-7 px-4 text-xs rounded"
    });
    const labelSize = computed(
      () => labelSizeStyles[props.size] || labelSizeStyles.md
    );
    const inputSize = computed(
      () => inputSizeStyles[props.size] || inputSizeStyles.md
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-group form-group_select" }, _attrs))} data-v-85ac86be><div class="${ssrRenderClass([unref(labelSize), "flex items-center mb-2"])}" data-v-85ac86be><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}" data-v-85ac86be>${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="model relative" data-v-85ac86be><input${ssrRenderAttr("id", __props.id)} type="date" class="${ssrRenderClass([unref(defaultStyle), unref(inputSize)])}"${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("value", props.modelValue || __props.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""} data-v-85ac86be></div></div>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Date.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-85ac86be"]]);
const _sfc_main$l = {
  __name: "Radio",
  __ssrInlineRender: true,
  props: {
    id: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const defaultStyle = computed(
      () => props.disabled ? `
  w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  text-opacity-50
  dark:border-gray-50/[0.2] dark:bg-gray-800` : `
  w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
    );
    const inputSizeStyles = reactive({
      lg: "h-12 px-4 text-lg rounded-lg",
      md: "h-10 px-4 text-base rounded",
      sm: "h-8 px-4 text-sm rounded",
      xs: "h-7 px-4 text-xs rounded"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-group form-group_input__radio" }, _attrs))} data-v-a4fece0e><label${ssrRenderAttr("for", __props.id)} class="block mb-2 font-bold tracking-wide cursor-pointer text-sm" data-v-a4fece0e>${ssrInterpolate(__props.label)}</label><div role="radiogroup" class="${ssrRenderClass([[unref(defaultStyle), inputSizeStyles.md], "flex flex-wrap space-x-3"])}" data-v-a4fece0e><!--[-->`);
      ssrRenderList(__props.options, (option, index) => {
        _push(`<div class="flex items-center py-3" data-v-a4fece0e><div class="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative" data-v-a4fece0e><input${ssrRenderAttr("id", option.value)}${ssrIncludeBooleanAttr(index === 0) ? " checked" : ""}${ssrRenderAttr("value", option.value)} type="radio" name="radio" class="checkbox appearance-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none" data-v-a4fece0e><div class="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" data-v-a4fece0e></div></div><label${ssrRenderAttr("for", option.value)} class="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100" data-v-a4fece0e>${ssrInterpolate(option.label)}</label></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Radio.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-a4fece0e"]]);
const __nuxt_component_5$1 = defineComponent({
  name: "ClientOnly",
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_2, { slots }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
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
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "Editor",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    },
    id: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  async setup(__props, { emit }) {
    const props = __props;
    computed(
      () => `
  w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
    );
    const labelSizeStyles = reactive({
      lg: "text-base",
      md: "text-sm",
      sm: "text-xs",
      xs: "text-xs"
    });
    const inputSizeStyles = reactive({
      lg: "text-lg rounded-lg",
      md: "text-base rounded",
      sm: "text-sm rounded",
      xs: "text-xs rounded"
    });
    const labelSize = computed(
      () => labelSizeStyles[props.size] || labelSizeStyles.md
    );
    computed(
      () => inputSizeStyles[props.size] || inputSizeStyles.md
    );
    const editor = ref(null);
    watch(
      () => props.modelValue,
      (val) => {
        if (!val.length) {
          editor.value.setHTML("");
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_5$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-503145fc><div class="${ssrRenderClass([unref(labelSize), "fic mb-2"])}" data-v-503145fc><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}" data-v-503145fc>${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="relative model" data-v-503145fc>`);
      _push(ssrRenderComponent(_component_client_only, null, null, _parent));
      _push(`<div class="absolute transform -translate-y-1/2 right-2 top-1/2" data-v-503145fc>`);
      ssrRenderSlot(_ctx.$slots, "symbol", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Editor.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-503145fc"]]);
const meta$7 = void 0;
const _hoisted_1$j = {
  viewBox: "0 0 512 512",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$j = /* @__PURE__ */ createElementVNode("path", {
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "32",
  d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112Z"
}, null, -1);
const _hoisted_3$j = /* @__PURE__ */ createElementVNode("circle", {
  cx: "256",
  cy: "256",
  r: "80",
  fill: "none",
  stroke: "currentColor",
  "stroke-miterlimit": "10",
  "stroke-width": "32"
}, null, -1);
const _hoisted_4$3 = [
  _hoisted_2$j,
  _hoisted_3$j
];
function render$j(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$j, _hoisted_4$3);
}
const IonEyeOutline = { name: "ion-eye-outline", render: render$j };
const _hoisted_1$i = {
  viewBox: "0 0 512 512",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$i = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448Zm-176.34-64c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47Zm235.18-145.4c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78Z"
}, null, -1);
const _hoisted_3$i = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160Zm-90.22 73.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38Z"
}, null, -1);
const _hoisted_4$2 = [
  _hoisted_2$i,
  _hoisted_3$i
];
function render$i(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$i, _hoisted_4$2);
}
const IonEyeOffOutline = { name: "ion-eye-off-outline", render: render$i };
const _sfc_main$j = {
  __name: "Password",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    },
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const showPw = ref$1(true);
    const defaultStyle = computed(
      () => props.disabled ? `
  block w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  dark:border-gray-50/[0.2] dark:bg-gray-800` : `
  block w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
    );
    const labelSizeStyles = reactive({
      lg: "text-base",
      md: "text-sm",
      sm: "text-xs",
      xs: "text-xs"
    });
    const inputSizeStyles = reactive({
      lg: "h-12 px-4 text-lg rounded-lg",
      md: "h-10 px-4 text-base rounded",
      sm: "h-8 px-4 text-sm rounded",
      xs: "h-7 px-4 text-xs rounded"
    });
    const labelSize = computed(
      () => labelSizeStyles[props.size] || labelSizeStyles.md
    );
    const inputSize = computed(
      () => inputSizeStyles[props.size] || inputSizeStyles.md
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass([unref(labelSize), "flex items-center mb-2"])}"><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}">${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="flex items-center"><div class="relative model flex-1"><input${ssrRenderAttr("id", __props.id)} class="${ssrRenderClass([unref(defaultStyle), unref(inputSize)])}"${ssrRenderAttr("type", showPw.value ? "password" : "text")}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("value", __props.modelValue || __props.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} autocomplete="on"><div class="absolute flex transform -translate-y-1/2 icon top-1/2 right-2 cursor-pointer">`);
      _push(ssrRenderComponent(unref(IonEyeOutline), {
        style: showPw.value ? null : { display: "none" },
        class: { disabled: __props.disabled }
      }, null, _parent));
      _push(ssrRenderComponent(unref(IonEyeOffOutline), {
        style: !showPw.value ? null : { display: "none" }
      }, null, _parent));
      _push(`</div></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Password.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const meta$6 = void 0;
const _hoisted_1$h = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$h = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
}, null, -1);
const _hoisted_3$h = [
  _hoisted_2$h
];
function render$h(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$h, _hoisted_3$h);
}
const __unplugin_components_1$3 = { name: "mdi-heart", render: render$h };
const _hoisted_1$g = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$g = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
}, null, -1);
const _hoisted_3$g = [
  _hoisted_2$g
];
function render$g(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$g, _hoisted_3$g);
}
const __unplugin_components_0$5 = { name: "mdi-heart-outline", render: render$g };
const _hoisted_1$f = {
  viewBox: "0 0 512 512",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$f = /* @__PURE__ */ createElementVNode("path", {
  d: "M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$f = /* @__PURE__ */ createElementVNode("path", {
  d: "M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$1 = [
  _hoisted_2$f,
  _hoisted_3$f
];
function render$f(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$f, _hoisted_4$1);
}
const __unplugin_components_0$4 = { name: "ion-ios-close-circle-outline", render: render$f };
const _hoisted_1$e = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$e = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z",
  opacity: ".5"
}, null, -1);
const _hoisted_3$e = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
}, [
  /* @__PURE__ */ createElementVNode("animateTransform", {
    attributeName: "transform",
    dur: "1s",
    from: "0 12 12",
    repeatCount: "indefinite",
    to: "360 12 12",
    type: "rotate"
  })
], -1);
const _hoisted_4 = [
  _hoisted_2$e,
  _hoisted_3$e
];
function render$e(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$e, _hoisted_4);
}
const EosIconsLoading = { name: "eos-icons-loading", render: render$e };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Row",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const $bodyLock = useState("body.lock");
    const dialogInfo = ref({});
    const dialogShow = ref(false);
    const dialogLoading = ref(false);
    const closeDialog = () => {
      dialogShow.value = false;
      $bodyLock.value = false;
      setTimeout(() => {
        dialogInfo.value = {};
      }, 150);
    };
    const collection = async (id) => {
      const { data, error } = await useHttpFetchPost("/tip/collection", {
        body: { id }
      });
      if (!error)
        dialogInfo.value.isCollection = data.status;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><!--[-->`);
      ssrRenderList(__props.list, (item) => {
        _push(`<div class="flex items-center flex-wrap py-3 px-5 border bg-transparent border-gray-400/[0.4] dark:border-gray-600/[0.3] dark:border-gray-50/[0.2] mb-2 last-mb-0 rounded-sm dark:shadow cursor-pointer duration-200"><div class="title font-bold mr-auto">${ssrInterpolate(item.title)}</div><div class="text-sm">${ssrInterpolate(item.publishDate)}</div></div>`);
      });
      _push(`<!--]-->`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(unref(fe), {
          show: dialogShow.value,
          appear: ""
        }, {
          default: withCtx((_2, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(ssrRenderComponent(unref(oe), {
                as: "template",
                enter: "duration-150 linear",
                "enter-from": "opacity-0",
                "enter-to": "opacity-100",
                leave: "duration-150 linear",
                "leave-from": "opacity-100",
                "leave-to": "opacity-0"
              }, {
                default: withCtx((_22, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<div class="fixed top-0 left-0 w-full h-full z-20"${_scopeId2}><div class="absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50"${_scopeId2}>`);
                    if (dialogLoading.value) {
                      _push4(ssrRenderComponent(unref(EosIconsLoading), { class: "absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl" }, null, _parent3, _scopeId2));
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</div>`);
                    if (!dialogLoading.value) {
                      _push4(`<div class="px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"${_scopeId2}>`);
                      if (dialogInfo.value.title) {
                        _push4(`<div class="bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-3 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"${_scopeId2}>${ssrInterpolate(dialogInfo.value.title)} <div class="flex items-center space-x-3"${_scopeId2}><div class="cursor-pointer flex items-center"${_scopeId2}>`);
                        _push4(ssrRenderComponent(unref(__unplugin_components_0$5), {
                          style: !dialogInfo.value.isCollection ? null : { display: "none" },
                          class: "w-6"
                        }, null, _parent3, _scopeId2));
                        _push4(ssrRenderComponent(unref(__unplugin_components_1$3), {
                          style: dialogInfo.value.isCollection ? null : { display: "none" },
                          class: "text-red-600 w-6"
                        }, null, _parent3, _scopeId2));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(__unplugin_components_0$4), {
                          class: "text-2xl w-6 cursor-pointer",
                          onClick: closeDialog
                        }, null, _parent3, _scopeId2));
                        _push4(`</div></div>`);
                      } else {
                        _push4(`<!---->`);
                      }
                      _push4(`<div class="text-sm opacity-60"${_scopeId2}>${ssrInterpolate(dialogInfo.value.publishDate)}</div>`);
                      if (dialogInfo.value.content) {
                        _push4(`<div class="py-4"${_scopeId2}>${dialogInfo.value.content}</div>`);
                      } else {
                        _push4(`<!---->`);
                      }
                      _push4(`</div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "fixed top-0 left-0 w-full h-full z-20" }, [
                        createVNode("div", {
                          class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",
                          onClick: closeDialog
                        }, [
                          dialogLoading.value ? (openBlock(), createBlock(unref(EosIconsLoading), {
                            key: 0,
                            class: "absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                          })) : createCommentVNode("", true)
                        ]),
                        !dialogLoading.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"
                        }, [
                          dialogInfo.value.title ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-3 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"
                          }, [
                            createTextVNode(toDisplayString(dialogInfo.value.title) + " ", 1),
                            createVNode("div", { class: "flex items-center space-x-3" }, [
                              createVNode("div", {
                                class: "cursor-pointer flex items-center",
                                onClick: ($event) => collection(dialogInfo.value.id)
                              }, [
                                withDirectives(createVNode(unref(__unplugin_components_0$5), { class: "w-6" }, null, 512), [
                                  [vShow, !dialogInfo.value.isCollection]
                                ]),
                                withDirectives(createVNode(unref(__unplugin_components_1$3), { class: "text-red-600 w-6" }, null, 512), [
                                  [vShow, dialogInfo.value.isCollection]
                                ])
                              ], 8, ["onClick"]),
                              createVNode(unref(__unplugin_components_0$4), {
                                class: "text-2xl w-6 cursor-pointer",
                                onClick: closeDialog
                              })
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "text-sm opacity-60" }, toDisplayString(dialogInfo.value.publishDate), 1),
                          dialogInfo.value.content ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "py-4",
                            innerHTML: dialogInfo.value.content
                          }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(oe), {
                  as: "template",
                  enter: "duration-150 linear",
                  "enter-from": "opacity-0",
                  "enter-to": "opacity-100",
                  leave: "duration-150 linear",
                  "leave-from": "opacity-100",
                  "leave-to": "opacity-0"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "fixed top-0 left-0 w-full h-full z-20" }, [
                      createVNode("div", {
                        class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",
                        onClick: closeDialog
                      }, [
                        dialogLoading.value ? (openBlock(), createBlock(unref(EosIconsLoading), {
                          key: 0,
                          class: "absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                        })) : createCommentVNode("", true)
                      ]),
                      !dialogLoading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"
                      }, [
                        dialogInfo.value.title ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-3 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"
                        }, [
                          createTextVNode(toDisplayString(dialogInfo.value.title) + " ", 1),
                          createVNode("div", { class: "flex items-center space-x-3" }, [
                            createVNode("div", {
                              class: "cursor-pointer flex items-center",
                              onClick: ($event) => collection(dialogInfo.value.id)
                            }, [
                              withDirectives(createVNode(unref(__unplugin_components_0$5), { class: "w-6" }, null, 512), [
                                [vShow, !dialogInfo.value.isCollection]
                              ]),
                              withDirectives(createVNode(unref(__unplugin_components_1$3), { class: "text-red-600 w-6" }, null, 512), [
                                [vShow, dialogInfo.value.isCollection]
                              ])
                            ], 8, ["onClick"]),
                            createVNode(unref(__unplugin_components_0$4), {
                              class: "text-2xl w-6 cursor-pointer",
                              onClick: closeDialog
                            })
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "text-sm opacity-60" }, toDisplayString(dialogInfo.value.publishDate), 1),
                        dialogInfo.value.content ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-4",
                          innerHTML: dialogInfo.value.content
                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tip/Row.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const meta$5 = void 0;
const meta$4 = void 0;
const meta$3 = void 0;
const _sfc_main$h = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 lg:px-8" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Header.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$1]]);
const _hoisted_1$d = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$d = /* @__PURE__ */ createElementVNode("g", {
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ createElementVNode("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }),
  /* @__PURE__ */ createElementVNode("path", { d: "M12 7v3.764a2 2 0 0 0 1.106 1.789L16 14" })
], -1);
const _hoisted_3$d = [
  _hoisted_2$d
];
function render$d(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$d, _hoisted_3$d);
}
const __unplugin_components_1$2 = { name: "majesticons-clock-line", render: render$d };
const _hoisted_1$c = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$c = /* @__PURE__ */ createElementVNode("g", { fill: "currentColor" }, [
  /* @__PURE__ */ createElementVNode("path", { d: "M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M12 8a3 3 0 1 0 0 6a3 3 0 0 0 0-6zm-5 3a5 5 0 1 1 10 0a5 5 0 0 1-10 0z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M12 16a5.003 5.003 0 0 0-4.716 3.333a1 1 0 1 1-1.885-.666a7.002 7.002 0 0 1 13.202 0a1 1 0 1 1-1.885.666A5.002 5.002 0 0 0 12 16z" })
], -1);
const _hoisted_3$c = [
  _hoisted_2$c
];
function render$c(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$c, _hoisted_3$c);
}
const __unplugin_components_0$3 = { name: "majesticons-user-circle-line", render: render$c };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Meta",
  __ssrInlineRender: true,
  props: {
    author: {
      type: Object,
      default: () => {
      }
    },
    publishTime: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_IconMajesticons58userCircleLine = __unplugin_components_0$3;
      const _component_IconMajesticons58clockLine = __unplugin_components_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-2 text-sm font-bold text-gray-600 dark:text-gray-400" }, _attrs))}><div class="space-y-2 lg:space-y-0 lg:flex lg:flex-wrap lg:space-x-4"><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_IconMajesticons58userCircleLine, null, null, _parent));
      _push(`<span>${ssrInterpolate(((_a = props.author) == null ? void 0 : _a.firstName) + ((_b = props.author) == null ? void 0 : _b.lastName))}</span></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_IconMajesticons58clockLine, null, null, _parent));
      _push(`<span>${ssrInterpolate(props.publishTime)}</span></div></div></div>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Meta.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Single",
  __ssrInlineRender: true,
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const { user } = useBaseStore();
    storeToRefs(user);
    useState("showAuth");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_5$1;
      _push(ssrRenderComponent(_component_client_only, _attrs, null, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Content/Single.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-e8a1a146"]]);
const _sfc_main$e = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`video`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Content/Video.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender]]);
const _imports_0$1 = "" + globalThis.__publicAssetsURL("user.png");
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Author",
  __ssrInlineRender: true,
  props: {
    author: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap" }, _attrs))}><div class="flex flex-wrap items-center w-full pb-4 border-gray-900/10 dark:border-gray-50/[0.2] lg:w-auto lg:pb-0 lg:pr-16 lg:mr-16 lg:border-b-0 lg:border-r-1"><div class="mr-6 overflow-hidden rounded-full shadow-sm shadow w-16 h-16 shadow-blue-200"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div><div class="font-bold"><p class="pb-1 text-lg">${ssrInterpolate(((_a = props.author) == null ? void 0 : _a.firstName) + ((_b = props.author) == null ? void 0 : _b.lastName))}</p><p class="text-sm tracking-widest dark:text-gray-400"> \u5C08\u6B04\u7DE8\u8F2F </p></div></div><div class="flex-1 py-3 space-y-3 text-sm text-gray-800 lg:pr-4 dark:text-gray-300">${((_c = props.author) == null ? void 0 : _c.intro) || "\u5C1A\u672A\u8F38\u5165\u81EA\u6211\u4ECB\u7D39"}</div></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Author.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {
  __name: "Column",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: () => []
    },
    infinite: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_IconFluent58thumb_like_16_filled = __unplugin_components_0$6;
      const _component_IconRi58eye_fill = __unplugin_components_1$4;
      const _component_ArticleLoopRowLoading = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "block" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.list, (article) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          key: article.id,
          to: `/news/article/${article.slug}`,
          class: "flex pb-3 mb-3 border-gray-200 dark:border-gray-700 border-b-1 last-border-b-0 last-mb-0 last-pb-0"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-wrap w-full"${_scopeId}><div class="relative w-20 h-20 mr-4"${_scopeId}><img${ssrRenderAttr("src", article.thumbnail)} class="absolute object-cover w-full h-full"${_scopeId}></div><div class="flex flex-col content-between flex-1"${_scopeId}><h3 class="text-base font-bold ellipsis"${_scopeId}>${ssrInterpolate(article.title)}</h3><div class="flex flex-wrap justify-between w-full pt-1 pb-2 mt-auto text-xs text-gray-600 dark:text-gray-400"${_scopeId}><div class="flex w-full mb-1 space-x-4 text-gray-700 dark:text-gray-300" itemprop="author"${_scopeId}><p${_scopeId}>${ssrInterpolate(article.author)}</p><p${_scopeId}>${ssrInterpolate(article.categories)}</p></div><div class="flex"${_scopeId}><span class="tracking-wider" itemprop="create-date"${_scopeId}>${ssrInterpolate(article.publishTime)}</span></div><div class="flex"${_scopeId}><div class="flex items-center mr-3 space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_IconFluent58thumb_like_16_filled, { class: "text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(article.likes)}</span></div><div class="flex items-center mr-3 space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_IconRi58eye_fill, { class: "text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(article.views)}</span></div></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-wrap w-full" }, [
                  createVNode("div", { class: "relative w-20 h-20 mr-4" }, [
                    createVNode("img", {
                      src: article.thumbnail,
                      class: "absolute object-cover w-full h-full"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "flex flex-col content-between flex-1" }, [
                    createVNode("h3", { class: "text-base font-bold ellipsis" }, toDisplayString(article.title), 1),
                    createVNode("div", { class: "flex flex-wrap justify-between w-full pt-1 pb-2 mt-auto text-xs text-gray-600 dark:text-gray-400" }, [
                      createVNode("div", {
                        class: "flex w-full mb-1 space-x-4 text-gray-700 dark:text-gray-300",
                        itemprop: "author"
                      }, [
                        createVNode("p", null, toDisplayString(article.author), 1),
                        createVNode("p", null, toDisplayString(article.categories), 1)
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("span", {
                          class: "tracking-wider",
                          itemprop: "create-date"
                        }, toDisplayString(article.publishTime), 1)
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "flex items-center mr-3 space-x-2" }, [
                          createVNode(_component_IconFluent58thumb_like_16_filled, { class: "text-green-400" }),
                          createVNode("span", null, toDisplayString(article.likes), 1)
                        ]),
                        createVNode("div", { class: "flex items-center mr-3 space-x-2" }, [
                          createVNode(_component_IconRi58eye_fill, { class: "text-green-400" }),
                          createVNode("span", null, toDisplayString(article.views), 1)
                        ])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (__props.infinite && __props.loading) {
        _push(ssrRenderComponent(_component_ArticleLoopRowLoading, { class: "mt-2" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/Column.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Form",
  __ssrInlineRender: true,
  emits: ["submit"],
  setup(__props, { emit }) {
    const { user } = useBaseStore();
    const { isLogin, info } = storeToRefs(user);
    useState("showAuth");
    const message = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_UIFormEditor = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-5" }, _attrs))}>`);
      if (unref(isLogin)) {
        _push(`<div><div class="flex"><div class="mr-4"><div class="rounded-full overflow-hidden w-12 h-12"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div><div class="text-center text-xs mt-2">${ssrInterpolate(((_a = unref(info)) == null ? void 0 : _a.firstName) + ((_b = unref(info)) == null ? void 0 : _b.lastName))}</div></div><div class="flex-1">`);
        _push(ssrRenderComponent(_component_UIFormEditor, {
          modelValue: message.value,
          "onUpdate:modelValue": ($event) => message.value = $event,
          placeholder: "\u767C\u8868\u7559\u8A00...",
          class: "mb-3"
        }, null, _parent));
        _push(`<div class="cursor-pointer inline-block text-sm text-center bg-green-400 dark:bg-green-400 w-fit px-3 rounded h-8 leading-8 text-white"> \u9001\u51FA </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(isLogin)) {
        _push(`<div><div class="flex"><div class="mr-4"><div class="rounded-full overflow-hidden w-12 h-12"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div></div><div class="flex-1"><div class="w-full h-14 rounded py-2 px-4 text-sm mb-4 cursor-pointer bg-transparent dark:focus:bg-gray-300/[0.1] duration-200 border border-gray-300 dark:border-gray-300/[0.2]"><span class="opacity-70"> \u8ACB\u5148\u767B\u5165\u6703\u54E1...</span></div><div class="text-sm cursor-pointer inline-block text-center bg-green-500 px-3 rounded h-8 leading-8 text-white"> \u767B\u5165 </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Comment/Form.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _hoisted_1$b = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$b = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M13.12 2.06L7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37c-.59-.58-1.53-.58-2.11.01zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"
}, null, -1);
const _hoisted_3$b = [
  _hoisted_2$b
];
function render$b(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$b, _hoisted_3$b);
}
const __unplugin_components_3$2 = { name: "ic-round-thumb-up", render: render$b };
const _hoisted_1$a = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$a = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57l.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"
}, null, -1);
const _hoisted_3$a = [
  _hoisted_2$a
];
function render$a(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$a, _hoisted_3$a);
}
const __unplugin_components_2$2 = { name: "ic-outline-thumb-up", render: render$a };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Child",
  __ssrInlineRender: true,
  props: ["comment"],
  setup(__props) {
    useState("message");
    useState("auth");
    const { user } = useBaseStore();
    storeToRefs(user);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconIc58outlineThumbUp = __unplugin_components_2$2;
      const _component_IconIc58roundThumbUp = __unplugin_components_3$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex py-3 mb-1 border-b last:border-b-0 last:pb-0 last:mb-0 last-border-0 border-gray-200 dark:border-gray-700" }, _attrs))}><div class="rounded-full mr-4 overflow-hidden w-10 h-10"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div><div class="flex-1"><p class="text-sm">${ssrInterpolate(__props.comment.author)}</p><p class="text-xs opacity-80 pb-2">${ssrInterpolate(__props.comment.createTime)}</p><div class="pb-2">${__props.comment.content}</div><div class="flex items-center space-x-4"><div class="cursor-pointer flex items-center space-x-1">`);
      if (!__props.comment.isLike) {
        _push(ssrRenderComponent(_component_IconIc58outlineThumbUp, { class: "duration-300 w-4" }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_IconIc58roundThumbUp, { class: "text-blue-600 w-4" }, null, _parent));
      }
      _push(`<span class="min-w-3 text-left">${ssrInterpolate(__props.comment.likes)}</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Comment/Child.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _hoisted_1$9 = {
  viewBox: "0 0 512 512",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$9 = /* @__PURE__ */ createElementVNode("path", {
  d: "M128 320l128-128 128 128z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$9 = [
  _hoisted_2$9
];
function render$9(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, _hoisted_3$9);
}
const __unplugin_components_4 = { name: "ion-md-arrow-dropup", render: render$9 };
const _hoisted_1$8 = {
  viewBox: "0 0 512 512",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$8 = /* @__PURE__ */ createElementVNode("path", {
  d: "M128 192l128 128 128-128z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$8 = [
  _hoisted_2$8
];
function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$8, _hoisted_3$8);
}
const __unplugin_components_3$1 = { name: "ion-md-arrow-dropdown", render: render$8 };
const _hoisted_1$7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$7 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M12 9a1 1 0 1 0 1 1a1 1 0 0 0-1-1Zm7-7H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11.59l3.7 3.71A1 1 0 0 0 21 22a.84.84 0 0 0 .38-.08A1 1 0 0 0 22 21V5a3 3 0 0 0-3-3Zm1 16.59l-2.29-2.3A1 1 0 0 0 17 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM8 9a1 1 0 1 0 1 1a1 1 0 0 0-1-1Zm8 0a1 1 0 1 0 1 1a1 1 0 0 0-1-1Z"
}, null, -1);
const _hoisted_3$7 = [
  _hoisted_2$7
];
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$7, _hoisted_3$7);
}
const __unplugin_components_2$1 = { name: "uil-comment-alt-dots", render: render$7 };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Item",
  __ssrInlineRender: true,
  props: {
    comment: {
      type: Object,
      default: () => {
      }
    },
    articleId: {
      type: Number,
      default: null
    }
  },
  emits: ["like"],
  setup(__props) {
    const props = __props;
    const children = ref([]);
    ref({});
    const commentListOpen = ref(false);
    const $message = useState("message");
    useState("showAuth");
    const { user } = useBaseStore();
    storeToRefs(user);
    const submit = (e2) => {
      createComment(e2);
    };
    const createComment = async (content) => {
      const { error, message, data } = await useHttpFetchPost("/comment/create", {
        body: {
          content,
          articleId: props.articleId,
          parentId: props.comment.id
        }
      });
      if (error) {
        return $message.value = message;
      }
      children.value.unshift(data);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconIc58roundThumbUp = __unplugin_components_3$2;
      const _component_IconIc58outlineThumbUp = __unplugin_components_2$2;
      const _component_IconUil58commentAltDots = __unplugin_components_2$1;
      const _component_IconIon58mdArrowDropdown = __unplugin_components_3$1;
      const _component_IconIon58mdArrowDropup = __unplugin_components_4;
      const _component_ArticleCommentChild = _sfc_main$a;
      const _component_ArticleCommentForm = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-3 mb-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0 last:mb-0" }, _attrs))}><div class="flex w-full"><div class="rounded-full mr-4 overflow-hidden w-12 h-12"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div><div class="flex-1"><p class="text-sm">${ssrInterpolate(__props.comment.author)}</p><p class="text-xs opacity-80 pb-2">${ssrInterpolate(__props.comment.createTime)}</p><div class="pb-2">${__props.comment.content}</div><div class="flex items-center space-x-4"><div class="cursor-pointer flex items-center">`);
      _push(ssrRenderComponent(_component_IconIc58roundThumbUp, {
        style: __props.comment.isLike ? null : { display: "none" },
        class: "text-blue-600 w-4"
      }, null, _parent));
      _push(ssrRenderComponent(_component_IconIc58outlineThumbUp, {
        style: !__props.comment.isLike ? null : { display: "none" },
        class: "duration-300 w-4"
      }, null, _parent));
      _push(`<span class="min-w-3 text-left ml-1">${ssrInterpolate(__props.comment.likes)}</span></div><div class="flex items-center space-x-1 cursor-pointer">`);
      _push(ssrRenderComponent(_component_IconUil58commentAltDots, { class: "w-4" }, null, _parent));
      _push(`<span>${ssrInterpolate(__props.comment.comments)}</span></div></div>`);
      if (__props.comment.hasChild) {
        _push(`<!--[--><div class="w-fit text-sm cursor-pointer pt-4 pb-2 text-gary-800 dark:text-gray-200">`);
        if (!commentListOpen.value) {
          _push(`<div class="flex items-center text-sm space-x-2">`);
          _push(ssrRenderComponent(_component_IconIon58mdArrowDropdown, { class: "w-4 mr-1 flex items-center" }, null, _parent));
          _push(` \u5C55\u958B </div>`);
        } else {
          _push(`<!---->`);
        }
        if (commentListOpen.value) {
          _push(`<div class="flex items-center space-x-2">`);
          _push(ssrRenderComponent(_component_IconIon58mdArrowDropup, { class: "w-4 mr-1 flex items-center" }, null, _parent));
          _push(` \u6536\u8D77 </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (commentListOpen.value) {
          _push(`<div class="w-full"><div class="py-3 mb-1 border-b last:border-b-0 last-border-0 border-gray-200 dark:border-gray-700"><!--[-->`);
          ssrRenderList(children.value, (child) => {
            _push(ssrRenderComponent(_component_ArticleCommentChild, {
              key: child.id,
              comment: child
            }, null, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (commentListOpen.value) {
        _push(ssrRenderComponent(_component_ArticleCommentForm, {
          class: "pt-4",
          onSubmit: submit
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Comment/Item.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "Comment",
  __ssrInlineRender: true,
  props: {
    commentList: {
      type: Array,
      default: () => []
    },
    articleId: {
      type: Number,
      default: null
    }
  },
  emits: ["submit"],
  setup(__props, { emit }) {
    const submit = (e2) => {
      emit("submit", e2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArticleCommentForm = _sfc_main$b;
      const _component_ArticleCommentItem = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ArticleCommentForm, { onSubmit: submit }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(__props.commentList, (comment, index) => {
        _push(ssrRenderComponent(_component_ArticleCommentItem, {
          key: index,
          "article-id": __props.articleId,
          comment,
          onSubmit: submit
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Comment.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const meta$2 = {
  layout: "blog"
};
const meta$1 = {
  layout: "blog"
};
const meta = void 0;
const _routes = [
  {
    name: "404",
    path: "/:catchAll(.*)*",
    file: "/Users/kurou/project/nuxt3-awesome-starter/pages/404.vue",
    children: [],
    meta: meta$f,
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/404.4687724e.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "index",
    path: "/",
    file: "/Users/kurou/project/nuxt3-awesome-starter/pages/index.vue",
    children: [],
    meta: meta$e,
    alias: (meta$e == null ? void 0 : meta$e.alias) || [],
    redirect: (meta$e == null ? void 0 : meta$e.redirect) || void 0,
    component: () => import('./_nuxt/index.97f51e39.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "member-rule",
    path: "/member-rule",
    file: "/Users/kurou/project/nuxt3-awesome-starter/pages/member-rule.vue",
    children: [],
    meta: meta$d,
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/member-rule.ffd02188.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "my",
    path: "/my",
    file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my.vue",
    children: [
      {
        name: "my-account-change-phone",
        path: "account/change-phone",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/account/change-phone.vue",
        children: [],
        meta: meta$b,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/change-phone.5d74d434.mjs').then((m2) => m2.default || m2)
      },
      {
        name: "my-account-email-binding",
        path: "account/email-binding",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/account/email-binding.vue",
        children: [],
        meta: meta$a,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/email-binding.2a6caf6e.mjs').then((m2) => m2.default || m2)
      },
      {
        name: "my-account-email-verify",
        path: "account/email-verify",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/account/email-verify.vue",
        children: [],
        meta: meta$9,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/email-verify.86e4997c.mjs').then((m2) => m2.default || m2)
      },
      {
        name: "my-account-identify-verify",
        path: "account/identify-verify",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/account/identify-verify.vue",
        children: [],
        meta: meta$8,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/identify-verify.4bae69ba.mjs').then((m2) => m2.default || m2)
      },
      {
        name: "my-account",
        path: "account",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/account/index.vue",
        children: [],
        meta: meta$7,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/index.b7a7841c.mjs').then((m2) => m2.default || m2)
      },
      {
        name: "my-account-reset-password",
        path: "account/reset-password",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/account/reset-password.vue",
        children: [],
        meta: meta$6,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/reset-password.855ea575.mjs').then((m2) => m2.default || m2)
      },
      {
        name: "my-collections",
        path: "collections",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/collections.vue",
        children: [],
        meta: meta$5,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/collections.5b66cfe6.mjs').then((m2) => m2.default || m2)
      },
      {
        name: "my-history",
        path: "history",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/history.vue",
        children: [],
        meta: meta$4,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/history.4de103a5.mjs').then((m2) => m2.default || m2)
      },
      {
        name: "my-tips",
        path: "tips",
        file: "/Users/kurou/project/nuxt3-awesome-starter/pages/my/tips.vue",
        children: [],
        meta: meta$3,
        alias: [],
        redirect: void 0,
        component: () => import('./_nuxt/tips.ac95dd7d.mjs').then((m2) => m2.default || m2)
      }
    ],
    meta: meta$c,
    alias: (meta$c == null ? void 0 : meta$c.alias) || [],
    redirect: (meta$c == null ? void 0 : meta$c.redirect) || void 0,
    component: () => import('./_nuxt/my.4b8bc3c3.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "news-article-articleSlug",
    path: "/news/article/:articleSlug",
    file: "/Users/kurou/project/nuxt3-awesome-starter/pages/news/article/[articleSlug].vue",
    children: [],
    meta: meta$2,
    alias: (meta$2 == null ? void 0 : meta$2.alias) || [],
    redirect: (meta$2 == null ? void 0 : meta$2.redirect) || void 0,
    component: () => import('./_nuxt/_articleSlug_.0fd364fb.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "news-category-categorySlug",
    path: "/news/category/:categorySlug",
    file: "/Users/kurou/project/nuxt3-awesome-starter/pages/news/category/[categorySlug].vue",
    children: [],
    meta: meta$1,
    alias: (meta$1 == null ? void 0 : meta$1.alias) || [],
    redirect: (meta$1 == null ? void 0 : meta$1.redirect) || void 0,
    component: () => import('./_nuxt/_categorySlug_.3c5f83e5.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "news-type-video",
    path: "/news/type/video",
    file: "/Users/kurou/project/nuxt3-awesome-starter/pages/news/type/video.vue",
    children: [],
    meta,
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/video.d8cfa037.mjs').then((m2) => m2.default || m2)
  }
];
const routerOptions0 = {
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
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
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
  auth: () => import('./_nuxt/auth.5b16fa3a.mjs')
};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b, _c, _d;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b = (_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) != null ? _b : createMemoryHistory(routerBase);
  const routes = (_d = (_c = routerOptions.routes) == null ? void 0 : _c.call(routerOptions, _routes)) != null ? _d : _routes;
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
    var _a2, _b2, _c2, _d2;
    if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
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
    var _a2, _b2;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a2 = initialLayout.value) != null ? _a2 : to.meta.layout;
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
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r2) => r2.default || r2)) : entry2;
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
const plugins_navbar_ts_qw38FjZisw = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", () => {
    const showDrawer = useState("navbar.showDrawer", () => false);
    const showOptions = useState("navbar.showOptions", () => false);
    showDrawer.value = false;
    showOptions.value = false;
  });
});
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function setSSRHandler(key, fn) {
  handlers[key] = fn;
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
setSSRHandler("getDefaultStorage", () => {
  const cookieMap = /* @__PURE__ */ new Map();
  const get = (key) => {
    if (!cookieMap.get(key))
      cookieMap.set(key, useCookie(key, { maxAge: 2147483646 }));
    return cookieMap.get(key);
  };
  return {
    getItem: (key) => get(key).value,
    setItem: (key, value) => get(key).value = value,
    removeItem: (key) => get(key).value = void 0
  };
});
{
  setSSRHandler("updateHTMLAttrs", (selector, attr, value) => {
    if (selector === "html") {
      useMeta({
        htmlAttrs: {
          [attr]: value
        }
      });
    } else if (selector === "body") {
      useMeta({
        bodyAttrs: {
          [attr]: value
        }
      });
    } else {
      throw new Error(`Unsupported meta selector "${selector}" in SSR`);
    }
  });
}
const node_modules__64vueuse_nuxt_ssr_plugin_mjs_B4ptqVdIfe = defineNuxtPlugin(() => {
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq,
  plugins_navbar_ts_qw38FjZisw,
  node_modules__64vueuse_nuxt_ssr_plugin_mjs_B4ptqVdIfe
];
const _sfc_main$7 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.f117e8fc.mjs').then((r2) => r2.default || r2));
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
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
    var _a;
    const script = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
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
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
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
  setup: setupForUseMeta((_2, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
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
    const meta2 = { ...props };
    if (meta2.httpEquiv) {
      meta2["http-equiv"] = meta2.httpEquiv;
      delete meta2.httpEquiv;
    }
    return {
      meta: [meta2]
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
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
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
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
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
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
      const _component_NuxtLink = __nuxt_component_0$2;
      if (__props.to) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          tag: "a",
          to: __props.to,
          class: "transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline"
        }, _attrs), {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Anchor.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
      const _component_NuxtLink = __nuxt_component_0$2;
      if (__props.to) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          tag: "a",
          to: __props.to,
          class: `${defaultStyle} ${unref(selectedStyle)} ${unref(selectedSize)}`
        }, _attrs), {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Button.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _hoisted_1$6 = {
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$6 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M232 128a104 104 0 1 0-174.2 76.7l1.3 1.2a104 104 0 0 0 137.8 0l1.3-1.2A103.7 103.7 0 0 0 232 128Zm-192 0a88 88 0 1 1 153.8 58.4a79.2 79.2 0 0 0-36.1-28.7a48 48 0 1 0-59.4 0a79.2 79.2 0 0 0-36.1 28.7A87.6 87.6 0 0 1 40 128Zm56-8a32 32 0 1 1 32 32a32.1 32.1 0 0 1-32-32Zm-21.9 77.5a64 64 0 0 1 107.8 0a87.8 87.8 0 0 1-107.8 0Z"
}, null, -1);
const _hoisted_3$6 = [
  _hoisted_2$6
];
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, _hoisted_3$6);
}
const __unplugin_components_1$1 = { name: "ph-user-circle", render: render$6 };
const _hoisted_1$5 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$5 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M17 9.17a1 1 0 0 0-1.41 0L12 12.71L8.46 9.17a1 1 0 0 0-1.41 0a1 1 0 0 0 0 1.42l4.24 4.24a1 1 0 0 0 1.42 0L17 10.59a1 1 0 0 0 0-1.42Z"
}, null, -1);
const _hoisted_3$5 = [
  _hoisted_2$5
];
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_3$5);
}
const __unplugin_components_0$2 = { name: "uil-angle-down", render: render$5 };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
    const icons = {
      user: shallowRef(UilUser),
      fileAlt: shallowRef(UilFileAlt),
      heart: shallowRef(UilHeart),
      lightbulbAlt: shallowRef(UilLightbulbAlt),
      signOutAlt: shallowRef(UilSignOutAlt)
    };
    const userMenu = ref([
      { id: 1, icon: icons.user, label: "\u500B\u4EBA\u8CC7\u6599", path: "/my/account" },
      { id: 2, icon: icons.fileAlt, label: "\u700F\u89BD\u7D00\u9304", path: "/my/history" },
      { id: 3, icon: icons.heart, label: "\u6211\u7684\u6536\u85CF", path: "/my/collections" },
      { id: 4, icon: icons.lightbulbAlt, label: "\u5C0F\u77E5\u8B58", path: "/my/tips" },
      { id: 5, icon: icons.signOutAlt, label: "\u767B\u51FA", action: () => user.logout() }
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
      const _component_IconUil58angle_down = __unplugin_components_0$2;
      const _component_IconPh58user_circle = __unplugin_components_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center relative" }, _attrs))}>`);
      if (unref(currentStyle) === "dropdown-right-top") {
        _push(ssrRenderComponent(unref(Me), {
          modelValue: unref(sizeSetting),
          "onUpdate:modelValue": ($event) => isRef(sizeSetting) ? sizeSetting.value = $event : null,
          as: "div",
          class: "flex items-center"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Pe), { class: "sr-only" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
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
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  var _a, _b, _c, _d;
                  if (_push3) {
                    if (unref(isLogin)) {
                      _push3(`<div class="flex items-center justify-center ml-6 cursor-pointer"${_scopeId2}><img class="w-6 h-6 rounded-full"${ssrRenderAttr("src", _imports_0$1)}${_scopeId2}><span class="ml-2 text-sm font-semibold"${_scopeId2}>${ssrInterpolate(`${((_a = unref(info)) == null ? void 0 : _a.firstName) || ""}${((_b = unref(info)) == null ? void 0 : _b.lastName) || ""}`)}</span>`);
                      _push3(ssrRenderComponent(_component_IconUil58angle_down, null, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="flex items-center justify-center h-full ml-6 cursor-pointer"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_IconPh58user_circle, { class: "w-6 h-6" }, null, _parent3, _scopeId2));
                      _push3(`<span class="ml-2 text-sm font-semibold"${_scopeId2}>\u672A\u767B\u5165</span>`);
                      _push3(ssrRenderComponent(_component_IconUil58angle_down, null, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    }
                  } else {
                    return [
                      unref(isLogin) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-center ml-6 cursor-pointer"
                      }, [
                        createVNode("img", {
                          class: "w-6 h-6 rounded-full",
                          src: _imports_0$1
                        }),
                        createVNode("span", { class: "ml-2 text-sm font-semibold" }, toDisplayString(`${((_c = unref(info)) == null ? void 0 : _c.firstName) || ""}${((_d = unref(info)) == null ? void 0 : _d.lastName) || ""}`), 1),
                        createVNode(_component_IconUil58angle_down)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-center h-full ml-6 cursor-pointer",
                        onClick: ($event) => showAuth.value = true
                      }, [
                        createVNode(_component_IconPh58user_circle, { class: "w-6 h-6" }),
                        createVNode("span", { class: "ml-2 text-sm font-semibold" }, "\u672A\u767B\u5165"),
                        createVNode(_component_IconUil58angle_down)
                      ], 8, ["onClick"]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(isLogin)) {
                _push2(ssrRenderComponent(unref(Ve), { class: "absolute ring-1 ring-black mt-3 ring-opacity-5 top-full right-0 z-[999] mt-2 w-32 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0" }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(userMenu.value, (menu, index) => {
                        _push3(ssrRenderComponent(unref(Ae), { key: index }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="flex items-center w-full cursor-pointer items-center py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700/30"${_scopeId3}>`);
                              ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(menu.icon), { class: "mr-3" }, null), _parent4, _scopeId3);
                              _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(menu.label)}</span></div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  class: "flex items-center w-full cursor-pointer items-center py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700/30",
                                  onClick: ($event) => clickNav(menu.id)
                                }, [
                                  (openBlock(), createBlock(resolveDynamicComponent(menu.icon), { class: "mr-3" })),
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
                                (openBlock(), createBlock(resolveDynamicComponent(menu.icon), { class: "mr-3" })),
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
                    var _a, _b;
                    return [
                      unref(isLogin) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-center ml-6 cursor-pointer"
                      }, [
                        createVNode("img", {
                          class: "w-6 h-6 rounded-full",
                          src: _imports_0$1
                        }),
                        createVNode("span", { class: "ml-2 text-sm font-semibold" }, toDisplayString(`${((_a = unref(info)) == null ? void 0 : _a.firstName) || ""}${((_b = unref(info)) == null ? void 0 : _b.lastName) || ""}`), 1),
                        createVNode(_component_IconUil58angle_down)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-center h-full ml-6 cursor-pointer",
                        onClick: ($event) => showAuth.value = true
                      }, [
                        createVNode(_component_IconPh58user_circle, { class: "w-6 h-6" }),
                        createVNode("span", { class: "ml-2 text-sm font-semibold" }, "\u672A\u767B\u5165"),
                        createVNode(_component_IconUil58angle_down)
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
                            (openBlock(), createBlock(resolveDynamicComponent(menu.icon), { class: "mr-3" })),
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Navbar/User.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _hoisted_1$4 = {
  viewBox: "0 0 18 16",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$4 = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  d: "M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$4 = [
  _hoisted_2$4
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_3$4);
}
const __unplugin_components_0$1 = { name: "octicon-text-size", render: render$4 };
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
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Size",
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
      const _component_IconOcticon58text_size = __unplugin_components_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center" }, _attrs))}>`);
      if (unref(currentStyle) === "dropdown-right-top") {
        _push(ssrRenderComponent(unref(Me), {
          modelValue: unref(sizeSetting),
          "onUpdate:modelValue": ($event) => isRef(sizeSetting) ? sizeSetting.value = $event : null,
          as: "div",
          class: "relative flex items-center"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Pe), { class: "sr-only" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
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
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="flex items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_IconOcticon58text_size, null, null, _parent3, _scopeId2));
                    _push3(`</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "flex items-center justify-center" }, [
                        createVNode(_component_IconOcticon58text_size)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Ve), { class: "absolute mt-3 ring-1 ring-black ring-opacity-5 top-full right-0 z-20 mt-2 w-40 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
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
                      createVNode(_component_IconOcticon58text_size)
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Navbar/Size.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M15.098 12.634L13 11.423V7a1 1 0 0 0-2 0v5a1 1 0 0 0 .5.866l2.598 1.5a1 1 0 1 0 1-1.732ZM12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8.01 8.01 0 0 1-8 8Z"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
}
const __unplugin_components_3 = { name: "uil-clock", render: render$3 };
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M21 14h-1V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7H3a1 1 0 0 0-1 1v2a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-2a1 1 0 0 0-1-1ZM6 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7H6Zm14 10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1h16Z"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
}
const __unplugin_components_2 = { name: "uil-laptop", render: render$2 };
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M21.64 13a1 1 0 0 0-1.05-.14a8.05 8.05 0 0 1-3.37.73a8.15 8.15 0 0 1-8.14-8.1a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69a1 1 0 0 0-.36-1.05Zm-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14a9.79 9.79 0 0 0 2.1-.22a8.11 8.11 0 0 1-7.18 4.32Z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
const __unplugin_components_1 = { name: "uil-moon", render: render$1 };
const _hoisted_1 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m5.64 17l-.71.71a1 1 0 0 0 0 1.41a1 1 0 0 0 1.41 0l.71-.71A1 1 0 0 0 5.64 17ZM5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Zm7-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1ZM5.64 7.05a1 1 0 0 0 .7.29a1 1 0 0 0 .71-.29a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41Zm12 .29a1 1 0 0 0 .7-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.64.71a1 1 0 0 0 0 1.41a1 1 0 0 0 .66.29ZM21 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm-9 8a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Zm6.36-2A1 1 0 0 0 17 18.36l.71.71a1 1 0 0 0 1.41 0a1 1 0 0 0 0-1.41ZM12 6.5a5.5 5.5 0 1 0 5.5 5.5A5.51 5.51 0 0 0 12 6.5Zm0 9a3.5 3.5 0 1 1 3.5-3.5a3.5 3.5 0 0 1-3.5 3.5Z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const __unplugin_components_0 = { name: "uil-sun", render };
const availableThemes = [
  { key: "light", text: "\u65E5\u9593\u6A21\u5F0F" },
  { key: "dark", text: "\u591C\u9593\u6A21\u5F0F" },
  { key: "system", text: "\u7CFB\u7D71\u9810\u8A2D" },
  { key: "realtime", text: "\u5BE6\u969B\u6642\u9593" }
];
function ThemeManager() {
  const themeUserSetting = useCookie("theme");
  const getUserSetting = () => themeUserSetting.value || "system";
  const getSystemTheme = () => {
    try {
      return window ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "dark";
    } catch (error) {
      return "dark";
    }
  };
  const getRealtimeTheme = () => {
    const now = new Date();
    const hour = now.getHours();
    const isNight = hour >= 17 || hour <= 5;
    return isNight ? "dark" : "light";
  };
  const themeSetting = useState(
    "theme.setting",
    () => getUserSetting()
  );
  const themeCurrent = useState(
    "theme.current",
    () => "light"
  );
  const onThemeSettingChange = (themeSetting2) => {
    themeUserSetting.value = themeSetting2;
    if (themeSetting2 === "realtime") {
      themeCurrent.value = getRealtimeTheme();
    } else if (themeSetting2 === "system") {
      themeCurrent.value = getSystemTheme();
    } else {
      themeCurrent.value = themeSetting2;
    }
  };
  watch(themeSetting, (val) => onThemeSettingChange(val));
  onThemeSettingChange(themeSetting.value);
  return {
    themeSetting,
    themeCurrent,
    getUserSetting,
    getSystemTheme,
    getRealtimeTheme
  };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ThemeSwitcher",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "dropdown-right-top"
    }
  },
  setup(__props) {
    const props = __props;
    const themeSetting = useState("theme.setting");
    const currentStyle = toRef(props, "type");
    const t2 = (e2) => e2;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconUil58sun = __unplugin_components_0;
      const _component_IconUil58moon = __unplugin_components_1;
      const _component_IconUil58laptop = __unplugin_components_2;
      const _component_IconUil58clock = __unplugin_components_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center" }, _attrs))}>`);
      if (unref(currentStyle) === "dropdown-right-top") {
        _push(ssrRenderComponent(unref(Me), {
          modelValue: unref(themeSetting),
          "onUpdate:modelValue": ($event) => isRef(themeSetting) ? themeSetting.value = $event : null,
          as: "div",
          class: "relative flex items-center"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Pe), { class: "sr-only" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(t2("components.theme_switcher.theme"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(t2("components.theme_switcher.theme")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Ie), {
                type: "button",
                title: t2("components.theme_switcher.change_theme"),
                class: "transition-colors"
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="flex justify-center items-center dark:hidden"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_IconUil58sun, null, null, _parent3, _scopeId2));
                    _push3(`</span><span class="justify-center items-center hidden dark:flex"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_IconUil58moon, null, null, _parent3, _scopeId2));
                    _push3(`</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "flex justify-center items-center dark:hidden" }, [
                        createVNode(_component_IconUil58sun)
                      ]),
                      createVNode("span", { class: "justify-center items-center hidden dark:flex" }, [
                        createVNode(_component_IconUil58moon)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Ve), { class: "p-1 absolute z-50 top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(availableThemes), (theme) => {
                      _push3(ssrRenderComponent(unref(Ae), {
                        key: theme.key,
                        value: theme.key,
                        class: {
                          "py-2 px-2 flex items-center cursor-pointer": true,
                          "text-sky-500 bg-gray-100 dark:bg-gray-600/30": unref(themeSetting) === theme.key,
                          "hover:bg-gray-50 dark:hover:bg-gray-700/30": unref(themeSetting) !== theme.key
                        }
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="text-sm mr-2 flex items-center"${_scopeId3}>`);
                            if (theme.key === "light") {
                              _push4(ssrRenderComponent(_component_IconUil58sun, null, null, _parent4, _scopeId3));
                            } else if (theme.key === "dark") {
                              _push4(ssrRenderComponent(_component_IconUil58moon, null, null, _parent4, _scopeId3));
                            } else if (theme.key === "system") {
                              _push4(ssrRenderComponent(_component_IconUil58laptop, null, null, _parent4, _scopeId3));
                            } else if (theme.key === "realtime") {
                              _push4(ssrRenderComponent(_component_IconUil58clock, null, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</span> ${ssrInterpolate(theme.text)}`);
                          } else {
                            return [
                              createVNode("span", { class: "text-sm mr-2 flex items-center" }, [
                                theme.key === "light" ? (openBlock(), createBlock(_component_IconUil58sun, { key: 0 })) : theme.key === "dark" ? (openBlock(), createBlock(_component_IconUil58moon, { key: 1 })) : theme.key === "system" ? (openBlock(), createBlock(_component_IconUil58laptop, { key: 2 })) : theme.key === "realtime" ? (openBlock(), createBlock(_component_IconUil58clock, { key: 3 })) : createCommentVNode("", true)
                              ]),
                              createTextVNode(" " + toDisplayString(theme.text), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment$1, null, renderList(unref(availableThemes), (theme) => {
                        return openBlock(), createBlock(unref(Ae), {
                          key: theme.key,
                          value: theme.key,
                          class: {
                            "py-2 px-2 flex items-center cursor-pointer": true,
                            "text-sky-500 bg-gray-100 dark:bg-gray-600/30": unref(themeSetting) === theme.key,
                            "hover:bg-gray-50 dark:hover:bg-gray-700/30": unref(themeSetting) !== theme.key
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-sm mr-2 flex items-center" }, [
                              theme.key === "light" ? (openBlock(), createBlock(_component_IconUil58sun, { key: 0 })) : theme.key === "dark" ? (openBlock(), createBlock(_component_IconUil58moon, { key: 1 })) : theme.key === "system" ? (openBlock(), createBlock(_component_IconUil58laptop, { key: 2 })) : theme.key === "realtime" ? (openBlock(), createBlock(_component_IconUil58clock, { key: 3 })) : createCommentVNode("", true)
                            ]),
                            createTextVNode(" " + toDisplayString(theme.text), 1)
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
                    createTextVNode(toDisplayString(t2("components.theme_switcher.theme")), 1)
                  ]),
                  _: 1
                }),
                createVNode(unref(Ie), {
                  type: "button",
                  title: t2("components.theme_switcher.change_theme"),
                  class: "transition-colors"
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "flex justify-center items-center dark:hidden" }, [
                      createVNode(_component_IconUil58sun)
                    ]),
                    createVNode("span", { class: "justify-center items-center hidden dark:flex" }, [
                      createVNode(_component_IconUil58moon)
                    ])
                  ]),
                  _: 1
                }, 8, ["title"]),
                createVNode(unref(Ve), { class: "p-1 absolute z-50 top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment$1, null, renderList(unref(availableThemes), (theme) => {
                      return openBlock(), createBlock(unref(Ae), {
                        key: theme.key,
                        value: theme.key,
                        class: {
                          "py-2 px-2 flex items-center cursor-pointer": true,
                          "text-sky-500 bg-gray-100 dark:bg-gray-600/30": unref(themeSetting) === theme.key,
                          "hover:bg-gray-50 dark:hover:bg-gray-700/30": unref(themeSetting) !== theme.key
                        }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-sm mr-2 flex items-center" }, [
                            theme.key === "light" ? (openBlock(), createBlock(_component_IconUil58sun, { key: 0 })) : theme.key === "dark" ? (openBlock(), createBlock(_component_IconUil58moon, { key: 1 })) : theme.key === "system" ? (openBlock(), createBlock(_component_IconUil58laptop, { key: 2 })) : theme.key === "realtime" ? (openBlock(), createBlock(_component_IconUil58clock, { key: 3 })) : createCommentVNode("", true)
                          ]),
                          createTextVNode(" " + toDisplayString(theme.text), 1)
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
        ssrRenderList(unref(availableThemes), (theme) => {
          _push(`<option${ssrRenderAttr("value", theme.key)}>${ssrInterpolate(theme.text)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThemeSwitcher.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "" + globalThis.__publicAssetsURL("logo.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const app2 = useState("app");
    const menus = ref([
      { type: "link", text: "\u65B0\u805E", route: "/" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_UIAnchor = _sfc_main$6;
      const _component_UIButton = _sfc_main$5;
      const _component_LayoutNavbarUser = _sfc_main$4;
      const _component_LayoutNavbarSize = _sfc_main$3;
      const _component_ThemeSwitcher = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-12" }, _attrs))}><div class="h-12 fixed flex items-center w-screen top-0 left-0 backdrop-filter backdrop-blur top-0 flex-none transition-colors duration-300 lg:z-20 border-b border-gray-900/10 dark:border-gray-50/[0.2] bg-white dark:bg-slate-900/[0.7]"><div class="cma"><div class="mx-4 lg:px-8 lg:mx-0"><div class="relative flex items-center">`);
      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          tag: "a",
          class: "flex-none mr-3 overflow-hidden font-bold text-gray-900 md:w-auto text-md dark:text-gray-200",
          to: "/"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="sr-only"${_scopeId}>home</span><span class="flex items-center"${_scopeId}><img class="w-12 mr-2"${ssrRenderAttr("src", _imports_0)}${_scopeId}><span class="leading-7 mt-[1px]"${_scopeId}>${ssrInterpolate(unref(app2).name)}</span></span>`);
            } else {
              return [
                createVNode("span", { class: "sr-only" }, "home"),
                createVNode("span", { class: "flex items-center" }, [
                  createVNode("img", {
                    class: "w-12 mr-2",
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
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
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
      _push(`<!--]--></ul></nav>`);
      _push(ssrRenderComponent(_component_LayoutNavbarUser, null, null, _parent));
      _push(`<div class="flex space-x-4 border-l ml-4 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]">`);
      _push(ssrRenderComponent(_component_LayoutNavbarSize, null, null, _parent));
      _push(ssrRenderComponent(_component_ThemeSwitcher, null, null, _parent));
      _push(`</div></div>`);
      {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const layouts = {
  blog: () => import('./_nuxt/blog.d2a99fec.mjs').then((m2) => m2.default || m2)
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
      var _a, _b;
      return (_b = (_a = unref(props.name)) != null ? _a : route.meta.layout) != null ? _b : "default";
    });
    return () => {
      var _a;
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (_a = route.meta.layoutTransition) != null ? _a : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && { key: layout.value, name: layout.value, hasTransition: !!transitionProps }, context.slots).default()
      }).default();
    };
  }
});
function AppSetup() {
  const themeManager = ThemeManager();
  return {
    themeManager
  };
}
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
    AppSetup();
    const theme = useState("theme.current");
    const app2 = useAppConfig();
    useHead({
      title: app2.name,
      titleTemplate: "%s - Nuxt 3 Awesome Starter",
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
    const $bodyLock = useState("body.lock", () => false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Html = Html;
      const _component_Body = Body;
      const _component_LayoutNavbar = _sfc_main$1;
      const _component_NuxtLayout = __nuxt_component_3;
      const _component_NuxtPage = __nuxt_component_1$1;
      const _component_ClientOnly = __nuxt_component_5$1;
      _push(ssrRenderComponent(_component_Html, mergeProps({
        class: `${unref(theme) === "dark" ? "dark" : ""}`,
        lang: "zh-TW"
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Body, {
              class: [unref($bodyLock) ? "overflow-hidden" : "", "w-screen overflow-x-hidden antialiased text-gray-800 transition-colors duration-300 bg-white dark:text-gray-200 dark:bg-gray-900"]
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutNavbar, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtLayout, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtPage, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtPage)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ClientOnly, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutNavbar),
                    createVNode(_component_NuxtLayout, null, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtPage)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ClientOnly)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Body, {
                class: [unref($bodyLock) ? "overflow-hidden" : "", "w-screen overflow-x-hidden antialiased text-gray-800 transition-colors duration-300 bg-white dark:text-gray-200 dark:bg-gray-900"]
              }, {
                default: withCtx(() => [
                  createVNode(_component_LayoutNavbar),
                  createVNode(_component_NuxtLayout, null, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtPage)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly)
                ]),
                _: 1
              }, 8, ["class"])
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
    const vueApp = createApp(_sfc_main$7);
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

export { __nuxt_component_3$1 as A, __nuxt_component_4 as B, __nuxt_component_5 as C, _sfc_main$j as D, EosIconsLoading as E, _sfc_main$i as F, UilFileAlt as G, UilHeart as H, UilLightbulbAlt as I, UilSignOutAlt as J, __nuxt_component_1$1 as K, __nuxt_component_1 as L, __unplugin_components_0$5 as M, __unplugin_components_1$3 as N, __unplugin_components_2$2 as O, __unplugin_components_3$2 as P, _sfc_main$g as Q, __nuxt_component_6 as R, __nuxt_component_7 as S, _sfc_main$d as T, UilUser as U, _sfc_main$c as V, _sfc_main$8 as W, defineNuxtRouteMiddleware as X, _sfc_main$6 as Y, _export_sfc as _, __unplugin_components_0$4 as a, useHead as b, __nuxt_component_0$1 as c, _sfc_main$B as d, entry$1 as default, useHttpPost as e, fe as f, __nuxt_component_0 as g, __nuxt_component_4$2 as h, __nuxt_component_5$2 as i, _sfc_main$x as j, __nuxt_component_4$1 as k, _sfc_main$v as l, __nuxt_component_6$1 as m, __nuxt_component_0$2 as n, oe as o, _sfc_main$r as p, useRouter as q, useHttpFetchPost as r, useBaseStore as s, _sfc_main$q as t, useState as u, _sfc_main$p as v, _sfc_main$o as w, storeToRefs as x, useRoute as y, __nuxt_component_2 as z };
//# sourceMappingURL=server.mjs.map
