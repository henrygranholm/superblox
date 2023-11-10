import { useEffect } from 'react'
import { useActiveWeb3React } from '../hooks'
import store from '../store'
import {NotificationManager} from 'react-notifications'
import { useBlockNumber } from '../hooks/store'
import { shortenAddress } from '../helper'

export function shouldCheck(
    lastBlockNumber,
    tx
) {
    if (tx.receipt) return false
    if (!tx.lastCheckedBlockNumber) return true
    const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
    if (blocksSinceCheck < 1) return false
    const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
    if (minutesPending > 60) {
        // every 10 blocks if pending for longer than an hour
        return blocksSinceCheck > 9
    } else if (minutesPending > 5) {
        // every 3 blocks if pending more than 5 minutes
        return blocksSinceCheck > 2
    } else {
        // otherwise every block
        return true
    }
}

export default function Updater() {
    const { chainId, library } = useActiveWeb3React()

    const lastBlockNumber = useBlockNumber()

    const state = store( state => state.transactions )
    const finalizeTransaction = store( state => state.finalizeTransaction )
    const checkedTransaction = store( state => state.checkedTransaction )

    const transactions = chainId ? state[chainId] ?? {} : {}

    useEffect(() => {
        if (!chainId || !library || !lastBlockNumber) return

        Object.keys(transactions)
            .filter(hash => shouldCheck(lastBlockNumber, transactions[hash]))
            .forEach(hash => {
                library
                    .getTransactionReceipt(hash)
                    .then(receipt => {
                        if (receipt) {
                            finalizeTransaction({
                                chainId,
                                hash,
                                receipt: {
                                    blockHash: receipt.blockHash,
                                    blockNumber: receipt.blockNumber,
                                    contractAddress: receipt.contractAddress,
                                    from: receipt.from,
                                    status: receipt.status,
                                    to: receipt.to,
                                    transactionHash: receipt.transactionHash,
                                    transactionIndex: receipt.transactionIndex
                                }
                            })

                            const success = receipt.status === 1
                            if( success ) {
                                NotificationManager.success( shortenAddress( hash, 10 ), transactions[hash]?.summary )
                            } else {
                                NotificationManager.error( shortenAddress( hash, 10 ), 'Something went wrong!' )
                            }
                        } else {
                            checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber })
                        }
                    })
                    .catch(error => {
                        console.error(`failed to check transaction hash: ${hash}`, error)
                    })
            })
    }, [chainId, library, transactions, lastBlockNumber])

    return null
}
