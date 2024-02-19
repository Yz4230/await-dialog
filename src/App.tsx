import { useCallback } from "react";
import { ConfirmDialog, useConfirmDialog } from "./ConfirmDialog";

export default function App() {
  const { open, props } = useConfirmDialog();

  const deleteItem = useCallback(async () => {
    const { action } = await open({
      title: "Is it okay to delete this item?",
      cancelLabel: "No, keep it",
      confirmLabel: "Yes, delete it",
    });

    if (action === "proceed") {
      // ... delete item
      console.log("Item deleted");
    }
  }, [open]);

  return (
    <div className="container mx-auto">
      <header className="bg-gray-100 px-4 py-2">
        <h1 className="text-2xl">Await Dialog Example</h1>
      </header>
      <main className="p-4">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={deleteItem}
        >
          Delete Item
        </button>
        <ConfirmDialog {...props} />
      </main>
    </div>
  );
}
