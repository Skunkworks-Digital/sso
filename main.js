window.onload = () => {
  const logo = document.getElementById("brand-logo");
  if (logo && typeof msalConfig !== 'undefined' && msalConfig?.brand?.logoUrl) {
    logo.src = msalConfig.brand.logoUrl;
  }

  if (!window.msalInstance) {
    console.warn("⚠️ MSAL instance not yet initialized.");
  }
};

const signIn = () => {
  if (window.msalInstance) {
    msalInstance.loginRedirect();
  } else {
    alert("Authentication library not loaded.");
  }
};

const signOut = () => {
  if (window.msalInstance) {
    msalInstance.logoutRedirect();
  } else {
    alert("Logout failed. Try refreshing the page.");
  }
};
