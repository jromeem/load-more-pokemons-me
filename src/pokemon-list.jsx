// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useEffect, useState } from "react";

const PokemonList = () => {

    const [pokeCount, setPokeCount] = useState(0);
    const [listedPokemon, setListedPokemon] = useState([]);
    const [nextOffset, setNextOffset] = useState(0);
    const [displayAmount, setDisplayAmount] = useState(5);
    const [loadedAll, setLoadedAll] = useState(false);

    const increaseOffset = () => setNextOffset(nextOffset + displayAmount);

    const getInitialPokemon = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0')
                .then((response) => response.json())
                .then((json) => {
                    console.log(json.results);
                    setListedPokemon(json.results);
                    setPokeCount(json.results.length);
                    increaseOffset();
                });
    };

    const getNextPokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${displayAmount}&offset=${nextOffset}`)
            .then((response) => response.json())
            .then((json) => {
                if (json.results.length < displayAmount) {
                    setLoadedAll(true);
                }
                console.log(json.results);
                setListedPokemon(listedPokemon.concat(json.results));
                setPokeCount(pokeCount + json.results.length);
                increaseOffset();
            });
    }

    useEffect(() => {
        getInitialPokemon();
    }, [])

    return <div>
        <div>
            <p>Displaying {pokeCount} of 1281 results</p>
            <input type="number" placeholder="display amount" value={displayAmount} onChange={(e) => setDisplayAmount(parseInt(e.target.value))}></input>
            { !loadedAll ? 
                <div>
                    <button onClick={getNextPokemon}>Load more</button>
                </div>
                :
                <></>
            }
            <ul>
                {listedPokemon.map((poke, index) => {
                    return <li key={index}>{poke.name}</li>
                })}
            </ul>

        </div>
    </div>
};

export default PokemonList;
