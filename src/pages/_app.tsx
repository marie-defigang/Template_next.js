import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import ReactModal from 'react-modal';
import { AppProps } from 'next/app';
import { TOAST_DEFAULT_AUTO_CLOSE_TIME, TOAST_DEFAULT_POSITION } from '@constants/toast.constants';
import { CONFIG } from '@constants/config.constants';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import '@assets/scss/global.scss';
import '@assets/scss/vendors/semantic.scss';
import Modals from '@modules/modals';
import ModalsProvider from '@contexts/modals.context';
import { initSentry } from '@services/sentry.service';
import { pageView } from '@services/lib/gtm';
import { SDKConfig } from '@768-gladwin-tech/client-sdk';
import { TSDKConfig } from '@768-gladwin-tech/client-sdk/core/ConfigContext';
import { SDK_PATH_TO_JWT, SDK_REFRESH_TOKEN_REQUEST, SDK_SIGN_IN_PATHS } from '@constants/sdk.constants';
import Providers from '@components/Providers';
import ConnectionContext from '@contexts/ConnectionContext';

initSentry();

ReactModal.setAppElement('#__next');

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', pageView);
    return () => {
      router.events.off('routeChangeComplete', pageView);
    };
  }, [router.events]);

  return (
    <>
      <SDKConfig
        value={{
          baseApiUrl: CONFIG.API_URL,
          refreshToken: {
            signInPaths: SDK_SIGN_IN_PATHS,
            pathToJWT: SDK_PATH_TO_JWT,
            refreshTokenRequest: SDK_REFRESH_TOKEN_REQUEST,
          },
        } as TSDKConfig}
        swrConfig={{
          revalidateIfStale: true,
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <ConnectionContext>
          <Providers>
            <ModalsProvider>
              <Component {...pageProps} />
              <Modals />
              <ToastContainer
                position={TOAST_DEFAULT_POSITION}
                autoClose={TOAST_DEFAULT_AUTO_CLOSE_TIME}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </ModalsProvider>
          </Providers>
        </ConnectionContext>
      </SDKConfig>
    </>
  );
};

export default MyApp;
