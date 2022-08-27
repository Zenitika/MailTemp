<p align="center"><img src="assets/Logo.jpg"><p>
<br/>

#### Table of contents:
- [Authors](#authors)
- [About app](#about-app)
- [Installation instructions](#installation-instructions)
- [Application launch instructions](#application-launch-instructions)
- [Known bugs and usage questions](#known-bugs-and-usage-questions)
- [Contact Information](#contact-information)
- [License](#license)

### Authors
___
- Zenitika
### About app
___
​ ​ ​ ​ ​ ​ ​ ​ Accessible temporary mail right on your desktop.

[Back to table of contents](#table-of-contents)

<br>

### Installation instructions
___
​ ​ ​ ​ ​ ​ ​ ​ This is a portable application, so it does not need to be installed. And for correct operation, it is desirable that the Chrome browser is installed on your PC.  
 ​ ​ ​ ​ ​ ​ ​ If you decide to build the .exe file from sources yourself, then you will need installed python, version 3.10.4 or higher, and installed dependencies from the "requirements.txt" file. Next, you can create an .exe in the following way:
 1. Setting up virtualenv with required Python version and specified required Python packages from "requirements.txt" file
 2. Installing PyInstaller ```pip install PyInstaller```
 3. In the application folder do ```python -m eel main.py web --onefile --noconsole```

[Back to table of contents](#table-of-contents)

<br>

### Application launch instructions
___
 ​ ​ ​ ​ ​ ​ ​ Just run the file "Mail Temp.exe"

[Back to table of contents](#table-of-contents)

<br>

### Known bugs and usage questions
___
1. Unfortunately, during testing, I encountered a problem that some files are downloaded damaged. I tried to find out what it could be connected with and came to the conclusion that the problem is most likely from the 1secmail service.
    > I also managed to restore the damaged archive using standard WinRAR tools.
2. If you are unable to connect to the API, then try enabling / disabling the VPN or proxy. And of course check your internet connection.
3. If you refresh the page, the fields "Your mail:" and "API connection:" will lose their values. Do not be afraid, you can still use the mail that you had before the reboot, letters will calmly come to you and be displayed

[Back to table of contents](#table-of-contents)

<br>

### Contact Information
___
[![Element](https://img.shields.io/badge/-Element-141321?style=for-the-badge&logo=Element&logoColor=green)](https://matrix.to/#/@zenitika:matrix.org)
[![GitHub](https://img.shields.io/badge/-My_GitHub-141321?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/Zenitika)
![ProtonMail](https://img.shields.io/badge/-zenitika@proton.me-141321?style=for-the-badge&logo=ProtonMail&logoColor=#8653d4)


[Back to table of contents](#table-of-contents)

<br>

### License
___
This project is licensed under the MIT License - see the LICENSE file for details

[Back to table of contents](#table-of-contents)