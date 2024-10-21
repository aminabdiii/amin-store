import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Email, GitHub, Telegram } from "@mui/icons-material";

function Footer() {
  return (
    <footer className="border-t bg-gray-100 py-5 text-gray-900">
      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-5">
        <div className="flex flex-wrap items-center justify-between max-xxs:justify-center">
          <Logo />
          <div className="flex flex-wrap justify-between gap-2 text-2xl">
            <Link
              className="p-2 text-3xl"
              title="Github"
              to="https://github.com/aminabdiii"
              target="_blank"
            >
              <GitHub fontSize="inherit" />
            </Link>
            <Link
              className="p-2 text-3xl"
              to="https://t.me/AminAP9"
              target="_blank"
            >
              <Telegram fontSize="inherit" />
            </Link>
            <Link
              className="p-2 text-3xl"
              to="https://mail.google.com/mail/u/0/#sent?compose=CllgCJfrKxdwsJJSxvSTVhccwNTHvZGzvHgttpMZncjhTkTnKKnDnqVTxTkBPFQxlFmppDcSRxq"
              target="_blank"
            >
              <Email fontSize="inherit" />
            </Link>
          </div>
        </div>
        <div>
          <p className="text-center text-xs font-semibold leading-loose xs:text-sm xs:leading-7 sm:text-[15px]">
            Welcome to AMIN STORE! Discover a wide range of top-quality products
            at unbeatable prices. Enjoy fast delivery and excellent customer
            service.
          </p>
        </div>
        <div className="h-[2.5px] w-full bg-gradient-to-l from-transparent via-violet-500 via-50% to-transparent"></div>
        <div>
          <span className="text-center text-[11px] 450:text-sm">
            @Copyright 2024 All rights reserved - AMiN STORE
          </span>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
