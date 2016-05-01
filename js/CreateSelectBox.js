/**
 * Created by CP on 16/4/24.
 */

//window.open ("http://window.html","newwindow","height=100,width=400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");

//alert("hhhhhhhh");


//aaaaaaaaaaaaaaaaaa
chrome.tabs.executeScript(null, {file: "js/content.js"});


// one-time connection
var termNameArray = [];
var termNumArray = [];
var classNameArray = [];
var classTimeArray = [];
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");

        termNameArray = request.sendtermNameArray;
        for (var i = 0; i < termNameArray.length; i++) {
            document.getElementById("edu").options.add(new Option(termNameArray[i], i));
            //console.log("termNameArray[" + i + "] = " + termNameArray[i]);
        }

        termNumArray = request.sendtermNumArray;
        for (var i = 0; i < termNumArray.length; i++) {
            //console.log("termNumArray[" + i + "] = " + termNumArray[i]);
        }

        classNameArray = request.sendclassNameArray;
        for (var i = 0; i < classNameArray.length; i++) {
            //console.log("classNameArray[" + i + "] = " + classNameArray[i]);
        }

        classTimeArray = request.sendclassTimeArray;
        for (var i = 0; i < classTimeArray.length; i++) {
            //console.log("classTimeArray[" + i + "] = " + classTimeArray[i]);
        }
    });


//document.getElementById("edu").value = 1;


var selected = -1;
document.getElementById("edu").onchange = function(){
        selected = this.value;
        //alert("selected: " + selected);

        //alert("06:00AM: " + document.getElementById("1,1").offsetTop);
        //alert("01:00PM: " + document.getElementById("8,1").offsetTop);

        drawSchedule();
}











/*
document.getElementById("edu").addEventListener('change',function(){

        chrome.tabs.executeScript(null, {file: "js/showSchedule.js"});

        return mychange.apply(this,[this.value,pid,num]);
});

*/









/************* old version
var termNameArray = new Array();
var name = "";
chrome.extension.sendMessage({cmd: "gettermNameArray"}, function (response) {
    if (response.arr) {
        var len = response.arr.length;
        for (var i = 0; i < len; i++) {

            termNameArray[i] = response.arr[i];

            $('body').append("<br>" + termNameArray[i] + '<br>');
            //$('body').append("<input id='termName"+ i + "' type='hidden' value='" + termNameArray[i] + "' >");
            //alert(document.getElementById("termName").value);

            //alert(termNameArray[i]);
        //<input name="d" type="hidden" value="">

        //<option value="0">初中</option>
                //document.getElementById("edu").append("<option value=" + i + " > " + "abc" + " < /option>");

            //document.getElementById("edu").options.add(new Option(document.getElementById("termName").value, i.toString()));
            //document.getElementById("edu").options.add(new Option(termNameArray[i].toString(), i.toString()));
            //document.getElementById("edu").options.add(new Option("sss", i));

            name = termNameArray[i];
            document.getElementById("edu").options.add(new Option("ddd", i));


        }


        //alert(termNameArray[0]);
        //alert(document.getElementById("edu").title);
        //document.getElementById("edu").options.add(new Option("sss", 1));

    }
});
var termNumArray = [];
chrome.extension.sendMessage({cmd: "gettermNumArray"}, function (response) {
    if (response.arr) {
        var len = response.arr.length;
        for (var i = 0; i < len; i++) {

            termNumArray[i] = response.arr[i]

            $('body').append("<br>" + termNumArray[i] + '<br>');
        }
    }
});

//alert("finish");
//document.getElementById("edu").options.add(new Option("sss", "1"));
//document.getElementById("edu").options.add(new Option(termNameArray[0].toString(), "0"));

//alert(termNameArray[0]);
//alert(termNameArray[1]);

//alert(document.getElementById("termName").value);

//document.getElementById("edu").options.add(new Option(document.getElementById("termName").value, "0"));


 ************/
