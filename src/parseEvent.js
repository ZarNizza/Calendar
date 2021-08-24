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

    if (draftItem) {
      draftItem = draftItem.replace(/\s{1,}/g," ").trim();   // remove multiple spaces
      // timeStamp
      date = draftItem.match(/(\d*\d\/\d\d*)|(\d*\d\.\d\d*)/i) ? draftItem.match(/(\d*\d\/\d\d*)|(\d*\d\.\d\d*)/i)[0] : "";
      time = draftItem.match(/(\d*\d-\d\d*)|(\d*\d:\d\d*)/i) ? draftItem.match(/(\d*\d-\d\d*)|(\d*\d:\d\d*)/i)[0] : "";
      if (date === "") {
        eventItem.timeStamp = new Date.now();
      } else {
        let dashPos = date.indexOf("/");
        if (dashPos === -1) {dashPos = date.indexOf(".")}
        day = date.slice(0, dashPos);
        if (day.length === 1) {day = "0" + day;}
        month = date.slice(dashPos + 1);
        if (month.length === 1) {month = "0" + month;}
        dashPos = time.indexOf("-");
        if (dashPos === -1) {dashPos = time.indexOf(":")}
        hours = time.slice(0, dashPos);
        if (hours.length === 1) {hours = "0" + hours;}
        minutes = time.slice(dashPos + 1);
        if (minutes.length === 1) {minutes = "0" + minutes;}
        let tmpDate = year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
        eventItem.timeStamp = (Date.parse(tmpDate)) ? Date.parse(tmpDate) : Date.parse('1970-01-01');

        
        console.log(year+"-"+month+"-"+day+" = " + tmpDate );
        console.log(new Date(eventItem.timeStamp));
      }
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
    console.log("parsed eventItem");
    console.log(eventItem);

    return eventItem;
  }
