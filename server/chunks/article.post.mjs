import { defineEventHandler, useBody } from 'h3';
import { r as request } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'defu';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'axios';

const article_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const { slug } = await useBody(event);
    const {
      code,
      message = "",
      data = null
    } = await request.post("/news/article/info", {
      slug,
      client: !((_a = request) == null ? void 0 : _a.server)
    });
    return { error: code !== 1e3, code, message, data };
  } catch (err) {
    const { code, message = "" } = err;
    return { error: code !== 1e3, code, message };
  }
});

export { article_post as default };
//# sourceMappingURL=article.post.mjs.map
