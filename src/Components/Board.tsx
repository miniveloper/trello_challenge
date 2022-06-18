import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IArea>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  padding: 20px 15px 20px 20px;
  max-height: 445px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  overflow-y: scroll;
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #718093;
    }
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    border: 6px solid transparent;
  }
  transition: all 0.2s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    width: 100%;
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoard {
  toDos: ITodo[];
  boardId: string;
  dates?: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, dates }: IBoard) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      localStorage.setItem(
        `${dates}`,
        JSON.stringify({
          ...allBoards,
          [boardId]: [newToDo, ...allBoards[boardId]],
        })
      );

      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}

            // {areaRef.current?.clientHeight > 485 && scroll}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                index={index}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
