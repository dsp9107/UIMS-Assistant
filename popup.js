"use strict";

let getInsights = document.getElementById("getInsights");
let extractData = document.getElementById("extractData");
let loadData = document.getElementById("loadData");

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
                    }
                );
            }
        );
    });
};

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
                            {window.open("https://uims-assistant.web.app/", "_blank");}
                    });`,
                });
            }
        );
    });
};

loadData.onclick = function (element) {
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
                            code: `chrome.storage.sync.get(['attendanceData'], function(result) {
                                localStorage.setItem("attendanceData", JSON.stringify(result.attendanceData));
                                location.reload();
                            });`,
                        });
                    }
                );
            }
        );
    });
};
