function presents(a, d, p, t) {
    let s = 0;
    while (p < t) {
        a += 1;
        d += 1;
        p = (a / d) * 100;
        // p = round((a / d) * 100, 2);
        s += 1;
    }
    return s;
}

function absents(a, d, p, t) {
    let s = 0;
    while (true) {
        d += 1;
        p = (a / d) * 100;
        // p = round((a / d) * 100, 2);
        if (p > t) {
            s += 1;
            continue;
        } else break;
    }
    return s;
}

function createTable(data) {
    if ($("#frozen").length) {
        return;
    }

    //Lock Scroll
    $("body").css({ overflow: "hidden" });

    //Generate Elements
    var myFont = document.createElement("link");
    myFont.href =
        "https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap";
    myFont.rel = "stylesheet";

    var overlay = document.createElement("div");
    overlay.className = "my-overlay";
    overlay.id = "frozen";

    var divMain = document.createElement("div");
    divMain.className = "my-main";

    var divHolder = document.createElement("div");
    divHolder.className = "my-row";

    var divHeading = document.createElement("div");
    divHeading.className = "my-holder";
    divHeading.style.cssText = "width: 100%; text-align: left";

    var heading = document.createElement("span");
    heading.className = "my-span";
    heading.innerText = "My Attendance Goals - Insights";

    var divClose = document.createElement("div");
    divClose.className = "my-holder";
    divClose.style.cssText = "text-align: right";

    var closeOverlay = document.createElement("span");
    closeOverlay.className = "my-cta";
    closeOverlay.innerText = "X";
    closeOverlay.onclick = () => {
        document.body.removeChild(overlay);
        $("body").css({ overflow: "visible" });
        document.head.removeChild(stylo);
    };

    var divTable = document.createElement("div");
    divTable.className = "my-holder";

    var stylo = document.createElement("style");
    stylo.innerHTML = `:root {
        /* --primary-color: #fefefe;
        --secondary-color: #1a1a1a; */
        --primary-color: #1a1a1a;
        --secondary-color: #fefefe;
        --accent-blue-color: #328da8;
        --accent-yellow-color: #f4a11b;
        --red-color: #be0000;
        --green-color: #006e00;
    }

    * {
        font-family: "Ubuntu", sans-serif;
    }

    .my-holder {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        text-align: center;
        width: auto;
        padding: 5px;
        // border: 1px solid #f5f5f5;
    }

    .my-heading {
        margin: 5px;
        padding: 5px;
        font-weight: 400;
        font-size: 22px;
        color: var(--primary-color);
    }

    .tablez {
        font-family: "Ubuntu", sans-serif;
        margin: 0px 5px 5px 5px;
        padding: 5px;
    }

    .tablez th {
        background-color: rgb(240,240,240);
        text-align: center;
    }

    .tablez td {
        padding: 5px;
        color: black;
    }

    .tablez tr {
        background-color: rgb(250,250,250);
        height: 40px;        
    }

    .tablez tr.lab:hover,tr:hover {
        background-color: var(--accent-yellow-color);
    }

    .tablez td.red {
        background-color: var(--red-color);
        color: #f5f5f5;
    }

    .tablez td.green {
        background-color: var(--green-color);
        color: #f5f5f5;
    }

    .tablez tr.lab {
        background-color: rgb(245,245,245);
    }

    .my-overlay {
        display: flex;
        justify-content: center;
        font-family: "Ubuntu", sans-serif;
        padding: 5px;
        backdrop-filter: blur(5px);
        text-align: center;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        z-index: 10000;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .my-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 10px 5px 10px 5px;
        padding: 5px;
    }

    .my-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px;
    }

    .my-main {
        font-family: "Ubuntu", sans-serif;
        top: 10px;
        min-width: 50%;
        height: min-content;
        margin: 5px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        background-color: white;
    }
    
    .my-cta {
        font-family: "Ubuntu", sans-serif;
        font-size: x-large;
        right: 0px;
        cursor: pointer;
    }

    .my-span {
        font-family: "Ubuntu", sans-serif;
        font-weight: 500;
        font-size: x-large;
        width: auto;
    }
`;

    //Generate Table
    let table = document.createElement("table");
    let columnCount = data[0].length;
    let row = table.insertRow(-1);
    var headerCell;
    for (var i = 0; i < columnCount; i++) {
        if ([0, 1, 7, 8, 9].includes(i)) {
            headerCell = document.createElement("TH");
            headerCell.innerHTML = data[0][i];
            row.appendChild(headerCell);
        }
    }

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "75%";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "90%";
    row.appendChild(headerCell);

    const labRegEx = /(lab)/i;

    for (i = 1; i < data.length; i++) {
        row = table.insertRow(-1);
        if (data[i][1].match(labRegEx)) {
            row.className = "lab";
        }
        for (var j = 0; j < columnCount; j++) {
            if ([0, 1, 7, 8, 9].includes(j)) {
                var cell = row.insertCell(-1);
                cell.innerHTML = data[i][j];
            }
        }
        let a = parseInt(data[i][8]);
        let d = parseInt(data[i][7]);
        let p = parseInt(data[i][9]);
        var cell1, cell2;
        if (p >= 90) {
            cell1 = row.insertCell(-1);
            cell1.innerText = "+" + absents(a, d, p, 75);
            cell1.className = "green";
            cell2 = row.insertCell(-1);
            cell2.innerText = "+" + absents(a, d, p, 90);
            cell2.className = "green";
        } else if (p >= 75) {
            cell1 = row.insertCell(-1);
            cell1.innerText = "+" + absents(a, d, p, 75);
            cell1.className = "green";
            cell2 = row.insertCell(-1);
            cell2.innerText = "-" + presents(a, d, p, 90);
            cell2.className = "red";
        } else {
            cell1 = row.insertCell(-1);
            cell1.innerText = "-" + presents(a, d, p, 75);
            cell1.className = "red";
            cell2 = row.insertCell(-1);
            cell2.innerText = "-" + presents(a, d, p, 90);
            cell2.className = "red";
        }
        cell1.style.fontWeight = 500;
        cell1.style.fontSize = "45px";
        cell2.style.fontWeight = 500;
        cell2.style.fontSize = "55px";
    }
    table.className = "tablez";

    //Arrange Everything
    divHeading.appendChild(heading);
    divClose.appendChild(closeOverlay);
    divTable.appendChild(table);

    divHolder.appendChild(divHeading);
    divHolder.appendChild(divClose);

    divMain.appendChild(divHolder);
    divMain.appendChild(divTable);

    overlay.appendChild(divMain);

    document.body.appendChild(overlay);
    document.head.appendChild(myFont);
    document.head.appendChild(stylo);
}

// function textToClipboard(text) {
//     var dummy = document.createElement("textarea");
//     document.body.appendChild(dummy);
//     dummy.value = text;
//     dummy.select();
//     document.execCommand("copy");
//     document.body.removeChild(dummy);
// }

function extractData() {
    console.log({ location: window.location.host });
    if (window.location.host.match(/.*\.?cuchd\.in.*/) != null) {
        let keys = [],
            data = [];
        $("tr")
            .find("th")
            .each(function () {
                if ($(this).text() != "View Attendance") {
                    keys.push($(this).text());
                }
            });
        $("tr").each(function () {
            temp = [];
            $(this)
                .find("td")
                .each(function () {
                    if ($(this).text() != "") {
                        temp.push($(this).text());
                    }
                });
            if (temp.length > 0) {
                data.push(temp);
            }
        });
        let internalData = [];
        internalData.push(keys);
        data.forEach((d) => {
            internalData.push(d);
        });

        chrome.storage.sync.set(
            {
                attendanceData: {
                    data: internalData,
                    desc: "data",
                    version: 1,
                },
            },
            console.log("stored")
        );
        return { keys, data };
    } else {
        return null;
    }
}

function generateInsights({ keys, data }) {
    let internalData = [];
    internalData.push(keys);
    data.forEach((d) => {
        internalData.push(d);
    });
    createTable(internalData);
    return internalData;
}

function developerZone(incoming) {
    if (incoming.keys && incoming.data) {
        actual = { attendance: [] };
        for (i = 0; i < incoming.data.length; i++) {
            temp = {};
            for (j = 0; j < incoming.data.length; j++) {
                temp[incoming.keys[j]] = incoming.data[i][j];
            }
            actual.attendance.push(temp);
        }
        // textToClipboard(JSON.stringify(actual.attendance));
        return actual.attendance;
    } else {
        return null;
    }
}
