import { useTheme } from "../hooks/useTheme";
import "./ThemeSelector.css";
import lightMode from "../assets/changeMode.svg";

const themeColors = [
  "#58249c",
  "#249c6b",
  "#b70233",
  "#766B68",
  "#45B39D",
  "#900C3F",
];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          onClick={toggleMode}
          src={lightMode}
          alt="switch mode icon"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
