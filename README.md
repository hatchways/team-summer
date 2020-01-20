# Product Launch - Team Summer
### Project Brief
Today, in some areas of the world it’s really tough to raise money! And on the flip, those who want to invest, don’t know how to meet and find entrepreneurs that are working on projects they find exciting. This website will allow startups to raise money (like Kickstarter) and reward investors with equity in their company! You can find the website deployed live [here](https://ts-product-launch.herokuapp.com/).

#### Who’s it for?
Startups (entrepreneurs) and investors!
#### Scope of Project:
Create a marketplace for entrepreneurs to upload their startups and for investors to browse through ideas they might be interested in investing in.


### Prerequisites
#### Setting up MongoDB
You wil need MongoDB to run this app. You can download it [here](https://www.mongodb.com/download-center/community). Then in your /server .env file, add your mongo uri as MONGO_URI. You can generally find your mongo uri as the port where your MongoDB is running followed by /`Name of the database`
Ex: `mongodb://localhost:{PORT NUMBER}/{DATABASE NAME}` The default port is usually 27017.

#### Setting up AWS
You will also need proper AWS credentials to run this app locally. You can sign up for a free account [here](https://aws.amazon.com/s3/). Once signed up look  "My Security Credentials" in the drop down menu under your name on the upper right corner of the AWS navigation bar. Under access keys, generate your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` keys and place them in your /server .env file. Create a new bucket in the AWS s3 service and take note of the name of the bucket as well as the region you select. Save these variables as `AWS_REGION` and `AWS_BUCKET`respectively. For development make sure in the permissions tab of your bucket, turn OFF "Block public access to buckets and objects granted through new access control lists (ACLs)" and "Block public access to buckets and objects granted through any access control lists (ACLs)

#### Setting up Stripe
Create a Stripe account at [stripe.com](https://stripe.com/). Save the secret key and the public key -- there will be a test and a live version for each.
Add the public key to the client .env as REACT_APP_STRIPE_PUBLISHABLE_KEY=
Add the secret key to the server .env as STRIPE_SECRET_KEY=
On the client side install react-stripe-elements. On the server install stripe.

You can find test card numbers and tokens at [stripe.com/docs/testing#cards](https://stripe.com/docs/testing#cards)

### Installing
#### Server
Install server dependencies by running the command ```npm install``` in the root directory of this project.

#### Client
Client packages are setup by running `npm install` or `npm ci` in the client directory.

Set up a .env file in the client folder with `REACT_APP_JWT_SECRET` set to the backend JWT secret
and `REACT_APP_SOCKET_ENDPOINT` to the backend url, there is a `client/sample.env` for reference

Note: bcrypt relies on python 2.7 need to  have it in path when installing bcrypt
<!-- TO DO... Finish this -->
