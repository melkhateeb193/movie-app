import LayersIcon from "@mui/icons-material/Layers";
import DoneIcon from '@mui/icons-material/Done';

export default function Subscribtion() {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="p-3 rounded-full bg-[#6EC2DF]">
          <LayersIcon
            sx={{
              fontSize: "3rem",
              backgroundColor: "transparent",
              color: "#616161",
            }}
          />
        </div>
        <div className="w-full sm:w-[40%] flex flex-col justify-center">
          <label htmlFor="disk_c" className="block mb-2 text-xl sm:text-2xl font-medium">
            Gold Package
          </label>
          <div className="flex justify-center items-center gap-3 sm:flex-row flex-col">
            <meter
              id="disk_c"
              value="4"
              min="0"
              max="10"
              className="w-full h-4 rounded-lg overflow-hidden"
            ></meter>
            <p className="w-full">11/30 days</p>
          </div>
        </div>
      </div>

      {/** List of subscription benefits */}
      {["7 Users Limits", "7 Users Limits", "7 Users Limits", "7 Users Limits", "7 Users Limits"].map((item, index) => (
        <div className="flex gap-3 mt-4 items-center" key={index}>
          <span className="bg-[#30C892] bg-opacity-25 rounded-full flex justify-center items-center p-1">
            <DoneIcon sx={{ backgroundColor: "transparent", fill: "#30C892" }} />
          </span>
          <p>{item}</p>
        </div>
      ))}

      {/** Action buttons */}
      <div className="flex flex-col sm:flex-row justify-start items-start gap-3 mt-6">
        <button className="bg-[#4F46E5] p-3 rounded-[20px] w-full sm:w-auto">Make a Renewal</button>
        <button className="border p-3 rounded-[20px] w-full sm:w-auto">Make a Renewal</button>
      </div>

      {/** Danger zone */}
      <div className="bg-[#19152E] mt-6 max-w-full sm:max-w-[450px] p-6 rounded-[10px]">
        <p className="text-[#FF0000] bg-transparent">Danger Zone</p>
        <p className="bg-transparent">
          If you wish to stop subscribing to our movies, please continue by clicking the button below. 
          Make sure that you have read our terms & conditions beforehand.
        </p>
        <button className="bg-[#FF0000] p-3 w-full sm:w-auto mt-4">
          Stop Subscribe
        </button>
      </div>
    </div>
  );
}
