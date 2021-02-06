// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: "cc59cdac-b66d-4bc2-ba96-bf7ed965f6a5",
    authority:
      "https://login.microsoftonline.com/eaa4a71e-a2cd-46ab-b4da-1b9537285d07",
    redirectUri: "http://localhost:3000",
    postLogoutRedirectUri: "http://localhost:3000"
  }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: [
    "User.Read",
    "Team.ReadBasic.All",
    "Calendars.Read",
    "Tasks.ReadWrite"
  ]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me/"
};
