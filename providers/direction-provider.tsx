'use client'
import React from 'react'
import { DirectionProvider as RadixDirProvider } from '@radix-ui/react-direction';

const DirectionProvider = ({ direction, children }: { direction: string, children: React.ReactNode }) => {
    return (
        <RadixDirProvider dir={direction}>
            {children}
        </RadixDirProvider>
    )
}

export default DirectionProvider
