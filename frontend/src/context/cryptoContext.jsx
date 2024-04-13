import { createContext, useEffect, useState } from 'react'
import { FetchAssets, fakeFetchCrypto } from '../api';
import { persentDiferents } from '../utils'


const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState()
    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await FetchAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>{children}</CryptoContext.Provider>
    
    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find((c) => c.id === asset.id )
            return {
                grow: asset.price < coin.price, // bolean
                growPercent: persentDiferents(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset
            }
        })
    }

    function addAsset(newAsset) {
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }
}


export default CryptoContext