import logoLogin from "@/assets/images/introduceLogo.png";
const NavbarLogin = () => {
  return (
    <div>
      <nav className="flex fixed top-0 justify-between p-5 pl-5 md:p-8 text-white flex-center gap-x-10  px-[10px] md:pl-[15%]  w-full h-[100px] bg-[#155CA2]">
        <a href="/">
          <img src={logoLogin} className="w-[218px] h-[36px]" alt="" />
        </a>
      </nav>
    </div>
  );
};

export default NavbarLogin;
