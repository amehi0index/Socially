# NotReddit

![Project Image](post.png)

> Full-stack Serverless Post-Comment Application built with AWS Amplify

---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [License](#license)

---

## Description

Full-stack serverless Post-Comment application built with the AWS Amplify Framework that allows guest users to read existing posts and comments, and registered users to read, add, update, and delete posts and comments.

Utilizes the AWS Amplify Framework to leverage AWS services such as Amazon Cognito, AWS AppSync, DynamoDB, S3, and Amplify JavaScript Library features such as Authentication, GraphQL API and Storage.

### Technologies

- React : v18.1.0
- AWS-Amplify: v4.3.24
- Tailwind CSS: v3.0.24

---

## How To Use

#### Fork and Clone Repository

```
git clone https://github.com/amehi0index/React-Amplify-Auth.git
```

#### Install dependencies

```
npm install
```

#### Install & configure the AWS Amplify CLI. Detailed instructions can be found [here](https://docs.amplify.aws/cli/start/install).

```
npm install -g @aws-amplify/cli

amplify configure
```

#### Initialize a new Amplify project following these [guidelines](https://docs.amplify.aws/cli/start/workflows/).

```
https://docs.amplify.aws/cli/start/workflows/
```

Set up your Auth provider(s) for Social sign-in (OAuth) using these [guidelines](https://docs.amplify.aws/lib/auth/social/q/platform/js/).

```
https://docs.amplify.aws/lib/auth/social/q/platform/js/
```

#### To run the applicaton

```
npm start
```

---

## License

This project is licensed under the [MIT License](#LICENSE.txt)

[Back To Top](#react-amplify-auth)
