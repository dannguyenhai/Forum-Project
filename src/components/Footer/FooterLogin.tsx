import footerLogo from "../img/footer.png";
const Footer = () => {
    return (
        <footer className=" w-[100%] md:max-h-[156px] md:mt-[140px]  p-5 bg-[#F1F1F1] text-[#727272] fixed bottom-0 items-center justify-center">
        <div className="mx-[9%] sm:w-[50%] md:w-[50%] lg:w-[41%] md:gap-x-5 md:flex flex-center items-center ">
          <img src={footerLogo} className="w-[180px] h-[58px]" alt="" />
          <div className="items-center p-5 text-xs">
            <p>47340 부산광역시 부산진구 엄광로 176</p>
            <p>COPYRIGHT 2023 DONG-EUI UNIVERSITY. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;