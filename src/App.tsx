import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import TrashCan from "./Components/TrashCan";
import Clock from "./Components/Clock";
import Weather from "./Components/Weather";

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Widget = styled.div`
  background-color: rgba(20, 80, 158, 0.795);

  width: 30vw;
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

  &:first-child {
  }
`;

const WidgetBox = styled.div`
  background-color: transparent;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  width: 80%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 0 0;
`;

const TempWidget = styled.span`
  display: flex;
  width: 100%;
  padding: 0 50px;
  justify-content: right;
  align-items: flex-start;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 80vw;
  gap: 30px;
`;

function App() {
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
          "boards",
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
          "boards",
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
          "boards",
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
  useEffect(() => {
    const storage = localStorage.getItem("boards");
    if (storage !== null) {
      const parsedData = JSON.parse(storage);
      setToDos(parsedData);
    }
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Content>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
          <TrashCan />
        </Wrapper>

        <Widget>
          <Weather />
          <WidgetBox style={{ height: "10vh" }}>
            <Clock />
          </WidgetBox>
          <WidgetBox>
            <div>시계</div>
          </WidgetBox>

          <WidgetBox>
            <div>마신 물</div>
          </WidgetBox>
        </Widget>
      </Content>
    </DragDropContext>
  );
}
export default App;
