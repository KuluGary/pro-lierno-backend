const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lierno';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("DB connected");
})

app.use('/api/v1', require('./routes/user.routes'))
app.use('/api/v1', require('./routes/character.routes'))
app.use('/api/v1', require('./routes/item.routes'))
app.use('/api/v1', require('./routes/monster.routes'))
app.use('/api/v1', require('./routes/race.routes'))
app.use('/api/v1', require('./routes/class.routes'))
app.use('/api/v1', require('./routes/location.routes'))
app.use('/api/v1', require('./routes/npc.routes'))

app.listen(port, () => {
    console.log('server running on port ' + port);
})