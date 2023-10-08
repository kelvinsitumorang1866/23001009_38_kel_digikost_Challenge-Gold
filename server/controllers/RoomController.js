class Roomcontroller {
     static index (req, res){
        res.render("Room/room")
     }

     static addForm(req, res){
        res.render("Room/addRoomForm")
     }
     static addRoom(req,res){
        let {Name} = req.body
        let massage = `selamat berhasil menambahkan`
        let result ={
            Name,
            massage
        }
       
        res.render("Room/addREsult", {result})
        

     }


}

module.exports = Roomcontroller;