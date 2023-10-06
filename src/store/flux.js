/** Global State 
 * @returns {Object} 
 * store: data to be shared across components.
 * 
 * actions: functions to be called by components.
*/
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            access_token: '',
            allPokemons: null,
            publicJson: {},
            
        },
        actions: {

            getAllPokemon: async () => {
                const options = {
                    method: 'GET',
                    headers: {
                        /* 'X-RapidAPI-Key': '75e515f612msh600b868c18b42dep1f7478jsnbddde5a396c2',
                        'X-RapidAPI-Host': 'pokedex2.p.rapidapi.com' */
                    }
                };
                try {
                    const response = await fetch('https://pokeapi.co/api/v2/pokedex/1/', options)
                    if (response.status === 200) {
                        const data = await response.json();
                        console.log(data, "<--- DATA");
                        setStore({
                            allPokemons: data,
                        });
                        return data;
                    }
                } catch (e) {
                    console.log(e);
                }
                
            },

            getPublicJson: () => {
                let jsonCont = {
                    items: [
                        {
                            id: 20000,
                            titulo: 'Cantidad de Billetes de 20 mil',
                            btnBack: '',
                            btnNext: 'Siguiente',
                            cantidad: '',
                            total: 0,
            
                        },
                        {
                            id: 10000,
                            titulo: 'Cantidad de Billetes de 10 mil',
                            btnBack: 'Atrás',
                            btnNext: 'Siguiente',
                            cantidad: '',
                            total: 0,
                            
                        },
                        {
                            id: 5000,
                            titulo: 'Cantidad de Billetes de 5 mil',
                            btnBack: 'Atrás',
                            btnNext: 'Siguiente',
                            cantidad: '',
                            total: 0,
                            
                        },
                        {
                            id: 2000,
                            titulo: 'Cantidad de Billetes de 2 mil',
                            btnBack: 'Atrás',
                            btnNext: 'Siguiente',
                            cantidad: '',
                            total: 0,
                            
                        },
                        {
                            id: 1000,
                            titulo: 'Cantidad de Billetes mil',
                            btnBack: 'Atrás',
                            btnNext: 'Siguiente',
                            cantidad: '',
                            total: 0,
                            
                        },
                        {
                            id: 500,
                            titulo: 'Cantidad de Monedas de 500',
                            btnBack: 'Atrás',
                            btnNext: 'Siguiente',
                            cantidad: '',
                            total: 0,
                            
                        },
                        {
                            id: 100,
                            titulo: 'Cantidad de Monedas de 100',
                            btnBack: 'Atrás',
                            btnNext: 'Siguiente',
                            cantidad: '',
                            total: 0,
                            
                        },
                        {
                            id: 50,
                            titulo: 'Cantidad de Monedas de 50',
                            btnBack: 'Atrás',
                            btnNext: 'Siguiente',
                            cantidad: '',
                            total: 0,
                            
                        },
                        {
                            id: 10,
                            titulo: 'Cantidad de Monedas de 10',
                            btnBack: 'Atrás',
                            btnNext: 'Finalizar',
                            cantidad: '',
                            total: 0,
                            
                        }
                    ],
                    numRegistros: 9,
                }

                setStore({
                    publicJson: jsonCont,
                })
                return jsonCont;
            }
        }
    }
};
export default getState;