WÃÃW

**W**indow f**ĩ**le **W**atcher
A react project that emulates a Desktop Environment.

This project requires an API as a layer between the DE and the (potentially emulated) file structure. This API is located at :80/api/wawAPI/

The API is called with a specific path and depending on whether the path points to a directory or a file it outputs the given directory's files or the raw binary data of the file.

In the case that it is given the path to a directory, the file structure is outputed as below:
* ##--#--#-- 12.20G file1
* -##-##-##- 4.000K file2

Where the first part is \[directory]\[read]\[write]\[execute]\[read]\[write]\[execute]\[read]\[write]\[execute], in the order that `ls -l` would display the permissions and the second part is the size of the file so that the number has 4 digits and size type

This Desktop Environment is extensible, allowing applications to be developed to it, communicating to them through the backronym-ically named 'Process Individual Data' (PID) that contains the following:

{ \\
    apptype: React Component; (representing the actual main function of the application to be ran) \\
    id: string; (the process's identifier within the desktop environment) \\
    title: string; (the title that should be used when referring to the app within the Sidebar, Decorator and potential sub-apps or super-apps) \\
    icon: string; (the path to the image that is to be used to refer to the app within the Sidebar) \\
    args: string; (the arguments that the application is able to process in a shell-like manner) \\
} \\
Roadmap: \\
    Application environment → Mostly implemented (missing proper application determinism) \\
    Sidebar → Implemented \\
    Desktop → Implemented \\
    Context menus → To be implemented \\
    File Explorer → Implemented \\
    Informational App → implemented \\
    Image Viewer → Implemented \\
    Video Viewer → To be implemented \\
    Text Viewer → To be implemented \\
    Hex Viewer → To be implemented \\
    Shell Emulator → TBD if it will be implemented \\
    Browser Emulator → TBD if it will be implemented \\
    Local Files → TBD if it will be implemented \\
    Local States → TBD if it will be implemented \\
    Scope Creep → TBD when it will end \\

