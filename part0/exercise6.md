```mermaid
sequenceDiagram
    participant Browser
   participant Server
   

   note right of Browser: User inputs note and clicks submit, and the Javascript event handler handles form submit.

   activate Server
   Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
   note right of Browser: POST request contains new_note as JSON
   Server->>Browser: Status code: 201, created. 
   deactivate Server

 
