import Link from "next/link";
import WordRotate from "../word-rotate";
import { TbCircleDashedLetterM } from "react-icons/tb";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <TbCircleDashedLetterM size={22} className="text-primary" />
      <WordRotate label="I'm Mario" label2="Web Dev" style="font-medium uppercase" />
    </Link>
  );
};

export default Logo;
