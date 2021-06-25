const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const { PORT } = require('./utils/env');
const { DISTRIBUTIVE_DIR } = require('./utils/constants');

const distributiveDirPath = path.join(__dirname, '../', DISTRIBUTIVE_DIR);

const app = express();

app.use(history());
app.use(express.static(distributiveDirPath));

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
