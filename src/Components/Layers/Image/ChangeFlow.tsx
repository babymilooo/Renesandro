import { taskImages } from "../../../Types/Types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/Ui/Select";

interface ImageProps {
  setEditing: React.Dispatch<React.SetStateAction<taskImages[]>>;
  index: number;
}


const ChangeFlow = ({ setEditing, index }: ImageProps) => {
  const handleFlowChange = (newFlow: string) => {
    setEditing((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, flow: newFlow } : img
      )
    );
  };

  return (
    <div>
      <Select onValueChange={(value) => handleFlowChange(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Flow" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="other_models_mix">
            <span className="bg-yellow-200 rounded-md px-1 border-yellow-400 border">
              other_models_mix
            </span>
          </SelectItem>
          <SelectItem value="mj_model">
            <span className="bg-sky-200 rounded-md px-1 border-sky-400 border">
              mj_model
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChangeFlow;
