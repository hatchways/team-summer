# EXPRESS-STARTER

### Prerequisites
#### Setting up MongoDB
You wil need MongoDB to run this app. You can download it [here](https://www.mongodb.com/download-center/community). Then in your /server .env file, add your mongo uri as MONGO_URI. You can generally find your mongo uri as the port where your MongoDB is running followed by /`Name of the database`
Ex: `mongodb://localhost:{PORT NUMBER}/{DATABASE NAME}` The default port is usually 27017.

#### Setting up AWS
You will also need proper AWS credentials to run this app locally. You can sign up for a free account [here](https://aws.amazon.com/s3/). Once signed up look  "My Security Credentials" in the drop down menu under your name on the upper right corner of the AWS navigation bar. Under access keys, generate your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` keys and place them in your /server .end file. Create a new bucket in the AWS s3 service and take note of the name of the bucket as well as the region you select. Save these variables as `AWS_REGION` and `AWS_BUCKET`respectively.

### Installing
Install server dependencies by running the command ```npm install``` in the root directory of this project.

Note: bcrypt relies on python 2.7 need to  have it in path when installing bcrypt
<!-- TO DO... Finish this -->
