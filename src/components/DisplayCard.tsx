import { useNavigate } from "react-router-dom";

type DisplayCardProps = {
  pokemonId: number;
  pokemonName: string;
  imageSrc: string;
};

const DisplayCard = (props: DisplayCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-50 flex h-72 flex-col  items-center rounded-lg bg-[whitesmoke] "
      onClick={(event) => navigate(`/${props.pokemonId}`)}
    >
      {props.imageSrc !== undefined ? (
        <img className="h-64 w-64 " src={props.imageSrc} />
      ) : null}
      {props.pokemonName !== undefined ? (
        <h3 className="m-3 text-2xl font-semibold text-black">
          {props.pokemonName}
        </h3>
      ) : null}
    </div>
  );
};

export default DisplayCard;
