# UIMS ![Extension Logo](https://github.com/dsp9107/UIMS-Data-Extractor-Chrome-Extension/blob/master/images/32w/Artboard%201.png)ssistant

This Chrome Extension Assists Users Maintain Their Attendance While Having Fun As Well And Developers Extract Data From [UIMS](https://uims.cuchd.in/uims) And Utilize The Same In Any Constructive Way They Can Imagine.

### Installation

-   Clone or download this repository and extract the zip
-   Head over to `chrome://extensions`
-   Turn on `Developer Mode`
-   Click on `Load Unpacked`
-   Browse and select the root folder where you extracted the zipped repo
-   It will install the extension and it should appear in the chrome extensions bar

### Usage - For Normal Users

-   Log in
-   Head To Attendance Section
-   Click on extension icon ![Extension Logo](/images/24w/Artboard%201.png)
-   Click on `Insights`

### Usage - For Developers

-   Click on `Extract`
-   Attendance Data will be copied to your clipboard in the following format :

```javascript
[
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
```
