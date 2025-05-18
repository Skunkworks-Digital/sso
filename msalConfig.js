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
    logoUrl: "https://github.com/Skunkworks-Digital/sso/raw/main/assets/VerifySkunk.svg"
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

// Optional: handle response and log info
msalInstance.handleRedirectPromise().then(response => {
  if (response) {
    console.log("✅ Login successful:", response);
  } else {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 1) {
      msalInstance.setActiveAccount(accounts[0]);
    }
  }
}).catch(error => {
  console.error("❌ Authentication error:", error);
});
