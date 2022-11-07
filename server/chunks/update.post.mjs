import { defineEventHandler, useBody, createError } from 'h3';
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

const update_post = defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    const { firstName, lastName, intro, birthday, gender } = body;
    const rules = [
      {
        key: "firstName",
        message: "\u8ACB\u8F38\u5165\u59D3\u6C0F"
      },
      {
        key: "lastName",
        message: "\u8ACB\u8F38\u5165\u540D\u5B57"
      },
      {
        key: "birthday",
        message: "\u8ACB\u8F38\u5165\u751F\u65E5"
      },
      {
        key: "gender",
        message: "\u8ACB\u8F38\u5165\u6027\u5225"
      }
    ];
    const validateRule = (rule) => {
      const value = body[rule.key] || "";
      if (!value) {
        throw createError({
          message: rule.message
        });
      }
      if (rule.regex && !rule.regex.test(value)) {
        throw createError({
          message: rule.message
        });
      }
    };
    await Promise.all(rules.map(async (rule) => await validateRule(rule)));
    const {
      code,
      message = "",
      data = {}
    } = await request.post("/user/personUpdate", {
      firstName,
      lastName,
      intro,
      birthday,
      gender
    });
    return { error: code !== 1e3, code, message, data };
  } catch (err) {
    const { code, message = "" } = err;
    return { error: code !== 1e3, code, message };
  }
});

export { update_post as default };
//# sourceMappingURL=update.post.mjs.map
