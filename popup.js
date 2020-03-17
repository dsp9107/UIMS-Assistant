"use strict";

let getInsights = document.getElementById("getInsights");
let extractData = document.getElementById("extractData");

getInsights.onclick = function(element) {
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
                            code: "generateInsights(extractData());"
                        });
                    }
                );
            }
        );
    });
};

extractData.onclick = function(element) {
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
                            code: "developerZone(extractData());"
                        });
                    }
                );
            }
        );
    });
};