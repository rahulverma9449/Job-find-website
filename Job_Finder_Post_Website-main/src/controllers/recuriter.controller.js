import UserModel from "../models/user.model.js";
class RecuriterController {
  getRecuriter(req, res) {
    res.render('Register', { userEmail: req.session.userEmail });
  }

  postRecuriter(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    const users = UserModel.get();
    res.redirect('/login');
    
  }

  getLogin(req, res) {
    res.render('login', { userEmail: req.session.userEmail });
  }

  postLogin(req, res) {
 
    const { email, password } = req.body;
    const isValidUser = UserModel.isValidUser(email, password);
    if (!isValidUser) {
      res.render('userNotFound', { userEmail: req.session.userEmail });
    }
    req.session.userEmail = email;
    res.redirect('/jobs');
  }
  logout(req, res){
    // on logout, destroy the session
    req.session.destroy((err)=>{
      if(err){
        console.log(err);
      }
      else{
        res.clearCookie('lastVisit');
        res.redirect('/login');
      }
    });
  }
}

export default RecuriterController;