function onClickHandler(info, tab) {
    if (info.menuItemId == "extractData") {
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
    } else if (info.menuItemId == "loadData") {
        chrome.tabs.executeScript(
            tab.id,
            { file: "jquery-3.4.1.js" },
            function () {
                chrome.tabs.executeScript(
                    tab.id,
                    { file: "funcs.js" },
                    function () {
                        chrome.tabs.executeScript(
                            tab.id,
                            {
                                file: "sweetalert.min.js",
                            },
                            function () {
                                chrome.tabs.executeScript(tab.id, {
                                    code: `chrome.storage.sync.get(['attendanceData'], function(result) {
                                        if(result.attendanceData) {
                                            sessionStorage.setItem("attendanceData", JSON.stringify(result.attendanceData));
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
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "extractData",
        title: "Extract Attendance Data",
        contexts: ["all"],
        documentUrlPatterns: [
            "https://uims.cuchd.in/UIMS/frmStudentCourseWiseAttendanceSummary.aspx",
        ],
    });

    chrome.contextMenus.create({
        id: "loadData",
        title: "Load Attendance Data",
        contexts: ["all"],
        documentUrlPatterns: ["https://uims-assistant.web.app/demo"],
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
                            urlMatches: "uims-assistant.web.app/demo",
                        },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});

chrome.runtime.onMessageExternal.addListener(function (
    request,
    sender,
    sendResponse
) {
    if (request === "attendanceData")
        chrome.storage.sync.get(["attendanceData"], function (result) {
            if (result.attendanceData) {
                sendResponse(result.attendanceData);
            } else {
                sendResponse({});
            }
        });
    else if (request === "ping") sendResponse("pong");
    else sendResponse(null);
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
