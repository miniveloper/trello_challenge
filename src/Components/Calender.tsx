import styled from "styled-components";
import moment from "moment";
import { useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 100%;
  text-shadow: none;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
`;

const Title = styled.span`
  &:last-child {
    font-size: 18px;
    font-weight: 500;
  }
`;

const Table = styled.table`
  display: flex;
  width: 100%;
`;

const TableRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const TableData = styled.td`
  display: flex;
  width: 5%;
  height: 5%;
  justify-content: center;
  align-items: center;
  color: white;
`;

const DaysData = styled.td`
  display: flex;
  width: 5%;
  height: 5%;
  justify-content: center;
  align-items: center;
  color: white;
  &:first-child {
    color: #fc5c65;
  }
  &:last-child {
    color: #2bcbba;
  }
`;

function Calender() {
  const [getMoment, setMoment] = useState(moment());
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const today = getMoment;
  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const calenderArr = () => {
    let result: any = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <TableRow key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let dates = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              if (moment().format("YYYYMMDD") === dates.format("YYYYMMDD")) {
                return (
                  <TableData
                    key={index}
                    style={{
                      color: "#f7b731",
                    }}
                  >
                    <span>{dates.format("D")}</span>
                  </TableData>
                );
              } else if (moment().format("MM") !== dates.format("MM")) {
                return (
                  <TableData key={index} style={{ color: "#a5b1c2" }}>
                    <span>{dates.format("D")}</span>
                  </TableData>
                );
              } else {
                return (
                  <TableData key={index}>
                    <span>{dates.format("D")}</span>
                  </TableData>
                );
              }
            })}
        </TableRow>
      );
    }
    return result;
  };

  return (
    <Wrapper>
      <Header>
        <BsCaretLeftFill
          onClick={() => setMoment(getMoment.clone().subtract(1, "month"))}
          style={{ color: "white", cursor: "pointer" }}
        />
        <TitleBox style={{ color: "white" }}>
          <Title>{today.format("YYYY")}</Title>
          <Title>{today.format("MMMM").toLocaleUpperCase()}</Title>
        </TitleBox>
        <BsCaretRightFill
          onClick={() => setMoment(getMoment.clone().add(1, "month"))}
          style={{ color: "white", cursor: "pointer" }}
        />
      </Header>

      <Table>
        <tbody style={{ width: "100%" }}>
          <TableRow>
            {days.map((data, index) => (
              <DaysData key={index}>{data}</DaysData>
            ))}
          </TableRow>
          {calenderArr()}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default Calender;