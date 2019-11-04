exports.checkAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login')
}

exports.checkNotAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect(`/wall/${req.user._id}`)
}

