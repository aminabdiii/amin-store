import { HiOutlineRocketLaunch } from "react-icons/hi2";
import styles from "/src/Styles/GeneralStyles.module.css";
import TypewriterComponent from "typewriter-effect";

function HeroSection() {
  return (
    <div
      className={`${styles["hero-section"]} relative mx-auto h-auto md:min-h-dvh`}
    >
      <div className="lg:pt-18 flex flex-col gap-5 px-5 pt-10 sm:gap-7 md:pt-14 lg:pt-20">
        <h1 className="bg-clip-text text-center text-3xl font-bold uppercase tracking-widest xs:text-4xl sm:text-5xl lg:text-6xl">
          <TypewriterComponent
            options={{
              strings: "hello world",
              autoStart: true,
              cursor: "",
            }}
          />
        </h1>
        <img
          src="hero-mobile.webp"
          alt="poster"
          className="mx-auto w-full max-w-sm md:hidden"
        />

        <p className="mx-auto max-w-xl text-pretty text-center text-sm font-medium leading-6 xs:text-lg xs:!leading-8 sm:text-xl">
          Welcome to AMIN STORE! Discover a wide range of top-quality products
          at unbeatable prices. Enjoy fast delivery and excellent customer
          service.
        </p>

        <div className="flex justify-center">
          <a
            href="#last-products"
            className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#663dff] to-[#aa00ff] px-3 py-1 text-base font-medium uppercase text-white xs:text-xl sm:text-2xl xl:animate-pulse"
          >
            <HiOutlineRocketLaunch />
            get started
            <HiOutlineRocketLaunch />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
