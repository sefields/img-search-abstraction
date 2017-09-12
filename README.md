# Image Search Abstraction Layer
### by Sam
### Endpoint: https://sam-img-search.glitch.me/

### Input a search term. The service outputs some images and metadata

### Instructions / Code Samples:

> #### 1. Search for images. Offset parameter is optional, and provides pagination.

> `https://sam-img-search.glitch.me/cats/offset=2`

> #### The above would return an array of 10 objects with the format:

> `{`

> `url: "https://www.bing.com/cr?IG=0B5802CBF40146BBA409E7FA96A22770&CID=2D1F316CBB626E960FF63B97BA646FB4&rd=1&h=YS3NHnPVYL6VgyTRsmB_ML-hbHkDbjW9j9r1XbDxrB8&v=1&r=https%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fthumb%2f3%2f39%2fFeral_cat_1.JPG%2f1200px-Feral_cat_1.JPG&p=DevEx,5015.1",`

> `snippet: "Feral cat - Wikipedia",`

> `thumbnail: "https://tse4.mm.bing.net/th?id=OIP.X0TzR7jjVelWU-g9DSTj7AEyDM&pid=Api",`

> `context: "https://en.wikipedia.org/wiki/Feral_cat"`

> `}`

> #### 2. Check the search history

> `https://sam-img-search.glitch.me/latest`

> #### The above would return an array of 10 objects with the format:

> `{`

> `term: "cats",`

> `when: "2017-09-12T00:00:19.406Z"`

> `}`