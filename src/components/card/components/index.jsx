import styled from "styled-components";

const Card = styled.div`
  background: ${(props) => props.bg || "rgba(255, 255, 255, 0.15)"};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  width: 350px;
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    background: ${(props) => props.bg || "rgba(255, 255, 255, 0.25)"};
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(135deg, #ff6b6b, #ffa502, #1e90ff);
    mask: linear-gradient(white 0 0) content-box, linear-gradient(white 0 0);
    mask-composite: exclude;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }
`;

export { Card };
