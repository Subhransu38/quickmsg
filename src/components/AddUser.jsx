export default function AddUser() {
  return (
    <div className="add-user p-7 bg-[rgba(17,25,40,0.9)] rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max">
      <form className="flex gap-5">
        <input
          type="text"
          placeholder="username"
          name="username"
          id=""
          className="p-2 rounded-lg outline-none text-black"
        />
        <button className="p-2 bg-[#1a73e8] rounded-lg text-white cursor-pointer">
          Search
        </button>
      </form>
      <div className="user mt-12 flex items-center justify-between">
        <div className="detail flex items-center gap-3">
          <img
            src="./avatar.png"
            alt=""
            className="size-12 rounded-full object-cover"
          />
          <span>Jane Doe</span>
        </div>
        <button className="p-2 bg-[#1a73e8] rounded-lg text-white cursor-pointer">
          Add User
        </button>
      </div>
    </div>
  );
}
