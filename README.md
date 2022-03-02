# Rico Antojo

Rico Antojo is an e-commerce website that offers a variety of snacks. I got the idea for the site from a local snack shop around the neighborhood. I realize they did not have a website of their own and were using a different platform to host their store items. So people can see what they offer.

I took it upon my self to create a website that offers their items and with a touch of their theme colors.
This project I was about to take on was more of a personal project rather than a business opportunity. I wanted to integrate different technologies I haven't worked with before. Some of those technologies are

-   NodeJS
-   Express
-   MongoDB
-   MongooseJS
-   PassportJS
-   Redux
-   StripeJS

Aside from this technologies I got a better understanding of working with cookies and local storage.
Integrating each one of these technologies was a challenge, but a rewarding feeling once my code started to work as expected.

Designing the project was the initial problem I had before writing the code for it. I was thinking to my self how will I have my front end code communicate with the backend. I kept encountering this taught from the process of building the logging to getting errors from fetching from an endpoint. After some configuration and tutorials I got things up and running and took the learned concept and applied it to other parts of the application.

## NodeJS and ExpressJS

Like most developers I took the approach of using ExpressJS framework to build the routes for the application. I did not test the endpoints with any tool just did it manually by sending a request to it every time I needed to test the endpoint. It did get tedious over time, so the next time I will be using something like Postman to test my endpoints.

## MongoDB and MongooseJS

Setting up the database was pretty straightforward the only thing I did prefer to do is to use the cloud version (MongoDB Atlas) of MongoDB rather than having it locally on my machine. Alongside MongoDB I decided to pair it up Mongoose a schema based library to model my application data. This could be in reference to making queries to the database using the Model you create in your schema using Mongoose. Mongoose will look into the provided collection you set the schema for. It could be something like Users, Items and etc.

Setting up the session store for my application was a tough process as well because I needed to understand how sessions worked. Once I got a grip at and understood how to work with sessions it helped me understand how the user stood persistent in the backend. This brings us to our next technology PassportJS.

## PassportJS

When it came to user authentication I could have used JWT, OAuth0, and even just sessions and cookies. I decided to go with PassportJS. why? Well I have seen a couple of tutorials and it seemed like the obvious choice since I exposure to it already. The documentation provided by the PassportJS was somewhat useful, but there were somethings I wish they went in depth in. Like setting up the strategy for user sign up and login. I had to get most of my answers through stack over flow or other blogs. Passport uses its serialize method to create and save the user session to our session store.

## Redux

I came to realize reading through blogs that managing state of large applications will be a hassle if you do not use some sort state management library. I had some experience using React's Context API, but I wanted to use and learn something new and trendy and saw the opportunity to use Redux.

As mentioned before I used Redux to manage the state of my application. From the User status to the items in my cart. It made the use of state easier through the application and had less worries about prop drilling. Some of the problems I did encounter were

-   what to store as a global state
-   the amount of boiler plate code used in redux
-   getting the process of how redux works

Will I use Redux in future projects yes, but it will be Redux toolkit. Everything you love about redux but better. From less boiler plate to being easier to set up and get running.

## StripeJS

Stripejs has a well documented library that helps set up payment systems. Their documentation was easy to read and had my payment system running in no time. Their examples were explained thoroughly and gave you a variety of payment methods and checkout options. They provided different ways to set up your checkout systems. I went with the one that I felt had better integration with my project. That was the PaymentElement. It offered a simple card checkout and it was easy to use. Also retrieving the data needed for the backend was a fairly simple.

Aside from setting up the frontend code of the payment system. I used some of their recommended endpoints for a more secure checkout and that was using a webhook.
The webhook endpoint used the raw body of the request argument that had a signature attached to it .This signature is sign by stripe and it verifies the signature was sent by stripe and not a third party. We will use this signature and other arguments to construct a webhook event object. By using this event object we will be able to identify if the user payment succeeded or fail. Upon success we will save the user payment info like their id and receipt in our database.

Besides learning how to use the stripe api I had difficulty understanding how it works. After a few tutorial videos and a bit digging in their documentation. I had a firm understanding of how the checkout process works.

## Side Note

To use the stripe api you will need to have an api key and for their webhook you will also need an key to be used with as well.
Make sure to store your keys in environmental variables . You do not want sensitive information getting into the wrong hands
