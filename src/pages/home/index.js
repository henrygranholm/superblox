import './index.scss'
import React, { useState, useEffect } from 'react'
import { BigNumber } from "ethers"
import backPic from '../../assets/img/bg/home.png'
import useMintNFT from '../../hooks/useMintNFT'
import { formatBalance } from '../../utils'
import { ChainId, contractAddress, mainNetworkChainId } from '../../constants'
import { shortenAddress } from '../../helper'
import { useWeb3React } from '@web3-react/core'
import { useWalletModalToggle } from '../../hooks/store'
import { useIsTransactionPending } from '../../hooks/store/transactions'
import { Loader } from '../../components/loader'

export const Home = () => {
    const { account } = useWeb3React()
    const [ count, setCount ] = useState(1)
    const [ pendingTx, setPendingTx ] = useState(null)

    const isPending = useIsTransactionPending(pendingTx ?? undefined)

    const enableMintBtn = pendingTx === null || !isPending

    const { totalSupply, maxSupply, mintCostBigNumber, mint } = useMintNFT()

    const toggleWalletModal = useWalletModalToggle()

    const getTotalMintPrice = () => {
        let totalPrice
        for( let i = 0; i < count; i++ ) {
            if( !totalPrice )
                totalPrice = mintCostBigNumber
            else
                totalPrice = totalPrice.add(mintCostBigNumber)
        }

        totalPrice = !totalPrice ? BigNumber.from(0) : totalPrice

        return totalPrice
    }

    const getFormattedTotalPrice = () => {
        return Number( formatBalance( getTotalMintPrice(), 18 ) )
    }

    useEffect(() => {
        if( count >= maxSupply - totalSupply )
            setCount( maxSupply - totalSupply )
        if( count <= 1 )
            setCount( 1 )
    }, [ count ])

    const onClickMint = async () => {
        if( !account ) {
            toggleWalletModal()
            return
        }

        try {
            const tx = await mint({
                mintAmount: count,
                value: getTotalMintPrice()
            })
            
            if( tx.hash )
                setPendingTx(tx.hash)
        } catch(e) {
            console.error('mint process error --------', e)
        }
    }

    return (
        <div className='home'>
            <img className='backImg' alt='pic' src={ backPic }></img>

            <div className='container min-h-screen relative'>
                <div className='home__mintingbox flex flex-col justify-between items-center p-12'>
                    <div className='text-lg text-white pro_desc'>Your 3D Avatar for the open Metaverse and beyond...</div>

                    <div className='text-center'>
                        <div className='text-red-700 text-2xl font-bold py-2'>MINT NOW!</div>
                        <div className='text-base py-2'>{totalSupply}/{maxSupply} minted!</div>
                    </div>

                    <div className='relative w-full text-center'>
                        <div className='flex home__mintingbox__inputbox'>
                            <button 
                                className='text-xl' 
                                onClick={() => setCount(prev => prev - 1)} 
                                disabled={ count <= 1 }
                            > - </button>

                            <input 
                                className='outline-none text-center text-2xl font-bold' 
                                type={'text'} 
                                readOnly
                                value={ count } 
                                placeholder={ count } 
                                onChange={ (e) => setCount(e.target.value) } 
                            />

                            <button 
                                className='text-xl' 
                                onClick={() => setCount(prev => prev + 1)}
                                disabled={ count >= (maxSupply - totalSupply) }
                            > + </button>
                        </div>

                        <div className='text-base py-2'> { getFormattedTotalPrice() }E + TX </div>
                    </div>

                    <div className='flex flex-col items-center home__mintingbox__mintbtn w-full'>
                        <button 
                            className='text-2xl font-bold py-3 text-red-700 w-full flex justify-center items-center' 
                            onClick={ onClickMint }
                            disabled={ !enableMintBtn }
                        >
                            { (pendingTx && isPending) ? (
                                <>
                                    <Loader size='25' />
                                </>
                            ) : 'MINT' }
                        </button>

                        <a 
                            href={`https://etherscan.io/address/${ contractAddress[ ChainId['MAINNET'] ] }`} 
                            className='text-sm mt-4'
                            target={'_blank'}
                        >
                            { shortenAddress( contractAddress[ ChainId['MAINNET'] ], 10 ) }
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home