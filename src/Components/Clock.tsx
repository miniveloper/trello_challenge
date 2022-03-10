import { useEffect, useState } from "react";
import styled from "styled-components";

const Time = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 36px;
`;

const Block = styled.p``;

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

  return <Time>{`${time.h}:${time.m}:${time.s}`}</Time>;
}

export default Clock;
