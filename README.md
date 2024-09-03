# Socially (NotReddit)

![Project Image](socially.png)

> A full-stack serverless post-comment application built with AWS Amplify and React.

---

### Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Setup and Usage](#setup)
- [License](#license)

---

## Description

"Socially (NotReddit)" is a serverless post-comment application that allows:

- Guest users to read existing posts and comments.
- Registered users to read, add, update, and delete posts and comments.

![Watch the video](https://youtu.be/5tl60MD589k) 

The application leverages the AWS Amplify Framework to utilize AWS services such as Amazon Cognito, AWS AppSync, DynamoDB, S3, and more.

## Features

- Authentication: Secure user registration and sign-in.

- Posts: Create, read, update, and delete posts.
- Comments: Add comments to posts and manage them.
- Likes: Users can like posts.
- Profile: Edit user profile details.

## Technologies

- React : v18.1.0
- AWS-Amplify: v4.3.24
- Tailwind CSS: v3.0.24

---

## Setup and Usage

#### Fork and Clone Repository

```
git clone https://github.com/amehi0index/Socially.git
```

#### Install Dependencies

```
npm install
```

#### Install & configure the AWS Amplify CLI. Detailed instructions can be found [here](https://docs.amplify.aws/cli/start/install).

```
npm install -g @aws-amplify/cli

amplify configure
```

#### Initialize Amplify Project:Following these [guidelines](https://docs.amplify.aws/cli/start/workflows/).

```
https://docs.amplify.aws/cli/start/workflows/
```

Set Up Social Sign-in (OAuth): Use these [guidelines](https://docs.amplify.aws/lib/auth/social/q/platform/js/).

```
https://docs.amplify.aws/lib/auth/social/q/platform/js/
```

#### Run the Application:

```
npm start
```

---

## License

This project is licensed under the [MIT License](#LICENSE.txt)

[Back To Top](#NotReddit)
