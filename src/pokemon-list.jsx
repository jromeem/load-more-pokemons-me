// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useEffect, useState } from "react";

const PokemonList = () => {
    
    const [initialPokemon, setInitialPokemon] = useState([]);
    const getInitialPokemon = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0')
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    setInitialPokemon(json);
                });
    };

    useEffect(() => {
        getInitialPokemon();
    }, [])

    return <div>
        <pre>{JSON.stringify(initialPokemon, null, 2)}</pre>
    </div>
};

export default PokemonList;
