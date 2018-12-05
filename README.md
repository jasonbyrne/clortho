
![alt Vinz Clortho](https://github.com/jasonbyrne/clortho-lite/blob/master/vinz-clortho.png?raw=true)

# Clortho-Lite

Let's give credit where it is due. This package is derived from: https://github.com/zetlen/clortho

The reason that I rewrote it was because it came shipped with some UX elements that I didn't want. It hadn't been updated in a while. And I like dealing with TypeScript better, so I decided to convert it.

## Basic Usage

```typescript
import { ClorthoService, iCredentials, clortho } from 'clortho-lite';

let service: ClorthoService = clortho('Whatever Name of Your Service');
// or
let service: ClorthoService = new ClorthoService('Whatever Name of Your Service');

service.set('some-user-name', 'some-password')
    .then(function (credentials: iCredentials) {
        console.log(credentials);
    })
    .catch(function (err) {
        console.log(err);
    });

service.get('some-user-name')
    .then(function (credentials: iCredentials) {
        console.log(credentials);
    })
    .catch(function (err) {
        console.log(err);
    });

service.remove('some-user-name')
    .then(function () {
        console.log('Removed item');
    })
    .catch(function (err) {
        console.log(err);
    });

```

That's about it.

In theory, this should be compatible with Windows and Linux... but I've only tested on OSX so far.

Here's a secret. You don't have to just store passwords here. It's really a key-value store for anything that is helpful for your application to store.