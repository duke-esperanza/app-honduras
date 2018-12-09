# App Maintenence

This doccument is for IT personel at Clinica Esperanza so that you can better update and maintain features of the app. 

This document will discuss the following:
- Using Github for setting up the environment
- Updating the local/clinic airtable to interact with the website
- Using Surge for histing the website


## GitHub
Git hub is a versioning software that is an open source project under Microsoft. We use github for Continuous Integration. The following directions are for the Gitlab repository, but should be easily transferable to GitHub.

To set up Continuous Integration, you must first set up Environment Variables. To do so you first navigate to CI/CD settings.

![Alt text](../img/Gitlab_to_ENV_vars.gif?raw=true "Title")

After you have navigated to the page you will see a tab were you can input Environment variables. For our application we have 5 Environment variables. three of these are required variables, while the other two are dependent if you are hosting with surge. 

![Alt text](../img/Gitlab_Variables.gif?raw=true "Title")

The five variables are
- REACT_APP_AIRTABLE_BASE : this variable is for conneting to the airtable database. more on this below.
- REACT_APP_AIRTABLE_KEY: this variable is for conneting to the airtable database. more on this below.
- REACT_APP_PASSWORD: This variable is for application security purposes. This is a password that you must enter to gain access to the site. We recommend you change the password every 6 months, and abide by standard password rules. 
- SURGE_LOGIN: (optional/hosting) This will allow you to host the website online. more about this below.
- SURGE_TOKEN: (optional/hosting) This will allow you to host the website online. more about this below.

## Airtable Database
Since Clinica Esperanza utilizes an airtable database for its data, we have made it so that our application will work with a generic table inside of any airtable database provided that the table shares the same database schema. In the section about variables above, we mention that there are two essential variables we need to access the database, (Base and Key). This section will walk through how to setup your local airtable and how to add the airtable base and key so that the application can access it.

To create an Airtable for your own clinic, first navigate to airtable.com and either enter the base you are already on, or create a new base. Inside your base you are going to create a table with the name "appointments". This table will have 7 columns (chart_number, first_name, last_name, date, appointment_time, phone, status).The names of these columns must be exact in order for your table to work correctly with our application. You may need to modify these to fit the formats given in the image below.

![Alt text](../img/Airtable_Database.png?raw=true "Title")

To get the base id and your api key, navigate to airtable.com/api at this link, you can click on your airtable, click on node.js and show API key. If you scroll down, you will be able to identify the API Key and the base id. Put these into the CI/CD variables on GitHub. 

![Alt text](../img/Airtable_keys.gif?raw=true "Title")

## Surge
since our application is a single page, serverless website, we decided to use surge for hosting the webpage. Surge allows us to host the webpage at a webpage we specify in our yaml file. For further direction hosting the webpage we recommend looking at our yaml file as well as going to surge.sh for more details on hosting. you will need to create your own surge acccount with an email, and gain access to the token by typing 'surge token' into the terminal. Put both the email and password into the CI/CD environment variables. 

![Alt text](../img/domain.png?raw=true "Title")