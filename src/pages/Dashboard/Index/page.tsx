import Card from "@/components/Card";
import { GiFuelTank } from "react-icons/gi";

export default function page() {
  return (
    <section className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4  flex-wrap">
          <Card
            className="  "
            title={
              <div className="text-xl font-bold flex justify-between">
                Total LPG
                <span>20 gal</span>
              </div>
            }
            // description="Total LPG "
            styleTitle="text-start w-full"
            styleDescription="text-start w-full"
          >
            <section className="flex items-center justify-between w-full ">
              <GiFuelTank className=" size-24" />

              <div className="flex flex-col items-end">
                <span className="text-base font-semibold">20 gal</span>
                <span className="text-sm text-gray-500">Curr. Level</span>
              </div>
            </section>
          </Card>

          <Card
            title={
              <div className="text-xl font-bold flex justify-between">
                Total gasoline
                <span>20 gal</span>
              </div>
            }
            // description="Total gasoline "
            styleTitle="text-start w-full"
            styleDescription="text-start w-full"
          >
            <section className="flex items-center justify-between w-full ">
              <GiFuelTank className=" size-24" />

              <div className="flex flex-col items-end">
                <span className="text-base font-semibold">20 gal</span>
                <span className="text-sm text-gray-500">Curr. Level</span>
              </div>
            </section>
          </Card>

          <Card
            title={
              <div className="text-xl font-bold flex justify-between">
                Total diesel
                <span>20 gal</span>
              </div>
            }
            // description="Total gasoline "
            styleTitle="text-start w-full"
            styleDescription="text-start w-full"
          >
            <section className="flex items-center justify-between w-full ">
              <GiFuelTank className=" size-24" />

              <div className="flex flex-col items-end">
                <span className="text-base font-semibold">20 gal</span>
                <span className="text-sm text-gray-500">Curr. Level</span>
              </div>
            </section>
          </Card>

          <Card
            title={
              <div className="text-xl font-bold flex justify-between">
                Total Sale
                <span>N2000 </span>
              </div>
            }
            // description="Total gasoline "
            styleTitle="text-start w-full"
            styleDescription="text-start w-full"
          >
            <section className="flex items-center justify-between w-full ">
              <GiFuelTank className=" size-24" />

              <div className="flex flex-col items-end">
                <span className="text-base font-semibold"> N2000</span>
                <span className="text-sm text-gray-500">Curr. Total</span>
              </div>
            </section>
          </Card>
        </div>
        <div className="bg-blue-200"></div>
      </div>
    </section>
  );
}
