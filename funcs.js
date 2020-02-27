function textToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function copy() {
    let keys = [],
        data = [];
    $("tr")
        .find("th")
        .each(function() {
            if ($(this).text() != "View Attendance") {
                keys.push($(this).text());
            }
        });
    $("tr").each(function() {
        temp = [];
        $(this)
            .find("td")
            .each(function() {
                if ($(this).text() != "") {
                    temp.push($(this).text());
                }
            });
        if (temp.length > 0) {
            data.push(temp);
        }
    });
    console.log({ keys, data });
    return { keys, data };
}

function generate({ keys, data }) {
    actual = { attendance: [] };
    for (i = 0; i < data.length; i++) {
        temp = [];
        for (j = 0; j < data.length; j++) {
            temp.push({
                [keys[j]]: data[i][j]
            });
        }
        actual.attendance.push(temp);
    }
    textToClipboard(JSON.stringify(actual));
    alert("Copied To Clipboard");
    return actual.attendance;
}
