```mermaid

sequenceDiagram

participant Browser
participant Server

Browser->> Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate Server
Server->> Browser: Returns HTML for site
deactivate Server

Browser->> Server