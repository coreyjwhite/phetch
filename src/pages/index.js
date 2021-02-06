import {
  MsalAuthenticationTemplate,
  useMsal,
  useAccount
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "libs/authConfig";
import React, { useEffect, useState } from "react";
import { callMsGraph } from "libs/MsGraphApiCall";
import Card from "components/containers/Card";
import Page from "components/layout/Page";

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [graphData, setGraphData] = useState(null);

  function requestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: account
      })
      .then(response => {
        callMsGraph(response.accessToken).then(response =>
          setGraphData(response)
        );
      });
  }

  useEffect(() => {
    if (account) {
      requestProfileData();
    }
  }, [account]);

  return <Card>{graphData ? graphData.givenName : null}</Card>;
};

const ErrorComponent = ({ error }) => {
  return <h6 variant="h6">An Error Occurred: {error.errorCode}</h6>;
};

const Loading = () => {
  return <h6 variant="h6">Authentication in progress...</h6>;
};

export default function Profile() {
  const authRequest = {
    ...loginRequest
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <Page pageTitle="phetch">
        <ProfileContent />
      </Page>
    </MsalAuthenticationTemplate>
  );
}
