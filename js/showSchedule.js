/**
 * Created by CP on 16/4/25.
 */

//alert("showSchedule");

var drawing = document.getElementById("canvas");
var context = drawing.getContext("2d");
var color = new Array("rgba(0, 0, 255, 0.4)", "rgba(0, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)", "rgba(255, 185, 15, 0.5)", "rgba(255, 106, 106, 0.5)", "rgba(139, 101, 8, 0.5)", "rgba(255, 255, 0, 0.5)", "rgba(0, 255, 255, 0.5)", "rgba(255, 0, 255, 0.5)", "rgba(10, 10, 10, 0.3)");
var tempColor = 0;

function drawSchedule() {

    if (drawing.getContext) {

        //clear the canvas
        context.clearRect(0, 0, 400, 850);

        //clear the table
        for (var i = 1; i < 17; i++){
            for (var j = 1; j < 6; j++){
                document.getElementById(i + "," + j).innerHTML = "";
            }
        }

        //alert("drawSchedule!");

        //clear the data
        var left = [];
        var top = [];
        var width = [];
        var height = [];
        var day = [];
        var time = [];
        var h1 = 0;
        var h2 = 0;
        var m1 = 0;
        var m2 = 0;
        var dayIndex = 0;
        var timeIndex = 0;
        var nameTop = [];
        var nameLeft = [];
        var ID = "";
        var timeArray = [];


        var preTermNumSum = 0;
        var preTemp = selected;
        while (preTemp - 1 >= 0){
            preTermNumSum += termNumArray[preTemp - 1];
            preTemp--;
        }


        for (var i = 0; i < termNumArray[selected]; i++) { // class 5 (from 0 ~ 4) or 2 (from 0 ~ 1)
            //alert(termNumArray[selected]);
            timeIndex = 0;

            timeArray = classTimeArray;

            if (selected == 0) {
                timeArray = classTimeArray//.splice(5, 2);
            }
            else if (selected == 1) {
                //classTimeArray.splice(0,5);
                //timeArray = classTimeArray.splice(0,5);
            }

            for (var t = 0; t < timeArray[i + preTermNumSum].length; t++) { //one class
                //alert(timeArray[1].length);
                //alert(timeArray[i + preTermNumSum][t].substring(0, 1));

                if (isCharacter(timeArray[i + preTermNumSum][t].substring(0, 2))) {
                    day[dayIndex] = timeArray[i + preTermNumSum][t];
                    //alert(day[dayIndex]);
                    dayIndex++;
                }
                else if (isNumber(timeArray[i + preTermNumSum][t].substring(0, 2))) {

                    time[timeIndex] = timeArray[i + preTermNumSum][t];
                    //alert(time[timeIndex]);
                    //alert(timeArray[i + preTermNumSum][t].substring(0, 1));
                    //alert(timeArray[1][3]);
                    timeIndex++;

                }

                //alert(isNumber(timeArray[1][2].substring(0, 2)));

                //begin to draw
                if (timeIndex == 2) {
                    //alert("begin to draw: term " + i);

                    //get h1:m1 ~ h2:m2
                    h1 = parseInt(time[0].substring(0, 2)); //alert(h1);
                    m1 = parseInt(time[0].substring(3, 5)); //alert(m1);
                    h2 = parseInt(time[1].substring(0, 2)); //alert(h2);
                    m2 = parseInt(time[1].substring(3, 5)); //alert(m2);


                    //use day to get left & width
                    for (var d = 0; d < day.length; d++) {
                        //alert(day[d]);
                        switch (day[d]) {
                            case "Monday":
                                left[d] = parseInt(document.getElementById("1,1").offsetLeft);
                                width[d] = document.getElementById("1,1").offsetWidth;
                                //alert(document.getElementById("1,1").offsetWidth);
                                //alert(left[d]);
                                //alert(width[d]);
                                nameLeft[d] = 1;
                                break;
                            case "Tuesday":
                                left[d] = document.getElementById("1,2").offsetLeft;
                                width[d] = document.getElementById("1,2").offsetWidth;
                                nameLeft[d] = 2;
                                break;
                            case "Wednesday":
                                left[d] = document.getElementById("1,3").offsetLeft;
                                width[d] = document.getElementById("1,3").offsetWidth;
                                nameLeft[d] = 3;
                                break;
                            case "Thursday":
                                left[d] = document.getElementById("1,4").offsetLeft;
                                width[d] = document.getElementById("1,4").offsetWidth;
                                nameLeft[d] = 4;
                                break;
                            case "Friday":
                                left[d] = document.getElementById("1,5").offsetLeft;
                                width[d] = document.getElementById("1,5").offsetWidth;
                                nameLeft[d] = 5;
                                break;
                            default:
                                break;
                        }
                    }//finish getting left & width

                    //use h1:m1 to get top
                    for (var t = 0; t < time.length; t++) {
                        //alert(time[t]);
                        //alert(time[t].substring(5));


                        //Let PM +12
                        if (time[t].substring(5) == "PM" && time[t].substring(0, 2) != "12") {
                            if (t == 0) {

                                h1 += 12;
                            }
                            else if (t == 1) {
                                h2 += 12;
                            }
                        }
                        var offset = -5;
                    }
                    for (var d=0; d<day.length; d++){

                        //top
                        top[d] = document.getElementById((h1 + offset).toString() + ",1").offsetTop + ((m1 / 60) * document.getElementById((h1 + offset).toString() + ",1").offsetHeight);
                        //alert(top[t]);

                        if (m1 < 30){
                            nameTop[d] = (h1 + offset);
                        }
                        else if (m1 >= 30){
                            nameTop[d] = (h1 + offset + 1);
                        }

                    }//finish getting top


                    //use h1:m1 ~ h2:m2 to get height
                    for (var t = 0; t < day.length; t++) {
                        height[t] = (((h2 * 60) + m2) - ((h1 * 60) + m1)) / 60 * document.getElementById((h1 + offset).toString() + ",1").offsetHeight;
                        //alert(height[t]);

                    }//finish getting height


                    //alert("draw!");
                    draw(left, top, width, height);


                    //show the course names
                    for (var n=0; n<nameLeft.length; n++){
                        ID = nameTop[n] + "," + nameLeft[n];
                        document.getElementById(ID).innerHTML = classNameArray[i + preTermNumSum].split("*")[0] + "<br/>" + classNameArray[i + preTermNumSum].split("*")[1];
                    }

                    // alert("left: " + left[0] + ", " + left[1] + "   top: " + top[0] + ", " + top[1]+ width[0] + ", " + width[1]+ height[0] + ", " + height[1]);


                    //clear the data
                    left = [];
                    top = [];
                    width = [];
                    height = [];
                    day = [];
                    time = [];
                    h1 = 0;
                    h2 = 0;
                    m1 = 0;
                    m2 = 0;
                    dayIndex = 0;
                    timeIndex = 0;
                    nameTop = [];
                    nameLeft = [];

                    //change a color
                    tempColor++;

                    if (tempColor == 10) {
                        tempColor = 0;
                    }

                }//finish drawing


            }//end one class

        } //end class 5 (from 0 ~ 4) or 2 (from 0 ~ 1)


        //alert(isNumber("wwww222"));
        //alert(isCharacter("wwww"));

    }//end drawing

}//end function drawSchedule()


var patternNum = /^[0-9]*[1-9][0-9]*$/; //number
var patternCharacter = /^[A-Za-z]+$/; //character

//function for checking if it is a number
function isNumber(str) {
    if (patternNum.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

//function for checking if it is a character
function isCharacter(str) {
    if (patternCharacter.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

//function for drawing the color blocks
function draw(left, top, width, height) {
    for (var i = 0; i < left.length; i++) {
        context.fillStyle = color[tempColor];
        context.fillRect(left[i], top[i], width[i], height[i]);
    }//end drawing
}

