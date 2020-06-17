"use strict";

let getInsights = document.getElementById("getInsights");
let extractData = document.getElementById("extractData");
let loadData = document.getElementById("loadData");

getInsights.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (
            tabs[0].url.match(/.*uims\.cuchd\.in\/UIMS.*Attendance.*/) != null
        ) {
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
        } else {
            chrome.tabs.executeScript(
                tabs[0].id,
                { file: "sweetalert.min.js" },
                function () {
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: `swal({
                        title: "Can't show insights here",
                        text: "Would you like to go to the Attendance page?",
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
                            {window.open("https://uims.cuchd.in/UIMS/frmStudentCourseWiseAttendanceSummary.aspx", "_self");}
                    });`,
                    });
                }
            );
        }
    });
};

extractData.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (
            tabs[0].url.match(/.*uims\.cuchd\.in\/UIMS.*Attendance.*/) != null
        ) {
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
                            {window.open("https://uims-assistant.web.app", "_blank");}
                    });`,
                    });
                }
            );
        } else if (
            window.location.host.match(/.*uims\.cuchd\.in\/UIMS.*/) != null
        ) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { file: "sweetalert.min.js" },
                function () {
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: `swal({
                        title: "You are almost there",
                        text: "Would you like to open the attendance page?",
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
                            {window.open("https://uims.cuchd.in/UIMS/frmStudentCourseWiseAttendanceSummary.aspx", "_self");}
                    });`,
                    });
                }
            );
        } else {
            chrome.tabs.executeScript(
                tabs[0].id,
                { file: "sweetalert.min.js" },
                function () {
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: `swal({
                        title: "You need to be on UIMS",
                        text: "Would you like to be redirected?",
                        icon: "warning",
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
                            {window.open("https://uims.cuchd.in/UIMS/frmStudentCourseWiseAttendanceSummary.aspx", "_blank");}
                    });`,
                    });
                }
            );
        }
    });
};

loadData.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].url.match(/.*uims-assistant\.web\.app.*/) != null) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (
                tabs
            ) {
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
        } else {
            chrome.tabs.executeScript(
                tabs[0].id,
                { file: "sweetalert.min.js" },
                function () {
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: `swal({
                                title: "You need to extract Attendance Data from UIMS, first",
                                text: "Would you like to be redirected to UIMS?",
                                icon: "warning",
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
                                    {window.open("https://uims.cuchd.in/UIMS/frmStudentCourseWiseAttendanceSummary.aspx", "_blank");}
                            });`,
                    });
                }
            );
        }
    });
};
