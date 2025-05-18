const msalConfig = {
  auth: {
    clientId: "1c8e310a-72f0-4527-9bed-fb48ac099b8e",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://sso.skunkworks.africa/verify"
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  },
  brand: {
    name: "VerifySkunk",
    logoUrl: "https://github.com/Skunkworks-Digital/sso/blob/main/assets/VerifySkunk.png?raw=true"
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
window.msalInstance = msalInstance; // Expose globally for debugging

// Handle the redirect response and activate session
msalInstance.handleRedirectPromise().then(response => {
  if (response) {
    console.log("✅ Login successful:", response);
    msalInstance.setActiveAccount(response.account);
  } else {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 1) {
      msalInstance.setActiveAccount(accounts[0]);
    }
  }

  // Attempt silent token acquisition for basic profile info
  const account = msalInstance.getActiveAccount();
  if (account) {
    msalInstance.acquireTokenSilent({
      scopes: ["User.Read"],
      account: account
    }).then(tokenResponse => {
      console.log("🔄 Refreshed token:", tokenResponse.accessToken);
    }).catch(err => {
      console.error("❌ Silent token refresh failed:", err);
    });
  }
}).catch(error => {
  console.error("❌ Authentication error:", error);
});
