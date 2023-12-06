# Project1
Repository for QA project 1 

---

### Links:
- Project details:  https://gitlab.com/qa1322911/lloyds-dundee-software/-/tree/main?ref_type=heads  
- Trello board link: https://trello.com/invite/b/LzjLiuOJ/ATTI4359593e6ae96348ea13f853467a40cd93890CB7/qa-project-1-user-stories  


### Ports
For the purpose of this project:  
 - the website will run on port:  3000  
 - the database will run on port: 8081

### Launching
- In terminal, go to directory '/Project1/estate-agent' and run:           npx json-server --watch db.json --port 8081
- In another terminal, go to directory '/Project1/estate-agent' and run:   npm start

---

### Points of improvement / refactoring:
- view button in 'Filtering Page' doesn't like the 'height' css, so it's just padded to fit the grid instead of being functional

- scroll bar moves everything to the left when it does appear.
    - would rather it always be there so components don't move when navigating between pages
    - *Temporary solution*: nothing
