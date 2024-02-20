export const setLastVisit = (req, res, next) => {
    if (req.cookies.lastvisit) { // Change to "lastvisit"
        res.locals.lastVisit = new Date(req.cookies.lastvisit).toLocaleString(); // Change to "lastvisit"
    }
    res.cookie('lastvisit', new Date().toISOString(), {
        maxAge: 2 * 24 * 60 * 60 * 1000
    });
    next();
}
