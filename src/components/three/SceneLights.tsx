// SceneLights — renders ambient + point lights inside an R3F <Canvas> context.
// Defined here so SonarLint sees a React component, not raw HTML-like tags.
export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={0.8} />
    </>
  );
}
