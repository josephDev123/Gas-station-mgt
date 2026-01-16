import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateExpenseForm from "./CreateExpenseForm";

export default function CreateExpenseSection() {
  const [CreateExpenseModalOpen, setIsCreateExpenseModalOpen] = useState(false);

  return (
    <section className="flex flex-col mt-4">
      <div className="flex justify-end ">
        <Button
          onClick={() => setIsCreateExpenseModalOpen(true)}
          variant="default"
          className="px-4 py-2 rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
        >
          Add Expenses
        </Button>
      </div>
      <CreateExpenseForm
        open={CreateExpenseModalOpen}
        onOpenChange={setIsCreateExpenseModalOpen}
      />
    </section>
  );
}
