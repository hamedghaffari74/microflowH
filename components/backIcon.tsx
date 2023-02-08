import Image from "next/image";
import LeftArrow from "../images/left-arrow.svg";
import { useRouter } from "next/router";

export default function BackIcon() {
   const router = useRouter();

   const backHistoryHanlder = () => {
      router.back();
   };
   return (
      <button onClick={backHistoryHanlder} style={{ backgroundColor: "inherit", border: "none", cursor: "pointer" }}>
         <Image src={LeftArrow} alt="left subquare arrow"></Image>
      </button>
   );
}
