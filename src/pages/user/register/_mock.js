import { Request, Response } from 'express';

export default {
  'POST  /api/register': (_, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
};
