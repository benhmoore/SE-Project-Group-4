import { ResponsiveBar } from "@nivo/bar";

// Define an interface for the data type
interface Data {
  product: string;
  sales: number;
  color: string;
}

// Define an array of data objects
let data: Data[] = [];

interface Props {
  products: Array<Object>;
}

// Define a functional component that renders the bar chart
const BarChart = ({ products }: Props) => {
  // create bars for each product
  data = [];
  for (let i = 0; i < products.length; i++) {
    data.push({
      product: products[i].name,
      Sales: products[i].num_sales,
      color: "#f19a47",
    });
  }

  return (
    <ResponsiveBar
      data={data}
      keys={["Sales"]}
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
