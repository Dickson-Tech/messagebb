---
description: This section provides context for this Building Block.
---

# 2 Description

The Messaging Building Block provides a standardized, secure communication channel between GovStack service providers and end customers (in most cases citizens). By using GovStack Messaging Building Block, service providers rely on the building block's central functionalities, logging, back upping, security features, etc. without the need to reproduce and maintain them by themselves.

* For greenfield developments, it helps developers build communication components on top of different GovStack services, to make use of federated architecture when passing messages, including machine- and human-triggered (both synchronous and asynchronous) ones.
* Messaging Building Block is a standalone messaging gateway/client/proxy (including all possible modalities: email, SMS, etc.), but can also facilitate connections with existing messaging service providers, hence making the adoption process less disruptive for end users.

This Building Block can be used for messaging events in many different applications and use cases, such as:

* **Example A, encrypted:** after being enrolled into a Health Care Program for the mothers of a newborn child, a woman/caretaker receives a message from the Health Care Service Provider about a doctor's appointment. The message is routed to an existing communication channel/application, in use and provided by the mother.
* **Example B, unencrypted:** a reminder/notification message from the service provider to the mother about the same appointment. If a doctor decides to hold the consultation remotely, a link is sent to the mother and a video consultation is started (the conference is started and users join the room). The event is triggered by the Scheduler Building Block component and a new message is processed to the client.
* **Example C:** a user-initiated message regarding a doctor consultation, targeted to a Health Care Provider's phone number or a chatbot URL (universal or targeted messaging back to the system).

## **Examples of Messaging Building Block**

Messaging Building Block is enabling signing up for and receiving services, such as:

* mother and childcare;
* social care;
* receiving entitlements from the government;
* opening bank accounts;
* communicating disaster messages or reminders about the voters' rights during elections;
* etc.

The use cases are detailed in the section of the following document: [ANNEX I - Use Case Tables](10-sample-implementation.md#annex-i-use-case-tables-and-component-diagrams).



## Out-of-Scope Assumptions

* Communication between different government services (government to government) is out of the scope of this Building Block but can be enabled through the Information Mediator Building Block.
* Scheduling messages according to some business logic is out of the scope of this Building Block because is done by Scheduler Building Block.
* Processing of incoming message content to apply some business logic.
* Fully offline and no internet connection scenarios.
* Real-time video and audio conferencing.
