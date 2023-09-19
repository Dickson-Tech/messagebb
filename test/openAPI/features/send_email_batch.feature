@method=POST @endpoint=/send/email/batch
Feature: Send batch emails

    @smoke @unit @positive
    Scenario: User successfully sends a batch email smoke type test

        Given User wants to send a batch emails
        When User sends "POST" request to /send/email/batch url with given "xyz0987" as api_key and required body
        Then User receives a response from /send/email/batch endpoint
        And The /send/email/batch response should be returned in a timely manner 15000ms
        And The /send/email/batch response should have status 200
        And The /send/email/batch response should have "content-type": "application/json" header
        And The /send/email/batch response should match json schema


    @unit @negative
    Scenario Outline: User is unable to send a batch emails due to unallowed method in the request

        Given User wants to send a batch emails
        When User sends "<unallowedMethod>" request to /send/email/batch url with given "<api_key>" as api_key and required body
        Then User receives a response from /send/email/batch endpoint
        And The /send/email/batch response should be returned in a timely manner 15000ms
        And The /send/email/batch response should have status 405 - Method not allowed
        And The /send/email/batch response should contain Allow header with POST method which is allowed

        Examples:
        | unallowedMethod  | api_key  |
        | GET              | xyz12345 |
        | DELETE           | xyz12345 |
        | PUT              | xyz12345 |
