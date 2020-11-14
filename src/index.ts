import express from 'express';
import basicAuth from 'basic-auth';
import planfix from 'planfix-client';
import config from './config';
import { combineRequestParams, mapTaskResponce } from './utils';
import { AuthorizedRequest, PlanfixTasksResponce } from './types';

const app = express();

app.get('/', (req: AuthorizedRequest, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials || !credentials.pass || !credentials.name) return res.sendStatus(401);

  const client = planfix({
    account: config.get('planfix.account'),
    url: config.get('planfix.url'),
    apiKey: config.get('planfix.apiKey'),
    privateKey: config.get('planfix.privateKey'),
  });

  return client.auth
    .login({
      password: credentials.pass,
      login: credentials.name,
    })
    .then(() => {
      req.client = client;
      next();
    })
    .catch(() => res.sendStatus(401));
});

app.get('/', (req: AuthorizedRequest, res) => req.client!.task
  .getList(combineRequestParams())
  .then((response) => mapTaskResponce(response as PlanfixTasksResponce))
  .then((data) => res.json({ data }))
  .catch(() => res.sendStatus(500)));

app.listen(config.get('port'), () => {
  console.log('Listening on %s port', config.get('port'));
});
