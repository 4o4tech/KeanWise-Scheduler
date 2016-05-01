/**
 * Created by CP on 16/4/25.
 */

//alert("content_scripts is running");

//funcion for deleting spaces both on the left side and right side
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//get data from the webpage
if (document.title == "Register and Drop Sections") {
    //alert("sss");
    var totalNum = 0;
    //var termName = new Array();
    var lastTermName = "";
    var thisTermName = "";
    var termNumArray = new Array();
    var termNameArray = new Array();
    var arrayPosistion = -1;

    while (document.getElementById("SEC_TERM_" + (totalNum + 1)) != null) {
        //send the term

        //alert(document.getElementById("SEC_TERM_" + (totalNum + 1)).innerText);

        //termName[totalNum] = document.getElementById("SEC_TERM_" + totalNum).innerText.split(" ")[0];

        thisTermName = document.getElementById("SEC_TERM_" + (totalNum + 1)).innerText;
        //alert("this: " + thisTermName);


        if (lastTermName == thisTermName) {
            termNumArray[arrayPosistion]++;
            //alert("termNumArray[arrayPosistion] = " + termNumArray[arrayPosistion]);
        }
        else {
            arrayPosistion++;
            //alert("arrayPosistion = " + arrayPosistion);

            termNumArray[arrayPosistion] = 1;
            //alert("termNumArray[totalNum] = " + termNumArray[totalNum]);
            termNameArray[arrayPosistion] = thisTermName;
            //alert("termNameArray[totalNum] = " + termNameArray[totalNum]);


        }
        lastTermName = thisTermName;
        //alert("last: " + lastTermName);

        totalNum++;
        //alert("totalNum = " + totalNum);

    }//end while loop

    //alert("totalNum (real): " + totalNum);

    //check the terms
    for (var i = 0; i < termNumArray.length; i++) {
        //alert("termNumArray[" + i + "] = " + termNumArray[i]);
    }
    for (var i = 0; i < termNameArray.length; i++) {
        //alert("termNameArray[" + i + "] = " + termNameArray[i]);
    }


    //var newsArray = [];
    //for (var i = 0; i < len; i++) {
    //    newsArray.push($(alist[i]).attr('title'));
    //}

    //chrome.extension.sendMessage({cmd: "sendtermNameArray", 'arr': termNameArray}, function (response) {});
    //chrome.extension.sendMessage({cmd: "sendtermNumArray", 'arr': termNumArray}, function (response) {});


    //send the class and time
    var classNameArray = [];
    var classTimeArray = [];
    for (var num = 0; num < totalNum; num++) {
        classNameArray[num] = document.getElementById("SEC_SHORT_TITLE_" + (num + 1)).innerText.split(" ")[0];
        //console.log("num = " + num + ", classNameArray[" + num + "] = " + classNameArray[num]);
        classTimeArray[num] = document.getElementById("SEC_MEETING_INFO_" + (num + 1)).innerText.substring(30).split(" ");

        for (var i = 0; i < classTimeArray[num].length; i++) {
            if (classTimeArray[num][i].indexOf("day") == -1 && classTimeArray[num][i].indexOf(":") == -1) {
                classTimeArray[num].splice(i, 1); //delete useless string
                i--;
            }
            else {
                //if is useful, reformat it
                classTimeArray[num][i] = classTimeArray[num][i].replace(/,/, " ");
                classTimeArray[num][i] = trim(classTimeArray[num][i]);
            }
            console.log("classTimeArray[" + num + "][" + i + "] = " + classTimeArray[num][i]);

        }
    }

    for (var i = 0; i < classNameArray.length; i++) {
        //console.log("classNameArray[" + i + "] = " + classNameArray[i]);
    }
        // one-time connection
    chrome.runtime.sendMessage({
        sendtermNameArray: termNameArray,
        sendtermNumArray: termNumArray,
        sendclassNameArray: classNameArray,
        sendclassTimeArray: classTimeArray
    }, function (response) {
        //console.log(response.farewell);
    });



    /* long-time connection
     //send value
     var porttermName = chrome.runtime.connect({name: "termName"});
     porttermName.postMessage({joke: "termName"});
     console.log("getValues - termName");
     porttermName.onMessage.addListener(function (msg) {
     if (msg.question == "termNameArray?") {
     porttermName.postMessage({answer: termNameArray});
     console.log("getValues: termNameArray");
     //console.log(msg.question);
     }
     else if (msg.question == "stoptermName?") {
     console.log("stoptermName");
     }
     });

     var porttermNum = chrome.runtime.connect({name: "termNum"});
     porttermNum.postMessage({joke: "termNum"});
     console.log("getValues - termNum");
     porttermNum.onMessage.addListener(function (msg) {
     if (msg.question == "termNumArray?") {
     porttermNum.postMessage({answer: termNumArray});
     console.log("getValues: termNumArray");
     //console.log(msg.question);
     }
     else if (msg.question == "stoptermNum?") {
     console.log("stoptermNum");
     }
     });

     */

}//end if (document.title == "Register and Drop Sections")





//document.getElementsByName("SUBMIT2").click();

//document.getElementsByClassName("shortButton").

document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementByName('SUBMIT2');
    // onClick's logic below:
    link.addEventListener('click', function () {
        this.form.submit();
    });
});


