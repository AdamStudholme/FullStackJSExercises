```mermaid
sequenceDiagram
    participant Browser
    participant Server

    note left of Browser: User inputs new note and hits the save button
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Server->> Browser: Status code: 302, URL Redirect
    deactivate Server

    Browser->> Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server->> Browser: Status code: 200, returns HTML Document
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: Status code: 200, returns css file
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server-->>Browser: Status code: 200, returns JavaScript file
    deactivate Server
    note right of Browser: Browser starts to execute JavaScript that fetches the JSON from server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: Status code: 200, returns JSON [{ "content": "<note>", "date": "<currDateTime>" }, ... ]
    deactivate Server

    note right of Browser: Browser executes an event handler that renders the returned JSON data.




