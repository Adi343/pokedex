import { useState, useRef } from "react";
import { useQuery } from "react-query";
import useDebounce from "../hooks/debounceHook";

import DisplayCard from "./DisplayCard";

let fullData: any = {};
const Container = () => {
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 1500);

  const [startPokemon, setStartPokemon] = useState<number>(1);
  const pokemonIds: number[] = [
    startPokemon,
    startPokemon + 1,
    startPokemon + 2,
    startPokemon + 3,
    startPokemon + 4,
  ];

  const { isLoading, data } = useQuery([debouncedSearch], () => {
    if (debouncedSearch !== "") {
      return fetch(`${import.meta.env.VITE_API_URL}${debouncedSearch}/`).then(
        (res) => res.json()
      );
    }
  });

  const firstPokemon = useQuery(
    [`pokemon_${pokemonIds[0]}`],
    () => {
      if (pokemonIds[0] < 120) {
        return fetch(`${import.meta.env.VITE_API_URL}${pokemonIds[0]}`).then(
          (res) => res.json()
        );
      }
    },
    { staleTime: 5 * 60 * 1000 }
  );

  if (firstPokemon?.data?.name !== undefined) {
    fullData = { ...fullData, [firstPokemon?.data?.name]: firstPokemon?.data };
  }

  const secondPokemon = useQuery(
    [`pokemon_${pokemonIds[1]}`],
    () => {
      if (pokemonIds[1] < 120) {
        return fetch(`${import.meta.env.VITE_API_URL}${pokemonIds[1]}`).then(
          (res) => res.json()
        );
      }
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const secondPokemonName = secondPokemon?.data?.name;
  const secondPokemonData = secondPokemon?.data;

  if (secondPokemonName !== undefined) {
    fullData = { ...fullData, [secondPokemonName]: secondPokemonData };
  }

  const thirdPokemon = useQuery(
    [`pokemon_${pokemonIds[2]}`],
    () => {
      if (pokemonIds[2] < 120) {
        return fetch(`${import.meta.env.VITE_API_URL}${pokemonIds[2]}`).then(
          (res) => res.json()
        );
      }
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const thirdPokemonName = thirdPokemon?.data?.name;
  const thirdPokemonData = thirdPokemon?.data;

  if (thirdPokemonName !== undefined) {
    fullData = { ...fullData, [thirdPokemonName]: thirdPokemonData };
  }

  const fourthPokemon = useQuery(
    [`pokemon_${pokemonIds[3]}`],
    () => {
      if (pokemonIds[3] < 120) {
        return fetch(`${import.meta.env.VITE_API_URL}${pokemonIds[3]}`).then(
          (res) => res.json()
        );
      }
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const fourthPokemonName = fourthPokemon?.data?.name;
  const fourthPokemonData = fourthPokemon?.data;

  if (fourthPokemonName !== undefined) {
    fullData = { ...fullData, [fourthPokemonName]: fourthPokemonData };
  }

  const fifthPokemon = useQuery(
    [`pokemon_${pokemonIds[4]}`],
    () => {
      if (pokemonIds[4] < 120) {
        return fetch(`${import.meta.env.VITE_API_URL}${pokemonIds[4]}`).then(
          (res) => res.json()
        );
      }
    },
    { staleTime: 5 * 60 * 1000 }
  );

  const fifthPokemonName = fifthPokemon?.data?.name;
  const fifthPokemonData = fifthPokemon?.data;

  if (fifthPokemonName !== undefined) {
    fullData = { ...fullData, [fifthPokemonName]: fifthPokemonData };
  }

  const pokemonData = [
    firstPokemon,
    secondPokemon,
    thirdPokemon,
    fourthPokemon,
    fifthPokemon,
  ];

  return (
    // First div is the full page container
    <div className=" flex h-full min-w-full   justify-center rounded  align-middle ">
      {/* Container for light red  */}
      <div className="flex  h-full w-[2000px] flex-col  items-center rounded  p-2">
        {/* Container for pokemon details  */}

        <input
          type="text"
          placeholder="Search for a pokemon"
          onChange={(e) => {
            setSearch(e.target.value.trim());
          }}
          className="min-h- input-bordered input min-h-12 m-5 w-3/5 border-black bg-[white]  text-black placeholder-black "
        />
        {/* Container for pokemon data */}
        <div className="grid h-full w-3/5 grid-cols-3 justify-between gap-3  rounded  ">
          {/* Container for pokemon stats */}

          {debouncedSearch === "" &&
            Object.keys(fullData).map((item: string) => (
              <DisplayCard
                pokemonId={fullData[item].id}
                pokemonName={item}
                imageSrc={fullData[item].sprites.front_default}
              />
            ))}
          {debouncedSearch !== "" && (
            <DisplayCard
              pokemonId={data?.id}
              pokemonName={debouncedSearch}
              imageSrc={data?.sprites.front_default}
            />
          )}
        </div>
        {debouncedSearch === "" && (
          <button
            ref={buttonRef}
            className="mt-3 h-10 w-28 rounded-lg bg-black"
            onClick={(event) => {
              setStartPokemon((prev) => prev + 5);
              console.log(
                `document.body.scrollHeight is ${document.body.scrollHeight}`
              );

              // Div needs to render new data before it can scroll

              setTimeout(() => {
                console.log("Running timeout code ");
                buttonRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 750);
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Container;
