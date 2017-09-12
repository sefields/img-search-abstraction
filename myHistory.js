var mongo = require("mongodb").MongoClient;

module.exports = {
  
  do_history : function(response) {
    mongo.connect(process.env.DB_PATH, function(err, db) {
      if (err) throw err;
      var recentCol = db.collection('recent');
      recentCol.find( {}, { term : 1, when : 1, _id : 0 } ).toArray(function(err, docs) {
        var result = [];
        //  Loop grabs most recent 10 results for the array 'result'
        for (var i = 0; i < 10; i++) {
          var lastDoc = docs.pop();
          if (typeof lastDoc == undefined) {
            break;
          }
          result.push(lastDoc);
        }
        response.send(result);
      });
    });
  }
  
}