import { Request, Response } from 'express';

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'POST  /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '1' && userName === 'admin') {
      res.send({
        status: '0',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '1' && userName === 'user') {
      res.send({
        status: '0',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
