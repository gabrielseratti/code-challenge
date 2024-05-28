'use client';

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    heigth_wall: z.string().transform((val) => parseFloat(val)).refine(val => !isNaN(val) && val > 0, {
        message: "Altura da parede é necessária e deve ser um número maior que 0."
    }),
    width_wall: z.string().transform((val) => parseFloat(val)).refine(val => !isNaN(val) && val > 0, {
        message: "Largura da parede é necessária e deve ser um número maior que 0."
    }),
    number_windows: z.string().transform((val) => parseInt(val)).refine(val => !isNaN(val), {
        message: "Número de janelas deve ser um número."
    }),
    number_doors: z.string().transform((val) => parseInt(val)).refine(val => !isNaN(val), {
        message: "Número de portas deve ser um número."
    }),
});

type Props = {
    totalArea: number;
}

type Wall = z.infer<typeof formSchema>;

export const LandingContent = ({

}: Props) => {
    const [totalArea, setTotalArea] = useState(0);
    const [currentWall, setCurrentWall] = useState(1);    
    const [walls, setWalls] = useState<Wall[]>([]);    
    const [paintCansNumber, setPaintCansNumber] = useState<number[]>([]);
    const [showPaintCansNumber, setShowPaintCansNumber] = useState(false);

    const form = useForm<Wall>({
        resolver: zodResolver(formSchema),
    });

    const isLoading = form.formState.isSubmitting;

    const onCancel = () => {
        form.reset();        
        setCurrentWall(1);
        toast.error("Preenchimento cancelado")
    }

    useEffect(() => {
        let total = 0;
        walls.forEach(wall => {
            const area = (wall.heigth_wall * wall.width_wall) - ((wall.number_windows*2.4) + (wall.number_doors*1.52));
            total += area;
        });
        setTotalArea(total);
    }, [walls]);
    

    const calculatePaintCansQuantity = (totalArea: number) => {
        const coveragePerLiter = 5; 
        const litersQuantity = totalArea / coveragePerLiter;
        return litersQuantity;
    }

    const calculatePaintCansNumber = (totalArea: number) => {
        const paintLiters = calculatePaintCansQuantity(totalArea);
        const cansSizes = [18, 3.6, 2.5, 0.5];
        let remainingLiters = paintLiters;
        const cansNumber: { [key: number]: number } = {};
    
        cansSizes.forEach(size => {
            const quantity = Math.floor(remainingLiters / size);
            cansNumber[size] = quantity;
            remainingLiters -= quantity * size;
        });
    
        if (remainingLiters > 0) {
            for (let i = cansSizes.length - 1; i >= 0; i--) {
                if (remainingLiters > 0) {
                    cansNumber[cansSizes[i]]++;
                    remainingLiters -= cansSizes[i];
                }
            }
        }
    
        return cansSizes.map(size => `${size}L: ${cansNumber[size]}`).join('; ');
    }

    console.log(calculatePaintCansNumber(95))
    

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (values.heigth_wall*values.width_wall < 1 || values.heigth_wall*values.width_wall > 50) {
            toast.error("Nenhuma parede pode ter menos de 1 metro quadrado nem mais de 50 metros quadrados, mas podem possuir alturas e larguras diferentes")
            return;
        }

        if (((values.number_windows*2.4) + (values.number_doors*1.52)) > (values.heigth_wall * values.width_wall)*0.5) {
            toast.error("O total de área das portas e janelas deve ser no máximo 50% da área de parede")
            return;
        }

        if (values.number_doors !== 0 && values.heigth_wall < 2.2) {
            toast.error("A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta")
            return;
        }

        setWalls([...walls, values]);
        
        if (currentWall <= 4) {
            form.reset();
            setCurrentWall(currentWall + 1);
        }

        if (currentWall === 4) {
            const cansNumber = calculatePaintCansNumber(totalArea);
            setShowPaintCansNumber(true);
            form.reset();
            setCurrentWall(1);
            setPaintCansNumber(cansNumber);
        }    
}    
    
    return (
        <div>
            <div className="mx-16 space-y-4 z-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <FormField control={form.control} name="heigth_wall" render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel
                                className="uppercase text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600">
                                    {`Altura da parede ${currentWall}`}
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Altura da parede" {...field} value={field.value || ''} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="width_wall" render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel
                                className="uppercase text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600">                                    
                                    {`Largura da parede ${currentWall}`}
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Largura da parede" {...field} value={field.value || ''} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="number_windows" render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel
                                className="uppercase text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600">
                                    {`Numero de janelas da parede ${currentWall}`}
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Número de janelas" {...field} value={field.value || ''} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="number_doors" render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel
                                className="uppercase text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600">
                                    {`Numero de portas da parede ${currentWall}`}
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Número de portas" {...field} value={field.value || ''} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )} />
                        <div className="p-6 space-x-2 flex items-center justify-end w-full justify-reverse">
                            <Button disabled={isLoading} type="submit" variant={"premium"} onClick={() => {}}>
                                {currentWall < 4 ? "Próxima Parede" : "Calcular"}
                            </Button>
                            <Button disabled={isLoading} variant={"outline"} onClick={onCancel}>Cancel</Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="text-white text-center text-2xl font-semibold flex flex-col p-2 gap-2">
                {showPaintCansNumber && (
                    <div className={cn("h-full pt-2 border-t-2 border-slate-600")}>
                        Para pintar uma área total de paredes de <span className="text-3xl font-bold text-red-500">{totalArea}m²</span>
                    </div>
                )}
                {showPaintCansNumber && (
                    <div className={cn("h-full pb-2 border-b-2 border-slate-600")}>
                        é necessário o uso destes tamanhos de latas: <br /><br />
                        <span className="text-3xl font-bold text-red-500">{paintCansNumber}</span>
                    </div>
                )}
            </div>
        </div>
    );
};