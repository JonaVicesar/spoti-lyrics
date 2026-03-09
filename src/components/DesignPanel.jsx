import { COLOR_PRESETS, FONT_OPTIONS } from "../constants";

export default function DesignPanel({ bgColor, setBgColor, textColor, setTextColor, fontSize, setFontSize, fontFamily, setFontFamily, cardWidth, setCardWidth, padding, setPadding, onDownload }) {
  return (
    <div>
      <div className="section-title">Diseño</div>

      {/* presets de color */}
      <div className="presets-grid">
        {COLOR_PRESETS.map((p) => (
          <div
            key={p.bg}
            className={`preset-btn ${bgColor === p.bg ? "active" : ""}`}
            style={{ background: p.bg }}
            onClick={() => { setBgColor(p.bg); setTextColor(p.text); }}
            title={p.label}
          />
        ))}
      </div>

      {/*personalizacion del color */}
      <div className="color-pickers">
        <div className="color-pick-wrap">
          <div className="color-pick-label">Fondo</div>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="color-pick" />
        </div>
        <div className="color-pick-wrap">
          <div className="color-pick-label">Texto</div>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="color-pick" />
        </div>
      </div>

      {/* sliders */}
      <Slider label="Tamaño letra" value={fontSize} min={20} max={72} onChange={setFontSize} unit="px" />

      <div style={{ marginBottom: 10 }}>
        <div className="slider-label"><span>Tipografía</span></div>
        <select className="inp" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
          {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>

      <Slider label="Ancho" value={cardWidth} min={340} max={900} step={20} onChange={setCardWidth} unit="px" />
      <Slider label="Margen" value={padding} min={16} max={80} onChange={setPadding} unit="px" style={{ marginBottom: 16 }} />

      <button className="btn btn-white" onClick={onDownload}>↓ Descargar PNG</button>
    </div>
  );
}

function Slider({ label, value, min, max, step = 1, onChange, unit = "", style = { marginBottom: 10 } }) {
  return (
    <div style={style}>
      <div className="slider-label">
        <span>{label}</span>
        <span>{value}{unit}</span>
      </div>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
}