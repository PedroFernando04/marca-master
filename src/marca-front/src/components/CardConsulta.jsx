import Button from "./Button";

export default function CardConsulta(){
    return(
        <div className="flex bg-white h-40 w-full max-w-6xl mx-auto rounded-lg shadow-lg items-center px-6">
            
            <div className="flex flex-col gap-3">
                
                <div className="flex items-center gap-4">
                    
                    <div className="bg-gradient-to-br from-blue-200 to-blue-100 w-16 h-16 rounded-full"></div>

                    <div>
                        <h1 className="font-bold text-lg">Dr. Cleiton</h1>
                        <p className="text-sm text-blue-500 font-semibold">Clínico Geral</p>
                    </div>

                </div>

                <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <p>SEG, 27 de Out.</p>
                    <p>08:00</p>
                </div>

                <div className="text-green-600 font-semibold text-sm">
                    Confirmada
                </div>

            </div>

            <div className="ml-auto">
                <Button cor="excluir">Cancelar</Button>
            </div>

        </div>
    );
}