import ContentBoundary from "../ui/ContentBoundary";
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
        <ContentBoundary>
          <LatestProducts />
        </ContentBoundary>
        <ContentBoundary>
          <Features />
        </ContentBoundary>
        <ContentBoundary>
          <DiscountProducts />
        </ContentBoundary>
        <ContentBoundary>
          <LatestArticles />
        </ContentBoundary>
        <ContentBoundary>
          <MostPopularBrands />
        </ContentBoundary>
        <ContentBoundary>
          <FrequentlyAskedQuestions />
        </ContentBoundary>
      </Container>
    </>
  );
}

export default Home;
