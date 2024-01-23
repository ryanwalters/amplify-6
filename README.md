### Next.js 14 + Amplify 6 issue

**Initial set up**

1. Create a .env.local file and configure the following environment variables:

```
NEXT_PUBLIC_COGNITO_USER_POOL_ID=
NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=
```

There are two scenarios to test:
1. Using localhost:3000
2. Using a custom hostname. e.g. mydomain.com:3000

### Scenario 1

**Steps to reproduce:**

1. Run `next dev`
2. Navigate to http://localhost:3000
3. Open the devtools console
4. Fill out the form and click "Sign In"

**Expected result:**

Console shows `isSignedIn true`

**Actual result:**

Console shows `isSignedIn true`

:heavy_check_mark: **Pass**

### Scenario 2

**Steps to reproduce:**

1. Run `next dev -H mydomain.com` (you can use whatever local hostname you want)
2. Navigate to http://mydomain.com:3000
3. Open the devtools console
4. Fill out the form and click "Sign In"

**Expected result:**

Console shows `isSignedIn true`

**Actual result:**

Console shows `UserUnAuthenticatedException: User needs to be authenticated to call this API.`

:x: **Fail**
