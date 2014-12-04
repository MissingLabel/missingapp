MissingLabel
==========
App:
[Heroku App](https://missinglabel.herokuapp.com/)

Synopsis
===========

MISSINGlabel is a project that involves a native iOS front end that communicates with a Rails API backend. The app interface allows a user manually input a PLU number or scan a GS1 Databar stacked omnidirectional barcode from a wide variety of grocery store produce items. Upon scan, several navigable panes of information become available including nutrition facts, item origin, organic certification status,  storage suggestions, hints for in-store ripeness, as well as whether the item has been genetically modified.


Motivation
===========

The inspiration for this project came from a widespread and shared problem set surrounding the modern grocery store shopping experience. Shoppers are typically estranged from the logistical history, production processes, and in depth info regarding nutritional content of the food they consume. This is especially true for unpackaged fruits and vegetables. The goal of MISSINGlabel is to serve as an efficient interface for discerning what has been a previously decentralized data set.   As a team, we are passionate about this problem and strive to balance the informing of the user with the reality of time constraints in the already present cadence of navigating a grocery store.
                             
API Reference
===========

Our current Rails API obtains nutrition data from the USDA. The farm locations are represented as a response from the Google maps API. Additional food data has been mocked to represent expected available data from GS1 in 2015. We have contacted representatives from GS1 to ensure the format of this expected information in order to create an app that would accomodate a simple transition to live data. 

[Backend repo](https://github.com/MissingLabel/backend)

Tests
===========
Tests for our backend API utilize the Rspec testing suite and envelop models/controllers.

Authors
===========
Shreya Patel: [@shreya317](https://github.com/shreya317)

Michael Karouzos: [@multiviouskalogram](https://github.com/multiviouskalogram)

John Williams: [@john335](https://github.com/johnw335)

Gale Van Rossem: [@GaleForceVR](https://github.com/GaleForceVR)

License
===========
MIT
