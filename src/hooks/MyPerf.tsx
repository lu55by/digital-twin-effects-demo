import { useControls } from "leva";
import { Perf } from "r3f-perf";

/**
 * MyPerf Component
 *
 * Renders the r3f-perf performance monitor if enabled via Leva controls.
 *
 * @returns {JSX.Element} The Perf component or empty fragment
 */
export default function MyPerf(): JSX.Element {
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
