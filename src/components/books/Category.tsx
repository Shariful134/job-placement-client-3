const category = () => {
  return (
    <div className="px-10">
      <div>
        <div  className="card w-75 relative group shadow-sm ">
          <figure className="px-5 pt-5">
            <img src="fd" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Religious</h2>
            <p className="text-cyan-600 font-bold">{book?.price} $</p>
            {inStock ? <p>InStock: Available</p> : <p>InStock: Unavailable</p>}
            {admin === "admin" ? (
              <div className=" flex flex-wrap justify-center gap-2 font-serif">
                <Link to={`/book-details/${book._id}`}>
                  <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                    Details
                  </button>
                </Link>
                <Link to={`/book-update/${book._id}`}>
                  <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                    Update
                  </button>
                </Link>
                <BookDelete id={book._id} />
              </div>
            ) : (
              <div className=" flex flex-wrap justify-center gap-2">
                <Link to={`/book-details/${book._id}`}>
                  <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                    Details
                  </button>
                </Link>
                <Link to={`/book-order/${book._id}`}>
                  <button
                    onClick={handleBuy}
                    className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200"
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="absolute top-[50%] invisible group-hover:visible  left-0 w-full">
            <button className="btn w-full border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
              Add To Cart <IoMdCart className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default category;
