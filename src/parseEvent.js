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
    if (draftItem) {
      draftItem = draftItem.replace(/\s{1,}/g," ").trim();   // remove multiple spaces
      let dashPos = -1;

      date = draftItem.match(/(\d\d\/\d\d)|(\d\d\.\d\d)/i) ? draftItem.match(/(\d\d\/\d\d)|(\d\d\.\d\d)/i)[0] : "";
      if (date === "") {
        alert("bad date! ");
        const dateNow = new Date( Date.now());
        day = dateNow.getDate();
        month = dateNow.getMonth() +1;
      } else {
        alert("ok, date =" + date);
        dashPos = date.indexOf("/");
        if (dashPos === -1) {dashPos = date.indexOf(".")}
        day = date.slice(0, dashPos);
        month = date.slice(dashPos + 1);
      }
      if (day < 10) {day = "0" + day;}
      if (day > "31" || day < "00") {errHandler()};
      if (month < 10) {month = "0" + month;}
      if (month > "12" || month < "00") {errHandler()};
      console.log("parse- date="+ date + " m=" + month + " d=" + day);
      
      time = draftItem.match(/(\d\d-\d\d)|(\d\d:\d\d)/i) ? draftItem.match(/(\d\d-\d\d)|(\d\d:\d\d)/i)[0] : "";
      if (time !== ""){  
        dashPos = time.indexOf("-");
        if (dashPos === -1) {dashPos = time.indexOf(":")}
        hours = time.slice(0, dashPos);
        if (hours < 10) {hours = "0" + hours;}
        minutes = time.slice(dashPos + 1);
        if (minutes < 10) {minutes = "0" + minutes;}
      }
      console.log("prase- time="+ time + " h=" + hours + " m=" + minutes);

        let tmpTime = (hours > "" && minutes > "" && hours < "24" && minutes < "60" && hours >= "00" && minutes >= "00") ? ("T" + hours + ":" + minutes) : "T00:00";
        let tmpDate = year + "-" + month + "-" + day + tmpTime;
        console.log("--------- tmpDate=" + tmpDate );
        if (Date.parse(tmpDate)) {eventItem.timeStamp = Date.parse(tmpDate); alert("OK! " + eventItem.timeStamp);} else {alert("default date!" + eventItem.timeStamp);}

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

    return eventItem;
  }
