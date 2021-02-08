import PropTypes from "prop-types";
import Head from "next/head";
import { Normalize } from "styled-normalize";
import GlobalStyle from "styles/global";
import { SWRConfig } from "swr";
import { ModalProvider } from "styled-react-modal";
import ModalBackground from "components/containers/ModalBackground";
import AuthenticatedTemplate from "components/AuthenticatedTemplate";
import Layout from "components/layout/Layout";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "libs/authConfig";
import styled from "styled-components";

const msalInstance = new PublicClientApplication(msalConfig);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <SWRConfig
        value={{
          onError: (error, key) => {
            if (error.status !== 403 && error.status !== 404) {
              return <div>failed to load</div>;
              // We can send the error to Sentry,
              // or show a notification UI.
            }
          }
        }}
      >
        <MsalProvider instance={msalInstance}>
          <ModalProvider backgroundComponent={ModalBackground}>
            <Head>
              <link rel="icon" href="/ETCH_logo.png" />
              <link href="/fonts/fonts.css" rel="stylesheet" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, viewport-fit=cover"
              />
              <meta name="author" content="Corey White" />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
        </MsalProvider>
      </SWRConfig>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({})
};
