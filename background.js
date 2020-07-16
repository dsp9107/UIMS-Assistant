function onClickHandler(info, tab) {
    if (info.menuItemId == "extractData") {
        if (tab.url.match(/.*uims\.cuchd\.in\/UIMS.*Attendance.*/) != null) {
            chrome.tabs.executeScript(
                tab.id,
                { file: "jquery-3.4.1.js" },
                function () {
                    chrome.tabs.executeScript(
                        tab.id,
                        { file: "funcs.js" },
                        function () {
                            chrome.tabs.executeScript(tab.id, {
                                code: "developerZone(extractData());",
                            });
                        }
                    );
                }
            );
            chrome.tabs.executeScript(
                tab.id,
                { file: "sweetalert.min.js" },
                function () {
                    chrome.tabs.executeScript(tab.id, {
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
        } else if (tab.url.match(/.*uims\.cuchd\.in\/UIMS.*/) != null) {
            chrome.tabs.executeScript(
                tab.id,
                { file: "sweetalert.min.js" },
                function () {
                    chrome.tabs.executeScript(tab.id, {
                        code: `swal({
                            title: "You are almost there",
                            text: "Would you like to open the attendance page?",
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
                                {window.open("https://uims.cuchd.in/UIMS/frmStudentCourseWiseAttendanceSummary.aspx", "_self");}
                        });`,
                    });
                }
            );
        } else {
            chrome.tabs.executeScript(
                tab.id,
                { file: "sweetalert.min.js" },
                function () {
                    chrome.tabs.executeScript(tab.id, {
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
    } else if (info.menuItemId == "loadData") {
        if (tab.url.match(/.*uims-assistant\.web\.app.*/) != null) {
            chrome.tabs.executeScript(
                tab.id,
                { file: "jquery-3.4.1.js" },
                function () {
                    chrome.tabs.executeScript(
                        tab.id,
                        { file: "funcs.js" },
                        function () {
                            chrome.tabs.executeScript(tab.id, {
                                code: `chrome.storage.sync.get(['attendanceData'], function(result) {
                                    localStorage.setItem("attendanceData", JSON.stringify(result.attendanceData));
                                    location.reload();
                                });`,
                            });
                        }
                    );
                }
            );
        } else {
            chrome.tabs.executeScript(
                tab.id,
                { file: "sweetalert.min.js" },
                function () {
                    chrome.tabs.executeScript(tab.id, {
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
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "extractData",
        title: "Extract Attendance Data",
        contexts: ["all"],
        documentUrlPatterns: ["https://uims.cuchd.in/UIMS/*"],
    });

    chrome.contextMenus.create({
        id: "loadData",
        title: "Load Attendance Data",
        contexts: ["all"],
        documentUrlPatterns: ["https://uims-assistant.web.app/*"],
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlMatches:
                                "uims.cuchd.in/UIMS/frmStudentCourseWiseAttendanceSummary.aspx",
                        },
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlMatches: "uims-assistant.web.app",
                        },
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlMatches: "localhost",
                        },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);

        // chrome.storage.sync.get("attendanceData", function (data) {
        //     if (data) {
        //         console.log("data found");
        //         console.log(data);
        //         // chrome.browserAction.setPopup({
        //         //     popup: "popup-assistant.html",
        //         // });
        //     } else {
        //         console.log("no data found");
        //         // chrome.browserAction.setPopup({ popup: "popup-uims.html" });
        //     }
        // });
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (tab.url.match(/.*uims\.cuchd\.in\/UIMS.*Attendance.*/) != null) {
            chrome.pageAction.setPopup({
                tabId: tabId,
                popup: "popup-uims.html",
            });
        } else {
            chrome.pageAction.setPopup({
                tabId: tabId,
                popup: "popup-assistant.html",
            });
        }
    });
});

chrome.runtime.onMessageExternal.addListener(function (
    request,
    sender,
    sendResponse
) {
    chrome.storage.sync.get(["attendanceData"], function (result) {
        if (result.attendanceData) {
            sendResponse(result.attendanceData);
        } else {
            sendResponse({});
        }
    });
});
