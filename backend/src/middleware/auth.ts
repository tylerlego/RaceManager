module.exports.isAuthenticated = (req: any, res: any, next: any) => {
  // return next();
  if (req.user) {
    return next();
  }
  res.status(401).send({msg: 'Unauthorized Request'});
}