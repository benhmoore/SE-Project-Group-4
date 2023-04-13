import { ResponsiveBar } from "@nivo/bar";

// Define an interface for the data type
interface Data {
  product: string;
  sales: number;
  color: string;
}

// Define an array of data objects
const data: Data[] = [
  { product: "A", sales: 100, color: "#f19a47" },
  { product: "B", sales: 200, color: "#f19a47" },
  { product: "C", sales: 300, color: "#f19a47" },
];

// Define a functional component that renders the bar chart
const BarChart = () => {
  return (
    <ResponsiveBar
      data={data}
      keys={["sales"]}
      indexBy="product"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout="vertical"
      groupMode="grouped"
      colors={{ datum: "data.color" }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Product",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Sales",
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  );
};

export default BarChart;
