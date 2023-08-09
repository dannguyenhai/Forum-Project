import introduceHeart from "@/assets/images/introduceHeart.png";
import introduceArrow from "@/assets/images/introduceArrow.png";
import introduceContent from "@/assets/images/introduceContent.png";
import introduceLogo from "@/assets/images/introduceLogo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
const Introduction = () => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  return (
    <>
      {isLoading && (
        <div className="absolute top-[40%] inset-0 justify-center w-10 h-10 mx-auto border-4 border-t-4 rounded-full mt- fex flex-center border-primary border-t-transparent animate-spin"></div>
      )}
      {!isLoading && (
        <div className="flex flex-col items-center text-[#4D4D4D] overflow-hidden text-center">
          <div className="mt-[100px] h-full md:max-h-[1885px] max-w-[414px]  md:max-w-[1240px]">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="flex flex-col items-center mt-[100px]"
            >
              <img src={introduceHeart} className="mb-[30px] " alt="" />
              <img src={introduceLogo} className="h-[56px] w-[360px]" alt="" />
              <span className="m-[10px] px-10 lg:px-0 py-[3px] text-2xl font-bold tracking-normal">
                안녕하십니까. 깨끗한 바다 부산 홈페이지 방문을 환영합니다.
              </span>
            </div>
            <div className="mt-[77px] flex flex-col items-center justify-center text-[18px] h-[200px] md:h-[150px]  px-10 lg:w-[1240px] md:w-[820px]  lg:h-[200px]">
              <p data-aos="fade-up" data-aos-delay="100">
                제2 수도로 불리는 부산은 동남권에는 바다가, 북서로는 낙동강이
                흐르고 있는
                <span
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="font-bold text-primary"
                >
                  친수도시
                </span>{" "}
                로 지리적 이점과 풍부한 해양자원을 바탕으로
              </p>
              <p data-aos="fade-up" data-aos-delay="300">
                <span className="font-bold text-primary">
                  항만물류, 해양수산, 관광·MICE산업
                </span>{" "}
                등 고부가가치 산업기반의
                <span className="font-bold text-primary">글로벌 해양도시</span>
                로 나아가고 있습니다.
              </p>
            </div>
            <div    data-aos="fade-up"
                data-aos-delay="400" className="flex-center mt-[60px] flex w-[350px] h-[200px] lg:w-[1240px] md:w-[820px]  items-center justify-center border border-[#CCCCCC] mx-auto">
              <img src={introduceArrow} className="object-cover px-10" alt="" />
            </div>
            <div className="mt-[60px] flex flex-col items-center text-[18px] tracking-tighter  px-10 lg:px-0 ">
              <p    data-aos="fade-up"
                data-aos-delay="500">
                그러나
                <span className="font-bold text-[#1D1D1D]">
                  그러나 낙동강 하류와 근해에 밀려오는 막대한 양의 해양쓰레기
                </span>
                로 인해 환경오염, 생태계 파괴, 미세플라스틱 문제 등 부산의
                해양자원과 시민의 안전이 위협받고 있습니다.
              </p>
              <p    data-aos="fade-up"
                data-aos-delay="600">
                이에 부산광역시는 시민단체와 다양한 환경 정화 활동을 통해 해마다
                50만 톤에 달하는 해양쓰레기를 수거하고 있지만
              </p>
              <p    data-aos="fade-up"
                data-aos-delay="700">
                <span className="font-bold text-[#1D1D1D]">
                  안전한 접근이 보장되지 않는 테트라포드와 습지의 경우 여전히
                  수거 사각지대
                </span>
                로 남아 있습니다.
              </p>
            </div>
            <div    data-aos="fade-up"
                data-aos-delay="800" className="mt-[60px] flex flex-col items-center text-[18px] tracking-tighter  px-10 lg:px-0 ">
              <p>
                <span className="font-bold text-[#1D1D1D]">‘</span>
                <span className="font-bold text-primary">깨바부</span>
                <span className="font-bold text-[#1D1D1D]">(</span>
                <span className="font-bold text-primary">깨</span>
                <span className="font-bold text-[#1D1D1D]">끗한</span>
                <span className="font-bold text-primary">바</span>
                <span className="font-bold text-[#1D1D1D]">다</span>
                <span className="font-bold text-primary">부</span>
                <span className="font-bold text-[#1D1D1D]">산)’</span>는 이러한
                지역현안 문제 해결을 위해
                <span className="font-bold text-primary">
                  부산지역 내 수거 사각지대인 테트라포트(72개소)와 습지(1개소)
                  현황 정보를 제공
                </span>{" "}
                하고
              </p>
              <p    data-aos="fade-up"
                data-aos-delay="900">
                <span className="font-bold text-primary">
                  {" "}
                  해양쓰레기 문제의 심각성을인지할 수 있는 콘텐츠를 게시
                </span>
                함으로써 깨끗한 바다·강 만들기 문화를 홍보하고 확산하고자
                합니다.
              </p>
              <p    data-aos="fade-up"
                data-aos-delay="1000">
                <span>
                  또한, 수거 사각지대의 쓰레기 문제의 해결방안에 대해 주민들과
                  자유롭게 논의하고 공감하기 위하여
                </span>
              </p>
              <p    data-aos="fade-up"
                data-aos-delay="500">
                {" "}
                <span className="font-bold text-primary">
                  시민의 의견을 상시 수집할 수 있는 자유게시판을 운영{" "}
                </span>
                하여시민의 소리에 귀 기울이겠습니다.
              </p>
            </div>
            <div    data-aos="fade-up"
                data-aos-delay="500" className="flex-center mt-[60px] flex w-[350px] h-[200px] lg:w-[1240px] md:w-[820px]  items-center justify-center border border-[#CCCCCC] mx-auto">
              <img
                src={introduceContent}
                className="object-cover px-10"
                alt=""
              />
            </div>
            <div    data-aos="fade-up"
                data-aos-delay="500" className="mt-[60px] flex flex-col items-center text-[20px] px-10 lg:px-0">
              <p>
                아름다운 미래 해양도시 부산을 위하여 시민 여러분들의 많은 관심과
                참여를 부탁드립니다. 감사합니다.
              </p>
            </div>
            <div    data-aos="fade-up"
                data-aos-delay="500" className="flex-center mt-[60px] flex p-2 md:h-[80px] lg:w-[1240px] md:w-[820px]  items-center justify-center border border-[#CCCCCC] mx-auto">
              <p className="px-[46px]">
                본 사이트는 과학기술정보통신부에서 시행하는
                원천기술개발사업-국민공감·국민참여 R&SD
                선도사업-주민공감현장문제해결사업과 부산광역시의 지원을 받아
                제작되었습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Introduction;
