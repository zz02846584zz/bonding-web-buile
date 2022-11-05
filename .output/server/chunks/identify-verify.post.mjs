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

const identifyVerify_post = defineEventHandler(async (event) => {
  try {
    const { idCard, positive, negative } = await useBody(event);
    const {
      code,
      message = "",
      data = {}
    } = await request.post("/user/identify-verify", {
      idCard,
      positive,
      negative
    });
    return { error: code !== 1e3, code, message, data };
  } catch (err) {
    const { code, message = "" } = err;
    return { error: code !== 1e3, code, message };
  }
});

export { identifyVerify_post as default };
//# sourceMappingURL=identify-verify.post.mjs.map
