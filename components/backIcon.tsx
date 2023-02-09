import { useRouter } from "next/router";
import { ArrowSquareLeft } from "iconsax-react";
export default function BackIcon() {
   const router = useRouter();

   const backHistoryHanlder = () => {
      router.back();
   };
   return <ArrowSquareLeft cursor="pointer" onClick={backHistoryHanlder} size="42" />;
}
