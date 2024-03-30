import express from 'express';
const router = express.Router();

router.get('/', (req, res) => { 
  res.send('Express + TypeScript Server@@@@@!!!!!!!!!!');
});

module.exports = router;