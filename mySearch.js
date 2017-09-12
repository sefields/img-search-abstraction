var mongo = require("mongodb").MongoClient;
var https = require('https');
var MyImage = require('./MyImage.js');

module.exports = {
  
  do_search : function(query, offset, response) {
    
    if (!offset) offset = 0;
  
    //  Insert a record of the search in MongoDB
    mongo.connect(process.env.DB_PATH, function(err, db) {
      if (err) throw err;
      
      var newEntry = {
        term : query,
        when : new Date().toISOString()
      }
      
      var recentCol = db.collection('recent');
      
      recentCol.insert( newEntry, function(err, stuff) {
        db.close();
      });
    });
  
    //  Set options for Bing API call
    var options = {
      host: 'api.cognitive.microsoft.com',
      path: '/bing/v5.0/images/search?q=' + query + '&count=10&offset=' + offset + '&mkt=en-us&safeSearch=Moderate',
      headers : {
        "Content-Type" : "multipart/form-data",
        "Ocp-Apim-Subscription-Key" : "5a7aa0c59d8e41feb950094935bf769c"
      }
    };
    
    //  Make Bing API call
    https.get(options, function(res) {
      var rawData = "";
      
      res.on('data', function(chunk) {
        rawData += chunk;
      });
      
      res.on('end', function(d) {
        var bingObj = JSON.parse(rawData);
        var result = [];
        for (var i = 0; i < bingObj.value.length; i++) {
              var currRes = bingObj.value[i];
              // TO DO: figure out how to get the image's original URL from Bing API (seriously why is this so hidden)
              var temp = new MyImage(currRes.contentUrl, currRes.name, currRes.thumbnailUrl, currRes.hostPageDisplayUrl);
              result.push(temp);
        }
        response.send(result);
      });
      
      res.on('error', function(e) {
        console.error(e);
      });
    });
    
  }
  
}