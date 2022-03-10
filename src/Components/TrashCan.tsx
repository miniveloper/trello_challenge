import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Can = styled.div`
  color: ${(props) => props.theme.bgColor};
  font-size: 36px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function TrashCan() {
  return (
    <Droppable droppableId="Trash">
      {(magic) => (
        <Can ref={magic.innerRef} {...magic.droppableProps}>
          <FontAwesomeIcon icon={faTrashCan} />
          {magic.placeholder}
        </Can>
      )}
    </Droppable>
  );
}

export default TrashCan;
