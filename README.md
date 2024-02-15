### Next.js 14 + Amplify 6 issue

**Initial set up**

1. Create a .env.local file and configure the following environment variables:

```
NEXT_PUBLIC_COGNITO_USER_POOL_ID=
NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=
```

## Issue 1

`AuthUserPoolException` when using a custom tokenProvider

**Steps to reproduce:**

1. Run `next dev`
2. Navigate to http://localhost:3000
3. Open the devtools console
4. Fill out the form and click "Sign In"

**Expected result:**

Console shows `isSignedIn true`

**Actual result:**

Console shows:
```
AuthUserPoolException: Auth UserPool not configured.
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/core/dist/esm/errors/createAssertionFunction.mjs:14:19)
    at assertTokenProviderConfig (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/core/dist/esm/singleton/Auth/utils/index.mjs:23:69)
    at DefaultTokenStore.getAuthKeys (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenStore.mjs:129:101)
    at DefaultTokenStore.getDeviceMetadata (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenStore.mjs:109:37)
    at TokenOrchestrator.getDeviceMetadata (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenOrchestrator.mjs:132:37)
    at handlePasswordVerifierChallenge (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/signInHelpers.mjs:500:52)
    at async retryOnResourceNotFoundException (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/signInHelpers.mjs:796:16)
    at async signInWithSRP (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/apis/signInWithSRP.mjs:53:87)
    at async handleSignIn (webpack-internal:///(app-pages-browser)/./app/page.tsx:19:36)
```

:x: **Fail**

**_Note:_** Commenting out the `Auth` property from `Amplify.configure` allows `signIn` to work as expected:

```ts
Amplify.configure(
  {
    Auth: authConfig,
  },
  {
    ssr: true,
    // Auth: {
    //   tokenProvider: createUserPoolsTokenProvider(authConfig, kvStorage),
    //   credentialsProvider: createAWSCredentialsAndIdentityIdProvider(
    //     authConfig,
    //     kvStorage,
    //   ),
    // },
  },
);
```

## Issue 2

When running the app with a custom hostname, the Amplify Auth module fails to authenticate the user. This issue is not present when using localhost.

There are two scenarios to test:
1. Using localhost:3000
2. Using a custom hostname. e.g. mydomain.com:3000

For both scenarios, please comment out the `Auth` property from `Amplify.configure` as described in Issue 1.

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

Console shows:
```
UserUnAuthenticatedException: User needs to be authenticated to call this API.
    at assertAuthTokens (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/types.mjs:26:15)
    at getCurrentUser (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/apis/internal/getCurrentUser.mjs:18:71)
    at async signInWithSRP (webpack-internal:///(app-pages-browser)/./node_modules/@aws-amplify/auth/dist/esm/providers/cognito/apis/signInWithSRP.mjs:72:23)
    at async onSubmit (webpack-internal:///(app-pages-browser)/./app/page.tsx:23:36)
```

:x: **Fail**
