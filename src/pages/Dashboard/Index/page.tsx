import BarChar from "@/components/BarChart";
import Card from "@/components/Card";
import { GiFuelTank } from "react-icons/gi";

export default function page() {
  const data = [
    {
      name: "Page A",
      pv: 2400,
    },
    {
      name: "Page B",
      pv: 1398,
    },

    {
      name: "Page c",
      pv: 5008,
    },
  ];
  return (
    <section className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 flex-wrap">
          <Card
            className="bg-yellow-100" // Total LPG
            title={
              <div className="text-xl font-bold flex justify-between">
                Total LPG
                <span>20 gal</span>
              </div>
            }
            styleTitle="text-start w-full"
            styleDescription="text-start w-full"
          >
            <section className="flex items-center justify-between w-full">
              <GiFuelTank className="size-16" />
              <div className="flex flex-col items-end">
                <span className="text-base font-semibold">20 gal</span>
                <span className="text-sm text-gray-500">Curr. Level</span>
              </div>
            </section>
          </Card>

          <Card
            className="bg-blue-100" // Total gasoline
            title={
              <div className="text-xl font-bold flex justify-between">
                Total gasoline
                <span>20 gal</span>
              </div>
            }
            styleTitle="text-start w-full"
            styleDescription="text-start w-full"
          >
            <section className="flex items-center justify-between w-full">
              <GiFuelTank className="size-16" />
              <div className="flex flex-col items-end">
                <span className="text-base font-semibold">20 gal</span>
                <span className="text-sm text-gray-500">Curr. Level</span>
              </div>
            </section>
          </Card>

          <Card
            className="bg-green-100" // Total diesel
            title={
              <div className="text-xl font-bold flex justify-between">
                Total diesel
                <span>20 gal</span>
              </div>
            }
            styleTitle="text-start w-full"
            styleDescription="text-start w-full"
          >
            <section className="flex items-center justify-between w-full">
              <GiFuelTank className="size-16" />
              <div className="flex flex-col items-end">
                <span className="text-base font-semibold">20 gal</span>
                <span className="text-sm text-gray-500">Curr. Level</span>
              </div>
            </section>
          </Card>

          <Card
            className="bg-red-100" // Total Sale
            title={
              <div className="text-xl font-bold flex justify-between">
                Total Sale
                <span>N2000</span>
              </div>
            }
            styleTitle="text-start w-full"
            styleDescription="text-start w-full"
          >
            <section className="flex items-center justify-between w-full">
              <GiFuelTank className="size-16" />
              <div className="flex flex-col items-end">
                <span className="text-base font-semibold">N2000</span>
                <span className="text-sm text-gray-500">Curr. Total</span>
              </div>
            </section>
          </Card>
        </div>

        <div className="w-full h-full">
          <BarChar data={data} />
        </div>
      </div>
    </section>
  );
}
