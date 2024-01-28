import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useFocusRef } from "./hooks";

export const CellExpanderFormatter = ({
  isCellSelected,
  expanded,
  onCellExpand,
}) => {
  const { ref, tabIndex } = useFocusRef(isCellSelected);

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onCellExpand();
    }
  };

  return (
    <div className="cellExpandClassname">
      <span onClick={onCellExpand} onKeyDown={handleKeyDown}>
        <span ref={ref} tabIndex={tabIndex}>
          {expanded ? (
            <RemoveCircleOutlineIcon
              style={{
                fontSize: "18px",
                color: "#a8a8a8",
                marginRight: 5,
                marginLeft: 5,
              }}
            />
          ) : (
            <AddCircleIcon
              style={{
                fontSize: "18px",
                color: "#a8a8a8",
                marginRight: 5,
                marginLeft: 5,
              }}
            />
          )}
        </span>
      </span>
    </div>
  );
};
