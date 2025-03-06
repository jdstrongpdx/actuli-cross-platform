import React, { createContext, useContext, useEffect, useCallback } from 'react';
import TypeData from '@/interfaces/TypeData';
import typesData from '@/data/typesData.json'
import { useStorageState } from '@/hooks/useStorageState';

// Define the context default state
const TypeDataContext = createContext<{
    typeData: TypeData | null;
    saveTypeData: (data: TypeData) => void;
    loadTypeData: () => void;
    clearTypeData: () => void;
}>({
    typeData: null,
    saveTypeData: () => {},
    loadTypeData: () => {},
    clearTypeData: () => {},
});

// SecureStore key
const TYPE_DATA_KEY = 'type_data'; // SecureStore key

export const useTypeData = () => useContext(TypeDataContext);

export const TypeDataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [[loading, storedTypeData], setStoredTypeData] = useStorageState(TYPE_DATA_KEY);

    const typeData = storedTypeData ? (JSON.parse(storedTypeData) as TypeData) : null;

    // Save TypeData securely
    const saveTypeData = useCallback(
        (data: TypeData) => {
            setStoredTypeData(JSON.stringify(data));
            console.log('TypeData saved successfully');
        },
        [setStoredTypeData]
    );

    // Load TypeData: Check storage or fallback to file
    const loadTypeData = useCallback(async () => {
        if (loading) {
            console.log('Loading type data...');
            return;
        }

        if (storedTypeData) {
            console.log('TypeData found in storage');
        } else {
            console.log('TypeData not found in storage, loading from file...');
            try {

                if (typesData) {
                    const data: TypeData = typesData;
                    // Save fetched data to storage
                    saveTypeData(data);
                    console.log('TypeData loaded from file and saved to storage');
                }

            } catch (error) {
                console.error('Error loading type data from file:', error);
            }
        }
    }, [loading, storedTypeData, saveTypeData]);

    const clearTypeData = useCallback(() => {
        setStoredTypeData(null);
        console.log('TypeData cleared');
    }, [setStoredTypeData]);

    useEffect(() => {
        loadTypeData();
    }, [loadTypeData]);

    return (
        <TypeDataContext.Provider value={{ typeData, saveTypeData, loadTypeData, clearTypeData }}>
            {children}
        </TypeDataContext.Provider>
    );
};