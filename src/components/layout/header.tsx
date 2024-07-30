import LangButton from "../lang-button";
import ThemeButton from "../theme-button";
import ListSelector from "../list-selector";

interface HeaderProps {
  onSelect: (listId: number) => void;
}

const Header = ({ onSelect }: HeaderProps) => {
  return (
    <nav className="fixed top-0 left-0 w-full  bg-opacity-90 backdrop-blur-sm shadow-sm dark:shadow-none z-50 transition-opacity duration-300">
      <div className="max-w-screen-2xl flex items-center justify-between mx-auto p-4">
        <div className="hidden md:flex flex-1"></div>
        <div className="flex-1 md:flex justify-center">
          <ListSelector onSelect={onSelect} />
        </div>
        <div className="flex-1 flex justify-end gap-3">
          <LangButton />
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
