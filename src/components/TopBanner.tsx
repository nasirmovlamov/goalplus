import Image from "next/image";
import topBanner from "../media/images/top-banner.png";
type Props = {};

const TopBanner = (props: Props) => {
  return (
    <div className="w-full">
      <Image
        src={topBanner}
        alt=""
        className="w-full md:h-[161px] h-[50px] object-cover"
      />
    </div>
  );
};

export default TopBanner;
