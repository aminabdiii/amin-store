import { Link, useNavigate } from "react-router-dom";
import {
  ArrowBack,
  ChevronLeft,
  EmailOutlined,
  GitHub,
  Telegram,
} from "@mui/icons-material";

import ParticlesComponent from "../ui/ParticlesComponents";
import styles from "../Styles/AboutUs.module.css";
import Logo from "../ui/Logo";
import TypewriterComponent from "typewriter-effect";

import { motion } from "framer-motion";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${styles["background-image"]} scrollbar flex scroll-m-0 scroll-p-0 flex-col gap-10 px-3 will-change-scroll`}
      >
        <motion.header
          initial={{ y: -100, scale: 0.5 }}
          animate={{ y: 0, scale: 1 }}
          transition={{
            delay: 2.7,
          }}
          className="z-50 mx-auto flex w-full max-w-7xl justify-between p-3"
        >
          <Logo />
          <button
            className="flex items-center gap-1 rounded-xl border border-gray-300 px-8 font-bold uppercase text-gray-300 transition-colors hover:bg-gray-300 hover:text-black"
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </button>
        </motion.header>
        <main className="mx-auto flex h-full max-w-3xl flex-col items-center gap-10 px-3">
          <h1 className="h-fit text-3xl font-extrabold text-gray-100 transition-all duration-300 hover:text-white vxs:text-4xl sm:text-5xl md:text-6xl">
            <TypewriterComponent
              options={{
                autoStart: true,
                cursor: "",
                strings: "hi, Im AMiN AP",
              }}
            />
          </h1>
          <div className="z-50 text-pretty text-lg font-bold leading-loose text-gray-300 selection:bg-[#282828]">
            <motion.p
              initial={{ x: "-200%" }}
              animate={{ x: 0 }}
              transition={{ delay: 4 }}
              className={`h-fit break-words transition-colors hover:text-white`}
              data-aos="fade-up"
            >
              Hello, I’m Amin. I’m really glad that you took the time to view my
              portfolio.
            </motion.p>
            <motion.p
              initial={{ x: "200%" }}
              animate={{ x: 0 }}
              transition={{ delay: 6 }}
              className="h-fit break-words transition-colors hover:text-white"
            >
              I’d like to give you a brief introduction about myself:
            </motion.p>
            <motion.p
              initial={{ x: "-200%" }}
              animate={{ x: 0 }}
              transition={{ delay: 8 }}
              className="h-fit break-words py-5 transition-colors hover:text-white"
            >
              My name is Amin, born on January 31, 2006. I’m 18 years old and
              have been involved in front-end development for about a year and a
              half now. I’ve gained hands-on experience with technologies such
              as HTML, CSS, Tailwind CSS, JavaScript, React JS, MUI, Supabase,
              React Query, React Router, and more...
            </motion.p>
            <motion.p
              initial={{ x: "200%" }}
              animate={{ x: 0 }}
              transition={{ delay: 9 }}
              className="h-fit break-words transition-colors hover:text-white"
            >
              I have a perfectionist personality and am particularly meticulous
              when it comes to design. I always strive to ensure that the final
              product is delivered in the best possible form.
            </motion.p>
          </div>
          <motion.div
            initial={{
              y: "100%",
              visibility: "none",
              opacity: 0,
            }}
            animate={{
              y: 0,
              visibility: "visible",
              opacity: 100,
            }}
            transition={{ delay: 12, duration: 1 }}
            className="flex w-full items-center justify-between pb-10 text-lg font-semibold text-gray-300"
          >
            <span>contact me:</span>
            <ul className="flex gap-4 text-3xl">
              <li className="hover:text-white">
                <Link to="https://github.com/aminabdiii" target="_blank">
                  <GitHub fontSize="inherit" />
                </Link>
              </li>
              <li className="hover:text-white">
                <Link to="https://t.me/AminAP9" target="_blank">
                  <Telegram fontSize="inherit" />
                </Link>
              </li>
              <li className="hover:text-white">
                <Link to="mailto:aminabdiii2006@gmail.com">
                  <EmailOutlined fontSize="inherit" />
                </Link>
              </li>
            </ul>
          </motion.div>
        </main>
      </div>
      <ParticlesComponent />
    </>
  );
}

export default AboutUs;
