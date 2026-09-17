import { FloatingPathsBackground } from "@/components/ui/floating-paths";

export default function FloatingPathsBackgroundExample() {
  return (
    <FloatingPathsBackground
      className="aspect-16/9 flex items-center justify-center"
      position={-1}
    >
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
          Floating Paths
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Smooth vector stream lines in motion
        </p>
      </div>
    </FloatingPathsBackground>
  );
}
