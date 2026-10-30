import { useEffect, useState, useSyncExternalStore } from "react";
import AppDialog from "./AppDialog";
import { dialogStore } from "./dialogService";

export default function DialogHost() {
  const request = useSyncExternalStore(
    dialogStore.subscribe,
    dialogStore.getSnapshot,
  );
  const [closing, setClosing] = useState(false);
  // Let MUI restore focus before mounting the next queued request.
  const finish = (confirmed) => {
    if (closing) return;
    setClosing(true);
    dialogStore.settle(request, confirmed);
  };
  if (closing) return <FocusReset onDone={() => setClosing(false)} />;
  if (!request) return null;
  return (
    <AppDialog
      {...request.options}
      open
      onConfirm={() => finish(true)}
      onClose={() => finish(false)}
    />
  );
}

function FocusReset({ onDone }) {
  useEffect(() => {
    onDone();
  }, [onDone]);
  return null;
}
