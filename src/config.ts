import 'dotenv/config';
import convict from 'convict';

convict.addFormat({
  name: 'array',
  validate(val: any) {
    return val;
  },
  coerce(val: any): any {
    return val.split(',').map((v: string) => +v);
  },
});

const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  planfix: {
    account: {
      doc: 'Planfix account',
      env: 'PF_ACCOUNT',
      default: '',
    },
    url: {
      doc: 'Planfix api url',
      default: 'https://api.planfix.ru/xml/',
      env: 'PF_URL',
    },
    apiKey: {
      doc: 'Planfix api key',
      env: 'PF_API_KEY',
      default: '',
    },
    privateKey: {
      doc: 'Planfix private key',
      env: 'PF_PRIVATE_KEY',
      default: '',
    },
    allStatuses: {
      doc: 'Process statuses list',
      format: 'array',
      env: 'PF_ALL_STATUSES',
      default: [],
    },
    showStatuses: {
      doc: 'Task with that statuses will be returned',
      format: 'array',
      env: 'PF_SHOW_STATUSES',
      default: [],
    },
    template: {
      doc: 'Planfix task template',
      env: 'PF_TASK_TEMPLATE',
      default: '',
    },
  },
});

config.validate({ allowed: 'strict' });

export default config;
