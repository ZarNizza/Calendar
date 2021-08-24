export function parseEvent(draftItem) {
 // arr Events [{id: Math.random(), timeStamp:"", header:"", who:"", description:""}]
 let date = "";
 let day = "";
 let month = "";
 let year = "2021";
 let time = "";
 let hours = "";
 let minutes = "";
 let eventItem = {
      id: Math.random(),
      timeStamp: Date.now(),
      header: "",
      who: "",
      description: ""
    };
function errHandler() {

}
console.log("parse ---");
    if (draftItem) {
      draftItem = draftItem.replace(/\s{1,}/g," ").trim();   // remove multiple spaces

      date = draftItem.match(/(\d*\d\/\d\d*)|(\d*\d\.\d\d*)/i) ? draftItem.match(/(\d*\d\/\d\d*)|(\d*\d\.\d\d*)/i)[0] : "";
      time = draftItem.match(/(\d*\d-\d\d*)|(\d*\d:\d\d*)/i) ? draftItem.match(/(\d*\d-\d\d*)|(\d*\d:\d\d*)/i)[0] : "";
      let dashPos = -1;
      console.log("date=" + date + " time=" + time);

      if (date === "") {
        eventItem.timeStamp = Date.now();
      } else {
        dashPos = date.indexOf("/");
        if (dashPos === -1) {dashPos = date.indexOf(".")}
        day = date.slice(0, dashPos);
        if (day.length === 1) {day = "0" + day;}
        month = date.slice(dashPos + 1);
        if (month.length === 1) {month = "0" + month;}
      }
      if (time !== ""){  
        dashPos = time.indexOf("-");
        if (dashPos === -1) {dashPos = time.indexOf(":")}
        hours = time.slice(0, dashPos);
        if (hours.length === 1) {hours = "0" + hours;}
        minutes = time.slice(dashPos + 1);
        if (minutes.length === 1) {minutes = "0" + minutes;}
      }

      // bad date = error, bad time = ""  
        let tmpTime = (hours > "" && minutes > "" && hours < "24" && minutes < "60" && hours >= "00" && minutes >= "00") ? ("T" + hours + ":" + minutes) : "";
        if (month > "12" || month < "00") {errHandler()};
        if (day > "31" || day < "00") {errHandler()};

        let tmpDate = year + "-" + month + "-" + day + tmpTime;
        if (Date.parse(tmpDate)) {eventItem.timeStamp = Date.parse(tmpDate);}
      //  if (eventItem.timeStamp === 0) {errHandler();} 
        
        console.log(year+"-"+month+"-"+day+" = " + tmpDate );
        console.log(new Date(eventItem.timeStamp));

        // header
      if (draftItem.indexOf('"') > -1 && draftItem.lastIndexOf('"') !== draftItem.indexOf('"')) {
        eventItem.header = draftItem.slice(draftItem.indexOf('"') +1, draftItem.lastIndexOf('"'));
      } else if (draftItem.indexOf("'") > -1 && draftItem.lastIndexOf("'") !== draftItem.indexOf("'")) {
        eventItem.header = draftItem.slice(draftItem.indexOf("'") +1, draftItem.lastIndexOf("'"));
      }

      // who + description
      if ( draftItem.indexOf("- ") === -1 || draftItem.indexOf("- ") === draftItem.lastIndexOf("- ")) {
        //inputString without dash+spaces or with one = description only
        let trimText = draftItem;
        if (date > "") { trimText = trimText.slice(date.length + 1);}          // date trim
        if (eventItem.time > "") { trimText = trimText.slice(eventItem.time.length + 1);}     // time trim
        eventItem.description = trimText;
        eventItem.who = "";
      } else {
        //inputString with two dash+spaces = who + description
        eventItem.who = draftItem.slice(draftItem.indexOf("- ") + 2);
        eventItem.description = eventItem.who.slice(eventItem.who.indexOf("- ") + 2);
        eventItem.who = eventItem.who.slice(0, eventItem.who.indexOf("- ") - 1);
      }
      
    }
    console.log("draftItem = " + draftItem);
    console.log("header=" + eventItem.header + " who=" + eventItem.who + " description=" + eventItem.description);
 //   console.log("parsed eventItem");
   // console.log(eventItem);

    return eventItem;
  }
