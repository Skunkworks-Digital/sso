const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // 🔁 Replace with your actual Application (client) ID
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // 🔁 Replace with your Directory (tenant) ID
    redirectUri: "https://sso.skunkworks.africa/auth-callback" // Must match the registered redirect URI in Azure
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
