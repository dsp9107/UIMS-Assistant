function knock(info, tab) {
    console.log("KNOCK");
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "knockKnock",
        title: "My Attendance Goals",
        contexts: ["page"],
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
                            urlMatches: "localhost:5000",
                        },
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlMatches: "uims-assistant.web.app",
                        },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});
