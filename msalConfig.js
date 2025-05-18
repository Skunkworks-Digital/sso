const msalConfig = {
  auth: {
    clientId: "1c8e310a-72f0-4527-9bed-fb48ac099b8e",
    authority: "https://login.microsoftonline.com/common", // or tenant-specific
    redirectUri: "https://sso.skunkworks.africa/verify"
  },
  cache: {
    cacheLocation: "localStorage", // or 'sessionStorage'
    storeAuthStateInCookie: false  // Recommended for modern browsers
  }
};

// Initialize MSAL instance
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Optional: check for interaction status
msalInstance.handleRedirectPromise().then((response) => {
  if (response) {
    console.log("Login successful:", response);
  } else {
    const currentAccounts = msalInstance.getAllAccounts();
    if (currentAccounts.length === 1) {
      msalInstance.setActiveAccount(currentAccounts[0]);
    }
  }
}).catch(error => {
  console.error("Authentication error:", error);
});
