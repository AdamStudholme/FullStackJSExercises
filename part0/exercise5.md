```mermaid

sequenceDiagram

participant Browser
participant Server

Browser->> Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate Server
Server->> Browser: Status Code: 200, Returns HTML for site
deactivate Server

Browser->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate Server
Server->> Browser:  Status Code: 200, Returns CSS file
deactivate Server

Browser->> Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
activate Server
Server->> Browser:  Status Code: 200, Returns Javascript 
deactivate Server

Note right of Browser: Browser starts to execute the Javascript and waits for repsonse from server.

Browser->> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate Server
Server->> Browser:  Status Code: 200, Returns JSON for list 
deactivate Server

Note right of Browser: Executes the event handler builds list from JSON file.
