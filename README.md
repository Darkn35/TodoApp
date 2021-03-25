# Todo App using Reactjs and Firebase

Before you run, make sure that you have already setup your own project and webapp in Firebase.

## Create .env.development and .env.production on the root folder

The contents of those files should be the following :
```
REACT_APP_API_KEY="content"
REACT_APP_AUTH_DOMAIN="content"
REACT_APP_DATABASE_URL="content"
REACT_APP_PROJECT_ID="content"
REACT_APP_STORAGE_BUCKET="content"
REACT_APP_MESSAGING_SENDER_ID="content"
REACT_APP_APP_ID="content"
```
## To run on localhost:3000
run the webapp using this command
```
npm run start:dev


## To run on the webhost provided by Firebase
run either the development build (uses .env.development)
```
npm run build:dev
```
or the production build (uses .env.production)
```
npm run build:prod
```

### For more questions, please refer to this web article or ask me!
https://victorbruce82.medium.com/how-to-deploy-a-react-app-to-different-firebase-hosting-environments-dev-and-prod-da3f4cae9a1e

