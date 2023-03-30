import { useParams } from "react-router-dom";

const DetailCard = () => {
  const { id } = useParams();
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-72 w-52 flex-col  items-center rounded-lg  bg-[whitesmoke] text-blue-900">{`id is ${id}`}</div>
    </div>
  );
};

export default DetailCard;
