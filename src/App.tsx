import React, { useEffect, useState } from "react";
import { fetchNews } from "./services/newsService";
import {
  Container,
  Row,
  Col,
  Navbar,
  Form,
  Button,
  Card,
  Spinner,
  Nav,
} from "react-bootstrap";

// Import your local image here
import defaultImage from "./assets/icon1.jpg";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("technology");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const loadNews = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;
    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      const data = await fetchNews(query, sortBy, language, currentPage);

      if (reset) {
        setArticles(data.articles || []);
        setPage(2);
        setHasMore((data.articles?.length ?? 0) > 0);
      } else {
        const newArticles = (data.articles || []).filter(
          (a: Article) => !articles.some((existing) => existing.url === a.url)
        );
        if (newArticles.length === 0) {
          setHasMore(false);
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
          setPage((prev) => prev + 1);
        }
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(true);
    // eslint-disable-next-line
  }, [query, sortBy, language]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 200 >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {
        loadNews();
      }
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Ensure container height fills viewport and content pushes footer
  const minHeightForRow =
    loading || articles.length > 0 ? "70vh" : "calc(100vh - 200px)";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode ? "#121212" : "#f8f9fa",
        color: darkMode ? "#f5f5f5" : "#212529",
        transition: "background-color 0.3s ease",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand="lg"
        sticky="top"
        className="shadow"
      >
        <Container fluid>
          <Navbar.Brand className="fw-bold fs-4">📰 Trendly Times</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-collapse" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="me-auto flex-wrap">
              {categories.map((cat) => (
                <Nav.Link
                  key={cat}
                  onClick={() => {
                    setQuery(cat);
                    setHasMore(true);
                  }}
                  className="text-capitalize"
                  style={{ color: darkMode ? "#ddd" : "#333", cursor: "pointer" }}
                >
                  {cat}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>

          {/* Dark mode toggle */}
          <Button
            variant={darkMode ? "light" : "dark"}
            className="ms-2"
            onClick={() => setDarkMode(!darkMode)}
            style={{ whiteSpace: "nowrap" }}
          >
            {darkMode ? "Light" : "Dark"}
          </Button>
        </Container>
      </Navbar>

      {/* Search Bar */}
      <Container
        fluid
        className="px-3 px-sm-4 px-md-5 mt-3"
        style={{ maxWidth: 800 }}
      >
        <Form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault();
            setHasMore(true);
            loadNews(true);
          }}
        >
          <Form.Control
            type="search"
            placeholder="Search news..."
            className="me-2"
            style={{
              backgroundColor: darkMode ? "#1e1e1e" : "white",
              color: darkMode ? "#f5f5f5" : "#212529",
              border: darkMode ? "1px solid #555" : "1px solid #ccc",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant={darkMode ? "outline-light" : "outline-dark"}
            type="submit"
          >
            Search
          </Button>
        </Form>
      </Container>

      {/* News List */}
      <Container
        fluid
        className="mt-4 px-3 px-sm-4 px-md-5 flex-grow-1 d-flex flex-column"
      >
        <Row style={{ minHeight: minHeightForRow, flexGrow: 1 }}>
          {articles.length === 0 && !loading ? (
            <Col xs={12} className="text-center py-5">
              <h5>
                No articles found for "{query}". Try another search or category.
              </h5>
            </Col>
          ) : (
            articles.map((article, idx) => (
              <Col
                key={`${article.url}-${idx}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <Card
                  className="h-100 shadow-sm border-0"
                  style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    color: darkMode ? "#f5f5f5" : "#212529",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={article.urlToImage || defaultImage}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImage;
                    }}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold">{article.title}</Card.Title>
                    <Card.Text style={{ color: darkMode ? "#ccc" : "#555" }}>
                      {article.description || "No description available."}
                    </Card.Text>
                    <Button
                      variant={darkMode ? "primary" : "dark"}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-100"
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {loading && (
          <div className="text-center my-4 flex-shrink-0">
            <Spinner animation="border" variant={darkMode ? "light" : "dark"} />
          </div>
        )}
        {!hasMore && !loading && articles.length > 0 && (
          <p className="text-center my-4 flex-shrink-0">No more articles to load.</p>
        )}
      </Container>

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            padding: 0,
            fontSize: "24px",
            zIndex: 1000,
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
          aria-label="Scroll to top"
          title="Go to top"
        >
          ↑
        </Button>
      )}
    </div>
  );
}

export default App;
