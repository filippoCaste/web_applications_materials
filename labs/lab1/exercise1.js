"use strict";

const strings = ["first", "second", "third", "nop", "tw"];

strings.forEach((s) => {
    if(s.length == 2) {
        return console.log(s+s);
    } else if(s.length == 3) {
        return console.log(s[0]+s[1]+s[1]+s[2]);
    } else {
        return console.log(s[0]+s[1]+s[s.length-2]+s[s.length-1]);
    }


}, 0, strings);

