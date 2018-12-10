# Technical Documentation
![Alt text](../img/folder_hierarchy.png?raw=true "Title")
(Folder Hierarchy)

## Content
[doc](#doc)<br>
[img](#img)<br>
[meeting_notes](#meeting_notes)<br>
[public](#public)<br>
[source](#source)<br>
[UI](#UI)<br>
[.gitlab-ci.yml](#.gitlab-ci.yml)<br>
[LICENSE](#LICENSE)<br>
[package.json](#package.json)<br>
[README.md](../README.md)<br>
[.env](#.env)<br>

## doc
The doc folder holds the majority of the documentation for this repository. the different documentations are based on who needs access to different spects of the project. If you are a user (nurse or doctor at Clinica Esperanza), you should refer to the UserDocumentation. If you are an IT personel who is tasked with updating the hosting of the website, changing the password protection, and other issue, you should refer to AppMaintenanceDocumentation. If you are another programmer who plans to continue with this project, for knowledge of the current design of the project, refer to this documentation. For knowledge of items in our groups backlog, refer to BACKLOG.
## img
The img folder holds all the images that are related with documentation in the repository.
## meeting_notes
    This document holds all of the information about meetings between Peggy Stranges and the Development Team at Duke University. If this repository is shared with individuals outside of Clinica Esperanza, we recommend that this folder is removed.
## public 
    The public folder contains all the information necessary to host the application. this is created automatically by react-scripts, a package that comes with create react app. If a new Icon image is created for the application, we recommend that you add it to this folder, and alter the index.HTML to reflect the new Icon. The title of the application can also be change in this location as well.
## source
### components
The components folder contains all the components used throughout the application for functionality. They are all created using Reactjs, the js framework created by facebook.
The components are as follows:

1) about.js
    - The about page displays information about the application. it is a description of the application, and Clinica Esperanza, the client for whom the app was created.
2) body.js
    - This component is the component that encapsules everything underneath the topbar. This utilizes React Router Routes to alter the information shown in the body based on the path given to the url.
3) container.js
    - This component is the container for all of the tabs inside of the schedule page.
4) future_tab.js
    - This component has all of the information used to create the future appointment tab on the schedule page.
5) missed_tab.js
    - This component contains all of the information used to create the missed appointment tab on the schedule page.
6) newappointment.js
    - This component is a form for inputing a new appointment into the database. It utilizes the airtable api to send a post request to the airtable, which allows the database to be updated.
7) today_tab.js
    - This is the wrapper for the contents of the today's appointments tab on the chedule page.
8) todayAppointment.js
    - This component creates all of the individual expanding components inside of the today tab on the schedule page. the component allows for users to record the patients attendance as well as create a new appointment for the patient.
9) TopBar.js
    - This is the top bar of the application. It utilizes React Route NavLinks to allow navigation thoughout the application between the pages of about, update and schedule. for future uses, login and logout could also be held in this location.
10) updateappointment.js 
    - This page allows the user to look up appointments by date or patient name, and update all the fields of the appointment. It also allows for the user to create a new appointment. It accomplishes both of these actions by grabing all of the appointments from the database to allow for a search and pushing to the database on update or a new appointment creation.

### styles
    Styles contains the css files used to modify different components in the component tab. material-UI withstyle was used in every most situations, as it was much more efficient for styling the page. The css files are:
- tabs.css : This is used toformat the tabs on the schedule page.
- todayappt.css : This is used to modify the style of the components of the today tab on the schedule page.
- topbar.css : This is used to modify the style of the topbar
### test
    This folder holds all the test for the application. since this application relied heavily on access to a database, which we could not immediately gain access too, there are few test. Our test are done in Jest, the testing framework that comes with create-react-app.
### index.js
    Index.js contains all of the information that is needed to render the DOM of our application, as well as initializes React Router, the api used to allow for different routes/paths in our web application.
### serviceworker.js
    This comes as a default with the react router package. If there are future intentions of turning this application into a progressive web app, this would be the location to do such.
## UI
    This holds the initial ideas of how the app would work and look in Adobe XD files.
## .gitlab-ci.yml
    This is a yaml file that gitlab requires for continuos integration. This file allows us to test, build, and deploy our application through surge. Further detailed information about the continuos integration process can be found in the AppMaintenanceDocumentation.
## LICENSE
    The License use for our application is the MIT License. Our client has decided that this works best for the application.
## package.json
    This document contains all of the dependencies for application. These can easily be installed into the local environment by calling npm install. (Node.js must be installed first)
## .env
    This document is very important for the local environment, but is not included in the repository. for coding on the local environment, it is necessary for you to add the variables with the alias REACT_APP_vARIABLENAME mentioned in the AppMaintenanceDocumentation.