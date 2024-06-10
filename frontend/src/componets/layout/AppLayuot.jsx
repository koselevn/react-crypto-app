import { Layout, Spin } from 'antd'
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';
import CryptoContext from '../../context/cryptoContext';
import { useContext, useState } from 'react';

export default function AppLayout() {
    const { loading } = useContext(CryptoContext)

    const screenWidth = window.innerWidth;
    if (screenWidth <= 1147) {
        return (
            <>
                <AppHeader /> 
                <AppSider />
                <AppContent />
            </>
        )
    }

    if (loading) {
        return (<Spin fullscreen />)
    }

    return (
        <Layout >
          <AppHeader /> 
            <Layout>
                <AppSider />
                <AppContent />
            </Layout>
        </Layout>
    )
}