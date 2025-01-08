import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/C0ntext";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";

function SimilarSeciality({ speciality }) {
  const [docInfo, setDocInfo] = useState([]);
  const { doctors } = useContext(AppContext);

  const navigate = useNavigate();
  console.log(speciality);
  const applyFilter = () => {
    if (speciality) {
      setDocInfo(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setDocInfo(doctors);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <>
      <div className="flex mt-20 md:flex-row flex-wrap justify-center gap-10 border-t-2 ">
        {docInfo &&
          docInfo.map((item, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => {
                    navigate(`/appointment/${item._id}`), scrollTo(0, 0);
                  }}
                  key={index}
                  className="border mt-5 w-[180px] xl:w-[260px] lg:w-[220px] border-blue-200 rounded-xl overflow-hidden cursor-pointer shadow-md"
                >
                  <img className="bg-blue-50" src={item.image} alt="" />
                  <div className="p-4 ">
                    <div className="flex items-center gap-2 text-sm text-center text-green-500">
                      <p className="w-2 h-2 bg-green-500 rounded-full "></p>
                      <p>Available</p>
                    </div>
                    <p className="font-semibold">{item.name}</p>
                    <p>{item.speciality}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default SimilarSeciality;
