import { defineEventHandler, useBody, createError } from 'h3';
import { r as request } from './nitro/node-server.mjs';
import { p as phoneRegex } from './regex.mjs';
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

const _type_Captcha_post = defineEventHandler(async (event) => {
  try {
    const type = event.context.params["type-captcha"].replace("-captcha", "");
    const body = await useBody(event);
    const { phone } = body;
    const rules = [
      {
        key: "phone",
        message: "\u8ACB\u8F38\u5165\u624B\u6A5F\u865F\u78BC",
        regex: phoneRegex
      }
    ];
    const validateRule = (rule) => {
      const value = body[rule.key] || "";
      if (value && rule.regex && rule.regex.test(value))
        return;
      throw createError({
        message: rule.message
      });
    };
    await Promise.all(rules.map(async (rule) => await validateRule(rule)));
    const {
      code,
      message = "",
      data = null
    } = await request.post("/auth/captcha", { phone, type });
    return { error: code !== 1e3, code, message, data };
  } catch (err) {
    const { code, message = "" } = err;
    return { error: code !== 1e3, code, message };
  }
});

export { _type_Captcha_post as default };
//# sourceMappingURL=_type_-captcha.post.mjs.map
