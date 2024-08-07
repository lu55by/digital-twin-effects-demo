import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function MyPerf() {
  const { perfVisibility } = useControls(
    "Perf",
    {
      perfVisibility: {
        value: true,
        label: "Show Performance",
      },
    },
    { order: 4 }
  );

  return <>{perfVisibility && <Perf position="top-left" />}</>;
}
