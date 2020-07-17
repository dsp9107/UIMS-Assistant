"use strict";

// get insights
let getInsights = document.getElementById("getInsights");

getInsights.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: "jquery-3.4.1.js" },
            function () {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { file: "funcs.js" },
                    function () {
                        chrome.tabs.executeScript(tabs[0].id, {
                            code: "generateInsights(extractData());",
                        });
                        window.close();
                    }
                );
            }
        );
    });
};

// extract data
let extractData = document.getElementById("extractData");

extractData.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: "jquery-3.4.1.js" },
            function () {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { file: "funcs.js" },
                    function () {
                        chrome.tabs.executeScript(tabs[0].id, {
                            code: "developerZone(extractData());",
                        });
                        window.close();
                    }
                );
            }
        );
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: "sweetalert.min.js" },
            function () {
                chrome.tabs.executeScript(tabs[0].id, {
                    code: `swal({
                                title: "Data copied!",
                                text: "Would you like to find out how many lectures you can leave and still not get detained?",
                                icon: "success",
                                buttons: {
                                    yes: {
                                        text: "YES",
                                        value: true
                                    },
                                    no: {
                                        text: "NO",
                                        value: false
                                    }
                                }
                            }).then((value) => {
                                if(value)
                                    {window.open("https://uims-assistant.web.app/demo", "_blank");}
                            });`,
                });
            }
        );
    });
};
