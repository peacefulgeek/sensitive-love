import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import SitemapPage from "./pages/SitemapPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import StartHerePage from "./pages/StartHerePage";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/sitemap" component={SitemapPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/start-here" component={StartHerePage} />
        <Route path="/the-science" component={() => <CategoryPage category="the-science" />} />
        <Route path="/the-nervous-system" component={() => <CategoryPage category="the-nervous-system" />} />
        <Route path="/the-world" component={() => <CategoryPage category="the-world" />} />
        <Route path="/the-gift" component={() => <CategoryPage category="the-gift" />} />
        <Route path="/the-practice" component={() => <CategoryPage category="the-practice" />} />
        <Route path="/the-science/:slug" component={({ params }) => <ArticlePage category="the-science" slug={params.slug} />} />
        <Route path="/the-nervous-system/:slug" component={({ params }) => <ArticlePage category="the-nervous-system" slug={params.slug} />} />
        <Route path="/the-world/:slug" component={({ params }) => <ArticlePage category="the-world" slug={params.slug} />} />
        <Route path="/the-gift/:slug" component={({ params }) => <ArticlePage category="the-gift" slug={params.slug} />} />
        <Route path="/the-practice/:slug" component={({ params }) => <ArticlePage category="the-practice" slug={params.slug} />} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
