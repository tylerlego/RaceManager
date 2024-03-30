import express from 'express';
const router = express.Router();

router.post('/create', (req, res) => { 
  res.send('USER ROUTER: create');
});

router.get('/', (req, res) => { 
    res.send('USER ROUTER: index');
  });

module.exports = router;