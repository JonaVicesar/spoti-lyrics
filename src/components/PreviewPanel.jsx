export default function PreviewPanel({ canvasRef }) {
  return (
    <div>
      <div className="panel-title">Preview</div>
      <div className="canvas-wrap">
        <div className="canvas-container">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}