import { useMoralisWeb3Api } from "react-moralis"
import React, { useState, useEffect, useCallback } from 'react'
import { ChainId, contractAddress, MoralisAPIKey } from "../constants"

// start moralis server
const Moralis = require('moralis')
const serverUrl = MoralisAPIKey.serverUrl
const appId = MoralisAPIKey.appId
Moralis.start({ serverUrl, appId })

const useNFTMoralis = () => {
    const Web3Api = useMoralisWeb3Api()
    const [ allNFTData, setAllNFTData ] = useState([])

    const fetchNFTsForContract = useCallback(async () => {
        const oldTime = new Date().getTime()
        
        let cursor = null

        while(true) {
            const options = {
                chain: "eth",
                address: contractAddress[ ChainId['MAINNET'] ],
                // address: `0xE169c2ED585e62B1d32615BF2591093A629549b6`,
                cursor: cursor,
            }

            const ethNFTs = await Web3Api.token.getAllTokenIds(options);

            cursor = ethNFTs.cursor

            setAllNFTData( prev => ([ ...prev, ...ethNFTs.result ]) )

            if( cursor === "" || cursor === null )
                break
        }

        const newTime = new Date().getTime()
        console.error('time elapsed: ', (newTime - oldTime))
    }, [ setAllNFTData ])

    useEffect(() => {
        fetchNFTsForContract()
    }, [ setAllNFTData ])

    return { allNFTData }
}

export default useNFTMoralis