// When the extension is installed or upgraded ...
// Only in the specific website can the extension button be enabled
chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
        {
            // That fires when a page's URL contains a 'g' ...
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlContains: 'webreg.kean.edu'},
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }
    ]);
    });
});



//save timetable as PNG
function print(){
    alert("d");
    Canvas2Image.saveAsPNG(document.getElementById("canvas"), 490, 850);
    Canvas2Image.saveAsPNG(html2canvas(document.getElementById("visualization")), 490, 850);
}


//console.log(document.getElementById("edu").getSelectedOptionValue);

//alert("hahahah");

/** long-time connection (bug)
 chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    //termNameArray
    if (request.cmd == 'sendtermNameArray') {
        console.log(request.arr);
        g_termNameArray = request.arr;
    } else if (request.cmd == 'gettermNameArray') {
        sendResponse({'arr': g_termNameArray});
    }
    //termNumArray
    if (request.cmd == 'sendtermNumArray') {
        console.log(request.arr);
        g_termNumArray = request.arr;
    } else if (request.cmd == 'gettermNumArray') {
        sendResponse({'arr': g_termNumArray});
    }

})
 **/


/* try
 var termNameArray = [];
 chrome.runtime.onConnect.addListener(function(port) {
 //console.assert(port.name == "termName");
 console.log("CreateSelectBox - termName");
 port.onMessage.addListener(function(msg) {
 if (msg.joke == "termName"){
 termNameArray = msg.content;
 console.log(msg.content);
 for (var i = 0; i < msg.content.length; i++) {
 console.log("termNameArray[" + i + "] = " + termNameArray[i]);
 }
 }
 });
 });

 */

//chrome.tabs.executeScript(null, {file: "js/content.js"});




/* long-time connection
 //receive data from content
 var termNameArray = [];
 var termNameFinish = false;
 chrome.runtime.onConnect.addListener(function(port) {
 //console.assert(port.name == "termName");
 console.log("CreateSelectBox - termName");
 port.onMessage.addListener(function(msg) {
 if (msg.joke == "termName"){
 port.postMessage({question: "termNameArray?"});
 console.log("CreateSelectBox: termNameArray?");
 }
 else {
 if (termNameFinish == false){
 termNameArray = msg.answer;
 for (var i = 0; i < termNameArray.length; i++) {
 console.log("termNameArray[" + i + "] = " + termNameArray[i]);
 }

 port.postMessage({question: "stoptermName?"});
 console.log("CreateSelectBox: stoptermName?");
 termNameFinish = true;
 }

 }
 });
 });

 var termNumArray = [];
 var termNumFinish = false;
 chrome.runtime.onConnect.addListener(function(port) {
 //console.assert(port.name == "termNum");
 console.log("CreateSelectBox - termNum");
 port.onMessage.addListener(function(msg) {
 if (msg.joke == "termNum"){
 port.postMessage({question: "termNumArray?"});
 console.log("CreateSelectBox: termNumArray?");
 }
 else {
 if (termNumFinish == false){
 termNumArray = msg.answer;
 for (var i = 0; i < termNumArray.length; i++) {
 console.log("termNumArray[" + i + "] = " + termNumArray[i]);
 }

 port.postMessage({question: "stoptermNum?"});
 console.log("CreateSelectBox: stoptermNum?");
 termNumFinish = true;
 }

 }
 });
 });

 */