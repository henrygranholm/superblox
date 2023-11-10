import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/tailwind.output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import "@fontsource/montserrat"
import "@fontsource/courier-prime"
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary';
import ChainUpdater from './updaters/ChainUpdater'
import ApplicationUpdater from './updaters/ApplicationUpdater'
import TransactionUpdater from './updaters/TransactionUpdater'
import { injected } from './connectors';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import { MoralisProvider } from 'react-moralis';
import { MoralisAPIKey } from './constants';

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

if (!!window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false
}

function Updaters() {
    return (
        <>
            <ChainUpdater />
            <TransactionUpdater />
            <ApplicationUpdater />
        </>
    )
}

const ConnectWallet = () => {
    const { account, activate } = useWeb3React()

    useEffect(() => {
        if( !account ) {
            try {
                activate( injected )
            } catch( err ) {
                console.error(err)
            }
        }
    }, [activate])

    return null
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <MoralisProvider appId={ MoralisAPIKey.appId } serverUrl={ MoralisAPIKey.serverUrl }>
                    <Updaters />
                    {/* <ConnectWallet /> */}

                    <Router>
                        <App />
                    </Router>
                </MoralisProvider>
            </Web3ProviderNetwork>
        </Web3ReactProvider>

        <NotificationContainer/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
