const dbRoom = require("../db/room.json");
const fs = require("fs");

class Roomcontroller {
     static index (req, res){
        res.render("Room/room")
     }

     static addForm(req, res){
        res.render("Room/addRoomForm")
     }
     static addRoom(req,res){
      try {
         let {Name, status} = req.body;
        let fixID;
        let allData = dbRoom.roomData;
        function dynamicId (){
         if (!allData.length){
           fixID = 1
         } else {
           fixID = allData.length  + 1 
         }
         return fixID;
       }
       dynamicId()
       let dataContainer = {
         "id" : fixID,
         "name": Name,
         "status": status
       }
       allData.push(dataContainer);
       
       let manipulDataToString = JSON.stringify(dbRoom);
       fs.writeFileSync("./db/room.json",manipulDataToString);

       res.status(201).json("room added");

         
      } catch (error) {
         res.status(500).json(error)
         
      }
        
        
        

     }
     static searchRoom( req, res){
      try {
         let idInput = req.params.id;
         let allData = dbRoom.roomData;
         let dataContainer;
         for (let index = 0; index < allData.length; index++) {
            
            if(allData[index].id == idInput){
               dataContainer = allData[index]
   
            } else{
   
            }
            
         }
         res.status(200).json(dataContainer);
         
         
      } catch (error) {
         res.status(500).json(error);
         
      }
     
     }

     static deleteRoom (req,res){
      let idParam = req.params.id;
      let allData = dbRoom.roomData;
      const indexToDelete = allData.findIndex(obj => obj.id == idParam);
      allData.splice(indexToDelete,1)

      let manipulDataToString = JSON.stringify(dbRoom);
      fs.writeFileSync("./db/room.json", manipulDataToString);
   
     res.status(202).json(allData)
   
     }


}

module.exports = Roomcontroller;