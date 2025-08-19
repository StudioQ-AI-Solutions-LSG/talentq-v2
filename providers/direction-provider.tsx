'use client'
import React from 'react'
import { DirectionProvider as RadixDirProvider } from '@radix-ui/react-direction';
import { useConfig } from '@/hooks/use-config';

const DirectionProvider = ({ direction, children }: { direction: string, children: React.ReactNode }) => {
    const [, setConfig] = useConfig();

    React.useEffect(() => {
        // Aplicar la dirección al documento solo en el cliente
        document.documentElement.dir = direction;
        document.documentElement.lang = document.body.lang || 'en';
        
        setConfig((prevConfig) => ({
            ...prevConfig,
            isRtl: direction === 'rtl',
        }));
    }, [direction, setConfig]);

    return (
        <RadixDirProvider dir={direction}>
            {children}
        </RadixDirProvider>
    )
}

export default DirectionProvider
