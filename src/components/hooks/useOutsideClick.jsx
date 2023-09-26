import { useEffect } from "react";

export default function useOutsideClick(ref, exceptionId, cb) {
  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target) && event.target.id!==exceptionId) {
      //   console.log(event.target);
      cb();
    }
  };
  useEffect(
    () => {
      document.addEventListener("mousedown", handleOutsideClick);
    },
    [ref],
    cb
  );
  return ()=>{
    document.removeEventListener("mousedown")
  }
}
