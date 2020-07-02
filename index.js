console.log("This is my index js file");


let newsAccordion = document.getElementById('newsAccordion');

let data = null;

let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw");
xhr.setRequestHeader("x-rapidapi-host", "bing-news-search1.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "cb6afc1241msh29086dca0465d6dp1899e0jsn89f26effc56f");
xhr.setRequestHeader("x-bingapis-sdk", "true");


xhr.onload = function(){
    if(this.status === 200){
        let json = JSON.parse(this.responseText);
        let value = json.value;
        console.log(value);
        let newsHtml = "";
        value.forEach(function(element, index) {
            console.log(element, index)
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        <b>Breaking News ${index+1}: </b>${element["name"]}
                                    </button>
                                </h2>
                            </div> 

                            <div id="collapse${index}" class="collapse " aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body">  ${element["description"]}. <a href="${element['url']}" target="_blank"> Read more here </a> </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else{
        console.log("some error occured")
    }
}

xhr.send(data);
// What to do when response is ready
/* xhr.onload = function () {
     if (this.status === 200) {
         let json = JSON.parse(this.responseText);
         let articles = json.value;
         console.log(value);
         let newsHtml = "";
         articles.forEach(function(element) {
              let news = `<div class="card">
                              <div class="card-header" id="heading${index}">
                                  <h2 class="mb-0">
                                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                      aria-expanded="false" aria-controls="collapse${index}">
                                     <b>Breaking News ${index+1}:</b> ${element["name"]}
                                  </button>
                                  </h2>
                              </div>

                              <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                  <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
                              </div>
                          </div>`;
              newsHtml += news;
          });
          newsAccordion.innerHTML = newsHtml;
              }
      else {
          console.log("Some error occured")
      }
  }
*/
