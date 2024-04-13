import { Layout, Typography } from 'antd'
import { useContext } from 'react';
import CryptoContext from '../../context/cryptoContext';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

export default function AppContent() {
    const { crypto, assets } = useContext(CryptoContext)
    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})

    if (!assets) return null; // Возвращаем null, если переменная assets не определена

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
                Total:{' '}
                {assets.map(asset => { return asset.amount * cryptoPriceMap[asset.id]})
                    .reduce((acc, v) => (acc += v), 0).toFixed(2)}$</Typography.Title>
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    )
}

export function useCrypto() {
    return useContext(CryptoContext)
}