const express = require('express');
const path = require('path');
const helmet = require('helmet');
const history = require('connect-history-api-fallback');
const limiter = require('./serverMiddlewares/limiter');
const { PORT } = require('./serverUtils/serverEnv');
const { DISTRIBUTIVE_DIR } = require('./serverUtils/serverConstants');

const distributiveDirPath = path.join(__dirname, '../', DISTRIBUTIVE_DIR);

const app = express();

app.use(limiter);
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    'default-src': [
      "'self'",
      'https://ya-praktikum.tech',
      'wss://ya-praktikum.tech',
      'ws://localhost:*',
      "'unsafe-inline'",
    ],
    'script-src': [
      "'self'",
      "'unsafe-eval'",
      "'sha256-vvt4KWwuNr51XfE5m+hzeNEGhiOfZzG97ccfqGsPwvE='",
    ],
  },
}));
app.use(history());
app.use(express.static(distributiveDirPath));

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
