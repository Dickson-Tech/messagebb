@method=POST @endpoint=/send/email/single
Feature: Send single email

    @smoke @unit @positive
    Scenario: User successfully sends an email smoke type test

        Given User wants to send a single email
        When User sends "POST" request with given "abcdef12345" as api_key and required body
        Then User receives a response from /send/email/single endpoint
        And The /send/email/single response should be returned in a timely manner 15000ms
        And The /send/email/single response should have status 200
        And The /send/email/single response should have "content-type": "application/json" header
        And The /send/email/single response should match json schema


    @unit @negative
    Scenario Outline: User is unable to send an email due to unallowed method in the request

        Given User wants to send a single email
        When User sends "<unallowedMethod>" request with given "<api_key>" as api_key and required body
        Then User receives a response from /send/email/single endpoint
        And The /send/email/single response should be returned in a timely manner 15000ms
        And The /send/email/single response should have status 405 - Method not allowed
        And The /send/email/single response should contain Allow header with POST method which is allowed

        Examples:
        | unallowedMethod  | api_key     |
        | GET              | abcdef12345 |
        | DELETE           | abcdef12345 |
        | PUT              | abcdef12345 |
    

    @unit @negative
    Scenario: User is unable to send an email due to missing required api_key in the request

        Given User wants to send a single email
        When User sends "POST" request with required body
        But The request is missing an api_key
        Then User receives a response from /send/email/single endpoint
        And The /send/email/single response should be returned in a timely manner 15000ms
        And The /send/email/single response should have status 405 - Method not allowed

    @unit @negative
    Scenario: User is unable to send an email due to missing required body in the request

        Given User wants to send a single email
        When User sends "POST" request with given "abcdef12345" as api_key 
        But The request is missing a body
        Then User receives a response from /send/email/single endpoint
        And The /send/email/single response should be returned in a timely manner 15000ms
        And The /send/email/single response should have status 405 - Method not allowed

    @unit @negative
    Scenario: User is unable to send an email due to missing required api_key and body in the request

        Given User wants to send a single email
        When User sends "POST" request without required body and api_key
        Then User receives a response from /send/email/single endpoint
        And The /send/email/single response should be returned in a timely manner 15000ms
        And The /send/email/single response should have status 405 - Method not allowed
