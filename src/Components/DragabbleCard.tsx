import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";
import { useParams } from "react-router-dom";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

export interface IDraggableCard {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({ toDoId, toDoText, index, boardId }: IDraggableCard) {
  const { dates } = useParams();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClickXmark = () => {
    setToDos((allBoards) => {
      const boardCopy = allBoards[boardId].slice();
      boardCopy.splice(index, 1);

      localStorage.setItem(
        `${dates}`,
        JSON.stringify({ ...allBoards, [boardId]: boardCopy })
      );

      return { ...allBoards, [boardId]: boardCopy };
    });
  };
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <FontAwesomeIcon
            onClick={onClickXmark}
            icon={faXmark}
            color="#f15089"
          ></FontAwesomeIcon>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
