import React, {createContext, useContext, useEffect, useCallback, useState, useMemo} from 'react';
import TypeData from '@/interfaces/TypeData';
import { useStorageState } from '@/hooks/useStorageState';
import {useSession} from "@/contexts/AuthContext";
import {replaceNullWithEmptyString} from "@/utils/normalizationUtils";
import apiRequest from "@/utils/apiRequest";
import {ApiMethods, ApiRoutes} from "@/enums/ApiEnums";
import { serialize, deserialize } from "@/utils/serializationUtils";

const TYPE_DATA_KEY = 'type_data'; // SecureStore key TODO get from env variable

// Define the context default state
interface TypeDataContextType {
    typeData: TypeData | null;
    saveTypeData: (data: TypeData) => void;
    loadTypeData: () => void;
    clearTypeData: () => void;
}

const TypeDataContext = createContext<TypeDataContextType>({
    typeData: null,
    saveTypeData: () => {},
    loadTypeData: () => {},
    clearTypeData: () => {},
})

export const useTypeData = (): TypeDataContextType => {
    const context = useContext(TypeDataContext);
    if (!context) {
        throw new Error('useTypeData must be used within an TypeDataContextProvider');
    }
    return context;
};

export const TypeDataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token } = useSession();
    const [[loading, storedTypeData], setStoredTypeData] = useStorageState(TYPE_DATA_KEY);
    const [typeData, setTypeData] = useState<TypeData | null>(null);

    const saveTypeData = useCallback((newData: TypeData) => {
        try {
            const normalizedData = replaceNullWithEmptyString(newData);
            setTypeData(normalizedData as TypeData);
            setStoredTypeData(serialize(newData));
        } catch (error) {
            console.error('Failed to save type data:', error);
        }
    }, []);

    const loadDataFromApi = async (): Promise<void> => {
        try {
            const data: TypeData | null = await apiRequest<TypeData>(
                ApiMethods.Get,
                ApiRoutes.GetTypes,
                null,
                {},
                token
            );
            if (data) {
                const normalizedData = replaceNullWithEmptyString(data);
                setTypeData(normalizedData as TypeData);
                console.log('Types loaded from API');
                return;
            }
        } catch (error) {
            console.error('Error fetching type data from API:', error);
        }
    };

    const loadDataFromStorage = (): void => {
        try {
            if (storedTypeData) {
                const loadedTypeData = deserialize(storedTypeData);
                setTypeData(loadedTypeData as TypeData);
                console.log('Type data loaded from storage');
            }
        } catch (error) {
            console.error('Failed to reload type data:', error);
        }
    };

    const loadTypeData = useCallback(async () => {
        await loadDataFromApi();
        if (!typeData) {
            loadDataFromStorage();
        }
    }, [storedTypeData, token]);

    const clearTypeData = useCallback(() => {
        try {
            setTypeData(null);
            setStoredTypeData(null);
        } catch (error) {
            console.error('Failed to clear type data:', error);
        }
    }, []);

    useEffect(() => {
        if (!typeData) {
            loadTypeData();
        }
    }, [typeData]);

    const contextValue = useMemo(() => ({
        typeData,
        saveTypeData,
        loadTypeData,
        clearTypeData,
    }), [typeData, saveTypeData, loadTypeData, clearTypeData,]);

    return (
        <TypeDataContext.Provider value={contextValue}>
            {children}
        </TypeDataContext.Provider>
    );
};