
# Email-to-Excel Exporter 📧➡️📊


Email-to-Excel Exporter 📧➡️📊
This project provides a straightforward solution for saving selected email data to an Excel file, with features that enhance email organization and accessibility.


## 🌟 Features

* Email Selection & Export: Choose specific emails to save to an Excel file, putting you in control of what gets exported.

* Saved & Unsaved Status: Instantly view which emails have been saved and which ones are unsaved, keeping you organized at a glance.

* Detailed Email View: Click on any email to see important details like subject, date, URL, and sender information.

* Customizable Excel Export: Export all selected emails, including their detailed info, to an Excel file for easy record-keeping and analysis.


## 📂 Project Structure
* Frontend: Interface to view, select, and manage email data.
* Server: Handles email fetching, data processing, and Excel file generation.

## 🚀 Getting Started

Clone the project

```bash
  git clone https://github.com/Anshalll/Email-Excel-app.git
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Before you start the server get the gmail api credentials. Also set the test user with your email id that will be used in this project, Once you do that run the server.

```bash
  python app.py

``` 
Now you will get a link in the terminal, go to that link and you will see error page of google auth , copy the redirect uri and paste it in the cloud console project redirect uri and save it, now re open the same link and now you can authenticate , you will get a token.json file. Once you get it , start the server by running: 


```bash
  python server.py

``` 
now go to client directory


```bash
  cd client
```
Install dependencies

```bash
  npm install
```

start the server

```bash
  npm start
```

And all set.
