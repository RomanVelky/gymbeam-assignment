import LangButton from "../lang-button";
import ThemeButton from "../theme-button";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full  bg-opacity-90 backdrop-blur-sm shadow-sm dark:shadow-none z-50 transition-opacity duration-300">
      <div className="max-w-screen-2xl flex justify-end  mx-auto p-4">
        <div className=" flex justify-end gap-3">
          <LangButton />
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
