import Skeleton from "react-loading-skeleton";

export default function CategoriesSkeleton({ cards }) {
  return (
    <div className="flex flex-wrap gap-3">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border-2 w-36 rounded-xl flex justify-center text-center cursor-wait py-1">
            <Skeleton width={"144px"}/>
          </div>
        ))}
    </div>
  );
}
