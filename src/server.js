const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const limiter = require('./serverMiddlewares/limiter');
const { PORT } = require('./serverUtils/serverEnv');
const { DISTRIBUTIVE_DIR } = require('./serverUtils/serverСonstants');

const distributiveDirPath = path.join(__dirname, '../', DISTRIBUTIVE_DIR);

const app = express();

app.use(limiter);
app.use(history());
app.use(express.static(distributiveDirPath));

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
