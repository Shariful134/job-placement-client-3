import mission from "../../assets/image/About/Misson.png";

const Mission = () => {
  return (
    <div className="px-10">
      <div className="font-[inter">
        <h2 className="text-4xl text-center text-cyan-500 pt-5 pb-12">
          Our Mission & Vision?
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-10 items-center pb-10">
        <img
          className="w-[350px] sm:w-[300px] md:w-[350px] lg:w-[400px] shadow-2xl "
          src={mission}
          alt=""
        />
        <div className="w-full md:w-3/5 lg:w-/5 text-center md:text-left">
          <h2 className="text-3xl pb-2">Shaping the Future of Reading</h2>
          <p>
            At [Your Bookshop Name], our mission is to make reading accessible
            and enjoyable for everyone. We believe books have the power to
            inspire, educate, and transform lives. Our vision is to create a
            community where book lovers can explore diverse collections,
            discover new stories, and share their love for literature. We aim to
            support local authors, promote literacy, and ensure that every
            reader finds the perfect book. Whether you're a casual reader or a
            passionate bibliophile, we are committed to providing an enriching
            experience through our carefully curated selections and welcoming
            atmosphere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
