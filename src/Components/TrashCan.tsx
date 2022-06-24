import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Can = styled.div`
  color: ${(props) => props.theme.boardColor};
  font-size: 42px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  bottom: 20px;
  right: 20px;

  /* @media screen and (max-width: 480px) {
    display: none;
  } */
`;

function TrashCan() {
  return (
    <Droppable droppableId="Trash">
      {(magic) => (
        <Can ref={magic.innerRef} {...magic.droppableProps}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Can>
      )}
    </Droppable>
  );
}

export default TrashCan;
