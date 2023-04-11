@method=GET @endpoint=/status/email
Feature: Get status of your email

    @smoke @unit @positive
    Scenario: User successfully checks a status of an email smoke type test

        Given User has sent a single email and got requestUID
        And User wants to check the status of the email
        When User sends "GET" request with given "abcdef12345" as api_key and valid requestUID
        And User selects to see all statuses "scheduled", "processing", "deferred", "bounced", "not sent" and "delivered"
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 200
        And The /status/email response should have content-type: application/json header
        And The /status/email response should match json schema
        And The /status/email response should have all statuses which the user selected


    @smoke @unit @positive
    Scenario: User successfully checks a status of emails sent in batch smoke type test

        Given User has sent a batch of emails and got requestUID
        And User wants to check the status of the email
        When User sends "GET" request with given "abcdef12345" as api_key and valid requestUID
        And User selects to see all statuses "scheduled", "processing", "deferred", "bounced", "not_sent" and "delivered"
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 200
        And The /status/email response should have content-type: application/json header
        And The /status/email response should match json schema
        And The /status/email response should have all statuses which the user selected

    
    @unit @positive
    Scenario Outline: User successfully checks a status of an email

        Given User has sent a single email and got requestUID
        And User wants to check the status of the email
        When User sends "GET" request with given "<api_key>" as api_key and valid requestUID
        And User selects to fetch the data for: "<statuses>"
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 200
        And The /status/email response should have content-type: application/json header
        And The /status/email response should match json schema
        And The /status/email response should have all statuses which the user selected

        Examples:
        | statuses                      | api_key     |
        | scheduled                     | abcdef12345 |
        | processing, deferred, bounced | abcdef12345 |
        | not sent, delivered           | abcdef12345 |


    @unit @negative
    Scenario Outline: User cannot check the status the single email sent due to unallowed method in the request

        Given User has sent a single email and got requestUID
        And User wants to check the status of the email
        When User sends "<unallowedMethod>" request with given "<api_key>" as api_key and valid requestUID
        And User selects to see all statuses "scheduled", "processing", "deferred", "bounced", "not_sent" and "delivered"
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 405 - Method not allowed
        And The /status/email response should contain Allow header with POST method which is allowed

        Examples:
        | unallowedMethod  | api_key     |
        | POST             | abcdef12345 |
        | PUT              | abcdef12345 |


    @unit @negative
    Scenario Outline: User cannot check the status of emails sent in batch due to unallowed method in the request

        Given User has sent a batch of emails and got requestUID
        And User wants to check the status of the email
        When User sends "<unallowedMethod>" request with given "<api_key>" as api_key and valid requestUID
        And User selects to see all statuses "scheduled", "processing", "deferred", "bounced", "not_sent" and "delivered"
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 405 - Method not allowed
        And The /status/email response should contain Allow header with POST method which is allowed

        Examples:
        | unallowedMethod  | api_key     |
        | POST             | abcdef12345 |
        | PUT              | abcdef12345 |


    @unit @negative
    Scenario: User is unable to check the status of an email due to missing required api_key in the request

        Given User has sent a single email and got requestUID
        And User wants to check the status of the email
        When User sends "GET" request with valid requestUID
        And User selects to see all statuses "scheduled", "processing", "deferred", "bounced", "not sent" and "delivered"
        But The request is missing an api_key
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 405 - Method not allowed


    @unit @negative
    Scenario: User is unable to check the status of an email due to missing required requestUID in the request

        Given User wants to check the status of the email
        When User sends "GET" request with given "abcdef12345" as api_key
        And User selects to see all statuses "scheduled", "processing", "deferred", "bounced", "not sent" and "delivered"
        But The request is missing a requestUID
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 405 - Method not allowed


    @unit @negative
    Scenario: User is unable to check the status of an email due to missing required status in the request

        Given User has sent a single email and got requestUID
        And User wants to check the status of the email
        When User sends "GET" request with given "abcdef12345" as api_key and valid requestUID
        But User did not select any statuses that he wants to fetch
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 405 - Method not allowed


    @unit @negative
    Scenario: User is unable to check the status of the email due to missing required api_key, requestUID and status in the request

        Given User wants to check the status of the email
        When User sends "GET" request without required api_key, requestUID and status
        Then User receives a response from the /status/email endpoint
        And The /status/email response should be returned in a timely manner 15000ms
        And The /status/email response should have status 405 - Method not allowed
