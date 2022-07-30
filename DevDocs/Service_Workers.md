# Service Workers

Service workers run in seperate processes and contexts than the primary javascript enginer and the DOM.  They can 
intercept network traffic and handle client requests.  They are also useful to cache assets.  All of this adds up to
them being capable of supporting offline services, and in fact this promotes an 'offline first' approach to design.

[Useing Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

Steps in a basic setup procedure:

1. The service worker URL is fetch and regigisterd via `serviceWorkerContainer.register()`.
2. Service worked is executed in a `ServiceWorkerGlobalScope`. This is a special worker context, running off
   of the main execution thread so that it will not block the main UI. Being 'outside', this context does
   not have access to the DOM.
3. The service worker is now ready to process events.
4. Installation of the worker is attempted when service worker-controlled pages are accessed subsequently. An Install
   event is always the first one sent to a service worker (this can be used to start the process of populating an
   IndexedDB, and caching site assets). This is really the same kind of procedure as installing a native or Firefox OS
   app — making everything available for use offline.
5. When the oninstall handler completes, the service worker is considered installed.
6. Next is activation. When the service worker is installed, it then receives an activate event. The primary use of
   onactivate is for cleanup of resources used in previous versions of a Service worker script.
7. The Service worker will now control pages, but only those opened after the register() is successful. i.e. a document
   starts life with or without a Service worker and maintains that for its lifetime. So documents will have to be
   reloaded to actually be controlled.

A single service worker can control many pages. Each time a page within your `scope` is loaded, the service worker is
installed against that page and operates on it. Bear in mind therefore that you need to be careful with global variables
in the service worker script: each page doesn't get its own unique worker.

Also note:

- The service worker will only catch requests from clients under the service worker's scope.
- The max scope for a service worker is the location of the worker.
- If your service worker is active on a client being served with the Service-Worker-Allowed header, you can specify a
  list of max scopes for that worker.
- In Firefox, Service Worker APIs are hidden and cannot be used when the user is in private browsing mode.

## The `install` event

Once the service worker has been registered the install event will fire indicating that it's time for the service worker
to prepare its environment.  E.g. caching files, setting up client side storage, initializing the application etc.


## The `fetch` event

Whenever the client requests a resourcee that is within the service workers scope the `fetch` event will fire and 
trigger our listeners. There are several options for handling this request.

[Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

1. A simple response. 
```js
new Response( 'Hello, I'm a service worker!' )
```
2. A very slightly more complex response that includes http headers and some html.
```js
new Response('<p>Hello from your friendly neighborhood service worker!</p>',
  { headers: { 'Content-Type': 'text/html' } }); 
```
3. If a match wasn't found in the cache, you could tell the browser to `fetch()` the resource from the network if it
   is available.
4. If a match wasn't found in the cache, _and_ we didn't manage to retrieve it from the network, we could serve up 
   some kind of default.
 
```js
caches.match( 'fallback.html' );
```

5. Each request has a lot of information associated with it.  The `FetchEvent` returns a `Request` object that is loaded
   with properties.
```js
event.request.url
event.request.method
event.request.header
event.request.body
```

## Recovering failed requests

We can basically chain our promises

```js
const cacheFirst = async request => {
  const responseFromCache = await caches.match( request );
  if ( responseFromCache ) {
    return responseFromCache
  }
  return fetch(request);
}

self.addEventListener( 'fetch' , event => event.respondWith( cacheFirst( event.request ) ) )
```

We should also intercept any resources that are retrieved from the network and update our cache.

```js
const putInCache = async ( request, response ) => {
  const cache = await caches.open( 'v1' )
                await cache.put( request, response )
}

const cacheFirst = async request => {
  const responseFromCache = await caches.match( request )
  if ( responseFromCache ) return responseFromCache

  const responseFromNetwork = await fetch( request );
  putInCache( request, responseFromNetwork.clone() )
  return responseFromNetwork
}

self.addEventListener( 'fetch', event => event.respondWith( cacheFirst( event.request ) ) )
```

***Note:*** *Quick side note, we should notice that the patterns in the above code lends itself very much to functional
programming technique.  This could could be much smaller and far more elegant.*

Note how we clone the network response to put it into the cache. The requests and response can only be read from the
network stream once.

Let's now add the functionality to provide a fallback option in the event that both cache and the network fail to
provide the resource.

```js
const cacheFirst = async request => async ({ request, preloadResponsePromise, fallbackUrl }) => {
  
  const responseFromCache = await caches.match( request )
  if ( responseFromCache ) return responseFromCache

  try {
    const responseFromNetwork = await fetch( request );
    putInCache( request, responseFromNetwork.clone() )
    return responseFromNetwork
    
  } catch (error) {
    const fallbackResponse = await cache.match( fallbackUrl )
    if( fallbackResponse ) return fallbackResponse
  }
  
  return new Response( 'Network error.', { status: 408, headers: {'Content-Type': 'text/plain'} } )
}

self.addEventListener( 'fetch', event => event.respondWith( cacheFirst( { request: event.request, fallbackUrl: "/index.html" } ) ) )
```

## Service Worker Navigation Preload

Navigation Preload is a feature that will start network download as soon as the `fetch` request is made, in parallel
with service worker bootup.  This ensures that the 'startup' time for your service worker to handle the request doesn't
result in unecessary UI delays for the client.

First the feature must be enabled during service worker activation.

```js
resistration.navigationPreload.enable()
```

```js
const enableNavigationPreload = async () => {
  if( self.registratiohn.navigationPreload ) await self.registration.navigationPrelaod.enable()
}

self.addListener( 'activate', event => event.waitUntil( enableNavigationPreload() )
```

Then use `event.preloadResponce` to wait for the preload resource to finish downloading in the `fetch` event handler.

Our process has matured and is now:

1. Check Cache
2. Wait on event.preloadResponse (which is passes as preloadResponsePromise) to the `cacheFirst` function.  Cache the
   result if you get one.
3. In neither of these are defined then we go to the network.


```js
const addResourcesToCache = async resources => {
  const cache = await caches.open( 'v1' )
  await cache.addAll( resources )
}

// putInCache is unchanged

const cacheFirst = async ( { request, preloadResponsePromise, fallbackUrl } ) => {
  const responseFromCache = await caches.match( request );
  if( responseFromCache ) return responseFromCache
  
  const preloadRespose = await preloadResponsePromise;
  if( preloadResponse)
}
```

I'm aborting note taking on the code.  It's been repetative enough.  I'm going to just read now...

