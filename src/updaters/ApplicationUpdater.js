import { useCallback, useEffect, useState } from 'react'
import { useActiveWeb3React } from '../hooks'
import useDebounce from '../hooks/useDebounce'
import useIsWindowVisible from '../hooks/useIsWindowVisible'
import store from '../store'

export default function Updater() {
    const { library, chainId } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const [state, setState] = useState({
        chainId,
        blockNumber: null
    })

    const updateBlockNumber = store(state => state.updateBlockNumber)

    const blockNumberCallback = useCallback(
        (blockNumber) => {
            setState(state => {
                if (chainId === state.chainId) {
                    if (typeof state.blockNumber !== 'number') return { chainId, blockNumber }
                    return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) }
                }
                return state
            })
        },
        [chainId, setState]
    )

    // attach/detach listeners
    useEffect(() => {
        if (!library || !chainId || !windowVisible) return undefined

        setState({ chainId, blockNumber: null })

        library
            .getBlockNumber()
            .then(blockNumberCallback)
            .catch(error => console.error(`Failed to get block number for chainId: ${chainId}`, error))

        library.on('block', blockNumberCallback)
        return () => {
            library.removeListener('block', blockNumberCallback)
        }
    }, [chainId, library, blockNumberCallback, windowVisible])

    const debouncedState = useDebounce(state, 100)

    useEffect(() => {
        if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return
        updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber })
    }, [windowVisible, debouncedState.blockNumber, debouncedState.chainId])

    return null
}
