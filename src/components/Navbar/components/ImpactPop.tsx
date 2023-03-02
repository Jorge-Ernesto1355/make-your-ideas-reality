import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { variants } from "../utils/variants";
import { motion } from "framer-motion";

const HowImpact = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex items-center space-x-2">
      <p>Impacto</p>
    </div>
  );
};
export default HowImpact;
