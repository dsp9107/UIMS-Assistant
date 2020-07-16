"use strict";

// load data
let loadData = document.getElementById("loadData");

loadData.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (
            tabs[0].url.match(/.*uims-assistant\.web\.app.*/) != null ||
            tabs[0].url.match(/.*localhost.*/) != null
        ) {
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
                                chrome.tabs.executeScript(
                                    tabs[0].id,
                                    {
                                        file: "sweetalert.min.js",
                                    },
                                    function () {
                                        chrome.tabs.executeScript(tabs[0].id, {
                                            code: `chrome.storage.sync.get(['attendanceData'], function(result) {
                                                if(result.attendanceData) {
                                                    localStorage.setItem("attendanceData", JSON.stringify(result.attendanceData));
                                                    location.reload();
                                                } else {
                                                    console.log("no data extracted");
                                                    swal({
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
                                                    });
                                                }
                                            });`,
                                        });
                                    }
                                );
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

// delete data
let deleteData = document.getElementById("deleteData");

deleteData.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (
            tabs[0].url.match(/.*uims-assistant\.web\.app.*/) != null ||
            tabs[0].url.match(/.*localhost.*/) != null
        ) {
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
                                    code: `chrome.storage.sync.remove(['attendanceData'], function(result) {
                                                localStorage.removeItem("attendanceData");
                                                console.log("attendance data deleted");
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
