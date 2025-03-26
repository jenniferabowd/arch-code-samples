'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, Cross1Icon } from '@radix-ui/react-icons';
import { SelectValue, SelectViewport } from '@radix-ui/react-select';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
} from '@/components/ui/select';
import CubeTable from '@/components/CubeTable';


export default function ChatCollaboration({
                                              cubeTablesIds,
                                              cubeTables,
                                              setIsAssetOpen,
                                          }: {
    cubeTablesIds: string[];
    cubeTables: { [key: string]: { name: string; query: string; description: string; id: string } };
    setIsAssetOpen: (isAssetOpen: boolean) => void;
}) {
    const [currentCubeTableId, setCurrentCubeTableId] = useState<number>(0);

    return (
        <div className="mt-3 w-2/4 rounded-lg bg-white">
            <div className="flex h-[85vh] w-full flex-col items-center justify-center overflow-auto p-4">
                {cubeTablesIds.length > 0 && cubeTablesIds[currentCubeTableId] != null && (
                    <>
                        <div className="m-2 flex w-full items-center justify-between">
                            <Cross1Icon onClick={() => setIsAssetOpen(false)} />
                            {cubeTablesIds.length > 1 && (
                                <div className="flex items-end">
                                    <Select
                                        value={cubeTablesIds[currentCubeTableId]}
                                        onValueChange={(id) => {
                                            const newIndex = cubeTablesIds.indexOf(id);
                                            setCurrentCubeTableId(newIndex !== -1 ? newIndex : 0);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a different query">
                                                Select a different query
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectScrollUpButton>
                                                    <ChevronUpIcon />
                                                </SelectScrollUpButton>
                                                <SelectViewport>
                                                    {cubeTablesIds.map((id) => {
                                                        const cubeTableName = cubeTables?.[id]?.name;
                                                        return (
                                                            cubeTableName && (
                                                                <SelectItem key={id} value={id}>
                                                                    {cubeTableName}
                                                                </SelectItem>
                                                            )
                                                        );
                                                    })}
                                                </SelectViewport>
                                                <SelectScrollDownButton>
                                                    <ChevronDownIcon />
                                                </SelectScrollDownButton>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <CubeTable queryId={cubeTablesIds[currentCubeTableId]} />
                    </>
                )}
            </div>
        </div>
    );
}
