# Resistencia Avalon

Esta app facilitará la preparación de las partidas de resistencia avalon, permitiendo a los jugadores enfocarse en el juego y no en la preparación y minimizando los errores o trampas al momento de identificar roles.

La app hará lo siguiente:

1. Menu que de momento solo tendrá un boton para iniciar el juego (local), y en el futuro se hará una implementación con websocket para preparar la partida donde cada jugador verá en su celular lo que le corresponda.
## modo local
1. Ingreso de jugadores: Se ingresan los nombres de los jugadores en el orden en que estan sentados izquierda a derecha (mínimo 5, máximo 10), los jugadores previamente ya han repartido sus cartas de personaje fisicamente.
2. Modo de juego: (simple: sin personajes opcionales [solo asesino y merli], avanzado: con personajes es opcionales).
3. Luego luego la app solicita que se pase el celular a un jugador aleatorio para que pueda seleccionar la tarjeta que le corresponde y la tiene fisicamente asignada, para evitar mistakes al momento de entregar el celular la app dira el nombre del jugador y dirá manten presionado 3 segundos para iniciar (y vibrará cada segundo).
4. El jugador ingresa su carta y pone finalizar, luego se pasa el celular al siguiente jugador.
5. Una vez que todos los jugadores hayan ingresado su carta, la app mostrará un mensaje de que se ha completado la identificación de roles y procederá a solicitar que se entregue el celular a un jugador y mostrará la información que le corresponda según su rol.
6. cada jugador tendrá el celular para evitar sospechas de quien es quien.

# Preparación modo básico:

# 1. Preparación juego.

A. En una partida siempre debe ir un asesino (mal) y un merlin (bien).

La distribucion de jugadores por tipo es:

# Tabla de Jugadores

| Jugadores | Bien | Mal |
|-----------|------|-----|
| 5         | 3    | 2   |
| 6         | 4    | 2   |
| 7         | 4    | 3   |
| 8         | 5    | 3   |
| 9         | 6    | 3   |
| 10        | 6    | 4   |


B. Se reparte tarjeta de votación a cada uno.

C. Se pone un indicador de lider en un jugador aleatorio.

D. Segun el tipo de jugadores se selecciona un tablero y se ponen la fichas restantes, al costado se dejan las tarjetas de exito o fracaso.

# 2. Identificar roles.

A. Todos los jugadores extienden sus manos formando un puño, luego cierran sus ojos (sin hacer trampa).

B. Los jugadores del mal abren sus ojos y extienden sus pulgares.

C. Merlin Abre sus ojos y reconoce a los jugadores del mal.

D. Todos cierran los puños y los ojos nuevamente.

E. Regresan sus manos y abren sus ojos.

F. Es posible mentir el rol que eres durante el juego pero no puedes mentir en la fase de identificación.

# 3. Ronda

A. El juego se divide en rondas y cada ronda en (Fase de formación de equipo y Fase de expedición).

B. El lider selecciona el equipo segun esta tabla:

# Tabla de Equipos para la Gesta

| Equipo para la gesta | 5 Jugadores | 6 Jugadores | 7 Jugadores | 8 Jugadores | 9 Jugadores | 10 Jugadores |
|----------------------|-------------|-------------|-------------|-------------|-------------|--------------|
| Ronda 1              | 2           | 2           | 2           | 3           | 3           | 3            |
| Ronda 2              | 3           | 3           | 3           | 4           | 4           | 4            |
| Ronda 3              | 2           | 4           | 3           | 4           | 4           | 4            |
| Ronda 4              | 3           | 3           | 4           | 5           | 5           | 5            |
| Ronda 5              | 3           | 4           | 4           | 5           | 5           | 5            |


C. Los jugadores deben votar por mayoria simple si estan de acuerdo con el equipo, en caso de 5 rechazos consecutivos mal gana el juego.

(La cuarta gesta en partidas de siete o más jugadores requiere como mínimo dos cartas de fracaso de gesta para ser considerada como gesta fallida.)

D. Se reparte a cada jugador cartas de expedición, y en secreto el equipo vota una carta de expedición (El bien siempre vota a EXITO, el mal puede votar EXITO o FRACASO).

E. Se revuelven las cartas de expedición, si al menos una es de FRACASO, la expedición se pierde y el mal gana un punto en caso contrario el bien gana un punto (Un empate es un rechazo).

F. El lider pasa al jugador de la izquierda.

# 4. Fin de partida.

A. Una partida termina con exito (para el bien o para el mal) si hay 3 expediciones ganadas (para bien o para mal).

B. Si se completaron 3 Exitos, el mal puede indicar quien es merlin si aciertan el MAL GANA.


# 5. Personajes (opcionales).

Si queréis, podéis añadir a vuestras partidas hasta cuatro personajes adicionales con habilidades especiales. Jugad con
estas cartas en cualquier combinación que os apetezca; algunas incrementarán la dificultad para uno de los bandos.
Nuestra recomendación es ir paso a paso e introducir cada vez un personaje nuevo para luego cambiarlos o añadir más
cuando ya estéis familiarizados con cada uno. En la mayoría de casos decidiréis jugar con Merlín, pero no es necesario.

## Perceval. Perceval es un personaje opcional en el lado del bien. Su habilidad especial es que sabe quién es Merlín
desde el principio de la partida. Usar sabiamente esta habilidad es clave para proteger la identidad de Merlín. Al
introducir a Perceval en las partidas, el bando del bien es ligeramente más potente y ganará más a menudo.
### Nota. Para partidas de cinco jugadores, introducid a Mordred o Morgana si jugáis con Perceval.

## Mordred. Mordred es un personaje opcional en el lado del mal. Su habilidad especial es que no revela su identidad
a Merlín al principio de la partida. Al introducir a Mordred en las partidas, el bando del mal es ligeramente más
potente y ganará más a menudo.

## Oberón. Oberón es un personaje opcional en el lado del mal. Su habilidad especial es que no revela su identidad a
los demás jugadores del mal ni sabe cuáles son los otros jugadores del mal al principio de la partida («no conoce ni es
conocido»). Oberón no se considera un esbirro de Mordred y no abre los ojos durante la fase «El mal se revela» al principio
de la partida. Al introducir a Oberón en las partidas, el bando del bien es ligeramente más potente y ganará más a menudo.

## Morgana. Morgana es un personaje opcional en el lado del mal. Su habilidad especial es que se hace pasar por

## Merlín: se muestra como Merlín a Perceval. Al introducir a Morgana en las partidas, el bando del mal es ligeramente
más potente y ganará más a menudo.

La fase «El mal se revela» del principio de la partida variará ligeramente en función de qué personajes se añadan. A
continuación tenéis las frases a usar para los diversos personajes que se incluyen.

### «Cerrad todos los ojos y cerrad el puño, con el brazo estirado delante de vosotros.»
### «Esbirros de Mordred, pero no Oberón, abrid los ojos. Mirad a vuestro alrededor y aseguraos de reconocer y
recordar a todos los demás agentes del mal.»
### «Esbirros de Mordred, cerrad los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado
con el brazo estirado.»
### «Esbirros de Mordred, pero no Mordred, levantad el pulgar, de modo que Merlín pueda saber quiénes sois.»
### «Merlín, abre los ojos y mira quiénes son los agentes del mal.»
### «Esbirros de Mordred, recoged el pulgar y cerrad el puño como antes.»
### «Merlín, cierra los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado con el brazo
estirado.»
### «Merlín y Morgana, levantad el pulgar, de modo que Perceval pueda saber quiénes sois.»
### «Perceval, abre los ojos para que puedas saber quiénes son Merlín y Morgana.»
### «Merlín y Morgana, recoged el pulgar y cerrad el puño como antes.»
### «Perceval, cierra los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado con el brazo
estirado.»
### «Abrid todos los ojos.»