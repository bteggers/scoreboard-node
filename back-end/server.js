const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/scoreboard', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const playerSchema = new mongoose.Schema({
  name: String,
  score: Number,
  stillIn: Boolean
})

const gameSchema = new mongoose.Schema({
  specID: String,
  players: [playerSchema],
  roundScore: Number,
  currentRound: Number,
  maxRound: Number,
  scoreHistory: [Number]
});

gameSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
});
  
gameSchema.set('toJSON', {
  virtuals: true
});

const Game = mongoose.model('Game', gameSchema);
const Player = mongoose.model('Player', playerSchema);

app.get('/api/game/:id/playerStates', async (req, res) => {
  if (req.params.id.length === 4) {
    Game.findOne({'specID': req.params.id }, 'players', function (err, game) {
        if (err){
            console.log(err);
            res.sendStatus(500);
        }
        res.send({players: game.players})
    });
  } else {
    Game.findOne({'_id': req.params.id }, 'players', function (err, game) {
      if (err){
        console.log(req);
        console.log(err);
        res.sendStatus(500);
      }
      res.send({players: game.players})
    });
  }
});

app.get('/api/game/:id/roundScore', async (req, res) => {
  if (req.params.id.length === 4) {
    Game.findOne({'specID': req.params.id }, 'roundScore', function (err, game) {
        if (err){
            console.log(err);
            res.sendStatus(500);
        }
        res.send({players: game.players})
    });
  } else {
    Game.findOne({'_id': req.params.id }, 'roundScore', function (err, game) {
      if (err){
        console.log(req);
        console.log(err);
        res.sendStatus(500);
      }
      res.send({roundScore: game.roundScore})
    });
  }
});

app.get('/api/game/:id/scorehistory', async (req, res) => {
    Game.findOne({ 'specID': req.params.id }, 'players scoreHistory', function (err, game) {
        if (err){
            console.log(err);
            res.sendStatus(500);
        }
        let history = [];
        let spacing = game.players.length;

        for (var i = 0; i < game.scoreHistory.length; i += spacing) {
            history[history.length] = game.scoreHistory.slice(i, i + spacing);
        }
        res.send({players: game.players, scoreHistory: history})
    });
});

app.post('/api/game', async (req, res) => {
    console.log("In the post...");
    let specID = (Math.random().toString(36)+'00000000000000000').slice(2, 6);
    while (await Game.exists({specID: specID})) {
        specID = (Math.random().toString(36)+'00000000000000000').slice(2, 6)
    }
    let scores = Array(req.body.players.length).fill(0);
    let playerList = [];
    for (var i = 0; i < req.body.players.length; i++) {
      playerList.push(new Player({name: req.body.players[i], score: 0, stillIn: true}))
    }
    const game = new Game({
        specID: specID,
        players: playerList,
        roundScore: 0,
        currentRound: 1,
        maxRound: req.body.maxround,
        scoreHistory: []
    });
    try {
      await game.save();
      res.send({hostID:game.id, specID: game.specID});
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.delete('/api/game/:id', async (req, res) => {
  console.log("Deleting...")
  try {
    await Game.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/game/:id/roundscore/:score', async (req,res) => {
  let score = parseInt(req.params.score);
  try {
    await Game.findOneAndUpdate({_id: req.params.id},{roundScore: score});
    res.send({id: req.params.id, roundScore: score});
  } catch(error) {
      res.send(error)
  }
});

app.put('/api/game/:id/resetround', async (req,res) => {
  try {
    let game = await Game.findOne({_id: req.params.id});
    game.currentRound += 1;
    game.roundScore = 0;
    for (let i = 0; i < game.players.length; i++) {
        game.scoreHistory.push(game.players[i].score);
        game.players[i].stillIn = true;
    }
    await game.save();
    res.send({game: game});
  } catch(error) {
      res.send(error);
  }
});

app.put('/api/game/:id/bank/:playernum', async (req,res) => {
  try {
    let game = await Game.findOne({_id: req.params.id});
    game.players[parseInt(req.params.playernum)].score += game.roundScore;
    game.players[parseInt(req.params.playernum)].stillIn = false;
    await game.save();
    res.send({game: game});
  } catch(error) {
      res.send(error);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));