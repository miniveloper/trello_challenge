import { useEffect, useState } from "react";
import styled from "styled-components";

const Time = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0 5px;
  font-family: "Rubik", sans-serif;
  font-size: 40px;
  font-weight: 200;
  color: ${(props) => props.theme.cardColor};
  width: 250px;
`;

const Name = styled.p`
  color: ${(props) => props.theme.boardColor};
  font-size: 16px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Block = styled.p<{ value: string }>`
  position: relative;
  width: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;

  &:not(:last-child)::after {
    content: ":";
    position: absolute;
    font-size: 30px;
    color: ${(props) => props.theme.boardColor};
    top: 8px;
    right: -19px;
  }
`;

const Category = styled.span`
  color: ${(props) => props.theme.boardColor};
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 10px;
`;

function Clock() {
  const now = new Date();
  const [time, setTime] = useState({
    h: String(now.getHours()).padStart(2, "0"),
    m: String(now.getMinutes()).padStart(2, "0"),
    s: String(now.getSeconds()).padStart(2, "0"),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime({
        h: String(now.getHours()).padStart(2, "0"),
        m: String(now.getMinutes()).padStart(2, "0"),
        s: String(now.getSeconds()).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Time>
      <Block value={"hours"}>
        {time.h} <Category>hours</Category>
      </Block>
      <Block value={"minutes"}>
        {time.m}
        <Category>minutes</Category>
      </Block>
      <Block value={"seconds"}>
        {time.s}
        <Category>seconds</Category>
      </Block>
    </Time>
  );
}

export default Clock;
