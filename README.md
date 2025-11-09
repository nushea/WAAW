WÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃÃW 

**W**indow f**ĩ**le **W**atcher
A react project that shows the user file structure through an api blob ran locally on the system at :80/api/wawAPI/

The API outputs the given directory's files in the following form

* ##--#--#-- 12.20G file1
* -##-##-##- 4.000K file2

Where the first part is \[directory]\[read]\[write]\[execute]\[read]\[write]\[execute]\[read]\[write]\[execute], in the order that `ls -l` would display the permissions and the second part is the size of the file so that the number has 4 digits and size type
