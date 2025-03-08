import { Button } from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[url('/background.png')] bg-slate-900 bg-cover bg-center bg-fixed min-h-screen">
      <div className="bg-black/50 backdrop-blur-sm px-4 py-8 min-h-screen">
        <div className="mx-auto max-w-4xl">
          <Button variant="secondary" onClick={() => navigate('/')} className="mb-6">
            ← Volver
          </Button>

          <div className="space-y-8 bg-slate-800/90 shadow-xl backdrop-blur-sm p-6 rounded-lg">
            <section>
              <h2 className="mb-4 font-bold text-2xl text-amber-500">¿Qué es esta app?</h2>
              <p className="text-gray-300">Esta aplicación está diseñada para facilitar la fase de preparación del juego Avalon. El proceso es simple:</p>
              <ol className="space-y-2 mt-4 text-gray-300 list-decimal list-inside">
                <li>Reparte las cartas físicas a los jugadores como lo harías normalmente</li>
                <li>Abre la app e ingresa los nombres de los jugadores</li>
                <li>Cada jugador selecciona en la app el rol que le tocó físicamente</li>
                <li>La app mostrará a cada jugador la información que le corresponde según su rol</li>
              </ol>
            </section>

            <section>
              <h2 className="mb-4 font-bold text-2xl text-amber-500">Roles Básicos</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-bold text-amber-400">Merlín (Bien)</h3>
                  <p>Conoce la identidad de todos los malvados, excepto Mordred. Si el Asesino lo identifica al final, el mal gana.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400">Asesino (Mal)</h3>
                  <p>Conoce a los otros malvados. Si identifica a Merlín al final de la partida, el mal gana.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400">Leal (Bien)</h3>
                  <p>No tiene habilidades especiales, debe descubrir quiénes son los malvados.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400">Esbirro (Mal)</h3>
                  <p>Conoce a los demás malvados y debe ayudar a hacer fracasar las misiones.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-bold text-2xl text-amber-500">Roles Opcionales</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-bold text-amber-400">Percival (Bien)</h3>
                  <p className="text-amber-600 text-xs">Potencia el bando del bien.</p>
                  <p>Ve a Merlín y Morgana, pero no sabe quién es quién. Debe trabajar para proteger a Merlín.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400">Morgana (Mal)</h3>
                  <p className="text-amber-600 text-xs">Requerida con Percival</p>
                  <p>Se hace pasar por Merlín ante Percival. Conoce a los otros malvados excepto Oberón.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400">Mordred (Mal)</h3>
                  <p className="text-amber-600 text-xs">Potencia el bando del mal.</p>
                  <p>Es invisible para Merlín. Conoce a los otros malvados excepto Oberón.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-400">Oberón (Mal)</h3>
                  <p className="text-amber-600 text-xs">Potencia el bando del bien.</p>
                  <p>Es malvado pero no conoce ni es conocido por los demás malvados. Juega en solitario.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-bold text-2xl text-amber-500">Requerimientos Especiales</h2>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Percival y Morgana deben estar juntos en el juego o ninguno de los dos</li>
                <li>Con 5 jugadores, solo puede haber un personaje especial malvado (Morgana o Mordred)</li>
                <li>Oberón no está permitido en partidas de 5 jugadores</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 font-bold text-2xl text-amber-500">Distribución de Jugadores</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-gray-300">
                  <thead>
                    <tr className="border-gray-700 border-b">
                      <th className="px-4 py-2 text-amber-400 text-left">Total Jugadores</th>
                      <th className="px-4 py-2 text-amber-400 text-left">Buenos</th>
                      <th className="px-4 py-2 text-amber-400 text-left">Malos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">5</td>
                      <td className="px-4 py-2">3</td>
                      <td className="px-4 py-2">2</td>
                    </tr>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">6</td>
                      <td className="px-4 py-2">4</td>
                      <td className="px-4 py-2">2</td>
                    </tr>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">7</td>
                      <td className="px-4 py-2">4</td>
                      <td className="px-4 py-2">3</td>
                    </tr>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">8</td>
                      <td className="px-4 py-2">5</td>
                      <td className="px-4 py-2">3</td>
                    </tr>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">9</td>
                      <td className="px-4 py-2">6</td>
                      <td className="px-4 py-2">3</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">10</td>
                      <td className="px-4 py-2">6</td>
                      <td className="px-4 py-2">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-gray-400 text-sm">* Recuerda: Siempre debe haber un Merlín en el bando del bien y un Asesino en el bando del mal.</p>
            </section>

            <section>
              <h2 className="mb-4 font-bold text-2xl text-amber-500">Tamaño del Equipo por Misión</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-gray-300">
                  <thead>
                    <tr className="border-gray-700 border-b">
                      <th className="px-4 py-2 text-amber-400 text-left">Misión</th>
                      <th className="px-4 py-2 text-amber-400">5p</th>
                      <th className="px-4 py-2 text-amber-400">6p</th>
                      <th className="px-4 py-2 text-amber-400">7p</th>
                      <th className="px-4 py-2 text-amber-400">8p</th>
                      <th className="px-4 py-2 text-amber-400">9p</th>
                      <th className="px-4 py-2 text-amber-400">10p</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">1</td>
                      <td className="px-4 py-2 text-center">2</td>
                      <td className="px-4 py-2 text-center">2</td>
                      <td className="px-4 py-2 text-center">2</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">3</td>
                    </tr>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">2</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">4</td>
                      <td className="px-4 py-2 text-center">4</td>
                      <td className="px-4 py-2 text-center">4</td>
                    </tr>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">3</td>
                      <td className="px-4 py-2 text-center">2</td>
                      <td className="px-4 py-2 text-center">4</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">4</td>
                      <td className="px-4 py-2 text-center">4</td>
                      <td className="px-4 py-2 text-center">4</td>
                    </tr>
                    <tr className="border-gray-700/50 border-b">
                      <td className="px-4 py-2">4</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">4*</td>
                      <td className="px-4 py-2 text-center">5*</td>
                      <td className="px-4 py-2 text-center">5*</td>
                      <td className="px-4 py-2 text-center">5*</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">5</td>
                      <td className="px-4 py-2 text-center">3</td>
                      <td className="px-4 py-2 text-center">4</td>
                      <td className="px-4 py-2 text-center">4</td>
                      <td className="px-4 py-2 text-center">5</td>
                      <td className="px-4 py-2 text-center">5</td>
                      <td className="px-4 py-2 text-center">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-gray-400 text-sm">* En la cuarta misión con 7 o más jugadores, se necesitan dos fallos para que la misión fracase.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
