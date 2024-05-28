'use client';

import { FolderOutput, Power, SquareX } from "lucide-react";
import { Button } from "./ui/button";

const Container = () => {
    return (
        <div className="flex items-center justify-between mx-10 gap-10">
        <div className="flex items-center">
            <Button variant="outline" className="rounded-full" >
                <Power className="h-6 w-8"/>
                <h1 className="text-2xl font-bold">
                    Começar
                </h1>
            </Button>
        </div>
        <div className="flex items-center">
            <Button variant="outline" className="rounded-full" >
                <SquareX />
                <h1 className="text-2xl font-bold" >
                    Limpar
                </h1>
            </Button>
        </div>
        <div className="flex items-center">
            <Button variant="outline" className="rounded-full">
                <FolderOutput className="h-8 w-8"/>
                <h1 className="text-2xl font-bold">
                    Exportar
                </h1>
            </Button>
        </div>
    </div>

    )
};

export default Container;