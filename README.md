<h1>
  BigCommerce Proxy API
</h1>

<p>
  Due to the restriction imposed by the BigCommerce - management API which can only be accessed from a back-end server or front-end on their own domain (restricted by CORS). 
</p>
<p>
This small server here is the currently described back-end server implemented on nodejs. Main responsibility of this server is to re-transmit requests from the headless checkout to the BigCommerce back-end API and return the result.
</p>

## What’s In This Document

- [Prerequisites](#-prerequisites)
- [Get Up and Running in a Minute](#-get-up-and-running-in-a-minute)
- [How to Use](#-how-to-use)

## Prerequisites
- Node (v10.16.3) Recommended
- A BigCommerce Instance with API keys

## Get Up and Running in a Minute

You can get a new nodejs server up and running on your local dev environment a minute with these steps:

1. **Setup configuration.**

    Get your BigCommerce store hash and access token and put them in appropriated .env.example cloned file.

2. **Install dependencies.**

   Install all dependencies listed in your ``package.json`` with:

   ```shell
   # Install packages
   npm i
   ```

3. **Start the server in `develop` mode.**

   Next, open shell console and navigate to base server’s directory and start it up:

   ```shell
   cd path-to-server/
   npm run start
   ```

4. **If all works you should see some ``[nodemon]`` messages end up with ``The Proxy API server started on: 3000``!**

   Your server is now running at `http://localhost:3000`.

At this point, you’ve got a fully functional ``nodejs`` back-end server. You can test it with ``Postman``!

## How to Use
Main feature of this proxy is to receive POST request from front-end which carry this payload:

```code
{
  method,      // GET,HEAD,PUT,PATCH,POST,DELETE
  path,        // BigCommerce Management API endpoint
  payload      // Endpoint payload
}
```

Proxy API should return response which will contain all the data that BigCommerce API return for made request including error messages. 

Full documentation of [BigCommerce Management API](https://developer.bigcommerce.com/api-docs/store-management/).
