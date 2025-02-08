import { Row } from "../../components/common";

const Footer = () => {
  return (
    <Row
      style={{
        margin: "30px 0",
      }}
    >
      <p>
        Made by{"  "}
        <a
          href="https://www.linkedin.com/in/rishav-jaiswal-55141824a/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#d1b352",
            marginRight: "8px",
          }}
        >
           Rishav Jaiswal
        </a>
      🎓- 2025
      </p>
    </Row>
  );
};

export default Footer;
