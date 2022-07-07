# Budget-Tracker-PWA
a budget tracker application that has been updated to allow for offline access and functionality.

## The Task
The challange of this project was to update an existing budget tracker application to allow for offline access and functionality. The user will be able to add expenses and deposits to their budget with or without a connection. If the user enters transactions offline, the total should be updated when they're brought back online. 

## App Features 

### Offline Functionality
IndexedDB is used to store information while offline. Once the connection is restored, the information(transactions) are posted to the general database.

A service worker has been added to the application. 


### Deployment
The app is deployed to Heroku and it uses MongoDB Atlas as a host for the Database.


## Links

The URL of the functional, deployed application.
https://budget-app-isaiasqb.herokuapp.com/


The URL of the GitHub repository, with a unique name and a README describing the project.
https://github.com/isaiasqb/Budget-Tracker-PWA
