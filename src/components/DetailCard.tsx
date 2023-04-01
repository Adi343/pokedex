import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const DetailCard = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery([`pokemon_${id}`], () => {
    return fetch(`${import.meta.env.VITE_API_URL}${id}`).then((res) =>
      res.json()
    );
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-72 w-[400px] flex-col  items-center justify-center rounded-lg  bg-[whitesmoke] text-blue-900">
        <h3 className="mt-[10px] text-xl text-black">{data?.name}</h3>

        {data?.sprites?.front_default !== undefined ? (
          <img className="h-64 w-64 " src={data?.sprites?.front_default} />
        ) : null}
      </div>
    </div>
  );
};

export default DetailCard;
