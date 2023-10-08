class UserController {
    static login(req, res) { 
      res.render("auth/login");
    }
    static register(req , res){
        res.render("auth/register");
    }
    static profil (req,res){
        res.render("auth/profil");
    }
  }
    
  
  module.exports = UserController;