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

const page_post = defineEventHandler(async (event) => {
  try {
    const { articleId, parentId, page = 1, size = 10 } = await useBody(event);
    const {
      code,
      message = "",
      data = null
    } = await request.post("/news/article/comment/page", {
      articleId,
      parentId,
      page,
      size
    });
    return { error: code !== 1e3, code, message, data };
  } catch (err) {
    const { code, message = "" } = err;
    return { error: code !== 1e3, code, message };
  }
});

export { page_post as default };
//# sourceMappingURL=page.post2.mjs.map
