# UIMS Assistant Chrome Extension

This Chrome Extension Assists Users In Extracting And Utilizing Data Stored on UIMS

### Installation

-   Clone or download this repository and extract the zip
-   Head over to `chrome://extensions`
-   Turn on `Developer Mode`
-   Click on `Load Unpacked`
-   Browse and select the root folder where you extracted the zipped repo
-   It will install the extension and it should appear in the chrome extensions bar

### Usage

-   Log in
-   Head To Attendance Section
-   Click on extension icon :heart:
-   Click on `Extract Attendance Data`
-   A JSON Object will be copied to your clipboard in the following format :

```javascript
{
    attendance: [
        {
            "Course Code": "XXX-xxx",
            "Title": "XXXXXXXXXX",
            "Total Delv.": "xx",
            "Total Attd.": "xx",
            "Duty Leave N P": "xx",
            "Duty Leave Others": "xx",
            "Medical Leave": "xx",
            "Eligible Delivered": "xx",
            "Eligible Attended": "xx",
            "Eligible Percentage": "xx.xx"
        },
        ...
    ]
}
```
