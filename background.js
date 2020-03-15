function knock(info, tab) {
    console.log("KNOCK");
}

chrome.runtime.onInstalled.addListener(function() {
    // chrome.storage.sync.set({ color: "#3aa757" }, function() {
    //     console.log("The color is green.");
    // });

    chrome.contextMenus.create({
        id: "knockKnock",
        title: "test drive",
        contexts: ["page", "selection"]
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        //pageUrl: { hostEquals: "developer.chrome.com" }
                        pageUrl: {
                            urlMatches:
                                "uims.cuchd.in/UIMS/frmStudentCourseWiseAttendanceSummary.aspx"
                        }
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});
