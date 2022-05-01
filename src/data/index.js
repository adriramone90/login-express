const {readJson, saveJson} =require("./config");

module.exports={
    
    getUsers: readJson("./users.json"),

    saveUsers: (data) => saveJson("./users.json", data)
}