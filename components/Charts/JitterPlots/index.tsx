import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import { IJitterplotData } from "../../../lib/interfaces";

interface JitterPlotProps {
  label: string;
  data: IJitterplotData[];
}

const JitterPlot = ({ label, data }: JitterPlotProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row md:gap-0">
      <div className="z-10 w-full bg-white text-sm md:w-1/3">
        <p>{label}</p>
      </div>
      <div className="h-10 w-full rounded-lg bg-gray-50 md:w-2/3">
        <ResponsiveScatterPlotCanvas
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          xFormat=">-.2f"
          yScale={{ type: "linear", min: 0, max: "auto" }}
          yFormat=">-.2f"
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          nodeSize={({ serieId }) => {
            if (serieId === "Area 50") return 15;
            else return 9;
          }}
          colors={({ serieId }) => {
            if (serieId === "Area 50") return "#212936";
            return "#E0E0E0";
          }}
        />
      </div>
    </div>
  );
};

export default JitterPlot;
