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

const changePhone_post = defineEventHandler(async (event) => {
  try {
    const { phone, verifyCode } = await useBody(event);
    const {
      code,
      message = "",
      data = {}
    } = await request.post("/user/change-phone", { phone, verifyCode });
    return { error: code !== 1e3, code, message, data };
  } catch (err) {
    const { code, message = "" } = err;
    return { error: code !== 1e3, code, message };
  }
});

export { changePhone_post as default };
//# sourceMappingURL=change-phone.post.mjs.map
