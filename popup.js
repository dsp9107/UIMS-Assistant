"use strict";

let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function(element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: "jquery-3.4.1.js" },
            function() {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { file: "funcs.js" },
                    function() {
                        chrome.tabs.executeScript(tabs[0].id, {
                            code: "generate(copy());"
                        });
                    }
                );
            }
        );
    });
};
