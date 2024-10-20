import Container from "../ui/Container";
import HeroSection from "../features/home/HeroSection";
import LatestProducts from "../features/home/LatestProducts";
import Features from "../features/home/Features";
import DiscountProducts from "../features/home/DiscountProducts";
import LatestArticles from "../features/home/LatestArticles";
import MostPopularBrands from "../features/home/MostPopularBrands";
import FrequentlyAskedQuestions from "../features/home/FrequentlyAskedQuestions";

function Home() {
  return (
    <>
      <HeroSection />

      <Container>
        <LatestProducts />
        <Features />
        <DiscountProducts />
        <LatestArticles />
        <MostPopularBrands />
        <FrequentlyAskedQuestions />
      </Container>
    </>
  );
}

export default Home;
