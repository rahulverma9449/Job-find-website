export const auth = (req, res, next)=>{
    if (req.session.userEmail) {
        next();
    } else {
        // Redirect to the login page
        // res.redirect('/login');
        res.render('recuritedError');
    }
};