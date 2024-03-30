import express from 'express';
const router = express.Router();

router.post('/signup', (req, res) => { 
  res.send('AUTH ROUTER: signup');
});

router.post('/signin', (req, res) => { 
    res.send('AUTH ROUTER: sign in');
  });

module.exports = router;