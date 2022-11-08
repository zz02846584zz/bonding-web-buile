import { eventHandler, useBody } from 'h3';
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

const list_post = eventHandler(async (event) => {
  try {
    const { isTop, isHot, size, sort, type, category, articleId } = await useBody(event);
    const {
      code,
      message = "",
      data = null
    } = await request.post("/news/article/list", {
      isTop,
      isHot,
      size,
      sort,
      type,
      category,
      articleId
    });
    return { error: code !== 1e3, code, message, data };
  } catch (err) {
    const { code, message = "" } = err;
    return { error: code !== 1e3, code, message };
  }
});

export { list_post as default };
//# sourceMappingURL=list.post.mjs.map
