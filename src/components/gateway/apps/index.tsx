import React from 'react'
import AppLayout from './layout'
import AppSelector from './selector'
import AppConfig from './config'

export default function Apps() {
    const [selectedApp, setSelectedApp] = React.useState(null)

    return (
        <AppLayout>
            {selectedApp ? (
                <AppConfig />
            ) : (
                <AppSelector />
            )}
        </AppLayout>
    )
}