# OneTimeNotes
OTN is a simple realization of one-time self-destructing notes, which are encrypted in the browser using [TripleSec](https://keybase.io/triplesec "Official page of TripleSec") (Salsa20 + AES + Twofish) algorithm with randomly generated key. 

Original OTN runs at https://aan.sh/otnote

## Features:
* Thanks to client encryption, server never knows what's inside, and there's virtually no possibility to decrypt it on the server.
* Upon successful submission, a URL type of _{token}#{key}_ is generated - you don't need to type any passwords, and OTN already cared about sufficient complexity for you. 
* Direct access of the generated URL will show the decrypted note (using the _{key}_ in fragment). For security purposes, you may want to send the link without the key and provide the key via different channel, so the receiver will have to enter the key manually to decrypt your message.
* There is only one shot - once the URL is accessed, the note is permanently deleted from the server. Additionally, notes auto-expire in 72 hours after creation. OTN ignores most popular bot user agents, returning them 404 ([learn here why](https://techcrunch.com/2017/06/15/should-whatsapp-let-you-disable-url-previews/ "URL previews"))

Feedback and comments are welcome!
