import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

function ImageCard({ id, index, imageSrc, selected, onClick, moveCard }) {
  const ref = useRef(null);

  const [{ isDrop }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        insDrop: !!monitor.isOver(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect;
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div
      className={`border-2 rounded-lg bg-gray-300 overflow-hidden relative block before:contents[""] before:absolute before:h-0 before:w-0 before:bg-black before:opacity-0 before:transition before:ease-in-out before:duration-[.6s] hover:before:opacity-40 hover:before:h-full hover:before:w-full hover:cursor-pointer group ${ isDrop && "transition ease-in-out duration-[6s] border-red-800 rotate-180"} ${isDragging && "border-black opacity-50 h-10 w-10"}`}
      ref={ref}
      onClick={() => onClick(id)}
    >
      <input
        type="checkbox"
        checked={selected}
        readOnly
        name="bordered-checkbox"
        className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 absolute top-3 left-3 hidden group-hover:block checked:block"
      />
      <img src={imageSrc} alt="image" className="w-full h-full object-cover" />
    </div>
  );
}


export default ImageCard;
