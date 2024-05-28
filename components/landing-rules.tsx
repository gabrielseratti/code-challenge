"use client"

import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";

export const LandingHero = () => {

    return (
        <div className="text-white font-bold pt-5 text-center space-y-5 z-10">
            <div className="text-4xl sm:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent 
                    options={{
                        strings: [
                            "Opções de tamanhos:",
                            "0,5 L.",
                            "2,5 L.",
                            "3,6 L.",
                            "18 L.",
                        ],
                        autoStart: true,
                        loop: true
                    }}
                    />
                </div>
                <h1>Regras do negócio</h1>
            </div>
            <div className="text-md md:text-xl font-light text-zinc-400 px-20">
                <h1>- Nenhuma parede pode ter menos de 1 metro quadrado nem mais de 50 metros quadrados, mas podem possuir alturas e larguras diferentes. <br />
                O total de área das portas e janelas deve ser no máximo 50% da área de parede. <br /></h1>
                <h1>- A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta. <br /></h1>
                <h1>- A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta. <br /></h1>
                <h1>- Cada janela possui as medidas: 2,00 x 1,20 mtos. <br /></h1>
                <h1>- Cada porta possui as medidas: 0,80 x 1,90. <br /></h1>
                <h1>- Cada litro de tinta é capaz de pintar 5 metros quadrados. <br /></h1>
                <h1>- Não considerar teto nem piso. <br /></h1>
                <h1>- As variações de tamanho das latas de tinta são: <br />
                    0,5 L;
                    2,5 L;
                    3,6 L;
                    18 L; </h1>
            </div>
            <div>
                <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold gap-x-4">
                    Entre em contato agora
                    <BellRing />
                </Button>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal pb-10">
                Atendimento em horário comercial
            </div>
        </div>
    )
}