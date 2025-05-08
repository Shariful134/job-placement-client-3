import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Free Delivery",
    body: "From $59.89",
    img: "https://i.postimg.cc/SKPb1ZK4/delivery.png",
  },
  {
    name: "Support 24/7",
    username: "@jill",
    body: "Online 24 hours",
    img: "https://i.postimg.cc/XY2RX2d5/support.png",
  },
  {
    name: "Free Return",
    username: "@john",
    body: "365 a day",
    img: "https://i.postimg.cc/x1d7rKh1/return.png",
  },
  {
    name: "payment method",
    username: "@jane",
    body: "Secure payment",
    img: "https://i.postimg.cc/rwv9hxLb/payment.png",
  },
  {
    name: "Big Saving",
    username: "@jenny",
    body: "Weeken Sales",
    img: "https://i.postimg.cc/9fdyJkbR/saving.png",
  },
];

const firstRow = reviews.slice(0, reviews.length);

const ReviewCard = ({
  img,
  name,

  body,
}: {
  img: string;
  name: string;

  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-4"
        // light styles
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex  gap-5">
          <img
            width={52}
            height={52}
            className="w-[52px] h-[52px] object-cover rounded"
            alt="Tech Logo"
            src={img}
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold dark:text-white/40">{name}</p>
            <p className="text-md  dark:text-white/40">{body}</p>
          </div>
        </div>
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="mt-5 container mx-auto ">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 "></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 "></div>
      </div>
    </div>
  );
}
