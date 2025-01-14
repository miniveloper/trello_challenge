import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "../Components/Board";
import TrashCan from "../Components/TrashCan";
import Clock from "../Components/Clock";
import Weather from "../Components/Weather";
import Calender from "../Components/Calender";
import { useParams } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "react-device-detect";
import "../fonts/font.css";

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Wrapper = styled.div<IWidget>`
  position: relative;
  display: grid;
  margin: 0 auto;
  grid-template-rows: 25% 1fr;
  margin: 0 auto;

  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 480px) {
    height: 100%;
    width: 100%;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    filter: ${(props) => (props.activate ? "blur(5px)" : "none")};
  }
`;
// const Wrapper = styled.div<IWidget>`
//   position: relative;
//   display: flex;
//   margin: 0 auto;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: ${(props) => props.theme.bgColor};

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   @media screen and (max-width: 480px) {
//     height: 100%;

//     filter: ${(props) => (props.activate ? "blur(5px)" : "none")};
//   }
// `;

const Nav = styled.nav<{ scroll: boolean }>`
  display: none;

  @media screen and (max-width: 480px) {
    background-color: ${(props) => (props.scroll ? "#1F448D" : "transparent")};
    position: sticky;
    top: 0;
    display: flex;
    width: 100%;
    height: 10vh;
    font-size: 36px;
    color: white;
    align-items: center;
    justify-content: center;

    transition: all 0.2s ease-in-out;
  }
`;

const Title = styled.div`
  color: #292929;
  margin-left: 50px;
  margin-top: 50px;

  font-size: 48px;
  font-weight: 500;
  font-family: "Cookie";

  @media screen and (max-width: 480px) {
    font-size: 24px;
    margin: 0 0 30px 0;
  }
`;

const Widget = styled.div<IWidget>`
  background-color: rgba(20, 80, 158, 0.795);

  width: 30vw;
  min-width: 270px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 999;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 480px) {
    display: ${(props) => (props.activate ? "block" : "none")};
    width: 80%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(7, 12, 19, 1);
  }
`;

const WidgetBox = styled.div`
  background-color: transparent;
  border-radius: 7px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 80vw;
  gap: 30px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }

  /* @media screen and (max-width: 1260px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } */
`;

const Footer = styled.div`
  display: none;

  @media screen and (max-width: 480px) {
    display: block;
    width: 100%;
    height: 10vh;
  }
`;

interface IWidget {
  activate: boolean;
}

function Home() {
  const { dates } = useParams();

  const [scroll, setScroll] = useState(false);
  const [widget, setWidget] = useState<boolean>(false);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board move
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);

        localStorage.setItem(
          `${dates}`,
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: boardCopy,
          })
        );
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId === "Trash") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);

        localStorage.setItem(
          `${dates}`,
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: boardCopy,
          })
        );

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);

        localStorage.setItem(
          `${dates}`,
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: targetBoard,
          })
        );
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };

  // 모바일 환경에서 Bars 아이콘 클릭 시 위젯 활성화
  const barsOnClick = () => setWidget((props) => !props);
  const isMobileActivate = () => {
    if (widget) {
      setWidget((props) => !props);
    }
  };

  const handleScroll = () => {
    if (window.scrollY >= 10) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    const storage = localStorage.getItem(`${dates}`);

    if (storage !== null) {
      const parsedData = JSON.parse(storage);
      setToDos(parsedData);
    } else {
      setToDos({
        "To Do": [],
        Doing: [],
        Done: [],
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dates]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Content>
        <Wrapper
          activate={widget}
          {...(isMobile && { onClick: isMobileActivate })}
        >
          <Nav scroll={scroll}>
            <FontAwesomeIcon icon={faBars} onClick={barsOnClick} />
          </Nav>
          <Title>
            {dates &&
              `${
                new Date().getMonth() + 1
              }월 ${new Date().getDate()}일에 해야할 일 !`}
          </Title>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board
                dates={dates}
                boardId={boardId}
                key={boardId}
                toDos={toDos[boardId]}
              />
            ))}
          </Boards>
          <TrashCan />

          <Footer />
        </Wrapper>

        <Widget activate={widget}>
          <Weather />
          <WidgetBox>
            <Clock />
          </WidgetBox>
          <WidgetBox>
            <Calender />
          </WidgetBox>
        </Widget>
      </Content>
    </DragDropContext>
  );
}
export default Home;
