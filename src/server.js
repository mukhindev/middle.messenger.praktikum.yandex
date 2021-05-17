const express = require('express');
const path = require('path');
const { PORT } = require('./utils/env.js');
const { DISTRIBUTIVE_DIR } = require('./utils/constants.js');

const distributiveDirPath = path.join(__dirname, '../', DISTRIBUTIVE_DIR);

const app = express();

app.use(express.static(distributiveDirPath));

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
