import styled from "styled-components";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

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
  padding: 5px 0;
`;

const TableData = styled.td`
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0 2px;

  color: white;
  border-radius: 10px;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(209, 216, 224, 0.4);
    border-radius: 8px;
  }

  & a,
  & a div {
    display: flex;
    width: 100%;
    height: 1.7em;
    min-height: 25px;
    justify-content: center;
    align-items: center;
  }
`;

const DaysData = styled.td`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 400;
  &:first-child {
    color: #f78fb3;
  }
  &:last-child {
    color: #2bcbba;
  }
`;

function Calender() {
  const { dates } = useParams();

  const HOLIDAY_API_KEY =
    "EOZd3IRPE%2BLZivWRWYW%2BC1ekzk%2BjgpXQXVmPVP%2Beu%2BnkrNSTZZBYlRQLDSKl%2BjZE2q%2F%2BUBs2awMAq82WKHONJA%3D%3D";

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
                      fontWeight: "600",
                    }}
                  >
                    <Link to={`/${dates.format("YYYYMMDD")}`}>
                      <div style={{ height: "100%", width: "100%" }}>
                        {dates.format("D")}
                      </div>
                    </Link>
                  </TableData>
                );
              } else if (dates.format("MM") !== today.format("MM")) {
                return (
                  <TableData key={index} style={{ color: "#a5b1c2" }}>
                    <Link to={`/${dates.format("YYYYMMDD")}`}>
                      <div>{dates.format("D")}</div>
                    </Link>
                  </TableData>
                );
              } else {
                return (
                  <TableData key={index}>
                    <Link to={`/${dates.format("YYYYMMDD")}`}>
                      <div>{dates.format("D")}</div>
                    </Link>
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
