export function parseEvent(draftText) {
 // arr Events [{id: Math.random(), timeStamp:"", header:"", who:"", description:""}]
    let event = {
      day: 31,
      month: 12,
      year: 2021,
      time: " ",
      header: " ",
      who: " ",
      description: " ",
    };

    if (draftText) {
      draftText = draftText.replace(/\s{1,}/g," ").trim();   // remove multiple spaces
      let date = draftText.match(/(\d*\d\/\d*\d)|(\d*\d\.\d*\d)/i) ? draftText.match(/(\d*\d\/\d*\d)|(\d*\d\.\d*\d)/i)[0] : "";
      event.time = draftText.match(/(\d*\d\-\d*\d)|(\d*\d\:\d*\d)/i) ? draftText.match(/(\d*\d\-\d*\d)|(\d*\d\:\d*\d)/i)[0] : "";
      if (date === "") {
        event.day = window.aD;
        event.month = window.aM + 1;
        event.year = window.aY;
      } else {
        let dashPos = date.indexOf("/");
        if (dashPos === -1) {dashPos = date.indexOf(".")}
        event.day = +date.slice(0, dashPos);
        event.month = +date.slice(dashPos + 1);
      }

      if ( draftText.indexOf("- ") === -1 || draftText.indexOf("- ") === draftText.lastIndexOf("- ")) {
        //inputString without dash+spaces or with one = description only
        let trimText = draftText;
        if (date > "") { trimText = trimText.slice(date.length + 1);}          // date trim
        if (event.time > "") { trimText = trimText.slice(event.time.length + 1);}     // time trim
        event.description = trimText;
        event.who = "";
      } else {
        //inputString with two dash+spaces = who + description
        event.who = draftText.slice(draftText.indexOf("- ") + 2);
        event.description = event.who.slice(event.who.indexOf("- ") + 2);
        event.who = event.who.slice(0, event.who.indexOf("- ") - 1);
      }

    }

    //console.log('-ToDo-');
    //console.log(event);
    return event;
  }
