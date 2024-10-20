import { HiPencil } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { useState } from "react";
import EditProductModal from "./EditProductModal";

function AdminProductBox({ product }) {
  const { id, image, title } = product;
  const [isOpenEditModal, setIsOpenEditModal] = useState("");
  const onOpen = () => setIsOpenEditModal(id);
  const onClose = () => setIsOpenEditModal("");
  return (
    <div
      key={id}
      className="flex flex-col gap-3 rounded-[27px] bg-white p-2 shadow-sm"
    >
      <>
        <Link
          className="border-b-2 pb-2"
          to={`/DetailsProduct?productId=${id}`}
        >
          <img src={image} alt="" />
        </Link>
      </>
      <>
        <div className="flex flex-col justify-between gap-6">
          <>
            <div>
              <Link
                to={`/DetailsProduct?productId=${id}`}
                className="line-clamp-2 min-h-8 text-xs font-semibold"
              >
                {title}
              </Link>
            </div>
          </>
          <>
            <div className="flex w-full flex-col gap-1.5 text-sm">
              <button
                onClick={() => onOpen()}
                className="flex w-full items-center justify-center gap-1 rounded-full border border-violet-500 bg-violet-500 p-0.5 font-semibold uppercase text-white transition-all duration-300 hover:opacity-70"
              >
                <HiPencil /> edit
              </button>
            </div>
          </>
        </div>
        {isOpenEditModal && (
          <EditProductModal
            isOpenEditModal={isOpenEditModal}
            onClose={onClose}
          />
        )}
      </>
    </div>
  );
}

export default AdminProductBox;
