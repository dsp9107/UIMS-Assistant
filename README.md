# UIMS Assistant Chrome Extension

This Chrome Extension Assists Users In Extracting And Utilizing Data Stored on UIMS

### Installation

- Clone or download this repository and extract the zip
- Head over to `chrome://extensions`
- Turn on `Developer Mode`
- Click on `Load Unpacked`
- Browse and select the root folder where you extracted the zipped repo
- It will install the extension and it should appear in the chrome extensions bar

### Usage

- Log in
- Head To Attendance Section
- Click on extension icon :heart:
- Click on `Extract Attendance Data`
- A JSON Object will be copied to your clipboard in the following format :
```javascript
{
  attendance: [
    [
      { "Course Code": "CSP-373" },
      { Title: "Identity and Access Management Lab" },
      { "Total Delv.": "16" },
      { "Total Attd.": "14" },
      { "Duty Leave N P": "0" },
      { "Duty Leave Others": "0" },
      { "Medical Leave": "0" },
      { "Eligible Delivered": "16" },
      { "Eligible Attended": "14" },
      { "Eligible Percentage": "87.5" },
      {}
    ],
    ...
  ]
}
```
