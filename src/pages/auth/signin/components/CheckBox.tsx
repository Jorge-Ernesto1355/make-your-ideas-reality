const CheckBox = () => {
  return (
    <>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" value="" className="peer sr-only" />
        <div className="peer h-5 w-11 rounded-full bg-gray-200 after:absolute after:top-[1.2px] after:left-[3px] after:h-4 after:w-[15px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none   "></div>
      </label>
    </>
  );
};
export default CheckBox;
