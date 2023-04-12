@method=POST @endpoint=/callback/email
Feature: Respond to an email sent via Messaging BB

    @smoke @unit @positive
    Scenario: Callback endpoint successfully responds to an email sent via Messaging BB smoke type test

        Given Single email with given "abcdef12345" as api_key and valid payload is sent and returns requestUID
        When "POST" request with given "abcdef12345" as api_key and valid requestUID in the headers is sent
        And The request contains "Meta-info" as meta and "Q2xpZW50LXNwZWNpZmljIGNvbnRlbnQsIG1vc3QgbGlrZWx5IEpTT04=" as content in the payload
        Then The response from the /callback/email endpoint is received
        And The /callback/email response should be returned in a timely manner 15000ms
        And The /callback/email response should have status 200


    @smoke @unit @positive
    Scenario: Callback endpoint successfully responds to a batch of emails sent via Messaging BB smoke type test

        Given Batch of emails with given "abcdef12345" as api_key and valid payload is sent and returns requestUID
        When "POST" request with given "abcdef12345" as api_key and valid requestUID in the headers is sent
        And The request contains "Meta-info" as meta and "Q2xpZW50LXNwZWNpZmljIGNvbnRlbnQsIG1vc3QgbGlrZWx5IEpTT04=" as content in the payload
        Then The response from the /callback/email endpoint is received
        And The /callback/email response should be returned in a timely manner 15000ms
        And The /callback/email response should have status 200


    @unit @positive
    Scenario Outline: Callback endpoint successfully responds to an email sent via Messaging BB

        Given Single email with given "abcdef12345" as api_key and valid payload is sent and returns requestUID
        When "POST" request with given "abcdef12345" as api_key and valid requestUID in the headers is sent
        And The request contains "Meta-info" as meta and "<content>" as content in the payload
        Then The response from the /callback/email endpoint is received
        And The /callback/email response should be returned in a timely manner 15000ms
        And The /callback/email response should have status 200

        Examples:
        | content                                                                                                                                                                                                                                                  | 
        | ewogICJyZWNpcGllbnRJbmZvIjogewogICAgImVtYWlsIjogImN1c3RvbWVyQGV4YW1wbGUuY29tIiwKICAgICJlbWFpbENDIjogImN1c3RvbWVyLWNjQGV4YW1wbGUuY29tIiwKICAgICJlbWFpbEJDQyI6ICJjdXN0b21lci1iY2NAZXhhbXBsZS5jb20iLAogICAgIm5hbWUiOiAiRXhhbXBsZSBDdXN0b21lciIKICB9Cn0=     |
        | ewogICJyZWNpcGllbnRJbmZvIjogewogICAgImVtYWlsIjogImN1c3RvbWVyMkBleGFtcGxlLmNvbSIsCiAgICAiZW1haWxDQyI6ICJjdXN0b21lcjItY2NAZXhhbXBsZS5jb20iLAogICAgImVtYWlsQkNDIjogImN1c3RvbWVyMi1iY2NAZXhhbXBsZS5jb20iLAogICAgIm5hbWUiOiAiRXhhbXBsZSBDdXN0b21lciIKICB9Cn0= |


    @unit @negative
    Scenario Outline: Callback endpoint is unable to respond to an email sent via Messaging BB due to unallowed method in the request

        Given Single email with given "abcdef12345" as api_key and valid payload is sent and returns requestUID
        When "<unallowedMethod>" request with given "abcdef12345" as api_key and valid requestUID in the headers is sent
        And The request contains "Meta-info" as meta and "<content>" as content in the payload
        And The response from the /callback/email endpoint is received
        And The /callback/email response should be returned in a timely manner 15000ms
        And The /callback/email response should have status 405 - Method not allowed
        And The /callback/email response should contain Allow header with POST method which is allowed

        Examples:
        | unallowedMethod  | content                                                                                                                                                                                                                                                  | 
        | GET              | ewogICJyZWNpcGllbnRJbmZvIjogewogICAgImVtYWlsIjogImN1c3RvbWVyQGV4YW1wbGUuY29tIiwKICAgICJlbWFpbENDIjogImN1c3RvbWVyLWNjQGV4YW1wbGUuY29tIiwKICAgICJlbWFpbEJDQyI6ICJjdXN0b21lci1iY2NAZXhhbXBsZS5jb20iLAogICAgIm5hbWUiOiAiRXhhbXBsZSBDdXN0b21lciIKICB9Cn0=     |
        | PUT              | ewogICJyZWNpcGllbnRJbmZvIjogewogICAgImVtYWlsIjogImN1c3RvbWVyMkBleGFtcGxlLmNvbSIsCiAgICAiZW1haWxDQyI6ICJjdXN0b21lcjItY2NAZXhhbXBsZS5jb20iLAogICAgImVtYWlsQkNDIjogImN1c3RvbWVyMi1iY2NAZXhhbXBsZS5jb20iLAogICAgIm5hbWUiOiAiRXhhbXBsZSBDdXN0b21lciIKICB9Cn0= |


    @unit @negative
    Scenario: Callback endpoint is unable to respond to an email sent via Messaging BB due to missing api_key header in the request

        Given Single email with given "abcdef12345" as api_key and valid payload is sent and returns requestUID
        When "POST" request with given valid requestUID in the header is sent
        And The request contains "Meta-info" as meta and "Q2xpZW50LXNwZWNpZmljIGNvbnRlbnQsIG1vc3QgbGlrZWx5IEpTT04=" as content in the payload
        And The request is missing required api_key in the header
        Then The response from the /callback/email endpoint is received
        And The /callback/email response should be returned in a timely manner 15000ms
        And The /callback/email response should have status 405 - Method not allowed


    @unit @negative
    Scenario: Callback endpoint is unable to respond to an email sent via Messaging BB due to missing requestUID header in the request

        Given Callback endpoint is called without required requestUID
        When "POST" request with given "abcdef12345" as api_key in the header is sent
        And The request contains "Meta-info" as meta and "Q2xpZW50LXNwZWNpZmljIGNvbnRlbnQsIG1vc3QgbGlrZWx5IEpTT04=" as content in the payload
        And The request is missing required requestUID in the header
        Then The response from the /callback/email endpoint is received
        And The /callback/email response should be returned in a timely manner 15000ms
        And The /callback/email response should have status 405 - Method not allowed


    @unit @negative
    Scenario: Callback endpoint is unable to respond to an email sent via Messaging BB due to missing payload in the request

        Given Single email with given "abcdef12345" as api_key and valid payload is sent and returns requestUID
        When "POST" request with given "abcdef12345" as api_key and valid requestUID in the headers is sent
        And The request is missing required payload
        Then The response from the /callback/email endpoint is received
        And The /callback/email response should be returned in a timely manner 15000ms
        And The /callback/email response should have status 405 - Method not allowed
